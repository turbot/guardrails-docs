---
title: Resources
sidebar_label: Resources
---

# Resources

**Resources** represent objects that are managed by Guardrails. Typically, these are
mapped to resources in the cloud service, such as an AWS S3 bucket, a GCP
compute instance, or an Azure SQL database. Information about Guardrails resources
is stored in the CMDB. 

Once you [connect an integration](/guardrails/docs/guides), Guardrails will begin [discovering resources](#discovery-and-cmdb) and adding them to the CMDB.  



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
