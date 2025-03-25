---
title: Reporting
sidebar_label: Reporting
---

# Reports

The **Reports** tab makes it easy to get curated information and can be exported
to a CSV!

Click the Reports tab at the top of the screen, designated by a graph icon. This
will take you to the Reports splash page.

![](/images/docs/guardrails/reports-splash.png)

By default, there is a **View** filter already applied, showing the
**Available** reports. An Available report is one which has the underlying mod
installed. For example, if the `aws-ec2` mod is not installed in the workspace,
reports such as `Large AWS EC2 Instance` will not appear.

[Filters](reference/filter) enable users to curate the data to meet their
specific requirements. Any of these filters can be used in the search bar at the
top. Multiple filters can be used at the same time, separated by a space.

**Example**:

![](/images/docs/guardrails/example-filter.png)

In this example, we are searching for **Resources by Resource Type**, with the
pre-canned filter selecting the **Turbot > Acme > Marketing** resource. Two
filters are used in the text field - `$.turbot.tags.foo:undefined` and `!s3`.
The first shows all resources that do NOT have a tag named `foo`, and the second
excludes `s3` from the search.

## Types of Reports

The splash page has a list of different pre-canned reports. These are grouped by
broad categories such as **Resources**, **Controls**, and **Policies** as well
as more specific control objectives like **Encryption**.

### Resources and Policies

The Resources and Policies reports are available with a few different pre-canned
filters. If you have questions on what the related category is, Our
[Concepts](concepts) overview has more details on what categories such as a
[Resource Types](concepts/resources/types-categories#resource-types) are.

Selecting any report under these two sections will display an **Summary** along
with a list of resources or settings. Clicking any row will take you directly to
the resource or policy [detail page](guides/console/detail-pages).

### Controls

Control reports are similar to Resource and Policy reports, with the added
visibility of [control states](concepts/controls#control-state). Selecting a
specific control will bring you to the detail page. Selecting a state or
category under the summary (or state card if that is an option) will drill the
report into that specific selection. Note that when selecting a control state,
the new filter will only show controls with that state.

As an example, one could select **Control by Resource Type** to get a report
spanning the entire environment, and from there drill into a specific resource
type, such as a Lambda function (AWS > Lambda > Function).

### CIS

If the `aws-cis`, `azure-cis`, and/ or the `gcp-cis` mods are installed, a
**CIS** section will be present. This report gives a workspace wide overview of
all CIS controls.

![](/images/docs/guardrails/cis-reports.png)

Clicking on the **8 alerts** notification with respect to IAM under the CIS
section status will open a focused report with those specific alerts.

### Activity

Activity reports give users visibility into all policy and control state changes
as well as resource changes. This can be extremely useful for when resources
have been deleted from the cloud account and a history of said resource is
required. Check out this quick FAQ on how to
[check control states for resources that have been deleted](faq/general-faq#how-can-i-check-control-states-for-resources-that-have-been-deleted).

**Resource Activities** is a full list of resource create, delete, and change
events. This list has **Actor**, **Timestamp**, and **Sort** pre-canned filters.

The last two reports, **Resources Deleted by Turbot** and **Resources Updated by
Turbot**, are helpful for determining if a resource was deleted or changed by
Guardrails automation and why. Clicking any of the rows in the report will bring you
directly to the process information page, which includes logs and a history of
notifications.

## Export to CSV and Sharing Reports

Reports can be exported directly to CSV format for ease of distribution. Note
that reports with larger than 5,000 items will be truncated! If a larger report
is needed, try breaking up the large report into two smaller ones. For example,
you can filter by **Resource** to include half of the environment, i.e. a folder
containing accounts.

If you are sharing to users who have access in Guardrails, simply create the curated
report and send the URL!
