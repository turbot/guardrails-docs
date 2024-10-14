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

## Step 2: Assign roles to the service account

  
Assign these roles to the service account:  
  
- Viewer

- Logging Admin

- Pub/Sub Admin

## Step 3: Enable APIs

Enable these APIs (if not already enabled):  
  
- Cloud Resource Manager  
  
- Cloud Pub/Sub  
  
- Cloud Logging

## Step 4: Initiate the Connect

  
On the Guardrails home page, hover on `Connect`.  

<p><img alt="locate-top-level-connect" src="/images/docs/guardrails/getting-started/getting-started-gcp/connect-a-project/locate-top-level-connect.png"/></p>

Click to open the `Connect` screen.

## Step 5: Connect your project

Click `GCP Project`.  
  
Use the `Parent Resource` dropdown to select your Sandbox.

  
Drag/drop the JSON file you downloaded when you created the key for the service account.

<p><img alt="ready_to_import" src="/images/docs/guardrails/getting-started/getting-started-gcp/connect-a-project/ready-to-import.png"/></p>

Click `Connect`.

## Step 6: Observe progress

  
Wait for the progress bar to complete.

<p><img alt="gcp_progress_bar" src="/images/docs/guardrails/getting-started/getting-started-gcp/connect-a-project/gcp-progress-bar.png"/></p>

This process takes a while, and you’ll see the bars fluctuate. The number of resources will grow as Guardrails discovers them.

## Step 7: Locate the Controls by State report

Search top-level `Reports` for `controls`.  

<p><img alt="search-for-controls-reports" src="/images/docs/guardrails/getting-started/getting-started-gcp/connect-a-project/search-for-controls-reports.png"/></p>

Select `Controls by State`.  
  


## Step 8: View Controls by State

You’ve now successfully connected your GCP project to Guardrails.

<p><img alt="gcp-controls-by-state" src="/images/docs/guardrails/getting-started/getting-started-gcp/connect-a-project/gcp-controls-by-state.png"/></p>

Bookmark the `Controls by State` report, you’ll need it in subsequent guides.

> [!NOTE]
> It’s normal for the `Controls by State` report to show controls in `Alarm` and/or `TBD`. If controls are in `Error` or `Invalid`, you should check with your administrator to resolve these issues. See [Troubleshooting](#troubleshooting).  


## Step 9: Enable APIs for Turbot event handlers

Your Guardrails account is now using [Event Polling]([https://turbot.com/guardrails/docs/reference/glossary#event-polling](https://turbot.com/guardrails/docs/reference/glossary#event-polling)). To speed up Guardrails’ detection of resource changes in your GCP project, you’ll now enable [Event Handlers]([https://turbot.com/guardrails/docs/reference/glossary#event-handler](https://turbot.com/guardrails/docs/reference/glossary#event-handler)).  
  
In this step, you’ll create policy settings for the GCP Pub/Sub and Logging APIs.

From top-level `Policies`, navigate to `GCP > Logging > API Enabled` and click `New Policy Setting`.  

<p><img alt="logging-api-enabled" src="/images/docs/guardrails/getting-started/getting-started-gcp/connect-a-project/logging-api-enabled.png"/></p>

Select `Turbot` as the resource, choose `Enforce: Enabled`, and click `Create`.  
  
Do the same for `GCP > Pub/Sub > API Enabled`.  


## Step 10: Configure Turbot event handlers

From top-level `Policies`, navigate to `GCP > Turbot > Event Handlers > Logging`, and click `New Policy Setting`.

<p><img alt="event-handlers-logging" src="/images/docs/guardrails/getting-started/getting-started-gcp/connect-a-project/event-handlers-logging.png"/></p>

Select `Turbot` as the resource, choose `Enforce: Configured`, and click `Create`.  
  
Do the same for `GCP > Pub/Sub > API Enabled`.

  


## Step 11: Review

From top-level `Controls`, search for `gcp > turbot > event handlers`

<p><img alt="review-event-handlers" src="/images/docs/guardrails/getting-started/getting-started-gcp/connect-a-project/review-event-handlers.png"/></p>

Verify that both event handlers are green. Guardrails will now react instantly when resources change in your GCP project.

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-gcp/observe-gcp-activity) we’ll see how Guardrails watches your account and reacts to resource changes.  
  


## Troubleshooting

| Issue | Description | Guide |
|--|--|--|
| ERROR | One or more controls are in ERROR. | [tbd]() |
| INVALID | One or more controls are INVALID. | [tbd]() |


## Progress tracker

- [x] **Connect a GCP Project to Guardrails**
- [ ] Observe GCP Activity
- [ ] Enable Your First Guardrails Policy Pack
- [ ] Review Account-Wide Bucket Access Control
- [ ] Create a Static Exception to a Guardrails GCP Policy
- [ ] Create a Calculated Exception to a Guardrails GCP Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
