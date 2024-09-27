---
title: Observe Resource Activity
sidebar_label: Observe Activity
---


# Observe GCP Activity

**Prerequisites**:

- [Connect a GCP Project to Guardrails](/guardrails/docs/getting-started/getting-started-gcp/connect-a-project/)


## Step 1: Create a GCP bucket

We’ll use the name `guardrails-example-gcp-bucket-01`, choose your own name.
<p><img alt="create-gcp-bucket" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/create-gcp-bucket.png"/></p><br/>


Accept the defaults, including uniform access which will be the focus of this series.
<p><img alt="gcp-confirm-uniform-access" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/gcp-confirm-uniform-access.png"/></p><br/>

## Step 2: See Guardrails discover the new bucket


Select top-level `Reports`, search in the page for `Resource Activities`.
<p><img alt="gcp_search_resource_activities" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/gcp-search-resource-activities.png"/></p><br/>


In the `Resource Activities` report, open the `Resource Type` filter, search for `gcp bucket`, and select `GCP > Storage > Bucket`.


Guardrails reports two notifications related to the bucket creation. `RESOURCE CREATED` indicates discovery of the bucket. `RESOURCE UPDATED` indicates that Guardrails has updated the CMDB entry with additional details about the bucket.
<p><img alt="gcp_resource_activities_initial_notifications" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/gcp-resource-activities-initial-notifications.png"/></p><br/>

Note: If your project is very active, and these notifications do not appear at the top of the stream, you can use the `Resource Type` filter to scope notifications to just those for `GCP > Storage > Bucket`.

## Step 3: See Guardrails react to a bucket change

 
Now visit your bucket in the GCP console, choose the `Permissions` tab, and click `Switch to Fine-Grained`.
<p><img alt="gcp_switch_to_fine_grained" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/gcp-switch-to-fine-grained.png"/></p><br/>

Revisit `Reports > Resource Activities`, and (if needed) reapply the `GCP > Storage > Bucket` filter.

Click into the new notification for your bucket, and see the diff that Guardrails has been  recorded.
<p><img alt="gcp_diff_the_first_change" src="/images/docs/guardrails/getting-started/getting-started-gcp/observe-gcp-activity/gcp-diff-the-first-change.png"/></p><br/>

We’ve now seen how Guardrails detects the creation of a new resource in a connected account, and also notices and records changes to the configuration of that resource.

Next we’ll explore [how to set a policy](/guardrails/docs/getting-started/getting-started-gcp/attach-a-policy) that requires uniform access to buckets.


## Progress tracker

1. [Connect a GCP Project to Guardrails](/guardrails/docs/getting-started/getting-started-gcp/connect-a-project/)

2. **Observe GCP Activity**

3. [Attach a Guardrails Policy](/guardrails/docs/getting-started/getting-started-gcp/attach-a-policy/)

4. [Create a Static Exception to a Guardrails GCP Policy](/guardrails/docs/getting-started/getting-started-gcp/create-static-exception/)

5. [Create a Calculated Exception to a Guardrails GCP Policy](/guardrails/docs/getting-started/getting-started-gcp/create-calculated-exception/)

6. [Send an Alert to Email](/guardrails/docs/getting-started/getting-started-gcp/send-alert-to-email/)

7. [Apply a Quick Action](/guardrails/docs/getting-started/getting-started-gcp/apply-quick-action/)

8. [Enable Automatic Enforcement](/guardrails/docs/getting-started/getting-started-gcp/enable-enforcement/)
