---
title: Policy Packs
sidebar_label: Policy Packs
---

# Policy Packs

[Policy packs](concepts/resources/policy-packs) (previously named Smart Folders) enable administrators to apply one or more policies across multiple accounts and/or resources, thus automating what would otherwise be a time-consuming manual process. You create, delete, and rename a Policy Pack just like a regular Guardrails folder, then *attach* it to the Guardrails hierarchy. The policies it defines govern all resources below that point in the hierarchy.

## Create a Policy Pack

1. Click on the "Policies" link in the top menu bar.
1. Select the large grey "Policy Packs" button.
1. Click on the green "New Policy Pack" button on the right side of the page
1. Give the pack a name, description and a unique aka (if desired).
1. Finish by clicking the green "Create" button


![](/images/docs/guardrails/policies-page.png)

**Tip**: It is most useful to create Policy Packs (and other Guardrails configuration) as code. See [below](#create-a-policy-pack-as-code) for details.

## Attach a Policy Pack to a Resource

1. Navigate to the target folder or resource in the Resource tab.
2. When you get there, click on the **Detail** tab.
3. In the Policy Pack module on the right, click **Manage**.
4. Click "Add" then select your policy pack.

See detailed guide [here](/guides/configuring-guardrails/policy-packs/attach-policy-pack-to-resource)

## Detach a Policy Pack from a Resource

1. Similar to attaching a Policy Pack, navigate to the resource that the Policy
   Pack is attached to.

2. Click the **Details** tab.

3. Click **Manage** towards the bottom right of the page.

4. The **Edit policy pack attachments** pop up overlay will appear and show the
   policy packs that are currently attached to the resource. To the right of
   the policy pack name that is being detached, click the **X** icon.

5. Click **Save** to confirm.

**Tip**: The order of Policy Pack attachments matters. Guardrails resolves policies
by starting at the resource and ascending the resource hierarchy towards the
root. The closest policy setting to the resource wins. If the same policy is
set several times in Policy Packs attached to a given resource, then the
policy set in the lowest attached Policy Pack will be the effective policy
value.

If no policies are set, Guardrails uses the default policy value. The "Enterprise
Enforcements" and "Enterprise Checks" policy packs are intentionally indented
to indicate their presence in the folder hierarchy. The check-mod policies in
"Enterprise Checks" are set lower because we are not yet ready for enforcements.

**Note**: Policy Pack attachments and detachments are heavy database operations
if the Policy Pack is attached to many resources or if it contains many
policies (or both!). It is important to be mindful when doing large policy or attachment changes.

## Create a Policy Setting on an Existing Policy Pack

1. Navigate to the **Policies** tab and click the relevant Policy pack on the
   right side.
2. Click the green **New Policy Setting** button
3. [Create a policy setting](concepts/policies/values-settings#policy-settings).
   For example, type in `aws s3 enabled` in the **Policy Type** field and select
   the policy `AWS > S3 > Enabled` in the dropdown menu.
4. The resource is already defined - it is the selected Policy pack.
5. Select a setting then click **Create**.
6. Congrats! You now how a policy that is contained within a Policy pack. This
   can be subsequently attached to a resource.

## Create a Policy Pack as Code

You can find a growing collection of Terraform-defined Policy Packs in the [Guardrails Hub](https://hub.guardrails.turbot.com/policy-packs). The code for these lives in the [turbot/guardrails-samples](turbot/guardrails-samples) repo in the [policy_packs](https://github.com/turbot/guardrails-samples/tree/main/policy_packs) folder.

Suppose you want to create a Policy Pack to check or enforce the minimum TLS version on an Azure storage account. First clone the repo, and navigate to the `policy_packs/azure/storage` folder. It contains folders for Azure-storage-related policy packs like `enforce_containers_block_public_access`. Create a new folder with an appropriate name, like `enforce_secure_tls_version_for_storage_accounts`, and copy `main.tf`, `policies.tf`, and `providers.tf` from a sibling folder into your new folder.

Navigate to `Azure > Storage > Storage Account > Minimum TLS Version` in the Policies hierarchy, and switch to the `Developers` tab.

![developer tab](/images/docs/guardrails/policy-developer-tab.png)

Adjust `main.tf` for your policy, using the resource label as your AKA.

```tf
resource "turbot_policy_pack" "main" {
  title       = "Enforce Secure TLS Version for Azure Storage Accounts"
  description = "Ensure data is protected by using strong encryption protocols, reducing the risk of vulnerabilities ass
ociated with older TLS versions"
  akas        = ["azure_storage_enforce_secure_tls_version_for_storage_accounts"]
}
```

Adjust `policies.tf` for your new policy, using the Terraform code shown in the console. Ideally, include the full hierarchy path as a comment.

```
# Azure > Storage > Storage Account > Minimum TLS Version
resource "turbot_policy_setting" "azure_storage_account_minimum_tls_version" {
  resource = turbot_policy_pack.main.id
  type     = "tmod:@turbot/azure-storage#/policy/types/storageAccountMinimumTlsVersion"
  value    = "Check: TLS 1.2"
  # Uncomment the following line to enforce the policy
  # value    = "Enforce: TLS 1.2"
}
```

Adjust the `README.md` for your new policy.

If you haven't done so already, [set up your Turbot Guardrails credentials](https://turbot.com/guardrails/docs/reference/cli/installation#set-up-your-turbot-guardrails-credentials). Then use the [Turbot Guardrails Terraform Provider](https://registry.terraform.io/providers/turbot/turbot/latest/docs) to install the Policy Pack.

```
terraform init
terraform plan
terraform apply
```

### Contribute your Policy Pack to the Hub

To make your new Policy Pack available in the Hub, raise a pull request to `turbot/guardrails-samples`.