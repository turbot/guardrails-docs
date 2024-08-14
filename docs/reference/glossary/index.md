---
title: Glossary
sidebar_label: Glossary of Terms
---

# Glossary

**Account:** Represents a cloud account, such as an AWS Account, Azure Subscription, or GCP Project, within Turbot Guardrails. Accounts are tracked as Resources that can have attached Policies.

  **Action:** A runnable process that can be executed by a Control or another Action. Actions are triggered based on Policy Settings and Resource states. The list of available Actions is continually updated based on customer feedback, allowing for the addition of new Actions over time.

**AKA (Also Known As):** A human-readable identifier for a cloud resource, AKA formats vary by provider and service. AWS resources have an ARN that is used as an AKA. Guardrails Resource ids are also AKAs.

**Alert:** An automated message from Guardrails when a Policy violation or significant event occurs. Appears in the Guardrails console. Can also be configured to notify users via email, Slack, Microsoft Teams, or HTTP endpoints.

**Calculated Policy:** Makes Policy Settings [contextually aware](/guardrails/docs/concepts/policies/calculated-faq#what-is-a-calculated-policy) by sourcing CMDB data, using an GraphQL query, and transforming it with a Nunjucks template that outputs a Resource-specific Policy Value. Any Policy Setting can be calculated.

**CMDB:** The Configuration Management Database (CMDB) stores detailed information about Resources and their configurations. It serves as the primary data source for Calculated Policies, enabling dynamic and context-aware Policy Settings.

**Collective:** The [networking and compute components](/guardrails/docs/enterprise/architecture#collectives) that will be shared by all workspaces in a Guardrails Enterprise installation. Collectives are deployed and managed via the Guardrails Enterprise Foundation (TEF) product in the AWS Service Catalog.

**Control:** An [executable](/guardrails/docs/concepts/controls) that evaluates assertions made by Policy Values for a given Resource. If differences are found, it can take Actions as dictated by those Policy Values. May depend on one or more Policy Values to fully define behaviour. Controls are specific to Resource Types. Controls can be in these states, such as `OK`, `Alarm`, `Error`, `Invalid`, `Skipped`, or `To Be Determined` (`TBD`). They are categorized into Control Types and Control Categories for better organization and reporting.

**Control Category:** A vendor-agnostic [categorizatio](/guardrails/docs/concepts/controls#control-categories)of Resource Types.

**Control Objective:** A [business need](/guardrails/docs/guides/managing-policies/config-examples#control-objectives) that requires specific configurations or Policies to be enforced across cloud resources. It represents a high-level goal that ensures compliance, security, and operational efficiency. For example, an organization may have a requirement that all cloud storage must be encrypted at rest, or that virtual networks must never be accessible to the public. Often these Control Objectives are written in non-executable Word docs or wikis. Policy Packs can be used to streamline the implementation of Control Objectives.

**Control State:** Represents the [current status](/guardrails/docs/concepts/controls#control-state) of a Control after it has evaluated a Resource against its associated Policies. Control states help administrators understand the compliance and operational status of their cloud resources. The possible Control states are:

- **OK:** The Resource is compliant with the Policy Settings. This is the desired state.

- **Alarm:** The Resource is non-compliant, and administrative review or action is required.

- **Error:** The Control encountered an issue, such as insufficient permissions, preventing it from enforcing the Policy.

- **Invalid:** The Control cannot evaluate the resource due to misconfigured or missing Policies.

- **Skipped:** The Resource is intentionally not evaluated by the Control.

- **TBD (to be determined):** The Control is waiting for Policy calculations to complete. Controls start in this state.

**Control Type:** A [blueprint](/guardrails/docs/concepts/controls#control-state) for a specific Control that can be configured for Resources. Control Types are associated with Policy Types and are used to enforce specific Policies on cloud resources. They are organized hierarchically and categorized into categories for better organization and reporting.  Examples include `AWS > S3 > Bucket > Approved` and `GCP > Compute > Disk > Encryption at Rest`.

**Directive:** A specific instruction within a Policy Setting that dictates how a Control should evaluate and optionally act on Resources. Examples include `Skip`, `Check`, and `Enforce`.

**Grant:** A permission assignment that enables a user or group to perform specific Actions on a Resource. Grants define the level of access (e.g., `read-only`, `operator`, `admin`) and can be scoped to various Resource levels such as Accounts, Folders, or individual Resources. Grants can be configured to be active immediately, or may require activation by the user.

**Grant Activation:** Permissions can be granted but not active. This allows a user to elevate their privileges for a limited time as needed. Functions similarly to the Linux ‘sudo’ command.

**Event Handler:** The [collection of infrastructure](/guardrails/docs/integrations/azure/real-time-events/event-handlers) deployed into a cloud account to gather events as they occur and forward them to Guardrails for processing. Event Handlers use a push-based mechanism for real-time event processing. For ease of configuration, Event Polling can be used as an alternative to Event Handlers.

**Event Polling:** A pull-based mechanism. In Event Polling mode, Guardrails periodically queries the cloud provider's event logs to retrieve the latest events. Event Polling is easier to set up than Event Handlers, but is slower and entails higher API usage.

**Event Router:** An Action that receives events from a cloud provider (usually via an Event Handler stack), then takes the appropriate action such as creating or updating a cloud resource record.

**File:** A Resource that holds a JSON document containing reference data. Used frequently in Calculated Policies.

**Folder:** A [logical grouping](/guardrails/docs/concepts/resources/hierarchy#folders) of Resources. Folders help organize Resources and can have Policies attached to them that are inherited by the Resources within the Folder.

**GraphQL:** The [native query language](/guardrails/docs/reference/graphql#graphql) for the Guardrails API.

**GraphQL API:** The API provided by Guardrails that enables users to perform Actions programmatically using GraphQL queries and mutations.

**Guardrail:** A Policy-driven control mechanism that ensures Resources within cloud environments adhere to organizational standards and compliance requirements. Automates the enforcement of best practices, security policies, and operational guidelines across various cloud services. The key components of a Guardrail are Controls and Policy Settings.

**Guardrails Console:** The user interface (UI) of Guardrails. Enables users to adust Policy Settings, manage Resources, and view Alerts. The console is the visible representation of a Workspace.

**Guardrails Hub:** The [central repository](https://hub.guardrails.turbot.com/) for Mods and Policy Packs.

**Hierarchy:** The structured arrangement of Resources, Folders, and Policies within a Workspace. It includes:

- **Resource Hierarchy:** Organizes Resources into a [multi-level structure](/guardrails/docs/concepts/resources/hierarchy) with Turbot Root at the top, followed by Folders and individual Resources.

- **Policy Hierarchy:** Policies set at higher levels are inherited by lower levels, ensuring consistent enforcement. This [hierarchical structure](/guardrails/docs/concepts/policies/hierarchy) enables efficient management, reporting, and enforcement across different organizational levels.

**Hive:** Often referred to as the Turbot Guardrails Database. The [physical data storage and caching resources](/guardrails/docs/enterprise/architecture#hives) used in Turbot Guardrails Enterprise. Hives are deployed and managed via the Turbot Guardrails Enterprise Database (TED) product in the AWS Service Catalog.

**Mod:** A [package](https://hub.guardrails.turbot.com/#mods) of all the Resource, Policy and Control types related to a single cloud platform service. Installing the Mod for a cloud service (e.g. `aws-s3`) installs Controls and starts the discovery process for all Resource types described in the Mod.

**Notifications:** The delivery mechanism for Alerts and other important messages to users or systems outside the Guardrails console. Notifications can be sent via  email, Slack, Microsoft Teams, or HTTP endpoints.

**Permissions:** A [mechanism](/guardrails/docs/concepts/iam/permissions#permissions) to govern the Actions that users or groups can perform on Resources. They are managed using Policies and can be granted at various levels, such as Account, Folder, or Resource. Permissions ensure that users have the appropriate access to perform their roles while maintaining security and compliance. Note that permissions in connected systems (e.g., AWS) are governed by mechanisms such as cross-role trust and IAM policies.

**Permission levels:** Predefined [sets of Permissions](/guardrails/docs/concepts/iam/permissions#permissions) that can be assigned to users or groups. Each level encompasses a specific scope of Actions, ranging from read-only access to full administrative control.

**Policy:** A [declaration](/guardrails/docs/concepts/policies) of the desired state or behavior of a resource. Policies are used to enforce compliance, manage configurations, and ensure security across cloud environments. They are implemented by means of Policy Settings, Policy Values, and Policy Types. Policies can be static or calculated based on real-time data and context.

**Policy Exception:** A mechanism to override a required Policy Setting on a Resource at a lower level in the Policy Hierarchy. Exceptions can be implemented using static or calculated Policy Settings.

**Policy Pack:** A group of [related Policies](https://hub.guardrails.turbot.com/policy-packs) that can attach to Resources in the Hierarchy. Discoverable in the Guardrails Hub, installable via Terraform. Formerly called Smart Folder.

**Policy Setting:** An [assertion about desired state or behavior](/guardrails/docs/concepts/policies/values-settings#policy-settings) of a Control. A Policy Setting is an instance of a Policy Type. A Policy Settings is created and managed by a person (versus a Policy Value which is created and managed by Guardrails). The three kinds of Actions dictated by a Policy Setting are:

- **Skip:** Tells Guardrails that a particular Control should not be evaluated for a Resource, and no Action taken. When a policy is set to `skip` it instructs Guardrails to ignore the Control for that Resource.

- **Check:** Tells Guardrails to evaluate a Resource against a specific condition without enforcing any changes. Example values include `Check: Enabled` or `Check: Disabled`.

- **Enforce:** Tells Guardrails to ensure that a Resource complies with a specified condition. Example values include `Enforce: Enabled` or `Enforce: Disabled`.

**Policy Type:** Defines values that can be used to [dictate the behavior of a Control](/guardrails/docs/concepts/policies/types-categories#policy-types). Each Policy Type is specific to a Resource Type and Control Type. For example, the `AWS > S3 > Bucket > Approved` Policy Type is specific to `AWS > S3 > Bucket` Rsources and the `AWS > S3 > Bucket > Approved` Control.

**Policy Value:** The [effective Policy Setting](/guardrails/docs/concepts/policies/values-settings#policy-values) for a given Resource. The value is dictated by a Policy Setting somewhere in the Resource Hierarchy above the Resource. A Policy Value is created and managed automatically by Guardrails (versus a Policy Setting which is created and managed by a person.)

**Policy Taxonomy:** The [structured classification](https://turbot.com/guardrails/docs/concepts/policies/taxonomy) of Policies within Turbot Guardrails. It organizes Policies into categories and hierarchies, making it easier to manage and apply them across various Resources. The taxonomy includes different types of Policies such as Simple, Compound, and Calculated, each serving specific purposes. Policies are grouped by Resource Types and Control Objectives to ensure consistent enforcement and reporting.

- **Simple Policy:** Used when a single Policy Setting is sufficient to define a Control's behavior. For example, you want to ensure all S3 buckets are versioned. Search for the Policy Type `AWS > EC2 > Bucket > Versioning`. Create a new Policy Setting with the value `Enforce: Enabled`.

- **Compound Policy:** Used when two or more Policy Settings are required to fully define a Control's behavior. Suppose you want to ensure that EC2 snapshots older than 90 days will be inactivated. This requires two Policy Settings. First, `AWS > EC2 > Snapshot > Active` which might be set to `Enforce: Delete inactive with 30 days warning`. This defines an Action, but not the criterion for the Action. That requires `AWS > EC2 > Snapshot > Active > Age` which might be set to `Force inactive if age > 90 days`. The two Policy Settings work in concert to achieve the desired effect.

- **Calculated Policy:** See Calculated Policy above.

**Quick Actions:** A [mechanism](/guardrails/docs/guides/quick-actions) that enables users to initiate specific, one-time Control enforcements directly from the Guardrails UI.

**Remediation:** The process of automatically correcting or enforcing the desired state of a Resource based on Policy Settings.

**Resource:** Represents a cloud platform object tracked by the CMDB. A Resource is an instance of a Resource Type. It may have many Policy Values and Controls associated with it. The AWS bucket `my-aws-bucket` is an example of the `AWS > S3 > Bucket` Resource Type.

**Resource Category:** A vendor-agnostic [categorization](/guardrails/docs/concepts/resources/types-categories#resource-categories)of Resource Types.

**Resource Type:** A vendor-agnostic [categorization](/guardrails/docs/concepts/resources/types-categories#resource-types) of Resource Types.

**Stack:** A [set of resources](/guardrails/docs/concepts/guardrails/configured#stacks) managed by Guardrails and defined using Terraform HCL.

**Template:** Primarily written in Jinja2/Nunjucks for calculated policies and notifications, templates support complex logic and data manipulation. Other types of templates include Terraform templates for infrastructure as code and JSON/YAML templates for configurations.

**Turbot Resource:** Acts as a singleton root resource in a Workspace for the Resource and Policy Hierarchies. Policy Settings made here will apply to the entire Resource Hierarchy. Commonly referred to as the Turbot Level of a workspace.

**Turbot Guardrails Enterprise (TE):** The application layer of a Turbot Guardrails Enterprise deployment. Relies on the Turbot Guardrails Database and Foundation products.

**Turbot Guardrails Enterprise Database (TED):**  The database layer of a Turbot Guardrails Enterprise deployment. Creates and manages the Turbot Guardrails database infrastructure (Hive).

**Turbot Guardrails Enterprise Foundation (TEF):** The network and shared compute layer of a Turbot Guardrails Enterprise deployment. Creates and manages the  networking and compute components that will be shared by all workspaces in a Turbot Guardrails Enterprise installation (Collective).

**Valid Values:** Each Policy Type has a specific set of Valid Values that define the possible Actions or states for that policy. These values determine how the Policy is applied and enforced on the targeted Resources. Valid Values are defined in the Policy's JSON schema and can include directives such as `Skip`, `Check`, and `Enforce`.

**Workspace:** An independent tenant within Turbot Guardrails, providing a dedicated environment for managing Permissions, Resources, Policies, and Controls. Provides a graphical frontend, permission boundaries, an API endpoint, and a Resource Gierarchy, Each Workspace has its own schema and Turbot Root, ensuring isolation and customization. Workspaces are typically used to separate different environments, such as development, QA, and production.


