---
title: "Keeping Guardrails Up to Date"
sidebar_label: "Update Guardrails"
---

# Guardrails Stack Updates

Enterprise customers will need to manage the Guardrails stack versions, as the
Turbot Guardrails Enterprise Foundation (TEF), Turbot Guardrails Enterprise Database (TED), and Turbot Guardrails
Enterprise (TE) stacks do not automatically update. The updates can be easily
ran via the Service Catalog service in AWS. Please be aware of the differences
when it comes to updating each individual stack, namely that TEF and TED are in
place updates, while the TE stack is a blue-green deployment. The workspace
stack will be updated in tandem with the TE stack and is never deleted.

## Instructions to Update a Guardrails Stack

- [Update the TEF stack](guides/hosting-guardrails/updating-stacks/update-tef)
- [Update the TED stack](guides/hosting-guardrails/updating-stacks/update-ted)
- [Update the TE stack and custom workspace](guides/hosting-guardrails/updating-stacks/update-workspace)
- [Upgrade to Valkey Cache](guides/hosting-guardrails/updating-stacks/valkey-migration)

Head over to the [Releases](/guardrails/changelog) section for release notes for TEF, TED and the TE stacks.