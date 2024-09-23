---
title: Governing Azure
template: Documentation
nav:
  order: 10
---

# Governing Microsoft Azure

## Overview

Turbot Guardrails is deeply integrated with
[Microsoft Azure](https://azure.microsoft.com/).

- Guardrails  provides dozens of Azure mods, with policies and controls for Azure
  resource types.
- Guardrails extensive IAM integration allows you to federate Azure access and
  manage your Azure permissions through the Guardrails console and API.
- Guardrails  event handlers/pollers keep the Guardrails CMDB up to date as Azure resources are
  created, modified and destroyed; allowing policy enforcement in real time.
- Guardrails  shows all activity in your Azure subscriptions - you can quickly see
  what happened, who made the change, when the activity occurred, and exactly
  what changed.

## Getting started with Guardrails  for Azure

1. Import Azure Resources. These are in the recommended order to import, but not
   all sections will apply to all organizations:

   - [Import Azure Tenant](guides/azure/import/tenant)
   - [Import Azure Active Directory](guides/azure/import/active-directory)
   - [Import Azure Management Group](guides/azure/import/management-group)
   - [Import Azure Subscription](guides/azure/import/subscription)

2. [Set up the Azure Real-Time Events](guides/azure/real-time-events) to keep Turbot
   CMDB up to date
3. [Enable Azure Services](guides/azure/services) that you will use
4. [Configure Permissions Policies](guides/azure/permissions) to allow Turbot to manage
   Azure permissions for your users

## Further Reading

- Explore [Azure Mods](https://hub.guardrails.turbot.com/mods/azure/mods)
- Set up Guardrails [Azure policies](https://hub.guardrails.turbot.com/policy-packs?providers=azure)
- Learn more about [permissions in Turbot](concepts/iam/permissions)
