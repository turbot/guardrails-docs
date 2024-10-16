---
title: "FAQs"
template: Documentation
nav:
  order: 80
---

# Enterprise FAQs

---

- [I do not use AWS - Can Turbot Guardrails Enterprise run in Azure, GCP, or in my own data center?](#i-do-not-use-aws---can-turbot-guardrails-enterprise-run-in-azure-gcp-or-in-my-own-data-center)
- [What AWS services does Turbot Guardrails Enterprise require?](#what-aws-services-does-turbot-guardrails-enterprise-require)
- [Do I need to use Route53 for Turbot Guardrails?](#do-i-need-to-use-route53-for-turbot-guardrails)
- [How does Turbot Guardrails use AWS Elastic Container Service (ECS)?](#how-does-turbot-guardrails-use-aws-elastic-container-service-ecs)
- [How does Turbot Guardrails secure local disk storage?](#how-does-turbot-guardrails-secure-local-disk-storage)
- [Do I need to use AWS ACM for the Turbot Guardrails Enterprise Certificate?](#do-i-need-to-use-aws-acm-for-the-turbot-guardrails-enterprise-certificate)
- [Do Turbot Guardrails Lambda functions run inside a VPC?](#do-turbot-guardrails-lambda-functions-run-inside-a-vpc)
- [Can Turbot Guardrails traffic be directed through an HTTP proxy?](#can-turbot-guardrails-traffic-be-directed-through-an-http-proxy)
- [What URIs does Turbot Guardrails need access to via a proxy?](#what-uris-does-turbot-guardrails-need-access-to-via-a-proxy)
- [My organization uses SSL/TLS inspection - is this supported for Turbot Guardrails Enterprise?](#my-organization-uses-ssltls-inspection---is-this-supported-for-turbot-guardrails-enterprise)
- [Does Turbot Guardrails support encrypted ECS AMIs?](#does-turbot-guardrails-support-encrypted-ecs-ami)
- [How do I update the AMI used by the ECS Hosts?](#how-do-i-update-the-ami-used-by-the-ecs-hosts)
- [How do I configure the Turbot Guardrails Load Balancer to log to my central logging bucket?](#how-do-i-configure-the-turbot-guardrails-load-balancer-to-log-to-my-central-logging-bucket)
- [Can Aurora be used instead of RDS for the Turbot Guardrails database?](#can-aurora-be-used-instead-of-rds-for-the-turbot-guardrails-database)
- [How to add launch constraint to Turbot Guardrails portfolio](#how-to-add-launch-constraint-to-turbot-guardrails-portfolio)
- [Would it be possible to have the Turbot Guardrails lambdas use the turbot_foundation kms key to encrypt the environment variables?](#would-it-be-possible-to-have-the-turbot-lambdas-use-the-turbotfoundation-kms-key-to-encrypt-the-environment-variables)
- [What does Service catalog provides over CloudFormation?](#what-does-service-catalog-provides-over-cloudformation)
- [How do I increase the connection timeout for the primary database?](#how-do-i-increase-the-connection-timeout-for-the-primary-database)
- [How do I increase the connection timeout for the Application Load Balancer (ALB)?](#how-do-i-increase-the-connection-timeout-for-the-application-load-balancer-alb)
- [Where does Turbot Guardrails store security and audit logs for failed login attempts to the console?](#where-does-turbot-guardrails-store-security-and-audit-logs-for-failed-login-attempts-to-the-console)
- [Is there one or more system/user accounts that exist in the enterprise database used by Turbot?](#is-there-one-or-more-systemuser-accounts-that-exist-in-the-enterprise-database-used-by-turbot)
- [How does the Turbot Guardrails application access its database?](#how-does-the-turbot-guardrails-application-access-its-database)
- [How do I update the Turbot Guardrails Enterprise license key?](#how-do-i-update-the-turbot-guardrails-enterprise-license-key)
- [Troubleshooting Long Running Lambda Workers](#troubleshooting-long-running-lambda-workers)
- [Do I need to use a wildcard certificate?](#do-i-need-to-use-a-wild-card-certificate)
- [How do I copy tags to Mod Lambdas and SNS topics?](#how-do-i-copy-tags-to-mod-lambdas-and-sns-topics)

---

## I do not use AWS - Can Turbot Guardrails Enterprise run in Azure, GCP, or in my own data center?

While Turbot Guardrails can manage resources in AWS, Azure, GCP, the Turbot Guardrails Enterprise installation must run
in AWS. Turbot also offers a Software-as-a-Service (SaaS) product that _does not_ require you to use AWS.

## What AWS services does Turbot Guardrails Enterprise require?

Turbot Guardrails Enterprise utilizes the following services in your Turbot master account:

| Service              | Purpose                                             |
| -------------------- | --------------------------------------------------- |
| ACM                  | SSL/TLS Cert for the web console/api                |
| API Gateway          | Used for Event Listener                             |
| AWS Auto Scaling     | Scale ECS containers                                |
| CloudFormation       | Run CloudFormation templates from Service Catalog   |
| CloudWatch           | CloudWatch Events, Dashboards, and Logs             |
| EC2                  | ALBs and Security Groups                            |
| ECR                  | Repository for Turbot Container Images              |
| ECS                  | EC2 Cluster for Turbot Core                         |
| Elasticache          | Instance to cache data                              |
| IAM                  | Roles for Turbot                                    |
| KMS                  | Encryption Keys                                     |
| Lambda               | Functions for setup and custom controls             |
| Performance Insights | Monitor the RDS instance                            |
| RDS                  | Postgres Database                                   |
| Route 53             | Hosted zone with records for Turbot Workspaces      |
| S3                   | Bucket for logging                                  |
| Service Catalog      | Share Turbot product CloudFormation templates       |
| SNS                  | Topics used for sending events to Turbot            |
| SQS                  | Event Queue                                         |
| SSM                  | Parameter Store for installation configuration data |

## Do I need to use Route53 for Turbot Guardrails?

It is recommended that you allow Turbot to manage DNS records in Route53 as it
greatly simplifies the deployment and upgrade process, however you are not
required to do so.

If you elect to use your own DNS infrastructure, you will need to
[update DNS records every time you install a new version in your workspaces](enterprise/installation/post-installation#update-dns-records).

## How does Turbot Guardrails use AWS Elastic Container Service (ECS)?

The Guardrails ECS clusters are run in private VPCs with no task or service publicly
accessible. Guardrails has three types of containers that run in ECS:

1. **API Containers**: These are long-running containers that have inbound
   connectivity from the ALB and serve API requests.
2. **Events Containers**: Responsible for ingesting incoming events from managed cloud accounts. Enables the Guardrails
   real-time event model.
3. **Terraform Factory Containers**: Single use containers that compose Terraform
   templates dynamically and are terminated at the end of execution, which is
   typically less than 1 minute.

## How does Turbot Guardrails secure local disk storage?

API Container root filesystems are mounted as read-only, and no additional
volumes are attached to an ECS task.

Terraform Factory Containers use the local filesystem to dynamically compose a
Terraform template and then execute a Terraform plan and apply. These containers
have no inbound connectivity and are terminated at the end of their task.

## Do I need to use AWS ACM for the Turbot Guardrails Enterprise Certificate?

Yes, customers will need an ACM certificate, even if DNS is hosted by the
organization.

- The ACM certificate must exist in the same region as the Turbot Guardrails Enterprise
  installation.
- The certificate domain name must match the Installation Domain Name.
- The certificate must have an additional name that is a wildcard for the
  Installation Domain Name

## Do Turbot Guardrails Lambda functions run inside a VPC?
Turbot Guardrails Lambda functions fall into two categories:  Management Lambdas and Mod Lambdas.
Management Lambdas are deployed by the TEF, TED and TE stacks.  These are always deployed inside the Guardrails VPC.
Mod Lambda functions generally interact directly with cloud
service providers.  They are not connected to a VPC for improved performance and
efficient use of VPC IP space.

As of [Turbot Guardrails Enterprise 5.20.0](releases/te#5200-2020-05-28), Guardrails supports
running Mod Lambdas within a VPC. This is primarily aimed at organizations wishing
to inspect and control all network traffic.

## Can Turbot Guardrails traffic be directed through an HTTP proxy?

Guardrails has the ability to run behind a proxy, as long as it can still reach
cloud service provider APIs via that outbound internet access proxy.
[Proxy options](enterprise/installation/tef-installation#network---proxy) can be
selected during [installation](enterprise/installation), or can be updated by
re-running the [TEF](enterprise/installation/tef-installation) and
[TE](enterprise/installation/te-installation) stacks.

Please note that typically the HTTPS proxy points at an `http://address:port` to
avoid certificate issues. Note also that `169.254.169.254` should be in the
`NO_PROXY` list, as it is a static route used to reach AWS internal metadata
service.

Some AWS services are not proxy-aware. If using a proxy, you must also create
VPC endpoints to allow EC2 to access the following AWS services:

- ECR API
- ECR DKR
- CloudWatch Logs
- S3

## What URIs does Turbot need access to via a proxy?

Amazon Web Services URIs must be accessible for the local Turbot master account
regardless of the cloud service providers you are using Turbot to manage:

- `https://*.amazonaws.com`
- `https://signin.aws.amazon.com`

The web proxy/filter that Turbot connects to must whitelist the following URIs
for access to each cloud service:

**Amazon Web Services**

- `https://*.amazonaws.com`
- `https://signin.aws.amazon.com`

**Microsoft Azure**

- `https://login.microsoftonline.com`
- `https://login.windows.net`
- `https://management.azure.com`
- `https://graph.windows.net`

**Google Cloud Platform**

- `https://accounts.google.com`
- `https://*.googleapis.com`

Alternatively, you can micro-segment if needed

- `https://accounts.google.com`
- `https://www.googleapis.com`
- `https://cloudresourcemanager.googleapis.com`
- `https://logging.googleapis.com`
- `https://servicemanagement.googleapis.com`
- `https://iam.googleapis.com`

## My organization uses SSL/TLS inspection - is this supported for Turbot Guardrails Enterprise?

Guardrails does not currently support the use of MITM SSL interception proxies.  Customers requiring traffic
introspection should use a Proxy instead. Guardrails uses several AWS services that do not support inclusion
of the third party certificates necessary for these solutions to work. You will need to create exceptions
for the VPC hosting Guardrails to allow outbound traffic to AWS, GCP, and Azure API endpoints.

## Does Turbot Guardrails support encrypted ECS AMI?

Turbot Guardrails uses the Amazon Linux 2 AMI for ECS hosts by default. Customers
requiring encrypted EBS volumes for the Guardrails ECS hosts can use one of two approaches:

**EBS Default Encryption**
1. Enable "Default KMS Key for EBS Encryption" using the AWS
   [instructions](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html).
   Ensure the CMK has
   [sufficient permissions](https://docs.aws.amazon.com/kms/latest/developerguide/services-ebs.html#ebs-cmk).
2. Create a new SSM parameter `/turbot/enterprise/ecs_ami` with the value of the
   AMI created in the previous step.
3. Update the TEF template from Service Catalog.
4. In the TEF template, replace the value of `ECSAMI` with
   `/turbot/enterprise/ecs_ami`.
This approach assumes an unencrypted AMI but the resulting volumes are encrypted by default.
No special considerations for the AMI need to be made beyond using a recent release.

**Create an Encrypted AMI**

1. Create an encrypted Amazon Linux 2 AMI using these
   [instructions](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/CopyingAMIs.html).
   Ensure the CMK has
   [sufficient permissions](https://docs.aws.amazon.com/kms/latest/developerguide/services-ebs.html#ebs-cmk)
   that the ECS and Autoscaling services can decrypt the volumes.
2. Create a new SSM parameter `/turbot/enterprise/ecs_ami` with the value of the
   AMI created in the previous step.
3. Update the TEF template from Service Catalog.
4. In the TEF template, replace the value of `ECSAMI` with
   `/turbot/enterprise/ecs_ami`.
    - In the event of a rollback, the default value is:
      `/aws/service/ecs/optimized-ami/amazon-linux-2/recommended/image_id`
5. Finish updating the TEF template.
    - Cloudformation will do a rolling update of the ECS hosts. No downtime is
      expected.
6. Verify that the EC2 instances have restarted and are using the new encrypted
   AMI.
7. Verify that the Turbot console is working and events are being processed.

### Ongoing Maintenance when using encrypted AMI Customers with encrypted

Volumes should follow the   [Amazon Linux 2 release notes](https://aws.amazon.com/amazon-linux-2/release-notes/).
On a periodic basis, a new AMI should be rebuilt to include the latest
updates.

## How do I update the AMI used by the ECS Hosts?

The AMI used by the Guardrails ECS hosts can be updated independent of a TEF version upgrade.

1. In Service Catalog, go to Provisioned Products.
2. Select the TEF stack.
3. In the top right corner, under the "Actions" menu, choose "Update".
4. A big list of TEF releases will appear. If your intent is to only update ECS AMIs, then choose the currently deployed
   TEF version.
5. In the TEF stack, there's a parameter called "AMI type for EC2 ECS host". The default value
   is `/aws/service/ecs/optimized-ami/amazon-linux-2/recommended/image_id`.
    1. If you're still using the custom AMI, then you'll need to update the AMI cited in the SSM parameter to the newest
       golden ECS AMI.
    2. AWS automatically updates the value of the ECS Recommended Image ID.
6. If it's the standard AWS ECS AMI, then scroll down to the "Parameter Deployment Trigger" and toggle it from Blue to
   Green or Green to Blue.
7. Click the orange Update button at the bottom.
8. CloudFormation will update the TEF ASG Launch Template to use the current value of the ECS AMI SSM parameter. Wait
   10-ish minutes for the ASG to do its thing. When the TEF stack completes, you'll be running the latest ECS AMIs.

## How do I configure the Turbot Guardrails Load Balancer to log to my central logging bucket?

Some customers may wish to specify an alternate logging bucket for the Guardrails
Load Balancers (ALB); this answer describes how to override the default value
when installing a new version of Turbot Guardrails Enterprise (TE).

When installed, the TE Product creates an ALB and enables access logging to an
existing bucket that was created as part of the TEF install. The default bucket
name is stored in the ssm parameter: `/turbot/enterprise/log_bucket`. When
installing the TE stack you can override the value of this SSM Parameter to a
predefined bucket. To do so, follow the same process you would use for a Turbot
Guardrails Enterprise upgrade:

1. Navigate to the AWS Service Catalog service
2. Choose `Products` > `Turbot Guardrails Enterprise` > `Launch Product`
3. Select a version
4. Name the product and click `Next`
5. Scroll down to the section named: `Advanced - TEF Overrides`
6. Look for the param named `Log Bucket Name`
7. Specify the name of your custom bucket. (Notice: Your custom bucket must have
   a bucket policy that allows the AWS ALB service to log to that bucket)
8. Finish any other TE configuration needed and launch the product.
9. The ALB created by the stack will use your specified bucket for logging.

## Can Aurora be used instead of RDS for the Turbot Guardrails database?

No. Guardrails makes extensive use of the `ltree` extension in Postgres for
hierarchy management. That extension is not currently supported in Aurora.

## How to add launch constraint to Turbot Guardrails portfolio

Log into the AWS account with the portfolio share. Navigate to Service Catalog,
then click the `Portfolios` tab in the `Administration` section, and finally
click the `Imported` tab.

Click the Turbot portfolio. You should now see the TEF, TED, and TE products. At
this point, select one product by clicking the product name, then click Actions,
then Copy product. Select the same region which the portfolio currently resides
and click ok.

After a few moments the product should appear under the Administration product
list. From here, you can create a local portfolio and add the copied products.
To apply a launch constraint to this new, local portfolio, Please refer to
[AWS Documentation](https://docs.aws.amazon.com/servicecatalog/latest/adminguide/constraints-launch.html).

## Would it be possible to have the Turbot lambdas use the turbot_foundation kms key to encrypt the environment variables?

turbot_foundation kms keys are only used for short term encryption data that
flows through SNS/SQS and not to encrypt the Turbot Lambda’s environment
variables.

## What does Service catalog provides over CloudFormation?

Service catalog allows us to distribute a bundle of lambdas, containers etc. So
there is only one bundle to distribute instead of many things separately. It
uses CFN behind the scene. The benefit if it is that we can simply publish new
versions of TEF, TED and TE to the catalog, making it easy for customers to
install/upgrade.

## How do I increase the connection timeout for the primary database?

If you're getting the error `Network error: Unexpected token < in JSON` at
position 0 when doing something heavy, like importing a large account, you may
need to increase the connection timeout for the primary database. Anytime we
increase the connection timeout, we want to be reasonable about the increase
(e.g., go from 1 minute to 2 minutes, not 1 minute to 60 minutes)

- In the primary (alpha) region, go to Service Catalog.
- Select the TED stack from the Provisioned products list (note the version).
- Select `Actions > Update`.
- On the first update page, keep the version the same as what it's currently at
  and select `NEXT`.
- Find the parameter `Maximum Allowed Duration of Statement` and then increase
  it accordingly (2 minutes is a safe first update, so 120000).
- Select `NEXT` and then `UPDATE` to apply the change. Once the DB has updated
  with the newly updated param group, you can try the action again. If you want
  the UI / API to not timeout, you should make the ALB timeout match.

**Note**: Don't forget, once you are done with the blocked action, revert these
changes immediately.

## How do I increase the connection timeout for the Application Load Balancer (ALB)?

Changes to the ALB and ECS container timeouts are best done concurrently with updates to
the TED `statement_timeout` parameter. ALB and ECS Container timesout are specified via SSM
parameter, as there is no parameter in the TE Serivce Catalog product to increase
HTTP timeout. The ECS containers look for the SSM parameter
called `/${ResourceNamePrefix}/overrides/enterprise/alb_idle_timeout` on launch to
establish their internal HTTP timeouts.

1. Create a new SSM Parameter in the AWS region that hosts the Guardrails install.
   This can be done manually, via CFN, Terraform, or by whatever method is preferred.
   For convenience, a CloudFormation template can be found below.
   Override the value to match the DB's statement_timeout parameter; `300` seconds is common.
   The default value for `${ResourceNamePrefix}` is `turbot`.

```yaml
AlbIdleTimeoutParameter:
  Type: AWS::SSM::Parameter
  Properties:
    Name: !Sub "/${ResourceNamePrefix}/overrides/enterprise/alb_idle_timeout"
    Description: "ALB Idle Timeout"
    Type: String
    Value: 130
```

2. Update the TE stack, flipping the Blue/Green parameter to force a
   re-evaluation of the SSM parameters.
3. The ECS containers for this TE stack should bounce.
4. After the TE stack finishes with the update, test again.

When you update the TE stack, the ALB's parameters are updated. Importantly, the
timeout parameters are also updated on the HTTP services running on the API
containers. If you manually edit the ALB only, the API containers will still
have the default value of 120 seconds.

**Note**: Don't forget, this should not be a permanent change, so revert these
changes as soon as possible. Consult with Turbot Support if this becomes a long term
requirement.
**Note**: The shortest timeout between the DB, ALB and ECS containers dictates
the maximum timeout for an HTTP call.


## Where does Turbot Guardrails store security and audit logs for failed login attempts to the console?

Turbot API calls, including failed login attempts are logged to a CloudWatch Log
Group. The name is of the form `/turbot/{hive}/api/audit`. The log stream name
is the workspace name, followed by a prefix, and by TE version. Like this
`acme_turbot_5_34_5_7ec6b4b0`. Here is an example of a failed login (401
response) from one of our workspace.

```
{
 "id": "b50002ed-da79-4a67-ad46-ab944325067b",
 "processId": null,
 "workspace": "acme-turbot.cloud.turbot.com",
 "version": "5.34.4",
 "eventTimestamp": "2020-12-11T20:55:42.318Z",
 "type": "api.turbothq.com:CreateTurbotDirectoryProfileToken",
 "detail": {
  "source": {
      "ipAddress": "173.54.210.135",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
      "proxyIpAddresses": [
    "173.54.210.135"
      ]
  },
  "request": {
      "method": "POST",
      "protocol": "https",
      "host": "acme-turbot.cloud.turbot.com",
      "path": "/api/v5/directories/198049522322404/local/callback",
      "params": {
```

## Is there one or more system/user accounts that exist in the enterprise database used by Turbot Guardrails?

- There is a `master user` (standard in all PostgreSQL DBs) and the `turbot user` created as a part of
initial DB configuration during TED deployment.
- We only use `master user` for setup, and reset it
  automatically when needed. No one knows the master password, if we need to use
  the master password we usually reset it first, and then use it. We don't
  store the password.
- The `turbot user` doesn't have password, we use the `RDS IAM Authentication`
  to connect to the database.

## How does the Turbot Guardrails application access its database?

- Guardrails uses the `turbot user` through IAM authentiation for general application operation.
- The `master user` is used for initial setup.

## How do I update the Turbot Guardrails Enterprise license key?

The Turbot Guardrails Enterprise license key will need to be occasionally rotated. This can
be done via the Turbot Service Catalog portfolio.

1. Log into the AWS account with the Turbot installation and sufficient rights
   to update the Service Catalog product.
2. Select the Turbot Guardrails Enterprise Foundation (TEF) provisioned product, click
   **Actions** in the top right, then select **Update**.
3. Scroll down to the Parameters and find the **Turbot License Key**. Paste the
   key into the text field. Note that all line breaks will need to be removed
   prior to pasting in the value!
4. Scroll to the bottom of the page and click **Update**. Click through the
   following page(s) to confirm the update.
5. Once the product moves back into the `Available` status, log into the Turbot
   console with admin permissions.
6. Select the **Controls** tab at the very top of the console, then search
   `Workspace Usage`.
7. Click the `Turbot > Workspace > Usage` option.

![](/images/docs/guardrails/workspace-usage.png)

8. On the **Control Type** page, click the **Controls** tab under the control
   type name. Click the `Turbot > Workspace > Usage` control.
9. Click the **Actions** button then **Run Control**.
10. That's it! If the control does not go into the OK state, try waiting ~15-20
    seconds and running the control again. If the control goes into error and
    stays there, contact [Customer Support](mailto:help@turbot.com).
11. The `Turbot > Workspace > Usage` control will need to be ran in each
    workspace associated with the AWS Master account.

## Troubleshooting Long Running Lambda Workers

Queries can sometimes cause the Worker Lambda to run long or time out. These
show up as the red line in the Worker Lambda - Duration widget in the TE
CloudWatch dashboard. Ideally, all queries would run very fast, less than 2
seconds. Long-running queries can be an early warning indicator of scalability
concerns or bugs.

[Turbot Guardrails Enterprise 5.35.0](releases/te#v5350-2021-01-22) added graph lines for
`Average`, `p90`, `p99` and `Maximum` in Worker Lambda - Duration widget. The
bigger the spread between across all graphs, the greater percentage of worker
runs are taking a long time. Brief increases due to heavy DB load are expected.
The below instructions are targeted at persistent, and/or periodic long-running
worker runs.

The provided queries are tuned for hunting down queries that take over two
minutes, but can be used to troubleshoot any duration. Workers time out at 7.5
minutes or 450,000ms. The default RDS `statement_timeout` period is 60000 ms. Be
aware that the shorter one sets the `@duration` value, the more results there
will be.

In order to find the long-running worker runs, do the following:

1. Go to the Log Insights page in the CloudWatch dashboard in the primary region
   of the Turbot Master account. Search for the log group named
   `{resource_prefix}_worker\_5\_{minor}_{patch}`. You want to be searching
   through the appropriate logs.

2. Get list of long-running queries by searching through the worker CloudWatch
   logs: The value of `120000` can be adjusted to whatever value is required.

```
fields @timestamp, @message
| filter ispresent(@duration) and @duration > 120000
| sort @timestamp desc
| limit 20
```

3. Copy the request ID into the @requestId field in the below query

```
fields @timestamp, @message
| filter ispresent(@requestId) and @requestId like "55f48b1d-70c6-57af-9848-d31f9e505116"
| sort @timestamp desc
| limit 100
```

4. The request record from step 2 will have resource, policy and control IDs.
   Look those up in the Turbot console.

    - Controls: `{turbot_host_name}/controls/{controlID}`

    - Resources: `{turbot_host_name}/resources/{resourceID}`

5. Troubleshoot from there.

Long worker lambda times can be attributed to database load, network congestion,
policy values, scope, and more. If Lambda duration continues to be an issue
after investigation, reach out to [Turbot Support](mailto:support@turbot.com)

## Do I need to use a wildcard certificate?

No. While Turbot recommends a wildcard certificate to simplify configuration and
adding new workspaces, it is not strictly required. Those customers with a
private ALB and an API gateway must generate a single certificate with an entry
for each workspace hosted on the TEF deployment and for the API gateway. Even if the
`gateway.{installation.domain.name}` hostname won't be used for event handling because of DNS
considerations, it must still be included in the certificate.
For an installation with a single workspace and an API gateway, the certificate must contain:

```
{console_a}.{installation.domain.name}
gateway.{installation.domain.name}
```

 For an installation with multiple workspace and an API gateway, the single
certificate must contain:

```
{console_a}.{installation.domain.name}
{console_b}.{installation.domain.name}
{console_n}.{.installation.domain.name}
gateway.{installation.domain.name}
```

 For an installation with a public ALB, the
`gateway.{installation.domain.name}` entry can be excluded. The value of
`{installation.domain.name}` must match the value provided to the
"Installation Domain Name" parameter in the TEF stack. The `{console}` value
must match the workspace parameter in the Workspace CFN template.


## How do I copy tags to Mod Lambdas and SNS topics?
Guardrails will automatically copy the tags applied to the Service Catalog Turbot Guardrails Enterprise Foundation (TEF) product over to the Mod Lambdas and SNS topics. This process does not require TEF/TED/TE version updates.
1. Log into your Turbot Master account then head over to Service Catalog.
2. Identify the TEF product in the Provisioned Products list.
3. Update the TEF product. Stay on the current version.
4. Scroll all the way to the bottom.  You'll see a place to put in your tags.
5. Set the required tag keys and values.
6. Click "Update".
7. When the TEF stack has finished updating, switch over to the Guardrails console.
8. The Type Installed controls are responsible for deploying the SNS topics and Lambda functions that execute each control. They are also responsible for copying the tags from the TEF stack.
9. Run all the `Turbot > Mod > Installed` controls at 5 minute intervals. This will download the zip file that holds the Lambda code.  The zip file must be present in order to run the Type Installed controls.  Running a `Turbot > Mod > Installed` control automatically reruns the `Turbot > Type Installed` controls for that mod.
   - The easiest way to run all the Turbot > Mod > Installed controls is with the run_controls_batches script found in the [Guardrails-Samples Repo](https://github.com/turbot/guardrails-samples/tree/master/api_examples/python/run_controls_batches).
   - `python run_controls_batches.py -b 1 -d 300 --filter "controlTypeId:'tmod:@turbot/turbot#/control/types/modInstalled'"`
10. Some `Turbot > Type Installed` controls may be in an `error` state with an error message like "Rate Exceeded". Rerun those Type Installed controls.
    - `python run_controls_batches.py -b 10 -d 60 --filter "controlTypeId:'tmod:@turbot/turbot#/control/types/controlInstalled' state:error"`
