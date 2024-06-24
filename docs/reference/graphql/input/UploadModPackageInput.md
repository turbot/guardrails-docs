---
title: 'UploadModPackageInput'
template: Documentation
sidebar_label: UploadModPackageInput
deprecated: false
nav:
  title: 'UploadModPackageInput'
  order: 10
---

# UploadModPackageInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>UploadModPackageInput</span></div>



Upload the mod for the given `version`, `name`, `build`, `id` and `uploadType`

| | | |
| -- | -- | -- |
| `build` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `build` of the mod package to upload |
| `id` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `$id` of the mod package to upload |
| `uploadType` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/enum/ModUploadType">ModUploadType</a>!</span> | The `uploadType` of this mod package upload request |
| `version` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!</span> | The `version` of the mod package to upload |