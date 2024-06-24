---
title: 'UpdateProfileAwsAccessKeyInput'
template: Documentation
sidebar_label: UpdateProfileAwsAccessKeyInput
deprecated: false
nav:
  title: 'UpdateProfileAwsAccessKeyInput'
  order: 10
---

# UpdateProfileAwsAccessKeyInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>UpdateProfileAwsAccessKeyInput</span></div>



Update the profile AWS access key `accessKeyId` from account `account`

| | | |
| -- | -- | -- |
| `accessKeyId` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The `accessKeyId` which you want to update |
| `account` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The `account` in which the key will be created for the profile |
| `status` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/enum/ProfileAwsAccessKeyStatus">ProfileAwsAccessKeyStatus</a>!</span> | The `status` to be updated |