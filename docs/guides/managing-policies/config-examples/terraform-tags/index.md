---
title: Tagging with Terraform
sidebar_label: Tagging with Terraform
---

# Setting Tagging Policies at Scale with Terraform

Organizations will often have thousands of resources across all cloud
environments. A simple way to categorize a wide range of resources is using
tags, but in these larger environments, consistent tagging can become difficult
to enforce and maintain. Guardrails provides a straight forward solution to wide
scale tagging. Using calculated policies, administrators can query every
resource under Guardrails management for existing tags. These tags are then
policy template.
evaluated by Guardrails and modified, removed, or added as defined in the calculated

In this example, we will use terraform to deploy a set of policies that will
apply a defined set of tags to every resource in Azure under Guardrails management.
Note that while this example will show one way to accomplish Azure resource
tagging, this control objective can be applied in a variety of different ways,
depending on organizational processes and requirements.

<div className="alert alert-info">
  This example, along with many others, can be found in the <a href="https://github.com/turbot/guardrails-samples" target="_blank">Guardrails Samples Repo</a>
</div>

## Objective

Create a set of default tags that must exist on every Azure resource. If the tag
does not exist, Guardrails will create them with a default value pulled from the
enclosing Guardrails folder. If said folder does not have a default value, the
resource will be tagged with `"__Missing Tag__"`.

If you have not configured Terraform, head on over to the
[Terraform Setup](reference/terraform/setup) page.

## Create Policy Mapping

Working with a single resource type is trivial, but in the real world,
administrators will need to manage hundreds of resource types at once. A mapping
of cloud resources to Guardrails resources allows us to manage every desired
resource type from a single configuration file.

Start with a simple mapping of the services and resources that should be under
Guardrails tagging management. To do this, create a `terraform.tfvars` file in the
working directory, then paste the following code.

### Tagging Policy Map

For each line, the Azure service is defined as a variable, then assigned a value
that corresponds to the policy type responsible for tagging the specific
resource type. The value is whats known as the `Policy URI`. The URI for any
existing policy type, as well as control and resource types, can be found by
searching for the specific mod on the [Mods page](mods). This formatting allows
us to pass in key/ value pairs to the main.tf file.

