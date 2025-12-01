---
title: Discovery
sidebar_label: Discovery
---

# Discovery

Discovery is Guardrails' method for automatically searching virtual infrastructure,
systems or applications to build a structured, searchable data representation.
For example, resources in an AWS Account are discovered and stored in Guardrails.

Discovered resources are always mapped to
[Resource Types](concepts/resources/types-categories#resource-types) and stored
in the [Resource Hierarchy](concepts/resources/hierarchy).

## Discovery & Real-time Updates

Typically, Discovery & CMDB controls are used in combination to find new
resources and track changes to them over time.

### Discovery

Each resource type registers a `Discovery` control on it's parent type. The
`Discovery` control is designed to find all instances of the resource types from
the parent and upsert them into the Guardrails CMDB.

<div className="example">
The Resource type <code>AWS > SQS > Queue</code> defines a
control <code>AWS > SQS > Queue > Discovery</code> with a target resource type of <code>AWS > Region</code>.
</div>

In effect, the parent resource is responsible for creating its children.

### CMDB

Each resource type also registers a `CMDB` control on itself. The `CMDB` control
queries the source for the latest and complete details about the resource.

<div className="example"> 
The resource type <code>AWS > SQS > Queue</code> defines a
control <code>AWS > SQS > Queue > CMDB</code> with a target resource type of <code>AWS > SQS > Queue</code>.
</div>

In effect, a resource is considered to be an adult child, looking after itself.

### Real-time Updates via Events

While Discovery and CMDB controls can find existing resources and update their
details, Guardrails is designed to react in real-time to resource changes. This is
achieved through event handling for create, update and delete events relating to
a resource.

<div className="example"> 
The <code>sqs.amazonaws.com:CreateQueue</code> event is received by Guardrails and
handled with an immediate CMDB upsert. This triggers the CMDB control for the new <code>AWS > SQS > Queue</code> resource, which then fetches full details using the AWS APIs.
</div>

<div className="example"> 
The <code>sqs.amazonaws.com:DeleteQueue</code> event is received by Guardrails and handled with an immediate CMDB deletion. No further queries to the AWS APIs are required.
</div>
