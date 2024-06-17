---
title: Imports and Reports
sidebar_label: Imports and Reports
---

# Imports and Reports

Now that we are logged in, let's get to work! We can start by importing a cloud account into Turbot Guardrails, then viewing the reports tab to see what Turbot Guardrails has found. Keep in mind that an initial baseline to check for encryption, trusted access, tagging, and more will likely be set. This means that Turbot Guardrails will start running (in read-only Check mode) controls as soon as resources are discovered!

## Import

Refer to our [Integrations Guide](integrations) which details the prerequisites to importing an AWS Account, Azure Subscription, or GCP Project. These MUST be done prior to import to avoid a flood of errors! If you are trying Guardrails out via a free trial or a new SaaS customer, take careful note of the AWS account that should be trusted by your import role.

<div className="alert alert-info" role="alert">
<b>NOTE</b>: If you are importing your first account into Guardrails, we highly recommend starting with a development account. Discovery of resources requires API calls to AWS endpoints, and in special cases with high activity accounts, the API service can potentially degrade. There are ways to avoid this, such as disabling CMDB and discovery for busy resources, but those are more advanced topics that will be discussed later.
</div>

<div className="alert alert-info" role="alert"><b>NOTICE</b>: Free Tier AWS accounts cannot be used with Guardrails. If this is attempted, Guardrails will fail to properly discover resources in the account and will generate errors in the Guardrails console.
</div>

If you are running on US Turbot Guardrails Cloud, trust the account `287590803701`. For EU Turbot Guardrails Cloud, trust `255798382450`.

Be sure to check your environment for [AWS Service Control Policies (SCP)](faq/guardrails-and-aws-scps). SCPs can and will prevent Guardrails from discovering a set of resources, a specific region, or even all regions and resources. However, if the organization is blocking resource creation or particular regions, policies in Guardrails can be configured to skip discovery (i.e. set the `AWS > RDS > DB Instance > CMDB` policy to `Skip` to tell Guardrails to not look for RDS DB instances).

1. Let's first ensure we are on the Apollo console. This is what the Apollo console looks like:

![](/images/docs/guardrails/apollo.png)

If you do not see the above console after logging in, click the **Try our new console!** button next to the browse button at the top.

2. Select the **Import** card in the top right.
3. Choose the resource which you will be importing. Refer to the note above regarding Integration Guide for prerequisites.
4. The **Parent Resource** is the resource under which the resource lives. This means that all policies and permissions at the parent resource level will cascade by default into the resource(s). Exceptions, however, can be set such that settings do not cascade. Select that resource by clicking the checkbox.

<div className="alert alert-info" role="alert">For Free Trials, Guardrails has preset getting started baselines under the <b>Sandbox</b> folder.  In order for the baselines to run, please ensure your Parent resource is set to <b>Sandbox</b>.</div>

5. Input the required authorization information. If you are unsure what goes where, refer again to our [Integrations Guide](integrations)!
6. Click **Import**. That's it! Guardrails will immediately begin to discover resources within the target account/project/subscription. This can take a few minutes up to over 10s of minutes depending on the amount of resources. Feel free to refresh the import splash screen for the latest information.

<div className="alert alert-info" role="alert">
If you see more errors (light red) showing than ok (green), ensure you copied your details correctly and the Guardrails credentials has permissions. Verify, delete, then re-import the account. If you see just a few errors, don't fret! Some will likely clear over time. Resources discovered which Guardrails does not have direct access to can also generate some errors, e.g. KMS Key Policy, resources blocked by a SCP, etc.
</div>

This process can be repeated as many times as you would like, but it is also very important to be mindful of what is getting imported and where it is getting imported. Guardrails generally recommends a hierarchy that resembles the organizational control objectives and permission requirements in the cloud (i.e. QA developers all need a specific set of permissions. Try to group the resources to which they need permissions, together).

Now that Guardrails is discovering resources, what can you do with it? Well, lots of things! First, we want to get an overview of the resources that were discovered, along with reviewing some "baseline" alerts (very general control objectives such as encryption at rest and trusted access).

## Reports

At the top of the screen, click the **Reports** tab (bar graph icon). This is a collection of pre-set queries that help you discover and monitor your entire environment. Reports examples include `Resource by Resource Type`, `Alerts by Control Type`, `Account Summary`, and more. Try clicking one to see what you find!

Reports can be further modified using the filters at the top. The list of resources, controls, or policies can be exported to CSV by simply clicking the **Export to CSV** button at the top! Note that reports can return no more than 5,000 items. If your selected report is larger, try breaking it up into multiple reports using the filter and drop down options.

Simply click on the tab again to check out additional reports.

## What's next?

The next section will go over search with filters and how to visualize resources and controls. Click the link below to get started!

\[[Getting Started Main Page](getting-started)\]
\[[Search and Visualize](getting-started/search-and-visualize)\]
