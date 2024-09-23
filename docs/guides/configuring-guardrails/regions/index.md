---
title: Regions
sidebar_label: Regions
---

# Guardrails Regions and Discovery

A resource type such as an S3 bucket, EC2 instance, or VPC have three distinct
regional attributes in Guardrails:

- **Available** - The regions where the particular resource is available by the
  cloud provider.
- **Discovery** - The regions where Guardrails will discover and add the resource to
  the CMDB. Guardrails will also remove deleted resources from CMDB. This can be
  controled via `Regions` policies as well as `Service > Enabled` policies
- **Approved** - The regions where Guardrails allows a resource type to exist.
  Policies can be set such that controls go into an alarm state. The specific
  Approved policy defines the action the Approved control takes. This can be
  nothing (simply generating an alarm), modifying the resource to match the
  desired configuraiton, or outright deleting the resource from the account.

From a Guardrails perspective, a region can be configured in two ways:

1. Administrators can decide to set a region as **Enabled** or **Disabled**.
   Setting a region to **Disabled** will not only stop all resource discovery
   and remediation, but will also prevent any user action via IAM policies.

2. If a region is set to **Enabled**, administrators can set a global policy to
   **Approve** all regions, a set of regions, and even the approved services in
   a specific region.

## Regional Availability

Regions are defined by the cloud provider:

- [AWS Regions and Availability Zones](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/)
- [Azure Geographies](https://azure.microsoft.com/en-us/global-infrastructure/geographies/)
- [Google Cloud Platform Regions and Zones](https://cloud.google.com/compute/docs/regions-zones)

<div className="alert alert-primary" role="alert">
Even though a said region might exist, certain services might not be available in a particular region. Before attempting to enable regions for a particular service, ensure that the cloud provider provides the required service in the desired region.
</div>

AWS regions can be enabled at the Turbot level via the policy
`AWS > Account > Regions [Default]`. This policy accepts a YAML list of regions
as well as the wildcard operator (`*`).

GCP regions can be enabled at the Turbot level via the policy
`GCP > Project > Regions [Default]`. This policy accepts a YAML list of regions
as well as the wildcard operator (`*`).

Guardrails does NOT have a region resource type for Azure, thus there is no region
discovery. Resource discovery targets **Resource Groups**. The Resource Groups
in Azure can be defined via the policy `Azure > Account > Regions [Default]`,
which is again a [YAML list](managing-policies/YAML).

## Discovery

Guardrails allows administrators to control which regions are discovered, as well as
which regions any specific resource type can be discovered in. Enabling a region
for discovery allows Guardrails to describe all resources in the region, and will
populate CMDB with relevant metadata. Keep in mind that custom permissions on
the Guardrails IAM role or various resources can impact resources discoverability.
The resource will often show as existing, but Guardrails will contain no metadata
about the resource.

<div className="alert alert-primary" role="alert">
<b>IMPORTANT NOTE:</b> Any region that is NOT discovered will NOT exist in the Guardrails CMDB, and as such Guardrails cannot manage resources in non-discoverable regions.
</div>

<div className="alert alert-primary" role="alert">
<b>IMPORTANT NOTE:</b> A region can be allowed for discovery while also being NOT approved for use. In this scenario, administrators can choose to discover all regions but only allow resources to exist in a subset of regions.
</div>

### Discovering Regions

If a region and service is enabled in Guardrails, resources will automatically get
discovered. Regions are added and removed from the CMDB via a discovery control
that targets the account or project:

- AWS > Region > Discovery
- GCP > Region > Discovery
- GCP > Multi-Region > Discovery

Region discovery is controlled by the top level Regions policy:

- AWS > Account > Regions
- GCP > Project > Regions

The default value for these policies contains a list of all regions that can be
discovered. Remember that only regions that can be discovered by Guardrails can have
remediation and preventative action taken.

## Approved Regions

All regional resource types have an `Approved > Regions` policy that allows
administrators to determine where resources of that type are allowed to exist.

All `Approved Regions` policies follow the same format:

- A [YAML list](managing-policies/YAML) of regions or multi-regions.
- The wildcard operator (`*`) is supported.

Through the use of cascading default policies, Guardrails allows flexibility in
setting Approved Regions policies at all levels - Turbot, folder, account,
services, and resources.

1. Each provider has a top level `Approved Regions [Default]` policy.

   - This policy is not used by any control directly, but serves as a default
     for others.
   - This default value is calculated and gets its value from
     `Account > Regions` policies.
   - Examples:
     - `AWS > Account > Approved Regions [Default]`
     - `GCP > Project > Approved Regions [Default]`
     - `Azure > Subscription > Approved Regions [Default]`

2. Each regional service has its own `Approved Regions [Default]` policy.

   - This policy is not used by any control directly, but serves as a default
     for others.
   - The default value of this service-level policy uses the value of the
     top-level `Approved Regions [Default]` policy. A calculated policy is used
     to get that value.
   - Example - AWS:
     - `AWS > S3 > Approved Regions [Default]`
     - `AWS > SNS > Approved Regions [Default]`
     - `AWS > EC2 > Approved Regions [Default]`
     - The default value for all of these policies is inherited by
       `AWS > Account > Approved Regions [Default]`.

3. Each regional resource type has an `Approved > Regions` policy.
   - This policy is used by the Approved control to determine whether resources
     of this type are allowed to exist based on the Region.
   - The default value of this service-level policy uses the value of the
     top-level `Approved Regions [Default]` policy. A calculated policy is used
     to get that value.
   - Example - AWS:
     - `AWS > EC2 > Instance > Approved > Regions`
     - `AWS > EC2 > Volume > Approved > Regions`
     - `AWS > EC2 > Application Load Balancer > Approved > Regions`
     - The default value for all of these policies is AWS > EC2 > Approved
       Regions [Default]

Due to the way that default policies cascade, it is possible to quickly set
regional restrictions with only a few policies. For example:

- Set `AWS > Account > Approved Regions [Default]` to limit which regions are
  allowed to have any AWS resource.
- Set `AWS > EC2 > Approved Regions [Default]` to limit the regions in which EC2
  resources may be used.
- Override the EC2 region policy for only EC2 volume snapshots using
  `AWS > EC2 > Snapshot > Approved > Regions` policy.

## Example AWS Scenarios

### Run everything in all regions

- Do nothing! Guardrails enables all regions in the `AWS > Account > Regions` policy
  which cascades to everything else.

### Discover everywhere, only approve specific regions for use

- Use Default for `AWS > Account > Regions`.
  - All regions will be discovered by default.
  - All regions are added to the boundary policy by default. The IAM Boundary
    policy defines a list of regions which API calls can be made.
- Edit the regions in `AWS > Account > Approved Regions [Default]`.
  - Defaults will cascade to all service and resource approved policies.
  - Only approved regions will be allowed in the lockdown policies, which
    defines the permissions of IAM users and roles, as well as labeling any
    resource outside of the approved regions as **Not Approved**.

### Allow use in specific regions for everyone, including Guardrails

- Edit the regions in `AWS > Account > Regions`.
  - Regions not specified here will not be discovered.
  - Regions not specified here will not appear in the boundary policy.

### Discover all regions and approve all regions, but only allow EC2 in US East 1

- Leave the default for `AWS > Account > Regions`.
- Leave the default for `AWS > Account > Approved Regions [Default]` - Guardrails
  will use the `AWS > Account > regions` policy.
- Edit `AWS > EC2 > Approved Regions [Default]` policy and set it to
  `- us-east-1`,
