---
title: Connect a GCP Project to Guardrails
sidebar_label: Connect a GCP Project to Guardrails
---


# Connect a GCP Project to Guardrails

In this guide, you’ll connect a GCP project to Guardrails. Then, in following guides, you’ll work through a series of exploratory exercises to learn the basics of cloud governance with Guardrails.

**Prerequisites**:

Access to the Guardrails console with admin privilege, and a top-level `Sandbox` folder.

## Step 1: Create a service account for Guardrails

Log in to the Google Cloud console.  
  
Select the project Guardrails will connect to.  
  
Navigate to `IAM & Admin > Service Accounts`.  
  
Click `Create Service Account`.  
  
Name the account according to the pattern `{service-account-name}@{project_id}.iam.gserviceaccount.com`.

Click `Keys`, create and download a key for the service account in JSON format.  
  
Click `Permissions` and grant `Viewer` access to the service account.  


## Step 2: Enable the Cloud Resource Manager API

Navigate to APIs & Services, search for `Cloud Resource Manager API`, and enable it.

## Step 3: Initiate the Connect

  
On the Guardrails home page, hover on `Connect`.  
<p><img alt="locate-top-level-connect" src="/images/docs/guardrails/getting-started/getting-started-gcp/connect-a-project/locate-top-level-connect.png"/></p>

Click to open the `Connect` screen.

## Step 4: Connect your project

Click `GCP Project`  
  
Use the Parent Resource dropdown to select your Sandbox.

  
Drag/drop the JSON file you downloaded when you created the key for the service account.
<p><img alt="ready_to_import" src="/images/docs/guardrails/getting-started/getting-started-gcp/connect-a-project/ready-to-import.png"/></p>  
  


Click Import.  


## Step 5: Observe progress

  
Wait for the progress bar to complete.
<p><img alt="gcp_progress_bar" src="/images/docs/guardrails/getting-started/getting-started-gcp/connect-a-project/gcp-progress-bar.png"/></p>  
  
This process takes a while, and you’ll see the bars fluctuate. The number of resources will grow as Guardrails discovers them.

## Step 6: Locate the `Controls by State` report

Search `Reports` for `controls`.  
<p><img alt="search-for-controls-reports" src="/images/docs/guardrails/getting-started/getting-started-gcp/connect-a-project/search-for-controls-reports.png"/></p>  
  
Select `Controls by State`.  
  


## Step 7: Review

You’ve now successfully connected your GCP project to Guardrails.
<p><img alt="gcp-controls-by-state" src="/images/docs/guardrails/getting-started/getting-started-gcp/connect-a-project/gcp-controls-by-state.png"/></p>

Bookmark the `Controls by State` report, you’ll need it in subsequent guides.

> [!CAUTION]
> It’s normal for the `Controls by State` report to show controls in `Alarm` and/or `TBD`. If controls are in `Error` or `Invalid`, you should check with your administrator to resolve these issues. See [Troubleshooting](#troubleshooting).

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-gcp/observe-gcp-activity) we’ll see how Guardrails watches your account and reacts to resource changes.  
  


## Troubleshooting

| Issue | Description | Guide |
|--|--|--|
| ERROR | One or more controls are in ERROR. | [tbd]() |
| INVALID | One or more controls are INVALID. | [tbd]() |


## Progress tracker

- [x] **Connect a GCP Project to Guardrails**
- [ ] [Observe GCP Activity](path)
- [ ] [Enable Your First Guardrails Policy Pack](path)
