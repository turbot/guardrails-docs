---
title: Best Practices
template: Documentation
nav:
  order: 90
---

# Import Best Practices

Importing cloud accounts into a Guardrails workspace is a critical step towards automated governance. A frequent question is "How fast can I
do imports?"  This document describes some best practices and procedures for ensuring that imports go as smoothly and
quickly as possible. The process described here relies only on information available through the Guardrails GraphQL API.

In the interest of brevity in this document, "policy values and controls" will be referred to simply as "controls"
unless there is a specific difference between them. The resolution mechanism for policy values and controls is the same.
Guardrails will start running a control as soon as the dependent policies are ready. Outside of this specific discussion on
account imports, typical workflows focus on controls, not policy values.

## Imports: Under the Hood

A cloud account import has several phases that need to be completed before an account is "ready". They are:

1. Initial Guardrails API call to create the cloud account resource (whether through the GUI, API or Terraform).
2. Set credential policies
3. In parallel:

    - Event Handler infrastructure deployment (if enabled)
    - Resource discovery
    - Policy creation for each discovered resource
    - Control creation for each discovered resource

As soon as resources are discovered, processing of controls starts. There are no distinct phases where *all* resource
are discovered then *all* policies calculated then *all* controls evaluated. All three activities are processed in
parallel.

```math
per-account import time = initial API call \
            + credentials policies \ 
            + resource discovery \ 
            + policy value creation \ 
            + control creation \
            + policy value retries \ 
            + control retries
```

**Improvements to Retries and DB Size**: Since the number of installed mods and cloud resources cannot be reduced
without breaking business requirements, the primary means of speeding up an import is by reducing the number of retries.
In addition, throughput can be improved by increasing the DB instance size and the concurrent worker lambdas. For
Enterprise customers, work with the Turbot Administrators to determine proper DB sizes and worker concurrency for your
environment. For SaaS customers, please work with the Turbot Customer Success team regarding your imports.

**Estimating Resource Counts**: The number of resources that Guardrails will discover can be difficult to predict. Some cloud
accounts are light with few resources. Others are very heavy with thousands or tens of thousands of resources. As a
result, each account will have some variation in total import time.

**Policy Value Calculation**: Many policy values are simple and can be set instantly. Some policy values must be
calculated first. Still other policy values depend on other policy values. The controls that depend on these policies
must wait in a `tbd` state until the policy value goes into `ok`.

**Resolving Prerequisites**: Guardrails uses a robust retry strategy when evaluating controls and policy values. If a
dependent control or policy isn't ready, then Guardrails will retry at a later time using an exponential backoff strategy.
This approach avoids the use of complex locking algorithms and supervision processes. In the vase majority of cases,
retrying a control or policy value 10 seconds later isn't a problem.

## Requirements

- Keep the number of policies and controls in `state:tbd` as low as possible, ideally zero.
- Maximize imports per hour.
- Ensure Event Handlers are properly deployed.

## Antipatterns

- Importing all cloud accounts in one big batch. While tempting, don't do this. The initial account import calls may complete
  quickly but the rest of the import process remains to be done. The cost of retries will quickly erase any perceived
  speed gains from very large bulk imports. Cleaning up all the `tbd` policies values in the midst of heavy system load
  can be painful and time-consuming.

## Generic Import Process

**Prior to Import**: Evaluate health of the environment by inspecting the number of controls and policy values in
a `tbd` or `error` state. The ideal is to have zero policy values and controls in `tbd`. However, in active environments
with frequent new resources, getting the count to zero isn't possible. Instead, aim for no _old_ policy values and
controls in `tbd`.

1. Import a cloud account.
2. Regularly check the counts of policy values and controls in `tbd`. Also check the number of `error` controls. If
   these numbers don't go down, investigate.
3. When there are no `tbd`s remaining, import the next account. Note how long it took for all `tbd`s to clear. This
   duration can form the basis of a cooldown period between imports.

## Automation Nice To Haves

- Automate the process of checking that `tbd` counts has gone to zero.
- Trigger the next import when the `tbd` count goes to zero.

## Determining Max Import Rates

1. Run through the generic import process but use steadily increasing batches.
2. Observe how the `tbd` counts and clearance times change by batch size.
3. Determine the sweet spot for batch size and cooldown time.

## Event Handlers

Getting the Event Handlers controls into `ok` requires terraform runs on the ECS hosts. They depend on various policy
values and controls but these generally resolve quickly. 
