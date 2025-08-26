---
title: Accounts
---

# Accounts

In Turbot Guardrails, an **Account** is a foundational resource type that represents a distinct administrative boundary or management scope within a cloud provider, platform, or service.  Guardrails accounts correspond to the primary organizational units used by various platforms - such as an AWS Account, Azure Subscription, GCP Project, Kubernetes Cluster, or GitHub Repository. Each account serves as a logical container that groups related resources together under a common governance framework and typically shares similar access controls, billing arrangements, or operational boundaries.

To manage resources, you must import one or more accounts. The details vary by cloud provider, but generally, you may either:

- **Import the organization.**  Guardrails allows you to import multiple accounts at once by importing the organization.   When you import an organization, the Guardrails CMDB will reflect the hierarchy in your cloud organization.  Guardrails will create resources for any OUs, folders, and resource groups, as well as the accounts in your organization.  Guardrails will keep the CMDB up to date as your organization changes, automatically adding accounts to Guardrails when they are added to your cloud organization, and removing them from the CMDB when they're deleted from your organization.

- **Import each account directly.**  You can import each account individually. You can choose which folder to import the account into, allowing you to create a distinct hierarchy in Guardrails that is different from the cloud organization.  In this model, Guardrails cannot automatically create and delete accounts; you must manage them yourself.

### Event Handlers & Pollers

Guardrails provides two patterns to keep the CMDB in sync with your cloud provider state.

- **Event handlers** *push* events to Guardrails as events occur.  Typically, event handlers will require write access to the cloud provider and will create resources in the account to forward events to Guardrails.  Event handlers *typically* provide more timely CMDB updates than polling since they are triggered as events occur.

- **Event Pollers** *pull* updates to Guardrails on a schedule. Updates are typically slower than event handlers since they happen at regular intervals, but pollers are usually simpler to set up.

Not all cloud providers provide both mechanisms, and the default setup and configuration options vary by provider.


<!--
Accounts function as critical anchor points in the Guardrails resource hierarchy, typically appearing as direct children of folders and serving as parents to the actual cloud resources discovered within them. For example, an AWS Account resource would contain all the regions, S3 buckets, EC2 instances, and other AWS resources discovered within that account's scope. This hierarchical relationship enables Guardrails to apply policies consistently across all resources within an account while maintaining the flexibility to override or customize governance rules at more granular levels. The account-level abstraction also facilitates cross-cloud management by providing a normalized way to handle similar concepts across different platforms, regardless of whether the underlying provider calls it an account, subscription, project, or repository.
-->