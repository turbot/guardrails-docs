---
title: "Azure FAQ"
sidebar_label: "Azure FAQ"
---

# Azure FAQs

---

- [Where can I find a list of Azure mods developed by Guardrails?](#where-can-i-find-a-list-of-azure-mods-developed-by-guardrails)
- [What API is Guardrails making requests to when Event Polling is configured?](#what-api-is-guardrails-making-requests-to-when-event-polling-is-configured)
- [How do I rotate the Azure Subscription credentials integrated with Guardrails?](#how-do-i-rotate-the-azure-subscription-credentials-integrated-with-guardrails)

---

## Where can I find a list of Azure mods developed by Guardrails?

Guardrails publishes mod information on our [Mods page](mods). From here, searching
`Azure` will populate the list with mods specifically for a variety of Azure
services. Selecting the mod will display the **Readme** (if there is one),
**Inspect** (a list of controls, resource types, and policies contained in said
policy), **Dependencies**, as well as **Versions**.

## What API is Guardrails making requests to when Event Polling is configured?

Guardrails queries the Azure Audit Logs (Monitor) service for a list of all changes
within the window defined via the Guardrails policy,
`Azure > Turbot > Event Poller > Window`, at an interval defined by the policy
`Azure > Turbot > Event Poller > Interval`. Note that the window policy setting
must be greater than the interval, and it is recommended to be at least twice
the interval. More detailed information about the policies can be found by
[inspecting the Azure Mod](mods/azure/azure/policy#azure--turbot--event-poller),
as well as the
[Azure Event Poller](integrations/azure/real-time-events/event-pollers) page.

## How do I rotate the Azure Subscription credentials integrated with Guardrails?

When you need to update your credentials that link Guardrails to your Azure Subscription, the following steps can be
followed via the Turbot Guardrails console. For programmatic updates, you can use the Turbot
Guardrails [GraphQL API](https://turbot.com/guardrails/docs/reference/graphql) or with
the [Guardrails Terraform provider](https://turbot.com/guardrails/docs/reference/terraform).

Client Secret rotation requires updates in Azure Active Directory. Refer to
these [instructions](https://learn.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#option-3-create-a-new-application-secret)
on how to create a new Access Key. Turbot recommends using two client secrets when performing a credential rotation.
This ensures that Guardrails always has a valid access key for this subscription.

There are three policies used to integrate an Azure Subscription with Turbot Guardrails:

- [Azure > Tenant ID](mods/azure/azure/policy#azure--tenant-id)
- [Azure > Client ID](mods/azure/azure/policy#azure--client-id)
- [Azure > Client Secret](mods/azure/azure/policy#azure--client-secret)

**Tenant ID (Directory ID):**

1. Navigate to the Policies tab and search for "Turbot IAM Access Key ID" or browse to `Azure > Tenant ID`.
2. In the `Azure > Tenant ID` policy page, click the `Settings` subtab.
3. Click on the pencil icon next to the `Azure > Tenant ID` policy you intend to update.

**Client ID (Application ID):**

1. Navigate to the Policies tab and search for "Client ID" or browse to `Azure > Client ID`.
2. In the `Azure > Client ID` policy page, click the `Settings` subtab.
3. Click on the pencil icon next to the `Azure > Client ID` policy you intend to update.

**Client Secret:**

1. Navigate to the Policies tab and search for "Client Secret" or browse to `Azure > Client Secret`.
2. In the `Azure > Client Secret` policy page, click the `Settings` subtab.
3. Click on the pencil icon next to the `Azure > Client Secret` policy you intend to update.

**Credential Verification:**

After updating the credentials, Guardrails will automatically trigger the `Azure > Subscription > CMDB` control to
verify access to the Subscription. Successful credentials should have the `Azure > Subscription > CMDB` control go into or
stay in an `ok` state.

**Manual Verification**: To manually verify if the credentials are functional:

1. Visit the top `Controls` tab and navigate to the `Azure > Subscription > CMDB` page.
2. Access the `Controls` subtab to view all Subscription CMDB controls.
3. Select the applicable Azure Subscription, choose `Actions`, then click on `Run control` to prompt Turbot Guardrails
   for a CMDB update.

If an error arises, consult the log for permission issues. If the status is OK, the credential update was successful.
