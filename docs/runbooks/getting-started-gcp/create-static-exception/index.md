---
title: Create a Static Exception to a Guardrails GCP Policy
sidebar_label: Create a static exception to a Guardrails GCP policy
---


# Create a Static Exception to a Guardrails GCP Policy

**Prerequisites**:   
  
- [Connect a GCP Project to Guardrails](/guardrails/docs/runbooks/getting-started-gcp/connect-a-project/)
- [Observe GCP Activity](/guardrails/docs/runbooks/getting-started-gcp/observe-gcp-activity/)
- [Attach a Guardrails Policy](/guardrails/docs/runbooks/getting-started-gcp/attach-a-policy/)


Now that we have set our GCP bucket access control policy, we can track which GCP buckets do not have uniform access enabled. In this runbook we will show how to create an exception for your test bucket, so Guardrails will ignore its bucket access control status.

## Step 1: Find your test bucket

Do a top-level search for the bucket.
<p><img alt="gcp_access_control_find_the_bucket" src="/images/docs/guardrails/runbooks/getting-started-gcp/create-static-exception/gcp-access-control-find-the-bucket.png"/></p><br/>

## Step 2: Create a policy exception

Click into the resource, switch to the `Policies` tab, and search for `bucket access control`.
<p><img alt="gcp_access_control_ready_to_create_new_policy_setting" src="/images/docs/guardrails/runbooks/getting-started-gcp/create-static-exception/gcp-access-control-ready-to-create-new-policy-setting.png"/></p><br/>

Note that the bucket inherits `Check: Uniform` from the policy pack attached to the `Sandbox` folder. 

  
Now click `New Policy Setting`.
<p><img alt="gcp_access_control_new_policy_setting" src="/images/docs/guardrails/runbooks/getting-started-gcp/create-static-exception/gcp-access-control-new-policy-setting.png"/></p><br/>

Search for and select the Policy Type `GCP > Storage > Bucket  > Access Control`

  
Choose `Skip` and click `Create`. Guardrails sends you to the Policy Setting page.

Select the `Hierarchy` tab to review the new situation.
<p><img alt="gcp_access_control_hierarchy_with_bucket_exception" src="/images/docs/guardrails/runbooks/getting-started-gcp/create-static-exception/gcp-access-control-hierarchy-with-bucket-exception.png"/></p><br/>  
  


The default for bucket versioning was `Skip`, the policy you created in the previous runbook changed it to `Check: Uniform`, and now this particular bucket overrides that setting back to `Skip`. Note that every other bucket in the Sandbox folder still has an effective policy setting of `Check: Uniform`.  


## Step 3: Review Guardrails activity for the bucket

Use the top-level search (as above) to find your test bucket.

Click into the bucket, then select the `Activity` tab.
<p><img alt="gcp_review_bucket_activity" src="/images/docs/guardrails/runbooks/getting-started-gcp/create-static-exception/gcp-review-bucket-activity.png"/></p><br/>

Here you can see the whole history, reading from the bottom up.

 - When you attached the policy that requires uniform access,  the bucket went into `Alarm`. The alarm state represents the difference between what the policy asserts and the actual state of the bucket.  
  
- Then you created the bucket-level policy setting to make an exception for the test bucket.  
  
- Then Guardrails reevaluated, found the bucket in compliance with the new policy setting, and set the status to `Skipped`.

  
In the [next runbook](/guardrails/docs/runbooks/getting-started-aws/create-calculated-exception) we’ll see how to dynamically calculate an exception based on a resource tag.


## Progress tracker

1. [Connect a GCP Project to Guardrails](/guardrails/docs/runbooks/getting-started-gcp/connect-a-project/)

2. [Observe GCP Activity](/guardrails/docs/runbooks/getting-started-gcp/observe-gcp-activity/)

3. [Attach a Guardrails Policy](/guardrails/docs/runbooks/getting-started-gcp/attach-a-policy/)

4. **Create a Static Exception to a Guardrails GCP Policy**

5. [Create a Calculated Exception to a Guardrails GCP Policy](/guardrails/docs/runbooks/getting-started-gcp/create-calculated-exception/)

6. [Send an Alert to Email](/guardrails/docs/runbooks/getting-started-gcp/send-alert-to-email/)

7. [Apply a Quick Action](/guardrails/docs/runbooks/getting-started-gcp/apply-quick-action/)
