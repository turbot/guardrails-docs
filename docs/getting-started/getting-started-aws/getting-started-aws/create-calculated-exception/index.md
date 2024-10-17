---
title: Create a Calculated Exception to a Guardrails Policy
sidebar_label: Create a Calculated Exception
---


# Create a Calculated Exception to a Guardrails AWS Policy

In this guide you’ll learn how to make dynamic policy exceptions based on resource tags.

This is the sixth guide in the *Getting started with AWS* series.


**Prerequisites**: 
 
- Completion of the first five guides.

## Step 1: Open the policy packs

Choose **Policies** from the top navigation bar. Select **Policy Packs**.

<p><img alt="choose-policies" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/choose-policies.png"/></p>

## Step 2: Open the policy for bucket versioning

Select **Enforce Versioning is Enabled for AWS S3 Buckets**.

<p><img alt="search-versioning" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/view-policy-packs.png"/></p>


## Step 3: Create a policy setting

Note the Versioning policy (`Check: Enabled`) created in [this guide](/guardrails/docs/getting-started/getting-started-aws/enable-policy-pack). Select **New Policy Setting**. 

<p><img alt="view-policy-pack" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/bucket-versioning-policy-settings.png"/></p>

## Step 4: Choose Policy Type

Search for `aws s3 bucket versioning` and enable the checkbox next to  **AWS > S3 > Bucket > Versioning**.

<p><img alt="choose-policy-type-and-resource" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/choose-policy-type.png"/></p>

## Step 5: Enable calculated mode

Select **Enable calculated mode**.

<p><img alt="enable-calculated-mode" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/enable-calculated-mode.png"/></p>

## Step 6: Launch calculated policy builder

<p><img alt="launch-calculated-policy-builder" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/launch-calculated-policy-builder.png"/></p>

## Step 7: Choose test resource

Calculated policies work across all resources. While building a calc policy it is useful to test it against real resources in your environment. For this Guide, let's find and select one of our test buckets created previously, by typing its name into the Test Resource field.

<p><img alt="calc-policy-builder-launched" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/calc-policy-builder-launched.png"/></p>

## Step 8: Insert snippet

In the **Query Input** field we will use **Select Snippet** to prepopulate our GraphQL query. Choose **Get bucket** from the dropdown.

<p><img alt="snippet-dropdown-open" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/snippet-dropdown-open.png"/></p>

## Step 9: Query for tags

Guardrails inserts a GraphQL query for bucket tags in the **Input** pane. The result, in the **Output** pane, shows there are no tags on the bucket.

<p><img alt="snippet-active" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/snippet-active.png"/></p>

## Step 10: Add the Jinja2 template

 
Now copy this template code: 
 
```nunjucks
{% if $.bucket.turbot.tags.environment == "development" %}
'Skip'
{% else %}
'Check: Enabled'
{% endif %}
```

And paste it into the template pane.

 
Guardrails evaluates the template in the context of the chosen **Test Resource**. The template output, `Check: Enabled`, is the calculated policy value that will govern any bucket’s **AWS > S3 > Bucket > Versioning** policy if the bucket is tagged with `environment:development`. Only these tagged buckets will be required to have versioning enabled. Others will be skipped, whether or not they enable versioning. 
 
The result confirms that `Check: Enabled` is valid for this policy type. Why? Because the test bucket does not have a tag `{ "environment": "development" }`.

Select **Update**.

<p><img alt="template-active" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/template-active.png"/></p>

## Step 11: Update calculated policy
 
Select **Update**.

<p><img alt="update-policy-setting" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/update-policy-setting.png"/></p>

## Step 12: Observe controls for bucket versioning

Navigate back to the **Controls by State** report and set the **Type** filter to **AWS > S3 > Bucket > Versioning**. The bucket for which you made an exception in the previous guide will be in the `Skipped` state. Buckets with versioning enabled will be green. Find a bucket in Alarm for versioning, here we’ll use `example-bucket-04`.

<p><img alt="revisit-controls-by-state" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/revisit-controls-by-state.png"/></p>

## Step 13: Tag the bucket

In the AWS console, assign the tag `environment:development` to a bucket that’s in `Alarm`. 

<p><img alt="tagged-bucket" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/tagged-bucket.png"/></p>


## Step 14: Observe the effect

Observe that Guardrails notices the change, reevaluates the resource, runs the calculated policy, and changes the status to `Skipped`.

<p><img alt="tagged-bucket-now-skipped" src="/images/docs/guardrails/getting-started/getting-started-aws/create-calculated-exception/tagged-bucket-now-skipped.png"/></p>

## Step 15: Review

In this guide you’ve learned how to make dynamic policy exceptions based on resource tags.
 

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
