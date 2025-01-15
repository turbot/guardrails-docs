---
title: "Import a GCP Organization into Guardrails"
template: Documentation
nav:
  title: "Import Organization"
  order: 10
---

# Import a GCP Organization into Guardrails

<div class="alert alert-warning">
  This guide details how to import an entire Google Cloud Platform (GCP) Organization into Guardrails. This process
  allows Guardrails to discover and manage resources across all projects and folders under a single GCP Organization.
</div>

## Overview

Importing a GCP Organization into Guardrails involves these key steps:

1. **Configuring a GCP service account** with appropriate permissions at the **Organization** level.
2. **Importing the organization** via the Guardrails Console.

Guardrails supports **three** credential methods for GCP Organization imports. **We strongly recommend Service Account Impersonation** (option #1 below), as it does **not** require downloading or managing a JSON key. The three methods are:

1. **Service Account Impersonation** (recommended)
2. **JSON File**
3. **Private Key Text** (copy-paste of the JSON private key)

---

## In the GCP Console

### Create or Select a Service Account

> **Important**: In GCP, **all service accounts belong to a specific project**, even if their permissions apply at the folder or organization level. For an **organization-level** import in Guardrails, you will:
>
> **Create the service account** in any single project under your organization.
> **Assign the required roles** at the **organization** scope to that service account.

1. In the [Google Cloud console](https://console.cloud.google.com), navigate to **IAM & Admin** > **Service Accounts**.
2. Select the **project** in which you want to create this service account.
3. Click **Create Service Account**.
4. Enter a **Service account name**.
5. Click **Create and continue**, then **skip** assigning roles at the **project** level if you only need them at the organization level. (Or if you prefer, you can assign basic roles at the project level here, but it’s not required if you plan to assign roles at the org level.)
6. Click **Done** to finalize service account creation.
7. **Assign organization-level permissions**:
   - Go to **IAM & Admin** > **IAM**.
   - Select your **organization** from the resource selector.
   - Click **Grant Access**.
   - Choose **Principal** = `SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com`.
   - Assign roles at the **organization** (or folder) scope as described in [What Permissions to Grant](#what-permissions-to-grant).

<details>
  <summary>CLI Example for Creating a Service Account & Assigning Org-Level Roles</summary>

```bash
# 1. Create the service account in a specific project
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME --project=PROJECT_ID --description="Service account for Guardrails"

# 2. Assign roles at the organization level
gcloud organizations add-iam-policy-binding ORGANIZATION_ID --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" --role="ROLE_NAME"
```

</details>

### Enable Required APIs

Guardrails needs access to the **Cloud Resource Manager** and **Service Management** APIs (at a minimum) to discover and manage organization-wide resources.

1. From the [Google Cloud console](https://console.cloud.google.com), navigate to **APIs & Services** (for the same project in which your service account was created).
2. Locate the **Cloud Resource Manager API** and **Service Management API**.
3. If either is **disabled**, click **Enable**.

<details>
  <summary>CLI Commands</summary>

```bash
# Enable Cloud Resource Manager for the project where the service account lives
gcloud services enable cloudresourcemanager.googleapis.com --project=PROJECT_ID

# Enable Service Management for the same project
gcloud services enable servicemanagement.googleapis.com --project=PROJECT_ID
```

</details>

### Ensure Billing is Enabled

If you plan to allow Guardrails to enable new APIs or create resources that may incur charges, ensure Billing is enabled at the **organization** level or for specific projects as needed.

1. Go to the **API Console**.
2. From the projects list, select the project.
3. Open the console left side menu and select **Billing**.
4. Click **Enable billing**. (If billing is already enabled then this option isn't available.)
5. If you don't have a billing account, create one.
6. Select your location, fill out the form, and click Submit and enable billing.

## In the Guardrails Console

Guardrails provides **three** options to authenticate your GCP Organization import:

Below, we detail each method. After choosing your method, follow the **Steps in Guardrails** to complete the import.

### Service Account Impersonation (Recommended)

**What is Service Account Impersonation?**  
Service Account Impersonation uses the [IAM Credentials API](https://cloud.google.com/iam/docs/impersonating-service-accounts) to grant **short-lived credentials** to Guardrails, allowing it to act as a specified service account **without** requiring a JSON key file. This reduces the security risk of storing or distributing long-lived credentials.

**Prerequisites**:

- The **impersonating** user or service account (i.e., the identity that runs Guardrails) must have the **Service Account Token Creator** role (`roles/iam.serviceAccountTokenCreator`) on the target service account.
- The **target** service account itself (the one being impersonated) must have the **required organization-level permissions** (e.g., `roles/resourcemanager.organizationAdmin`) to discover or manage resources across your GCP Organization.

<details>
  <summary>Example: Assign Service Account Token Creator</summary>

```bash
# Replace SERVICE_ACCOUNT_NAME and PROJECT_ID with your service account's name/project
# Replace IMPERSONATOR_EMAIL with the user or service account that will impersonate it

gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com --member="user:IMPERSONATOR_EMAIL" --role="roles/iam.serviceAccountTokenCreator"
```

</details>

### JSON File

**How to obtain the JSON file in the GCP Console**:

1. In the [Google Cloud console](https://console.cloud.google.com), navigate to **IAM & Admin** > **Service Accounts**.
2. Select the **project** where your service account resides.
3. Locate the service account you created for Guardrails, and click on its **Actions** menu (three dots on the right).
4. Select **Manage keys**.
5. Click **Add key** > **Create new key**.
6. Choose **JSON** as the **Key type**, and click **Create**.
7. A JSON file will download automatically to your local machine. **Keep this file secure**.

<details>
  <summary>Example: Using CLI Command</summary>

```bash
# This command will create a file named "key.json" in your current directory
gcloud iam service-accounts keys create key.json --iam-account=guardrails-sa@my-project.iam.gserviceaccount.com
```

</details>

### Private Key

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

**Steps in Guardrails**

1. **Log in** to your Guardrails workspace with **Turbot/Owner** or **Turbot/Admin** permissions.
2. Click the **Import** card, then select **GCP Organization**.
3. On the import screen, **choose one of the three methods**:
   - **Service Account Impersonation**
     - Provide the **Service Account** email in the form `SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com`.
   - **JSON File**
     - Click **Upload JSON** and select your JSON file.
   - **Private Key**
     - Paste the entire contents of your JSON key (multi-line, including the `BEGIN` and `END` lines).
4. Provide the **Organization ID** for your GCP Organization.
5. Choose the **Parent Resource** in Guardrails (e.g., a folder or workspace) under which this GCP Organization should be placed.
6. Click **Import** to begin the discovery and management process. Guardrails will create and run discovery controls for your GCP Organization, scanning each project and resource based on your configured policies.

> **Note**: If you see `access denied` or other errors, verify that you have assigned the appropriate roles:
>
> - `roles/iam.serviceAccountTokenCreator` for **Service Account Impersonation**.
> - Correct **JSON key** and **client_email** for **JSON File** / **Private Key**.
> - Proper **organization-level** roles (e.g., `roles/resourcemanager.organizationAdmin`) on the service account for full remediation.

## What Permissions to Grant

The permissions you grant to the service account depend on your organization’s security and compliance requirements. The **minimum** recommendation for organization-wide governance is:

- **Full Remediation**

  - Assign the [**Organization Administrator**](https://cloud.google.com/resource-manager/docs/access-control-org#resourcemanager.organizationAdmin) role (`roles/resourcemanager.organizationAdmin`) or equivalent **custom roles** that cover all relevant GCP APIs.
  - This provides Guardrails with the broadest level of control across your GCP Organization.

- **Read-Only**
  - Provide the **Viewer** roles at the organization level (e.g., `roles/viewer`).
  - This allows Guardrails to perform discovery and track resources, but **no remediation** actions can be taken.

> **Tip**: If Guardrails is asked to do something (e.g., enable APIs, modify resources) and it lacks permissions, you will see `access denied` errors in Guardrails. Resolve these by granting the needed permissions or by adjusting Guardrails policies accordingly.

## Troubleshooting

### Access Denied

Common causes of `access denied`:

- **Missing Token Creator Role** (for Impersonation): If using Service Account Impersonation, the impersonating user or workload must have `roles/iam.serviceAccountTokenCreator` on the service account.

- **Malformed Secret Key**: Guardrails requires the multi-line format of the Secret Key. The beginning `-----BEGIN PRIVATE KEY-----` and ending `-----END PRIVATE KEY-----` are necessary.

- **Improper Client Email**: Guardrails cannot use a non-service account email to get access to the project. The Client Email must be in the form of `{identifier}@{your-project-id}.iam.gserviceaccount.com`.

- **Missing or Insufficient Permissions**: If Guardrails has been asked to discover,
  track or remediate resources that it does not have permissions for, then
  `access denied` errors will pop up for the GCP Discovery and CMDB controls in the Guardrails console. These should be
  resolved as quickly as possible.

### Lots of Controls in Error state

If there were some initial problems with credentials after project import, there may be a large number of Discovery controls in `error`. These can be resolved in one of two ways. First, simply delete the project and reimport it with proper
credentials. Second, keep the project imported but rerun each control in `error` using the run_controls scripts in the Guardrails Samples Repo available in [Python](https://github.com/turbot/guardrails-samples/tree/main/api_examples/python/run_controls), [Javascript](https://github.com/turbot/guardrails-samples/tree/main/api_examples/node/run-controls)
or [shell](https://github.com/turbot/guardrails-samples/tree/main/api_examples/shell/run-controls). The filter of `state:error` to rerun all controls in `error`.

### GCP Service API Enabled policies aren't set

- If the `GCP > {Service} > API Enabled` policy has not been set to `Enforce: Enabled` then the Discovery and CMDB controls will go to `skipped` for that Service's resources. Enable the `API Enabled` policy to resolve.
- If Guardrails does not have write permissions to enable APIs, then the applicable service API must be enabled manually.
