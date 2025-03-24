---
title: Single Sign-on
sidebar_label: Single Sign-on
---

# Guardrails and Single Sign-on Directories

Guardrails supports SAML and Google OAuth2 for authentication into a Guardrails workspace. Common SAML directories include Azure Entra ID (formerly, Azure AD), Okta, and PingID.

User and Group sync is supported by LDAP/LDAPS group. Note that LDAP/LDAPS directories CANNOT be used to authenticate into the Guardrails application - it is used to pull groups from an on-premise or cloud Active Directory and pair them with SAML profiles. This allows simple, widespread management of Guardrails permissions across a large number of users.

## Local Directories

* [Local Directory](guides/configuring-guardrails/directories/local)

## Google Directories

* [Google Directory](guides/configuring-guardrails/directories/google)

## SAML Providers

* [AWS SSO](guides/configuring-guardrails/directories/aws-sso)
* [Azure AD](guides/configuring-guardrails/directories/azure-ad)
* [Okta](guides/configuring-guardrails/directories/okta)
* [OneLogin](guides/configuring-guardrails/directories/onelogin)

## LDAP/ LDAPS Synchronization

* [LDAP/LDAPS](guides/configuring-guardrails/directories/ldap-ldaps)

### Sync Active Directory Groups to SAML Created Profiles with LDAP as Parent Directory

To centralize identity and permission management, configure LDAP as the parent directory and set up SAML directories as child directories using GraphQL or Terraform. This setup allows Guardrails to consistently map profiles across multiple SAML providers, with LDAP managing group sync and permissions.

* **Profile ID Template:** To unify user profiles, define a Profile ID Template in LDAP (e.g., based on `email`). Configure SAML directories with the same template for consistent identity mapping. Example:
  `profile_id_template = "{{profile.email}}"`

* **Attribute Mapping Consistency**: Ensure attributes like `email` and `username` are mapped consistently across both LDAP and SAML directories to prevent profile mismatches.

* **LDAP Synchronization Policy:** Enable group synchronization by setting the **Turbot > IAM > Profile > LDAP Synchronization** policy, ideally at the root level. Use `Enforce: Active` or the best practice setting, `Enforce: Delete inactive with 30 days warning`; the 30-day grace period allows for administrators to reactivate profiles without having to re-create if issues arise, such as incomplete or incorrect user name changes.

Refer to the [LDAP directory guide](guides/configuring-guardrails/directories/ldap-ldaps) and one of the [SAML directory guides](https://turbot.com/guardrails/docs/guides/configuring-guardrails/directories#saml-providers) for initial setup instructions.

#### Example Configuration Using Terraform

Example Terraform snippet for creating a SAML directory under an LDAP parent:

```hcl
resource "turbot_saml_directory" "okta_login" {
  parent              = "<LDAP_directory_resource_id>"
  title               = "Okta Login"
  profile_id_template = "{{profile.email}}"
  description         = "Test Directory to login with Okta"
  entry_point         = "https://turbot.com/test/saml"
  certificate         = "-----BEGIN CERTIFICATE-----"
}
```

Replace `<LDAP_directory_resource_id>` with the resource ID from the LDAP setup.

## SAML Directory Security Options

Guardrails supports the following SAML directory security measures. Turbot Support recommends enabling as many of these
security measures as possible.  Check with your IdP admin team before enabling. 

**Allow IdP-Initiated SSO**: If enabled, IdP-initiated SSO will be allowed. There are security risks associated with
allowing IdP-initiated SSO as the InResponseTo field cannot be used to identify SP-solicited SAML assertions. Please be
fully aware of the security impact that not validating the `InReponseTo` field can have before making this change.
**Require Signed Authentication Response**: Enable this option if you require the SAML authentication response from your
Identity Provider (IdP) to be signed, ensuring data integrity and authenticity. Please note that not all IdPs offer
support for signing the authentication response. We strongly recommend verifying with your IdP to ensure compatibility
before enabling this feature.
**Strict Audience Validation**:  Enabling this option will enforce strict audience validation during SAML assertion
processing. When enabled, the `Issuer` attribute on the SAML directory side must exactly match the `audience`
or `Issuer` attribute specified in the Guardrails SAML directory configuration. With Strict Audience Validation enabled,
this means that the Guardrail Workspace hostname (ex. `https://guardrails-example.cloud.turbot.com`) must match both
the `Issuer` attribute in the Guardrails SAML directory (SdP) and the `Audience` or `Issuer` attribute in the IdP SAML
configuration. If there is a mismatch, authentication will fail with a 'SAML assertion audience mismatch' error.
Disabling this option will relax audience validation, allowing assertions with audience mismatches to proceed with
authentication.
