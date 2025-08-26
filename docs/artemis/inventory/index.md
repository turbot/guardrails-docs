---
title: Inventory
---

# Inventory

Turbot Guardrails **Inventory** is a comprehensive Configuration Management Database (CMDB) system that automatically discovers, tracks, and manages cloud resources across multi-cloud environments. The inventory system maintains a structured hierarchy of all resources and enables policy-based governance through continuous monitoring and real-time event processing.

To manage resources, you must import one or more [**Account**](/guardrails/docs/artemis/inventory/accounts). In Turbot Guardrails, an account is a foundational resource type that represents a distinct administrative boundary or management scope within a cloud provider, platform, or service.  Guardrails accounts correspond to the primary organizational units used by various platforms - such as an AWS Account, Azure Subscription, GCP Project, Kubernetes Cluster, or GitHub Repository. 

Each account serves as a logical container for [**Resources**](/guardrails/docs/artemis/inventory/resources).  [Resources] represent objects that are managed by Guardrails. These are typically mapped to cloud service resources such as AWS S3 buckets, GCP compute instances, Azure SQL databases, etc.  All resource information is stored in the CMDB.



## Configuring Inventory

You may configure inventory collection on a per-resource type basis.  Most resources support three values for inventory collection: 
- **On**: Inventory collection is enabled for the resource type.
- **Off**: Inventory collection is disabled for the resource type, and resources of this type are removed from the CMDB.
**Paused**: Inventory collection is disabled for the resource type. Resources of this type are not removed from the CMDB, but they will not be updated.

You can configure inventory:
- **Globally** for all accounts in the installation.  To manage your global inventory, go to the **Admin** section, and then the **Inventory** tab.
- For each **Account** individually.  To manage the per-account inventory settings, click the account from the list on the **Accounts** screen, click the **Advanced** dropdown, and select **Inventory**


<!--
## Resource Hierarchy

All resources in Guardrails are arranged into a hierarchical structure with three main tiers:

### 1. Turbot Root
- **Purpose**: Root node of the entire hierarchy
- **Function**: All other resources are descendants of this node
- **Usage**: Target for various controls and policies used by the Guardrails system

### 2. Folders
Folders provide high-level organization of resources and support common organizational models:

| Model Type | Examples |
|------------|----------|
| Business Unit | R&D, Commercial, Admin |
| Compliance | GxP production, GxP Development, PCI, Commercial |
| Environment | Development, Testing, Production |

**Key Folder Characteristics**:
- Can be renamed and moved
- Limited to single inheritance only
- Should match control, business, and permission requirements
- Can be managed using the Turbot Guardrails Terraform Provider

### 3. Discoverable Resources
The vast majority of resources representing objects from:
- Cloud providers (AWS, Azure, GCP)
- Operating systems
- SaaS tools
- Virtually any external system

All discovered resources are added to the Guardrails Resource Hierarchy according to their Mod definitions.

## Resource Types & Categories

### Resource Types
Every resource is an instance of a Resource Type that defines:
- Properties belonging to the resource
- Policies that apply to it
- Hierarchical relationships

**Example Structure**:
```
AWS > S3 > Bucket
├── Properties: bucket name, region, encryption, etc.
└── Policies: AWS > S3 > Bucket > Approved
```

Resource types follow a hierarchy separate from the resource instance hierarchy (e.g., `AWS > S3 > Bucket` is a child of the `AWS > S3` resource type).

### Resource Categories
Resource Categories provide vendor-agnostic categorization across different cloud providers:

| Cloud Provider Resources | Category |
|---------------------------|----------|
| AWS > S3 > Bucket | Storage > Object |
| Azure > Storage > Storage Account | Storage > Object |
| GCP > Storage > Bucket | Storage > Object |

Categories are primarily used for:
- Cross-cloud reporting
- Data aggregation and filtering
- Vendor-neutral policy application

## Discovery Mechanism

Discovery is Guardrails' automated method for finding and cataloging infrastructure resources. The system uses a three-part approach:

### 1. Discovery Controls
- Each resource type registers a Discovery control on its parent type
- Parent resources are responsible for creating their children
- Example: `AWS > SQS > Queue` defines `AWS > SQS > Queue > Discovery` with target `AWS > Region`

### 2. CMDB Controls  
- Each resource type registers a CMDB control on itself
- Resources manage their own detailed information updates
- Example: `AWS > SQS > Queue > CMDB` targets `AWS > SQS > Queue` resources

### 3. Real-time Event Processing
- Handles create, update, and delete events in real-time
- Immediate CMDB operations trigger detailed API queries
- Eliminates polling delays for resource changes

**Event Processing Flow**:
```
Event Received → CMDB Upsert/Delete → Detailed API Query → Resource Update
```
-->
