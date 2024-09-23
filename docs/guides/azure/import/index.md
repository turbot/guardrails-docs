---
title: "Import Azure Resources into Turbot"
template: Documentation
nav:
  title: "Import Azure Resources"
  order: 1
---

# Import Azure Resources into Turbot

Azure Tenants, Management Groups, Active Directory, and Subscriptions can be
imported individually if desired, but in each scenario it will require the
organization to create a **Turbot Service Principal**, also known as an **App
Registration** in Active Directory. This allows Turbot to describe resources in
the environment.

Once the Service Principal is created and required permissions are set, Tenants,
Management Groups, Active Directory, and Subscriptions can be imported into
Turbot.

- [Tenant](guides/azure/import/tenant)
- [Management Group](guides/azure/import/management-group)
- [Active Directory](guides/azure/import/active-directory)
- [Subscriptions](guides/azure/import/subscription)

Remember that [Mods](https://hub.guardrails.turbot.com/#mods) enable Turbot to work in the cloud environment. Refer
to the [Recommended Starting Mods](mods#recommended-starting-mods) for more
information.

## Creating a Turbot Service Principal (App Registration)

Before importing an Azure Tenant, a service principal must be created with the
appropriate access. This is also known as an **App Registration**.

1. Login to the [Azure portal](https://portal.azure.com/).
2. Navigate to
   [Azure Active Directory > App Registrations](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps).

   - Click **New registration**.
   - Name the application. For example, **Turbot Application**.
   - Under the **Supported Account Types** option, choose which type of account
     can access the Turbot application. Generally, the default option **Accounts
     in this organizational directory only (Default Directory only - Single
     tenant)** will be the correct choice. If multiple Azure tenants will need
     access, select the second option.
   - Under Redirect URI, select **Web** for the type of application you want to
     create. Enter the URI of your Turbot console. After setting the values,
     select Register.

3. It is necessary to pass both the **Directory (tenant) ID** as well as the
   **Application (client) ID** and secret into Turbot for authentication. These
   strings can be found using the following steps.

   - Directory (tenant) ID and Application (client) ID:
     - Select **Azure Active Directory**.
     - Navigate to the new application by going to the **Azure Active
       Directory** -> **App registrations** page.
     - Copy the **Directory (tenant) ID** and store it in a temporary text file.
     - Copy the **Application (client) ID** and store it in a temporary text
       file.
   - Client Secret:
     - Select **Azure Active Directory**.
     - Navigate to the new application by going to the **Azure Active
       Directory** -> **App registrations** page.
     - Click on **Certificates and Secrets**.
     - Create the **New client Secret** button.
     - After adding the client secret, the value of the client secret is
       displayed. Copy this value and store it in a temporary text file. The
       secret will be hidden after leaving this page. If the secret is lost,
       simply delete the existing one and create a new one.

4. API permissions in the Turbot application must be assigned. Navigate to the
   **Azure Active Directory** service, select the Turbot application, then click
   **API Permissions** on the left side. If there are any existing permissions,
   remove them by clicking the three dot menu icon and selecting **Remove
   Permission**. Add the following API Permissions using the **+ Add a
   permission** button.

   - Microsoft Graph
     - Application Permissions
       - AuditLog
         - AuditLog.Read.All (Read all audit log data)
       - Directory
         - Directory.Read.All (Read directory data)
       - Organization
         - Organization.Read.All (Read organization information)

   **Note**: After adding the above permissions, please remember to grant admin
   consent by clicking on the button `Grant Admin consent for <directory name>`.

5. A custom role must be created to allow Turbot to manage the Service Principal
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
     "Name": "Turbot Management Group Role",
     "IsCustom": true,
     "Description": "Used by Turbot for Tenant Import",
     "Actions": ["Microsoft.Management/getEntities/action"],
     "NotActions": [],
     "AssignableScopes": [
       "/providers/Microsoft.Management/managementGroups/<<Tenant ID>>"
     ]
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
     Note that this search is case sensitive!
   - Leave the **Assign access to** field as default, then search for the Turbot
     Service principal (App registration) that was created in step 2.
   - Click **Save** at the bottom to confirm the role assignment.

### Final Step: Turbot Mode

The role grants access to Turbot for discovering Management groups and
Subscriptions. Turbot will also need grants to access Subscription resources,
which can be done at Tenant, Management Group, as well as the individual
subscription level. Depending on the control objectives of the organization, the
required role(s) will vary:

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
