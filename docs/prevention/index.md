---
title: Prevention
---

# Prevention

Turbot Guardrails enables prevention-first cloud security, stopping misconfigurations, policy violations, and risky deployments before they reach production.


## Key Concepts

Guardrails helps provide visibility of the currents state of your prevention posture by scoring **objectives** against **accounts**, providing views to aggregate and summarize those scores in meaningful ways, and making **recommendations** to improve your preventive posture.

**Objectives** are prevention goals - the things you are trying to accomplish, For example, **Restrict AWS resources to allowed regions**, or **Require encryption at rest for AWS EBS volumes**.    

Each objective has exactly one **category** - a logical grouping for the class of the objective. For instance, **Require encryption at rest for AWS EBS volumes** is in the `Data Governance` category.

Each objective also has a **priority** - a weighting of the relative importance of the objective.  For example, **Require encryption at rest for AWS EBS volumes** has a `P2` priority.

To score an objective, guardrails discovers the **preventions** that are configured in your environment, maps them to the relevant objectives and assesses how well they meet the objective.   While objectives describe **what** we are trying to accomplish, preventions define **how** it is being achieved.  For instance, an SCP statement may deny `ec2:createvolume` unless encryption is specified in the request.  An EC2 declarative policy might set the default EBS encryption level.  A Guardrails control may enforce encryption at runtime.  Each of these is a separate prevention that attempts to accomplish the **Require encryption at rest for AWS EBS volumes** objective.

Each prevention is of exactly one **prevention type**, e.g., AWS SCP Deny statement, Azure policy statement, Guardrails control, etc.

A given prevention type (and thus the preventions of that type) exists at exactly one **layer**, which represents when and where in the deployment lifecycle a preventive control is enforced. Each layer operates at a different stage of the security lifecycle, from development through production.  For example, an AWS SCP Deny statement works at the **Access** layer.

Objectives may be arranged into **benchmarks**.  A benchmark is an opinionated, hierarchical organization of objectives.  For example, the `AWS CIS v6.0.0` benchmark arranges the objectives per the [AWS CIS 6.0.0 Benchmark](https://www.cisecurity.org/benchmark/amazon_web_services).  The `AWS NIST 800-53 Rev 5` arranges and scores the objectives around the [NIST 800-53 spec](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final).

Objectives will have [Recommendations](#recommendations) associated with them to suggest specific actions that a user may take to improve their preventative posture.  These recommendations combine best-practice examples with information discovered about your environment to make specific, concrete suggestions to increase your security posture and improve your prevention score.

