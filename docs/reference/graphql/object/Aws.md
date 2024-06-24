---
title: 'Aws'
template: Documentation
sidebar_label: Aws
deprecated: false
nav:
  title: 'Aws'
  order: 10
---

# Aws

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>Aws</span></div>





| | | |
| -- | -- | -- |
| `consoleLoginUrl` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Generate an AWS console login URL for the AWS `account` (AKA), `permissionType` (AKA), `permissionLevel` (AKA) and optional custom `role`. |
| `consoleLoginUserUrl` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | Generate an AWS console login URL for the AWS `account` (AKA). |
| `credentials` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/AwsCredentials">AwsCredentials</a></span> | Generate temporary credentials for the AWS `account` (AKA), `permissionType` (AKA), `permissionLevel` (AKA) and optional custom `role`. |
| `userCredentials` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/AwsCredentials">AwsCredentials</a></span> | Generate temporary credentials for the AWS `account` (AKA) for the current user in user mode.
Note: User impersonation is no longer supported. You are not required to pass `user` to the request, but any `user` passed must exactly match the value in policy `tmod:@turbot/aws-iam#/policy/types/loginUserNames`. |