```hcl
## Mapping of resource name to resource tag policy
policy_map  = {
    azure-aks-managed-cluster                       = "tmod:@turbot/azure-aks#/policy/types/managedClusterTags"
    azure-apimanagement-service                     = "tmod:@turbot/azure-apimanagement#/policy/types/apiManagementServiceTags"
    azure-application-gateway                       = "tmod:@turbot/azure-applicationgateway#/policy/types/applicationGatewayTags"
    azure-application-insights-insight              = "tmod:@turbot/azure-applicationinsights#/policy/types/applicationInsightTags"
    azure-compute-availability-set                  = "tmod:@turbot/azure-compute#/policy/types/availabilitySetTags"
    azure-compute-disk                              = "tmod:@turbot/azure-compute#/policy/types/diskTags"
    azure-compute-disk-encryption-set               = "tmod:@turbot/azure-compute#/policy/types/diskEncryptionSetTags"
    azure-compute-image                             = "tmod:@turbot/azure-compute#/policy/types/imageTags"
    azure-compute-snapshot                          = "tmod:@turbot/azure-compute#/policy/types/snapshotTags"
    azure-compute-virtual-machine                   = "tmod:@turbot/azure-compute#/policy/types/virtualMachineTags"
    azure-cosmosdb-database                         = "tmod:@turbot/azure-cosmosdb#/policy/types/databaseAccountTags"
    azure-databricks-workspace                      = "tmod:@turbot/azure-databricks#/policy/types/databricksWorkspaceTags"
    azure-datafactory-factory                       = "tmod:@turbot/azure-datafactory#/policy/types/factoryTags"
    azure-dns-record-set                            = "tmod:@turbot/azure-dns#/policy/types/recordSetTags"
    azure-dns-zone                                  = "tmod:@turbot/azure-dns#/policy/types/zoneTags"
    azure-firewall                                  = "tmod:@turbot/azure-firewall#/policy/types/firewallTags"
    azure-keyvault-vault                            = "tmod:@turbot/azure-keyvault#/policy/types/vaultTags"
    azure-loadbalancer                              = "tmod:@turbot/azure-loadbalancer#/policy/types/loadBalancerTags"
    azure-mysql-server                              = "tmod:@turbot/azure-mysql#/policy/types/serverTags"
    azure-network-application-security-group        = "tmod:@turbot/azure-network#/policy/types/applicationSecurityGroupTags"
    azure-network-network-interface                 = "tmod:@turbot/azure-network#/policy/types/networkInterfaceTags"
    azure-network-network-security-groups           = "tmod:@turbot/azure-network#/policy/types/networkSecurityGroupTags"
    azure-network-public-ip-address                 = "tmod:@turbot/azure-network#/policy/types/publicIpAddressTags"
    azure-network-route-table                       = "tmod:@turbot/azure-network#/policy/types/routeTableTags"
    azure-network-virtual-network                   = "tmod:@turbot/azure-network#/policy/types/virtualNetworkTags"
    azure-networkwatcher                            = "tmod:@turbot/azure-networkwatcher#/policy/types/networkWatcherTags"
    azure-postgresql-server                         = "tmod:@turbot/azure-postgresql#/policy/types/serverTags"
    azure-recoveryservice-vault                     = "tmod:@turbot/azure-recoveryservice#/policy/types/vaultTags"
    azure-resourcegroup                             = "tmod:@turbot/azure#/policy/types/resourceGroupTags"
    azure-searchmanagement-search-service           = "tmod:@turbot/azure-searchmanagement#/policy/types/searchServiceTags"
    azure-sql-database                              = "tmod:@turbot/azure-sql#/policy/types/databaseTags"
    azure-sql-elastic-pool                          = "tmod:@turbot/azure-sql#/policy/types/elasticPoolTags"
    azure-sql-server                                = "tmod:@turbot/azure-sql#/policy/types/serverTags"
    azure-storage-storage-account                   = "tmod:@turbot/azure-storage#/policy/types/storageAccountTags"
    azure-synapseanalytics-sql-pool                 = "tmod:@turbot/azure-synapseanalytics#/policy/types/sqlPoolTags"
    azure-synapseanalytics-workspace                = "tmod:@turbot/azure-synapseanalytics#/policy/types/synapseWorkspaceTags"
}
```

<div class = "alert alert-info">
Keep in mind that this list (and all following lists) can and should be modified and reviewed prior to executing `terraform apply`. As with everything when automating management of cloud resources, double and triple check to verify that everything is correct!
</div>

### Azure > {Service} > {Resource} > Tags Policy Map

The tagging policy map defines the policy type URI, but does not define what
that policy is actually set to. In order to map policy values, another block of
code is necessary. The same Azure service keys can be used in the tags policy
map. However, rather than setting the value to the URI of the policy, it can be
set to the desired value that the policy should be set to. Once again, available
settings can be found by searching for the specific mod on the
[Mods page](mods).

