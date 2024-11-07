---
title: "Connect Azure Resources to Guardrails"
template: Documentation
nav:
  title: "Import Azure Resources"
  order: 1
---

# Connect Azure Resources to Guardrails

Azure Tenants, Management Groups, Active Directory, and Subscriptions can be
imported individually if desired, but in each scenario it will require the
organization to create an App Registration for Guardrails in Entra ID. This allows Guardrails to describe and inventory
resources in the environment.

Remember that [Mods](mods) enable Guardrails to work in the cloud environment. Refer
to the [Recommended Starting Mods](mods#recommended-starting-mods) for more information.

## Process Overview

Connecting an Azure resource to Guardrails involves a few steps. They are:

1. Create [App Registration](#creating-a-guardrails-app-registration) and [Client Secret](#create-client-secret)
2. Assign [API Permissions](#microsoft-graph-api-permissions)
3. Assign [Azure IAM Permissions](#assign-azure-iam-permissions). This may involve creating
   a [custom Read-Only IAM role](#custom-readonly-iam-role)
4. [Connect the Azure resource](#connect-azure-resources-to-guardrails) to Guardrails

## Creating a Guardrails App Registration

An app registration is required to connect any Azure resource to Guardrails. It's the same process to connect tenants,
management groups, Entra ID Directories or subscriptions.

1. Login to the [Azure portal](https://portal.azure.com/).
2. Navigate to
   [Microsoft Entra ID > App Registrations](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps).

    - Click **New registration**.
    - Name the application. For example, **Guardrails Application**.
    - Under the **Supported Account Types** option, choose which type of account
      can access the Guardrails application. Generally, the default option **Accounts
      in this organizational directory only (Default Directory only - Single
      tenant)** will be the correct choice. If multiple Azure tenants will need
      access, select the second option.
    - Under Redirect URI, select **Web** for the type of application you want to
      create. Enter the URI of your Guardrails console. After setting the values,
      select Register.

3. Copy the both the **Directory (tenant) ID** and the **Application (client) ID** from the page that appears after
   successful creation of the app registration. These strings will be used later when connecting Guardrails to the Azure
   resource.

## Create Client Secret

2. Navigate to [Microsoft Entra ID > App Registrations](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps) and select your Guardrails app registration.
1. Go to the "Certificates & secrets" sidebar item.
2. Click on the "Client Secrets" tab
3. Click "+ New client secret". Provide a description and expiration period that matches organizational policy.
4. Save the Client Secret Value for later use. The Secret ID is not used by Guardrails.

## Microsoft Graph API Permissions

API permissions are required when importing a Tenant, Management Group or EntraID Directory. Skip this section if import
a subscription.

2. Navigate to [Microsoft Entra ID > App Registrations](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps) and select your Guardrails app registration.
2. Click **API Permissions** on the left side. If there are any existing permissions,
   remove them by clicking the three dot menu icon and selecting **Remove Permission**.
3. Add the following API Permissions using the **+ Add a permission** button.

    - Microsoft Graph
        - Application Permissions
            - Directory
                - Directory.Read.All (Read directory data)

**Note**: After adding the above permissions, please remember to grant admin
consent by clicking on the button `Grant Admin consent for <directory name>`.

## Which Azure IAM Permissions to Grant

The Azure permissions granted to Guardrails depend completely on the organization's requirements. The table below shows
the permissions recommended for various levels of Guardrails interaction with Azure resources.

| **Guardrails Mode**      | **Required Permission**   | **Description**                                         |
|--------------------------|---------------------------|---------------------------------------------------------|
| Read/Write + Permissions | Owner                     | Detective controls, enforcements and manage permissions |
| Read/Write               | Contributor               | Detective controls and enforcements                     |
| Read/Write               | Contributor               | Detective controls and enforcements                     |
| Read-Only                | Reader and/or Custom Role | Detective controls                                      |

Turbot recommends that organizations craft a custom role to meet their individual least privilege requirements. The
Read-Only custom role described below should be used as a baseline.

## Custom ReadOnly IAM Role

The default `Reader` RBAC provides broad read-only access to all Azure resource types. However, there are few
permissions that Guardrails needs to inventory all resource types. The custom role described below grants read-only
access plus the extra permissions.

### Create the Role

The Read-Only custom role can be created easily in the embedded bash shell in the Azure portal.

- Click the Shell icon in the top right, next to the search bar.
- Select the `Bash` option. If an option is not presented, ensure that bash
  is selected in the dropdown menu in the top left of the shell.
- Create and open a JSON file using the text editor of choice. For example,
  enter `vim guardrails-readonly.json` into the shell terminal then hit enter.
- Paste the JSON below into the new text file. Be sure to add the
  **Tenant ID** to this text in the AssignableScopes attribute.

```json
 {
  "properties": {
    "roleName": "Guardrails ReadOnly Role",
    "description": "Used by Guardrails for ReadOnly Access to Azure resources",
    "assignableScopes": [
      "/providers/Microsoft.Management/managementGroups/<<Tenant ID>>"
    ],
    "permissions": [
      {
        "actions": [
          "*/read",
          "Microsoft.Management/getEntities/action",
          "Microsoft.Storage/storageAccounts/listkeys/action",
          "Microsoft.KeyVault/vaults/secrets/read",
          "Microsoft.KeyVault/vaults/read"
        ],
        "notActions": [],
        "dataActions": [],
        "notDataActions": []
      }
    ]
  }
}
```

Note: For those who do not wish to grant `storageAccounts/listkeys`, set the
[Azure > Storage > Queue > CMDB](https://hub.guardrails.turbot.com/mods/azure/policies/azure-storage/queueCmdb)
policy to `Skip` to avoid discovery errors. Queue discovery and management is
not possible without `listkeys` permissions.

Review the documentation for
[Azure custom roles](https://docs.microsoft.com/en-us/azure/role-based-access-control/custom-roles)
for the various different ways a custom role can be created.

- To create the role, run this command `az role definition create --role-definition guardrails-readonly.json` in the
  shell.

### Assign Azure IAM Permissions

The user provisioning Guardrails IAM permissions should have the **Access management for Azure resources**
option set to **Yes**. If there is any question if a global administrator has
the correct access, refer to Microsoft's
[guide on elevating access for a Global Administrator](https://docs.microsoft.com/en-us/azure/role-based-access-control/elevate-access-global-admin).
If permissions had to be assigned, be sure to log out and log back in to
refresh the permission set.

- Once access has been verified, navigate to the target Tenant, Management Group or Subscription
  application in the Azure portal.
- Select the **Access control (IAM)** tab on the left side.
- Towards the top left, click **+ Add** and select the **Add Role
  Assignment** option. This opens a new overlay on the right side.
- In the **Role** dropdown, type the title of the role created in step 5.
  Note that this search is case-sensitive!
- Leave the **Assign access to** field as default, then search for the Guardrails app registration that was created in
  step 2.
- Click **Save** at the bottom to confirm the role assignment.

**Note**: All child resources will inherit any access granted on parent resources. For example, granting `Reader` to
the Azure tenant grants the same permissions to all management groups and subscriptions.

## Connect Guardrails to Azure

With the App registration, API permissions and Azure IAM permissions, you're ready to connect the Azure resource to
Guardrails. Follow the appropriate instructions below.

- [Connect Tenant](integrations/azure/import/tenant)
- [Connect Management Group](integrations/azure/import/management-group)
- [Connect Active Directory](integrations/azure/import/active-directory)
- [Connect Subscriptions](integrations/azure/import/subscription)