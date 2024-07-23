---
title: "Import a GCP Project into Guardrails"
template: Documentation
nav:
  title: "Import Project"
  order: 10
---

# Import a GCP Project into Guardrails

<div className="alert alert-warning">
This section details the steps required to import Google Cloud Platform resources into a Guardrails Folder. Alternatively, you can use the <a href="https://github.com/turbot/guardrails-samples/tree/master/baselines/gcp/gcp_project_import">GCP Import Baseline</a> which automates this process.
</div>

## Process Overview

### In the GCP Console

- Create a service account for Guardrails to use. Must be in the form of
  `{service-account-name}@{project_id}.iam.gserviceaccount.com`. Personal or
  corporate email addresses may not be used.
- Assign appropriate permissions to the Guardrails service account.
- Create a secret key.
- Enable the Cloud Resource Manager, and Service Management. Enable any other
  required Google APIs for GCP services that Guardrails may interact with.
  (**Note**: beyond the Cloud Resource Manager and Service Management APIs
  enabled, Guardrails can be configured to automatically enable other GCP APIs on
  your behalf).
- Ensure Billing is enabled.

### In the Guardrails Console

- If not installed already, install at least the
  [gcp](https://turbot.com/guardrails/docs/mods/gcp/gcp#turbotgcp) mod. Check out our
  [Mods recommendation](mods#recommended-starting-mods) page for more info on
  suggested mods to install alongside the base GCP mod.
- Import the project
- If not already complete, set the appropriate `GCP > {Service} > API Enabled`
  policies to `Enforce: Enabled`. Guardrails cannot complete the discovery process
  for services with disabled APIs.

### What Permissions to Grant

Which permissions you grant to Guardrails will depend on your organization's
requirements.

- **Full Remediation**

  - To take advantage of every GCP integration offered by Guardrails (recommended),
    assign the `Owner` role to the service account.

- **Mixed Remediation + Event Handlers**:

  - Customers can build a custom role or collection of standard roles that meet
    their requirements. Guardrails will use whatever permissions are granted. If
    Guardrails is asked to do something without sufficient permissions, then
    `Access Denied` errors will appear in the Guardrails console. Resolve these
    errors by granting additional permissions or altering the set Guardrails
    policies to match.

- **Readonly + Event Handlers**: To enable read-only access for Guardrails with
  Event Handler support, assign the following roles:

  - To get ReadOnly Access + Event Handlers, assign these roles:
    - `Viewer`
    - `Pub/Sub Admin`
    - `Logging Admin`
    - Or, to strictly limit Guardrails write access in the account to only event
      handling resources, build a role with the following permissions.
      Convenient Terraform templates can be found
      [below](#custom-roles-for-event-handling).
      - `Viewer`
      - [Logging](#logging) with condition:
        `resource.name.endsWith("turbot_gcp_event_sink")`
      - [Pub/Sub](#pubsub) with condition:
        `resource.name.startsWith("projects/_/topics/turbot_gcp_event_handler")`

- **Readonly + Event Pollers**: To enable read-only access for Guardrails with Event
  Poller support, assign the following roles:
  - `Viewer`
  - `Logging Read`
  - An additional custom role that includes the `pubsub.topics.getIamPolicy` and
    `storage.buckets.getIamPolicy` permissions. (Required for discovery on
    Pub/Sub Topics and Storage Buckets).

## Creating a Guardrails service account within the GCP Project

### Service Accounts

**Turbot Support recommends creating a service account for each project.** A discussion
of multiple projects per service account can be found in the
[service accounts](service-accounts) documentation.

### Creating a Service Account in the GCP Console

1. In the Google Cloud console, go to the Create service account page.
2. Go to Create service account and select a GCP project.
3. Enter a service account name to display in the Google Cloud console.
4. The Google Cloud console generates a service account ID based on this name.
   Edit the ID if necessary. You cannot change the ID later.
5. To set access controls now, click Create and continue and continue to the
   next step.
6. Choose one or more IAM roles to grant to the service account on the project.
   If necessary, create a custom role with the required permissions.
7. Click Done to finish creating the service account.
8. Create a
   [service account key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys#creating_service_account_keys).
   After key creation, download the JSON key type file.

Head on over to
[Google's documentation on creating a service account](https://cloud.google.com/iam/docs/creating-managing-service-accounts#creating)
if you need additional assistance. For info on creating the service role via the
CLI, refer to the bottom of this page.

#### Creating a Service Account via the GCloud CLI

If you do not have access to create the service account via the console, follow
these steps to create the service account, assign it the owner role, and
generate an access key. Then refer to above for account import.

1. Create a service account.

```bash
$ gcloud iam service-accounts create --project=your-project-id  guardrails-service-owner
Created service account [guardrails-service-owner].
```

2. Assign the owner role.

```bash
$ gcloud projects add-iam-policy-binding your-project-id --member=serviceAccount:guardrails-service-owner@your-project-id.iam.gserviceaccount.com --role=roles/owner
Updated IAM policy for project [your-project-id].
bindings:
- members:
  - serviceAccount:guardrails-service-owner@your-project-id.iam.gserviceaccount.com
etag: BwWK_UiAW44=
version: 1
```

3. Generate an access key for the service account.

```bash
$ gcloud iam service-accounts keys create --iam-account=guardrails-service-owner@your-project-id.iam.gserviceaccount.com key.json
created key [1402f86298e8a44e4d0a32cf5ec3a7241a4008cc] of type [json] as [key.json] for [guardrails-service-owner@your-project-id.iam.gserviceaccount.com]
```

4. The private_key in the key.json from the previous command will be a required
   secret to import the project into a Guardrails workspace. Guardrails will need the text in
   multi-line format. This simply means that the text cannot be a single, long
   string. For example, the private key might look as follows:

```bash
$ cat key.json | jq -r .private_key
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

### Custom Roles for Event Handling

The Guardrails GCP Event Handlers depend on the Pub/Sub and Logging services. The
custom role definitions and conditionals described below are sufficient to
manage the event handler infrastructure in the project.

#### Logging

The custom role below enumerates the required write permissions for GCP Logging.
These permissions assume that the Guardrails service role also has read-only access
to GCP Logging.

Condition: `resource.name.endsWith("turbot_gcp_event_sink")`

```hcl
resource "google_project_iam_custom_role" "guardrails_logging_role" {
  role_id     = "guardrails_logging"
  title       = "Guardrails Logging Maintainer"
  description = "A role for Guardrails to deploy, manage and destroy Logging resources for Guardrails Event Handling."
  permissions = [
    "logging.sinks.create",
    "logging.sinks.delete",
    "logging.sinks.update"
  ]
}
```

**Note**: While rare, if the
[GCP > Turbot > Event Handlers > Logging > Sink > Name Prefix](https://turbot.com/guardrails/docs/mods/gcp/gcp/policy#gcp--turbot--event-handlers--logging--sink--name-prefix)
policy is set to something other than the default value, the condition listed
above will need to be updated to the new prefix.

#### Pub/Sub

The custom role below enumerates the required write permissions for GCP Logging.
These permissions assume that the Guardrails service role also has read-only access
to GCP Pub/Sub.

Condition:
`resource.name.startsWith("projects/_/topics/turbot_gcp_event_handler")`

```hcl
resource "google_project_iam_custom_role" "guardrails_event_handler_role" {
  role_id     = "guardrails_event_handlers"
  title       = "Guardrails Event Handler Maintainer"
  description = "A role for Guardrails to deploy, manage and destroy for Pub/Sub resources for Guardrails Event Handler infrastructure."
  permissions = [
    "pubsub.subscriptions.create",
    "pubsub.subscriptions.delete",
    "pubsub.subscriptions.setIamPolicy",
    "pubsub.subscriptions.update",

    "pubsub.topics.attachSubscription",
    "pubsub.topics.detachSubscription",
    "pubsub.topics.create",
    "pubsub.topics.delete",
    "pubsub.topics.setIamPolicy",
    "pubsub.topics.update",
    "pubsub.topics.updateTag"
  ]
}
```

**Note**: While rare, if the
[GCP > Turbot > Event Handlers > Pub/Sub > Topic > Name Prefix](https://turbot.com/guardrails/docs/mods/gcp/gcp/policy#gcp--turbot--event-handlers--pubsub--topic--name-prefix)
policy is set to something other than the default value, the condition listed
above will need to be updated to the new prefix.

### Cloud Resource Manager and Service Management APIs

The Cloud Resource Manager and Service Management API will need to be enabled
for proper functionality.

- Via Console:

  1. Go to the **APIs & Services** service in the GCP console.
  2. Search for the Cloud Resource Manager API and select it.
  3. If it is not already enabled, click **Enable**
  4. Repeat steps 2 and 3 for the Service Management API.

- Via CLI:

1. Enable Cloud Resource Manager

```
$ gcloud services enable cloudresourcemanager.googleapis.com –-project=your-project-id
Operation "operations/acf.d2983634-c21e-480d-880f-16d060069925" finished successfully.
```

2. Enable Service Management

```
gcloud services enable servicemanagement.googleapis.com –-project=your-project-id
Operation "operations/acf.cecc205f-3e9f-4707-86b5-9b22ded3f8db" finished successfully.
```

### Enable Billing

Enable Billing for the project, if not already enabled. This may have been
enabled at the Organization level already.

1. Go to the **API Console**.
2. From the projects list, select the project that is being imported into
   your Guardrails workspace.
3. Open the console left side menu and select **Billing**.
4. Click **Enable billing**. (If billing is already enabled then this option
   isn't available.)
5. If you don't have a billing account, create one.
6. Select your location, fill out the form, and click Submit and enable billing.

[Go to GCP documentation](https://support.google.com/googleapi/answer/6158867?hl=en)
for more information regarding the billing API.

## Importing a GCP Project via the Guardrails Console

1. Login to your Guardrails workspace as a **Turbot/Owner** or **Turbot/Admin**.
2. Click the purple **Import** card in the top right of the landing page.
3. Click **GCP Project**.
4. Select the **Parent Resource** (the imported project will be a child of this
   resource)
5. Drop the JSON file saved in the above step into the account import screen.
   Alternatively, details can be manually entered using the **Advanced** tab.

![](/images/docs/guardrails/cred-file.png)

6. Click **Import** to start Guardrails discovery. You will be redirected to an
   account import splash page that shows you resources discovered in real time.
   If you see a large amount of errors, refer to the
   [troubleshooting](#troubleshooting) instructions below.

#### Importing the Project via Terraform

Customers wishing to import GCP projects using Terraform should refer to the
Guardrails Samples repo. A
[complete set of .tf and .tfvars](https://github.com/turbot/guardrails-samples/tree/master/baselines/gcp/gcp_project_import)
describe the Guardrails resources and policy settings required for GCP Project import.

## Troubleshooting

### Access Denied

The most common problem when importing a GCP project is `access denied` errors.
This can arise from three common errors. **Malformed Secret Key**: Guardrails
requires the multi-line format of the Secret Key. The beginning
`-----BEGIN PRIVATE KEY-----` and ending `-----END PRIVATE KEY-----` are
necessary.

**Improper Client Email**: Guardrails cannot use a non-service account email to get
access to the project. The Client Email must be in the form of
`{identifier}@{your-project-id}.iam.gserviceaccount.com`.

**Missing or Insufficient Permissions**: If Guardrails has been asked to discover,
track or remediate resources that it does not have permissions for, then
`access denied` errors will pop up for the GCP Discovery and CMDB controls in the Guardrails console. These should be
resolved as quickly as possible.

### Lots of Controls in Error state

If there were some initial problems with credentials after project import, there
may be a large number of Discovery controls in `error`. These can be resolved in
one of two ways. First, simply delete the project and reimport it with proper
credentials. Second, keep the project imported but rerun each control in `error`
using the run_controls scripts in the Guardrails Samples Repo available in
[Python](https://github.com/turbot/guardrails-samples/tree/master/api_examples/python/run_controls),
[Javascript](https://github.com/turbot/guardrails-samples/tree/master/api_examples/node/run-controls)
or
[shell](https://github.com/turbot/guardrails-samples/tree/master/api_examples/shell/run-controls).
The filter of `state:error` to rerun all controls in `error`.

### GCP Service API Enabled policies aren't set

- If the `GCP > {Service} > API Enabled` policy has not been set to
  `Enforce: Enabled` then the Discovery and CMDB controls will go to `skipped`
  for that Service's resources. Enable the `API Enabled` policy to resolve.
- If Guardrails does not have write permissions to enable APIs, then the applicable
  service API must be enabled manually.
