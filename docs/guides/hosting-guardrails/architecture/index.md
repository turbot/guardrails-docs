---
title: Architecture
sidebar_label: Architecture
---

# Turbot Guardrails Enterprise - Architecture

![Turbot Guardrails Architecture](/images/docs/guardrails/logical-architecture.png)

## Collectives

A **Collective** defines the networking and compute components that will be
shared by all tenants. This type of infrastructure sharing provides safe reuse
(e.g. VPC, EC2 instances) while supporting isolation of data.

Collectives should be configured with 1 to 3 geographically and politically
similar regions, allowing free and fast movement of data.

Collectives are deployed and managed via the
[Turbot Guardrails Enterprise Foundation (TEF)](enterprise/installation/tef-installation)
product in the AWS Service Catalog. At Turbot, collectives are typically named
after a famous bridge or tunnel (connection) in the area.

<div className="example">
  <table>
    <thead>
    <tr>
      <th>Collective Name</th>
      <th>Regions</th>
      <th>Notes</th>
    </tr>
    </thead>
    <tbody>
      <tr>
        <td>brooklyn</td>
        <td>ca-central-1, us-east-1, us-east-2</td>
        <td>3 regions, low latency, crosses US/CA political boundary</td>
      </tr>
      <tr>
        <td>queensborough</td>
        <td>us-east-1, us-east-2</td>
        <td>2 regions, low latency, all data in US</td>
      </tr>
      <tr>
        <td>tower</td>
        <td>eu-west-1, eu-west-2, eu-west-3</td>
        <td>3 regions, low latency, all data in EU</td>
      </tr>
    </tbody>
  </table>
</div>

Most Turbot Guardrails Enterprise customers require only a single collective.

## Hives

A **Hive** defines the physical data storage and caching resources used in
Turbot Guardrails Enterprise.

A hive may be shared by multiple workspaces, but a single cannot span multiple
hives. Within each hive (physical database), workspaces are separated into
different logical schemas to support data isolation and movement between hives
if required.

Hives are deployed and managed via the
[Turbot Guardrails Enterprise Database (TED)](<(/docs/enterprise/installation/ted-installation)>)
product in the AWS Service Catalog. At Turbot, hives are named after a famous
scientist in the area(e.g. newton, edison -- as in “hive mind”.)

Multiple hives may be used to create physical data separation (e.g. isolate
critical tenants) and for scalability through physical sharding, but most Turbot
Enterprise customers will start with a single hive.

## Versions

Each Collective has zero or more **Versions** of Turbot installed. Each version
is installed separately and immutable. For example, versions 5.1.0, 5.1.1 and
5.2.0 may all be installed and in use simultaneously. All changes are done
through installation of new versions - existing versions are never updated.

Each Version in the Collective may be used for zero or more Tenants at any time.

<div className="example">
  <ol>
    <li> <strong>1-Nov:</strong> v5.1.0 is installed.</li>
    <li> <strong>1-Nov:</strong> Tenant A is upgraded to use v5.1.0.</li>
    <li> <strong>2-Nov:</strong> Tenants B, C are upgraded to use v5.1.0.</li>
    <li> <strong>5-Nov:</strong> All Tenants D-Z are upgraded to use v5.1.0.</li>
    <li> <strong>8-Nov:</strong> v5.0.0, with zero remaining tenants, is uninstalled.</li>
  </ol>
</div>

Versions define the majority of their own infrastructure in a standalone,
reproducible manner. For example, load balancers, IAM roles, Lambda functions
and container instances are all defined separately in each version. This
separation improves reproducibility and accuracy while reducing the risk of
installations and upgrades.

Versions are deployed and managed via the
[Turbot Guardrails Enterprise (TE)](enterprise/installation/te-installation) product in the
AWS Service Catalog. Versions are immutable – as Turbot releases new versions,
you should install them via a new instance of the product, not an update to the
previous version.

## Workspaces

A **Workspace** is an independent tenant of turbot, with its own version and its
own schema (logical shard) in a hive. Each Workspace has its own Turbot root,
its own set of mods, and its own web console endpoint.

Workspaces may be hosted in the same collective, and share the same hive, but
are independent of each other. Each workspace can be upgraded or downgraded
independently, and no data is shared across workspaces.

Workspaces are deployed and managed using
[Turbot Workspace Manager](enterprise/installation/workspace-manager),
implemented as a CloudFormation custom resource.

Customers may have multiple workspaces. For instance, you may wish to separate a
development instance of Turbot Guardrails Enterprise from the production instance, in order
to test new Turbot versions, modules, etc.

<div className="example">
  Workspaces per lifecycle phase for the <code>brooklyn</code> collective for <code>vandelay.com</code> :
  <ul>
    <li> dev.brooklyn.vandelay.com</li>
    <li> qa.brooklyn.vandelay.com</li>
    <li> prod.brooklyn.vandelay.com </li>
  </ul>
</div>
