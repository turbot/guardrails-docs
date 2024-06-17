---
title: 'AwsCredentials'
template: Documentation
sidebar_label: AwsCredentials
deprecated: false
nav:
  title: 'AwsCredentials'
  order: 10
---

# AwsCredentials

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>AwsCredentials</span></div>



The temporary security credentials, which includes an `accessKeyId`, a `secretAccessKey` a `sessionToken` and an `expiration`.

| | | |
| -- | -- | -- |
| `accessKeyId` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The access key ID that identifies the temporary security credentials. |
| `expiration` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | The date on which the current credentials expire as an ISO string. |
| `secretAccessKey` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The secret access key that can be used to sign requests. |
| `sessionToken` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | The token that users must pass to the service API to use the temporary credentials. |