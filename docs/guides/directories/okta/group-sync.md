---
title: Group Sync
sidebar_label: Group Sync
---

# Okta Group Sync

This guide will detail how to sync Okta groups to Guardrails, allowing administrators to grant permissions to resources based off of said groups rather than individually assigning to users.

This guide assumes that the Okta directory is configured in Guardrails and it has been verified that users can log in.

## Configure Guardrails Directory for Groups

**The mod @turbot/turbot-iam must be on version 5.6.0 or above to enable group syncing!**

1. Navigate to the **Permissions** (designated with a user icon) tab in Guardrails and then click **Directories**.
2. Select the pencil icon in line with the Okta directory. This will bring up the directory edit window.
3. Open the **Groups** section and fill in the required values.
    * Profile Groups Attribute: This value should match the name that was configured in the SAML app. Typically, this will be `memberOf`.
    * Group Filter: An optional field that accepts a regex expression, which will limit the groups that Guardrails will sync. Leave this blank if all groups should be added.
    * Allow Group Syncing: Set this to `Enabled`.
4. Click **Update** to save the configuration.

## Configure Groups in Okta

1. Create the required groups in Okta, have users assigned to said group, and assign the Guardrails SAML application to the group. Information about how to do this can be found on the [Okta Documentation](https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-groups-main.htm) website.
2. Once members are assigned and the group is assigned to the Guardrails application, navigate to Applications, select the Guardrails app, click the General tab, then select **Edit SAML Settings**.
3. Ensure that the **Attribute Statements** match the below screenshot. Additionally, it will be necessary to define a value in the **Group Attribute Statements** section. Note in the screenshot that the Group Attribute Statements the attribute statement is set as a **Basic** Name Format, and this example also has a filter, `Matches regex: .*turbot.*` This means that only groups with `turbot` in the name will be returned. This is something that  can AND should be changed to match the organization's specific configuration. If the desired result is to get ALL groups, simply use `.*` as the filter.

![group-claims](/images/docs/guardrails/group-claims.png)

**NOTE**: Make sure that the filter is set to `Matches regex` or it will not work!

4. Once the statements have been confirmed, click **Next** then **Finish**.
5. Log into Guardrails using Okta. Guardrails will create group profiles upon login. Once the group profile is created, it can be assigned to any resource level for access.

**Note:** SAML will sync groups upon login and will NOT fetch groups. As users log in over time, groups will be added when new ones appear. Once the group has been created in Guardrails, it can be used to assign permissions to resources.
