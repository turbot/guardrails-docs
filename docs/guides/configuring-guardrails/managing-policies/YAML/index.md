---
title: YAML Examples
sidebar_label: YAML Examples
---

# Policy Examples with YAML Templates

Guardrails allows the use of YAML formatting for a variety of policies. Syntax is consistent across all policy types that accept YAML as an input.

Below are some example policy settings using YAML:

### AWS > EC2 > AMI > Tags > Template

```yaml
- Cost Center: "Security"
- Environment: "Dev"
- Account Owner: "John Doe"
```

### AWS > Account > Regions [Default]

```yaml
- us-west-1
- us-west-2
- us-east-1
- us-east-2
```
