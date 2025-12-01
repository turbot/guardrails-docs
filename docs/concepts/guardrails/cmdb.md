---
title: CMDB Guardrails
sidebar_label: CMDB
---

# CMDB Guardrails

## Overview

The CMDB control is responsible for populating and updating all the attributes
for that resource type in the Guardrails CMDB.

<div className="example">
The Resource Type <code>AWS > SQS > Queue</code> defines a
Control <code>AWS > SQS > Queue > CMDB</code> with a target Resource Type of <code>AWS > SQS > Queue</code>.
</div>

### Policies to control CMDB

CMDB controls have an associated policy that allows them to be enforced or
skipped. Note, however, that if CMDB is set to `Skip` for a resource, then it
will not exist in the CMDB, and _no controls that target it will run_.

<div className="example"> 
The <code>AWS > S3 > Bucket > CMDB</code> policy may be set to `Skip` or `Enforce: Enabled`
</div>

CMDB controls also use the `Region` policy associated with the resource. If
region is not in `Regions` policy, the CMDB control should delete the resource
from the CMDB (since we don’t want to capture any resources in that region, we
should also cleanup).

<div className="example"> 
The <code>AWS > S3 > Bucket > CMDB</code> will add/modify a resource in the CMDB if the resource is in region specified in <code>AWS > S3 > Bucket > Regions</code>, and delete it from the CMDB if it is not.
</div>
