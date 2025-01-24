---
title: Import Organization
sidebar_label: Import Organization
---

# Import Organization

In this guide, you will:

- Learn how to import an entire Google Cloud Platform (GCP) Organization into Turbot Guardrails. This process allows Guardrails to discover and manage resources across all projects and folders under a single GCP Organization.
- Monitor and troubleshoot the process.

Importing a [GCP Organization](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy#organizations) into Guardrails involves these key steps:

- Configuring a [GCP Service Account](https://cloud.google.com/iam/docs/service-account-overview) with appropriate permissions at the organization level.
- Importing the organization via the Guardrails console.
- For enterprise hosting Guardrails, refer to [Enterprise Configuration](#step-7-setup-for-enterprise-configuration).

## Prerequisites

- Familiarity with the GCP Console, including admin privileges.
- The `gcloud` CLI configured in your local environment.
- Access to the Guardrails console with *Turbot/Owner* or *Turbot/Admin* permissions at the Turbot resource level.
- Minimum [TED](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-database-ted) version `1.46.x` or later for enterprise-hosted setups.

## Step 1: Choose Supported Authentication

Choose one of the following authentication methods for onboarding the GCP organization:

Guardrails supports two credential methods to import a GCP Organization:

- **Service Account Impersonation**: Grants temporary credentials using [service account impersonation](https://cloud.google.com/iam/docs/impersonating-service-accounts).
- **JSON Credential File**: Uses a downloaded JSON key file or requires copying and pasting the `private_key` section of the JSON file.

> [!NOTE]
> We recommend **Service Account Impersonation**, as it eliminates the need to download or manage a JSON key, reducing security risks. This guide demonstrates **Service Account Impersonation**.

> If you prefer to use the **JSON Credential File**, refer to the steps mentioned in [Connect a GCP Project](/guardrails/docs/getting-started/getting-started-gcp/connect-project#step-4-upload-key-file) in the `Getting Started with GCP` guide.

### Required Permissions on Service Account

The table below outlines the minimum permissions required for organization-wide governance:

| **Permission Level** | **Description**                                                                                                                                                        | **Recommended Role**                                                                                                   |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| **Full Remediation**  | Provides Guardrails with the broadest level of control across your GCP Organization, allowing full governance and policy enforcement.                                | [Organization Administrator](https://cloud.google.com/resource-manager/docs/access-control-org#resourcemanager.organizationAdmin) (`roles/resourcemanager.organizationAdmin`) or equivalent custom roles. |
| **Read-Only**         | Allows Guardrails to perform discovery and track resources but does not enable any remediation actions.                                                            | Viewer roles at the organization level (e.g., `roles/viewer`).                                                        |
| **Folder Viewer**   | Grants read-only access to view metadata and browse resources within a specific GCP folder, without modifying them.                                                                                            | `roles/resourcemanager.folderViewer`.                                                                                 |
| **Organization Viewer**| Allows read-only access to view metadata and monitor all resources at the organization level, enabling oversight without configuration changes.                                                  | [Organization Viewer](https://cloud.google.com/resource-manager/docs/access-control-org#resourcemanager.organizationViewer) `roles/resourcemanager.organizationViewer`.                                                                           |
| **Project Viewer**      | Provides read-only access to view project-level metadata and resources, ensuring visibility without allowing any modifications.                                                                                     | `roles/viewer`.                                                                                                       |

> [!IMPORTANT]
> To import an organization, you need only `Organization Viewer`, `Project Viewer`, and `Folder Viewer` roles to allow the discovery of all resources under the organization.

> If Guardrails attempts an action (e.g., enabling APIs, modifying resources) without sufficient permissions, you will encounter `access denied` errors. To resolve this, ensure the required permissions are granted or update the Guardrails policies to align with your organization's requirements.

## Step 2: Enable Required APIs

Guardrails requires access to the `Cloud Resource Manager` and `Service Management` APIs to discover and manage organization-wide resources. To enable these APIs:

- In the [Google Cloud console](https://console.cloud.google.com), navigate to **APIs & Services** for the GCP project where the service account was created.
- Locate the **Cloud Resource Manager API** and **Service Management API**.
- Select **ENABLE** for each API.

Refer to the image below as example:

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

## Step 3: Create Service Account

To import an organization into Guardrails, create the service account in any single project under your organization. Refer to [Prepare a GCP Project for Import to Guardrails](/guardrails/docs/getting-started/getting-started-gcp/prepare-project).

## Step 4: Grant IAM Role(s)

> [!TIP]
> In GCP, service accounts belong to a specific project, even if their permissions apply at the project, folder, or organization level.

Follow these steps to assign the required roles at the `Organization` scope to the service account:

1. Navigate to **IAM & Admin** > **IAM** in the [Google Cloud console](https://console.cloud.google.com).
2. Select your **Organization** from the resource selector.
3. Select **Grant Access**.
4. Enter the **Principal** as `SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com`.
5. Assign the required roles at the organization (or folder) scope as described in [Required Permissions on Service Account](#required-permissions-on-service-account).

Refer to the image below:

![Service Account with Organization Scope](/images/docs/guardrails/guides/gcp/import-gcp-organization/service-account-with-org-scope.png)

Alternatively you can grant roles using command line interface as below.

<details>
  <summary>CLI Reference: Create a Service Account and Assign Organization-Level Roles</summary>

```bash
# 1. Create the service account in a specific project
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME --project=PROJECT_ID --description="Service account for Guardrails"

# 2. Assign roles at the organization level
gcloud organizations add-iam-policy-binding ORGANIZATION_ID --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" --role="ROLE_NAME"
```
</details>

## Step 5: Configure Service Account Impersonation

[Service Account Impersonation](https://cloud.google.com/iam/docs/service-account-impersonation#impersonation-overview) grants short-lived credentials to Guardrails, allowing it to act as a specified service account without requiring a JSON key file. This approach reduces the security risk of storing or distributing long-lived credentials.

### Prerequisites

- The **impersonating** user or service account (i.e. `the identity that runs Guardrails`) must have the **Service Account Token Creator** role (`roles/iam.serviceAccountTokenCreator`) on the target service account.

- The **target** service account just created for organization importing purpose i.e. the one being impersonated must have the **required organization-level permissions** as as described in [What Permissions to Grant](#required-permissions-on-service-account) to discover or manage resources across your GCP Organization.

> [!NOTE]
> The CLI command for impersonation is generated in the Guardrails console during setup, when you choose `Access Mode` as `Service Account Impersonation`, provide `Organization ID` and `Client email`.

<!-- Login to the Guardrails console, select **CONNECT** card, choose `GCP` card from the panel and select `GCP Organization` to proceed with the required details. -->

Follow steps provided in [Step 7](#step-7-import-organization-into-guardrails) to generate the gcloud command.

Refer to the image below for guidance:

![Generate Service Account Impersonation](/images/docs/guardrails/guides/gcp/import-gcp-organization/generate-service-account-impersonation.png)

Select **Copy gcloud command**.

## Step 6: Execute gcloud CLI Command

[Install the gcloud CLI](https://cloud.google.com/sdk/docs/install), guide provided by Google Cloud.

The copied command from the [Step 5](#step-5-configure-service-account-impersonation) should be executed in your local setup.

```bash
# Replace SERVICE_ACCOUNT_NAME and PROJECT_ID with your service account's name/project
# Replace IMPERSONATOR_EMAIL with the user or service account that will impersonate it

gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com --member="user:IMPERSONATOR_EMAIL" --role="roles/iam.serviceAccountTokenCreator"
```

<!-- ## Using JSON Credential File

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
> You may use one of the option either [Using Using JSON Credential File](#using-json-credential-file) or [Using Private Key](#using-private-key) or [Using Service Account Impersonation](#using-service-account-impersonation) -->

## Step 7: Setup for Enterprise Configuration

> [!NOTE]
> This section applies only to Enterprise-hosted Guardrails setups.

> For SaaS customers, this configuration is managed by Turbot.

The GCP organization import feature requires [TED](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-database-ted) version `1.46.x` or later. This version introduces the `gcp_service_account_private_key_ssm_parameter_name` SSM parameter, which must be mapped to a manually created SSM parameter containing the credential JSON value.

### Prerequisites

- Access to the Guardrails AWS account with [Administrator Privileges](/guardrails/docs/enterprise/FAQ/admin-permissions).
- Familiarity with the AWS Console, Service Catalog, and CloudFormation services.

### Create SSM Parameter

Log in to the Guardrails primary AWS account and navigate to the `AWS Systems Manager` service.

![Create Parameter](/images/docs/guardrails/guides/gcp/import-gcp-organization/create-paramater.png)

Create a `Secure String` with the `Tier` set to `Standard`.

![Paste JSON Credential](/images/docs/guardrails/guides/gcp/import-gcp-organization/create-secure-standard-string.png)

See [here](#using-json-credential-file) how to download JSON credential file.

Paste the JSON credential content into the **Value** field and select **Create parameter**.

![Paste JSON Value](/images/docs/guardrails/guides/gcp/import-gcp-organization/add-parameter-value-in-console.png)

For more details, refer to the AWS guide on [Creating a Parameter Store parameter using the console](https://docs.aws.amazon.com/systems-manager/latest/userguide/create-parameter-in-console.html).

### Update TED Stack

Follow the steps in [Update Turbot Guardrails Enterprise Database (TED)](/guardrails/docs/guides/hosting-guardrails/updating-stacks/update-ted).

Navigate to the `GCP Service Account Private Key SSM Parameter` section of the TED stack (near the end) and update the manually created SSM parameter name as shown below. Select **Update** to proceed.

![Update TED Stack Parameter](/images/docs/guardrails/guides/gcp/import-gcp-organization/update-ted-stack-parameter.png)

## Step 7: Import Organization into Guardrails

Log in to your Guardrails workspace console and select the **CONNECT** card.

![Select Connect](/images/docs/guardrails/guides/gcp/import-gcp-organization/select-connect.png)

Select **GCP** and then choose the **GCP Organization** option.

![Select GCP](/images/docs/guardrails/guides/gcp/import-gcp-organization/select-gcp.png)

Choose the folder where the organization will be imported.

![Choose Import Location](/images/docs/guardrails/guides/gcp/import-gcp-organization/choose-import-location.png)

Choose one of the `Access modes` from the provided list. In this example, **Service Account impersonation** is selected. Provide the `Organization ID` for your GCP organization and the `Client email`. Guardrails will use this email ID for impersonation.

![Provide GCP Org Details](/images/docs/guardrails/guides/gcp/import-gcp-organization/gcp-org-details.png)

Set up impersonation. Select the [**Copy gcloud command**](#prerequisites-for-configuration), provide the `External ID label`, and select **Connect** to begin the discovery and management process.

![Setup Impersonate](/images/docs/guardrails/guides/gcp/import-gcp-organization/setup-impersonate.png)

Guardrails will create and execute discovery controls for your GCP Organization, scanning each project and resource based on the configured policies.

> [!IMPORTANT]
> This step applies only when you choose *Service Account impersonation*.
> The `External ID` label created for this organization import must be retained within the respective GCP project.


## (Optional)Step 8: Ensure Billing is Enabled

If you plan to allow Guardrails to enable new APIs or create resources that may incur charges, ensure that billing is enabled at the **organization** level or for specific projects as needed. For more details, refer to the GCP guide [Manage your Cloud Billing account](https://cloud.google.com/billing/docs/how-to/manage-billing-account).


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