```hcl
## Set which Azure resources need to be tagged
## Acceptable Values:
##   'Skip'
##   'Check: Tags are correct'
##   'Enforce: Set tags'
resource_tags = {
    azure-aks-managed-cluster                       = "Check: Tags are correct"
    azure-apimanagement-service                     = "Check: Tags are correct"
    azure-application-gateway                       = "Check: Tags are correct"
    azure-application-insights-insight              = "Check: Tags are correct"
    azure-compute-availability-set                  = "Check: Tags are correct"
    azure-compute-disk                              = "Check: Tags are correct"
    azure-compute-disk-encryption-set               = "Check: Tags are correct"
    azure-compute-image                             = "Check: Tags are correct"
    azure-compute-snapshot                          = "Check: Tags are correct"
    azure-compute-virtual-machine                   = "Check: Tags are correct"
    azure-cosmosdb-database                         = "Check: Tags are correct"
    azure-databricks-workspace                      = "Check: Tags are correct"
    azure-datafactory-factory                       = "Check: Tags are correct"
    azure-dns-record-set                            = "Check: Tags are correct"
    azure-dns-zone                                  = "Check: Tags are correct"
    azure-firewall                                  = "Check: Tags are correct"
    azure-keyvault-vault                            = "Check: Tags are correct"
    azure-loadbalancer                              = "Check: Tags are correct"
    azure-mysql-server                              = "Check: Tags are correct"
    azure-network-application-security-group        = "Check: Tags are correct"
    azure-network-network-interface                 = "Check: Tags are correct"
    azure-network-network-security-groups           = "Check: Tags are correct"
    azure-network-public-ip-address                 = "Check: Tags are correct"
    azure-network-route-table                       = "Check: Tags are correct"
    azure-network-virtual-network                   = "Check: Tags are correct"
    azure-networkwatcher                            = "Check: Tags are correct"
    azure-postgresql-server                         = "Check: Tags are correct"
    azure-recoveryservice-vault                     = "Check: Tags are correct"
    azure-resourcegroup                             = "Check: Tags are correct"
    azure-searchmanagement-search-service           = "Check: Tags are correct"
    azure-sql-database                              = "Check: Tags are correct"
    azure-sql-elastic-pool                          = "Check: Tags are correct"
    azure-sql-server                                = "Check: Tags are correct"
    azure-storage-storage-account                   = "Check: Tags are correct"
    azure-synapseanalytics-sql-pool                 = "Check: Tags are correct"
    azure-synapseanalytics-workspace                = "Check: Tags are correct"
}
```

### Tagging Template Policy Map

So far we have mapped Azure service names to the policy type URI responsible for
enforcing tags, as well as mapping the policy value `Check: Tags are correct`.
However, those policies do NOT give the option of what to set tags to. To do
that, it is necessary to also map the policy type `Tagging Template` for each
desired service in Azure. This generates a very similar structure of code. Copy
and paste this block in the same file that has the Enablement mapping.

