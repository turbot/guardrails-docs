---
title: Enable Automatic Enforcement
sidebar_label: Enable Automatic Enforcement
---

  


# Enable Automatic Enforcement

**Prerequisites**:  
  
- [Connect a GCP Project to Guardrails](/guardrails/docs/runbooks/getting-started-gcp/connect-a-project/)
- [Observe GCP Activity](/guardrails/docs/runbooks/getting-started-gcp/observe-gcp-activity/)
- [Attach a Guardrails Policy](/guardrails/docs/runbooks/getting-started-gcp/attach-a-policy/)
- [Create a Static Exception to a Guardrails GCP Policy](/guardrails/docs/runbooks/getting-started-gcp/create-static-exception/)
- [Create a Calculated Exception to a Guardrails GCP Policy](/guardrails/docs/runbooks/getting-started-gcp/create-calculated-exception/)
- [Send an Alert to Email](/guardrails/docs/runbooks/getting-started-gcp/send-alert-to-email/)
- [Apply a Quick Action](/guardrails/docs/runbooks/getting-started-gcp/apply-quick-action/)


  
In the [previous runbook](/guardrails/docs/runbooks/getting-started-gcp/apply-quick-action) we showed how to add the single permission that enables you to take a `Quick Action` on GCP bucket access control. That’s needed here as well, as we explore how to empower Guardrails to take such actions autonomously.

## Step 1: Verify test bucket does not have uniform access

  
In the GCP console, verify that your original test bucket, in our case `guardrails-example-gcp-bucket-01bucket-example-01`, does not have uniform access.

## Step 2: Find the access control policy for the bucket

Search for the bucket. In  [Create a static  exception](/guardrails/docs/runbooks/getting-started-gcp/create-static-exception) we set its access control policy to `Skip`.  
<p><img alt="gcp_find_bucket_access_control_setting" src="/images/docs/guardrails/runbooks/getting-started-gcp/enable-enforcement/gcp-find-bucket-access-control-setting.png"/></p><br/>

## Step 3: Update the policy setting

  
Click into the Policy Setting, click `Edit`. Originally we had an exception to "Skip" the bucket from checking uniform access.  Now we will automatically enforce uniform access.  Choose `Enforce: Uniform` and click `Update`.  
<p><img alt="gcp_enforce_uniform_access" src="/images/docs/guardrails/runbooks/getting-started-gcp/enable-enforcement/gcp-enforce-uniform-access.png"/></p><br/>

On the Policy Setting page, switch to the `Activity` tab.  
<p><img alt="gcp_enforcement_happened" src="/images/docs/guardrails/runbooks/getting-started-gcp/enable-enforcement/gcp-enforcement-happened.png"/></p><br/>  
  
Here you can see the whole history. Reading from the bottom up:

- you updated the policy setting

- Guardrails reevaluated and found the bucket to be out-of-policy

- Guardrails autonomously did what you did with a `Quick Action` in the previous runbook: switch to uniform access control  
  
- Guardrails noticed the bucket’s changed status

- Guardrails reevaluated and found that the bucket now complies with policy

For fun, try suspending versioning on the bucket again. It won’t stay that way for long!

This Getting Started series just scratches the surface.  Try installing more [policy packs](https://hub.guardrails.com) into your workspace, and run through this series again to explore the breadth and variety of what Guardrails can do. 


## Progress tracker

1. [Connect a GCP Project to Guardrails](/guardrails/docs/runbooks/getting-started-gcp/connect-a-project/)

2. [Observe GCP Activity](/guardrails/docs/runbooks/getting-started-gcp/observe-gcp-activity/)

3. [Attach a Guardrails Policy](/guardrails/docs/runbooks/getting-started-gcp/attach-a-policy/)

4. [Create a Static Exception to a Guardrails GCP Policy](/guardrails/docs/runbooks/getting-started-gcp/create-static-exception/)

5. [Create a Calculated Exception to a Guardrails GCP Policy](/guardrails/docs/runbooks/getting-started-gcp/create-calculated-exception/)

6. [Send an Alert to Email](/guardrails/docs/runbooks/getting-started-gcp/send-alert-to-email/)

7. [Apply a Quick Action](/guardrails/docs/runbooks/getting-started-gcp/apply-quick-action/)

8. **Enable Automatic Enforcement**
