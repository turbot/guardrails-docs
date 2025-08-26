---
title: Resources
sidebar_label: Resources
---

# Resources

**Resources** represent objects that are managed by Guardrails. Typically, these are mapped to resources in the cloud service, such as an AWS S3 bucket, a GCP compute instance, or an Azure SQL database. Information about Guardrails resources is stored in the CMDB. 

Once you import an [account](/guardrails/docs/artemis/inventory/accounts), Guardrails will begin discovering resources and adding them to the CMDB.  


## Resource Types

Every resource managed by Guardrails is an instance of a **Resource Type**. The resource type defines the properties that belong to a resource, as well as the [Controls](/guardrails/docs/artemis/guardrails/controls) and [Policies](/guardrails/docs/artemis/guardrails/policies) that apply to it. 

For example, AWS S3 buckets are represented in the CMDB with the `AWS > S3 > Bucket` resource type.  The `AWS > S3 > Bucket` type includes properties such as the bucket name, ACL, bucket policy, logging status, default encryption, versioning configuration, tags, etc.  Controls, such as the `AWS > S3 > Bucket > Versioning` control, target the `AWS > S3 > Bucket` resource type, enabling you to create guardrails to manage your buckets; each instances of `AWS > S3 > Bucket` may have an `AWS > S3 > Bucket > Versioning` control.

Resource types are defined in [Mods](https://hub.guardrails.turbot.com/#mods).

## Resource Categories

The Guardrails Resource Type hierarchy provides grouping of resources, but in a structured, service-oriented manner. **Resource Categories** provide an alternate, vendor agnostic, categorization of resource types.

For example, the `AWS > S3 > Bucket`, `Azure > Storage > Storage Account`, and `GCP > Storage > Bucket` resource types all have a resource category of `Storage > Object`.

Resource categories are typically used for reporting, providing useful aggregation and filtering of data.

### Example - Resource Types and Categories

![](/images/docs/guardrails/resource_types_categories-ex.png)

<!--
## Resource Hierarchy

All resources in Guardrails are arranged into a hierarchy. Each resource has one parent, and zero or more children.

Turbot Root is the top level resource of the entire hierarchy, and all other resources are descendants of this node. This resource is the target for various controls and policies used by the Guardrails system.  

When you [connect](connect) your cloud accounts to Guardrails, they are imported under the root.  When you import an organization, such as an [AWS Organization](connect/aws/import-aws-organization), [GCP Organization](connect/gcp/import-gcp-organization), or [Azure Tenant](connect/azure/import/tenant), organizational resources will be created in the resource hierarchy to mirror your organization's hierarchy.  You can explore these resources in the **Accounts** page. 

For each cloud account (AWS Account, GCP Project, Azure Subscription, etc), Guardrails will discover the resources for which you enable inventory. These will be arranged under the account in a hierarchical structure that reflects the cloud provider's layout.  For instance, the AWS hierarchy will include regions beneath the account, and then arrange regional resources beneath.  [Mods](https://hub.guardrails.turbot.com/#mods) define the structure of these resources; Guardrails simply ensures they are valid and structured according to their definition.

-->


## Resource Hierarchy

All resources in Guardrails are arranged into a hierarchy. Each resource has one
parent, and zero or more children.

The **Resource Hierarchy** may be many levels deep, but has 3 general tiers:

| Tier                   | Purpose
| ---------------------- | ---------------------------------------------------------------------------------------------
| Turbot                 | Root node of the hierarchy.
| Folders                | Hierarchy of folders defined in Guardrails. Typically used to separate resources by business unit.
| Discoverable Resources | Resources discovered from various sources such as cloud providers, servers and other services.

![Resource Hierarchy](/images/docs/guardrails/resource-hierarchy2.png)

### Turbot Root

Turbot Root is the top level resource of the entire hierarchy, and all other
resources are descendants of this node. This resource is the target for various
controls and policies used by the Guardrails system.

### Folders

Folders provide a high level arrangement of resources in Guardrails. Common models
for folders include:

| Model         | Example                                          |
| ------------- | ------------------------------------------------ |
| Business Unit | R&D, Commercial, Admin                           |
| Compliance    | GxP production, GxP Development, PCI, Commercial |
| Environment   | Development, Testing, Production                 |

A typical hierarchy might look something like the following:

```
Turbot
  {Company Folder} (Folder)
     {Top Level Folder} (Folder)
         {Intermediate Folder} (Folder)
```

- Folders can be renamed and moved. Use names that make sense within the
  organization structure.
- Folders are limited to single inheritance only, consider
  [Policy Packs](/guardrails/docs/concepts/policy-packs) for cross-hierarchy organization.
- Folder structure is best configured in such a way that matches control,
  business, and permission requirements!
- Folders can be created an destroyed using the [Turbot Guardrails Terraform
  Provider](https://registry.terraform.io/providers/turbot/turbot/latest/docs/resources/folder).


### Discoverable Resources

The vast majority of resources in Guardrails are created to represent resources in
other tools or systems. Cloud providers, operating systems, SaaS tools -
virtually any system can be a source of Guardrails Resources.

All discovered resources are added to the Guardrails Resource Hierarchy.
[Mods](https://hub.guardrails.turbot.com/#mods) define the structure of these resources, Guardrails simply ensures they
are valid and structured according to their definition.






<!--
## Discovery and CMDB
 
Discovery & CMDB controls are used in combination to find new resources and track changes to them over time.

Discovery is Guardrails' method for automatically searching virtual infrastructure,
systems or applications to build a structured, searchable data representation.
For example, resources in an AWS Account are discovered and stored in Guardrails.

Each resource type registers a `Discovery` control on it's parent type. The
`Discovery` control is designed to find all instances of the resource types from
the parent and upsert them into the Guardrails CMDB.

<div className="example">The Resource type <code>AWS > SQS > Queue</code> defines a
control <code>AWS > SQS > Queue > Discovery</code> with a target resource type of <code>AWS > Region</code>.
</div>

In effect, the parent resource is responsible for creating its children.

Discovered resources are always mapped to [Resource Types](#resource-types) and stored in the [Resource Hierarchy](#resource-hierarchy).


Each resource type also registers a `CMDB` control on itself. The `CMDB` control
queries the source for the latest and complete details about the resource.

<div className="example"> The resource type <code>AWS > SQS > Queue</code> defines a
control <code>AWS > SQS > Queue > CMDB</code> with a target resource type of <code>AWS > SQS > Queue</code>.
</div>

In effect, a resource is considered to be an adult child, looking after itself.

### Real-time Updates

While Discovery and CMDB controls can find existing resources and update their details, Guardrails is designed to react in real-time to resource changes.  Depending on the [integration](), you may have a choice between event handlers or event pollers for updating resources.

- **Event Handlers** use the eventing system for the cloud provider to **push** updates to Turbot Guardrails whenever a create, update or delete event occurs.  Event handlers typically require a bit more setup, but also more timely updates than polling.
- **Event Pollers** query the events from the cloud providers audit log to **pull** updates in to Turbot Guardrails.  Polling occurs at regular intervals.  It is generally less timely than event handlers, but usually requires little to no configuration


<div className="example"> The <code>sqs.amazonaws.com:CreateQueue</code> event is received by Guardrails and
handled with an immediate CMDB upsert. This triggers the CMDB control for the new <code>AWS > SQS > Queue</code> resource, which then fetches full details using the AWS APIs.
</div>

<div className="example"> The <code>sqs.amazonaws.com:DeleteQueue</code> event is received by Guardrails and handled with an immediate CMDB deletion. No further queries to the AWS APIs are required.
</div>

-->
