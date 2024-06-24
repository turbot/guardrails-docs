---
title: 'UploadModInput'
template: Documentation
sidebar_label: UploadModInput
deprecated: false
nav:
  title: 'UploadModInput'
  order: 10
---

# UploadModInput

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>UploadModInput</span></div>



Upload the mod for the given `package` and `schema`, at the given `parent`

| | | |
| -- | -- | -- |
| `package` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/input/UploadModPackageInput">UploadModPackageInput</a>!</span> | The `package` for the mod to upload |
| `parent` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>!</span> | The `parent` to upload the mod under, either as an id, or an AKA (currently restricted to root resource only) |
| `schema` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/input/UploadModSchemaInput">UploadModSchemaInput</a>!</span> | The `schema` for the mod to upload |