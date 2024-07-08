---
title: Activity and Exceptions
sidebar_label: Activity and Exceptions
---

# Managing Resource Activity and Policy Exceptions

Now that we have gone over resources, controls, and policies, you can create a test resource to see how Guardrails reacts! This section will detail how to view resource activity, get a first look at Guardrails evaluating policies on the fly when resource changes are detected, and finish up with creating manual policy exceptions.

## Suggested Reading

- [Activity and Notifications](concepts/notifications)
- [Policy Expirations](concepts/policies/values-settings#expiration)
- [Policy Exceptions](guides/managing-policies#creating-an-exception)

## Create a Resource and View Activity

Guardrails has two unique approaches to ensure that CMDB metadata is up to date. These are mutually exclusive!

The first is Event Handling, where Guardrails is notified of changes based on eventing rules configured during initial import. These often result in Guardrails detecting and reflecting changes within the cloud environment in seconds.

The second is Event Polling. This is a more lightweight approach with respect to necessary infrastructure, but it also means that there is a slight delay between resources being changed and Guardrails reflecting those changes in the CMDB.

Each organization has different use cases and will find value in one versus the other. Keep this setting in mind when making changes and waiting for Guardrails to make CMDB updates.

1. Log into your cloud console and go to the storage service (e.g. AWS S3, Azure Storage, GCP Storage).
2. Create a Bucket or Storage account with default settings. Note: Make sure the resource is created in a cloud region that Guardrails is monitoring and has access to.
3. Back in Guardrails, go to the home page or **Resources** tab in the header.
4. Search for the cloud resource you just created. You can search by name in the filter. Remember, if you are using event pollers, the resource could take a minute or two to show up.
5. Select the **Activity** subtab to view all the audit history of the cloud resource.
6. Head over to our [Notifications type documentation](concepts/notifications#notification-types) for information on all of Guardrails defined resource activities.
7. Alternatively, this resource information could be viewed in the **Activities** area of the **Reports** tab. This section is a great area to investigate resources that have been removed, as Guardrails maintains a full history of resources (unless explicitly told to remove resource history).

## Dynamic Policy Exceptions

Earlier, we set a calculated policy with the condition checking for the `turbotpoc`:`yes` key: value pair. We will be updating the monitored resource to see how Guardrails evaluates the control.

1. Stay on the **Resource Activity** tab from step 1 in the above section. Go back to your cloud console and update the tags on the resource with the key:value pair, `turbotpoc`:`yes`.
2. Per step 1, it may take seconds to minutes for the discovery to occur depending on your cloud provider.
3. This should update the activity stream automatically, but you can also reload the page to force an update.
4. Click on the most recent **Resource Updated** notification to see more details about the update. Guardrails will re-evaluate the approved control immediately upon detecting the change. This means that the approved control that was previously in Alarm automatically is now in the OK state!

## Manual Policy Exceptions

There are plenty of cases where an exception is handy. For example, a developer testing account might be testing new cloud services and administrators want to approve any resource in that service. Another use case is to skip checking for bucket versioning for a defined amount of time, say 6 hours.

1. Let's get back to that Activity subtab for the test resource created earlier. From there, click the **Policies** subtab.
2. Search for the policy we set way back when. Remember, this is either **Versioning** or **Access Tier** depending on your cloud provider.
3. You will be taken to a detailed policy value page with information about the policy setting that is inherited by the resource.
4. Towards the bottom of the page, you wil see that your policy is set at the **Sandbox** folder (or whatever resource the policy was set at earlier). Click the wrench icon next to your selected cloud resource.
5. From here, we can create an **Exception**. Select the `Skip` policy setting and keep the **Required** precedence.
6. If desired, add a note and an expiration. The note is purely for your informational purposes, while the expiration will remove the exception after the specified time.
7. Click the green **Create** button. You will be taken to the policy detail page for the new exception you just set. Checking the controls tab you will notice that the Versioning or Access Tier control for that resource is now skipped!

Here is an example of what an exception looks like in the policy hierarchy. Notice that there exists a policy setting at the AWS account level, and an exception has been set at the region level.

![](/images/docs/guardrails/exception-example.png)

## What's Next?

At this point, we have covered fundamental components of Guardrails, including Resources, Controls, Policies, Reports, and Activities. There are many other concepts to learn about from the 7000+ other OOTB policies to set and governance topics ranging from advanced policy management, [Turbot Guardrails Stacks](guides/network-stack), [Turbot Guardrails File](guides/files), [Folders](concepts/resources/hierarchy), [Smart Folders](concepts/resources/smart-folders), [Budget Guardrails](concepts/guardrails/budget), and so much more!

If you have any questions regarding Guardrails, including use cases, reach out to our [Sales team](mailto:sales+poc@turbot.com) for Free Trial users, or our [Support channel](mailto:help@turbot.com) for assistance if you are already a customer.

Guardrails also supports the use of [Terraform](getting-started/terraform-for-everything). This enables easy source control, reliable rebuilding of resources, as well as taking advantage of what Infrastructure as Code has to offer.

This concludes the guided tour of Guardrails! We highly recommend reviewing additional concepts and simply trying things out to get the hang of how things work. If you would like some direction, you can check out the following links.

- [Final Notes. Tips and Tricks for using Guardrails in the real world](getting-started/next)
- [Terraform tips and tricks](getting-started/terraform-for-everything)

### Architecture Focused

- Additional Policy Example Guides:
  - [Managing Policies](guides/managing-policies)
  - [Policy Setting in 7 minutes](7-minute-labs/set-policy)
  - [Calculated Policy in 7 Minutes](7-minute-labs/calc-policy)
  - [OCL Policy Setting Example](guides/managing-policies/OCL)
  - [YAML Policy Setting Example](guides/managing-policies/YAML)
  - [Additional Guardrail Concepts](concepts/guardrails)
- Additional Policy Examples to leverage from the Guardrails Samples Repo:
  - [Policy Setting Examples](https://github.com/turbot/guardrails-samples/tree/master/control_objectives)
  - [Calculated Policy Setting Examples](https://github.com/turbot/guardrails-samples/tree/master/calculated_policies)
- [Turbot Guardrails Stacks and Configured Guardrails](concepts/guardrails/configured)
- [Turbot Guardrails Files](guides/files)
- Turbot Guardrails Directories:
  - [Directories Concepts](concepts/iam/authentication)
  - [SAML Integration guides](guides/directories#saml-providers)
- Turbot Guardrails Firehose (Watch):
  - [Firehose Guide](guides/firehose)
  - [Building Notifications Pipelines](guides/firehose/pipelines)
  - [Setting up Firehose Using Terraform](https://github.com/turbot/guardrails-tools/tree/master/mod_examples/firehose-aws-sns/setup/terraform)
- Turbot Guardrails Hierarchy and Folders:
  - [Resource Hierarchy Concepts](concepts/resources/hierarchy)
  - [Folder Guide](guides/working-with-folders)
- Turbot Guardrails Smart Folders:
  - [Smart Folder Concepts](concepts/resources/smart-folders)
  - [Smart Folder Guide](guides/working-with-folders/smart)
- Turbot Guardrails Permissions (RBAC):
  - [Permissions Concepts](concepts/iam/permissions)
  - [Managing AWS Permissions](integrations/aws/permissions)
  - [Managing Azure Permissions](integrations/azure/permissions)
  - [Managing GCP Permissions](integrations/gcp/permissions)

### Developer Focused

- [Additional Guardrails Samples](https://github.com/turbot/guardrails-tools/tree/master/api_examples)
- [Turbot Guardrails Terraform in 7 Minutes](7-minute-labs/terraform)
- [Turbot Guardrails CLI](reference/cli)
  - [GraphQL with Turbot Guardrails CLI](7-minute-labs/cli#query-turbot-with-turbot-graphql)
  - [Custom Mod with the Guardrails CLI](7-minute-labs/cli#build-and-publish-a-mod)
- [Turbot Guardrails Custom Control Framework](7-minute-labs/custom-mod)
