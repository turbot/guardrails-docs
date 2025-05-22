---
title: Connect Azure Tenant ()
sidebar_label: Connect Azure Tenant
---

# Connect Azure Tenant (From Descript Transscript)

Connecting your Azure tenant to Turbot Guardrails enables centralized governance, automated discovery, and continuous synchronization of your Azure resources and hierarchy. This guide walks you through connecting your tenant and configuring options for a seamless integration.

## Prerequisites

- Access to the Azure Portal with sufficient permissions (e.g., Global Administrator)
- Turbot Guardrails workspace with administrative access
- Azure tenant ID, client ID, and client secret
- Knowledge of your cloud environment type (Commercial, US Government, or China Cloud)

## Step 1: Launch the Tenant Connection Wizard

1. In Turbot Guardrails, navigate to **Azure Tenants**.
2. Click **Connect Tenant** to start the connection wizard.

## Step 2: Select Tenant and Target Location

1. Select the Azure tenant you wish to connect.
2. Choose the destination folder or location in Turbot Guardrails where the tenant hierarchy will be imported.

## Step 3: Enter Credentials and Environment

1. Enter your Azure tenant ID, client ID, and client secret for access.
2. Select the appropriate cloud environment (Commercial, US Government, or China Cloud).

## Step 4: Define Exclusion Lists (Optional)

1. Optionally, specify management groups or subscriptions to exclude from import.
2. Use static lists or regular expressions (RegEx) for dynamic exclusion of organizational units or subscriptions.

## Step 5: Complete and Monitor Discovery

1. Review your selections and click **Connect** to begin the import.
2. Turbot Guardrails will automatically discover your tenant hierarchy, including management groups, subscriptions, resource groups, and resources.
3. The integration will remain in sync, automatically updating as new subscriptions are added or moved within your tenant.

## Next Steps

- Explore your imported Azure tenant structure in Turbot Guardrails.
- Set and manage Guardrails policies, controls, and audit trails for your Azure resources.
- Use exclusion lists to refine your inventory as your organization evolves.
- For more information or support, visit [turbot.com/start](https://turbot.com/start).

## Troubleshooting

| Issue                | Description                                                                                 | Resolution                                                                                 |
|----------------------|---------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| Permission Denied    | Insufficient permissions to connect or discover tenant resources.                            | Ensure you have Global Administrator or equivalent rights in Azure AD.                     |
| Invalid Credentials  | Incorrect tenant ID, client ID, or client secret entered.                                    | Double-check and re-enter the credentials.                                                 |
| Exclusions Not Working | Excluded management groups or subscriptions are still imported.                            | Review and update your exclusion lists or RegEx patterns.                                  |
| Sync Issues          | Changes in Azure tenant structure are not reflected in Guardrails.                           | Verify connection status and re-run the discovery process if needed.                       |