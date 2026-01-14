---
title: Self-Hosted Workspace
sidebar_label: Self-Hosted Workspace
---

# Importing GCP Organization to Self-Hosted Workspace

In this guide, you will:

- Learn how to import an entire Google Cloud Platform (GCP) Organization into Turbot Guardrails. This process allows Guardrails to discover and manage resources across all projects and folders under a single GCP Organization.
- Monitor and troubleshoot the process.

Importing a [GCP Organization](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy#organizations) into Guardrails involves these key steps:

- Setting up two [GCP Service Accounts](https://cloud.google.com/iam/docs/service-account-overview):
  - **Turbot Master Service Account**: Guardrails' identity with credentials stored in AWS SSM
  - **Organization Service Account**: Created in the GCP organization you want to import, has permissions to access that organization's resources
- Configuring service account impersonation so the Turbot Master SA can impersonate the Organization SA.
- Importing the organization via the Guardrails console.

## Prerequisites

- Access to the Guardrails console with *Turbot/Owner* or *Turbot/Admin* permissions at the Turbot resource level.
- Minimum Turbot Enterprise (TE) version `v5.48.0` or later.
- [GCP mod](https://hub.guardrails.turbot.com/mods/gcp/mods/gcp) `5.30+` installed in your Guardrails workspace.
- GCP Console: Familiarity with the GCP Console, including admin privileges.
- The `gcloud` CLI configured on your local environment.
- [TED](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-database-ted) version of `1.46.x` or later updated.

### Supported Authentication

Guardrails supports two credential methods to import a GCP Organization:

- **Service Account Impersonation**: Grants temporary credentials using GCP [Service account impersonation](https://cloud.google.com/iam/docs/impersonating-service-accounts).
- **JSON Credential File**: Uses a downloaded JSON key file or requires copying and pasting the `private_key` section of the JSON file.

> [!NOTE]
> We recommend **Service Account Impersonation**, as it eliminates the need to download or manage a JSON key, reducing security risks. This guide demonstrates **Service Account Impersonation**.

> If you prefer to use the **JSON Credential File**, refer to the steps mentioned in [Connect a GCP Project](/guardrails/docs/getting-started/getting-started-gcp/connect-project#step-4-upload-key-file) in the `Getting Started with GCP` guide.

## Understanding the Service Account Architecture

Importing a GCP Organization into self-hosted Guardrails requires **two separate service accounts** that work together:

### Service Account #1: Turbot Master Service Account

- **Purpose**: This is Guardrails' identity that performs impersonation
- **Location**: Created in ANY GCP project (doesn't need to be in the org you're importing)
- **Required Permissions**: Viewer role (`roles/viewer`) in its own project
- **Key Requirement**: JSON credential key stored in AWS SSM Parameter Store
- **Example**: `turbot-master@your-turbot-project.iam.gserviceaccount.com`

### Service Account #2: Organization Service Account

- **Purpose**: This service account has access to your GCP organization resources
- **Location**: Created in a project under the organization you want to import
- **Required Permissions**:
  - `roles/resourcemanager.organizationViewer` (for viewing org and listing resources)
  - `roles/browser` (broader viewing permissions)
  - `roles/resourcemanager.folderViewer` (for viewing folder metadata)
  - Additional roles based on your governance needs (see [Required Permissions](#required-permissions))
- **Impersonation Setup**: Must grant Service Account Token Creator role to Turbot Master SA
- **Example**: `guardrails-org-import@your-org-project.iam.gserviceaccount.com`

### How They Work Together

```
Turbot Guardrails → Uses Master SA credentials → Impersonates Org SA → Accesses GCP Organization
```

The Turbot Master Service Account impersonates the Organization Service Account to access your GCP resources. This approach provides better security by:
- Avoiding the need to share org service account keys
- Enabling centralized credential management in AWS SSM
- Supporting credential rotation without reconfiguring Guardrails

---

## Part A: Setup Turbot Master Service Account

## Step 1: Create Turbot Master Service Account

Create a service account in any GCP project that will serve as Guardrails' master identity.

1. Navigate to **IAM & Admin** > **Service Accounts** in any GCP project
2. Click **Create Service Account**
3. Name it descriptively (e.g., `turbot-master`)
4. Click **Create and Continue**
5. Grant it the **Viewer** role (`roles/viewer`)
6. Click **Continue** and then **Done**

## Step 2: Generate JSON Credential Key

1. Click on the newly created Turbot Master Service Account
2. Go to the **Keys** tab
3. Click **Add Key** > **Create new key**
4. Select **JSON** format and click **Create**
5. Save the downloaded JSON file securely

For more details, see [Create and delete service account keys](https://cloud.google.com/iam/docs/keys-create-delete).

## Step 3: Store Credentials in AWS SSM Parameter

AWS Systems Manager (SSM) `Parameter Store` enables secure storage of credentials. Guardrails uses this to store your Turbot Master Service Account JSON credential.

Log in to the Guardrails primary AWS account and navigate to **AWS Systems Manager**.

![Create Parameter](/images/docs/guardrails/guides/gcp/import-gcp-organization/self-hosted-workspace/create-paramater.png)

1. Create a **Secure String** parameter with **Tier** set to **Standard**
2. Name it descriptively (e.g., `/turbot/gcp/master-service-account`)
3. Paste the entire JSON credential content from the **Turbot Master Service Account** into the **Value** field
4. Click **Create parameter**

![Paste JSON Value](/images/docs/guardrails/guides/gcp/import-gcp-organization/self-hosted-workspace/add-parameter-value-in-console.png)

> [!IMPORTANT]
> Make sure you're storing the **Turbot Master Service Account** JSON key here, not the Organization Service Account key.

For more details, refer to [Creating a Parameter Store parameter](https://docs.aws.amazon.com/systems-manager/latest/userguide/create-parameter-in-console.html).

## Step 4: Update TED Stack with SSM Parameter

Follow the steps in [Update Turbot Guardrails Enterprise Database (TED)](/guardrails/docs/guides/hosting-guardrails/updating-stacks/update-ted).

Navigate to the **GCP Service Account Private Key SSM Parameter** section and update it with your parameter name (e.g., `/turbot/gcp/master-service-account`).

![Update TED Stack Parameter](/images/docs/guardrails/guides/gcp/import-gcp-organization/self-hosted-workspace/update-ted-stack-parameter.png)

---

## Part B: Setup Organization Service Account

## Step 5: Enable Required APIs

Guardrails requires access to the `Cloud Resource Manager` and `Service Management` APIs to discover and manage organization-wide resources. Refer the GCP [**documentation** ](https://cloud.google.com/endpoints/docs/openapi/enable-api#console) to enable the APIs using `Console` and `gcloud`.

Refer to the image below as example using as example in GCP `Console`.

![Enable API](/images/docs/guardrails/guides/gcp/import-gcp-organization/self-hosted-workspace/enable-api.png)

## Step 6: Create Organization Service Account

Create a service account in a project under the organization you want to import. This service account will have permissions to access organization resources.

1. Navigate to **IAM & Admin** > **Service Accounts** in a project under your organization
2. Click **Create Service Account**
3. Name it descriptively (e.g., `guardrails-org-import`)
4. Click **Create and Continue**
5. Skip granting project-level roles (we'll grant organization-level roles in the next step)
6. Click **Continue** and then **Done**

For more details, see [Prepare a GCP Project for Import to Guardrails](/guardrails/docs/getting-started/getting-started-gcp/prepare-project#step-1-locate-iam--admin--service-accounts).

## Step 7: Grant Organization-Level IAM Roles

The Organization Service Account needs permissions at the organization level to discover and manage resources.

> [!TIP]
> In GCP, service accounts are always associated with a specific project, even if their permissions are applied at the project, folder, or organization level.

### Required Permissions

#### Minimum Required Permissions for Read-Only Discovery

For basic organization import with read-only discovery and monitoring, grant these three roles:

| **Role** | **Purpose** |
|----------|-------------|
| `roles/resourcemanager.organizationViewer` | View organization structure and list folders/projects |
| `roles/browser` | Broader resource viewing permissions across the organization |
| `roles/resourcemanager.folderViewer` | View folder metadata and resources within folders |

> [!NOTE]
> These three roles are the minimum required to import and discover an organization. They allow Guardrails to view resources but not modify them.

#### Additional Permissions for Remediation

For governance and policy enforcement (beyond read-only), add appropriate roles based on your needs:

| **Permission Level** | **Description** | **Recommended Role** |
|---------------------|-----------------|---------------------|
| **Full Remediation** | Provides the broadest level of control across your GCP Organization, allowing full governance and policy enforcement | [Organization Administrator](https://cloud.google.com/resource-manager/docs/access-control-org#resourcemanager.organizationAdmin) (`roles/resourcemanager.organizationAdmin`) or equivalent custom roles |
| **Service-Specific** | Granular control over specific GCP services (e.g., Compute, Storage, IAM) | Individual service admin roles (e.g., `roles/compute.admin`, `roles/storage.admin`) |

### Grant Roles Using Console

1. Navigate to **IAM & Admin** > **IAM** in the [Google Cloud console](https://console.cloud.google.com)
2. Select your **Organization** from the resource selector
3. Click **Grant Access**
4. Enter the **Principal**: `guardrails-org-import@YOUR-PROJECT-ID.iam.gserviceaccount.com` (the Organization Service Account you created in Step 6)
5. Add these minimum required roles:
   - `roles/resourcemanager.organizationViewer`
   - `roles/browser`
   - `roles/resourcemanager.folderViewer`
6. (Optional) Add additional roles based on your governance requirements
7. Click **Save**

![Service Account with Organization Scope](/images/docs/guardrails/guides/gcp/import-gcp-organization/self-hosted-workspace/service-account-with-org-scope.png)

### Grant Roles Using gcloud

Alternatively, you can grant roles using the `gcloud` command line interface:

```bash
# Set variables
ORG_ID="YOUR_ORGANIZATION_ID"
PROJECT_ID="YOUR_PROJECT_ID"
ORG_SA_NAME="guardrails-org-import"

# Grant minimum required roles at organization level
gcloud organizations add-iam-policy-binding $ORG_ID \
  --member="serviceAccount:$ORG_SA_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/resourcemanager.organizationViewer"

gcloud organizations add-iam-policy-binding $ORG_ID \
  --member="serviceAccount:$ORG_SA_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/browser"

gcloud organizations add-iam-policy-binding $ORG_ID \
  --member="serviceAccount:$ORG_SA_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/resourcemanager.folderViewer"
```

---

## Part C: Link Service Accounts via Impersonation

## Step 8: Grant Impersonation Permission

The Turbot Master Service Account needs permission to impersonate the Organization Service Account. Grant the **Service Account Token Creator** role on the Organization Service Account to the Turbot Master Service Account:

```bash
# Replace with your actual service account emails
TURBOT_MASTER_SA="turbot-master@your-turbot-project.iam.gserviceaccount.com"
ORG_SA="guardrails-org-import@your-org-project.iam.gserviceaccount.com"
ORG_PROJECT_ID="your-org-project"

gcloud iam service-accounts add-iam-policy-binding $ORG_SA \
  --member="serviceAccount:$TURBOT_MASTER_SA" \
  --role="roles/iam.serviceAccountTokenCreator" \
  --project=$ORG_PROJECT_ID \
  --format=json
```

Expected output:

```json
{
  "bindings": [
    {
      "members": [
        "serviceAccount:turbot-master@your-turbot-project.iam.gserviceaccount.com"
      ],
      "role": "roles/iam.serviceAccountTokenCreator"
    }
  ],
  "etag": "BwYsqn0-odQ=",
  "version": 1
}
```

> [!NOTE]
> This command grants the Turbot Master SA the ability to generate short-lived tokens as the Organization SA, enabling impersonation without sharing the Organization SA's credentials.

---

## Part D: Import Organization in Guardrails Console

## Step 9: Get Organization ID

In the GCP console, select your organization. Navigate to **All** to view the list of projects, folders, and the organization itself. Locate and copy the `ID` of the organization.

![Get GCP Organization ID](/images/docs/guardrails/guides/gcp/import-gcp-organization/self-hosted-workspace/get-gcp-org-id.png)

## Step 10: Import Organization into Guardrails

Log into the Guardrails console with provided local credentials or by using any SAML based login and select the **CONNECT** card.

![Select Connect](/images/docs/guardrails/guides/gcp/import-gcp-organization/self-hosted-workspace/select-connect.png)

Select **GCP** and then choose the **GCP Organization** option.

![Select GCP](/images/docs/guardrails/guides/gcp/import-gcp-organization/self-hosted-workspace/select-gcp.png)

Configure the import settings:

- **Folder**: Choose the [folder](/guardrails/docs/concepts/resources/hierarchy#folders) where the GCP organization will be imported
- **Access mode**: Select **Service Account impersonation**
- **Organization ID**: Enter your GCP organization ID (from Step 9)
- **Client email**: Enter the **Organization Service Account** email (e.g., `guardrails-org-import@your-org-project.iam.gserviceaccount.com`)

> [!IMPORTANT]
> Use the **Organization Service Account** email here (the one created in Step 6), NOT the Turbot Master Service Account email. Guardrails will use the Turbot Master SA credentials (stored in AWS SSM) to impersonate this Organization SA.

![Provide GCP Org Details](/images/docs/guardrails/guides/gcp/import-gcp-organization/self-hosted-workspace/gcp-org-details.png)

The console will generate a gcloud command for setting up impersonation. Copy this command.

![Generate Service Account Impersonation](/images/docs/guardrails/guides/gcp/import-gcp-organization/self-hosted-workspace/generate-service-account-impersonation.png)

> [!NOTE]
> If you already completed Step 8 (Grant Impersonation Permission), you may skip executing this command. The console-generated command performs the same action - granting the Turbot Master SA the ability to impersonate the Organization SA.

If you haven't completed Step 8, execute the copied command now using [gcloud CLI](https://cloud.google.com/sdk/docs/install):

```bash
# The command format will be similar to:
gcloud iam service-accounts add-iam-policy-binding <ORG_SA_EMAIL> \
  --member="serviceAccount:<TURBOT_MASTER_SA_EMAIL>" \
  --role="roles/iam.serviceAccountTokenCreator" \
  --project=<ORG_PROJECT_ID> \
  --format=json
```

Expected output:

```json
{
  "bindings": [
    {
      "members": [
        "serviceAccount:turbot-master@your-turbot-project.iam.gserviceaccount.com"
      ],
      "role": "roles/iam.serviceAccountTokenCreator"
    }
  ],
  "etag": "BwYsqn0-odQ=",
  "version": 1
}
```

## Step 11: Create External ID Label

The External ID label acts as a security identifier linking the Organization Service Account to your Guardrails workspace. This label must be added to the GCP project where the Organization Service Account resides.

In the Guardrails console (during the import process), you'll see a generated External ID value in the format: `turbot_{workspace_id}_{unique_id}` (e.g., `turbot_162167737252865_f1da2779-92c8-46b1-83dd-95d629023211`).

![Generate External ID Label](/images/docs/guardrails/guides/gcp/import-gcp-organization/self-hosted-workspace/generate-external-id-label-and-create.png)

> [!NOTE]
> The label key (`guardrails_external_id`) and the workspace ID portion cannot be modified. You can customize the unique ID suffix by clicking the **Customize** icon if needed.

Now add this label to the GCP project:

1. Log in to the GCP Console
2. Navigate to the project where your **Organization Service Account** resides (the project from Step 6)
3. Click **Labels** in the side navigation panel
4. Add a new label:
   - **Key**: `guardrails_external_id`
   - **Value**: The value from Guardrails console (e.g., `turbot_162167737252865_f1da2779-92c8-46b1-83dd-95d629023211`)
5. Click **+Add label** to save

![Create GCP Label](/images/docs/guardrails/guides/gcp/import-gcp-organization/self-hosted-workspace/gcp-label-creation.png)

> [!WARNING]
> Do not delete this label after the import. Guardrails requires it to verify the Organization Service Account identity during ongoing operations.

## Step 12: Exclude Projects (Optional)

This step is required if you wish to exclude specific projects or folders under the organization from being imported into Guardrails.

> [!IMPORTANT]
> Existing projects already connected individually in Guardrails will automatically move under the organization hierarchy. If you **do not wish to move them**, list them in the YAML exclusion list.

In the Guardrails console:

1. Click the **Edit** button to provide a list of project IDs or folder names to exclude
2. Enter the exclusions in YAML format
3. Click **Preview** to ensure no errors are displayed

![Edit Exception List](/images/docs/guardrails/guides/gcp/import-gcp-organization/self-hosted-workspace/exception-list-with-connect.png)

## Step 13: Start Import

Click **Connect** to begin the import process.

![Connect to Import](/images/docs/guardrails/guides/gcp/import-gcp-organization/self-hosted-workspace/connect.png)

Guardrails will create and execute discovery controls for your GCP Organization, scanning each folder, project and resources under it.

![Check Discovery process](/images/docs/guardrails/guides/gcp/import-gcp-organization/check-discovery-process.png)

<!-- ## (Optional) Ensure Billing is Enabled

If you plan to allow Guardrails to enable new APIs or create resources that may incur charges, ensure that billing is enabled at the **organization** level or for specific projects as needed. For more details, refer to the GCP guide [Manage your Cloud Billing account](https://cloud.google.com/billing/docs/how-to/manage-billing-account). -->

## Review

- [ ] Confirm that the organization CMDB and discovery controls are in the `OK` state.

Navigate to the **Resources** tab, search for the organization name, then select **Controls** tab besides to check the controls are on `OK` state.

![Review Org CMDB and Discovery Controls](/images/docs/guardrails/guides/gcp/import-gcp-organization/self-hosted-workspace/review-org-cmdb-discovery-controls.png)

- [ ] Verify that the projects and folders are successfully imported into Guardrails and match the GCP console.

Navigate to the **Resources** tab, search for the organization name to check the list of resources the import process is discovered matching to the structure in GCP console.

![Review GCP Org Resources](/images/docs/guardrails/guides/gcp/import-gcp-organization/self-hosted-workspace/review-gcp-org-resources-imported.png)

## Next Steps

- Learn how to [Enable GCP Services in Guardrail](guides/gcp/services#enabling-gcp-services-in-guardrails).
- Learn how to [Configure Real-Time Event Handlers](guides/gcp/real-time-events).

## Troubleshooting

| **Issue**                                | **Description**                                                                                                                                                                                                                                      | **Guide**                                                                                                                                                          |
|------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Wrong Service Account in Console | If you used the Turbot Master SA email instead of the Organization SA email in the **Client email** field in the Guardrails console, impersonation will fail. | Use the Organization Service Account email (created in Step 6) in the Guardrails console, not the Turbot Master SA email. Guardrails uses the Master SA credentials from AWS SSM to impersonate the Org SA. |
| Wrong Credentials in SSM Parameter | If you stored the Organization SA credentials instead of the Turbot Master SA credentials in AWS SSM Parameter Store, Guardrails cannot authenticate. | Verify the SSM parameter contains the Turbot Master Service Account JSON key (created in Step 2), not the Organization SA key. The Org SA should never have its key downloaded. |
| Missing Impersonation Permission | The Turbot Master SA must have `roles/iam.serviceAccountTokenCreator` on the Organization SA for impersonation to work. | Run the command in Step 8 to grant the Turbot Master SA permission to impersonate the Organization SA. |
| Missing Organization-Level Permissions | The Organization SA needs minimum roles (`organizationViewer`, `browser`, `folderViewer`) at the organization level to discover resources. | Grant the required roles to the Organization SA at the organization scope as described in Step 7. |
| Access Denied: Missing Token Creator Role | If using Service Account Impersonation, the impersonating user or workload must have `roles/iam.serviceAccountTokenCreator` on the service account. | Refer to the [Service Account Token Creator Role Documentation](https://cloud.google.com/iam/docs/impersonating-service-accounts).                                 |
| Access Denied: Malformed Secret Key  | Guardrails requires the multi-line format of the Secret Key. Ensure it includes the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` headers.                                                                                          |                                                          |
| Access Denied: Improper Client Email | Guardrails cannot use a non-service account email to access the project. Ensure the Client Email is in the form of `{identifier}@{your-project-id}.iam.gserviceaccount.com`.| [Check GCP Service Account Documentation](https://cloud.google.com/iam/docs/service-accounts). |
| Access Denied: Missing or Insufficient Permissions | If Guardrails is asked to discover, track, or remediate resources without the necessary permissions, `access denied` errors will appear in the Discovery and CMDB controls in the Guardrails console. Resolve by granting the required permissions. |  Check [Required Permissions](#required-permissions).|
| Lots of Controls in Error State      | If there were issues with credentials during project import, many Discovery controls may show an `error` state. You can either delete and reimport the project or rerun the controls in `error` using scripts provided in the Guardrails Samples Repo. | Use the [Python](https://github.com/turbot/guardrails-samples/tree/main/api_examples/python/run_controls), [Node](https://github.com/turbot/guardrails-samples/tree/main/guardrails_utilities/python_utils/run_controls_batches), or [Shell](https://github.com/turbot/guardrails-samples/tree/main/guardrails_utilities/shell_utils/run-controls) scripts. |
| GCP Service API Enabled Policies Aren't Set | If the `GCP > {Service} > API Enabled` policy is not set to `Enforce: Enabled`, Discovery and CMDB controls will be `skipped`. Enable the applicable service APIs manually if Guardrails lacks permissions to do so. | [Enable GCP APIs Documentation](https://cloud.google.com/apis).
| Bad Request: Error processing runnable input organizationcredentials	`Cloud Resource Manager API has not been used` in project 265919995000 before or it is disabled.| If Guardrails import process errors out in CMDB and discovery control run. | Enable it by visiting https://console.developers.google.com/apis/api/cloudresourcemanager.googleapis.com/overview?project=265919995000 then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.|                                                                  |
| Further Assistance                  | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                                                                               | [Open Support Ticket](https://support.turbot.com).                                                                                                               |
