---
title: "Guardrails DR Considerations"
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

Turbot Support is happy to consult with Enterprise customers to help
determine a strategy to manage these scenarios. Contact us at
[help@turbot.com](mailto:help@turbot.com).
