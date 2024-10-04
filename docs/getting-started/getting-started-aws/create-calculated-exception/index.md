---
title: Create a Calculated Exception to a Guardrails Policy
sidebar_label: Create a Calculated Exception to a Guardrails policy
---


# Create a Calculated Exception to a Guardrails AWS Policy

**Prerequisites**:   
  
- [Connect an AWS Account to Guardrails](/guardrails/docs/getting-started/getting-started-aws/connect-an-account/)
- [Observe AWS Resource Activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity/)
- [Enable Your First Policy Pack](/guardrails/docs/getting-started/getting-started-aws/enable-policy-pack/)
- [Review Account-Wide Bucket Versioning](/guardrails/docs/getting-started/getting-started-aws/review-account-wide/)
- [Create a Static Exception to a Guardrails Policy](/guardrails/docs/getting-started/getting-started-aws/create-static-exception/)


In the [previous runbook](guardrails/docs/getting-started/getting-started-aws/create_static_exception) we showed how to create a static exception. In this one, we’ll show how to make exceptions dynamically, based on resource tags..

## Step 1: Locate the policy pack

From the Guardrails home, navigate to `Turbot > Sandbox > YOUR_AWS_ACCOUNT` and switch to the `Detail` tab.
<p><img alt="aws-locate-policy-pack" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/aws-locate-policy-pack.png"/></p>

  
  
Click into `Enforce Versioning is Enabled for AWS S3 Buckets` Policy Pack. and switch to the Policies tab.
<p><img alt="aws-bucket-versioning-policy-settings" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/aws-bucket-versioning-policy-settings.png"/></p>

Note the Versioning policy (`Check: Enabled`) created in [this guide](/guardrails/docs/getting-started/getting-started-aws/enable-policy-pack).   
  
Click `New Policy Setting`.

## Step 2: Choose Policy Type and Resource

Set the Policy Type to `AWS > S3 > Bucket > Versioning`, and the `Resource` to the policy pack.
<p><img alt="aws-choose-policy-type-and-resource" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/aws-choose-policy-type-and-resource.png"/></p>

## Step 3: Launch Calculated Policy Builder

Click `Enable calculated mode`, then `Launch calculated policy builder`. For the `Test Resource` choose one of your buckets.
<p><img alt="aws-calc-policy-builder-launched" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/aws-calc-policy-builder-launched.png"/></p>

## Step 4: Query for bucket tags

Open the `Select snippet` dropdown and choose `Get bucket`.
<p><img alt="aws-snippet-dropdown-open" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/aws-snippet-dropdown-open.png"/></p>  
  
Guardrails inserts a GraphQL query for bucket tags in the `Input` pane. The result, in the `Output` pane, shows there are no tags on the bucket.
<p><img alt="aws-snippet-active" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/aws-snippet-active.png"/></p>

## Step 5: Add the Jinja2 template

  
Now copy this template code:  
  
```nunjucks
{% if $.bucket.turbot.tags.environment == "development" %}
'Skip'
{% else %}
'Check: Enabled'
{% endif %}
```

And paste it into the template pane.
<p><img alt="aws-template-active" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/aws-template-active.png"/></p>  
  


Guardrails evaluates the template in the context of the chosen `Test Resource`. The template output, `Check: Enabled`, is the calculated policy value that will govern any bucket’s `AWS > S3 > Bucket > Versioning` policy if the bucket is tagged with `environment:development`. Only these tagged buckets will be required to have versioning enabled. Others will be skipped, whether or not they enable versioning.  
  
The result confirms that `Check: Enabled` is valid for this policy type.  
  
Click `Update` to update the policy.

## Step 5: Observe bucket versioning controls

Revisit your bookmarks `Controls by State` report, set the `Type` filter to `AWS > S3 > Bucket`, and search for `versioning`.
<p><img alt="aws-revisit-controls-by-state" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/aws-revisit-controls-by-state.png"/></p>  
  


The bucket for which you made an exception in the previous guide will be in the `Skipped` state, others will be in `Alarm` because they are exempt from the `Check: Enabled` policy.   


## Step 6: Tag a bucket

Now, in the AWS console, assign the tag `environment:development` to another bucket, here we’ll use `bucket-example-03`.  
<p><img alt="aws-tagged-bucket-now-skipped" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/aws-tagged-bucket-now-skipped.png"/></p>  
  


Guardrails notices the change, reevaluates the resource, runs the calculated policy, and changes the status to `Skipped`.
<p><img alt="aws-tagged-bucket-now-skipped" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/aws-tagged-bucket-now-skipped.png"/></p>

## Step 7: Review

Experiment with tagging and untagging other buckets in this way, and observe now Guardrails notices and reacts to the changes. 

## Next Steps

In the [next runbook](/guardrails/docs/getting-started/getting-started-aws/send-alert-to-email) we’ll see how to subscribe to these status alerts via email, Slack, or MS Teams. 

  



## Progress tracker

- [x] [Connect an AWS Account to Guardrails](path)
- [x] [Observe AWS Resource Activity](path)
- [x] [Enable Your First Policy Pack](path)
- [x] [Review Account-Wide Bucket Versioning](path)
- [x] [Create a Static Exception to a Guardrails Policy](path)
- [x] **Create a Calculated Exception to a Guardrails Policy**
- [ ] [Send an Alert to Email](path)
- [ ] [Apply a Quick Action](path)
- [ ] [Enable Automatic Enforcement](path)
