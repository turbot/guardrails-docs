---
title: 'SamlDirectory'
template: Documentation
sidebar_label: SamlDirectory
deprecated: false
nav:
  title: 'SamlDirectory'
  order: 10
---

# SamlDirectory

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>SamlDirectory</span></div>





| | | |
| -- | -- | -- |
| `allowIdpInitiatedSso` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Boolean">Boolean</a></span> |  |
| `certificate` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> |  |
| `description` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> |  |
| `entryPoint` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> |  |
| `issuer` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> |  |
| `nameIdFormat` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/enum/SamlNameIdFormat">SamlNameIdFormat</a></span> |  |
| `profileIdTemplate` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> |  |
| `requiredSignedAssertionResponse` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Boolean">Boolean</a></span> |  |
| `requiredSignedAuthenticationResponse` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Boolean">Boolean</a></span> |  |
| `signatureAlgorithm` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/enum/SamlSignedRequestAlgorithm">SamlSignedRequestAlgorithm</a></span> |  |
| `signaturePrivateKey` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Secret">Secret</a></span> |  |
| `signRequests` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Boolean">Boolean</a></span> |  |
| `status` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/enum/DirectoryStatus">DirectoryStatus</a>!</span> |  |
| `strictAudienceValidation` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Boolean">Boolean</a></span> |  |
| `title` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> |  |
| `turbot` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TurbotResourceMetadata">TurbotResourceMetadata</a>!</span> |  |