---
title: Mods
sidebar_label: Mods
---

# Mods

## Overview

Guardrails is designed in a such a way that allows organizations to selectively
install policies, controls, and guardrails that are associated with particular
services. This package of Guardrails resources is known as a [Mod](mods). Guardrails
published mods are often focused on a specific service in a specific cloud
provider. For example,

<div className="example"> Resources, Policies, and Controls for AWS SNS related resources are implemented in the <code>aws-sns</code> mod. </div>

<div className="example"> Resources, Policies, and Controls for GCP Compute related resources are implemented in the <code>gcp-compute</code> mod. </div>

This modular approach provides flexibility, extensibility, and manageability:

- Mods can be installed only if needed
- Mods can be independently deployed and updated
- Mods can be developed independently
- Custom mods can be written to extend Guardrails

Users are required to have `Turbot/Owner` permissions at the top Turbot resource
level in order to install, uninstall, and/ or update mods.

## Mod Dependencies

Guardrails mods often have dependencies on one another. This is due to many AWS,
GCP, and Azure actions requiring permissions across services. As such,
administrators must be mindful when installing specific mods and check
dependencies to ensure full functionality. A list of publicly available mods and
their associated resources, dependencies, and versions can be found on the
[Guardrails Mod Registry](mods).

Check out the bottom of this page for the
[recommended mod installation sequence](mods#recommended-starting-mods)
for new enterprise customers.

## Guardrails Mod Registry

Administrators can view an overview of the mod, inspect the various resources
that are created when the mod is installed, including
[controls](concepts/controls), [policies](concepts/policies), and
[Guardrails resources](concepts/resources). Guardrails resources are generally mapped to
cloud resources, i.e. AWS > S3 > Bucket.

Each mod's inspect tab will contain a description for associated resources, the
URI of that resource, schema (if applicable), and other metadata such as the
category of said resource.

For example, the `@turbot/aws` mod contains a policy resource
[`AWS > Turbot > Audit Trail`](/guardrails/docs/mods/aws/aws/policy#aws--turbot--audit-trail).

<div className="example">

Configure the Guardrails CloudTrail stack.

The Guardrails Audit Trail provides a mechanism for configuring a CloudTrail to
record an audit trail of API calls to your AWS accounts.

URI: tmod:@turbot/aws#/policy/types/auditTrail

Parent: AWS > Turbot

Category: Resource > Logging

Targets: AWS > Region

```
Valid Values:

Skip
Check: Configured
Check: Not configured
Enforce: Configured
Enforce: Not configured
```

```
Schema:

{
  "type": "string",
  "enum": [
    "Skip",
    "Check: Configured",
    "Check: Not configured",
    "Enforce: Configured",
    "Enforce: Not configured"
  ],
  "default": "Skip"
}
```

</div>

## Versioning

Mods are versioned independently and should follow
[semantic versioning](https://semver.org/) rules.

Given a version number MAJOR.MINOR.PATCH, increment the:

- MAJOR version when you make incompatible API changes,
- MINOR version when you add functionality in a backwards compatible manner, and
- PATCH version when you make backwards compatible bug fixes. Additional labels
  for pre-release and build metadata are available as extensions to the
  MAJOR.MINOR.PATCH format.

## Example: AWS SNS

The [aws-sns](mods/aws/aws-sns) mod defines all the resources, controls, and
policies for managing all AWS SNS related resources, such as topics and
subscriptions:

```
Resource types:
AWS > SNS
AWS > SNS > Subscription
AWS > SNS > Topic
AWS > SNS > Topic Policy

Policy types:
AWS > IAM > Permissions > Compiled > Levels > @turbot/aws-sns
AWS > IAM > Permissions > Compiled > Service Permissions > @turbot/aws-sns
AWS > SNS > Approved Regions [Default]
AWS > SNS > Enabled
AWS > SNS > Permissions
AWS > SNS > Permissions > Levels
AWS > SNS > Permissions > Levels > Modifiers
AWS > SNS > Regions [Default]
AWS > SNS > Subscription > Active
AWS > SNS > Subscription > Active > Last Modified
AWS > SNS > Subscription > Approved
AWS > SNS > Subscription > Approved > Regions
AWS > SNS > Subscription > Approved > Usage
AWS > SNS > Subscription > CMDB
AWS > SNS > Subscription > Configured
AWS > SNS > Subscription > Configured > Precedence
AWS > SNS > Subscription > Configured > Source
AWS > SNS > Subscription > Regions
AWS > SNS > Subscription > Usage
AWS > SNS > Subscription > Usage > Limit
AWS > SNS > Topic > Active
AWS > SNS > Topic > Active > Last Modified
AWS > SNS > Topic > Approved
AWS > SNS > Topic > Approved > Regions
AWS > SNS > Topic > Approved > Usage
AWS > SNS > Topic > CMDB
AWS > SNS > Topic > Configured
AWS > SNS > Topic > Configured > Precedence
AWS > SNS > Topic > Configured > Source
AWS > SNS > Topic > Regions
AWS > SNS > Topic > Tags
AWS > SNS > Topic > Tags > Template
AWS > SNS > Topic > Usage
AWS > SNS > Topic > Usage > Limit
AWS > SNS > Topic Policy > CMDB
AWS > SNS > Topic Policy > Configured
AWS > SNS > Topic Policy > Configured > Precedence
AWS > SNS > Topic Policy > Configured > Source
AWS > SNS > Topic Policy > Regions
AWS > Turbot > Event Handlers > Events > Rules > Event Sources > @turbot/aws-sns

Control types:
AWS > SNS > Subscription > Active
AWS > SNS > Subscription > Approved
AWS > SNS > Subscription > CMDB
AWS > SNS > Subscription > Configured
AWS > SNS > Subscription > Discovery
AWS > SNS > Subscription > Usage
AWS > SNS > Topic > Active
AWS > SNS > Topic > Approved
AWS > SNS > Topic > CMDB
AWS > SNS > Topic > Configured
AWS > SNS > Topic > Discovery
AWS > SNS > Topic > Tags
AWS > SNS > Topic > Usage
AWS > SNS > Topic Policy > CMDB
AWS > SNS > Topic Policy > Configured
AWS > SNS > Topic Policy > Discovery

Action types:
AWS > SNS > Subscription > Delete
AWS > SNS > Subscription > Router
AWS > SNS > Topic > Delete
AWS > SNS > Topic > Router
AWS > SNS > Topic > Update Tags

Permission types:
AWS > SNS
```

## Recommended Starting Mods

Although Guardrails allows organizations to pick and choose mods to install in the
environment, basic functionality requires a set of baseline mods. The set will
depend on which cloud provider is used. Order is important!

### AWS

1. [aws](https://turbot.com/guardrails/docs/mods/aws/aws)
2. [aws-iam](https://turbot.com/guardrails/docs/mods/aws/aws-iam)
3. [aws-kms](https://turbot.com/guardrails/docs/mods/aws/aws-kms)
4. [aws-ec2](https://turbot.com/guardrails/docs/mods/aws/aws-ec2)
5. aws-vpc-\*
   - [aws-vpc-core](https://turbot.com/guardrails/docs/mods/aws/aws-vpc-core)
   - [aws-vpc-internet](https://turbot.com/guardrails/docs/mods/aws/aws-vpc-internet)
   - [aws-vpc-connect](https://turbot.com/guardrails/docs/mods/aws/aws-vpc-connect)
   - [aws-vpc-security](https://turbot.com/guardrails/docs/mods/aws/aws-vpc-security)
6. [aws-sns](https://turbot.com/guardrails/docs/mods/aws/aws-sns)
7. [aws-cloudtrail](https://turbot.com/guardrails/docs/mods/aws/aws-cloudtrail)
8. [aws-events](https://turbot.com/guardrails/docs/mods/aws/aws-events)

### Azure

1. [azure](https://turbot.com/guardrails/docs/mods/azure/azure)
2. [azure-iam](https://turbot.com/guardrails/docs/mods/azure/azure-iam)
3. [azure-provider](https://turbot.com/guardrails/docs/mods/azure/azure-provider)

### Google Cloud Platform

1. [gcp](https://turbot.com/guardrails/docs/mods/gcp/gcp)
2. [gcp-iam](https://turbot.com/guardrails/docs/mods/gcp/gcp-iam)
