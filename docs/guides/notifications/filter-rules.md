---
title: Filter Rules
sidebar_label: Filter rules
---

# Notification Filter Rules

Filter rules are the heart of the Notification system. They control what types of notifications are sent and where they go. There is one global configuration for all notification filter rules located in the `Turbot > Notifications > Rule-Based Routing` policy setting:

![](/images/docs/guardrails/filter-rules.png)

The policy contains an array of `rule-sets`.  Each `rule-set` consists of 1 or more rules and 1 or more delivery targets.  Current valid delivery targets include:

- Emails
- Slack webhook
- Microsoft Teams webhook

The rules in each `rule-set` are defined by a multi-line string. Each line of the string is a separate `statement`.

- Each statement contains an action (either `NOTIFY` or `IGNORE`) and one or more match conditions.

- Rules are processed in order. Processing stops at the first match, which
  determines whether the notification is sent or ignored.

- If no rule matches than the default rule `IGNORE *` matches and the notification is not sent.

- Each rule contains one or more conditions, using the
  [Turbot Guardrails filter syntax](reference/filter#filter-syntax)

- Arrays
    - To compare items that contain arrays, use a splat. You may specify how to
      match the items:
        - `.*.` - All items in the array must match for the rule to match. An empty
          list also matches.
        - `.+.` - All items in the array must match for the rule to match. An empty
          list does NOT match
    - Use `[]` to specify an empty list:

Using narrow filter policies reduce noise and ensure that only relevant notifications are sent to the appropriate recipients. This can help to improve the overall efficiency of the notification system and reduce the amount of time users spend processing notifications that are not relevant to their responsibilities.

## Examples

### Send notification for every control moving from `OK` state to `Alarm` state:

```yaml
- rules: NOTIFY $.oldControl.state:alarm $.control.state:ok
  emails:
  - dwight@dundermifflin.com
  - jim@dundermifflin.com
  slackWebhookUrl: https://hooks.slack.com/services/XXXXXXX/YYYYYYYYYY/ZZZZZZZZZZZZZZ
```


### Send notification to MS Teams when Turbot modifies a security group or security group rule:

```yaml
- rules: |
    NOTIFY $.actionType.parent:'#/resource/types/securityGroup'
    NOTIFY $.actionType.uri:'tmod:@turbot/aws-vpc-security#/control/types/securityGroupApproved'
  msTeamsWebhookUrl": "https://dmi.webhook.office.com/webhookb2/xxx/IncomingWebhook/yyy/zzz"
```

### Ignore any alarms associated with the resource named `asst-regional-manager-bucket`, send email notification for all other alarms in the aws account `111222333444`:

```yaml
- rules: |
    "IGNORE $.resource.Name:asst-regional-manager-bucket"
    "NOTIFY $.control.state:alarm $.resource.turbot.custom.aws.accountId:'111222333444'"
  emails:
    - dwight@dundermifflin.com
```



### Monitor a single resource `arn`, sending all notifications to slack and teams:

```yaml
- rules: |
    "NOTIFY $.resource.turbot.akas[0]:'arn:aws:ec2:us-east-2:899206412154:instance/i-08b562451d0215732'"
  slackWebhookUrl: https://hooks.slack.com/services/XXXXXXX/YYYYYYYYYY/ZZZZZZZZZZZZZZ
  msTeamsWebhookUrl": "https://dmi.webhook.office.com/webhookb2/xxx/IncomingWebhook/yyy/zzz"
```


## Exposed Metadata for a Control Update

```json
{
        "resource": {
            "Acl": {
                "Owner": {
                    "ID": "b67a63ec336c2053f5cbe4dfbc84165c7dc2f8a67ef1d820a4eee5d8ef89d8a8"
                },
                "Grants": [
                    {
                        "Grantee": {
                            "ID": "b67a63ec336c2053f5cbe4dfbc84165c7dc2f8a67ef1d820a4eee5d8ef89d8a8",
                            "Type": "CanonicalUser"
                        },
                        "Permission": "FULL_CONTROL"
                    }
                ]
            },
            "Cors": {},
            "Name": "asst-regional-manager-bucket",
            "Tags": [
                {
                    "Key": "foo",
                    "Value": "bar"
                },
                {
                    "Key": "rock",
                    "Value": "star"
                }
            ],
            "Payer": "BucketOwner",
            "Policy": {},
            "Logging": {},
            "Website": {},
            "Lifecycle": {},
            "Encryption": {
                "ServerSideEncryptionConfiguration": {
                    "Rules": [
                        {
                            "BucketKeyEnabled": false,
                            "ApplyServerSideEncryptionByDefault": {
                                "SSEAlgorithm": "AES256"
                            }
                        }
                    ]
                }
            },
            "Versioning": {
                "Status": "Suspended",
                "MFADelete": "Disabled"
            },
            "Replication": {},
            "CreationDate": "2021-02-02T17:30:13.000Z",
            "PolicyStatus": {},
            "PublicAccessBlock": {
                "BlockPublicAcls": true,
                "IgnorePublicAcls": true,
                "BlockPublicPolicy": true,
                "RestrictPublicBuckets": true
            },
            "LocationConstraint": "us-east-1",
            "AccelerateConfiguration": {
                "Status": "Suspended"
            },
            "ObjectLockConfiguration": {},
            "NotificationConfiguration": {},
            "turbot": {
                "id": "261303520089583",
                "versionId": "290894341530947",
                "processId": "290894338017602",
                "actorIdentityId": "200228969448365",
                "actorPersonaId": "261303481620902",
                "actorRoleId": null,
                "createTimestamp": "2022-07-07T16:06:58.829Z",
                "updateTimestamp": "2023-06-07T03:08:25.401Z",
                "deleteTimestamp": null,
                "timestamp": "2022-07-07T16:06:58.829Z",
                "title": "asst-regional-manager-bucket",
                "tags": {
                    "foo": "bar",
                    "rock": "star"
                },
                "custom": {
                    "aws": {
                        "accountId": "111222333444",
                        "partition": "aws",
                        "regionName": "us-east-1"
                    },
                    "createTimestamp": "2021-02-02T17:30:13.000Z"
                },
                "parentId": "261303469054733",
                "path": "200228952330241.206144700865790.261303442103935.261303469054733.261303520089583",
                "resourceTypeId": "209189633173890",
                "resourceGroupIds": [],
                "akas": [
                    "arn:aws:s3:::asst-regional-manager-bucket"
                ],
                "terraform": {},
                "state": "provisioned",
                "alternatePersona": "dmi_import_role/b61cb8bd-9f23-4311-a1e9-3943043e0dfa",
                "searchData": {},
                "resourceTypePath": "204308048523501.209189633101177.209189633173890",
                "resourceCategoryId": "200228961477257",
                "resourceCategoryPath": "200228961460861.200228961477257"
            }
        },
        "control": {
            "state": "alarm",
            "reason": "Not approved: Usage",
            "turbot": {
                "id": "261303520603122",
                "versionId": "290895339883245",
                "processId": "290895338766060",
                "actorIdentityId": "200228969448365",
                "actorPersonaId": null,
                "actorRoleId": null,
                "createTimestamp": "2022-07-07T16:06:58.829Z",
                "updateTimestamp": "2023-06-07T03:24:40.354Z",
                "deleteTimestamp": null,
                "timestamp": "2022-07-07T16:06:58.829Z",
                "title": null,
                "tags": {},
                "custom": {},
                "resourceId": "261303520089583",
                "controlTypeId": "209189634955290",
                "nextTickTimestamp": "2023-06-08T02:09:47.329Z",
                "tickCount": 0,
                "stateChangeTimestamp": "2023-06-07T03:24:40.347Z",
                "state": "alarm",
                "alternatePersona": null,
                "resourcePath": "200228952330241.206144700865790.261303442103935.261303469054733.261303520089583",
                "controlTypePath": "204308048523501.209189633101177.209189633173890.209189634955290",
                "resourceTypeId": "209189633173890",
                "resourceTypePath": "204308048523501.209189633101177.209189633173890",
                "controlCategoryId": "200228961165719",
                "controlCategoryPath": "200228961092955.200228961165719",
                "resourceCategoryId": "200228961477257",
                "resourceCategoryPath": "200228961460861.200228961477257"
            }
        },
        "oldControl": {
            "state": "ok",
            "reason": "Approved",
            "turbot": {
                "id": "261303520603122",
                "versionId": "290841486264313",
                "processId": "290841485770743",
                "actorIdentityId": "200228969448365",
                "actorPersonaId": null,
                "actorRoleId": null,
                "createTimestamp": "2022-07-07T16:06:58.829Z",
                "updateTimestamp": "2023-06-06T12:48:08.929Z",
                "deleteTimestamp": null,
                "timestamp": "2022-07-07T16:06:58.829Z",
                "title": null,
                "tags": {},
                "custom": {},
                "resourceId": "261303520089583",
                "controlTypeId": "209189634955290",
                "nextTickTimestamp": null,
                "tickCount": 0,
                "stateChangeTimestamp": "2023-06-06T12:48:08.928Z",
                "state": "ok",
                "resourcePath": "200228952330241.206144700865790.261303442103935.261303469054733.261303520089583",
                "controlTypePath": "204308048523501.209189633101177.209189633173890.209189634955290",
                "resourceTypeId": "209189633173890",
                "resourceTypePath": "204308048523501.209189633101177.209189633173890",
                "controlCategoryId": "200228961165719",
                "controlCategoryPath": "200228961092955.200228961165719",
                "resourceCategoryId": "200228961477257",
                "resourceCategoryPath": "200228961460861.200228961477257"
            }
        },
        "controlType": {
            "uri": "tmod:@turbot/aws-s3#/control/types/bucketApproved",
            "icon": "fal-check-double",
            "title": "Approved",
            "modUri": "tmod:@turbot/aws-s3",
            "parent": "#/resource/types/bucket",
            "parentUri": "tmod:@turbot/aws-s3#/resource/types/bucket",
            "categoryUri": "tmod:@turbot/turbot#/control/categories/resourceApproved"
        }
    }
```

## Exposed Metadata for a Action Update

```
{
    "actionType": {
        "uri": "tmod:@turbot/aws-s3#/action/types/bucketSetVersioning",
        "icon": "fal-copy",
        "title": "Set Versioning",
        "modUri": "tmod:@turbot/aws-s3",
        "parent": "#/resource/types/bucket",
        "parentUri": "tmod:@turbot/aws-s3#/resource/types/bucket",
        "categoryUri": "tmod:@turbot/turbot#/control/categories/other"
    }
}
```