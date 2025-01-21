---
title: Stacks
sidebar_label: Stacks
---

# Stacks

Guardrails [Stack controls](/guardrails/docs/concepts/guardrails/stacks) provides a mechanism for managing resource configuration using OpenTofu, an open-source implementation of Terraform.  Guardrails can apply your configuration at regular intervals, or whenever resources change, enforcing your standards and preventing configuration drift.



<!--
```
Guides...
  by type:
    Network Stacks
    VPC Stacks
    IAM Stacks
    Account / Project / Subscription Stacks
    Region Stacks
  by task
    setting up a stack
    Drift Detection
    Importing resources
    Migrating from legacy stacks 
    Using Secret Variables
    using  calc policies to set variables
    Choosing an OpenTofu version
    using non-default providers to do multi-region stuff...
    exporting state ???
    cleanup / deleting stacks /' "detaching" stacks.... 

Best practices
- Avoid using calculated policies for the `Stack > Source`.  Instead, calculate the `Variables` and/or `Secret Variables` and use terraform functions for conditional logic, iteration, etc.   This makes the stack easier to maintain and test.
- Use `Secret Variables` for inputs that are secrets, like passwords or keys.  
- Use `Variables` for non-sensitive information.  Using `Secret Variables` for non-sensitive inputs creates unnecessary operational complexity, as you will not be able to read the existing values.

```


-->