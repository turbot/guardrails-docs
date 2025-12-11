---
title: Preventions
sidebar_label: Preventions
---

# Preventions

The Preventions section provides multiple views of your active security controls, helping you understand what preventive measures are protecting your cloud environment. Each view offers a different perspective on the same controls—choose the view that best fits your current task.

![Preventions List](./preventions-list.png)

## Available Views

The Preventions section provides three different ways to view and analyze your preventive controls:

### Preventions Tab

The [Preventions tab](/guardrails/docs/prevention/preventions/preventions) provides a flat list view with search, filter, and sort capabilities. This is your inventory of active security controls—every Service Control Policy, Azure Policy, account setting, GitHub branch protection rule, and Guardrails control actually running in your environment.

Use this view when you need to quickly find specific controls, verify whether a control is in place, or see all preventions protecting a particular account.

### Types Tab

The [Types tab](/guardrails/docs/prevention/preventions/types) groups preventions by their technical implementation—Service Control Policies, Azure Policies, account settings, GitHub rulesets, and Guardrails controls. This view helps you understand your implementation approach and identify opportunities to simplify or standardize.

Use this view when you're working with a specific technology, reviewing implementation patterns, or analyzing whether you're over-relying on one type of control.

### Layers Tab

The [Layers tab](/guardrails/docs/prevention/preventions/layers) organizes preventions by when they operate in the resource lifecycle—Build, Access, Config, or Runtime. This perspective matters for defense-in-depth: critical objectives should have preventions at multiple layers so if one fails, others provide backup.

Use this view when you're assessing defense-in-depth coverage, planning layer-specific improvements, or identifying objectives that need multi-layer protection.

## Understanding Preventions

Preventions are the actual technical controls implementing your security objectives. While objectives describe what you're trying to achieve (like "prohibit public S3 buckets"), preventions are how you're achieving it—an SCP denying MakeBucketPublic API calls, an S3 Block Public Access account setting, and a Guardrails control remediating public buckets.

Each prevention has a type (how it's implemented) and a layer (when it operates). Understanding these characteristics helps you choose the right tool for each security objective and build defense-in-depth.

## Next Steps

- Start with the [Preventions tab](/guardrails/docs/prevention/preventions/preventions) to see all your active controls
- Use the [Types view](/guardrails/docs/prevention/preventions/types) to understand implementation mechanisms
- Review the [Layers view](/guardrails/docs/prevention/preventions/layers) for defense-in-depth assessment
- Check [Objectives](/guardrails/docs/prevention/objectives) to understand which security goals these preventions achieve
- Review [Recommendations](/guardrails/docs/prevention/objectives/recommendations) for implementation guidance
