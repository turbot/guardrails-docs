---
title: Create a Calculated Exception to a Guardrails GCP Policy
sidebar_label: Create a Calculated Exception to a Guardrails GCP policy
---


# Create a Calculated Exception to a Guardrails GCP Policy

In the [previous runbook](guardrails/docs/runbooks/getting-started-gcp/create_static_exception) we showed how to create a static exception. In this one, we’ll show how to make exceptions dynamically, based on resource labels.

**Prerequisites**:   
  
- [Connect a GCP Project to Guardrails](/guardrails/docs/getting-started/getting-started-gcp/connect-a-project/)
- [Observe GCP Activity](/guardrails/docs/getting-started/getting-started-gcp/observe-gcp-activity/)
- [Enable Your First Guardrails Policy Pack](/guardrails/docs/getting-started/getting-started-gcp/enable-policy-pack/)
- [Review Account-Wide Bucket Access Control](/guardrails/docs/getting-started/getting-started-gcp/review-account-wide/)
- [Create a Static Exception to a Guardrails GCP Policy](/guardrails/docs/getting-started/getting-started-gcp/create-static-exception/)


## Step 1: Locate the policy pack

From the Guardrails home, navigate to Turbot > Sandbox > YOUR_GCP_PROJECT and switch to the Detail tab.  
<p><img alt="locate-policy-pack" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-calculated-exception/locate-policy-pack.png"/></p>

## Step 2: Open the policy pack

Click into the `Enforce Uniform Access Is Enabled for GCP Storage Buckets` Policy Pack.  
  
Click the `policy setting` link. 
<p><img alt="bucket-access-control-policy-settings" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-calculated-exception/bucket-access-control-policy-settings.png"/></p>

Note the Access Control policy (`Check: Uniform`) created in [this guide](/guardrails/docs/getting-started/getting-started-gcp/enable-policy-pack).   
  
Click `New Policy Setting`.

## Step 3: Choose Policy Type and Resource

Set the Policy Type to `GCP > Storage > Bucket > Access Control`, and the `Resource` to the policy pack.
<p><img alt="choose-policy-type-and-resource" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-calculated-exception/choose-policy-type-and-resource.png"/></p>

## Step 4: Launch Calculated Policy Builder

Click `Enable calculated mode`, then `Launch calculated policy builder`.  For the `Test Resource` choose one of your buckets.
<p><img alt="calc-policy-builder-launched" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-calculated-exception/calc-policy-builder-launched.png"/></p>

## Step 5: Query for bucket tags

Open the `Select snippet` dropdown and choose `Get bucket`.
<p><img alt="snippet-dropdown-open" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-calculated-exception/snippet-dropdown-open.png"/></p>

  
  
Guardrails inserts a GraphQL query for bucket tags in the `Input` pane. The result, in the `Output` pane, shows there are no tags on the bucket.  
<p><img alt="snippet-active" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-calculated-exception/snippet-active.png"/></p>

## Step 6: Add the Jinja2 template

  
Now copy this template code:  
  
```nunjucks
{% if $.bucket.turbot.tags.environment == "development" %}
'Skip'
{% else %}
'Check: Uniform'
{% endif %}
```

And paste it into the template pane.
<p><img alt="template-active" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-calculated-exception/template-active.png"/></p>

## Step 7: Observe controls for bucket access control

Revisit your bookmarks `Controls by State` report, and set the `Type` filter to `GCP > Storage > Bucket > Access Control`.
<p><img alt="revisit-controls-by-state" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-calculated-exception/revisit-controls-by-state.png"/></p>  
  
The bucket for which you made an exception in the previous guide will be in the `Skipped` state. Find a bucket that’s in `Alarm` for access control. Here we’ll use `guardrails_bucket_example_02`.

## Step 8: Label the bucket

Now, in the GCP console, assign the label `environment:development` to the bucket.  
<p><img alt="labeled-bucket-now-skipped" src="/images/docs/guardrails/getting-started/getting-started-gcp/create-calculated-exception/labeled-bucket-now-skipped.png"/></p>

Guardrails notices the change, reevaluates the resource, runs the calculated policy, and changes the status to `Skipped`.

## Step 9: Review

Experiment with labeling and unlabeling other buckets in this way, and observe now Guardrails notices and reacts to the changes. 

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-gcp/send-alert-to-email) we’ll see how to subscribe to these status alerts via email, Slack, or MS Teams. 


## Progress tracker

- [x] [Connect a GCP Project to Guardrails](path)
- [x] [Observe GCP Activity](path)
- [x] [Enable Your First Guardrails Policy Pack](path)
- [x] [Review Account-Wide Bucket Access Control](path)
- [x] [Create a Static Exception to a Guardrails GCP Policy](path)
- [x] **Create a Calculated Exception to a Guardrails GCP Policy**
- [ ] [Send an Alert to Email](path)
- [ ] [Apply a Quick Action](path)
- [ ] [Enable Automatic Enforcement](path)
