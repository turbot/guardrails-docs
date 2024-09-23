---
title: OneLogin
sidebar_label: OneLogin
---

# One Login SAML Configuration

This guide details configuring a Guardrails application in Okta as well as the directory in Guardrails. Administrator
access in Okta and `Turbot/Owner` permissions in Guardrails are required for configuration.

## Create the directory in Guardrails

1. In the Guardrails console, click on the **Permissions** tab then on the **Directory** card.
2. Click **New Directory** and select **SAML**.
3. Enter the following information:
    - **Title**: The title for this directory that will display in the login screen.
    - **Description**: A description for this directory.
    - **Entry Point**: This is the identity provider's single sign on URL.
    - **Issuer**: This is the identity provider issuer URL .
    - **Certificate**: This is the Certificate from the identity provider
    - **Profile ID Template**: This can generally be left to the default value, `{{profile.email}`. This is the unique
      identifier for any new user profile.
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
    - **Advanced > Require Signed Authentication Response**: Set to "Disabled". OneLogin does not support this feature. 
    - **Advanced > Strict Audience Validation**: Administrators have the
      option to enable strict audience validation. This should not be enabled
      if the `Issuer` field above does not match the workspace URL.
        - **Troubleshooting**: If users encounter an error stating `SAML assertion audience mismatch` during SAML
          login, it indicates that the Strict Audience Validation should be disabled. Select the "Disabled" option to
          resolve this problem.
4. Click **Create**.
5. The directory is now created and will appear in the list of directories. The directory can be activated immediately,
   but it will not function correctly until the SAML app is configured within the SAML application.
6. Click the **Edit** pencil next to the new directory. Scroll to the bottom of
   the window and copy the **Callback URL**. The format will look
   like `https://{workspaceURL}/api/latest/directories/{15digitID}/saml/callback`

# OneLogin Configuration

1. Login to your OneLogin Admin Portal.
2. Navigate to the Onelogin applications page and click **Add App**.
3. On the **Applications** tab, search for **SAML Test Connector**.
4. Select **SAML Test Connector (Advanced)**.
5. Enter `Turbot Guardrails` into the **Display Name** text field.
6. Click the Configuration tab. This displays a list of text fields:
    - **Audience (Entity ID)**: Paste in the callback URL from the Guardrails Directory.
    - **ACS (Consumer) URL Validator**: Paste in the callback URL from the Guardrails Directory.
    - **ACS (Consumer) URL**: Paste in the callback URL from the Guardrails Directory.
7. Click the **Parameters** tab on the left.
8. Under SAML nameID format you can choose to keep this as unspecified or email, but for this example it will be set to
   unspecified. We will come back to this section in a moment, but first verify that the **NameID Value** is set
   to `unspecified`.
9. Select **SSO** on the left side.
10. Copy the **Issuer URL** and the **SAML 2.0 Endpoint (HTTP)** values. Store these in a text file for later.
11. Change the **SAML Signature Algorithm** to `SHA-256`.
12. Select the **View Details** option for the x.509 certificate and save this into a temporary text file.
13. Click the **Parameters** page on the left side.
14. Now in Parameters select the Plus (+) on the SAML test Connect Advanced Field table. Add in the following parameters
    using the **+** button.
    ![](/images/docs/guardrails/attributes.png)
15. Once everything is configured, click **Save**.

# Guardrails Directory Re-Configuration

1. Now head back to your Guardrails SAML directory for OneLogin. Open the Guardrails Directory page
   from [step 1](#create-the-directory-in-turbot)
3. Paste the previously copied **SAML 2.0 Endpoint (HTTP)** value from OneLogin into the Entry Point field, and the
   Onelogin **Issuer URL** into the **Issuer** field.
4. Copy the x.509 certificate into the Guardrails Directory **Certificate** field.
5. Under the **Formats** tab, set **Name ID Format** to `unspecified`. If you have decided to use `email` as the Name ID
   in OneLogin, select that option here.
6. Click **Update**.
6. On the **Directories** page, be sure to click the up arrow in the new directories' row to activate!
6. You can now test your directory by logging in with your new SAML directory. Please note when you first login you will
   not have any permissions associated with your new profile. Once the associated SAML user profile exists, any existing
   administrator can assign proper rights.
