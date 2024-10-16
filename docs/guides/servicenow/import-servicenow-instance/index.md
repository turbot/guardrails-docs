---
title: "Importing a ServiceNow instance into Guardrails"
template: Documentation
nav:
  title: "Importing Accounts"
  order: 20
---

# Importing a ServiceNow instance into Guardrails

## Prerequisites to import a ServiceNow instance

### Turbot Guardrails Workspace Setup

Before you get started, your Turbot Guardrails workspace will require [mods](https://turbot.com/guardrails/docs/mods) to be installed so the features are available to you in the console and API.

#### Install the ServiceNow Turbot Guardrails Mod

Guardrails requires a number of mods for the ServiceNow integration to work.  Install these mods:
1. **ServiceNow Mod**: Install the `turbot/servicenow` mod.  This mod is required by all other ServiceNow mods.  The `turbot/servicenow` mod is required to import ServiceNow instances into a Guardrails workspace. It must be [installed](https://turbot.com/guardrails/docs/mods/guide/install) before a ServiceNow instance import can start. Ensure it is installed and the Mod installed control is in the green `ok` state.
2. **Cloud Platform ServiceNow Mods**: Install the platform specific ServiceNow mods relevant to your organization:
   - AWS: `turbot/servicenow-aws`
   - Azure: `turbot/servicenow-azure`
   - GCP: `turbot/servicenow-gcp`
3. **Cloud Service ServiceNow Mods**: Install cloud service specific ServiceNow mods:
   - Install the `turbot/servicenow-{platform}-{service}` mod(s) for the platform services that your organization wants to sync to ServiceNow.

Note: The installation of other `turbot/servicenow*` mods such as `turbot/servicenow-aws`, `turbot/servicenow-ec2`, etc are specific to the [syncing cloud resources](https://turbot.com/guardrails/docs/guides/servicenow/guardrails-to-servicenow-sync) from AWS, Azure or GCP with Turbot Guardrails to ServiceNow. These are only required if you are enabling those features.

Once the `turbot/servicenow` mod is installed, you should be able to see a new option in your `https://{turbot-workspace-url}/apollo/accounts/import`

<img src="/images/docs/guardrails/guides/servicenow/import-servicenow-instance/turbot-guardrails-servicenow-instance-import.png" style={{ boxShadow: 'none', width: 'auto', height: 'auto' }} />

The following section will cover how to obtain the details from ServiceNow to fill in the Account Import screen.

### ServiceNow Instance Setup

Your ServiceNow environment will require some configuration before you import it into Guardrails:

1. **ServiceNow Instance URL**: Note the URL of your ServiceNow instance (e.g. https://myinstance.service-now.com)
2. Application scope is the identifier of your application setup for Turbot Guardrails.
3. System Account for a username & password.
4. OAuth Application for a client ID & client secret

#### Create a ServiceNow Application

You can leverage an existing ServiceNow Application or create a new one. Turbot recommends creating a new application specifically for Turbot Guardrails to scope all Guardrails related work within a specific scope.

There are a few ways to create an application in ServiceNow, example for creating an app through App Studio in the [Vancouver release](https://docs.servicenow.com/bundle/vancouver-application-development/page/build/app-engine-studio/task/create-app-scratch.html). Depending on which ServiceNow release version you have installed, and which method you choose to add an application may differ. Below is a common approach to creating an application for reference:

To create a new Application:

1. Login to your ServiceNow instance via admin (or an equivalent) user.
2. Click on the globe icon in the top-right corner to view the current Application Scope.

<img src="/images/docs/guardrails/guides/servicenow/import-servicenow-instance/turbot-guardrails-servicenow-application-scope.png" style={{ boxShadow: 'none', width: '75%', height: '75%' }} />


3. Click on the `Application scope: <App Name>` and click `Open list`. This will take you to the list of applications that you currently have in your instance.

<img src="/images/docs/guardrails/guides/servicenow/import-servicenow-instance/turbot-guardrails-servicenow-application-scope-2.png" style={{ boxShadow: 'none', width: '50%', height: '50%' }} />

4. Click on `New` to create a new application then `Start from scratch`.

<img src="/images/docs/guardrails/guides/servicenow/import-servicenow-instance/turbot-guardrails-servicenow-application-scope-3.png" style={{ boxShadow: 'none', width: 'auto', height: 'auto' }} />

5. Give a relevant name for the application (e.g. Guardrails Application), do not update/remove the Scope, and click `Create`.

<img src="/images/docs/guardrails/guides/servicenow/import-servicenow-instance/turbot-guardrails-servicenow-application-scope-4.png" style={{ boxShadow: 'none', width: '75%', height: '75%' }} />

6. Once the application is created, save the application scope (e.g. `x_1178573_guardrai`) off to the side to be used later while importing a ServiceNow instance into a Guardrails workspace.

#### Create a ServiceNow Service Account

A ServiceNow service account will allow Guardrails authorization to ServiceNow and make relevant API calls to manage resources.

To create a new Service Account:

1. In the `All` dropdown menu, search for `User Administration`, scroll down and select `Users` under `User Administration`.

<img src="/images/docs/guardrails/guides/servicenow/import-servicenow-instance/turbot-guardrails-servicenow-system-account.png" style={{ boxShadow: 'none', width: '50%', height: '50%' }} />

2. Click on `New` on the top right to create a new Service Account.
3. Enter an appropriate User ID (e.g. `Guardrails Service Account`) along with other relevant details optional to define.
4. Check the check-box for `Web service access only`.
5. Ensure `Active` and `Web service access only` are both checked.
6. Click `Submit` to create a new Service Account.

<img src="/images/docs/guardrails/guides/servicenow/import-servicenow-instance/turbot-guardrails-servicenow-system-account-2.png" style={{ boxShadow: 'none', width: 'auto', height: 'auto' }} />

7. To create/generate a password for the Service Account, open the Service Account you created above from Users page and click on `Set Password`. Save the password off to the side to be used later while importing a ServiceNow instance into a Guardrails workspace.

<img src="/images/docs/guardrails/guides/servicenow/import-servicenow-instance/turbot-guardrails-servicenow-system-account-3.png" style={{ boxShadow: 'none', width: 'auto', height: 'auto' }} />

8. You'd want to add the `admin` role to the Service Account which will allow Guardrails to manage and sync records correctly in ServiceNow. To add the `admin` role, click on the `Roles` tab for the Service Account and click on `Edit`.

<img src="/images/docs/guardrails/guides/servicenow/import-servicenow-instance/turbot-guardrails-servicenow-system-account-4.png" style={{ boxShadow: 'none', width: 'auto', height: 'auto' }} />

9. Add the `admin` role and `Save`.

<img src="/images/docs/guardrails/guides/servicenow/import-servicenow-instance/turbot-guardrails-servicenow-system-account-5.png" style={{ boxShadow: 'none', width: '75%', height: '75%' }} />


> [!NOTE]
> We recommend the admin role for getting started to avoid access constraints as you are getting started. However your team can evaluate role & permissions options to narrow the scope of the role as appropriate.

#### Create a ServiceNow OAuth Application

An OAuth application will allow Guardrails to generate a Bearer Token to make API calls to ServiceNow using the service account you created in the above steps.

To create an OAuth application:

1. Search for `Application Registry` in the `All` dropdown menu and select `Application Registry` under `System OAuth`.

<img src="/images/docs/guardrails/guides/servicenow/import-servicenow-instance/turbot-guardrails-servicenow-oauth-app.png" style={{ boxShadow: 'none', width: '50%', height: '50%' }} />

2. Click on `New` and select `Create an OAuth API endpoint for external clients`.

<img src="/images/docs/guardrails/guides/servicenow/import-servicenow-instance/turbot-guardrails-servicenow-oauth-app-2.png" style={{ boxShadow: 'none', width: '50%', height: '50%' }} />

3. Give a relevant name (e.g Guardrails OAuth Application).
4. Set the `Accessible from` to `All application scopes`.
5. You can update the Refresh Token Lifespan and Access Token Lifespan per your preference.
6. Click on Submit to create the OAuth application.
7. Save the Client ID and Client Secret off to the side to be used later while importing a ServiceNow instance into a Guardrails workspace.

<img src="/images/docs/guardrails/guides/servicenow/import-servicenow-instance/turbot-guardrails-servicenow-oauth-app-3.png" style={{ boxShadow: 'none', width: 'auto', height: 'auto' }} />

#### Create a row in the User Preference table
Guardrails requires a row in the `User Preferences` table for the Service Account created previously. This can be done one of two ways:
1. Log into the ServiceNow instance as the service account. ServiceNow will automatically create a row in the User Preferences table.
2. Or, manually create a row in the `User Preferences` table.


To manually create a row in `User Preferences` for the Guardrails user, do the following:
1. In the "All" menu in the top left corner, search for "User Preferences".
2. In the User Preferences table, click "New" in the top right corner.
3. Put "apps.current_app" into the "Name" field.
4. Lookup the name of the Guardrails Service User in the "User" field and select it.
5. Ignore the "Value" field.  If ServiceNow requires a value, any random string will do.  Guardrails will automatically update this value later.
6. Verify that a new row exists with a Name of "apps.current_app" and a User that matches the name of the Guardrails Service User.  If the row exists, proceed with the rest of configuration.

## Import a ServiceNow instance

Now that you have the ServiceNow Turbot Guardrails mod (`@turbot/servicenow`) installed in Guardrails, and you have your ServiceNow configurations from the prior steps above; e.g. `URL`, `Application Scope`, Service Account `Username & `Password`, and your OAuth application `Client ID`and`Client Secret`, you should be ready to import your ServiceNow instance.

### Import a ServiceNow instance via Guardrails UI

To import a ServiceNow Instance in a Guardrails workspace from the console / UI:

1. From your Guardrails homepage, select the purple `IMPORT` card.
2. On the `Account Import` page, select `ServiceNow Instance`.
3. Fill in the Parent Resource where you'd want your instance; typically this would be done at the `Turbot` root level of your hierarchy, however it can reside in a Folder instead.
4. Fill in the rest, `URL`, `Application Scope`, Service Account `Username & `Password`, and your OAuth application `Client ID`and`Client Secret`.
5. Click `Import` to associate your ServiceNow instance to your Turbot Guardrails workspace.

<img src="/images/docs/guardrails/guides/servicenow/import-servicenow-instance/turbot-guardrails-servicenow-instance-import-filled.png" style={{ boxShadow: 'none', width: 'auto', height: 'auto' }} />


You will then have your instance associated, under the main navigation Policies tab, the `ServiceNow > Config > *` policies are now set.

**Next Steps:**

1. Setup the [sync from ServiceNow resources to Turbot Guardrails](/guardrails/docs/guides/servicenow/servicenow-to-guardrails-sync) and or
2. Setup the [sync from cloud resources with Turbot Guardrails to ServiceNow](/guardrails/docs/guides/servicenow/guardrails-to-servicenow-sync)

We want to hear from you! Join our [Slack Community](https://turbot.com/community/join) `#guardrails` channel to ask questions and share feedback.
