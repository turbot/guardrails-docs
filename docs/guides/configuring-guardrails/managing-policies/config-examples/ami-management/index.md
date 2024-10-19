---
title: AWS AMI Management
sidebar_label: AWS AMI Management
---

# AWS AMI and Image Management with Guardrails

Careful AMI management is critical in ensuring vulnerabilities are not present
in an environment, but it can become increasingly difficult to manage hundreds,
if not thousands of AMI and images across a large number of cloud accounts.
Guardrails provides a large family of AMI and image controls and policies to help
organizations achieve their management objectives.

## AMI Overview

Guardrails provides a wide range of AMI and Image policies and controls. You can
find a list of these in teh [AWS EC2 Mod](mods/turbot/aws-ec2/inspect) inspect
page. This guide focuses on the two families:

- **AWS > EC2 > AMI > \***
- **AWS > EC2 > Instance > Approved > Image > \***

## AWS > EC2 > AMI > \*

The AWS EC2 AMI policy family includes:

| Policy Type                              | Description                                                     |
| ---------------------------------------- | --------------------------------------------------------------- |
| [Active](concepts/guardrails/active)     | Set an AMI to `Active` if it meets the sub policy conditions.   |
| [Approved](concepts/guardrails/approved) | Set an AMI to `Approved` if it meets the sub policy conditions. |
| [Tags](concepts/guardrails/tagging)      | Define and apply a tagging template to AMI.                     |
| [Usage](concepts/guardrails/usage)       | Set limits on the number of AMI that can exist.                 |

## AWS > EC2 > Instance > Approved > Image > \*

While a much smaller family of policies, this allows admins to define approved
instances based off the AMI used to boot. Note that these do not follow a
standard formula as this use case is specific to EC2.

| Policy Type                                                                             | Description                                                              |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [AMI IDs](mods/turbot/aws-ec2/inspect#/policy/types/instanceApprovedImageAmiIds)        | Define AMI that are approved to be used to launch EC2 instances.         |
| [Publishers](mods/turbot/aws-ec2/inspect#/policy/types/instanceApprovedImagePublishers) | Define AWS Account ids who's images may be used to launch EC2 Instances. |

## Examples

Taking the above policies, we can configure Guardrails to approve instances or the
AMI itself

### AMI Age Limits

Let's take the use case where AMI older than 60 days is set to `Inactive`. We
will set the **Active** policy to check because we want to do the AMI rotation
manually. This will generate an alarm in Guardrails for administrator review.

**AWS > EC2 > AMI > Active > Age**: Set this policy to
`Force inactive is age > 60 days`. ![](/images/docs/guardrails/active-age.png)

**AWS > EC2 > AMI > Active**: Set this policy to `Check: Active`.
![](/images/docs/guardrails/active.png)

That's it! Guardrails will immediately run controls against AMI at and below the
setting in the resource hierarchy.

To see the results, click the **Controls** tab, search for `AMI Active` and
click on the **AWS > EC2 > AMI > Active** result. Select the **Controls** subtab
to see a list of control states and their applicable resource.

### Dynamic AMI Approved Conditions

The policy **AWS > EC2 > AMI > Approved > Usage** can easily be turned into a
[calculated policy](concepts/policies/calculated-faq) to allow dynamic approvals
based off metadata such as tags, encryption, volume size, and more.

Assume an organization wants to approve AMI if it is both not public and it has
the key: value pair `security_approved`: `approved`.

**AWS > EC2 > AMI > Approved > Usage**: This will be set as a calculated policy.
In the UI, create the following calculated policy,

![](/images/docs/guardrails/calc-policy-approved-usage.png)

The **Input** is used to get the tags and public setting of the test AMI. The
template first tells Guardrails to check if the image is public, then checks for the
tag. Notice how we set a variable to be `Approved` and then change it to
`Not approved` if the conditions match. This is a simple way to approve a
resource using multiple lines of logic.

**AWS > EC2 > AMI > Approved**: Set this policy to `Check: Approved`.

Once the above approved policy is set, Guardrails will evaluate existing AMI.

To see the results of the control runs, click the **Controls** tab, search for
`AMI Approved` and click on the **AWS > EC2 > AMI > Approved** result. Select
the **Controls** subtab to see a list of control states and their applicable
resource.

See our example calculated policies using Terraform over in our
[Guardrails Samples Repo](https://github.com/turbot/guardrails-samples/tree/main/policy_packs),
as well as our [Calculated Policy 7 minute lab](7-minute-labs/calc-policy) for a
more detailed walk through.

### Approve EC2 Instance by AMI ID

The use case of approving instances based on the AMI publisher is very similar
to this. Simply replace the policy **AWS > EC2 > Instance > Approved > AMI IDs**
with **AWS > EC2 > Instance > Approved > Publisher**.

**AWS > EC2 > Instance > Approved > Image > AMI IDs**: Set this policy to be a
list of allowed AMI ID. For example,

```yaml
- ami-jc81a385
- ami-fa345678
```

**AWS > EC2 > Instance > Approved > Image**: Set to
`Approved if ImageId in Image > AMI IDs`.

**AWS > EC2 > Instance > Approved**: Set to `Check: Approved`.

As in the previous cases, Guardrails will re-evaluate all instances based on the AMI
ID used to boot. You can check the control results in the **Controls** tab by
searching for `AWS EC2 Instance Approved` and clicking the single result, then
clicking the **Controls** subtab.

## Advanced IAM Restrictions

### Allow Admins to Publish AMI

Administrators can place restrictions on what users can and cannot do, such as
restricting or allowing users from publishing AMI. Note this type of controls is
only possible if Guardrails is managing IAM within the target account.

By default, publishing AMI is not allowed for users with roles managed by Guardrails
unless said user has the `AWS/Superuser` permission. However, we can change this
to allow admins to publish.

**AWS > EC2 > Permissions > Levels > Ami Publishing Administration**: Set to
`Admin`.

The policy setting will trigger a re-calculation of
`AWS > Turbot > Permissions > Compiled > Service Permissions > @turbot/aws-ec2`.
Now users who have `AWS/Admin` assigned will be able to publish AMI.

### Allow Only Admins to Change Instance Tags

Some organizations have automation to tag new resources and want to restrict
users who are not admins from adding, removing, or changing tags. By default,
tagging changes are allowed at the `Operator` level.

We will leverage [Permission Modifiers](guides/aws/permissions#modifiers)
to restrict the subset of ec2 permissions which allow changes relating to tags.

**AWS > EC2 > Permissions > Levels > Modifiers**: This policy accepts an array
in YAML. Enter the following:

```yaml
- "ec2:createtags": admin
- "ec2:deletetags": admin
```

Once the policy setting is created,
`AWS > Turbot > Permissions > Compiled > Service Permissions > @turbot/aws-ec2`
will re-run to reflect the changes.
