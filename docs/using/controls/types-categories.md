---
title: Types & Categories
sidebar_label: Types & Categories
---

# Control Types & Categories

## Control Types

A **Control Type** is a definition for a particular control. Each different control type is a blueprint that can be configured for resources, such the **Approved** control type for AWS S3 buckets. In this case, the control `AWS > S3 > Bucket > Approved` evaluates policy settings to determine what it means for an S3 bucket to be "Approved," and will take the action defined in the associated, identically named policy (`AWS > S3 > Bucket > Approved`).

Control types are useful for filtering control objectives. Using the above example, users can drill into the `AWS`, `S3`, `Bucket`, and then `Approved` to see all Approved controls for every bucket managed by Guardrails. This process can be repeated for any control or resource.

## Control Categories

Guardrails control types exist for different resources and cloud providers. **Control Categories** provide an alternative to control types, allowing a vendor agnostic categorization of control types.

For example, the control category `Resource > Encryption at Rest` includes many controls, such as `AWS > S3 > Bucket > Encryption at Rest`, `GCP > Compute > Disk > Encryption at Rest`, and `Azure > Storage > Storage Account > Encryption at Rest`.

Control categories are typically used for reporting as well as useful aggregation and filtering of data.

## Control Types and Categories - Visualized

![control_types_categories](/images/docs/guardrails/control_types_categories-ex.png)
