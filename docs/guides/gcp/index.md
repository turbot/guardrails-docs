---
title: Governing GCP
template: Documentation
nav:
  order: 10
---

# Governing Google Cloud Platform (GCP)

## Overview

Turbot Guardrails is deeply integrated with
[Google Cloud Platform (GCP)](https://cloud.google.com/):

- Guardrails provides dozens of GCP mods, with policies and controls covering a wide
  range of GCP resource types.
- Guardrails' extensive IAM integration allows you to federate GCP access and
  manage your GCP permissions through Guardrails.
- Guardrails' event handlers keep the Guardrails CMDB up to date as resources are created, modified,
  and destroyed, allowing policy enforcement in real time.
- Guardrails shows all activity in your GCP projects - you can quickly see what
  happened, who made the change, when the activity occurred, and exactly what
  changed.

## Getting started with Guardrails for GCP

1. [Import a GCP Project](guides/gcp/import-gcp-project) into a Guardrails Folder
1. [Set up GCP Real-Time Events](guides/gcp/real-time-events)
1. [Enable GCP Services](guides/gcp/services) that you will use
1. [Configure Permissions Policies](guides/gcp/permissions) to allow Guardrails to manage
   GCP permissions for your users

## Further Reading

- Explore [GCP Mods](https://hub.guardrails.turbot.com/mods/gcp/mods)
- Set up Guardrails [GCP Policies](https://hub.guardrails.turbot.com/policy-packs?providers=gcp)
- Learn more about [permissions in Guardrails](concepts/iam/permissions)
