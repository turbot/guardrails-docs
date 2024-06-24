---
title: Search and Visualize
sidebar_label: Search and Visualize
---

# Search and Visualize Resources and Controls

The [Guardrails Console](guides/console) is optimized for viewing resources, setting policies, and viewing controls. A resource can be anything from a [Turbot Guardrails Folder](concepts/resources/hierarchy#folders) to an instance in GCP Compute.

[Policies](concepts/policies) are how you define your resource configuration expectations.

[Guardrails](concepts/guardrails) then run queries against the Turbot Guardrails CMDB that check cloud resource metadata against your set policies. The result is a status of `OK` (green), `Alarm` (red), `Error` (light red bar with dark red outline), `Invalid` (red bar with cross hatch), `Skipped` (gray with cross hatch), and finally `TBD` (solid light gray). These are displayed to you in the form of a [Control](concepts/controls).

Let's break these down.

## Suggested Reading

Recommended concepts to review before following the steps below:

- [Turbot Guardrails Console](guides/console)
- [Resources](concepts/resources)
- [Controls](concepts/controls)
- [Guardrails](concepts/guardrails)
- [Policies](concepts/policies)
- [Searching and Filtering](guides/searching-filtering)

## Resources

Let's walk through through how to view and search for a resource, and what the resource detail page displays

Start by clicking the **Resources** tab at the top of the UI. This opens a new page with a search bar at the top. Don't worry if you don't see anything listed. That is probably because you have not set any resource as your favorite! As an administrator, a good tip is to favorite at minimum the **Turbot** level. This simply reduces the amount of clicks to get to the appropriate resource page.

In the search bar, try typing any of the following strings. Use one that you know Guardrails has discovered during the import to ensure results!

- AWS: "S3 Buckets"
- Azure: "Storage Accounts"
- GCP: "Storage Buckets"

Here is an example of what one of the searches looks like:

![](/images/docs/guardrails/s3-bucket-example.png)

Select one of the resources in the list. This will take you directly to the [Resource Detail page](guides/console/detail-pages#resource-details). This is an overview of the resource and its metadata. Note that the **Data** tab is the specific resource information, while the **Metadata** tab is account, region, and create timestamp information. Take a moment to check it out! In the case of an S3 bucket, you will see policy, public access, ACL, tagging, and more information. All of these fields are searchable and can be used in [Calculated Policies](concepts/policies/calculated-faq), which we will review in a later section.

Click on the **Controls** tab next to the Detail tab. This is a list of all relevant controls. Again, with the S3 bucket, we see things like CMDB, Encryption in Transit, and Tags. Note that the rows include information at a glance such as the control state, when the control ran recently, and the reason for the control state. You can click further into the the resource for more information.

Back on the resource page, click the **Activity** tab. This is an overview of the resource, policy, and control state changes, known as [Notifications](concepts/notifications). Clicking any of these rows will bring you to the relevant process page. You can find logs and details of the process, among other info. Click around to see what you might find.

Notes:

- The **Policies** subtab is to view all policy values inherited by the resource. We will cover these more in
  [Policy Management](getting-started/policy-management).
- **Reports** is a quick way to find common queries about the viewed resource.
- **Developer Tools** offer an outstanding way to get quick access to GraphQL queries, CLI commands, and Terraform for users using [Guardrails Developer tools](reference).
- When viewing the resource, you will notice the breadcrumb at the top, e.g. `Turbot > Sandbox > Cloud Account > Region/ Resource Group > Resource name`. Any of these names can be clicked to navigate directly to that resource. Hierarchy is important for context in reporting and setting policies and permissions with inheritance!

## Controls Page - Governance Controls

1. Click on the "Controls" tab in the header
2. Here you can view all the control health information about your resources & policies per cloud service. You can drill into the cloud provider and services to discover control information. Alternatively, you can search for what you are looking for.
3. In the search bar within the Controls page, type the following per the applicable cloud provider:
   - AWS: "S3 Bucket"
   - Azure: "Storage Account"
   - GCP: "Storage Bucket"
   - Note: Alternatively you can search for any control by its name for this example
4. There might be a list of controls showing in OK (green) or in ALARM (solid red) state. Select one of the control type (e.g. AWS > S3 > Bucket ) as an example to see more details about the control. Our [Control State documentation](concepts/controls#control-state) overviews the different possible states and what they mean.

![](/images/docs/guardrails/s3-bucket-controls.png)

5. You can click into each of them to see more details about each control and the status per resource. Filtering by Resource will help narrow the scope to a specific Folder, or Type of Resource.

## Controls Page - CIS Controls

You can also search our suite of CIS controls. Navigate back to the Controls page with the search bar by clicking the Controls tab at the top of the screen.

Either simply search for `CIS` to get a list of ALL CIS related controls, or type the cloud provider name followed by CIS, like so:

- AWS CIS
- Azure CIS
- GCP CIS

![](/images/docs/guardrails/aws-cis-example.png)

Controls are broken up into what we call [control types](concepts/controls#control-types). Similar to above, the bar indicates the state of all the combined controls. Hovering your cursor over one of these representations will display a total number of controls in that state.

Each control type represented can be selected to go to the detail page for more information. Remember that you can add additional filters to the search to get more specific information, such as `AWS CIS S3` to get a list of AWS CIS S3
controls.

## Searching and Filtering

We just practiced some searching within the Resources and Controls page, but those are just a taste of the advanced search functionality that Guardrails offers. Remember that clicking the Resources, Controls, or Policies tab displays a search bar that can be used to search those specific sections. Additionally, there is a **Search** tab (magnifying glass) that can be used to search the entire environment of all resources, controls, and policies.

For more examples and guidance around searching and filtering, head on over to our [Search and Filter Guide](guides/searching-filtering).

For in depth filter syntax information, check out our reference section on [Filters](reference/filter).

## Optional: Advanced Searching with GraphQL

As an optional use case for developers, resources can be visualized using cURL, GraphQL in any preferred SDK, Turbot Guardrails CLI, or through the built-in authenticated GraphQL IDE called GraphiQL.

Let's start by navigating back to the Resource tab, search for any resource, and select it to go to the resource detail page. On the right, click the **Developers** tab. On that page you will see the following:

![](/images/docs/guardrails/developers-tab.png)

That's a lot of information! We can get the Turbot Guardrails resource ID, resource type URI, some GraphQL queries, a CLI query, and the Terraform resource definition.

Click on the `query` under the GraphQL section. Note that most resources will show one `query` and two `mutations`. Mutations are used to change or add resources.

This will bring you to the GraphiQL page. Click the play button to input the query and Guardrails will display the response on the right. This editor is extremely powerful and is very helpful in figuring out how to query for specific information. You can adjust the query, explore the schema, look at the API docs all in one screen. For more use cases, feel free to follow our [GraphQL 7 minute lab](7-minute-labs/graphql).

## What's Next?

Whew! Now that we know how to view a resource detail page and search with filters, we can move onto policy management. This is a fundamental cornerstone of Guardrails and is how you tell the application what it should be looking for. Click the Policy Management link below.

\[[Imports and Reports](getting-started/imports-and-reports)\]
\[[Getting Started Main Page](getting-started)\]
\[[Policy Management](getting-started/policy-management)\]
