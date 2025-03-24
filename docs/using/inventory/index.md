---
title: Inventory
sidebar_label: Inventory
---

# Resources

**Resources** represent objects that are managed by Guardrails. Typically, these are
mapped to resources in the cloud service, such as an AWS S3 bucket, a GCP
compute instance, or an Azure SQL database. Information about Guardrails resources
is stored in the CMDB. 

Once you [connect an integration](http://localhost:3000/guardrails/docs/guides), Guardrails will begin [discovering resources](#discovery-and-cmdb) and adding them to the CMDB.  



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




<!--
[Policies](/guardrails/docs/concepts/policies) can be set to manage the
configuration of resources (or sets of resources).
-->


<!--
![](/images/docs/guardrails/resources/resources-home.png)
-->

<!--
| Concept                                                   | Definition                                                     |
| --------------------------------------------------------- | -------------------------------------------------------------- |
| [Hierarchy](concepts/resources/hierarchy)                 | Information on resource hierarchy in Guardrails                |
| [Types & Categories](concepts/resources/types-categories) | Information on properties and categorization of resource types |
| [Discovery](concepts/resources/discovery)                 | Guardrails and resource discovery                              |
-->


<!--
> [!EXAMPLE]
> - `AWS > Region`
> - `AWS > Account`
> - `AWS > S3 > Bucket`
> - `Azure > SQL > Database`
> - `GCP > Compute > Instance`
-->

<!--

<div className="example">
  <ul>
    <li><code>AWS > Region</code></li>
    <li><code>AWS > Account</code></li>
    <li><code>AWS > S3 > Bucket</code></li>
    <li><code>Azure > SQL > Database</code></li>
    <li><code>GCP > Compute > Instance</code></li>
  </ul>
</div>

-->



<!-->
## Resource Hierarchy


![Resource Hierarchy](/images/docs/guardrails/resource-hierarchy2.png)
All resources in Guardrails are arranged into a hierarchy. Each resource has one
parent, and zero or more children.

The **Resource Hierarchy** may be many levels deep, but has 3 general tiers:

| Tier                   | Purpose                                                                                            |
| ---------------------- | ---------------------------------------------------------------------------------------------------|
| Turbot                 | Root node of the hierarchy.                                                                        |
| Folders                | Hierarchy of folders defined in Guardrails. Typically used to separate resources by business unit. |
| Discoverable Resources | Resources discovered from various sources such as cloud providers, servers and other services.     |



## Resource Types

Every resource managed by Guardrails is an instance of a **Resource Type**. The
resource type defines the properties that belong to a resource, as well as the
[Policies](concepts/policies) that apply to it. Each
[Policy Type](concepts/policies/types-categories#policy-types) targets one or
more resource types.

<div className="example"> The policy type <code>AWS > S3 > Bucket > Approved</code> targets a resource type of <code>AWS > S3 > Bucket</code>, thus every instance of <code>AWS > S3 > Bucket</code> will have an <code>AWS > S3 > Bucket > Approved</code> policy.
</div>

Resource types are defined in a type hierarchy.

<div className="example"> The <code>AWS > S3 > Bucket</code> resource type is a child of the <code>AWS > S3</code> resource type.
</div>

Note that the resource type hierarchy is separate and distinct from the
[Resource Hierarchy](/guardrails/docs/concepts/resources/hierarchy).

Resource types are defined in [Mods](https://hub.guardrails.turbot.com/#mods).

## Resource Categories

The Guardrails Resource Type hierarchy provides grouping of resources, but in a
structured, service-oriented manner. **Resource Categories** provide an
alternate, vendor agnostic, categorization of resource types.

<div className="example"> The <code>AWS > S3 > Bucket</code>, <code>Azure > Storage > Storage Account</code>, and <code>GCP > Storage > Bucket</code> resource types all have a resource category of <code>Storage > Object</code>.
</div>

Resource categories are typically used for reporting, providing useful
aggregation and filtering of data.

### Example - Resource Types and Categories

![](/images/docs/guardrails/resource_types_categories-ex.png)


-->