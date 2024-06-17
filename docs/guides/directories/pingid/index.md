---
title: PingID
sidebar_label: PingID
---

# Configuring PingID and Guardrails

This guide details configuring a Guardrails application in PingID as well as the
directory in Guardrails. Administrator access in PingID and `Turbot/Owner`
permissions in Guardrails are required for configuration.

Configuring PingID for Guardrails is a three-phase process.

1. Initial configuration in PingID
2. Directory configuration and activation in Guardrails
3. Finalizing configuration in PingID

## Phase 1: Create the SAML App in PingID

In the PingID Admin console create a new application for Guardrails.

![New PingID Application](/images/docs/guardrails/pingID-add-application.png)

Use the below Guardrails JPG as the icon for the Guardrails application.

![turbot](/images/docs/guardrails/turbot.jpg)

### Initial Identity Provider Settings

- **Application Name:** Turbot Guardrails (For customers with multiple environments:
  TurbotGuardrailsProd/TurbotGuardrailsDev)
- **Application Description:** SAML integration with Guardrails
- **Application Type**: SAML Application
- **Protocol Version:** SAML v 2.0

### SAML Attributes

#### Required Attributes

Required attributes are case-sensitive.

| Attribute Name | Source                                 | Source Attribute | Example |
|----------------|----------------------------------------|------------------|---------|
| saml_subject   | Email Address                          | jdoe@company.com |
| email          | Email Address                          | jdoe@company.com |
| nameID         | Email Address OR sAMAccountName OR UPN | jdoe             |
| displayName    | Formatted                              | John Doe         |
| firstName      | Given Name                             | John             |
| lastName       | Family name                            | Doe              |

PingID will fill in `saml_subject` for you.

#### Optional Attributes

| Attribute Name | Source         | Example          |
|----------------|----------------|------------------|
| sAMAccountName | sAMAccountName | jdoe@company.com |
| login          | Email Address  | jdoe@company.com |

![Completed Attributes](/images/docs/guardrails/pingID-attributes.png)

Download the SAML Metadata File.

### Edit SAML Configuration

Set the following parameters:

- **Assertion Consumer Service (ACS)**: Use
  `https://workspace.turbot.your-company.com/` as a placeholder. This will be
  updated after the SAML directory has been created and activated in Guardrails.
- **Entity ID**: A common convention is to use the workspace URL
  (https://{{workspace-id}}.turbot.company.com), but any unique value should
  work.
- **Signing Algorithm**: RSA_SHA256
- **Force Re-authentication**: As required. If True, users will always be forced
  to re-authenticate in when logging into Guardrails, regardless of any active
  existing SSO session

![ACS URL](/images/docs/guardrails/pingID-acs-url.png)

### Get Certificate

Download the X509 PEM (.crt) certificate. The file will start with
`-----BEGIN CERTIFICATE-----` on the first line. This will be required when
configuring the directory in Guardrails.

![certificate-download](/images/docs/guardrails/pingID-certificate.png)

## Phase 2: Configure Directory in Guardrails

1. Log into Guardrails. `Turbot/Owner` permissions are required at the Guardrails
   resource level.
2. Click the **Permissions** tab (designated with a king icon) in the top
   navigation bar.

![permissions-nav](/images/docs/guardrails/nav_permissions.png)

3. Select the blue **Directories** button at the top.

![directories](/images/docs/guardrails/nav_directories.png)

4. Select **New Directory** then click the **SAML** option. The **Create SAML
   Directory** window will pop up.

![new_directory](/images/docs/guardrails/new_directory.png)

5. In the new directory dialog box, enter the following information:
    - **Title**: Title for the SAML directory. This will display at the login screen.
      A common title is "{Organization} SSO"
    - **Description**: A description for the directory.
    - **Entry Point**: The URL that Guardrails redirects the user to authenticate. This
      is the **Single Signon Service** URL shown in the PingID SAML
      configuration. It will have a format similar to
      `https://auth.pingon.com/{hash}/saml20/idp/sso`.
    - **Issuer**: The base Guardrails URL, i.e. `https://cloud.turbot.company.com` for
      enterprise installations. For SaaS, it will look something like
      `https://turbot-orgid.cloud.turbot.com`.
    - **Certificate**: Retrieve the Base64 certificate from the PingID SAML
      Configuration page, then paste the entire contents into this field.
    - **Profile ID Template**: `pingid.{{profile.email}}` is a common template as
      this prevents profile name collisions with Guardrails Local directories. A
      template to generate the ID of the Guardrails profile for users authenticated
      through this directory. The ID **MUST** be unique for each profile in
      Guardrails, but it is possible to have multiple directories map users to the
      same ID. This **CANNOT** be changed unless the directory is new. Changing
      the
6. **Name ID Format** can generally be left as `unspecified`.
7. The **Signature** section can be used to sign requests with a private key and
   signature algorithm. Usually used only as an organizational requirement. This
   is an uncommon requirement.
8. **Advanced Configuration Options**:
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
9. Click the **Create** button.
10. On the Directories list page, click the pencil icon next to the new PingID
    directory.
11. Scroll all the way to the bottom for a field called "Callback URL". It will
    be in the form of
    `https://{turbot_console_url}/api/latest/directories/{directoryID}/saml/callback`.
    The `{directoryId}` will be a 15-digit number. This will be needed when
    updating the Guardrails application in PingID.

The SAML Directory has been created but is not yet active.

## Phase 3: Update the ACS URL in PingID

Replace the default **Assertion Consumer Service (ACS) URL** in the PingID SAML
Configuration settings with the callback URL defined in the new directory. This
can be found by clicking on the pencil icon next to the new directory in Guardrails.
The **Reply URL** will look like
`https://{turbot_console_url}/api/latest/directories/{directoryID}/saml/callback`.

Note: If for some reason the PingID SAML directory is deleted from Guardrails, the
ACS URL will need to be changed. Each directory in Guardrails gets a unique ID.
Altering the profile template is the most common reason for deleting an old
directory then creating a new one.

## Test the Configuration

1. Activate the directory by clicking on the upward point arrow icon next to the
   new directory.
2. Open a private browser session. Navigate to the Guardrails URL and select the new
   directory listed in the drop-down menu. If the directory is not showing,
   check to see that the directory was successfully activated.
3. Resolve any error messages that may pop up from PingID or Guardrails. Problems
   with ACS URLs and Callback URLs usually pop up here.
4. Test logins from the PingID application list.
5. Test logins directly from the Guardrails console login screen.
6. After successful login, go to the user profile link in the top right corner.
   Click the `Developers` tab next to `Overview`. In the `Terraform` sidebar,
   all the profile data for this user will be displayed. If those fields are
   empty or contain incorrect/improper values then adjust the
   [SAML Claims](#saml-attributes) until fixed. Log out then log in again after
   each SAML claims adjustment. Getting the letter-casing wrong on SAML
   attributes is a common cause of empty attributes.
7. If there are any residual user profiles with incorrect information, delete
   them before finishing.
8. **Congratulations!** PingID SAML is now configured and can be used to
   authenticate users into Guardrails. Grant user permissions as appropriate.

Be aware that deleting a user profile out of Guardrails while the user is logged in
can do weird things with browser sessions. Log out then delete the profile if at
all possible.

As with other directory types within Guardrails, an initial login will need to
happen in order for the profile to be created, and then permissions can be
assigned to the profile. Refer to our
[Permissions](/content/content/docs/guides/iam/permission-management)
documentation on how to grant permissions to new users.
