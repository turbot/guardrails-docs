---
title: Discovery Guardrails
sidebar_label: Discovery
---

# Discovery Guardrails

## Overview

The `Discovery` control is tasked with identifying instances for a particular
resource. If there are any resources that are not captured in the CMDB as part
of the events that AWS triggers, Guardrails will capture them through the Discovery
controls.

A Discovery control is run on the parent resource (e.g. an AWS Region) to
periodically search for new target resources (e.g. S3 Buckets) and save them to
the Guardrails CMDB.

Once discovered, the resource is then responsible for tracking changes to itself
through the CMDB control.

<div className="example"> 
The Resource Type <code>AWS > SQS > Queue</code> defines a
Control <code>AWS > SQS > Queue > Discovery</code> with a target Resource Type of <code>AWS > Region</code>.  
</div>

### Policies to control Discovery

Discovery controls are enforced or skipped based on the associated CMDB policy.

<div className="example"> 
The <code>AWS > S3 > Bucket > Discovery</code> control relies on the value of the <code>AWS > S3 > Bucket > CMDB</code> policy for its configuration. <code>AWS > S3 > Bucket > CMDB</code> may be set to `Skip` or `Enforce: Enabled`
</div>

Discovery controls also use the `Region` policy associated with the resource. If
region is not in `Regions` policy, the CMDB control should delete the resource
from the CMDB (since we don’t want to capture any resources in that region, we
should also cleanup).

<div className="example"> 
The <code>AWS > S3 > Bucket > Discovery</code> control will search for S3 buckets in a the regions specified in <code>AWS > S3 > Bucket > Regions</code>, and will add any buckets it finds to the CMDB as <code>AWS > S3 > Bucket</code> resources.
</div>
