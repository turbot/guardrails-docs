---
title: Authentication Methods
sidebar_label: Authentication Methods
---

# Authentication Methods

In this guide, you will:

- Learn how to import an entire Google Cloud Platform (GCP) Organization into Turbot Guardrails. This process allows Guardrails to discover and manage resources across all projects and folders under a single GCP Organization.
- Monitor and troubleshoot the process.

Importing a [GCP Organization](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy#organizations) into Guardrails involves these key steps:

- Configuring a [GCP Service Account](https://cloud.google.com/iam/docs/service-account-overview) with appropriate permissions at the Organization level.
- Importing the organization via the Guardrails console.
- For any Enterprise hosting Guardrails refer [Enterprise Configuration](#enterprise-configuration) for more details.

## Prerequisites

- Familiarity with GCP Console with admin privileges.

## Supported Authentication

Guardrails provides support for *two credential methods* to import a GCP Organization. The supported methods are:

- **Service Account Impersonation**: Grants temporary credentials using the [Service account impersonation](https://cloud.google.com/iam/docs/impersonating-service-accounts).
- **JSON Credential File**: Uses a downloaded JSON key file to authenticate or you can provide *Private key as text* which requires copying and pasting the `private_key` section of the JSON file.

> [!NOTE]
> We recommend `Service Account Impersonation`, as it eliminates the need to download or manage a JSON key, reducing security risks. This guide demonstrates `Service Account Impersonation`.

> In case you want to use `JSON Credential File`, refer the steps mentioned in [Connect a GCP Project](/guardrails/docs/getting-started/getting-started-gcp/connect-project#step-4-upload-key-file) to Guardrails in `Getting Stated with GCP` guide.

## Required Permissions on Service Account

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


## Enterprise Configuration

> [!NOTE]
> This section applies only to Enterprise hosting Guardrails.

The GCP organization import feature requires [TED](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-database-ted) `v1.46.x`, which introduces the `gcp_service_account_private_key_ssm_parameter_name` SSM parameter. This parameter must be mapped to a manually created SSM parameter containing the credential JSON value.

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
