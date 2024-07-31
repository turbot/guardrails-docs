---
title: "Create a calculated exception to a Guardrails AWS policy"
template: Documentation
nav:
  title: "Create a calculated exception"
---


# Create a calculated exception to a Guardrails AWS policy

**Prerequisites**:   
  
- [Connect an AWS account to Guardrails](/guardrails/docs/runbooks/getting-started-aws/connect_an_account)
- [Observe AWS resource activity](/guardrails/docs/runbooks/getting-started-aws/observe_aws_activity)
- [Attach a Guardrails policy](/guardrails/docs/runbooks/getting-started-aws/attach_a_policy)
- [Create a static exception to a Guardrails AWS policy](/guardrails/docs/runbooks/getting-started-aws/create_static_exception)


In the [previous runbook](guardrails/docs/runbooks/getting-started-aws/create_static_exception) we showed how to create a static exception. In this one, we’ll show how to make exceptions dynamically, based on resource tags. Start by creating another test bucket (we’ll use `example-bucket-02`) in the default state: bucket versioning suspended, no tags.

## Step 1: Go to the AWS > S3 > Bucket > Versioning policy

Choose the top-level `Policies` tab, and search policy types for `aws s3 bucket versioning`.  
<p><img alt="aws_start_5_find_bucket_versioning_policy" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_5_find_bucket_versioning_policy.png"/></p><br/>

Click into the `AWS > S3 > Bucket > Versioning` policy type, choose the `Settings` tab.
<p><img alt="aws_start_5_bucket_versioning_policy_settings" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_5_bucket_versioning_policy_settings.png"/></p><br/>

Note the Sandbox-level policy you created in [Attach a policy](/guardrails/docs/runbooks/getting-started-aws/attach_a_policy), and the bucket-level policy you created in [Create a static exception](/guardrails/docs/runbooks/getting-started-aws/create_static_exception).   
  
Click `New Policy Setting`.

## Step 2: Create a calculated exception
<p><img alt="aws_start_5_begin_calc_exception" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_5_begin_calc_exception.png"/></p><br/>

Click `Enable calculated mode`, then `Launch calculated policy builder`. For the `Test Resource`, choose the bucket you created at the start of this runbook.
<p><img alt="aws_start_5_calc_policy_builder_launched" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_5_calc_policy_builder_launched.png"/></p><br/>

Open the `Select snippet` dropdown and choose `Get bucket`.
<p><img alt="aws_start_5_snippet_dropdown_open" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_5_snippet_dropdown_open.png"/></p><br/>
<p><img alt="aws_start_5_snippet_active" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_5_snippet_active.png"/></p><br/>

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
<p><img alt="aws_start_5_template_active" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_5_template_active.png"/></p><br/>  
  


Guardrails evaluates the step 3 template in the context of the chosen `Test Resource`. The step 3 output, `Check: Enabled`, is the calculated policy value that will apply to this bucket’s `AWS > S3 > Bucket > Versioning` policy if the bucket is tagged with `environment:development`.   
  
The step 4 result confirms that `Check: Enabled` is valid for this policy type.  
  
Click `Update` to update the policy.

## Step 3: Attach the calculated policy to your AWS account

To attach this policy to your AWS account, so it will apply to all buckets in the account, choose your account as the `Resource`.   
<p><img alt="aws_start_5_attach_calc_policy_to_account" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_5_attach_calc_policy_to_account.png"/></p><br/>

Then click `Create`. Guardrails takes you to the `Policy Setting` page. Choose the `Hierarchy` tab.  
<p><img alt="aws_start_5_hierarchy_with_calc_policy_in_effect" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_5_hierarchy_with_calc_policy_in_effect.png"/></p><br/>  
  


For the Sandbox, the default is overridden from `Skip` to `Check: Enabled`. For the account, that setting is overridden by the calculated policy you just created. And finally, at the bottom of the hierarchy, your static exception for the original test bucket overrides back to skip.   


## Step 4: Observe bucket status

To check the status of the second test bucket, do a top-level search for it, and click into the resource.
<p><img alt="aws_start_5_refind_the_bucket" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_5_refind_the_bucket.png"/></p><br/>  
  


Click into the resource, choose the `Controls` tab, and set the `Type` filter to `AWS > S3 > Bucket > Versioning`.  
<p><img alt="aws_start_5_filter_bucket_to_the_versioning_policy_type" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_5_filter_bucket_to_the_versioning_policy_type.png"/></p><br/>

The bucket is in alarm. Now, tag it with `environment:development` to activate the calculated policy you created in this runbook.  
<p><img alt="aws_start_5_tag_the_bucket" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_5_tag_the_bucket.png"/></p><br/>  
  


Guardrails notices the change, reevaluates the resource, runs the calculated policy, and changes the status to `Skipped`.
<p><img alt="aws_start_5_tagged_bucket_now_skipped" src="/images/docs/guardrails/runbooks/getting-started-aws/aws_start_5_tagged_bucket_now_skipped.png"/></p><br/>

In the [next runbook](/guardrails/docs/runbooks/getting-started-aws/send_alert_to_email) we’ll see how to subscribe to these status alerts via email, Slack, or MS Teams. 

  



## You are here

1. [Connect an AWS account to Guardrails](/guardrails/docs/runbooks/getting-started-aws/connect_an_account)

2. [Observe AWS resource activity](/guardrails/docs/runbooks/getting-started-aws/observe_aws_activity)

3. [Attach a Guardrails policy](/guardrails/docs/runbooks/getting-started-aws/attach_a_policy)

4. [Create a static exception to a Guardrails AWS policy](/guardrails/docs/runbooks/getting-started-aws/create_static_exception)

5. **Create a calculated exception to a Guardrails AWS policy**

6. [Send an alert to email](/guardrails/docs/runbooks/getting-started-aws/send_alert_to_email)

7. [Apply a Quick Action](/guardrails/docs/runbooks/getting-started-aws/apply_quick_action)

8. [Enable automatic enforcement](/guardrails/docs/runbooks/getting-started-aws/enable_enforcement)
