---
title: Getting Started with Azure
sidebar_label: Getting Started with Azure
---
# Getting Started with Azure

This section provides detailed step-by-step instructions on how to use Guardrails features for Azure account, organized by subject area:


| |
| - | -
| [Connect Azure Subscription](getting-started/getting-started-azure/connect-a-subscription) | Guides to import Azure subscriptions and configure Azure specific Guardrail's features.
| [Observe Activity](getting-started/getting-started-azure/observe-azure-activity) | Guides to monitor and visualize Azure [resource](guardrails/docs/reference/glossary#resource) activities across your Azure environment.
| [Attach Policy Pack](getting-started/getting-started-azure/attach-policy-pack) | Guides to attach predefined [Policy Packs](guardrails/docs/concepts/policy-packs) to enforce security and compliance across your Azure resources.
| [Create Exceptions](getting-started/getting-started-azure/create-static-exception) | Guides to create exceptions for specific policies in cases where custom handling is required.
| [Create Calculated Policy](getting-started/getting-started-azure/create-calculated-exception) | Guides to create [Calculated Policies](guardrails/docs/reference/glossary#calculated-policy) that use CMDB data, GraphQL queries, and Nunjucks templates to dynamically generate resource-specific policy values.
| [Send Alerts](getting-started/getting-started-azure/send-alert-to-email) | How to setup Guardrail's notification feature to send real-time alerts about events that occur in your cloud infrastructure.
| [Apply a Quick Action](getting-started/getting-started-azure/apply-quick-action) | Guide to enables users to initiate specific, one-time Control enforcements directly from the Guardrails UI.
| [Enable Enforcement](getting-started/getting-started-azure/enable-enforcement) | Guides to enable enforcement in Guardrails, ensuring automatic remediation of policy violations.