---
title: Intelligent Assessment
sidebar_label: Intelligent Assessment
---

# Intelligent Assessment Control

In this guide, you will learn how to:
- Configure AI providers and API keys for intelligent assessment
- Set up custom prompts and context for resource evaluation
- Enable AI-powered analysis for your cloud resources
- Implement intelligent assessment for S3 bucket controls as an example
- Apply these concepts to other services supported by Guardrails

The Intelligent Assessment feature provides AI-powered assessment capabilities for both Controls and Policy Packs. In this guide, we'll focus on using Intelligent Assessment with Controls.

[Control](http://localhost:3000/guardrails/docs/reference/glossary#control) is an automated governance mechanism that continuously monitors cloud resources and enforces compliance policies to ensure they meet organizational security, operational, and regulatory requirements. The Intelligent Assessment feature enhances these Controls by:

- Leveraging AI to perform contextual analysis of resource configurations
- Adapting assessments based on your custom prompts and requirements
- Offering remediation recommendations

For example, when applied to an S3 bucket Control, the Intelligent Assessment can:
- Analyze bucket permissions and access policies
- Evaluate encryption settings
- Assess logging configurations
- Identify potential security vulnerabilities
- Recommend improvements

## Prerequisites

- *Turbot/Owner* permissions at the Turbot resource level.
- Familiarity with the [Guardrails console](https://turbot.com/guardrails/docs/getting-started/).
- Access credentials for the AI model.

## Step 1: Log in to the Guardrails Console

Log in to the Guardrails console using your local credentials or via a SAML-based login.

## Step 2: Navigate to the Turbot > AI Policy

From the Policies section, navigate to **Turbot > AI** in the Guardrails console.

This section provides AI-related policies that allow Guardrails to govern the use of AI for various configurations and settings.

![Intelligent Assessment for Controls](/images/docs/guardrails/guides/using-guardrails/intelligent-assessment/turbot-ai-policy.png)


## Step 3: Configure the AI Provider

Go to **Turbot > AI > Configuration** and update the following policies:

![Open the Turbot > AI > Configuration Policy Setting](/images/docs/guardrails/guides/using-guardrails/intelligent-assessment/turbot-ai-configuration.png)

### Turbot > AI > Configuration > API Key [Default]

Enter the API key Guardrails will use to authenticate with your AI service provider.

![Turobt > AI > Configuration > API Key Policy Setting](/images/docs/guardrails/guides/using-guardrails/intelligent-assessment/turbot-ai-api-key.png)


> [!IMPORTANT]
> - The API key is a sensitive credential used for authentication with your chosen AI service provider. Ensure it is stored and handled securely.
> - For OpenAI:
>   - Obtain the API key from the [OpenAI platform](https://platform.openai.com/api-keys)
>   - The key should start with "sk-"
> - For Anthropic:
>   - Get the API key from the [Anthropic console](https://console.anthropic.com/settings/keys)
>   - The key should start with "sk-ant-"
> - Store the API key securely and rotate it periodically according to your organization's security policies
> - Never share or expose the API key in logs, code repositories, or public forums



### Turbot > AI > Configuration > Provider [Default]

Select the AI provider for Guardrails' AI-powered features and capabilities.

![Select the AI Provider](/images/docs/guardrails/guides/using-guardrails/intelligent-assessment/turbot-ai-provider.png)

### Turbot > AI > Configuration > Model [Default]

Choose which model to use with the selected AI provider for processing requests.

![Choose the AI Model](/images/docs/guardrails/guides/using-guardrails/intelligent-assessment/turbot-ai-model.png)

> [!NOTE]
> Supported and tested models include:
> `claude-sonnet-4-20250514`, `claude-3-7-sonnet-20250219`, `claude-3-5-haiku-20241022`, `claude-3-5-sonnet-20241022`, `gpt-4.1`, `gpt-4.1-mini`, and `gpt-4o`.
> Using lower-tier models may lead to varied results.

## Step 4: Enable Intelligent Assessment

Enable the following policy at the Turbot level: **Turbot > AI > Control > Intelligent Assessment > Enabled**. This enables AI capabilities for Intelligent Assessment controls.

> [!NOTE]
> - The default value is `Disabled`. You can enable it based on your requirements.
> - When enabled at the Turbot level, Intelligent Assessment becomes available for both `Control` and `Policy Pack` features.
> - For this guide, we assume Intelligent Assessment is `Enabled`.


![Enable Intelligent Assessment Control](/images/docs/guardrails/guides/using-guardrails/intelligent-assessment/turbot-ai-intelligent-assessment-enabled.png)

## Step 5: Access the AWS S3 Intelligent Assessment Control

![AWS > S3 > Intelligent Assessment Control](/images/docs/guardrails/guides/using-guardrails/intelligent-assessment/aws-s3-bucket-intellegent-assessment-control.png)

In the Policies section, set **AWS > S3 > Bucket > Intelligent Assessment**  `Check: User prompt`. This policy activates intelligent assessments for the S3 bucket based on your user prompt and context.

![Set the Intelligent Assessment Policy for S3 Bucket](/images/docs/guardrails/guides/using-guardrails/intelligent-assessment/aws-s3-intelligent-assessment-check.png)

## Step 6: Add a User Prompt

Set your custom prompt under **AWS > S3 > Bucket > Intelligent Assessment > User Prompt**. This defines the prompt that will be sent to the AI provider for assessing the S3 bucket. The prompt should clearly outline what the AI should evaluate.

![Set the User Prompt for S3 Bucket Assessment](/images/docs/guardrails/guides/using-guardrails/intelligent-assessment/aws-s3-bucket-intelligent-assessment-user-prompt.png)

**Example Prompt:**
`Confirm that logging is enabled and logs are sent to a secure location.`

The control will assess the S3 bucket using this prompt and return a response.

> [!NOTE]
> The output is generated by the AI provider and may vary based on the model's capabilities and input details.

![Example Output from S3 Bucket Intelligent Assessment](/images/docs/guardrails/guides/using-guardrails/intelligent-assessment/aws-s3-bucket-intelligent-assessment-response.png)

## Next Steps

To explore more Guardrails features:

- [Learn How to Configure Guardrails MCP Server](/guardrails/docs/guides/using-guardrails/ai-tools)
- [Learn about Policy Exceptions](/guides/configuring-guardrails/managing-policies#creating-an-exception)

## Troubleshooting

| Issue                  | Description                                                                                                                   | Guide                                      |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------|
| Further Assistance     | If issues persist, please open a support ticket and attach relevant information to help us assist you more efficiently.       | [Open Support Ticket](https://support.turbot.com) |