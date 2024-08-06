---
title: "Connect Azure Resources into Guardrails"
template: Documentation
nav:
  title: "Import Azure Resources"
  order: 1
---

# Connect Azure Resources to Guardrails

Azure Tenants, Management Groups, Active Directory, and Subscriptions can be
imported individually if desired, but in each scenario it will require the
organization to create an App Registration for Guardrails in Entra ID. This allows Guardrails to describe and inventory resources in
the environment.

Remember that [Mods](mods) enable Turbot to work in the cloud environment. Refer
to the [Recommended Starting Mods](mods#recommended-starting-mods) for more
information.

## Creating a Guardrails App Registration

An app registration is required to connect any Azure resource to Guardrails. It's the same process to connect tenants, management groups, EntraID Directories or subscriptions.

1. Login to the [Azure portal](https://portal.azure.com/).
2. Navigate to
   [Azure Active Directory > App Registrations](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps).

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

3. Copy the both the **Directory (tenant) ID** and the **Application (client) ID** from the page that appears after successful creation of the app registration. These strings will be used later when connecting Guardrails to the Azure resource. 
   

## Create Client Secret
1. Go to the "Certificats and Secrets" sidebar item. 
2. Click on the "Client Secrets" tab
3. Click "+ New client secret".  Provide a description and expiration period that matches organizational policy.
4. Save the Client Secret Value for later use. The Secret ID is not used by Guardrails. 
     

## Microsoft Graph API Permissions
API permissions are required when importing a Tenant, Management Group or EntraID Directory.  Skip this section if import a subscription. 
1. Navigate to the **Azure Active Directory** service, select the Guardrails app registration.
2. Click **API Permissions** on the left side. If there are any existing permissions,
   remove them by clicking the three dot menu icon and selecting **Remove
   Permission**. 
3. Add the following API Permissions using the **+ Add a
   permission** button.

   - Microsoft Graph
     - Application Permissions
       - Directory
         - Directory.Read.All (Read directory data)

   **Note**: After adding the above permissions, please remember to grant admin
   consent by clicking on the button `Grant Admin consent for <directory name>`.

## Custom IAM Role
Guardrails 
A custom role must be created to allow Turbot to manage the Service Principal
   (App Registration). This can be done easily by utilizing the embedded bash
   shell in the Azure portal.

   - Click the Shell icon in the top right, next to the search bar.
   - Select the `Bash` option. If an option is not presented, ensure that bash
     is selected in the dropdown menu in the top left of the shell.
   - Create and open a JSON file using the text editor of choice. For example,
     enter `vim turbot_role.json` into the shell terminal then hit enter.
   - Copy paste the JSON below into the new text file. Be sure to add the
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

   - To create the role, copy the bash command
     `az role definition create --role-definition &lt;name.json&gt;` into the
     shell, changing &lt;name.json&gt; to the name of the file created in the
     previous step. Hit enter to create the role.

6. This new role must be assigned in the **Tenant Root Group**. This can only be
   done if the logged in user has **Access management for Azure resources**
   option set to **Yes**. If there is any question if a global administrator has
   the correct access, refer to Microsoft's
   [guide on elevating access for a Global Administrator](https://docs.microsoft.com/en-us/azure/role-based-access-control/elevate-access-global-admin).
   If permissions had to be assigned, be sure to log out and log back in to
   refresh the permission set.
    - Once access has been verified, navigate to the **Management groups**
      application in the Azure portal.
    - Next to the title **Tenant Root Group**, the word **details** should be
      clickable. If not, wait for a few minutes as permissions can take some time
      to propagate.
    - Select the **Access control (IAM)** tab on the left side.
    - Towards the top left, click **+ Add** and select the **Add Role
      Assignment** option. This opens a new overlay on the right side.
    - In the **Role** dropdown, type the title of the role created in step 5.
      Note that this search is case-sensitive!
    - Leave the **Assign access to** field as default, then search for the Turbot
      Service principal (App registration) that was created in step 2.
    - Click **Save** at the bottom to confirm the role assignment.

The role grants access to Guardrails for discovering Management groups and
Subscriptions. Guardrails will also need grants to access Subscription resources,
which can be done at Tenant, Management Group, as well as the individual
subscription level. Depending on the control objectives of the organization, the
required role(s) will vary.

| **Turbot Mode**          | **Real-Time Events** | **Required Permission** | **Description**                                         |
| ------------------------ | -------------------- | ----------------------- | ------------------------------------------------------- |
| Read/Write + Permissions | Event Handler        | Owner                   | Detective controls, enforcements and manage permissions |
| Read/Write               | Event Handler        | Contributor             | Detective controls and enforcements                     |
| Read/Write               | Event Poller         | Contributor             | Detective controls and enforcements                     |
| Read-Only                | Event Handler        | Reader + Custom Role    | Detective controls                                      |
| Read-Only                | Event Poller         | Reader + Custom Role    | Detective controls                                      |

#### Custom Read-only Role

Notice that for **Read-Only** mode, a custom role is required. Below is an
example of a role that would allow Turbot to discover resources in Azure, but
not make changes:

```json
{
  "Name": "turbot_reader",
  "Description": "Basic Permissions needed for Reader access",
  "Actions": [
    "*/read",
    "Microsoft.Storage/storageAccounts/listkeys/action",
    "Microsoft.KeyVault/vaults/secrets/read",
    "Microsoft.KeyVault/vaults/read"
  ],
  "NotActions": [],
  "DataActions": [],
  "NotDataActions": [],
  "AssignableScopes": [
    "/providers/Microsoft.Management/managementGroups/<<Tenant ID>>"
      ## OR ##
    "subscriptions/<<Subscription ID>>"
  ]
}
```

For those who do not wish to grant `storageAccounts/listkeys`, set the
[Azure > Storage > Queue > CMDB](/guardrails/docs/mods/azure/azure-storage/policy#azure--storage--queue--cmdb)
policy to `Skip` to avoid discovery errors. Queue discovery and management is
not possible without `listkeys` permissions.

Review the documentation for
[Azure custom roles](https://docs.microsoft.com/en-us/azure/role-based-access-control/custom-roles)
for the various different ways a custom role can be created.

**Note**: All child resources will inherit any access granted on parent
resources.

## Connect Guardrails to Azure
Now 
- [Connect Tenant](integrations/azure/import/tenant)
- [Connect Management Group](integrations/azure/import/management-group)
- [Connect Active Directory](integrations/azure/import/active-directory)
- [Connect Subscriptions](integrations/azure/import/subscription)