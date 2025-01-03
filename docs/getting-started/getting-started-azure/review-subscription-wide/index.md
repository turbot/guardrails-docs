---
title: Review Subscription-Wide Governance
sidebar_label: Subscription-Wide Governance
---

# Review Subscription-Wide TLS Versioning for Storage Accounts

In this guide you’ll see how a single Policy Pack can govern all resources across a project.

This is the fifth guide in the *Getting started with Azure* series.

## Prerequisites

- Completion of the previous guides in this series.

- Access to the Guardrails console with administrative privileges.

## Step 1: Open the Controls by State report

Navigate back to the **Controls by State** report (or use your saved bookmark), expand the **Type** dropdown, and search for `azure storage account tls`. Enable the checkbox next to **Azure > Storage > Storage Account > Minimum TLS Version** to set the filter.

<p><img alt="filter-1" src="/images/docs/guardrails/getting-started/getting-started-azure/review-subscription-wide/filter-1.png"/></p>

## Step 2: Filter on controls for TLS version

Your test storage account is in the Alarm (red) state out: of policy. Others, if created with the default TLS setting, are in the `OK` (green) state: in policy.

<p><img alt="filter-2" src="/images/docs/guardrails/getting-started/getting-started-azure/review-subscription-wide/filter-2.png"/></p>

## Step 3: Create test storage accounts

Return to the Azure portal and (as you did in the **Observe Resource Activity** guide) create several new storage accounts with TLS version downgraded to 1.0. For the example, we will create the following:

- guardrailsazurestorage2
- guardrailsazurestorage3

Keep your names similar and consistent so you can easily filter and see all your test storage accounts together.

## Step 4: View newly created storage accounts

As you create the storage accounts, Guardrails detects them and evaluates their configuration relative to your policies. By changing our search string we can see all at the same time.

<p><img alt="new-in-alarm" src="/images/docs/guardrails/getting-started/getting-started-azure/review-subscription-wide/storage-accounts-in-alarm.png"/></p>

The new storage accounts are in the `Alarm` state because, as with the first one, you downgraded TLS to 1.0. The current policy requires all storage accounts to have a minimum version of 1.2.

## Step 5: Review

In this guide you created new Azure storage accounts and observed how the Policy Pack added at the subscription level evaluates their governance status.


## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-azure/create-static-exception) we’ll learn how to create an exception so that a storage account can be exempt from the access control requirement.


# Review Subscription-Wide Governance


## Progress tracker

- [x] Prepare an Azure Subscription for Import to Guardrails
- [x] Connect an Azure Subscription to Guardrails
- [x] Observe Azure Resource Activity
- [x] Enable Your First Guardrails Policy Pack
- [x] **Review Subscription-Wide Governance**
- [ ] Create a Static Exception to a Guardrails Azure Policy
- [ ] Create a Calculated Exception to a Guardrails Azure Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