```hcl
## Mapping of resource name to resource tag policy template
policy_map_template  = {
    azure-aks-managed-cluster                       = "tmod:@turbot/azure-aks#/policy/types/managedClusterTagsTemplate"
    azure-apimanagement-service                     = "tmod:@turbot/azure-apimanagement#/policy/types/apiManagementServiceTagsTemplate"
    azure-application-gateway                       = "tmod:@turbot/azure-applicationgateway#/policy/types/applicationGatewayTagsTemplate"
    azure-application-insights-insight              = "tmod:@turbot/azure-applicationinsights#/policy/types/applicationInsightTagsTemplate"
    azure-compute-availability-set                  = "tmod:@turbot/azure-compute#/policy/types/availabilitySetTagsTemplate"
    azure-compute-disk                              = "tmod:@turbot/azure-compute#/policy/types/diskTagsTemplate"
    azure-compute-disk-encryption-set               = "tmod:@turbot/azure-compute#/policy/types/diskEncryptionSetTagsTemplate"
    azure-compute-image                             = "tmod:@turbot/azure-compute#/policy/types/imageTagsTemplate"
    azure-compute-snapshot                          = "tmod:@turbot/azure-compute#/policy/types/snapshotTagsTemplate"
    azure-compute-virtual-machine                   = "tmod:@turbot/azure-compute#/policy/types/virtualMachineTagsTemplate"
    azure-cosmosdb-database                         = "tmod:@turbot/azure-cosmosdb#/policy/types/databaseAccountTagsTemplate"
    azure-databricks-workspace                      = "tmod:@turbot/azure-databricks#/policy/types/databricksWorkspaceTagsTemplate"
    azure-datafactory-factory                       = "tmod:@turbot/azure-datafactory#/policy/types/factoryTagsTemplate"
    azure-dns-record-set                            = "tmod:@turbot/azure-dns#/policy/types/recordSetTagsTemplate"
    azure-dns-zone                                  = "tmod:@turbot/azure-dns#/policy/types/zoneTagsTemplate"
    azure-firewall                                  = "tmod:@turbot/azure-firewall#/policy/types/firewallTagsTemplate"
    azure-keyvault-vault                            = "tmod:@turbot/azure-keyvault#/policy/types/vaultTagsTemplate"
    azure-loadbalancer                              = "tmod:@turbot/azure-loadbalancer#/policy/types/loadBalancerTagsTemplate"
    azure-mysql-server                              = "tmod:@turbot/azure-mysql#/policy/types/serverTagsTemplate"
    azure-network-application-security-group        = "tmod:@turbot/azure-network#/policy/types/applicationSecurityGroupTagsTemplate"
    azure-network-network-interface                 = "tmod:@turbot/azure-network#/policy/types/networkInterfaceTagsTemplate"
    azure-network-network-security-groups           = "tmod:@turbot/azure-network#/policy/types/networkSecurityGroupTagsTemplate"
    azure-network-public-ip-address                 = "tmod:@turbot/azure-network#/policy/types/publicIpAddressTagsTemplate"
    azure-network-route-table                       = "tmod:@turbot/azure-network#/policy/types/routeTableTagsTemplate"
    azure-network-virtual-network                   = "tmod:@turbot/azure-network#/policy/types/virtualNetworkTagsTemplate"
    azure-networkwatcher                            = "tmod:@turbot/azure-networkwatcher#/policy/types/networkWatcherTagsTemplate"
    azure-postgresql-server                         = "tmod:@turbot/azure-postgresql#/policy/types/serverTagsTemplate"
    azure-recoveryservice-vault                     = "tmod:@turbot/azure-recoveryservice#/policy/types/vaultTagsTemplate"
    azure-resourcegroup                             = "tmod:@turbot/azure#/policy/types/resourceGroupTagsTemplate"
    azure-searchmanagement-search-service           = "tmod:@turbot/azure-searchmanagement#/policy/types/searchServiceTagsTemplate"
    azure-sql-database                              = "tmod:@turbot/azure-sql#/policy/types/databaseTagsTemplate"
    azure-sql-elastic-pool                          = "tmod:@turbot/azure-sql#/policy/types/elasticPoolTagsTemplate"
    azure-sql-server                                = "tmod:@turbot/azure-sql#/policy/types/serverTagsTemplate"
    azure-storage-storage-account                   = "tmod:@turbot/azure-storage#/policy/types/storageAccountTagsTemplate"
    azure-synapseanalytics-sql-pool                 = "tmod:@turbot/azure-synapseanalytics#/policy/types/sqlPoolTagsTemplate"
    azure-synapseanalytics-workspace                = "tmod:@turbot/azure-synapseanalytics#/policy/types/synapseWorkspaceTagsTemplate"
}
```

Note the subtle difference between the code in the Enablement map versus the
Template map. The URI in each example references a specific policy type. In this
particular case, the policy types are co-dependent on one another. Configuring a
tagging template means nothing if enforcement is not checked or applied.
Similarly, enforcing tags will do nothing if there is no template to apply.

## Required Tags

Once the above mappings are correct, it is time to define what the tags should
actually be. This can be done with a simple array in the tfvars file. One
example is shown below:

```hcl
# These tags must exist
required_tags = [
    "Owner",
    "Contact",
    "Cost Center",
    "Project ID",
    "Department",
]
```

This can be modified to fit the tagging objectives of the organization.

## Create Tag Policy and Tag Template

