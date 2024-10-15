---
title: Create a Calculated Exception to a Guardrails Policy
sidebar_label: Create a Calculated Exception to a Guardrails Policy
---


# Create a Calculated Exception to a Guardrails AWS Policy

In the [previous guide](guardrails/docs/getting-started/getting-started-aws/create_static_exception) we showed how to create a static exception. In this one, we’ll show how to make exceptions dynamically, based on resource tags.

**Prerequisites**:   
  
- [Connect an AWS Account to Guardrails](/guardrails/docs/getting-started/getting-started-aws/connect-an-account/)
- [Observe AWS Resource Activity](/guardrails/docs/getting-started/getting-started-aws/observe-aws-activity/)
- [Enable Your First Policy Pack](/guardrails/docs/getting-started/getting-started-aws/enable-policy-pack/)
- [Review Account-Wide Bucket Versioning](/guardrails/docs/getting-started/getting-started-aws/review-account-wide/)
- [Create a Static Exception to a Guardrails Policy](/guardrails/docs/getting-started/getting-started-aws/create-static-exception/)


## Step 1: Locate the policy pack

From the top navigation bar, navigate to **Turbot > Sandbox > YOUR_AWS_ACCOUNT** and select the **Detail** tab.

<p><img alt="locate-policy-pack" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/locate-policy-pack.png"/></p>

## Step 2: View the policy pack

  
Select **Enforce Versioning is Enabled for AWS S3 Buckets**. Select the **policy setting** link.

<p><img alt="bucket-versioning-policy-pack" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/bucket-versioning-policy-pack.png"/></p>

## Step 3: View policy pack settings

Select the `policy setting` link. Note the Versioning policy (`Check: Enabled`) created in [this guide](/guardrails/docs/getting-started/getting-started-aws/enable-policy-pack). Select **New Policy Setting**.

<p><img alt="bucket-versioning-policy-settings" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/bucket-versioning-policy-settings.png"/></p>

## Step 4: Choose Policy Type and Resource

Choose the Policy Type **AWS > S3 > Bucket > Versioning**.

<p><img alt="choose-policy-type-and-resource" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/choose-policy-type-and-resource.png"/></p>

## Step 5: Enable calculated mode

Select `Enable calculated mode`.

<p><img alt="enable-calculated-mode" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/enable-calculated-mode.png"/></p>

## Step 6: Launch calculated policy builder.

<p><img alt="launch-calculated-policy-builder" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/launch-calculated-policy-builder.png"/></p>

## Step 7: Choose test resource

Choose one of your buckets.

<p><img alt="calc-policy-builder-launched" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/calc-policy-builder-launched.png"/></p>

## Step 8: Insert snippet

Choose **Select snippet** and select **Get bucket**`.

<p><img alt="snippet-dropdown-open" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/snippet-dropdown-open.png"/></p>

## Step 9: Query for tags

Guardrails inserts a GraphQL query for bucket tags in the `Input` pane. The result, in the `Output` pane, shows there are no tags on the bucket.

<p><img alt="snippet-active" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/snippet-active.png"/></p>

## Step 9: Add the Jinja2 template

  
Now copy this template code:  
  
```nunjucks
{% if $.bucket.turbot.tags.environment == "development" %}
'Skip'
{% else %}
'Check: Enabled'
{% endif %}
```

And paste it into the template pane.

  
Guardrails evaluates the template in the context of the chosen `Test Resource`. The template output, `Check: Enabled`, is the calculated policy value that will govern any bucket’s `AWS > S3 > Bucket > Versioning` policy if the bucket is tagged with `environment:development`. Only these tagged buckets will be required to have versioning enabled. Others will be skipped, whether or not they enable versioning.  
  
The result confirms that `Check: Enabled` is valid for this policy type.  

<p><img alt="template-active" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/template-active.png"/></p>

## Step 10: Update policy setting

  
Select **Update**. Guardrails displays the `Update Policy Setting` screen.  

<p><img alt="update-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/update-policy-setting.png"/></p>

## Step 11: Observe controls for bucket versioning

Revisit your bookmarked **Controls by State** report, and set the **Type** filter to **AWS > S3 > Bucket > Versioning**. The bucket for which you made an exception in the previous guide will be in the `Skipped` state. Buckets with versioning enabled will be green. Find a bucket in Alarm for versioning, here we’ll use `example-bucket-04`.

<p><img alt="revisit-controls-by-state" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/revisit-controls-by-state.png"/></p>

## Step 12: Tag the bucket

Now, in the AWS console, assign the tag `environment:development` to a bucket that’s in `Alarm`.  Guardrails notices the change, reevaluates the resource, runs the calculated policy, and changes the status to `Skipped`.

<p><img alt="tagged-bucket-now-skipped" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/tagged-bucket-now-skipped.png"/></p>

## Step 13: Review

Experiment with tagging and untagging other buckets in this way, and observe how Guardrails notices and reacts to the changes. 

## Next Steps

In the [next guide](/guardrails/docs/getting-started/getting-started-aws/send-alert-to-email) we’ll see how to subscribe to these status alerts via email, Slack, or MS Teams. 

  



## Progress tracker

- [x] Connect an AWS Account to Guardrails
- [x] Observe AWS Resource Activity
- [x] Enable Your First Policy Pack
- [x] Review Account-Wide Bucket Versioning
- [x] Create a Static Exception to a Guardrails Policy
- [x] **Create a Calculated Exception to a Guardrails Policy**
- [ ] Send an Alert to Email
- [ ] Apply a Quick Action
- [ ] Enable Automatic Enforcement
