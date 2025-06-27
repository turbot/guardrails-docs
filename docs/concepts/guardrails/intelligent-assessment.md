---
title: Intelligent Assessment Guardrails
sidebar_label: Intelligent Assessment
---

# Intelligent Assessment Guardrails

## Overview

**Intelligent Assessment** introduces an AI-powered way to define and evaluate governance policies in Turbot Guardrails.  

Instead of crafting complex calculated policies, you can describe the check you want — in plain natural language — and let Guardrails interpret and check it.  

This unlocks flexible, free-form compliance use cases that would otherwise require significant coding or multiple traditional guardrails.

Intelligent Assessment is complementary to existing controls (e.g., **Approved** and **Active**).  

Where those controls rely on structured sub-policies, Intelligent Assessment excels when you need bespoke logic, conditional checks, or multi-step reasoning.

The primary Intelligent Assessment policy has a consistent form:
`{provider} > {service} > {resource} > Intelligent Assessment`

<div className="example">
  <ul>
    <li><code>AWS > S3 > Bucket > Intelligent Assessment</code></li>
    <li><code>AWS > SNS > Topic > Intelligent Assessment</code></li>
    <li><code>AWS > EC2 > Instance > Intelligent Assessment</code></li>
  </ul>
</div>

The Intelligent Assessment guardrail and policy have a number of sub-settings to determine the
attributes of the assessment. The format of these policy types is
`{provider} > {service} > {resource} > Intelligent Assessment > {Items}`:

```
    {service} > {resource} > Intelligent Assessment > Context
    {service} > {resource} > Intelligent Assessment > User Prompt
```

The `Context` sub-policy includes the resource metadata by default but can be updated to include additional data.
The `User Prompt` sub-policy is where you would define a prompt to assess the resource.

### Example Guardrail: AWS > S3 > Bucket > Intelligent Assessment

The `AWS > S3 > Bucket > Intelligent Assessment` policy determines the action to take on a resource. You can set the policy to skip (don't run at all), or to check whether the resource is compliant per the user prompt.

The Intelligent Assessment sub-policies allow you to set the context and the user prompt:

<div className="example">
  <ul>
    <li><code>AWS > S3 > Bucket > Intelligent Assessment > Context</code></li>
    <li><code>AWS > S3 > Bucket > Intelligent Assessment > User Prompt</code></li>
  </ul>
</div>

Let's assume that an S3 bucket has tags `"Environment": "Non-Compliant Tag"`, and has versioning disabled.

```yaml
Tags:
  - Key: Environment
    Value: Non-Compliant Tag
Versioning:
  MFADelete: Disabled
  Status: Suspended
```

To check if the bucket has the correct `Environment` Tag value and has versioning enabled, you could set the `AWS > S3 > Bucket > Intelligent Assessment > User Prompt` policy to `The bucket must have an Environment tag value of staging and versioning must be enabled`.
The control will then evaluate the result using AI, and go to alarm with the response `The current tag Environment has a value of Non-Compliant Tag which is incorrect. Versioning is not enabled and set to Suspended`.
