---
title: Group Sync
sidebar_label: Group Sync
---

# Azure AD Group Sync

This guide will detail how to sync Azure AD groups to Guardrails, allowing administrators to grant permissions to resources based off of said groups rather than individually assigning to users.

This guide assumes that the Azure AD directory is configured in Guardrails and it has been verified that users can log in.

## Configure Guardrails Directory for Groups

**The mod @turbot/turbot-iam must be on version 5.6.0 or above to enable group syncing!**

1. Navigate to the **Permissions** tab in Guardrails (designated with a user icon) and then click **Directories**.
2. Select the pencil icon in line with the Azure AD directory. This will bring up the directory edit window.
3. Open the **Groups** section and fill in the required values.
    * Profile Groups Attribute: This value should match the name that was configured in the SAML app. Typically, this will be `memberOf`.
    * Group Filter: An optional field that accepts a regex expression, which will limit the groups that Guardrails will sync. Leave this blank if all groups should be added.
    * Allow Group Syncing: Set this to `Enabled`.
4. Click **Update** to save the configuration.

Congrats! The Azure AD directory in Guardrails is now ready to sync directories. However, the Azure AD must be configured such that Guardrails can parse the response.

## Configure Group Attributes in Azure AD

This will require rights in Azure that allow modification to the Guardrails application.

1. Log into the Azure portal with sufficient rights and type **Enterprise Applications** into the search bar. Select the **Enterprise Applications** option.
2. With **All Applications** selected on the left side menu, search for the relevant Guardrails Azure AD SAML application.
3. Under **Manage**, find the **Single sign-on** menu, then click edit for the **User Attributes & Claims**.
4. Modify the additional claims to match this screenshot:

![group-claims](/images/docs/guardrails/group-claims.png)

5. Ensure that the desired users and groups are added to the Guardrails SAML app in Azure AD. Failure to have users and groups provisioned for the application will cause issues with Guardrails recognizing who belongs to what groups and will prevent access into Guardrails via Azure AD. More information can be found in the Microsoft documentation, [Managing user assignment for an app in Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/assign-user-or-group-access-portal).

**Note:** SAML will sync groups upon login and will NOT fetch groups. As users log in over time, groups will be added when new ones appear. Once the group has been created in Guardrails, it can be used to assign permissions to resources.
