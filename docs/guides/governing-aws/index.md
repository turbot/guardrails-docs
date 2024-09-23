---
title: Governing AWS
template: Documentation
nav:
  order: 10
---

# Governing Amazon Web Services (AWS)

## Overview

Since its inception, Guardrails has deeply integrated with
[Amazon Web Services (AWS)](https://aws.amazon.com/).

- Guardrails provides dozens of AWS mods, covering hundreds of AWS resources, with
  thousands of policies and controls.
- Guardrails' extensive IAM integration allows you to federate AWS access and
  manage your AWS permissions through the Guardrails console and API.
- Guardrails' event handlers keep the CMDB up to date as AWS resources are created, modified, and destroyed, allowing
  policy enforcement in real time.
- Guardrails shows all activity in your AWS account - you can quickly see what
  happened, who made the change, when the activity occurred, and exactly what
  changed.

## Getting started with Guardrails for AWS

1. [Import an AWS Account](integrations/aws/import-aws-account) into a Guardrails  Folder.
1. [Set up the AWS Event Handlers](integrations/aws/event-handlers) to configure real-time
   events.
1. [Enable AWS Services](integrations/aws/services) that you will use.
1. [Configure Permissions Policies](integrations/aws/permissions) to allow Guardrails to manage
   AWS permissions for your users.

## Security Hub

Guardrails features an integration with AWS Security Hub, allowing architects and
engineers without access to the Guardrails console to receive up-to-date information
about Guardrails controls for their account.

- [Turbot Guardrails Firehose to Security Hub](aws/security-hub)

## Further Reading

- Explore [AWS Mods](/mods/)
- Set up Guardrails AWS policies with
  [Terraform Control Objectives](https://github.com/turbot/guardrails-samples/tree/master/control_objectives)
- Learn more about [permissions in Guardrails](concepts/iam/permissions)
