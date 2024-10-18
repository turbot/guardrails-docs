---
title: Connect an Azure Subscription to Guardrails
sidebar_label: Connect a Subscription
---


# Connect an Azure Subscription to Guardrails

  
In this guide, you’ll connect an Azure subscription to Guardrails. Then, in following guides, you’ll work through a series of exploratory exercises to learn the basics of cloud governance with Guardrails.

**Prerequisites**:

Access to the Guardrails console with admin privilege, and a top-level `Sandbox` folder.

## Step 1: Register an app

Login to the Azure portal.

Navigate to `App Registrations`.

Click `New Registration`.

Name the application. The name ought to be recognizable as a Guardrails registration and relevant to the subscription to be imported. Turbot recommends the naming convention `Guardrails - {Name of the subscription}`.

The Redirect URI is optional.  The Guardrails integration doesn’t use the redirect URL as a part of authentication. If you would like to include your Guardrails workspace hostname, this is a handy reference location.   
  
Capture the Application (client) ID from the Overview tab.  Copy the Application (client) ID and Directory (tenant) IDs.  You will need them later.  


## Step 2: Create a secret

  
Under the `Manage` sidebar item, go to `Certificates & secrets`. 

Go to the `Client Secrets` tab.   
  
Create a new secret and capture its Value.  Don’t use the Secret ID!

## Step 3: Create a ReadOnly role

Click the `Shell icon` in the portal at top right, next to the search bar.

Select `Bash`.

In the cloud shell, create `turbot_reader_role.json`, swapping in your subscription id.  The Azure default `Reader` role does not include permissions to read `KeyVault Secrets` metadata (not the secret itself), so they are included here.   
  
```json
{
  "Name": "turbot_reader",
  "Description": "Basic Permissions needed for Reader access",
  "Actions": [
    "*/read",
    "Microsoft.Storage/storageAccounts/listkeys/action",
    "Microsoft.KeyVault/vaults/secrets/read",
    "Microsoft.KeyVault/vaults/read"
  ],
  "NotActions": [],
  "DataActions": [],
  "NotDataActions": [],
  "AssignableScopes": [
    "/subscriptions/<<YOUR_SUBSCRIPTION_ID>>"
  ]
}  
```

Save this in a file called `turbot_reader_role.json`.  
  
Run this command to create the role.  
  
```
az role definition create --role-definition turbot_reader_role.json  
```

## Step 4: Assign the role to the app

Go to the subscription that will be imported into Guardrails.  
  
Select `Add > Add role assignment`.

Find the `turbot_reader` custom role, select it, click `Next`.  
  
Click `Select members`.

Search for the name of your registered app, click `Select`.  
  
Complete the `Review + assign` flow.  


## Step 5: Initiate the Connect

On the Guardrails home page, hover on `Connect`.

<p><img alt="locate_top_level_connect" src="/images/docs/guardrails/getting-started/getting-started-azure/connect-a-subscription/locate-top-level-connect.png"/></p>

Click to open the `Connect` screen.

## Step 6: Connect your subscription

Choose `Azure Subscription`.

Use the `Parent Resource` dropdown to select your Sandbox.  
  
Enter your subscription ID and tenant ID.

For client ID use the Application (client) ID of your registered Turbot app.   
  
For client key, use the Value (not the id) of the secret you created for the app.  
  
Select your environment (likely Global Cloud).

<p><img alt="finish-and-connect" src="/images/docs/guardrails/getting-started/getting-started-azure/connect-a-subscription/finish-and-connect.png"/></p>

Click `Connect`.

## Step 7: Observe progress

<p><img alt="azure_progress_bar" src="/images/docs/guardrails/getting-started/getting-started-azure/connect-a-subscription/azure-progress-bar.png"/></p>

This process takes a while, and you’ll see the bars fluctuate. The number of resources will grow as Guardrails discovers them.

## Step 8: Locate the Controls by State report

<p><img alt="search-for-controls-reports" src="/images/docs/guardrails/getting-started/getting-started-azure/connect-a-subscription/search-for-controls-reports.png"/></p>

## Step 9: Review

You’ve now successfully connected your Azure subscription to Guardrails.

<p><img alt="azure-controls-by-state" src="/images/docs/guardrails/getting-started/getting-started-azure/connect-a-subscription/azure-controls-by-state.png"/></p>

Bookmark the `Controls by State` report, you’ll need it in subsequent guides.

> [!NOTE]
> It’s normal for the `Controls by State` report to show controls in `Alarm` and/or `TBD`. If controls are in `Error` or `Invalid`, you should check with your administrator to resolve these issues. See [Troubleshooting](#troubleshooting).  
  
Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-azure/observe-azure-activity) we’ll see how Guardrails watches your subscription and reacts to resource changes.

## Troubleshooting

| Issue | Description | Guide |
|--|--|--|
| ERROR | One or more controls are in ERROR. | [tbd]() |
| INVALID | One or more controls are INVALID. | [tbd]() |


## Progress tracker

- [x] **Connect an Azure Account to Guardrails**
- [ ] Observe Azure Resource Activity
- [ ] Enable Your First Guardrails Policy Pack
- [ ] Create a Static Exception to a Guardrails Azure Policy
- [ ] Create a Calculated Exception to a Guardrails Azure Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
