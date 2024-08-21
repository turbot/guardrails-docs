---
title: Connect an Azure Account to Guardrails
sidebar_label: Connect an Azure Account to Guardrails
---


# Connect an Azure Subscription to Guardrails

  
**Prerequisites**:

Access to the Guardrails console with admin privilege, and a top-level `Sandbox` folder.

## Step 1: Create a App Registration and roles

### Register an app

Login to the Azure portal

Navigate to App Registrations in your organization’s Entra ID.

Click `New Registration`
<p><img alt="azure_new_registratration" src="/images/docs/guardrails/runbooks/getting-started-azure/connect-an-account/azure-new-registratration.png"/></p><br/>

Name the application. The name ought to be recognizable as a Guardrails registration and relevant to the subscription to be imported. Turbot recommends the naming convention `Guardrails - {Name of the subscription}`.

The Redirect URI is optional.  The Guardrails integration doesn’t use the redirect URL as a part of authentication. If you would like to include your Guardrails workspace hostname, this is a handy reference location.   
<p><img alt="register_the_app" src="/images/docs/guardrails/runbooks/getting-started-azure/connect-an-account/register-the-app.png"/></p><br/>

  
Click `Register`

  
Capture the Application (client) ID from the Overview tab.  Copy the Application (client) ID and Directory (tenant) IDs.  You will need them later.   
<p><img alt="capture_app_client_id" src="/images/docs/guardrails/runbooks/getting-started-azure/connect-an-account/capture-app-client-id.png"/></p><br/>

  


### Create a secret

  
Under the `Manage` sidebar item, go to `Certificates & secrets`. 

Go to the `Client Secrets` tab.   
  
Create a new secret and capture its Value.  Don’t use the Secret ID!.
<p><img alt="create_azure_secret" src="/images/docs/guardrails/runbooks/getting-started-azure/connect-an-account/create-azure-secret.png"/></p><br/>

### Assign Graph API permissions

  
Guardrails does not require any Microsoft Graph API permission to import a subscription. 

### Create a ReadOnly role

### Click the `Shell icon` in the portal at top right, next to the search bar.

Select `Bash`

In the cloud shell, create `turbot_reader_role.json`, swapping in your subscription id.  The Azure default `Reader` role does not include permissions to read `KeyVault Secrets` metadata (not the secret itself), so they are included here.   
  
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
    "/providers/Microsoft.Management/managementGroups/<<management group id>>"
  ]
}  
```

Run this command to create the role  
  
```
az role definition create --role-definition turbot_reader_role.json  
```

## Assign ReadOnly to the Guardrails App Registration

Go to the subscription that will be imported into Guardrails. 

In the left side-bar, go to `Access Control (IAM)`.

Click on `+ Add` then `Add role assignment`.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdA-5DNqVQhjGghFEoBbN0ktx9iGFii8hWo2G4bzPacpeH-3zjqOOCVxeOnBueMiC-nK69xRVhy3BR7KK0HqnCZliODws9D9AREzTdqjg_IKDRvi9LY6YLSngG3xuWwX6BDVOCbKDlJhnibSv3iaxiXqcQH?key=a-Pis7bB9qzmZZYFFEfFbA)

Find the `turbot_reader` custom role and select it. 

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXewlj1VGpdycG5y9IkHdfbsSJB_tdsOUzmr2p_IxQlIWswlzphfJiFJkl5chhaGhdju2pkfccBbslphGqBtDRiEa68gqXy3Djj0Q0j1qeWbOOhEHKQ1yVwl6PaMgBROpHGHHtzkMPANIPLlYFuM8W_bbhV9?key=a-Pis7bB9qzmZZYFFEfFbA)

Select the Guardrails App Registration from earlier.

 

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXetAaEUOpQPlB4xBz9O-z3ZSqPe_3dieeZaG-Py8Ux9P4tuzj-HGde9ntybjh0EB6-srltFtEqtCaSZW3PbZRv3WMKzLAUKRbisnyYBy6AlNBhIWoez-qaZOG1hZmiOa98EDgehEWKeL57XRwvwWIedpJdE?key=a-Pis7bB9qzmZZYFFEfFbA)

Complete the assignment process. 

If you can see the new role assignment, you are ready to connect the subscription to Guardrails

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdmox-4Fn1gErOLZ89lB7NtOqJX8j9DxfhisfSKIG79UzjFDiqeR1lEgQhVcoa6TpA__Z--avuAtKikm-QsTIcxNEMq0tJF8asebkSCT5yNACku1i58Jjg3AK12zuKcCt3dHyiR88a9qskRY64k_L5bzAtz?key=a-Pis7bB9qzmZZYFFEfFbA)

## Step 2: Connect the Azure subscription

Login to your Guardrails console.  You must have Turbot/Admin or Turbot/Owner permissions.

Click the purple `Connect` card in the top right corner. 
<p><img alt="top_level_connect" src="/images/docs/guardrails/runbooks/getting-started-azure/connect-an-account/top-level-connect.png"/></p><br/>

Select Azure Subscription

Choose the Parent Resource that will hold this subscription.  (While it’s possible to use the Turbot resource, it’s better to select a Guardrails Folder instead. The Sandbox folder is the easiest place to start.)  
  
Enter your subscription ID and tenant ID.

For client ID use the Application (client) ID of your registered Turbot app.   
  
For client key, use the Value (not the id) of the secret you created for the app.  
  
Select your environment (likely Global Cloud).
<p><img alt="ready_to_import" src="/images/docs/guardrails/runbooks/getting-started-azure/connect-an-account/ready-to-import.png"/></p><br/>

Click import and wait for the progress bar to complete
<p><img alt="azure_progress_bar" src="/images/docs/guardrails/runbooks/getting-started-azure/connect-an-account/azure-progress-bar.png"/></p><br/>

When the discovery process is complete, navigate to your imported subscription and look for the `CMDB` control. When it’s green, your subscription is successfully connected to Guardrails.
<p><img alt="azure_cmdb_check" src="/images/docs/guardrails/runbooks/getting-started-azure/connect-an-account/azure-cmdb-check.png"/></p><br/>  



## Progress tracker

1. **Connect an Azure Account to Guardrails**

2. [Observe Azure Resource Activity](/guardrails/docs/runbooks/getting-started-azure/observe-azure-activity/)
