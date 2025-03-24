---
title: Okta
sidebar_label: Okta
---

# Configuring Okta and Guardrails

This guide details configuring a Guardrails application in Okta as well as the
directory in Guardrails. Administrator access in Okta and Turbot/Owner permissions
in Guardrails are required for configuration.

If SAML group syncing is desired, check out our
[Okta Group Sync](okta/group-sync) guide after the SAML application has been
verified to allow authentication.

## Create the SAML App in Okta

1. Log into the Okta console with an account that has sufficient privileges to
   add applications.
2. Click the **Admin** button in the top right to go to the developer console.
3. At the developer console, hover over **Developer Console** and click
   **Classic UI**.
4. From the top menu, select **Applications**.
5. Select **Add Application**.
6. Click on **Create New App**.
7. In the New App dialog, select **Web** as the platform and **SAML 2.0** as the
   sign on method. Click **Create**.
8. Enter an appropriate app name (such as turbot-guardrails-okta) and click **Next**.
9. Enter any value in the **Single Sign on URL** and **Audiance URI (SP Entity
   ID)** text boxes. These will be updated with values obtained from Guardrails
   after creating the directory. Click **Next** then **Finish** to create the
   app.
10. The new Okta application will appear in your list of applications. Click the
    new application, go to the **sign on** tab, then click **View Setup
    Instructions**.
11. The following information will be needed to set up the directory in Guardrails:
    - Identity Provider Single Sign-On URL - this will be the `Entry point` for
      the Guardrails directory
    - Identity Provider Issuer - this will be the `Issuer` for the Guardrails
      directory
    - X.509 Certificate - this will be the `Certificate` for the Guardrails
      directory

## Create the directory in Guardrails

1. In Guardrails, navigate to the **Turbot** resource, then click on the
   **Permissions** tab (designated with a user icon), and finally on the
   **Directory** button.
2. Click **New Directory** and select **SAML**.
3. Enter the following information:
    - **Title**: The title for this directory that will display in the login screen
    - **Description**: A description for this directory
    - **Entry Point**: This is the identity provider's single sign on URL - In Okta,
      it's the **Identity Provider Single Sign-On URL** you obtained from the
      **View Setup Instructions screen**
    - **Issuer**: This is the identity provider issuer URL - In Okta, the **Identity
      Provider Issuer** is obtained from the **View Setup Instructions screen**. Be
      aware that if the value of this field points to `https://okta.com/{somelonghash}`
      instead of the Guardrails workspace URL then 'Strict Audience Validation'
      in the Advanced section below should not be enabled.
    - **Certificate**: This is the Certificate from the identity provider - In Okta,
      it's the X.509 Certificate you obtained from the **View Setup Instructions
      screen**
    - **Profile ID Template**: This can generally be left to the default value,
      `{{profile.email}}`. This is the unique ID that will be mapped to the Guardrails
      profile.
    - **Advanced > Allow IdP-Initiated SSO**: Administrators have the option to allow IdP-initiated Single Sign-On (SSO)
      logins.
      Allowing IdP-initiated SSO carries inherent security risks. The lack of an InResponseTo attribute means that
      Service Provider (SP)-solicited SAML assertions cannot be validated.
      Before enabling this feature, thoroughly assess the potential security implications of not verifying the
      InResponseTo field. Decisions regarding this setting are typically guided by an organization's security team, and
      should be confirmed to align with security protocols prior to implementing the directory.
        - **Troubleshooting**: If users encounter an error stating `InResponseTo is missing from response` during SAML
          login, it indicates that the IdP-initiated SSO option needs to be enabled. Select the "Enabled" option to
          resolve this problem.
      - **Advanced > Require Signed Authentication Response**: Enable this option if you require the SAML
             authentication response from your Identity Provider (IdP) to be signed, ensuring data integrity and
             authenticity. 
      - **Advanced > Strict Audience Validation**: Administrators have the
        option to enable strict audience validation. This should not be enabled
        if the `Issuer` field above does not match the workspace URL.
          - **Troubleshooting**: If users encounter an error stating `SAML assertion audience mismatch` during SAML
            login, it indicates that the Strict Audience Validation should be disabled. Select the "Disabled" option to
            resolve this problem.
4. Click **Create**.
5. The directory is now created and will appear in the list of directories. The
   directory can be activated immediately, but it will not function correctly
   until the SAML app is configured within the SAML application.
6. Click the **Edit** pencil next to the new directory. Scroll to the bottom of
   the window and copy the **Callback URL**. The format will look
   like `https://{workspaceURL}/api/latest/directories/{15digitID}/saml/callback`

## Re-configure SAML App in Okta

1. In Okta, navigate to the application created in the first part of this guide.
2. In the **General** tab, click **Edit** next to **SAML Settings**.

    - For the **Single sign on URL**, paste the **Callback URL** that was copied
      from the Guardrails directory.
    - For the **Audience URI (SP Entity ID)**, paste the **Issuer** URL that was
      entered into the Guardrails directory.
    - In the **Attribute Statements (Optional)** section, add the following:

   | Name        | Name Format | Value            |
   | ----------- | ----------- | ---------------- |
   | email       | unspecified | user.email       |
   | firstName   | unspecified | user.firstName   |
   | lastName    | unspecified | user.lastName    |
   | login       | unspecified | user.login       |
   | displayName | unspecified | user.displayName |

    - NOTE: In Okta, there are two Attribute Statement sections: Attribute
      Statements and Group Attribute Statements. If Guardrails is not properly
      pulling in user data, verify that the Attribute Statements, not Group
      Attribute Statements, have the above parameters and values.

At this point, the directory setup is complete. If the directory is not
activated, this can be done via the Directory screen in Guardrails. The directory
should be selectable via the Guardrails login screen. As with other directories
within Guardrails, an initial login will need to happen in order for the profile to
be created, and then permissions can be assigned to the profile. Refer to our
[Permissions](guides/iam/permission-assignment) documentation on how to grant
permissions to new users.
