---
title: Import GCP Organization
sidebar_label: Import GCP Organization
---

# Import a GCP Organization

In this guide, you will:

- Learn how to import an entire Google Cloud Platform (GCP) Organization into Turbot Guardrails. This process allows Guardrails to discover and manage resources across all projects and folders under a single GCP Organization.
- Monitor and troubleshoot the process.

Importing a [GCP Organization](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy#organizations) into Guardrails involves these key steps:

- Configuring a [GCP service account](https://cloud.google.com/iam/docs/service-account-overview) with appropriate permissions at the Organization level.
- Importing the Organization via the Guardrails Console.

## Prerequisites

- Familiarity with GCP Console with admin privileges.
- Access to the Guardrails console with *Turbot/Owner* or *Turbot/Admin* permissions at the Turbot resource level.

## Supported Authentication

Guardrails provides support for *two credential methods* to import a GCP Organization. The supported methods are:

- **Service Account Impersonation**: Grants temporary credentials using the [Service account impersonation](https://cloud.google.com/iam/docs/impersonating-service-accounts).
- **JSON File**: Uses a downloaded JSON key file to authenticate or you can provide *Private key as text* which requires copying and pasting the `private_key` section of the JSON file.

> [!NOTE]
> We recommend `Service Account Impersonation`, as it eliminates the need to download or manage a JSON key, reducing security risks.

## Service Account

For an Organization import in Guardrails, you will:
Create the service account in any single project under your organization. Refer [Prepare a GCP project for import to Guardrails](/guardrails/docs/getting-started/getting-started-gcp/prepare-project)

## Granting Role(s)

> [!NOTE]
> In GCP, service accounts belong to a specific project, even if their permissions apply at the project, folder, or organization level.

To assign the required roles at the `Organization` scope to the service account, follow these steps:

1. Navigate to **IAM & Admin** > **IAM** in the [Google Cloud console](https://console.cloud.google.com).
2. Select your **Organization** from the resource selector.
3. Select **Grant Access**.
4. Enter the **Principal** as `SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com`.
5. Assign the required roles at the organization (or folder) scope as described in [What Permissions to Grant](#what-permissions-to-grant).

Refer to the example below for guidance:

![Service Account with Organization Scope](/images/docs/guardrails/guides/gcp/import-gcp-organization/service-account-with-org-scope.png)

<details>
  <summary>CLI Reference: Create a Service Account and Assign Organization-Level Roles</summary>

```bash
# 1. Create the service account in a specific project
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME --project=PROJECT_ID --description="Service account for Guardrails"

# 2. Assign roles at the organization level
gcloud organizations add-iam-policy-binding ORGANIZATION_ID --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" --role="ROLE_NAME"
```
</details>

## What Permissions to Grant

The permissions you grant to the service account depend on your organization’s security and compliance requirements. The table below outlines the minimum recommendations for organization-wide governance:

| **Permission Level** | **Description**                                                                                                                                                        | **Recommended Role**                                                                                                   |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| **Full Remediation**  | Provides Guardrails with the broadest level of control across your GCP Organization, allowing full governance and policy enforcement.                                | [Organization Administrator](https://cloud.google.com/resource-manager/docs/access-control-org#resourcemanager.organizationAdmin) (`roles/resourcemanager.organizationAdmin`) or equivalent custom roles. |
| **Read-Only**         | Allows Guardrails to perform discovery and track resources but does not enable any remediation actions.                                                            | Viewer roles at the organization level (e.g., `roles/viewer`).                                                        |
| **Folder Viewer**   | Grants read-only access to view metadata and browse resources within a specific GCP folder, without modifying them.                                                                                            | `roles/resourcemanager.folderViewer`.                                                                                 |
| **Organization Viewer**| Allows read-only access to view metadata and monitor all resources at the organization level, enabling oversight without configuration changes.                                                  | [Organization Viewer](https://cloud.google.com/resource-manager/docs/access-control-org#resourcemanager.organizationViewer) `roles/resourcemanager.organizationViewer`.                                                                           |
| **Project Viewer**      | Provides read-only access to view project-level metadata and resources, ensuring visibility without allowing any modifications.                                                                                     | `roles/viewer`.                                                                                                       |

> [!IMPORTANT]
> For importing the organization, you need only `Organization Viewer`, `Project Viewer`, and `Folder Viewer` roles, which will allow discovery of all resources under the organization.

> If Guardrails attempts an action (e.g., enabling APIs, modifying resources) without sufficient permissions, you will encounter `access denied` errors. To resolve this, ensure the required permissions are granted or update the Guardrails policies to align with your organization's requirements.

## Enable Required APIs

Guardrails requires access to the `Cloud Resource Manager` and `Service Management` APIs (at a minimum) to discover and manage organization-wide resources. To enable these APIs, follow the steps below:

- In the [Google Cloud console](https://console.cloud.google.com), navigate to **APIs & Services** for the same GCP project where the service account was created.
- Locate the **Cloud Resource Manager API** and **Service Management API**.
- Select **ENABLE** for each API.

Refer to the example below for guidance:

![Enable API](/images/docs/guardrails/guides/gcp/import-gcp-organization/enable-api.png)

<details>
  <summary>CLI Reference: Enable Required APIs</summary>

```bash
# Enable Cloud Resource Manager for the project where the service account lives
gcloud services enable cloudresourcemanager.googleapis.com --project=PROJECT_ID

# Enable Service Management for the same project
gcloud services enable servicemanagement.googleapis.com --project=PROJECT_ID
```
</details>

## Using Service Account Impersonation

[Service Account Impersonation](https://cloud.google.com/iam/docs/impersonating-service-accounts) grants short-lived credentials to Guardrails, allowing it to act as a specified service account without requiring a JSON key file. This approach reduces the security risk of storing or distributing long-lived credentials.

### Prerequisites for Configuration

- The **impersonating** user or service account i.e. `the identity that runs Guardrails `must have the **Service Account Token Creator** role (`roles/iam.serviceAccountTokenCreator`) on the target service account.

- The **target** service account just created for organization importing purpose i.e. the one being impersonated must have the **required organization-level permissions** as as described in [What Permissions to Grant](#what-permissions-to-grant) to discover or manage resources across your GCP Organization.

> [!NOTE]
> Below CLI command is generated in Guardrails console when you choose `Access Mode` as Service Account Impersonation, provide `Organization ID` and `Client email`.

Refer to the example below for guidance:

![Generate Service Account Impersonation](/images/docs/guardrails/guides/gcp/import-gcp-organization/generate-service-account-impersonation.png)


<details>
  <summary>Example: Assign Service Account Token Creator</summary>

```bash
# Replace SERVICE_ACCOUNT_NAME and PROJECT_ID with your service account's name/project
# Replace IMPERSONATOR_EMAIL with the user or service account that will impersonate it

gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com --member="user:IMPERSONATOR_EMAIL" --role="roles/iam.serviceAccountTokenCreator"
```
</details>

## Using JSON Credential File

- In the [Google Cloud console](https://console.cloud.google.com), navigate to **IAM & Admin** > **Service Accounts**.
- Select the **Project** where your service account resides.
- Locate the service account you created for Guardrails, and select on its **Actions** menu (three dots on the right).
- Select [Manage keys](/guardrails/docs/getting-started/getting-started-gcp/prepare-project#step-7-locate-key-manager).
- Select [Add key and Create new key](/guardrails/docs/getting-started/getting-started-gcp/prepare-project#step-8-add-key)
- Choose **JSON** as the **Key type**, and click **Create**.
- A JSON file will download automatically to your local machine. **Keep this file secure**. E.g. Save this as `key.json`.

<details>
  <summary>Example: Using CLI Command</summary>

```bash
# This command will create a file named "key.json" in your current directory
gcloud iam service-accounts keys create key.json --iam-account=guardrails-sa@my-project.iam.gserviceaccount.com
```

</details>

## Using Private Key

The `private_key` in the `key.json` you generated is the **required secret** to import the GCP organization into a Guardrails workspace. Guardrails requires this key in **multi-line** format, **not** as a single, long string.

For example, after generating your JSON key file (`key.json`), you can extract the private key portion by running:

```bash
cat key.json | jq -r .private_key
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQClvph2e9f6Dl/H
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
<truncated>
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Pwd0PmmSB1U3h3+Ued/eDhw=
-----END PRIVATE KEY-----
```
> [!NOTE]
> You may use one of the option either [Using Using JSON Credential File](#using-json-credential-file) or [Using Private Key](#using-private-key) or [Using Service Account Impersonation](#using-service-account-impersonation)

## Import Organization into Guardrails

Login to your Guardrails workspace console and select the **CONNECT** card.

![Select Connect](/images/docs/guardrails/guides/gcp/import-gcp-organization/select-connect.png)

Select **GCP** then choose **GCP Organization** option.

![Select GCP](/images/docs/guardrails/guides/gcp/import-gcp-organization/select-gcp.png)

Select the `Import location` where to import your organization.

![Choose Import Location](/images/docs/guardrails/guides/gcp/import-gcp-organization/choose-import-location.png)

Choose one of the `Access mode` from the provided list. Here, `Service Account impersonation` is shown as example. Provide the `Organization ID` for your GCP organization and the `Client email`. This email ID will be used by Guardrails to impersonate.

![Provide GCP Org Details](/images/docs/guardrails/guides/gcp/import-gcp-organization/gcp-org-details.png)

Setup impersonation. Select the [**Copy gcloud command**](#prerequisites-for-configuration), provide `External ID label` and select **Connect** to begin the discovery and management process.

![Setup Impersonate](/images/docs/guardrails/guides/gcp/import-gcp-organization/setup-impersonate.png)

 Guardrails will create and run discovery controls for your GCP Organization, scanning each project and resource based on your configured policies.

> [!IMPORTANT]
> This step is only applicable when you choose *Service Account impersonation*

> `External ID label`created for this organization import must be retained in the respective GCP project.

## Ensure Billing is Enabled

If you plan to allow Guardrails to enable new APIs or create resources that may incur charges, ensure that billing is enabled at the **organization** level or for specific projects as required. Refer GCP guide [Manage your Cloud Billing account](https://cloud.google.com/billing/docs/how-to/manage-billing-account).

<!-- 1. Navigate to the **API Console** in the [Google Cloud console](https://console.cloud.google.com).
2. From the project list, select the desired project.
3. Open the left-side menu and select **Billing**.
4. If billing is not enabled, click **Enable Billing**. *(Note: If billing is already enabled, this option will not appear.)*
5. If you don’t have a billing account, create one:
   - Select your location.
   - Complete the billing account setup form.
   - Click **Submit** and **Enable Billing**. -->

## Troubleshooting

| **Issue**                                | **Description**                                                                                                                                                                                                                                      | **Guide**                                                                                                                                                          |
|------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Access Denied: Missing Token Creator Role | If using Service Account Impersonation, the impersonating user or workload must have `roles/iam.serviceAccountTokenCreator` on the service account.                                                                                                 | Refer to the [Service Account Token Creator Role Documentation](https://cloud.google.com/iam/docs/impersonating-service-accounts).                                 |
| Access Denied: Malformed Secret Key  | Guardrails requires the multi-line format of the Secret Key. Ensure it includes the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` headers.                                                                                          |                                                                                                     |
| Access Denied: Improper Client Email | Guardrails cannot use a non-service account email to access the project. Ensure the Client Email is in the form of `{identifier}@{your-project-id}.iam.gserviceaccount.com`.                                                                         | [Check GCP Service Account Documentation](https://cloud.google.com/iam/docs/service-accounts).                                                                                                         |
| Access Denied: Missing or Insufficient Permissions | If Guardrails is asked to discover, track, or remediate resources without the necessary permissions, `access denied` errors will appear in the Discovery and CMDB controls in the Guardrails console. Resolve by granting the required permissions. |                                                                                   |
| Lots of Controls in Error State      | If there were issues with credentials during project import, many Discovery controls may show an `error` state. You can either delete and reimport the project or rerun the controls in `error` using scripts provided in the Guardrails Samples Repo. | Use the [Python](https://github.com/turbot/guardrails-samples/tree/main/api_examples/python/run_controls), [Node](https://github.com/turbot/guardrails-samples/tree/main/guardrails_utilities/python_utils/run_controls_batches), or [Shell](https://github.com/turbot/guardrails-samples/tree/main/guardrails_utilities/shell_utils/run-controls) scripts. |
| GCP Service API Enabled Policies Aren't Set | If the `GCP > {Service} > API Enabled` policy is not set to `Enforce: Enabled`, Discovery and CMDB controls will be `skipped`. Enable the applicable service APIs manually if Guardrails lacks permissions to do so.                                  | [Enable GCP APIs Documentation](https://cloud.google.com/apis).                                                                                                 |
| Further Assistance                  | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                                                                               | [Open Support Ticket](https://support.turbot.com).                                                                                                               |
