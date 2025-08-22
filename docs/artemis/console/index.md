---
title: Console
sidebar_label: Console
---

# Guardrails Console

The Turbot Guardrails Console provides a web-based interface for managing cloud governance policies, monitoring compliance, and tracking resource states across your cloud infrastructure. This documentation covers the main features and navigation of the console interface.


## Navigation
The console is organized into several main sections accessible via the left sidebar:

### POSTURE
Guardrails enables you to define and deploy your cloud governance *posture* — The items that define and enforce your cloud security, FinOps, and operational policies.  The posture section enables you to configure, observe, analyze, and troubleshoot your cloud governance rules.

- **Guardrails** are deployable units of policy enforcement that implement a control objective, such as enforcing encryption, monitoring access, and securing networking configurations. Guardrails allow you to define your policies and provide controls to audit or enforce them, enabling you to [raise the bar](https://cloudgovernance.org/library/the-cloud-governance-loop) for your organization.

- **Rollouts** provide a predictable, ordered mechanism for deploying guardrails to your organization.  When you create a rollout, you choose one or more guardrails that you would like to deploy, select the accounts to deploy them to, and set a deployment and communication schedule for promoting the guardrails through phases. Rollouts help you [make change happen](https://cloudgovernance.org/library/the-cloud-governance-loop)!


### INVENTORY

The Turbot Guardrails CMDB provides a flexible, dynamic asset inventory that enables you to [know your cloud](https://cloudgovernance.org/library/the-cloud-governance-loop).  The inventory section lets you import and manage cloud accounts, as well as search and inspect your cloud resources.

- **Accounts** are the fundamental organizational unit in cloud computing that serve as a container for your cloud resources and services.  To manage resources, you need to connect one or more accounts (AWS accounts, Azure subscriptions, GCP projects, GitHub repositories, etc).

- **Resources** represent objects that are managed by Guardrails, such as AWS S3 buckets, GCP compute instances, Azure SQL databases, etc.


### Other

- **Reports** provide curated, purpose-driven views to give you insight into the compliance, governance, inventory, and configuration of your environment.


- Your name will appear near the bottom of the sidebar.  This link allows you to view your user **profile** information and manage your API access keys.


- If you have sufficient permission, the **Admin** link also appears near the bottom of the sidebar.  The admin area is where you manage your guardrails installation.  Admin activities include mod installation and management, setting permissions, configuring authentication, and managing global inventory and settings.

- **Help** is available at the bottom of the sidebar


## Searching

Many pages include a search box at the top of the page to allow you to quickly find what you are looking for.  Guardrails' basic search capability is intuitive - simply enter text and Guardrails will perform a case-insensitive search against all the properties of all objects. 

If multiple search terms are specified, Guardrails will search for items that contain both terms.  For example, a search for `bucket demo` will return all resources that contain both `bucket` AND `demo`.

A filter can be negated with the `-` or `!` character.  For example, to find resources that do not contain `demo`, you can search for  `!demo` or `-demo`

The `search` keyword may be used to explicitly specify a full-text search. In
addition to the full-text filtering behavior described previously, `search`
allows you to specify "OR" conditions using a comma-separated list of terms. For example, to find resources that contain either `bucket` or `demo`, use the `search` keyword: `search:bucket,demo`

Regular Expressions are also supported, and should be delimited with forward
slashes. Note that regular expressions will search the title only.


### More full-text examples

| Aim                                            | Filter text      |
| ---------------------------------------------- | ---------------- |
| Require foo                                    | `foo`            |
| Exclude foo                                    | `-foo`           |
| Exclude foo                                    | `!foo`           |
| Require "foo" and "bar"                        | `foo bar`        |
| Require "foo bar"                              | `"foo bar"`      |
| Exclude "foo bar"                              | `!"foo bar"`     |
| Require foo or bar                             | `search:foo,bar` |
| title starts with "foo"                        | `/^foo/`         |
| title contains "foo", case insensitive         | `/foo/i`         |
| title does not contain "foo", case insensitive | `!/foo/i`        |


Guardrails also supports advanced searching and filtering on specific properties, filtering relative dates and times, CIDR matching, and more.  See the [Guardrails filter syntax](/guardrails/docs/reference/filter) reference documentation for details.


## Filtering and Grouping

Many pages provide a **Filter & Group** button to allow you to customize your view of the data.  For example, you may want to group your alarms by account, guardrail, then control, and only show `alarms` and `errors` for guardrails that are in `check` or `enforce` phase.

Click the **Filter & Group** button to show/hide the filtering and grouping pane.


## Developer Tab

The Guardrails UI provides a simple yet powerful way to manage your governance posture, but you can also manage your guardrails installation using Terraform or via the API.  To assist you, the console provides a **Developers** panel.  The developer panel provides context-dependent code for the current view, including the GraphQL APIs, CLI commands, and Terraform plans corresponding to the current view.

Click the purple button at the top right of the page to show and hide the panel.  