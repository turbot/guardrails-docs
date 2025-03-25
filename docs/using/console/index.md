---
title: Console
sidebar_label: Console
---

# Guardrails Console

The Guardrails Console is designed so administrators can easily and quickly navigate
their resource hierarchy along with viewing policies and controls. Every page in
Guardrails will have six tabs at the top: `Resources`, `Policies`, `Controls`,
`Permissions`, `Reports`, and `Search`. Users with `Turbot/Admin` rights will
find the `Workspace Admin` page by clicking on the gear icon in the top right.

## Header

![header](/images/docs/guardrails/header-apollo.png)

The **Header** is consistent throughout and consists of:

- **Turbot Logo**: An easy way to navigate back to the Guardrails Console home page.
- **Resources**: View and search resources within the environment.
- **Policies**: View, search, and create Policy settings and values.
- **Controls**: Quickly and easily find relevant controls, as well as getting an
  environment wide overview of controls in various states.
- **Permissions**: Assign and revoke permissions.
  [Directories](guides/directories) can be viewed, modified, and created by
  clicking the Directories card.
- **Reports**: Get curated information, such as CIS controls by account, and
  easily export the results to CSV.
- **Search**: General search tab for all resources, controls, and policies.
- **Profile**: The current logged in user profile page. This includes any
  relevant profile metadata along with the ability to create and delete Guardrails
  API access keys.
- **Developers**: A robust, real time GrahpQL query engine.
- **Admin**: Workspace administration page detailing upgrade history, account,
  and mod information.
- **Help**: If you have questions, we have answers in our help documentation!

<!-- <br />

### Navigation Bar

The **Navigation Bar** allows you traverse the various Turbot hierarchies via Filters.  Selecting items in the Navigation Bar will update the current filter(s) in the active window.  While you will most commonly navigate the resource hierarchy, you can also filter by Control Category, Control Type, Policy Type, Resource Category, or Resource Type.
![nav bar](/images/docs/guardrails/nav-bar.png)

<br /> -->

<!-- ### Active Window

The **Active Window** shows the details for items in the current filter.  The currently active filter(s) are shown at the top.
![active window](/images/docs/guardrails/active-window.png)

This section is further broken up into the following panes:

* The **Overview** shows the details for the selected resource, as well as summary information about the controls and recent activities for the item.
![overview](/images/docs/guardrails/overview.png)

* The **Activity** pane lists the notifications for this resource.  This provides an audit of all the activities performed on this resource, including changes to the cloud resources since discovery, as well as updates to Turbot policies and permissions. Click an item in the list to see more detailed information about the change.
![activity](/images/docs/guardrails/activity.png) -->

### Resources Dashboard

The Resources tab can be used to easily search through all resources under
Guardrails management! The information is displayed respecting the folder and
resource hierarchy. Users can easily navigate into specific resources to get
specific metadata information, view relevant controls, policies, reports, as
well as a Developer tab.

![resources](/images/docs/guardrails/turbot_example_company_resources.png)

The Developer tab's focus is to give developers direction when using Terraform,
GraphQL, or a scripting language.

![dev-console](/images/docs/guardrails/dev-console.png)

- **Resource ID**: The Guardrails resource ID. This is unique for every resource
  under Guardrails management, including Guardrails resources such as mods. In this
  example, the resource is a [Folder](concepts/resources/hierarchy#folders).
- **Resource Type URI**: This is a less unique identifier, but still an
  important one that defines what the resource is.
- **GraphQL**: A collection of graphql queries. This includes a `query` and two
  mutations. Clicking on these will open the Developer console with the query
  already input. Simply run and see the result!
- **CLI**: Example CLI query using the [Guardrails CLI](reference/terraform).
- **Terraform**: Formatted Terraform code for the selected resource. This can be
  copy pasted directly into a Terraform configuration file!
- **Terraform Import**: CLI command to import an existing resource into an
  existing Terraform state file.

### Policies Dashboard

The Policies tab dashboard provides visibility into the policy settings, policy
types and policy packs. The text field can be used to manipulated using
[filters](reference/filters/policies) to return specific information. The
`Policy Packs` and `Policy Settings` cards can be used to easily navigate to
those pages.

![policies](/images/docs/guardrails/turbot_example_company_policies.png)

**Note**: When navigating to the policies page, the right side will also include
a list of policy packs if there are any in the environment.

Policies make assertions about how a particular resource should be configured.

Check out the [Policies Docs](concepts/policies) for more detailed information.
The [Mods Repository](https://hub.guardrails.turbot.com/#mods) (free registration required) has documentation about
which policies are available and the behavior of those policies, sorted by mod
type.

### Controls Dashboard

The **Controls** dashboard provides visibility into the status of all controls
related to the resources. The cards provides a visual representation of the
state of all the related controls, with flexible sorting and grouping. The
**Policy Settings** and **Policy Pack** cards can be used to easily navigate to
those pages.

![controls](/images/docs/guardrails/turbot_example_company_controls.png)

A key point to remember is that a control tracks the state of a resource as it
relates to a policy. It can also be thought of as the combination of a resource
with a policy. Controls can be in a state of `Error`, `TBD`, `Invalid`, `Alarm`,
`OK`, or `Skip`. For more information, check out the
[Controls Docs](concepts/controls).

### Permissions Dashboard

The **Permissions** dashboard shows the currently granted permissions. Cards
such as **Active Grants**, **Directories**, **User Profiles** and **Group
Profiles** provides visibility into grants, directories, user profiles, and
group profiles.

![permissions](/images/docs/guardrails/turbot_example_company_permissions.png)

The default permissions view shows which user profiles have what permissions.
With `Turbot/Owner` permissions, a green `Grant Permission` button will appear.
More details about setting permissions and what the various permission levels
mean can be found in the [Permissions Docs](concepts/iam/permissions).

Tip: Multiple permissions can be granted to a profile, but not all of them have
to be active at the same time. Click the down button to deactivate a permission.
Click the up button to activate it.

### Reports Dashboard

Reports make it easy to get curated information and then allow the user to
export the results directly to a CSV!

![reports](/images/docs/guardrails/turbot_example_company_reports.png)

The tab includes a collection of queries that make it quick and easy to find the
exact information that is desired. If you do not see a report that you think
would be interesting, reach out to us at
[help@turbot.com](mailto:help@turbot.com) to submit your request!

![report filter](/images/docs/guardrails/turbot_example_company_reports_filter.png)

Use the filter to get specific information about resources (or controls or
policies), then click **Export to CSV** to automatically download a copy of the
report! Note that reports longer than 5,000 items will be truncated.

### Search Dashboard

![search](/images/docs/guardrails/turbot_example_company_search.png)

When all else fails, head on over to the search tab and take advantage of our
[Filters](reference/filter) to find the information you need and present it in
the way you want.

### Admin Dashboard

The Workspace Admin page gives information on the workspace version, upgrade
history, mod version and their upgrade history, a total number of controls, and
identity and access management information. The Dashboard tab covers the above.
The Accounts tab will list all imported accounts, and the Mods tab will list all
installed mods.

![admin](/images/docs/guardrails/turbot_example_company_admin.png)

Check out the [Mods docs](https://hub.guardrails.turbot.com/#mods) for more information.

Tip: To the left of each mod, you can click the green check, red circle or gray
question mark to jump straight to the state of the `Mod Installed control` for
that mod.
