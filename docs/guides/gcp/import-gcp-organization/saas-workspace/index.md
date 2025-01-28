---
title: To SaaS Workspace
sidebar_label: To SaaS Workspace
---

# Importing Organization to SaaS Workspace

In this guide, you will:

- Learn how to import an entire Google Cloud Platform (GCP) Organization into Turbot Guardrails in SaaS environment. This process allows Guardrails to discover and manage resources across all projects and folders under a single GCP Organization.
- Monitor and troubleshoot the process.

Importing a [GCP Organization](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy#organizations) into Guardrails involves these key steps:

- Configuring a [GCP Service Account](https://cloud.google.com/iam/docs/service-account-overview) with appropriate permissions at the organization level.
- Importing the organization via the Guardrails console.

## Prerequisites

- Access to the Guardrails console with *Turbot/Owner* or *Turbot/Admin* permissions at the Turbot resource level.
- Minimum Turbot Enterprise (TE) version `v5.48.0` or later.
- [GCP mod](https://hub.guardrails.turbot.com/mods/gcp/mods/gcp) `5.30+` installed in your Guardrails workspace.
- GCP Console: Familiarity with the GCP Console, including admin privileges.
- The `gcloud` CLI configured on your local environment.

### Supported Authentication

Guardrails supports two credential methods to import a GCP Organization:

- **Service Account Impersonation**: Grants temporary credentials using GCP [Service account impersonation](https://cloud.google.com/iam/docs/impersonating-service-accounts).
- **JSON Credential File**: Uses a downloaded JSON key file or requires copying and pasting the `private_key` section of the JSON file.

> [!NOTE]
> We recommend **Service Account Impersonation**, as it eliminates the need to download or manage a JSON key, reducing security risks. This guide demonstrates **Service Account Impersonation**.

> If you prefer to use the **JSON Credential File**, refer to the steps mentioned in [Connect a GCP Project](/guardrails/docs/getting-started/getting-started-gcp/connect-project#step-4-upload-key-file) in the `Getting Started with GCP` guide.

## Step 1: Enable Required APIs

Guardrails requires access to the `Cloud Resource Manager` and `Service Management` APIs to discover and manage organization-wide resources. Refer the GCP [**documentation** ](https://cloud.google.com/endpoints/docs/openapi/enable-api#console) to enable the APIs using `Console` and `gcloud`.

Refer to the image below as example using as example in GCP `Console`.

![Enable API](/images/docs/guardrails/guides/gcp/import-gcp-organization/saas-workspace/enable-api.png)

## Step 2: Create Service Account

To import an organization into Guardrails, create the service account in any single project under your organization. [Prepare a GCP Project for Import to Guardrails](/guardrails/docs/getting-started/getting-started-gcp/prepare-project#step-1-locate-iam--admin--service-accounts). The step `Locate IAM & Admin > Service Accounts` elaborates the steps to create service account.

## Step 3: Grant IAM Roles

> [!TIP]
> In GCP, service accounts are always associated with a specific project, even if their permissions are applied at the project, folder, or organization level.

### Required Permissions

The table below outlines the minimum permissions required for organization-wide governance on service account:

| **Permission Level** | **Description**                                                                                                                                                        | **Recommended Role**                                                                                                   |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| **Full Remediation**  | Provides Guardrails with the broadest level of control across your GCP Organization, allowing full governance and policy enforcement.                                | [Organization Administrator](https://cloud.google.com/resource-manager/docs/access-control-org#resourcemanager.organizationAdmin) (`roles/resourcemanager.organizationAdmin`) or equivalent custom roles. |
| **Read-Only**         | Allows Guardrails to perform discovery and track resources but does not enable any remediation actions.                                                            | Viewer roles at the organization level (e.g., `roles/viewer`).                                                        |
| **Folder Viewer**   | Grants read-only access to view metadata and browse resources within a specific GCP folder, without modifying them.                                                                                            | `roles/resourcemanager.folderViewer`.                                                                                 |
| **Organization Viewer**| Allows read-only access to view metadata and monitor all resources at the organization level, enabling oversight without configuration changes.                                                  | [Organization Viewer](https://cloud.google.com/resource-manager/docs/access-control-org#resourcemanager.organizationViewer) `roles/resourcemanager.organizationViewer`.                                                                           |
| **Project Viewer**      | Provides read-only access to view project-level metadata and resources, ensuring visibility without allowing any modifications.                                                                                     | `roles/viewer`.

Follow these steps to assign the required roles at the `Organization` scope to the service account:

- Navigate to **IAM & Admin** > **IAM** in the [Google Cloud console](https://console.cloud.google.com).
- Select your **Organization** from the resource selector.
- Select **Grant Access**.
- Enter the **Principal** as `SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com`, that you created part of previous step.
- Assign the required roles at the organization (or folder) scope as described in [Required Permissions on Service Account](#required-permissions).

Refer to the image below:

![Service Account with Organization Scope](/images/docs/guardrails/guides/gcp/import-gcp-organization/saas-workspace/service-account-with-org-scope.png)

> [!NOTE]
> To import an organization, you need only `Organization Viewer`, `Project Viewer`, and `Folder Viewer` roles to allow the discovery of all resources under the organization.

Alternatively you can grant roles using `gcloud` command line interface as below.

```bash
#  Create the service account in a specific project
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME --project=PROJECT_ID --description="Service account for Guardrails"
# Assign roles at the organization level
gcloud organizations add-iam-policy-binding ORGANIZATION_ID --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" --role="ROLE_NAME"
```

<!-- Now, proceed with the following steps to prepare enterprise configurations.

## Step 4: Enterprise Configurations

To import a GCP organization into an enterprise-hosted environment, the following activities must be completed:

### Prerequisites

- A minimum [TED](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-database-ted) version of `1.46.x` or later.
- Access to the Guardrails primary AWS account with [Administrator Privileges](/guardrails/docs/enterprise/FAQ/admin-permissions).
- Familiarity with the AWS Console, Service Catalog, and CloudFormation services.

### Create SSM Parameter

AWS Systems Manager (SSM) `Parameter Store` feature enables the creation of key-value pairs to securely store application configurations, custom environment variables, product keys, and credentials in a centralized interface. Guardrails leverages this service to securely store your service account JSON credential file, ensuring seamless and secure resource governance processes.

Log in to the Guardrails primary AWS account and navigate to the `AWS Systems Manager` service.

![Create Parameter](/images/docs/guardrails/guides/gcp/import-gcp-organization/saas-workspace/create-paramater.png)

Create a `Secure String` with the `Tier` set to `Standard`.

![Paste JSON Credential](/images/docs/guardrails/guides/gcp/import-gcp-organization/saas-workspace/create-secure-standard-string.png)

See [**here**](/guardrails/docs/getting-started/getting-started-gcp/prepare-project#step-9-create-key) how to create and download JSON credential file.

Paste the JSON credential content into the **Value** field and select **Create parameter**.

![Paste JSON Value](/images/docs/guardrails/guides/gcp/import-gcp-organization/saas-workspace/add-parameter-value-in-console.png)

For more details, refer to the AWS guide on [Creating a Parameter Store parameter using the console](https://docs.aws.amazon.com/systems-manager/latest/userguide/create-parameter-in-console.html).

### Update TED Stack

It's time to update the created SSM parameter name in the TED. Follow the steps in [Update Turbot Guardrails Enterprise Database (TED)](/guardrails/docs/guides/hosting-guardrails/updating-stacks/update-ted).

Navigate to the `GCP Service Account Private Key SSM Parameter` section of the TED stack (towards the end) and update the manually created SSM parameter name as shown below. Select **Update** to proceed.

![Update TED Stack Parameter](/images/docs/guardrails/guides/gcp/import-gcp-organization/saas-workspace/update-ted-stack-parameter.png) -->

## Step 4: Get Organization ID

In the GCP console, select your organization. Navigate to **All** to view the list of projects, folders, and the organization itself. Locate and copy the `ID` of the organization.

![Get GCP Organization ID](/images/docs/guardrails/guides/gcp/import-gcp-organization/saas-workspace/get-gcp-org-id.png)

## Step 5: Import Organization into Guardrails

Log into the Guardrails console with provided local credentials or by using any SAML based login and select the **CONNECT** card.

![Select Connect](/images/docs/guardrails/guides/gcp/import-gcp-organization/saas-workspace/select-connect.png)

Select **GCP** and then choose the **GCP Organization** option.

![Select GCP](/images/docs/guardrails/guides/gcp/import-gcp-organization/saas-workspace/select-gcp.png)

- Choose the [folder](/guardrails/docs/concepts/resources/hierarchy#folders) where the GCP organization will be imported.

- Choose one of the `Access modes` from the provided list. In this guide, **Service Account impersonation** is demonstrated.

- Provide the `Organization ID` for your GCP organization and the `Client email`. Guardrails will use this email ID for impersonation.

![Provide GCP Org Details](/images/docs/guardrails/guides/gcp/import-gcp-organization/saas-workspace/gcp-org-details.png)

Proceed for setting up Service Account Impersonation.

## Step 6: Setup Service Account Impersonation

- The **impersonating** user or service account (i.e. `the identity that runs Guardrails`) must have the **Service Account Token Creator** role (`roles/iam.serviceAccountTokenCreator`) on the target service account.

- The **target** service account just created for organization importing purpose i.e. the one being impersonated must have the **required organization-level permissions** as as described in [What Permissions to Grant](#required-permissions-on-service-account) to discover or manage resources across your GCP Organization.

In the same page, select **Copy gcloud command**.

![Generate Service Account Impersonation](/images/docs/guardrails/guides/gcp/import-gcp-organization/saas-workspace/generate-service-account-impersonation.png)

Now execute copied command using [gcloud CLI](https://cloud.google.com/sdk/docs/install) in your local environment.

```bash
# Replace SERVICE_ACCOUNT_NAME and PROJECT_ID with your service account's name/project
# Replace IMPERSONATOR_EMAIL with the user or service account that will impersonate it

gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com --member="user:IMPERSONATOR_EMAIL" --role="roles/iam.serv
```

Validate the output.

```
⇒ gcloud iam service-accounts add-iam-policy-binding mrk-sa-test@mrk-sandbox.iam.gserviceaccount.com --member=serviceAccount:integration-gcp@turbot-guardrails-dev.iam.gserviceaccount.com --role=roles/iam.serviceAccountTokenCreator --format=json
Updated IAM policy for serviceAccount [mrk-sa-test@mrk-sandbox.iam.gserviceaccount.com].
{
  "bindings": [
    {
      "members": [
        "serviceAccount:integration-gcp@turbot-guardrails-dev.iam.gserviceaccount.com"
      ],
      "role": "roles/iam.serviceAccountTokenCreator"
    }
  ],
  "etag": "BwYsqn0-odQ=",
  "version": 1
}
```
## Step 7: Create External ID Label

The `External ID label` acts as a key service account identifier within the project that your service account belongs to. Create a label with the key `guardrails_external_id` and value: `turbot_162167737252865_f1da2779-92c8-46b1-83dd-95d629023211`. This value is randomly populated by Guardrails.

> [!NOTE]
> The `Label` key and the highlighted portion of the value (i.e., `turbot_162167737252865` in the format `turbot_{current workspace id}`) cannot be modified. However, the third part of the text can be customized by clicking the `Customize` icon.

![Generate External ID Label](/images/docs/guardrails/guides/gcp/import-gcp-organization/saas-workspace/generate-external-id-label-and-create.png)

Log in to the GCP console and navigate to the project where the configured service account resides. Select **Labels** from the side navigation panel, add `guardrails_external_id` as the label key, and `turbot_162167737252865_f1da2779-92c8-46b1-83dd-95d629023211` as the value. Click **+Add label** to save the label.

![Create GCP Label](/images/docs/guardrails/guides/gcp/import-gcp-organization/saas-workspace/gcp-label-creation.png)

> [!WARNING]
> The `External ID` label created for this organization import must be retained within the respective GCP project to prevent errors in Guardrails.

## Step 8: Exclude Projects

This step is required if you wish to exclude specific projects or folder under organization from being imported into Guardrails.

> [!IMPORTANT]
> Existing projects already connected individually in Guardrails will automatically move under the organization hierarchy. If you **do not wish to move them**, list them in the YAML exclusion list.

Click the **Edit** button to provide a list of project IDs or folder names under the organization to be excluded.

![Edit Exception List](/images/docs/guardrails/guides/gcp/import-gcp-organization/saas-workspace/exception-list-with-connect.png)

Click the **Preview** button to ensure no errors are displayed. Move to [Step 14](#step-14-initiate-connect).

## Step 9: Start Import

Click **Connect** to begin the import process.

![Connect to Import](/images/docs/guardrails/guides/gcp/import-gcp-organization/saas-workspace/connect.png)

Guardrails will create and execute discovery controls for your GCP Organization, scanning each folder, project and resources under it.

![Check Discovery process](/images/docs/guardrails/guides/gcp/import-gcp-organization/check-discovery-process.png)

## Review

- [ ] Confirm that the organization CMDB and discovery controls are in the `OK` state.

Navigate to the **Resources** tab, search for the organization name, then select **Controls** tab besides to check the controls are on `OK` state.

![Review Org CMDB and Discovery Controls](/images/docs/guardrails/guides/gcp/import-gcp-organization/saas-workspace/review-org-cmdb-discovery-controls.png)

- [ ] Verify that the projects and folders are successfully imported into Guardrails and match the GCP console.

Navigate to the **Resources** tab, search for the organization name to check the list of resources the import process is discovered matching to the structure in GCP console.

![Review GCP Org Resources](/images/docs/guardrails/guides/gcp/import-gcp-organization/saas-workspace/review-gcp-org-resources-imported.png)

## Next Steps

- Learn how to [Enable GCP Services in Guardrail](guides/gcp/services#enabling-gcp-services-in-guardrails).
- Learn how to [Configure Real-Time Event Handlers](guides/gcp/real-time-events).

## Troubleshooting

| **Issue**                                | **Description**                                                                                                                                                                                                                                      | **Guide**                                                                                                                                                          |
|------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Access Denied: Missing Token Creator Role | If using Service Account Impersonation, the impersonating user or workload must have `roles/iam.serviceAccountTokenCreator` on the service account.                                                                                                 | Refer to the [Service Account Token Creator Role Documentation](https://cloud.google.com/iam/docs/impersonating-service-accounts).                                 |
| Access Denied: Malformed Secret Key  | Guardrails requires the multi-line format of the Secret Key. Ensure it includes the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` headers.                                                                                          |                                                          |
| Access Denied: Improper Client Email | Guardrails cannot use a non-service account email to access the project. Ensure the Client Email is in the form of `{identifier}@{your-project-id}.iam.gserviceaccount.com`.                                                                         | [Check GCP Service Account Documentation](https://cloud.google.com/iam/docs/service-accounts).                                                                                                         |
| Access Denied: Missing or Insufficient Permissions | If Guardrails is asked to discover, track, or remediate resources without the necessary permissions, `access denied` errors will appear in the Discovery and CMDB controls in the Guardrails console. Resolve by granting the required permissions. |                                                                                   |
| Lots of Controls in Error State      | If there were issues with credentials during project import, many Discovery controls may show an `error` state. You can either delete and reimport the project or rerun the controls in `error` using scripts provided in the Guardrails Samples Repo. | Use the [Python](https://github.com/turbot/guardrails-samples/tree/main/api_examples/python/run_controls), [Node](https://github.com/turbot/guardrails-samples/tree/main/guardrails_utilities/python_utils/run_controls_batches), or [Shell](https://github.com/turbot/guardrails-samples/tree/main/guardrails_utilities/shell_utils/run-controls) scripts. |
| GCP Service API Enabled Policies Aren't Set | If the `GCP > {Service} > API Enabled` policy is not set to `Enforce: Enabled`, Discovery and CMDB controls will be `skipped`. Enable the applicable service APIs manually if Guardrails lacks permissions to do so.                                  | [Enable GCP APIs Documentation](https://cloud.google.com/apis).
| Bad Request: Error processing runnable input organizationcredentials	`Cloud Resource Manager API has not been used` in project 265919997400 before or it is disabled.| If Guardrails import process errors out in CMDB and discovery control run. | Enable it by visiting https://console.developers.google.com/apis/api/cloudresourcemanager.googleapis.com/overview?project=265919997300 then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.|                                                                  |
| Further Assistance                  | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                                                                               | [Open Support Ticket](https://support.turbot.com).                                                                                                               |