So far, a file called terraform.tfvars should exist in the working directory
containing the mapping of Azure services to specific Guardrails policy types and
values. The next step is to provide Guardrails with logic to evaluate tags on Azure
resources. Check out the
[Official Turbot Guardrails Provider Documentation](https://registry.terraform.io/providers/turbot/turbot/latest/docs)
as a reference for accepted resources and data sources. Start by creating a new
file called `azure_tagging.tf` in the same directory containing the tfvars file.

### Set Tag Policy for Each Resource Type

The first step is to create a policy setting for the policy type
`Azure > {Service} > {Resource} > Tags`. Terraform provides a trivial way to do
so:

```hcl
## Sets tagging policy for each resource type in the resource_tags map.
resource "turbot_policy_setting" "set_resource_tag_policies" {
  for_each = var.resource_tags
  resource = turbot_smart_folder.azure_tagging.id
  type     = var.policy_map[each.key]
  value    = each.value
}
```

The resource
[turbot_policy_setting](https://registry.terraform.io/providers/turbot/turbot/latest/docs/resources/policy_setting)
is created for each key that exists in the policy mapping that was created
earlier. Paste this code in the `azure_tagging.tf` file.

### Set Tag Template

Enter calculated policies. Leveraging calculated policies within tagging
template policy types allows administrators to apply complex logic to a wide
range of resources, automatically. These contain two parts: the **Query** and
**Template**.

To start, add the Guardrails policy setting resource to the file with the following
code:

```hcl
resource "turbot_policy_setting" "default_tag_template" {
  for_each = var.resource_tags
  resource = turbot_smart_folder.azure_tagging.id
  type     = var.policy_map_template[each.key]
```

#### Query

A query in a calculated policy returns metadata of a resource. It is possible to
query multiple resource types in the same calculated policy. In our example, we
want to query the Guardrails folder containing the Azure resources for tags, the
current tags on the underlying resource (say, `Azure > Compute > Disk`), the
creation timestamp, and the user who created said resource.

Simply drop this query into the `azure_tagging.tf` file within the
default_tag_template code block. Note that spacing is very important!
Inconsistent leading spaces can cause potential issues when applying the
terraform plan.

```hcl
  # GraphQL to pull policy Statements
  template_input = <<-QUERY
  {
    folder {
      turbot {
        tags
      }
    }
    resource {
      turbot {
        title
        tags
      }
    creator: history(filter: "sort:version_id limit:1") {
        items {
          actor {
            identity {
              turbot {
                title
              }
            }
          }
          turbot {
            createTimestamp
          }
        }
      }
    }
  }
    QUERY
```

#### Template

Calculated policies accept
[Nunjucks templates](https://mozilla.github.io/nunjucks/templating.html) as a
way to evaluate the query in the previous step. As with the query, spacing is
important in the terraform file.

```hcl
  template = <<-TEMPLATE
  # Create a variable that will be used as the missing tag value
  {%- set missingTag = "__MissingTag__" -%}
  # Pull in the variable required tags from the terraform.tfvars file. Iterate through the list, creating an array of required tags
  {%- set required_tags = ${jsonencode([for tag_name in var.required_tags : tag_name])} -%}
  # If a resource has a required tag, Guardrails will accept the tag. Otherwise, Guardrails will tag with the Folder tag value.
  {%- for tag_name in required_tags %}
    # Keep the existing tag if it is defined as a required tag
    {%- if tag_name in $.resource.turbot.tags %}
  {{tag_name}}: {{$.resource.turbot.tags[tag_name]}}
    # If the tag does not exist on the specific Azure resource, use the tag that exists on the Guardrails Folder
    {%- elif tag_name in $.folder.turbot.tags %}
  {{tag_name}}: {{$.folder.turbot.tags[tag_name]}}
    # If the tag does not exist on the Azure resource or Guardrails folder, create the tag, with the value "__MissingTag__"
    {%- else %}
  {{tag_name}}: {{missingTag}}
    {%- endif %}
  {%- endfor %}
  # Bring in environment metadata / attributes. This is in addition to the already required tags.
  Name: "{{ $.resource.turbot.title }}"
  # Enforce selection of values, set to "Non-Compliant" if out of bounds
  Environment: "{% if $.resource.turbot.tags['Environment'] in ['Dev', 'QA', 'Prod', 'Temp'] %}{{ $.resource.turbot.tags['Environment'] }}{% else %}Non-Compliant Tag{% endif %}"
  # Actor who created the resource
  CreatedByActor: "{{ $.resource.creator.items[0].actor.identity.turbot.title }}"
  # Creation Timestamp
  CreatedByTime: "{{ $.resource.creator.items[0].turbot.createTimestamp }}"
    TEMPLATE
}
```

The query and template code block will need to be within the
turbot_policy_setting resource that was defined at the beginning of this
section.

## Putting Everything Together

So far, we have mapped Azure services to Guardrails policy URI, defined a list of
required tags, and defined a terraform block that will create the necessary
policies, including a calculated policy. The final step is then to create a
"home" for all of the policies.
[Turbot Smart Folders](guides/working-with-folders/policy-pack) allow admins to create
a large set of policies that can be applied to various resources on the fly.
Like everything else in this guide, a smart folder can be defined within a
terraform file. Along with this definition, we will also add a variable called
`turbot_profile` that can be used to define the appropriate profile to
authenticate to the workspace, a definition for the Terraform Turbot Guardrails provider,
as well as variable descriptions.

Create a new file in the current working directory called `main.tf`. Simply drop
the following code into the file.

```hcl
variable "turbot_profile" {
  description = "Enter profile matching your turbot guardrails cli credentials."
}

provider "turbot" {
  profile = var.turbot_profile
}

# Create Smart Folder at the Turbot level
resource "turbot_smart_folder" "azure_tagging" {
  parent = "tmod:@turbot/turbot#/"
  title  = "SF - Azure Tagging Policies"
}

# Vars to Map resources to tag
variable "resource_tags" {
  description = "Map of the list of resources that need to be tagged. please update in terraform.tfvars:"
  type        = map
}

variable "policy_map" {
  description = "This is a map of Guardrails policy types to service names. You probably should not modify this:"
  type        = map
}

variable "policy_map_template" {
  description = "This is a map of Guardrails tag template policy types to service names. You probably should not modify this:"
  type        = map
}

variable "required_tags" {
  description = "This is a list of tag names that must exist on all resources."
  type        = list(string)
}
```

<div class = "alert alert-info">
If using the default Turbot Guardrails CLI profile, the variable turbot_profile can be omitted.
</div>

## Terraform Apply

Save all open files, then using the terminal of choice, navigate to the working
directory. If the provider has not yet been initialized, use the following
command

```bash
$ terraform init
```

If successful, the response

```bash
Terraform has been successfully initialized!
```

will be displayed in the terminal. If there are errors, ensure that the folder
has the appropriate permissions to run the executable as well as verifying the
workspace credentials.

Once the initialization is complete, type `terraform plan`. This will generate
an output of the expected resource creation and changes. Review the changes to
ensure everything is correct, then continue with a `terraform apply`. Type `yes`
when prompted, and watch as 50+ unique policies (depending on the number of
services defined in the mapping) are created within a smart folder at the Turbot
resource level. Verify that the smart folder exists by navigating to the Turbot
level in the UI.

It is possible to attach the smart folder to various resources within the Guardrails
UI, but attachment can also be defined within the Terraform file using the
resource
[turbot_smart_folder_attachment](https://registry.terraform.io/providers/turbot/turbot/latest/docs/resources/smart_folder_attachment).
Simply add that resource to the main.tf file to automatically attach the newly
created smart folder to various resources.
