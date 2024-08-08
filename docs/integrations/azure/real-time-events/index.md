---
title: "Configuring Real-Time events"
template: Documentation
nav:
  title: "Real-Time Events"
  order: 20
---

# Configuring Real-Time Events

Guardrails uses Azure Monitor events to keep up with Azure resources as they are created, destroyed, and modified. This
allows policy enforcement in real time. Below are two ways to capture these events.

- Event Pollers
- Event Handlers

## Event Pollers or Event Handlers

Turbot Supports recommends using Azure Pollers in all circumstances.

It is possible to configure both polling and event handlers, they should never be enabled at the same time.

## Event Poller
Guardrails Azure Event Pollers are a pull-based mechanism. They are enabled by default.  The pollers query Audit Logs (Azure Monitor) at regular intervals (every minute by default) for events inside the polling window (defaults to events in the last 10 minutes).

## Event Handlers
Guardrails Azure Event Handlers use push-based mechanism and are responsible for sending Azure events back to Guardrails
for processing.

The basic flow is as follows:

- An API is invoked in the cloud provider, potentially making a change to a cloud resource.
- The cloud provider writes it to their audit trail (Azure Monitor).
- The Event Handler is connected the cloud provider's audit trail. As events are received, the Event Handler forwards
  them to the Guardrails event ingestion endpoint.
- The Guardrails raw event endpoint decodes the token and runs the action specified by the action type ID. Typically,
  the action will run a provider router.
- The provider router verifies and filters the requests, creates events specific to that provider and pushes them onto
  the event bus.
- Typically, a resource router will pick up the event and take the appropriate action (e.g., - if the event is due to
  the creation of a resource, that resource will be upserted into the database)
- Event Handlers **require** the Microsoft Insights provider is registered within the imported Subscription. Attempting
  to configure event handlers without registering Microsoft Insights will result in errors and events not flowing back
  to Guardrails!




