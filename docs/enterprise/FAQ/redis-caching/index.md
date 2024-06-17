---
title: "Redis Caching"
template: Documentation
nav:
  order: 60
---

# Redis Caching

## What is Amazon ElastiCache?

Amazon ElastiCache is a web service that makes it easy to set up, manage, and
scale a distributed in-memory data store or cache environment in the cloud. It
provides a high-performance, scalable, and cost-effective caching solution. At
the same time, it helps remove the complexity associated with deploying and
managing a distributed cache environment.

## Why use Caching?

Caching reduces database load and IOPS considerably while also improving process
and query performance. Long term data is not stored in Redis, for example,
process data and logs are archived to S3.

## What information does Guardrails Cache?

Guardrails uses AWS ElastiCache for Redis, in order to store short term data (e.g.
process data) and caching.

## How do I start Caching?

- Though ElastiCache for Redis is now fully supported from TE
  [v5.35.0](releases/te#v5350-2021-01-22) which requires TEF v1.31.0 and TED v1.9.1.

- Upgrading TEF, TED and TE will automatically enable this feature unless it's
  deliberately disabled in both TEF and TED parameters.

- Note that this is currently optional as of TE 5.35.x but Redis
  may become a requirement in some future release.

## What Redis mode does Guardrails use?

AWS ElastiCache for Redis is available in two modes.

1. Single Node (Cluster Mode Disabled)
2. Multi-Node (Cluster Mode Enabled)

As of TED 1.17.x, Guardrails defaults Single Node configuration though Multi-Node clusters are supported too.

## Are the connections encrypted?

Yes, both Encryption-at-transit and Encryption-at-rest are enabled by default.
The same Hive KMS Key is used for encrypting Redis as well. However, the option
to use customer managed CMK for encryption at rest is not available in AWS
GovCloud (us-gov-east-1 and us-gov-west-1) regions. Please click
[here](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/at-rest-encryption.html#at-rest-encryption-constraints)
for more details.

## How is the authentication managed?

Guardrails makes use of the Role-Based Access Control (RBAC) for authenticating
users. For more information about RBAC please click
[here](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/Clusters.RBAC.html).

## Is my ElastiCache undersized or oversized?

It is recommended that you use choose a node type with: Memory needed + 25%
reserved memory (for Redis) + some room for growth (optional 10%). With that
being said, the Guardrails TED Dashboard on AWS CloudWatch captures metrics related
to ElastiCache which helps you understand about the ElastiCache usage.

## How can I scale Redis-based ElastiCache clusters?

From TED v1.17.x vertical scaling is supported on Redis-based ElasticCache.
Below are the steps to vertically scale up and scale down the node type of the
Redis-based ElastiCache Cluster.

## Steps to perform vertical scaling

Please be cautioned that this needs a minimal downtime. The steps remain same
for scaling up and down.

- Navigate to the Guardrails Master Account, open the AWS Console and navigate to
  the Service Catalog service.
- Select the hamburger menu in the top left and click on **Provisioned
  products** list.
- There should be three provisioned products: a TEF product, a TED product, and
  a TE product. Different organizations may have different naming conventions.
- Select the TED product. If it is not obvious via the name of the product,
  selecting a product itself will open the details page. The product type will
  be listed here.
- While looking at the Turbot Guardrails Enterprise Database product, select Actions and
  then click Update.
- Select the desired version of TED and scroll down to the label **Cache**.
- Under the Cache Node Type drop down menu, select the desired cache node type
  and click on Update.
- This may take 15-20 minutes and while the ElastiCache cluster is being
  modified, the cache may be unavailable.
- After the update is complete, verify that the `VIEW LOG` on a Control Page is
  not graded out, and the ElastiCache Cluster is in the available status on the
  master AWS account.

**WARNING**: Whenever the redis cache cluster is resized, the user-group
defaults to Redis Auth Default User which needs to be manually changed to the
hive user-group.

- Select the cluster and click on the Actions drop down button.
- Click on Modify.
- Under **Access Control Option** drop down, change from "Redis AUTH Default
  User" to "User Group Access Control List"
- Select the user-group of the respective hive for **User Group Access Control
  List**. The user-group has a naming convention of &lt;prefix&gt;-&lt;hive&gt;

## How can I connect to Redis Cluster?

Guardrails Bastion host comes with all the pre-requisites installed in order to
connect to RDS/Redis. Please refer to the
[README](https://github.com/turbot/guardrails-samples/tree/master/installation/turbot_bastion_host)
for instructions and usage.
