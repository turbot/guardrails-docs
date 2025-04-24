---
title: AWS S3 Bucket Approved Control
sidebar_label: S3 Bucket Approved
---

# AWS S3 Bucket Approved Control

The AWS S3 Bucket Approved control helps you manage and enforce approval policies for your S3 buckets. This control checks the status of defined Approved sub-policies and takes enforcement actions when buckets are not approved.

## Prerequisites

- Access to Turbot Guardrails with AWS integration configured
- Appropriate AWS permissions to manage S3 buckets
- Understanding of S3 bucket management in AWS

## Step 1: Understanding the Control

The Approved control evaluates S3 buckets against the following sub-policies:
- Usage policies
- Custom policies
- Region policies
- Budget policies

When a bucket is not approved according to these policies, the control can:
- Raise alarms
- Take enforcement actions
- Delete unapproved buckets (if configured for new resources)

## Step 2: Configuring the Control

To configure the S3 Bucket Approved control:

1. Navigate to the AWS > S3 > Bucket > Approved policy in your Turbot Guardrails workspace
2. Set the desired enforcement level:
   - Skip
   - Check
   - Enforce
   - Delete unapproved if new

## Step 3: Setting Up Sub-policies

Configure the following sub-policies to define approval criteria:

1. **Usage Policies**: Define approved usage patterns
2. **Custom Policies**: Set custom approval rules
3. **Region Policies**: Specify approved regions
4. **Budget Policies**: Set budget constraints

## Step 4: Monitoring and Enforcement

Monitor the control through:
- Controls by Resource report
- Controls by Control Type report
- Alarms and notifications

## Troubleshooting

Common issues and solutions:
- **Control not triggering**: Verify AWS permissions and policy configurations
- **False positives**: Review and adjust sub-policy criteria
- **Enforcement not working**: Check enforcement level settings

## Next Steps

- Review other S3 bucket controls for comprehensive management
- Set up automated notifications for control violations
- Configure additional approval policies as needed

For more information, visit the [AWS S3 Bucket Approved Control documentation](https://hub.guardrails.turbot.com/mods/aws/controls/aws-s3/bucketApproved).