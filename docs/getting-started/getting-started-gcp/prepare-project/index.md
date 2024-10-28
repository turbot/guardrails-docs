---
title: Prepare a GCP project for import to Guardrails
sidebar_label: Prepare a GCP project
---


# Prepare a GCP project for import to Guardrails

In this guide, you will prepare an AWS account to be imported into Guardrails by deploying an IAM access role using a CloudFormation template.

This is the first guide in the *Getting started with GCP* series.

**Prerequisites**:

- Access to the Turbot Guardrails console with admin privilege.

- A GCP project to import into Guardrails, with GCP admin privileges.

## Step 1: Locate IAM & Admin > Service Accounts

Log in to the Google Cloud console, select the project Guardrails will connect to, navigate to **IAM & Admin > Service Accounts**, and select **Create Service Account**.

<p><img alt="service-account-1" src="/images/docs/guardrails/getting-started/getting-started-gcp/prepare-project/service-account-1.png"/></p>

## Step 2: Begin creating a service account
  
Select **Create Service Account**  
<p><img alt="service-account-2" src="/images/docs/guardrails/getting-started/getting-started-gcp/prepare-project/service-account-2.png"/></p>  

## Step 3: Name the account

Name the account according to the pattern `{service-account-name}@{project_id}.iam.gserviceaccount.com`, add a description, and select **Create and Continue**.

<p><img alt="service-account-3" src="/images/docs/guardrails/getting-started/getting-started-gcp/prepare-project/service-account-3.png"/></p>

## Step 4: Grant Viewer role

  
Click in **Select a role** to activate the filter, enter the search term `viewer`, and select **Viewer**.

<p><img alt="viewer-role" src="/images/docs/guardrails/getting-started/getting-started-gcp/prepare-project/viewer-role.png"/></p>  
  


## Step 5: Also grant Logging Admin and Pub/Sub Admin

Use **Add Another Role** to do the same for **Logging Admin** and **Pub/Sub Admin**. Then select **Continue**.  
<p><img alt="other-roles" src="/images/docs/guardrails/getting-started/getting-started-gcp/prepare-project/other-roles.png"/></p>  


## Step 6: Finish creating the service account

Select **Done**.  
<p><img alt="finish-service-account" src="/images/docs/guardrails/getting-started/getting-started-gcp/prepare-project/finish-service-account.png"/></p>

## Step 7: Locate key manager

Select the vertical ellipsis (**⋮**) next to your new service account and choose **Manage keys**.

<p><img alt="credentials-1" src="/images/docs/guardrails/getting-started/getting-started-gcp/prepare-project/credentials-1.png"/></p>

## Step 8: Add key

Select **Add Key**, and choose **Create new key**.

<p><img alt="credentials-1" src="/images/docs/guardrails/getting-started/getting-started-gcp/prepare-project/credentials-2.png"/></p>

## Step 9: Create key

Keep the **JSON** default, and select **Create**. The key file will be saved to your downloads folder with a name like `YOUR_PROJECT-fd9ce4f0e38b`. 

<p><img alt="credentials-1" src="/images/docs/guardrails/getting-started/getting-started-gcp/prepare-project/credentials-3.png"/></p>

## Step 10: Enable APIs

You will to enable these APIs:

- Cloud Resource Manager
- Cloud Pub/Sub
- Cloud Logging

Navigate to **APIS & services** and review the list of enabled APIs. If any of the above are not include, then:

- Choose **Enable APIs and Services**
- Search for the API by name
- Choose **Enable**

<p><img alt="credentials-1" src="/images/docs/guardrails/getting-started/getting-started-gcp/prepare-project/enable-apis.png"/></p>

## Step 11: Review

In this guide you've learned how to prepare the least-privileged credentials, and enable the minimal set of APIs, that you'll need to import your project into Guardrails.

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-gcp/connect-project) you will use those credentials to import a GCP project into Guardrails.


## Progress tracker

- [x] **Prepare a GCP project for import to Guardrails**
- [ ] Connect a GCP project to Guardrails
- [ ] Observe GCP Activity
- [ ] Enable Your First Guardrails Policy Pack
- [ ] Review Project-Wide Bucket Access Control
- [ ] Create a Static Exception to a Guardrails GCP Policy
- [ ] Create a Calculated Exception to a Guardrails GCP Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
