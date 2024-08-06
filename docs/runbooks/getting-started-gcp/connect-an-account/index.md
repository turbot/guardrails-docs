---
title: Connect a GCP Account to Guardrails
sidebar_label: Connect a GCP Account to Guardrails
---


# Connect a GCP Account to Guardrails

**Prerequisites**:

A Turbot account with admin privilege, and a top-level `Sandbox` folder.

## Step 1: Create a service account for Guardrails

Log in to the Google Cloud console.  
  
Select the project Guardrails will connect to.  
  
Navigate to `IAM & Admin > Service Accounts`  
  
Click `Create Service Account`  
  
Name the account according to the pattern `{service-account-name}@{project_id}.iam.gserviceaccount.com`
<p><img alt="service_account_details" src="/images/docs/guardrails/runbooks/getting-started-gcp/connect-an-account/service-account-details.png"/></p><br/>

## Step 2: Enable the Cloud Resource Manager API

Navigate to APIs & Services, search for `Cloud Resource Manager API`, and enable it.
<p><img alt="enable_apis" src="/images/docs/guardrails/runbooks/getting-started-gcp/connect-an-account/enable-apis.png"/></p><br/>

## Step 3: Connect the GCP projectLogin to Guardrails

Click the top-level `Connect`
<p><img alt="top_level_connect" src="/images/docs/guardrails/runbooks/getting-started-gcp/connect-an-account/top-level-connect.png"/></p><br/>  
  
Click Import.  
  
Wait for the progress bar to complete.
<p><img alt="gcp_progress_bar" src="/images/docs/guardrails/runbooks/getting-started-gcp/connect-an-account/gcp-progress-bar.png"/></p><br/>  
  
When the process completes, navigate to `Turbot > Sandbox > YOUR_PROJECT`  
  
Switch to the `Controls` tab and search for `cmdb`.  
  
When the  control is green, the project is successfully connected to Guardrails.
<p><img alt="project_cmdb" src="/images/docs/guardrails/runbooks/getting-started-gcp/connect-an-account/project-cmdb.png"/></p><br/>

Now that Guardrails has imported the project, you’ll want to see Guardrails in action. In [the next runbook](/guardrails/docs/runbooks/getting-started-gcp/observe-gcp-activity) we’ll explore a control that checks whether your buckets comply with a default policy to block public access, and reacts when you change that setting in GCP.  
  
  



## Progress tracker

1. **Connect a GCP Account to Guardrails**

2. [Observe GCP Activity](/guardrails/docs/runbooks/getting-started-gcp/observe-gcp-activity/)

3. [Attach a Guardrails Policy](/guardrails/docs/runbooks/getting-started-gcp/attach-a-policy/)

4. [Create a Static Exception to a Guardrails GCP Policy](/guardrails/docs/runbooks/getting-started-gcp/create-static-exception/)
