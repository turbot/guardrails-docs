---
title: Resources
sidebar_label: Resources
---

# Resources

**Resources** represent objects that are managed by Guardrails. Typically, these are
mapped to resources in the cloud service, such as an AWS S3 bucket, a GCP
compute instance, or an Azure SQL database. Information about Guardrails resources
is stored in the CMDB. [Policies](policies) can be set to manage the
configuration of resources (or sets of resources).

| Concept                                                   | Definition                                                     |
| --------------------------------------------------------- | -------------------------------------------------------------- |
| [Hierarchy](concepts/resources/hierarchy)                 | Information on resource hierarchy in Guardrails                |
| [Smart Folders](concepts/resources/smart-folders)         | The new and improved way to group resources and policies       |
| [Types & Categories](concepts/resources/types-categories) | Information on properties and categorization of resource types |
| [Discovery](concepts/resources/discovery)                 | Guardrails and resource discovery                              |

<div className="example">
  <ul>
    <li><code>AWS > Region</code></li>
    <li><code>AWS > Account</code></li>
    <li><code>AWS > S3 > Bucket</code></li>
    <li><code>Azure > SQL > Database</code></li>
    <li><code>GCP > Compute > Instance</code></li>
  </ul>
</div>
