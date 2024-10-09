---
title: Calculated Policies FAQ
sidebar_label: Calculated Policies FAQ
---

# Calculated Policies FAQ

---

- [What is a calculated policy?](#what-is-a-calculated-policy)
- [How do calculated policies work?](#how-do-calculated-policies-work)
- [How has the multi-query calc process been optimized in Guardrails?](#how-has-the-multi-query-calc-process-been-optimized-in-guardrails)
- [Which policy can I turn into a calculated policy?](#which-policy-can-i-turn-into-a-calculated-policy)
- [Are there any limitations to calculated policies?](#are-there-any-limitations-to-calculated-policies)
- [How do I set a calculated policy?](#how-do-i-set-a-calculated-policy)
- [How can I reference "strange" variables in a calculated policy?](#how-can-i-reference-strange-variables-in-a-calculated-policy)
- [How do I add Terraform to calculated policy templates?](#how-do-i-add-terraform-to-calculated-policy-templates)

---

## What is a calculated policy?

Customers often need to take remediation action based on specific business
rules. For example, a static S3 bucket must be attached to a CloudFront
distribution. Calculated policies encode that business logic in an executable
form.

## How do calculated policies work?

Calculated policies are composed of a GraphQL query to get information about a
resource and a Nunjucks template to specify the business logic. The resource
data feeds into the template, which outputs strings that match policy values.
Calculated policies are always run from the context of the resource itself. The
Guardrails Samples Repo has
[examples](https://github.com/turbot/guardrails-samples/tree/master/calculated_policies) of
what can be done.

On resource discovery or an event, Guardrails will evaluate a calculated policy in
the same way as a normal policy.

## How has the multi-query calc process been optimized in Guardrails?

The multi-query calc process in Turbot Guardrails allows you to dynamically 
compute policy values using multiple data sources within the Turbot CMDB. 
This process involves writing queries that retrieve various pieces of information, 
which are then used to calculate the final policy value.

Previously, you had to manually run separate queries to fetch the resource ID 
and any related data, which often resulted in redundant queries. With recent 
improvements, the system automatically populates key attributes—such as resource IDs,
tags, and other common fields—directly into the context. This eliminates the need to 
manually query for these attributes, allowing you to focus on writing a single, 
more efficient query to retrieve additional data. These enhancements significantly 
reduce redundancy and streamline the overall process, improving the speed and 
efficiency of calculated policies.

## Which policy can I turn into a calculated policy?

All policies can be made into calculated policies.

The most common policies used for implementing custom business logic are the
policy pairs of `Active`, and `Active > Age` then `Approved` and
`Approved > Usage`. The `Active` and `Approved` policies specify what action to
take, whether raise and alarm (Check) or delete the offending resource
(Enforce). The business logic for deciding resource age or approved status is
encoded in the `Active > Age` and `Approved > Usage` policies.

Active and Approved controls are standard for all resources.

## Are there any limitations to calculated policies?

Calculated policies can only take the actions encoded in existing controls.
`Active` and `Approved` controls are great for removing unapproved resources or
to raise alarms for an administrator. Guardrails has implemented many common
remediations, such as encryption at rest, tagging, and resource access policies.
If the desired remediation action isn't currently available, reach out to
[Guardrails support](mailto:help@turbot.com) with your use case!

## How do I set a calculated policy?

In the example below, we will investigate how to set a VPC Endpoint approved
policy to `Not Approved` if the VPC Endpoint AWS policy has a principal value
set to `*` (You will need an existing VPC endpoint under Guardrails management to
test this calculated policy).

1. In your AWS account locate an existing VPC endpoint and make note of its ID
   (e.g. vpce-05b1912865c21251f).

1. Navigate to the account where the policy will be set, then click on the
   `Policies` tab, then select the `New Setting` button:

1. Once the Create Policy screen opens up, browse to
   `AWS > VPC > Endpoint > Approved > Usage`, click `Go` and then `Next`.

1. Expand the `Scope` drop down menu by clicking on it.

1. Search or browse to select the level at which the policy will be set. (e.g
   Navigate to a region in your AWS Account). Once the proper level is showing,
   click `Go`.

1. The policy wizard is currently in Standard mode. (e.g. showing the basic
   options of `Approved`, `Not approved`, or `Approved if AWS > VPC > Enabled`).

1. To switch to calculated policy mode: Click on the `Switch to calculated mode`
   link. Once switched the layout of the `Edit Policy Setting` dialog box
   changes with some additional fields.

1. Note that `Policy Type` and `Resource Scope` were already set in steps 3 & 4.

1. In the `Setting` field paste the VPC Endpoint ID that you made note of at the
   start. If the endpoint has been discovered by Guardrails searching on the
   vpce-xxx... id will find it quickly and allow you to select it.

1. Our calculated policy is evaluating the a policy attached to a VPC Endpoint,
   so we query to return only the policy data. Use the following GraphQL example
   for your query:
   ```
   {
       resource{
           stmts: get(path: "PolicyDocument.Statement")
       }
   }
   ```
1. Validate that the query result window show a valid result for your VPC
   endpoint. A default endpoint policy will have a result set that looks like
   this:

   ```
   {
     "resource": {
        "stmts": [
           {
              "Action": "*",
              "Effect": "Allow",
              "Resource": "*",
              "Principal": "*"
           }
        ]
     }
   }
   ```

   Note the square bracket in the response - this indicates that the returned
   data is an array, and thus will affect the structure of the policy template.

1. Calculated policies use
   [Nunjucks template format](https://mozilla.github.io/nunjucks/templating.html)
   to evaluate custom logic and return one of the expected values for this
   policy. In this case the allowed values are: `Not approved`, `Approved`,
   `Approved if AWS > VPC > Enabled`. The following template checks to see if
   any overly broad settings exist in the attached policy:
   ```
   {% set starValue = "False" %}           {# Initialize a value to False #}
   {% for statement in $.resource.stmts %} {# Iterate through all statements in the policy #}
      {% if statement.Principal == "*" %}
         {% set starValue = "True" %}
      {% endif %}
   {% endfor %}
   {% if starValue == "True" %}            {# If true, the policy is in violation #}
      "Not approved"
   {% else %}
      "Approved"
   {% endif %}
   ```
1. Verify that the query and template are set and verified by Guardrails to evaluate
   correctly; the block text below the template field will show the evaluated
   value for the example VPC endpoint you selected, but each VPC endpoint will
   be individually evaluated by Guardrails at runtime.

1. Click the `Create` button to save your calculated policy, it will immediately
   take effect and evaluate if the current VPC endpoints are configured
   correctly.

## How can I reference variables that include characters in a calculated policy?

Most variables referenced in calculated policies are trivial, such as `stage`,
`data`, or `name`. However, some cloud resources include attributes with
characters. These include any attribute with a hyphen (`-`) or in some specific
cases, where the attribute is only characters (`*/*`).

Let's assume we are doing the following query and template for the policy
`AWS > API Gateway > Stage > Approved > Usage`:

```graphql
{
  stage {
    methodSettings
  }
}
```

```json
{
  "stage": {
    "methodSettings": {
      "*/*": {
        "loggingLevel": "INFO",
        "cachingEnabled": false,
        "metricsEnabled": true,
        "dataTraceEnabled": false,
        "cacheTtlInSeconds": 300,
        "cacheDataEncrypted": false,
        "throttlingRateLimit": 10,000,
        "throttlingBurstLimit": 5000,
        "requireAuthorizationForCacheControl": true,
        "unauthorizedCacheControlHeaderStrategy": "SUCCEED_WITH_RESPONSE_HEADER"
      }
    }
  }
}
```

The goal is to make an evaluation based off the `loggingLevel` attribute. To
call this attribute, we need to use the following syntax in the nunjucks
template:

`$.stage.methodSettings['*/*'].loggingLevel`

We can do the same things for attributes that contain hyphens, like so:

`$.bucket.turbot.tags['this-tag-has-hyphens']`

## How do I add Terraform to calculated policy templates?

Using a policy such as `AWS > Backup > Source > Stack`, it is possible to create
a calculated policy template that is Terraform. For example,

```hcl
resource "aws_iam_role" "{{ $.region.metadata.aws.accountId }}_ec2_backup_role" {
  name               = "turbot_ec2_backup_role"
  assume_role_policy = ""
}
```

While the calculated policy will be in the ok state (Assuming the query is
valid), the control `AWS > Backup > Source` will return invalid:

```
Failed to convert the stack source from HCL to JSON

Command failed: PATH=$PATH:. hcl2json

Failed to convert file: :1,104-122: Invalid single-argument block definition;

A single-line block definition must end with a closing brace immediately after its single argument definition.
```

To remedy this, simply use the pipe character (`|`) at the start of the
terraform resource definition in the calculated policy template:

```hcl
|
  resource "aws_iam_role" "{{ $.region.metadata.aws.regionName }}_ec2_backup_role" {
    name               = "turbot_ec2_backup_role"
    assume_role_policy = ""
  }
```

## Additional Reading

- [Calculated Policy 7 minute lab](7-minute-labs/calc-policy)
- [Guardrails Samples Repo with calculated policy examples](https://github.com/turbot/guardrails-samples/tree/master/calculated_policies)
- [Policies concepts page](concepts/policies)
- [Azure resource tagging example with calculated policies and Terraform](guides/managing-policies/config-examples/azure-tags)
