---
title: Connect a GCP Project to Guardrails
sidebar_label: Connect a GCP Project
---


# Connect a GCP Project to Guardrails

In this guide you will connect a GCP account to Guardrails.

This is the second guide in the *Getting started with GCP* series.

## Prerequisites

  - Completion of the previous guide: *Prepare an GCP Project for Import to Guardrails*.

  - Access to the Turbot Guardrails console with admin privilege.

## Step 1: Login to Guardrails

Login to your Guardrails console and select the **CONNECT** option from the home page.

<p><img alt="locate-top-level-connect" src="/images/docs/guardrails/getting-started/getting-started-gcp/connect-project/locate-top-level-connect.png"/></p>

## Step 2: Select GCP

Select **GCP** from the connect panel.

![Select GCP](/images/docs/guardrails/getting-started/getting-started-gcp/connect-project/select-connect.png)

Select **GCP** Project.

![Select GCP Project](/images/docs/guardrails/getting-started/getting-started-gcp/connect-project/select-gcp-project.png)

## Step 3: Select import location

Expand the **Parent Resource** dropdown and choose the **Sandbox** folder as the import location.

![Choose Sandbox](/images/docs/guardrails/getting-started/getting-started-gcp/connect-project/choose-sandbox.png)

## Step 4: Upload Key file

> [!NOTE]
> Turbot Guardrails now supports two ways to enable access authentication:
> 1. Using Service Account Impersonation
> 2. Credential file with key type as JSON or Private Key Text (copy-paste of the JSON private key)

> This guide demonstrates the process using the key type as JSON format.

In the previous guide you created and downloaded a JSON-format key file. Locate that file and drag it to the drop target.

![Choose Upload Credential File](/images/docs/guardrails/getting-started/getting-started-gcp/connect-project/choose-upload-crdential-file.png)


## Step 5: Connect

Select the **Connect** button.

![Connect](/images/docs/guardrails/getting-started/getting-started-gcp/connect-project/connect.png)

## Step 6: Observe progress

Wait for the progress bar to complete. This process takes a while, and you’ll see the bars fluctuate. The number of resources will grow as Guardrails discovers them.

<p><img alt="gcp_progress_bar" src="/images/docs/guardrails/getting-started/getting-started-gcp/connect-project/gcp-progress-bar.png"/></p>


## Step 7: View Controls by state

Select **Reports** from the top navigation menu. Type `controls` into the **Search reports…** field to show only reports with the word "controls" in their name. Select the **Controls by State** report from the list.

<p><img alt="search-for-controls-reports" src="/images/docs/guardrails/getting-started/getting-started-aws/connect-an-account/search-for-controls-reports.png"/></p>

## Step 8: Configure report filter

Select the **Type** dropdown from the filters bar. Then enable the check box next to **GCP** to limit the report to only show GCP controls.
<p><img alt="set-type-filter" src="/images/docs/guardrails/getting-started/getting-started-gcp/connect-project/configure-report-filter.png"/></p>

## Step 9: Review Controls

Review the status of your controls for GCP.  `Alarm`, `OK`, `Skipped`, and `TBD` are all common and normal states to see in your project.

> [!IMPORTANT]
> The controls in `Error` or `Invalid` states must be cleared before moving further into these guides.
> It takes few mins depending on various factors. We suggest to wait and report to [Turbot support](help@turbot.com), in case these errors are not cleared up automatically.

Bookmark the **Controls by State** report, you’ll need it in subsequent guides.

<p><img alt="gcp-controls-by-state" src="/images/docs/guardrails/getting-started/getting-started-gcp/connect-project/gcp-controls-by-state.png"/></p>

## Next Steps

You've now successfully connected your GCP project to Guardrails.

In the [next guide](/guardrails/docs/getting-started/getting-started-gcp/observe-gcp-activity) we’ll see how Guardrails watches your project and reacts to resource changes.

## Progress tracker
- [x] Prepare a GCP Project for Import to Guardrails
- [x] **Connect a GCP Project to Guardrails**
- [ ] Observe GCP Activity
- [ ] Enable Your First Guardrails Policy Pack
- [ ] Review Project-Wide Governance
- [ ] Create a Static Exception to a Guardrails Policy
- [ ] Create a Calculated Exception to a Guardrails GCP Policy
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
