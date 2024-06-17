---
title: 'Mutation'
template: Documentation
sidebar_label: Mutation
deprecated: false
nav:
  title: 'Mutation'
  order: 10
---

# Mutation

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>Mutation</span></div>





| | | |
| -- | -- | -- |
| `activateGrant` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ActiveGrant">ActiveGrant</a></span> | Activate a `grant` at the given `resource`. Optionally provide `note`, `validFromTimestamp` and `validToTimestamp` |
| `attachSmartFolders` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/SmartFolder">SmartFolder</a></span> | Attach the smart folder ids for the given resource. |
| `createFavorite` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Favorite">Favorite</a></span> | Create a favorite for the given `resource`. Optionally provide `resources`, `level` and `notificationTypes` |
| `createGoogleDirectory` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a>!</span> | Create a Google directory for searching in Turbot. |
| `createGrant` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Grant">Grant</a></span> | Create a grant for the given `type`, `level`, `resource` and `identity`. Optionally provide `note`, `validFromTimestamp` and `validToTimestamp` |
| `createGroupProfile` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a>!</span> | Create a group profile. |
| `createLdapDirectory` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a>!</span> | Create an LDAP directory for searching in Turbot. |
| `createLocalDirectory` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a>!</span> | Create a local directory for authentication in Turbot. |
| `createLocalDirectoryUserPassword` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/LocalDirectoryUserPassword">LocalDirectoryUserPassword</a>!</span> | Create a password for the local directory `user`. |
| `createPolicySetting` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicySetting">PolicySetting</a></span> | Create a policy setting for the given `type`, `resource` and `precedence`. Provide the setting in either standard form (either `value` (as JSON) or `valueSource` (as YAML string), or as a calculated setting with `inputTemplate` (as YAML Nunjucks template) and optional `input` (as GraphQL query string). Optionally provide `note`, `validFromTimestamp` and `validToTimestamp` |
| `createProfile` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a>!</span> | Create a profile. |
| `createProfileAccessKey` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ProfileAccessKey">ProfileAccessKey</a>!</span> | Create an access key for the authenticated profile. |
| `createProfileAwsAccessKey` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ProfileAwsAccessKey">ProfileAwsAccessKey</a>!</span> | Create profile AWS access key. |
| `createProfileSshKey` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ProfileSshKey">ProfileSshKey</a>!</span> | save SSH public key`. |
| `createResource` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a></span> | Create a resource for the given `parent` and `type` and with the given `data`. Optionally provide custom `metadata`, `tags` and `akas` |
| `createSamlDirectory` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a>!</span> | Create a SAML directory for authentication in Turbot. |
| `createSmartFolder` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/SmartFolder">SmartFolder</a></span> | Create a smart folder for the given parent and with the given `data`. |
| `createTurbotDirectory` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a>!</span> | Create a Turbot directory for authentication in Turbot. |
| `createWatch` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Watch">Watch</a></span> | Create a watch for the given `resource`. Optionally provide `action` and `favorite` |
| `createWatchRule` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/WatchRule">WatchRule</a></span> | Create a watch rule for the given `watch`. Optionally provide `resource`, `level` and `notificationTypes` |
| `deactivateGrant` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ActiveGrant">ActiveGrant</a></span> | Deactivate a grant `activation` |
| `deleteFavorite` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Favorite">Favorite</a></span> | Delete a favorite by `id`. |
| `deleteGoogleDirectory` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a>!</span> | Delete a Google directory. |
| `deleteGrant` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Grant">Grant</a></span> | Delete the grant with the given `id` |
| `deleteGroupProfile` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a>!</span> | Delete a group profile. |
| `deleteLdapDirectory` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a>!</span> | Delete an LDAP directory. |
| `deleteLocalDirectory` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a>!</span> | Delete a local directory. |
| `deletePolicySetting` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicySetting">PolicySetting</a></span> | Delete the policy setting with the given `id` |
| `deleteProfile` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a>!</span> | Delete a profile. |
| `deleteProfileAccessKey` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ProfileAccessKey">ProfileAccessKey</a>!</span> | Delete an access key by `id`. |
| `deleteProfileAwsAccessKey` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ProfileAwsAccessKey">ProfileAwsAccessKey</a>!</span> | Delete profile AWS access key. |
| `deleteProfileSshKey` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ProfileSshKey">ProfileSshKey</a>!</span> | Delete an SSH key by `id`. |
| `deleteResource` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a></span> | Delete the resource with the given `id` |
| `deleteSamlDirectory` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a>!</span> | Delete a SAML directory. |
| `deleteSmartFolder` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a></span> | Delete the smart folder with the given `id` |
| `deleteTurbotDirectory` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a>!</span> | Delete a Turbot directory. |
| `deleteWatch` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Watch">Watch</a></span> | Delete a watch by `id`. |
| `deleteWatchRule` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/WatchRule">WatchRule</a></span> | Delete a watch rule by `id`. |
| `detachSmartFolders` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/SmartFolder">SmartFolder</a></span> | Detach the smart folder ids from the given resource. |
| `installMod` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Mod">Mod</a></span> | Install the `mod` for the given `org` and `version`, at the given `parent` |
| `putResource` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a></span> | Put the resource with the given `id`. Optionally provide new `data`, custom `metadata`, `tags` or `akas` |
| `putSmartFolderAttachments` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/SmartFolder">SmartFolder</a></span> | Put the smart folder ids for the given resource. |
| `runAction` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Process">Process</a></span> | Run the action with the given `actionTypeId` and `resourceTypeId` |
| `runControl` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Process">Process</a></span> | Run the control with the given `id` |
| `runPolicy` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Process">Process</a></span> | Run the policy with the given `id` |
| `terminateProcess` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Process">Process</a></span> | Terminate the process with the given `id` |
| `uninstallMod` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ModUninstallResult">ModUninstallResult</a></span> | Uninstall an existing mod with the given `id` |
| `updateGoogleDirectory` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a>!</span> | Update a Google directory. |
| `updateGrant` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Grant">Grant</a></span> | Update a grant with the given `id`. Optionally provide `note`, `validFromTimestamp` and `validToTimestamp` |
| `updateGroupProfile` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a>!</span> | Update a group profile. |
| `updateLdapDirectory` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a>!</span> | Update an LDAP directory. |
| `updateLocalDirectory` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a>!</span> | Update a local directory. |
| `updateLocalDirectoryUserPassword` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/LocalDirectoryUserPassword">LocalDirectoryUserPassword</a>!</span> | Update the `password` for the local directory `user`. |
| `updatePolicySetting` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/PolicySetting">PolicySetting</a></span> | Update the policy setting with the given `id`. Provide the setting in either standard form (either `value` (as JSON) or `valueSource` (as YAML string), or as a calculated setting with `inputTemplate` (as YAML Nunjucks template) and optional `input` (as GraphQL query string). Optionally provide `precedence`, `note`, `validFromTimestamp` and `validToTimestamp` |
| `updateProfile` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a>!</span> | Update a profile. |
| `updateProfileAccessKey` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ProfileAccessKey">ProfileAccessKey</a>!</span> | Update an access key's `status` by `id`. |
| `updateProfileAwsAccessKey` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ProfileAwsAccessKey">ProfileAwsAccessKey</a>!</span> | Update profile AWS access key. |
| `updateProfileSshKey` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ProfileSshKey">ProfileSshKey</a>!</span> | Update an SSH key's `status` by `id`. |
| `updateResource` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a></span> | Update the resource with the given `id`. Optionally provide a new `parent`, provide `data` updates, or update custom `metadata`, `tags` and `akas` |
| `updateSamlDirectory` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a>!</span> | Update a SAML directory. |
| `updateSmartFolder` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/SmartFolder">SmartFolder</a></span> | Update a smart folder with the given `id`. |
| `updateTurbotDirectory` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a>!</span> | Update a Turbot directory. |
| `updateWatch` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Watch">Watch</a></span> | Update a watch by `id`. Optionally provide `action` and `favorite` |
| `updateWatchRule` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/WatchRule">WatchRule</a></span> | Update a watch rule by `id`. Optionally provide `resource`, `level` and `notificationTypes`", |
| `uploadMod` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/ModUploadResult">ModUploadResult</a></span> | Upload a local to mod with the given `id` |
| `upsertResource` | <span style={{'fontFamily':'monospace'}}><a href="/guardrails/docs/reference/graphql/object/Resource">Resource</a></span> | Upsert a resource for the given `parent` and `type` and with the given `data`. Optionally provide custom `metadata`, `tags` and `akas`. If `akas` are passed, the first one in the array will be used to look up if the resource already exists. If no `akas` are passed, the first resource type AKA metadata template will be rendered using the resource data and used to look up if the resource already exists |