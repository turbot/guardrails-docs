---
title: Stacks
sidebar_label: Stacks
---

# Stacks

Guardrails [Stack controls](/guardrails/docs/concepts/guardrails/stacks) provides a mechanism for managing resource configuration using OpenTofu, an open-source implementation of Terraform.  Guardrails can apply your configuration at regular intervals, or whenever resources change, enforcing your standards and preventing configuration drift.

| Section	          | Description
|-------------------|-------------------------------------------
| [Running Stacks](/guardrails/docs/guides/using-guardrails/stacks/running) | Setting up a stack control to create and manage resources.
| [Destroying Stacks](/guardrails/docs/guides/using-guardrails/stacks/destroying) | Destroying resources managed by a stack.


## Best practices
- Avoid using calculated policies for the `Stack > Source`.  Instead, calculate the `Variables` and/or `Secret Variables` and use Terraform functions and control structures for conditional logic, iteration, etc.   This makes the stack easier to maintain and test.
- Use `Secret Variables` for inputs that are secrets, like passwords or keys.
- Use `Variables` for non-sensitive information.  Using `Secret Variables` for non-sensitive inputs creates unnecessary operational complexity, as you will not be able to read the existing values.