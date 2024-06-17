---
title: "AWS Usage Estimate"
template: Documentation
nav:
  order: 20
---

# Turbot Guardrails Enterprise AWS Usage Estimate

Turbot Guardrails Enterprise runs a multitude of AWS services, including RDS for PostgreSQL, SQS, S3, and EC2. While
each environment is different with respect to amount of controls, policies, and resources, there is an expected baseline
for costs within the AWS master account in US East 1.

[Turbot Guardrails Enterprise AWS Usage Cost Estimate](https://calculator.aws/#/estimate?id=b3a10e1d9515faaf10a1a8f7cab73a6fe0249b44)
using the AWS Pricing Calculator:

## Amazon RDS for PostgreSQL:

* Quantity: 1
* Storage Volume: General Purpose SSD (gp2)
* Storage amount: 500 GB per month
* Instance size: db.m5.4xlarge
* Multi-AZ enabled
* Total monthly cost: $2,194.04

## AWS Lambda:

* Number of requests per month: 50,000,000
* Total monthly cost: $510.00

## AWS Elastic Compute (EC2, deployed via ECS):

* Operating system: Linux
* Quantity: 5
* Storage type: General Purpose SSD (gp2)
* Storage amount: 30 GB
* Instance type: t3.large
* Total monthly cost: $318.68

## Amazon CloudWatch:

* Total monthly cost: $179.75

## Amazon Key Management Service (KMS):

* Number of customer managed Customer Master Keys (CMK): 3
* Number symmetric requests: 10,000,000
* Total monthly cost: $33.00

## Amazon Simple Storage Service (S3):

* S3 Standard Storage: 1 GB per month
* Total monthly cost: $22.02

## Amazon Data Transfer:

* Intra-region: 1 TB per month
* Total monthly cost: $20.48

## Amazon Route 53:

* Hosted Zones: 1
* Total monthly cost: $8.00

## Amazon Simple Queue Service (SQS):

* Standard queue requests: 15 million per month
* Total monthly cost: $6.00

## Total monthly cost: $3,296.97
