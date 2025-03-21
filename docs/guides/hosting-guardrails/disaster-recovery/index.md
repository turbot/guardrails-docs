---
title: "Restore and Recovery"
template: Documentation
nav:
  order: 70
---

# Turbot Guardrails Disaster Recovery Information

Most Guardrails application resources are **stateless**, such as Lambda functions, meaning they
can be rebuilt in any region on the fly. See our
[Enterprise Installation](enterprise/installation/) guide on how to install
Guardrails. However, RDS databases are not stateless. Guardrails uses standard AWS
product features and procedures to store, backup, and restore RDS instances.

AWS publishes a
[best practice](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_BestPractices.html)
guide with basic operational guidelines, as well as documentation for
[Backing Up and Restoring an Amazon RDS DB Instance](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_CommonTasks.BackupRestore.html).

By default, RDS instances have automated backup enabled, backing up once daily
for 14 days. Manual snapshots are not subject to the backup retention period -
they will not expire. In Multi-AZ configurations, AWS manages the replication
and fail-over of the database. During certain types of planned maintenance, or in
the unlikely event of DB instance failure or Availability Zone failure, Amazon
RDS will automatically fail over to the standby so that you can resume database
writes and reads as soon as the standby is promoted.

In the event of the accidental deletion of the TED stack, a new stack can be
created with the added specification of a DB Snapshot and the KMS key used (if
not using the AWS default).

## Common Scenarios

DR plans addresses scenarios where some or all operating components of the Guardrails application fail or are
destroyed.
Here is a list of common scenarios:

- **AWS Region**:  Depends on if this is a temporary or permanent loss. The organization will need to decide on the
  boundary between temporary outage and permanent loss.
- **Single AZ**: Most of the parts of Guardrails that are specific to an AZ are also capable of being Multi-AZ. Single
  AZ outages generally don't matter in that case.
- **AWS Service Outage**:  Depending on the outage and duration, the resolution may be wait for the outage to be over.
- **SSO Authentication**: You'd need break-glass identities in all your workspaces.
- **Route53 Outage**: Wait for it to end, or shift to on-prem DNS to resolve to the Guardrails ALB.
- **Workspace accidentally deleted**: Restore from backup.

## Temporary vs Permanent Outage

Most of the scenarios above depend on whether the loss is considered "temporary" or "permanent". In most scenarios, recovering from an outage requires nothing more than waiting and resyncing Guardrails to the environment afterward.

The complexity and expense of Guardrails DR prep depends completely on the organization's RTO and RPO objectives.

This section provides detailed step-by-step instructions on how to use DR features,

| Guide | Description
| - | -
| [Hive Restore](guides/hosting-guardrails/disaster-recovery/restore) | Guides to restore a Guardrails database from RDS snapshot.
| [DR Testing](guides/hosting-guardrails/disaster-recovery/dr-testing) | Guides to restore  a destroyed workspace.
| [Database Upgrade](guides/hosting-guardrails/disaster-recovery/database-upgrade) | Guides to resize and/or upgrade a database engine version with minimal downtime.

## Additional Assistance

Turbot Support is happy to consult with Enterprise customers to help
determine a strategy to manage these scenarios. Contact us at
[help@turbot.com](mailto:help@turbot.com).
