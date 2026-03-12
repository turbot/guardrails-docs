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

To import an account, navigate to **Accounts** in the left sidebar, then click the **Actions** dropdown and select **Connect Account**.

![Accounts page with Actions dropdown showing Connect Account option](/images/docs/guardrails/connect-account/connect-account-action.png)

Select your cloud provider:

![Cloud provider selection (AWS, Azure, GCP)](/images/docs/guardrails/connect-account/service-selection.png)

### AWS

AWS supports importing individual accounts or entire AWS Organizations.

**AWS Account**: Import a single AWS account with cross-account IAM role access.

**AWS Organization**: Import your entire AWS Organization hierarchy, including all OUs and member accounts. Organizations import includes:
- **Discovery Levels**: Configure which OUs and accounts to import at the resource level (full import), account level (metadata only), or exclude entirely.
- **Test Discovery**: Validate your organization structure before committing to import.
- **Test Connection**: Verify member account role access before import.

For detailed instructions, see:
- [Import AWS Account](guides/aws/import-aws-account)
- [Import AWS Organization](guides/aws/import-aws-organization)

![AWS account type selection showing Account and Organization options](/images/docs/guardrails/connect-account/connect-aws/aws-account-type-selection.png)

### Azure

Azure supports importing subscriptions, tenants, management groups, and Active Directory.

#### Subscription

Import an individual Azure Subscription.

![New Azure Subscription](/images/docs/guardrails/turbot_new_subscription.png)

#### Tenant

Import an Azure Tenant to manage multiple subscriptions.

![New Azure Tenant](/images/docs/guardrails/turbot_new_tenant.png)

#### Management Group

Import an Azure Management Group hierarchy.

![New Azure Management Group](/images/docs/guardrails/turbot_new_management_group.png)

#### Active Directory

Import Azure Active Directory for identity governance.

![New Azure Subscription](/images/docs/guardrails/turbot_new_subscription.png)

For detailed instructions, see [Import Azure Resources](guides/azure/import).

### GCP

GCP supports importing individual projects or entire organizations.

#### Simple import

Import a GCP Project with basic configuration.

![New GCP Project Simple](/images/docs/guardrails/turbot_new_project_simple.png)

#### Advanced import

Import a GCP Project with advanced options.

![New GCP Project Advanced](/images/docs/guardrails/turbot_new_project_advanced.png)

For detailed instructions, see:
- [Import GCP Project](guides/gcp/import-gcp-project)
- [Import GCP Organization](guides/gcp/import-gcp-organization)
