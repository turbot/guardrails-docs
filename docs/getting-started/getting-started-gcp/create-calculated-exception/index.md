---
title: Create a Calculated Exception to a Guardrails GCP Policy
sidebar_label: Create a Calculated Exception
---


# Create a Calculated Exception to a Guardrails GCP Policy

In the [previous guide](guardrails/docs/runbooks/getting-started-gcp/create_static_exception) we showed how to create a static exception. In this one, we’ll show how to make exceptions dynamically, based on resource labels.

**Prerequisites**:   
  
- [Connect a GCP Project to Guardrails](/guardrails/docs/getting-started/getting-started-gcp/connect-a-project/)
- [Observe GCP Activity](/guardrails/docs/getting-started/getting-started-gcp/observe-gcp-activity/)
- [Enable Your First Guardrails Policy Pack](/guardrails/docs/getting-started/getting-started-gcp/enable-policy-pack/)
- [Review Account-Wide Bucket Access Control](/guardrails/docs/getting-started/getting-started-gcp/review-account-wide/)
- [Create a Static Exception to a Guardrails GCP Policy](/guardrails/docs/getting-started/getting-started-gcp/create-static-exception/)


You’ll also need another bucket with access control set to fine-grained. Here we’ll use `guardrails_bucket_example_02`.

## Step 1: Locate the policy pack

From the top navigation bar, navigate to **Turbot > Sandbox > YOUR_GCP_PROJECT`** and select the **Detail** tab.

<p><img alt="locate-policy-pack" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-calculated-exception/locate-policy-pack.png"/></p>

## Step 2: View the policy pack

Select **Enforce Uniform Access Is Enabled for GCP Storage Buckets**, then select the **policy setting** link.

<p><img alt="bucket-access-control-policy-pack" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-calculated-exception/bucket-access-control-policy-pack.png"/></p>

## Step 3: View policy pack settings

Select the `policy setting` link. Note the Access Control policy (`Check: Uniform`) created in [this guide](/guardrails/docs/getting-started/getting-started-gc[/enable-policy-pack). Select **New Policy Setting**.

<p><img alt="bucket-access-control-policy-settings" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-calculated-exception/bucket-access-control-policy-settings.png"/></p>

## Step 4: Choose Policy Type and Resource

Choose the Policy Type **GCP > Storage > Bucket > Access Control**/

<p><img alt="choose-policy-type-and-resource" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-calculated-exception/choose-policy-type-and-resource.png"/></p>

## Step 5: Enable calculated mode

Select **Enable calculated mode**.

<p><img alt="enable-calculated-mode" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-calculated-exception/enable-calculated-mode.png"/></p>

## Step 6: Launch calculated policy builder

<p><img alt="launch-calculated-policy-builder" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-calculated-exception/launch-calculated-policy-builder.png"/></p>

## Step 7: Choose test resource

Choose one of your buckets.

<p><img alt="calc-policy-builder-launched" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-calculated-exception/calc-policy-builder-launched.png"/></p>

## Step 8: Insert snippet

Choose **Select snippet** and select **Get bucket**.

<p><img alt="snippet-dropdown-open" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-calculated-exception/snippet-dropdown-open.png"/></p>

## Step 9: Query for tags

Guardrails inserts a GraphQL query for bucket tags in the **Input** pane. The result, in the **Output** pane, shows there are no tags on the bucket.  

<p><img alt="snippet-active" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-calculated-exception/snippet-active.png"/></p>

## Step 10: Add the Jinja2 template

  
Now copy this template code:  
  
```nunjucks
{% if $.bucket.turbot.tags.environment == "development" %}
'Skip'
{% else %}
'Check: Uniform'
{% endif %}
```

And paste it into the template pane.

Guardrails evaluates the template in the context of the chosen **Test Resource**. The template output, `Check: Uniform`, is the calculated policy value that will govern any bucket’s **GCP > Storage > Bucket > Access Control** policy if the bucket is labeled with `environment:development`. Only these labeled buckets will be required to have uniform access enabled. Others will be skipped, whether or not they enable uniform access.  
  
The result confirms that `Check: Uniform` is valid for this policy type.  

<p><img alt="template-active" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-calculated-exception/template-active.png"/></p>

## Step 11: Update policy setting  
  
Select **Update**. Guardrails displays the `Update Policy Setting` screen.  

<p><img alt="update-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-calculated-exception/update-policy-setting.png"/></p>


## Step 12: Observe controls for bucket access control

Revisit **Controls by State** and set the **Type** filter to **GCP > Storage > Bucket > Access Control**. The bucket for which you made an exception in the previous guide will be in the `Skipped` state. Buckets with uniform access enabled will be green. Find a bucket in Alarm for uniform access, here we’ll use `guardrails_bucket_example_02`.

<p><img alt="revisit-controls-by-state" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-calculated-exception/revisit-controls-by-state.png"/></p>

## Step 13: Label the bucket

Now, in the GCP console, assign the label `environment:development` to a bucket that’s in `Alarm`. Guardrails notices the change, reevaluates the resource, runs the calculated policy, and changes the status to `Skipped`.  

<p><img alt="labeled-bucket-now-skipped" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-calculated-exception/labeled-bucket-now-skipped.png"/></p>

## Step 14: Review

Experiment with labeling and unlabeling other buckets in this way, and observe how Guardrails notices and reacts to the changes. 

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-gcp/send-alert-to-email) we’ll see how to subscribe to these status alerts via email, Slack, or MS Teams. 


## Progress tracker

- [x] Connect a GCP Project to Guardrails
- [x] Observe GCP Activity
- [x] Enable Your First Guardrails Policy Pack
- [x] Review Account-Wide Bucket Access Control
- [x] Create a Static Exception to a Guardrails GCP Policy
- [x] **Create a Calculated Exception to a Guardrails GCP Policy**
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
