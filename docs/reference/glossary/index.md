---
title: Glossary
template: Documentation
nav:
  order: 60
---

# Glossary

**Action:** A runnable process in Turbot Guardrails that can be executed by a Control or another Action.

**AKA (Also Known As):** A unique identifier for an object in Turbot Guardrails that allows it to be directly indexed. AKA formats
vary by provider and service. AWS resources have an ARN that is used as an AKA. Turbot Guardrails Resource Ids are also
AKAs.

**CMDB (Configuration Management Database):** The data store that contains all the resource, control, policy, and
notification data in Turbot Guardrails.

**Cloud Account:** A generic umbrella term referring to an AWS Account, Azure Subscription or GCP Project.

**Control:** An instance of a Control Type responsible for enforcing one or more policies. Given the input of policy
settings and resource state, a control will determine what action to take then execute.

**Control Category:** An cloud platform-agnostic categorization of Control Types, often used for reporting or filtering.
For example, the `Resource > Tags` Control Category
covers `AWS > S3 > Bucket > Tags`, `Azure > Storage > Storage Account > Tags`, and `GCP > Storage > Bucket > Labels`.

**Control Type:** A Control Type defines a specific control that may be configured for resources. For
example, `AWS > S3 > Bucket > Approved`.

**Collective:** The networking and compute components that will be shared by all workspaces in a Turbot Guardrails
Enterprise installation. Collectives are deployed and managed via the Turbot Guardrails Enterprise Foundation (TEF)
product in the AWS Service Catalog.

**Event Handler:**  The collection of infrastructure deployed into a cloud account to gather events as they occur and
forward them to Turbot Guardrails for processing.

**Event Router:** A Guardrails Action that receives events from a cloud provider (usually via an Event Handler stack)
then makes the appropriate action such as creating or updating a cloud resource record.

**GraphQL:** GraphQL is the native query language for the Turbot Guardrails API. It offers considerable flexibility and
power above what a REST API could offer.

**Hive:** Often referred to as the Turbot Guardrails Database. The physical data storage and caching resources used in
Turbot Guardrails Enterprise. Hives are deployed and managed via the Turbot Guardrails Enterprise Database (TED) product
in the AWS Service Catalog.

**Policy Setting:** A Policy Setting is an assertion about desired state or behavior. They dictate the behavior of
Guardrails controls. Policy Settings are instances of specific Policy Types.

**Policy Type:** A Policy Type defines values that can be used to dictate the behavior of a control. Each Policy Type is
specific to a Resource Type and Control Type. For example, the `AWS > S3 > Bucket > Approved` policy type is specific
to `AWS > S3 > Bucket` resources and the `AWS > S3 > Bucket > Approved` control.

**Policy Value:** A Policy Value is the effective policy setting for a given resource. The value of a Policy Value is
dictated by a Policy Setting somewhere in the resource hierarchy above the resource.

**Resource:** Resources represent cloud platform objects that are tracked by the Guardrails CMDB. A Resource is a
specific instance of a Resource Type. The AWS bucket `my-aws-bucket` is an example of an `AWS > S3 > Bucket` Resource
Type.

**Resource Category:** An vendor-agnostic categorization of Resource Types. For example,
the `AWS > S3 > Bucket, Azure > Storage > Storage Account`, and `GCP > Storage > Bucket` resource types all have a
resource category of `Storage > Object`.

**Resource Type:** A resource type defines the attributes the CMDB will track for a given cloud resource. Individual
resources are instances of Resource Types.

**Stack:** A Turbot Guardrails Stack is a set of resources managed by Guardrails and defined using Terraform HCL.

**Turbot Guardrails Enterprise (TE):** The application layer of a Turbot Guardrails Enterprise deployment. Relies on the
Turbot Guardrails Database and Foundation products.

**Turbot Guardrails Enterprise Database (TED):**  The database layer of a Turbot Guardrails Enterprise deployment.
Creates and manages the Turbot Guardrails database infrastructure (hive).

**Turbot Guardrails Enterprise Foundation (TEF):** The network and shared compute layer of a Turbot Guardrails
Enterprise deployment. Creates and manages the networking and compute components that will be shared by all workspaces
in a Turbot Guardrails Enterprise installation (Collective).

**Workspace:** A Guardrails workspace provides a graphical frontend, permissions boundaries, an API endpoint and a
Guardrails resource hierarchy. When a user interacts with Turbot Guardrails, they are interacting with a workspace.
