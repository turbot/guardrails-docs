---
title: TE Installation
sidebar_label: TE Installation
---

# Turbot Guardrails Enterprise (TE) Installation

**Turbot Guardrails Enterprise (TE)** provides automated configuration and management of
Turbot infrastructure to be used when running the Turbot software application.
For example, TE provides the setup of load balancers, SQS queues, ECS, etc.
while Turbot provides the software to run in the container.

TE deploys a new version of the Turbot software -- Every Turbot release requires
a new TE version.

<div className="example"> Turbot Guardrails Enterprise v5.8.6 is a TE release.  To install it, you must lauch a new TE stack, and then update your workspaces for the new version.
</div>

## Install

### Launch the TE Service Catalog item

1.  In the AWS Console, navigate Service Catalog in the region into which you
    wish to install TE.

1.  Select **Turbot Guardrails Enterprise** from the Products list and click “Launch
    Product.”

1.  Select a **Name** for the provisioned project. Typically, this will start
    with “te” and will include the version number, for example: `te-5-8-6`

1.  Select a **Version**. Usually, you will want the latest version.

### Advanced - Foundation Parameters

The Foundation Parameters allow the TED stack to use SSM parameters defined in
the TEF stack. You should only change these values if you did not use the
default **Resource Name Prefix** (turbot) in the TEF stack.

### Advanced - Foundation Overrides

The Foundation Overrides allow you to override values defined in the TEF stack.
Normally, these should all be blank.

### Advanced - Deployment

1. Select a **Resource Name Prefix**. This prefix will be added to all Turbot
   resources, and should match the prefix used in the TEF and TED stacks

<div className="alert alert-warning">
 <span style={{color:"red"}}>The Resource Name Prefix must match the Resource Name Prefix used in the Turbot Guardrails Enterprise Foundation (TEF) stack!</span>
</div>

2. Select the portfolio **Release Stream** (development, staging, or
   production). This should usually be "production".
