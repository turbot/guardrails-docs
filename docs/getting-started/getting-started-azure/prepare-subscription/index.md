---
title: Prepare an Azure Subscription for Import to Guardrails
sidebar_label: Prepare an Azure Subscription
---

# Prepare an Azure Subscription for Import to Guardrails

In this guide you will prepare an Azure subscription to be imported into Guardrails. You will deploy a role with the minimal permissions needed for Guardrails to discover and monitor resources in your subscription.

This is the first guide in the *Getting started with AWS* series.

## Prerequisites

Access to the Turbot Guardrails console with admin privilege.

An AWS Account to import into Guardrails.

## Step 1: Locate app registrations

Select **App registrations**.

<p><img alt="app registrations" src="/images/docs/guardrails/getting-started/getting-started-azure/prepare-subscription/locate-app-registrations.png"/></p>

## Step 2: Begin new registration

Select **New registration**.

<p><img alt="new registration" src="/images/docs/guardrails/getting-started/getting-started-azure/prepare-subscription/new-registration.png"/></p>

## Step 3: Register the app

Name the application. The name ought to be recognizable as a Guardrails registration and relevant to the subscription to be imported. Turbot recommends the naming convention `Guardrails - {Name of the subscription}`. The Redirect URI is optional.  The Guardrails integration doesn’t use the redirect URL as a part of authentication. If you would like to include your Guardrails workspace hostname, this is a handy reference location.   

Select **Register**.

<p><img alt="register app" src="/images/docs/guardrails/getting-started/getting-started-azure/prepare-subscription/name-and-create.png"/></p>

## Step 4: Capture details

Capture the Application (client) ID and Directory (tenant) IDs, you will need them later. Select the linked name of your subscription.

<p><img alt="capture details" src="/images/docs/guardrails/getting-started/getting-started-azure/prepare-subscription/registered-app.png"/></p>

## Step 5: Locate Certificates & secrets.

Select **Certificates & secrets**.

<p><img alt="locate secrets" src="/images/docs/guardrails/getting-started/getting-started-azure/prepare-subscription/secrets-1.png"/></p>

## Step 6: Create secret

Select **Create new secret**, write a description, and select **Add**.

Capture the Value (not the Secret ID) for use later.

<p><img alt="create secret" src="/images/docs/guardrails/getting-started/getting-started-azure/prepare-subscription/secrets-2.png"/></p>

## Step 7: Launch cloud shell

Select the cloud shell icon.

<p><img alt="launch cloud shell" src="/images/docs/guardrails/getting-started/getting-started-azure/prepare-subscription/cloudshell-1.png"/></p>

## Step 8: Create a ReadOnly role

In the cloudshell, launch a text editor (e.g. `nano guardrails_reader_role.json`) and paste this JSON code, swapping in your subscription ID. (If needed you can use `az account show --query id --output tsv` to print the ID.) 

```json
{
  "name": "guardrails_reader",
  "description": "Basic Permissions needed for Guardrails Reader access",
  "actions": [
    "*/read",
    "Microsoft.Storage/storageAccounts/listkeys/action",
    "Microsoft.KeyVault/vaults/secrets/read",
    "Microsoft.KeyVault/vaults/read"
  ],
  "notActions": [],
  "dataActions": [],
  "notDataActions": [],
  "assignableScopes": [
    "/subscriptions/<<YOUR_SUBSCRIPTION_ID>>"
  ]
}
```

> [!NOTE]
> The Azure default `Reader` role does not include permissions to read `KeyVault Secrets` metadata (not the secret itself), so they are included here.

If using `nano`, the commands to save and exit are **CTRL-O** (Write Out), **Enter** (to save), and **CTRL-X** (to exit).

<p><img alt="create json filel" src="/images/docs/guardrails/getting-started/getting-started-azure/prepare-subscription/cloudshell-2.png"/></p>


Run this command to create the role.  

```bash
az role definition create --role-definition guardrails_reader_role.json  
```

Run this command to verify the role was created.

```bash
az role definition list --name "guardrails_reader"
```

<p><img alt="launch cloud shell" src="/images/docs/guardrails/getting-started/getting-started-azure/prepare-subscription/cloudshell-3.png"/></p>

## Step 9: Assign the role to the app

Navigate to the portal home page, select **Subscriptions**, select your subscription, then select **Access control (IAM)**.

<p><img alt="assign role 1" src="/images/docs/guardrails/getting-started/getting-started-azure/prepare-subscription/assign-role-1.png"/></p>

Expand the **Add** dropdown and choose **Add role assignment**.

<p><img alt="assign role 2" src="/images/docs/guardrails/getting-started/getting-started-azure/prepare-subscription/assign-role-2.png"/></p>

Search for the role you created, click to select it, and select **Next**.

<p><img alt="assign role 3" src="/images/docs/guardrails/getting-started/getting-started-azure/prepare-subscription/assign-role-3.png"/></p>

Select **Select members**, search for your registered app, and **Select** it.

<p><img alt="assign role 4" src="/images/docs/guardrails/getting-started/getting-started-azure/prepare-subscription/assign-role-4.png"/></p>

Select **Review + assign**.

<p><img alt="assign role 5" src="/images/docs/guardrails/getting-started/getting-started-azure/prepare-subscription/assign-role-5.png"/></p>

## Step 10: Review

In this guide you've learned how to deploy an Azure role that grants minimal permissions to Guardrails.

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-azure/connect-subscription) you will use the role you just created to import an Azure subscription into Guardrails.


## Progress tracker

- [x] **Prepare an Azure Subscription for Import to Guardrails**
- [ ] Connect an Azure Subscription to Guardrails
- [ ] Observe Azure Resource Activity
- [ ] Enable Your First Guardrails Policy Pack
- [ ] Review Subscription-Wide Governance
- [ ] Create a Static Exception to a Guardrails Azure Policy
- [ ] Create a Calculated Exception to a Guardrails Azure Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
