---
title: Importing Accounts
sidebar_label: Importing Accounts
---

# Importing Account Basics

Guardrails makes it easy to import AWS accounts, Azure subscriptions, and GCP
projects. All three types of accounts can be imported via the Console,
Terraform, or even via a GraphQL API request. Do a thorough read of the
appropriate integration guides. These contain additional steps that must be done
prior to importing into Guardrails:

- [AWS](guides/aws)
- [Azure](guides/azure)
- [GCP](guides/gcp)

Ensure that the proper access permissions are in place in the child account or
Guardrails won't be able to get very far with Discovery!

## Guardrails Console

![Guardrails Import](/images/docs/guardrails/turbot_import_tile.png)

Pick a cloud resource to import

![Guardrails Account Type](/images/docs/guardrails/turbot_account_type.png)

### AWS

This is the information required to import an AWS Account.

![New AWS Account](/images/docs/guardrails/turbot_new_account.png)

### Azure

#### Subscription

This is the information required to import an Azure Subscription.

![New Azure Subscription](/images/docs/guardrails/turbot_new_subscription.png)

#### Tenant

This is the information required to import an Azure Tenant.

![New Azure Tenant](/images/docs/guardrails/turbot_new_tenant.png)

#### Management Group

This is the information required to import an Azure Management Group.

![New Azure Management Group](/images/docs/guardrails/turbot_new_management_group.png)

#### Active Directory

This is the information required to import an Azure Subscription.

![New Azure Subscription](/images/docs/guardrails/turbot_new_subscription.png)

### GCP

This is the information required to import an GCP Project.

#### Simple import

![New GCP Project Simple](/images/docs/guardrails/turbot_new_project_simple.png)

#### Advanced import

![New GCP Project Advanced](/images/docs/guardrails/turbot_new_project_advanced.png)
