---
title: 'Resource'
template: Documentation
sidebar_label: Resource
deprecated: false
nav:
  title: 'Resource'
  order: 10
---

# Resource

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>Resource</span></div>



Represents a `Resource` in Turbot.

For more information, please see [Resources](https://turbot.com/guardrails/docs/concepts/resources).

| | | |
| -- | -- | -- |
| `activeGrants` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ActiveGrants">ActiveGrants</a></span> | Returns any `activeGrants` for this `Resource` that you have permission to get, subject to the optional `filter` and `paging` arguments. |
| `actor` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Actor">Actor</a></span> | The `actor` information for this `Resource`. |
| `akas` | <span style={{'fontFamily':'monospace'}}>[<a href="/guardrails/docs/reference/graphql/scalar/String">String</a>!]</span> | The globally-unique `akas` for this `Resource`. |
| `attachedResources` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resources">Resources</a></span> | Returns the `attachedResources` for this `Resource`. For more information, please see [Policy Hierarchy](https://turbot.com/guardrails/docs/concepts/policies/hierarchy). |
| `attachedSmartFolders` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resources">Resources</a></span> | Returns the `attachedSmartFolders` for this `Resource`. For more information, please see [Policy Hierarchy](https://turbot.com/guardrails/docs/concepts/policies/hierarchy). |
| `availableSmartFolders` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resources">Resources</a></span> | Returns the `availableSmartFolders` that can be attached to this `Resource`. For more information, please see [Policy Hierarchy](https://turbot.com/guardrails/docs/concepts/policies/hierarchy). |
| `children` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resources">Resources</a></span> | The immediate `children` for this `Resource`. |
| `control` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Control">Control</a></span> | Returns the `control` for the given `uri` for this `Resource`, if it exists. |
| `controls` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Controls">Controls</a></span> | Returns any `controls` for this `Resource` that you have permission to get, subject to the optional `filter` and `paging` arguments. |
| `data` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | The `data` for this `Resource`. |
| `descendants` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resources">Resources</a></span> | The `descendants` of this `Resource`. |
| `favorite` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Favorite">Favorite</a></span> | Returns the user's `favorite` for this `Resource`, if it exists. |
| `get` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Allows you to safely `get` data from the `Resource` `object` by `path`. For example, `get(path: "Region.Name"` would return the value of the nested property `Region.Name` if it exists. |
| `getSecret` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Allows you to safely get the decrypted value of a secret field on the `Resource` `object` by `path`. For example, `get(path: "Account.SecretId"` would return the decrypted value of the nested property `Account.SecretId` if it exists. You must have `Turbot/Admin` permissions granted on this `resource` or above to call this field. |
| `history` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resources">Resources</a></span> | Returns the `history` of this `Resource`, showing its lifecycle. |
| `icon` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | <span class="deprecated-field"><span class="deprecated-title">DEPRECATED:</span> Use `type.icon`.</span> |
| `metadata` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | The custom `metadata` for this `Resource`. |
| `notifications` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Notifications">Notifications</a></span> | Returns any `notifications` for this `Resource` that you have permission to get, subject to the optional `filter` and `paging` arguments. |
| `object` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | Returns the full `object` for this `Resource`. You must have `Turbot/Metadata` permissions granted on this `Resource` or above to retrieve the full `object`, else only `turbot` metadata will be returned. |
| `parent` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a></span> | The `parent` `Resource` of this `Resource`. |
| `policySettings` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicySettings">PolicySettings</a></span> | Returns any `policySettings` for this `Resource` that you have permission to get, subject to the optional `filter` and `paging` arguments. |
| `policyTrunk` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicyHierarchies">PolicyHierarchies</a></span> | The `policyTrunk` of this `Resource`. This will include any `attachedSmartFolders`. For more information, please see [Policy Hierarchy](https://turbot.com/guardrails/docs/concepts/policies/hierarchy). |
| `policyValue` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicyValue">PolicyValue</a></span> | Returns the `policyValue` for the given `uri` for this `Resource`, if it exists. |
| `tags` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | The turbot `tags` for this `Resource`. |
| `tagsMap` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/Scalar">Scalar</a></span> | <span class="deprecated-field"><span class="deprecated-title">DEPRECATED:</span> Use `tags`.</span> |
| `title` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/scalar/String">String</a></span> | <span class="deprecated-field"><span class="deprecated-title">DEPRECATED:</span> Use `turbot.title`.</span> |
| `trunk` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TrunkItems">TrunkItems</a></span> | The `trunk` for this `Resource`. This will show the resource hierarchy from the root down to this `Resource`. |
| `turbot` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/TurbotResourceMetadata">TurbotResourceMetadata</a>!</span> | Turbot metadata for this `Resource`. |
| `type` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ResourceType">ResourceType</a></span> | The `type` information for this `Resource`. |