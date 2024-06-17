---
title: 'UpdateSamlDirectoryInput'
template: Documentation
sidebar_label: UpdateSamlDirectoryInput
deprecated: false
nav:
  title: 'UpdateSamlDirectoryInput'
  order: 10
---

# UpdateSamlDirectoryInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>UpdateSamlDirectoryInput</span></div>



Input type to update a SAML directory

| | | |
| -- | -- | -- |
| `allowGroupSyncing` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Boolean">Boolean</a></span> | Optional `tags` for the SAML directory to update |
| `allowIdpInitiatedSso` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Boolean">Boolean</a></span> | Optional flag to determine if this directory allows IDP-initiated SSO |
| `certificate` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `certificate` of the SAML directory to update in multiline PEM format |
| `description` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `description` of the SAML directory to update |
| `entryPoint` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `entryPoint` of the SAML directory to update |
| `groupFilter` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional attribute returning list of groups that a SAML user is a part of. |
| `id` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `id` of the SAML directory to update, either as an id, or an AKA |
| `issuer` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `issuer` of the SAML directory to update |
| `nameIdFormat` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/enum/SamlNameIdFormat">SamlNameIdFormat</a></span> | Optional `nameIdFormat` of the SAML directory to update |
| `parent` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a></span> | Optional new `parent` for the SAML directory, either as an id, or an AKA |
| `profileGroupsAttribute` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Flag to indicate whether groups will be synchronized for SAML users. |
| `requiredSignedAssertionResponse` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Boolean">Boolean</a></span> | Optional flag to indicate whether the SAML assertion response from the IDP should be signed. Enabling this ensures data integrity and authenticity. |
| `requiredSignedAuthenticationResponse` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Boolean">Boolean</a></span> | Optional flag to indicate whether the SAML authentication response from the IDP should be signed. Enabling this ensures data integrity and authenticity. |
| `signatureAlgorithm` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/enum/SamlSignedRequestAlgorithm">SamlSignedRequestAlgorithm</a></span> | Optional algorithm used to sign auth requests with SAML directory |
| `signaturePrivateKey` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `signaturePrivateKey` used to sign auth requests with SAML directory, in multiline PEM format |
| `signRequests` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Boolean">Boolean</a></span> | Optionally sign auth requests with this SAML directory |
| `status` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/enum/DirectoryStatus">DirectoryStatus</a></span> | Optional `status` of the SAML directory to update |
| `strictAudienceValidation` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Boolean">Boolean</a></span> | Optional flag to indicate whether the SAML Audience need to be validated. |
| `tags` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Optional regular expression to filter out groups that are to be synced from SAML. |
| `title` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Optional `title` of the SAML directory to update |