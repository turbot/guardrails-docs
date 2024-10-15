---
title: Connect a GCP Project to Guardrails
sidebar_label: Connect a GCP Project to Guardrails
---


# Connect a GCP Project to Guardrails

In this guide, you’ll connect a GCP project to Guardrails. Then, in following guides, you’ll work through a series of exploratory exercises to learn the basics of cloud governance with Guardrails.

**Prerequisites**:

- Access to the Turbot Guardrails console with admin privilege.

- An AWS Account to import into Guardrails with AWS admin privileges.

## Step 1: Create a service account for Guardrails

Log in to the Google Cloud console.  
  
Select the project Guardrails will connect to.  
  
Navigate to **IAM & Admin > Service Accounts**.  
  
Click **Create Service Account**.  
  
Name the account according to the pattern `{service-account-name}@{project_id}.iam.gserviceaccount.com`.

Click **Keys**, create and download a key for the service account in JSON format.

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


## Step 4: Login to Guardrails

  
Login to your Guardrails console and select the **CONNECT** option from the home page.  

<p><img alt="locate-top-level-connect" src="/images/docs/guardrails/getting-started/getting-started-gcp/connect-a-project/locate-top-level-connect.png"/></p>

## Step 5: Select import location

Use the **Parent Resource** dropdown to select the **Sandbox**  folder as the location to import the project. 

<p><img alt="select-import-location" src="/images/docs/guardrails/getting-started/getting-started-gcp/connect-a-project/select-import-location.png"/></p>

## Step 6: Import the project

Drag/drop the JSON file you downloaded in step 1, and select **Connect**.

<p><img alt="ready_to_import" src="/images/docs/guardrails/getting-started/getting-started-gcp/connect-a-project/ready-to-import.png"/></p>

## Step 7: Observe progress

  
Wait for the progress bar to complete. This process takes a while, and you’ll see the bars fluctuate. The number of resources will grow as Guardrails discovers them.

<p><img alt="gcp_progress_bar" src="/images/docs/guardrails/getting-started/getting-started-gcp/connect-a-project/gcp-progress-bar.png"/></p>

This process takes a while, and you’ll see the bars fluctuate. The number of resources will grow as Guardrails discovers them.

## Step 8: View Controls by State report

Select **Reports** from the top navigation menu.  Type `controls` into the **Search reports…** field to show only reports with the word "controls" in their name. Select the **Controls by State** report from the list.  

<p><img alt="search-for-controls-reports" src="/images/docs/guardrails/getting-started/getting-started-gcp/connect-a-project/search-for-controls-reports.png"/></p>

## Step 9: Configure report filters

Select the **Type** dropdown from the filters bar. Then enable the check box next to **GCP** to limit the report to only show GCP controls.  

<p><img alt="set-type-filter" src="/images/docs/guardrails/getting-started/getting-started-gcp/connect-a-project/set-type-filter.png"/></p>

## Step 10: Review Controls

Review the status of your controls for AWS.  `Alarm`, `OK`, `Skipped`, and `TBD` are all common and normal states to see in your account.  If you see controls in `Error` or `Invalid` states, those must be cleared before moving further into these guides.  

  
Bookmark the **Controls by State** report, you’ll need it in subsequent guides.

<p><img alt="gcp-controls-by-state" src="/images/docs/guardrails/getting-started/getting-started-gcp/connect-a-project/gcp-controls-by-state.png"/></p>

## Next Steps

  
You’ve now successfully connected your AWS account to Guardrails.

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
