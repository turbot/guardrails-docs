---
title: "AWS FAQ"
sidebar_label: "AWS FAQ"
---

# AWS FAQs

---

- [Can I block a specific permission on the AWS/Admin role?](#can-i-block-a-specific-permission-on-the-awsadmin-role)
- [Does Guardrails support automated scheduling (start/stop) for RDS DB instances?](#does-guardrails-support-automated-scheduling-startstop-for-rds-db-instances)
- [How do I remove an event/service from AWS > Turbot > Event Handlers?](#how-do-i-remove-an-event--service-from-aws--turbot--event-handlers)
- [Can I enable access logging on Turbot Guardrails logging buckets?](#can-i-enable-access-logging-on-turbot-guardrails-logging-buckets)
- [How can I find an AWS account in Guardrails?](#how-can-i-find-an-aws-account-in-guardrails)
- [Determine which IAM policies are blocking actions](#determine-which-iam-policies-are-blocking-actions)
- [Help! Guardrails is blocking AWS service usage!](#help-guardrails-is-blocking-aws-service-usage)
- [What does the AWS > EC2 > Load Balancer Listener policy relate to?](#what-does-the-aws--ec2--load-balancer-listener-policy-relate-to)
- [How do I rotate the AWS Account credentials integrated with Guardrails?](#how-do-i-rotate-the-aws-account-credentials-integrated-with-guardrails)

---

## Can I block a specific permission on the AWS/Admin role?

Yes! Guardrails allows administrators to modify, add, or remove permissions from
pre-defined Guardrails roles.

For example, let's assume that we want to configure the permissions
`S3:PutObject` and `S3:CreateBucket` to be assigned only to **AWS/Admin**,
rather than the default of **AWS/Operator**.

Set the policy `AWS > Turbot > Permissions > Levels > Modifiers` at the account
level with the following value:

```yaml
- "s3:PutObject": Admin
- "S3:CreateBucket": Admin
```

Once the policy has been created, Guardrails will automatically update both the
**AWS/Admin** and **AWS/Operator** role!

Head over to the [AWS Permissions](guides/aws/permissions) page for more
information regarding Guardrails and AWS permissions.

## Does Guardrails support automated scheduling (start/stop) for RDS DB instances?

Yes, Guardrails provides a simple and flexible mechanism for starting and stopping
DB instances on a pre-defined schedule. Please refer to the
[Schedule Guardrail](concepts/guardrails/scheduling) for more information.

## How do I remove an event/service from AWS > Turbot > Event Handlers?

Event handlers are configured per region. What we're going to walk through is
removing the EC2 event from the Guardrails event handlers in a single region of an
account. However, like any policy setting, you could chose to set this higher in
the hierarchy depending on your use case (i.e. to disable event handling for EC2
in ap-south-1 for all Guardrails managed accounts, this would be set at the Turbot
level or folder level that contains all managed accounts).

First, let's find the control `AWS > Turbot > Event Handlers`:

1. Log into the Guardrails console and navigate to the level at which we want to set
   the policy. In this example, we will set this policy at the `ap-south-1`
   region level in the account `aab`. The header should show
   `Turbot > example-folder > aab > ap-south-1` at the top of the window when
   the resource is selected.
2. Select the controls tab then search for `Event Handlers`. Select the control
   in the list titled `AWS > Turbot > Event Handlers`.

We have now navigated to the control that creates and monitors the event
handlers for the ap-south-1 region. Now, let's see the source that determines
what the event handlers are comprised of:

1. Select the **Policies** tab, then select the `Event Handlers > Source`
   option. This policy is a list of all cloudwatch event rules created to
   monitor services.
2. Click the **Value** button. This navigates directly to the
   `AWS > Turbot > Event Handlers > Source` policy.

This is the compiled source that tells Guardrails how to build the event handlers
via Terraform. Now let's find our what is used to compile the source:

1. Again, click on the **Depends On** tab.
2. Find the policy on the right side titled
   `AWS > Turbot > Event Handlers > Events > Rules > Event Sources`. Clicking
   that will bring up said policy's value. Notice that we are viewing a policy
   value set at the `ap-south-1` region in the account `aab`.

Note: Depending on the mod, the events might be under Custom Event Patterns and
from there another dependent policy for that service / mod.

The `Event Sources` policy is a compiled list of all services defined in the
specific mod. In this example, we want to remove aws.ec2 from generating events.
This means we need to modify the Event Sources policy relating to the
`@turbot/aws-ec2` mod.

1. When viewing the
   `AWS > Turbot > Event Handlers > Events > Rules > Event Sources` policy at
   the region level, click on the **Depends On** tab. This will show a list of
   policies on the right with mod names. Find the policy for the
   `@turbot/aws-ec2` mod,
   `AWS > Turbot > Event Handlers > Events > Rules > Event Sources > @turbot/aws-ec2`,
   and select it.
2. Click the **Create Setting** button to bring up the Create Policy Setting
   screen.
3. Copy the default value on the right side. This is a YAML array.
4. Paste the array into the Setting text field. Remove the `- aws.ec2` line.
5. Click **Create**.

You can then verify that the EC2 event handlers were removed by checking the
`AWS > Turbot > Event Handlers > Events > Rules > Event Sources` policy at the
region level within the account `aab`. `aws.ec2` should no longer be in the
list, and the CloudWatch rule feeding Guardrails EC2 notifications will be deleted.

## Can I enable access logging on Turbot Guardrails logging buckets?

Administrators can set `AWS > S3 > Bucket > Access Logging` policies to enforce
access logging on S3 buckets, but Guardrails created logging buckets are exempt from
this policy. Guardrails logging bucket access logging is configured via the policy
`AWS > Turbot > Logging > Bucket > Access Logging`.

Information regarding Access Logging in AWS can be found on their
[documentation page](https://docs.aws.amazon.com/AmazonS3/latest/dev/ServerLogs.html).

### Configure Turbot Guardrails Bucket Access Logging Policies

1. First, the AWS account must have an available access logging bucket in the
   same region as the Guardrails logging bucket. Configure the policy
   `AWS > Turbot > Logging > Bucket > Access Logging > Bucket` to have the
   target bucket's name. For example, if I wanted to use
   `turbot-access-logging-1234` as my logging bucket, I would simply enter that
   name as the policy value. It is generally advised to set this policy at the
   AWS account level.
2. We now want to configure the logging prefix using the policy
   `AWS > Turbot > Logging > Bucket > Access Logging > Bucket`. The prefix makes
   it simpler for you to locate the log objects. For example, if you specify the
   prefix value logs/, each log object that Amazon S3 creates begins with the
   logs/ prefix in its key. While not specific to Guardrails logging buckets,
   [this guide](guides/managing-policies/config-examples/s3-access-logs) has
   more information about how to use logging prefixes.
3. So far we have defined a bucket that will retain access logs and set a prefix
   for the logs themselves. Lastly, we will need to turn on Access Logging for
   Guardrails Logging buckets. This can be accomplished using the policy
   `AWS > Turbot > Logging > Bucket > Access Logging`. Simply set this to
   `Enforce`, create the policy, and Guardrails Logging Buckets will have access
   logging configured in no time!

## How can I find an AWS account in Guardrails?

This method can also be used to find any cloud resource under Guardrails management.

1. After logging into the console, click on the **Search** tab at the top right.
   This is indicated with a magnifying glass icon.
2. Type or paste the account, project, or subscription id into the search box
   and hit enter.

This will return the account along with associated resources, policy settings,
and controls. Using [filters](reference/filter), you can be specific in the
request for one specific account:

```
resourceTypeId:tmod:@turbot/aws#/resource/types/account resourceId:arn:aws:::688720832111
```

and you can include multiple of the same resource type in a single search:

```
resourceTypeId:tmod:@turbot/aws#/resource/types/account resourceId:arn:aws:::688720832111,arn:aws:::181849339111
```

Selecting the account resource will take you to the Detail page. From here, you
can find information on policy settings, control states, explore child
resources, or view the developer tools.

## Determine which IAM policies are blocking actions

IAM policies and permissions are often spread out and not obvious. With the
prevalence of `NotDeny` `Action`, `Deny` `Not Action`, and boundary policies in
AWS, it is becoming increasingly difficult to pinpoint exactly what is blocking
the permission invocation.

This brings us to the
[AWS IAM Policy Simulator](https://aws.amazon.com/about-aws/whats-new/2015/10/aws-identity-and-access-management-iam-policy-simulator-now-helps-you-test-resource-level-permissions/).
This is an invaluable tool when investigating permission issues.

Refer to this AWS document outlining how to
[test IAM policies using the IAM policy simulator](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html).

This leads to an interesting caveat. If you have configured the environment to
restrict permissions outside of specific regions, one of those regions MUST BE
DEFINED UNDER THE GLOBAL SETTINGS! Failure to do so can and will provide
inaccurate information. For example, if the environment is configured to
restrict all actions outside of US East 1, failing to input us-east-1 into the
Global Settings can cause the simulator to falsely direct the root of the
problem to lockdown policies. However, after inputting the correct region, the
simulator correctly points to the boundary policies.

## Help! Guardrails is blocking AWS service usage!

Many AWS services leverage other services, and as such when doing resource
creation or modification, actions can be blocked. This is common with services
that must create, say, and S3 bucket for logging.

Use the
[AWS IAM Policy Simulator](https://aws.amazon.com/about-aws/whats-new/2015/10/aws-identity-and-access-management-iam-policy-simulator-now-helps-you-test-resource-level-permissions/)
to determine the action that is being denied. Most often, the denial will be
**implicit**, where the action is denied due to not being specified in any
policy. Sometimes the permission will be explicitly denied. If that is the case,
reach out to your Guardrails administrator as explicit denials are often
intentional.

Guardrails leverages both lockdown policies (AWS IAM policy resource) and
[permission boundaries](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html).
Luckily, with Guardrails we can enable or disable entire sets of service permissions
with just a few clicks.

Assuming the denial is implicit, we simply need to verify that Guardrails has
policies set correctly to add the service permission set.

- To enable/ disable services via AWS Boundary Policies, check
  `AWS > {service} > API Enabled`
- To enable/ disable services via Guardrails Lockdown Policies, check
  `AWS > {service} > Enabled`

More information regarding Guardrails lockdown and boundary policies can be found on
our
[AWS Permissions](guides/aws/permissions#turbot-polices-for-configuring-boundary-and-lockdown-policies)
page.

## What does the AWS > EC2 > Load Balancer Listener policy relate to?

Guardrails has two sets of EC2 Load Balancer Listener policies:

- [`AWS > EC2 > Classic Load Balancer Listener`]()
- `AWS > EC2 > Load Balancer Listener`

The first, `AWS > EC2 > Classic Load Balancer Listener`, relates to
[Classic Load Balancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/introduction.html)
(no surprise there!). The second policy set,
`AWS > EC2 > Load Balancer Listener`, targets both
[Application Load Balancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html)
and
[Network Load Balancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html).
There also exists a Gateway Load Balancer. However, due to restrictions with
respect to modifying its attributes, Guardrails has policy sets to approve the
listener itself, but cannot take action with respect to the Gateway Load
Balancer Listener.

Find more information about all the above policies on the
[aws-ec2 mods page](https://turbot.com/guardrails/docs/mods/aws/aws-ec2).

## How do I rotate the AWS Account credentials integrated with Guardrails?

When you need to update your credentials that link Guardrails to your AWS account, the following steps can be followed
via the Turbot Guardrails console. For programmatic updates, you can use the Turbot
Guardrails [GraphQL API](https://turbot.com/guardrails/docs/reference/graphql) or with
the [Guardrails Terraform provider](https://turbot.com/guardrails/docs/reference/terraform). Credentials for each AWS
Account are
stored in

There are two approaches to integrate AWS with Guardrails:

- **AWS IAM cross-account role with an external ID**: This is the default authentication method for AWS Commercial
  accounts.
- **AWS IAM user with an Access & Secret Key**:  Access Keys and Secrets are required for AWS Gov-Cloud and AWS China
  accounts.

#### Rotate AWS IAM Roles

Guardrails Policies used for IAM Role Credentials:

- [AWS > Account > Turbot IAM Role](mods/aws/aws/policy#aws--account--turbot-iam-role)
- [AWS > Account > Turbot IAM Role > External ID](mods/aws/aws/policy#aws--account--turbot-iam-role--external-id)

1. In the Guardrails console, navigate to the Account that needs credential updates.
2. Click on the lower Policies tab and search for "Turbot IAM Role" or browse to `AWS > Account > Turbot IAM Role`.
2. In the `AWS > Account > Turbot IAM Role` policy page, click the `Settings` subtab.
3. Click on the pencil icon next to the `Turbot IAM Role` or `External ID` policy you intend to update.

#### Rotate AWS IAM Users with an Access and Secret Key:

Access Key rotation requires updates in AWS IAM. Refer to
these [docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) on key rotation. Turbot
recommends using two keys when doing rotation. This ensures that Guardrails always has a valid access key for this
account.

Guardrails Policies Used for IAM User Credentials:

- [AWS > Account > Turbot IAM Access Key ID](mods/aws/aws/policy#aws--account--turbot-iam-access-key-id)
- [AWS > Account > Turbot IAM Secret Access Key](mods/aws/aws/policy#aws--account--turbot-iam-secret-access-key)

**Access Key:**

1. Navigate to the Policies tab and search for "Turbot IAM Access Key ID" or browse to `AWS > Account > Turbot IAM Access Key ID`.
2. In the `AWS > Account > Turbot IAM Access Key ID` policy page, click the `Settings` subtab.
3. Click on the pencil icon next to the `AWS > Account > Turbot IAM Access Key ID` policy you intend to update.

**Secret Key:**

1. Navigate to the Policies tab and search for "Turbot IAM Secret Access Key" or browse
   to `AWS > Account > Turbot IAM Secret Access Key`.
2. In the `AWS > Account > Turbot IAM Secret Access Key` policy page, click "Edit Setting".
3. Click on the pencil icon next to the `Turbot IAM Secret Access Key` policy you intend to update.

**Credential Verification:**

After updating the credentials, Guardrails will automatically trigger the `AWS > Account > CMDB` control to verify
access to the Account. Successful credentials should have the `AWS > Account > CMDB` control go into or stay in an `ok`
state.

**Manual Verification**: To manually verify if the credentials are functional:
1. Visit the `Controls` tab and navigate to the `AWS > Account > CMDB` page.
2. Access the `Controls` subtab to view all Account CMDB controls.
3. Select the applicable AWS Account, choose `Actions`, then click on `Run control` to prompt Turbot Guardrails for a
   CMDB update.

If an error arises, consult the log for permission issues. If the status is OK, the credential update was successful.
