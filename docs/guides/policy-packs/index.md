---
title: Policy Packs
sidebar_label: Policy Packs
---

# Policy Packs

Policy Packs (previously name Smart Folders) allow administrators to create a set of policies and then attach them to specific resources, such as an AWS account, existing folder, or an individual resource

[Policy packs](concepts/resources/policy-packs) allow administrators to create
a set of policies and then attach them to specific resources, such as an AWS
account, existing folder, or an individual resource. Administrators can apply a
wide set (or narrow set) of policies across multiple accounts and/ or resources,
which can be extremely time consuming to do manually. Creation, renaming, and
deleting a policy pack are going to be equivalent to a regular Guardrails folder,
but policy packs also have the ability to be **Attached** to one or many
resources. A policy pack cannot be attached to any resource that is above it in
the Guardrails hierarchy.

### Attach a Policy Pack to a Resource

1. Navigate to the target folder or resource in the Resource tab.
2. When you get there, click on the **Detail** tab.
3. In the Policy Pack module on the right, click **Manage**.
4. Click "Add" then select your policy pack.

### Detach a Policy Pack from a Resource

1. Similar to attaching a policy pack, navigate to the resource that the policy
   pack is attached to.

2. Click the **Details** tab.

3. Click **Manage** towards the bottom right of the page.

4. The **Edit policy pack attachments** pop up overlay will appear and show the
   policy packs that are currently attached to the resource. To the right of
   the policy pack name that is being detached, click the **X** icon.

5. Click **Save** to confirm the policy pack detachment.

**Tip**: The order of policy pack attachments matters. Guardrails resolves policies
by starting at the resource and ascending the resource hierarchy towards the
root. The closest policy setting to the resource, "wins". If the same policy is
set several times in policy packs all attached to a given resource, then the
policy set in the policy pack attached "lowest" will be the effective policy
value.

If no policies are set, then the default policy value is used. The "Enterprise
Enforcements" and "Enterprise Checks" policy packs are intentionally indented
to indicate their presence in the folder hierarchy. The check-mod policies in
"Enterprise Checks" are set lower because we are not yet ready for enforcements.

**Note**:Policy packattachments and detachments is a heavy database operation
if the policy pack is attached to many resources or if it contains many
policies (or both!). It is important to be mindful when doing large Policy pack
policy or attachment changes.

### Create a Policy Setting on a Policy Pack

1. Navigate to the **Policies** tab and click the relevantPolicy packon the
   right side.
2. Click the green **New Policy Setting** button
3. [Create a policy setting](concepts/policies/values-settings#policy-settings).
   For example, type in `aws s3 enabled` in the **Policy Type** field and select
   the policy `AWS > S3 > Enabled` in the dropdown menu.
4. The resource is already defined - it is the selected Policy pack.
5. Select a setting then click **Create**.
6. Congrats! You now how a policy that is contained within a Policy pack. This
   can be subsequently attached to a resource.
