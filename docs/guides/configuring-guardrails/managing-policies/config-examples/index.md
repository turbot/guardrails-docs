---
title: Examples
sidebar_label: Examples
---

# Example Guardrails Policy Configurations

In the cloud, control objectives and organizational policies can seem simple on
the surface, but actual implementation can be a complex set of logic. This set
of example configurations will guide users on how to think about control
objectives and how Guardrails can be used to effectively, efficiently, and safely
implement them.

## Control Objectives

Many organizational requirements can be configured using existing policy
settings without the need to query against resources.

- [Approve specific RDS instance types and DB engines](config-examples/rds-db-approved)

- [Ship S3 Access Logs to a custom bucket](config-examples/s3-access-logs)

- [AWS AMI Management](config-examples/tags/ami-management)

## Calculated Policies

[Calculated policies](guides/managing-policies#using-calculated-polices) can be
thought about in a similar way to the more traditional control objectives.
However, calculated policies allow users and administrators to define specific
queries against resources to pull metadata, and can then use
[Nunjucks](https://mozilla.github.io/nunjucks/templating.html) to create rules
for evaluation.

Check out Guardrails' 7 minute lab,
[Calculated Policies in 7 minutes](7-minute-labs/calc-policy) for a simple
example on using calculated policies to query an S3 bucket for tag metadata,
then format the tags to match the defined template.

### Tagging Specific

- [Apply consistent tags across an Azure environment](concepts/guardrails/tagging)

- [Tag S3 buckets while ignoring casing on key:value pair](concepts/guardrails/tagging/tag-casing)
