---
title: Directories
sidebar_label: Directories
---

# Guardrails and Directories

Guardrails supports SAML and Google OAuth2 for authentication into a Guardrails workspace. Common SAML directories
include Azure Entra ID (formerly, Azure AD), Okta and PingID.

User and Group sync is supported by LDAP/LDAPS group. Note that LDAP/LDAPS directories CANNOT be used to authenticate
into the Guardrails application - it is used to pull groups from an on premise or cloud Active Directory and pair them
with SAML profiles. This allows simple, widespread management of Guardrails permissions across a large number of users.

## Local Directories

* [Local Directory](guides/directories/local)

## Google Directories

* [Google Directory](guides/directories/google)

## SAML Providers

* [AWS SSO](guides/directories/aws-sso)
* [Azure AD](guides/directories/azure-ad)
* [Okta](guides/directories/okta)
* [OneLogin](guides/directories/onelogin)

## LDAP/ LDAPS Synchronization

* [LDAP/LDAPS](guides/directories/ldap-ldaps)

----------

### Sync Active Directory Groups to SAML Created Profiles

Guardrails uses the concept of a **Profile ID Template** to map user attributes to a common Guardrails profile.

Both the Active Directory and SAML Directory directories have an attribute called **Profile ID Template** - an attribute
pulled directly from the response received by Guardrails when a user authenticates.

To sync groups across directories, simply define the **Profile ID Template** in both the LDAP/LDAPS directory and the
desired authentication directory. While this particular section is focused on SAML and AD sync, note that any directory
type can have groups mapped - simply match Profile ID Templates!

To enable LDAP Sync, it is also necessary to set the policy **Turbot > IAM > Profile > LDAP Synchronization**. A simple
solution is to set the policy at the root Turbot level to `Enforce: Active`. This policy can be set at the individual
profile level, allowing group syncing for some users, but not others.

However, best practice recommendation is to use the setting `Enforce: Delete inactive with 30 days warning`. When a user
is disabled in Active Directory, the user is also disabled in Guardrails. However, the 30 day grace period allows for
administrators to reactivate profiles without having to re-create if issues arise, such as incomplete or incorrect user
name changes.

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
