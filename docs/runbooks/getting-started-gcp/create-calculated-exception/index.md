---
title: Create a Calculated Exception to a Guardrails GCP Policy
sidebar_label: Create a calculated exception to a Guardrails GCP policy
---


# Create a Calculated Exception to a Guardrails GCP Policy

**Prerequisites**:   
  
- [Connect a GCP Project to Guardrails](/guardrails/docs/runbooks/getting-started-gcp/connect-a-project/)
- [Observe GCP Activity](/guardrails/docs/runbooks/getting-started-gcp/observe-gcp-activity/)
- [Attach a Guardrails Policy](/guardrails/docs/runbooks/getting-started-gcp/attach-a-policy/)
- [Create a Static Exception to a Guardrails GCP Policy](/guardrails/docs/runbooks/getting-started-gcp/create-static-exception/)


In the [previous runbook](guardrails/docs/runbooks/getting-started-gcp/create_static_exception) we showed how to create a static exception. In this one, we’ll show how to make exceptions dynamically, based on resource tags. Start by creating another test bucket (we’ll use `guardrails-example-gcp-bucket-02`) with fine-grained access control and no labels. 

## Step 1: Go to the GCP > Storage > Bucket > Access Control policy

Choose the top-level `Policies` tab, and search policy types for `gcp bucket access control`.  
<p><img alt="gcp_find_bucket_access_control_policy" src="/images/docs/guardrails/runbooks/getting-started-gcp/create-calculated-exception/gcp-find-bucket-access-control-policy.png"/></p><br/>

Click into the `GCP > Storage > Bucket > Access Control\` policy type, choose the `Settings` tab.
<p><img alt="gcp_bucket_access_control_policy_settings" src="/images/docs/guardrails/runbooks/getting-started-gcp/create-calculated-exception/gcp-bucket-access-control-policy-settings.png"/></p><br/>

Note the Access Control policy (`Check: Uniform`) created in [Attach a policy](/guardrails/docs/runbooks/getting-started-gcp/attach-a-policy), and the bucket-level policy (`Skip`) created in [Create a static exception](/guardrails/docs/runbooks/getting-started-gcp/create-static-exception).   
  
Click `New Policy Setting`.

## Step 2: Create a calculated exception
<p><img alt="gcp_begin_calc_exception" src="/images/docs/guardrails/runbooks/getting-started-gcp/create-calculated-exception/gcp-begin-calc-exception.png"/></p><br/>

Click `Enable calculated mode`, then `Launch calculated policy builder`. For the `Test Resource`, choose the bucket you created at the start of this runbook.
<p><img alt="gcp_calc_policy_builder_launched" src="/images/docs/guardrails/runbooks/getting-started-gcp/create-calculated-exception/gcp-calc-policy-builder-launched.png"/></p><br/>

Open the `Select snippet` dropdown and choose `Get bucket`.
<p><img alt="gcp_snippet_dropdown_open" src="/images/docs/guardrails/runbooks/getting-started-gcp/create-calculated-exception/gcp-snippet-dropdown-open.png"/></p><br/>
<p><img alt="aws_start_5_snippet_active" src="/images/docs/guardrails/runbooks/getting-started-gcp/create-calculated-exception/aws-start-5-snippet-active.png"/></p><br/>

Guardrails inserts a GraphQL query for bucket tags in the `Input` pane. The result, in the `Output` pane, shows there are no tags on the bucket.  
  
Now copy this template code:  
  
```nunjucks
{% if $.bucket.turbot.tags.environment == "development" -%}
'Skip'
{% else -%}
'Check: Enabled'
{%- endif %}
```

And paste it into the template pane.  
<p><img alt="gcp_template_active" src="/images/docs/guardrails/runbooks/getting-started-gcp/create-calculated-exception/gcp-template-active.png"/></p><br/>

  


Guardrails evaluates the step 3 template in the context of the chosen `Test Resource`. The step 3 output, `Check: Uniform`, is the calculated policy value that will apply to this bucket’s `GCP > Storage > Bucket > Access Control` policy if the bucket is labeled with `environment:development`.   
  
The step 4 result confirms that `Check: Uniform` is valid for this policy type.  
  
Click `Update` to update the policy.

## Step 3: Attach the calculated policy to your GCP project

To attach this policy to your GCP project, so it will apply to all buckets in the account, choose your project as the `Resource`.   
<p><img alt="gcp_attach_calc_policy_to_subscription" src="/images/docs/guardrails/runbooks/getting-started-gcp/create-calculated-exception/gcp-attach-calc-policy-to-subscription.png"/></p><br/>

Then click `Create`. Guardrails takes you to the `Policy Setting` page. Choose the `Hierarchy` tab.  
<p><img alt="gcp_hierarchy_with_calc_policy_in_effect" src="/images/docs/guardrails/runbooks/getting-started-gcp/create-calculated-exception/gcp-hierarchy-with-calc-policy-in-effect.png"/></p><br/>  
  


For the Sandbox, the default is overridden from `Skip` to `Check: Uniform`. For the project, that setting is overridden by the calculated policy you just created. And finally, at the bottom of the hierarchy, your static exception for the original test bucket overrides back to skip.   


## Step 4: Observe bucket status

To check the status of the second test bucket, do a top-level search for it.
<p><img alt="gcp_refind_the_bucket" src="/images/docs/guardrails/runbooks/getting-started-gcp/create-calculated-exception/gcp-refind-the-bucket.png"/></p><br/>  
  


Click into the resource, choose the `Controls` tab, and set the `Type` filter to `GCP  > Storage > Bucket > Access Control`.  
<p><img alt="gcp_filter_bucket_to_the_access_control_policy_type" src="/images/docs/guardrails/runbooks/getting-started-gcp/create-calculated-exception/gcp-filter-bucket-to-the-access-control-policy-type.png"/></p><br/>

The bucket is in alarm. Now, label it with `environment:development` to activate the calculated policy you created in this runbook.  
<p><img alt="gcp_label_the_bucket" src="/images/docs/guardrails/runbooks/getting-started-gcp/create-calculated-exception/gcp-label-the-bucket.png"/></p><br/>  
  


Guardrails notices the change, reevaluates the resource, runs the calculated policy, and changes the status to `Skipped`.
<p><img alt="gcp_labeled_bucket_now_skipped" src="/images/docs/guardrails/runbooks/getting-started-gcp/create-calculated-exception/gcp-labeled-bucket-now-skipped.png"/></p><br/>

In the [next runbook](/guardrails/docs/runbooks/getting-started-gcp/send-alert-to-email) we’ll see how to subscribe to these status alerts via email, Slack, or MS Teams. 

  



## Progress tracker

1. [Connect a GCP Project to Guardrails](/guardrails/docs/runbooks/getting-started-gcp/connect-a-project/)

2. [Observe GCP Activity](/guardrails/docs/runbooks/getting-started-gcp/observe-gcp-activity/)

3. [Attach a Guardrails Policy](/guardrails/docs/runbooks/getting-started-gcp/attach-a-policy/)

4. [Create a Static Exception to a Guardrails GCP Policy](/guardrails/docs/runbooks/getting-started-gcp/create-static-exception/)

5. **Create a Calculated Exception to a Guardrails GCP Policy**

6. [Send an Alert to Email](/guardrails/docs/runbooks/getting-started-gcp/send-alert-to-email/)

7. [Apply a Quick Action](/guardrails/docs/runbooks/getting-started-gcp/apply-quick-action/)
