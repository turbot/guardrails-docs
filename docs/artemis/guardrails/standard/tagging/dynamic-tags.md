---
title: Dynamic Tags
sidebar_label: Dynamic Tags
---

# Tag Resources with Dynamic Metadata

Org control objectives often include the need to tag resources with metadata of the resource or dynamic metadata from other sources, such as a
[Guardrails File](/guardrails/docs/guides/configuring-guardrails/files). This guide will go over three different scenarios:

- Tag an S3 bucket with an attribute in the bucket metadata.
- Tag an S3 bucket with attributes stored in a Guardrails File.
- Tag an S3 bucket with attributes from a
  [Guardrails Folder](concepts/resources/hierarchy#folders)

<div className="alert alert-info">
  This example, along with many others, can be found in the <a href="https://github.com/turbot/guardrails-samples" target="_blank">Guardrails Samples Repo</a>
</div>

## Initial Configuration

For our initial configuration, let us assume we have an AWS S3 bucket called
`turbot-test-bucket`.

Assume that we have also set the policy
[AWS > S3 > Bucket > Tags](/guardrails/docs/mods/aws/aws-s3/policy#aws--s3--bucket--tags)
to `Check: Tags are correct`. This means that Guardrails will only alarm and not
change any tags on the resource itself.

Each example will be defining a calculated policy using
[AWS > S3 > Bucket > Tags > Template](https://hub.guardrails.turbot.com/mods/aws/policies/aws-s3/bucketTagsTemplate).

## Tagging Resources with CMDB Metadata

This example will use the following S3 bucket metadata:

<details>
  <summary>S3 bucket metadata</summary>

```yaml
AccelerateConfiguration:
Status: Suspended
Acl:
Grants:
    - Grantee:
        ID: 6eb349968d9164c06c9c28123456sdfoadjf09a9ee8f79cb36157431f5e9713f
        Type: CanonicalUser
    Permission: FULL_CONTROL
Owner:
    ID: 6eb349968d9164c06c9c28123456sdfoadjf09a9ee8f79cb36157431f5e9713f
Cors: {}
CreationDate: '2020-07-20T17:07:32.000Z'
Encryption:
ServerSideEncryptionConfiguration:
    Rules:
    - ApplyServerSideEncryptionByDefault:
        KMSMasterKeyID: alias/turbot/default
        SSEAlgorithm: 'aws:kms'
        BucketKeyEnabled: false
Lifecycle:
- Filter:
    And:
        Prefix: test
        Tags:
        - Key: test
            Value: value
    ID: new-rule
    NoncurrentVersionTransitions: []
    Status: Enabled
    Transitions:
    - Days: 9999
        StorageClass: STANDARD_IA
LocationConstraint: us-east-2
Logging: {}
Name: turbot-test-bucket
NotificationConfiguration: {}
Payer: BucketOwner
Policy:
Statement:
    - Action: 's3:GetBucketAcl'
    Effect: Allow
    Principal:
        Service: cloudtrail.amazonaws.com
    Resource: 'arn:aws:s3:::turbot-test-bucket'
    Sid: AWSCloudTrailAclCheck20150319
    - Action: 's3:PutObject'
    Condition:
        StringEquals:
        's3:x-amz-acl': bucket-owner-full-control
    Effect: Allow
    Principal:
        Service: cloudtrail.amazonaws.com
    Resource: 'arn:aws:s3:::turbot-test-bucket/AWSLogs/12345678012/*'
    Sid: AWSCloudTrailWrite20150319
    - Action: 's3:*'
    Effect: Allow
    Principal:
        Service: config.amazonaws.com
    Resource:
        - 'arn:aws:s3:::turbot-test-bucket'
        - 'arn:aws:s3:::turbot-test-bucket/*'
    Sid: ConfigRule
    - Action: 's3:*'
    Condition:
        Bool:
        'aws:SecureTransport': 'false'
    Effect: Deny
    Principal: '*'
    Resource:
        - 'arn:aws:s3:::turbot-test-bucket'
        - 'arn:aws:s3:::turbot-test-bucket/*'
    Sid: MustBeEncryptedInTransit
Version: '2012-10-17'
PolicyStatus:
IsPublic: false
PublicAccessBlock:
BlockPublicAcls: false
BlockPublicPolicy: false
IgnorePublicAcls: false
RestrictPublicBuckets: false
Replication: {}
Tags:
- Key: Owners
    Value: john Doe
- Key: Test
    Value: ''
- Key: environment
    Value: DEV
Versioning:
MFADelete: Disabled
Status: Suspended
Website: {}
```

</details>

<b></b>

In this example, we want to ensure that the payer is a tag on the bucket, i.e.
the key:value pair `payer`:`BucketOwner`. Let's start with the GraphQL query:

```graphql
{
  resource {
    payer: get(path: "Payer")
    turbot {
      tags
    }
  }
}
```

This gives us the following output:

```json
{
  "resource": {
    "region": "us-east-2",
    "turbot": {
      "tags": {
        "Test": "",
        "Owners": "john Doe",
        "environment": "DEV"
      }
    }
  }
}
```

Note that we can use this `get: path()` function to call a specific attribute.
This example uses `Payer` and we call the attribute `payer`.

Finally, to implement the logic, we use this nunjucks template:

```nunjucks
{%- if $.resource.turbot.tags['payer'] == $.resource.payer -%}
[]
{%- else -%}
- payer: '{{ $.resource.payer }}'
{%- endif -%}
```

The `AWS > S3 > Bucket > Tags` control will go into alarm if there does not
exist a tag `payer` with the value defined on the bucket metadata, and will
state that their should be that tag on the bucket.

### Tagging Resources with Guardrails File Data

A Guardrails File is simply a json data structure that can be referenced in
calculated policies. Let's assume the file has the following data:

```json
{
  "dev": "john doe",
  "prod": "greg duke",
  "qa": "gen gomes"
}
```

The aka of this file is `owner_env`. It is also possible to use the Guardrails ID,
which is of the format `220880720738517`.

We will be using the same calculated policy
[AWS > S3 > Bucket > Tags > Template](https://hub.guardrails.turbot.com/mods/aws/policies/aws-s3/bucketTagsTemplate).
as in the first example. In the query we need to not only call the resource tags
but also the Guardrails file.

```graphql
{
  resource {
    turbot {
      tags
    }
  }
  tag_file: resource(id: "owner_env") {
    data
  }
}
```

In this scenario, tag the resource with the name of the owner of the particular
environment (each environment owner is defined in the File). As an
administrator, assume we know that there can only be three values for the key
`environment`: `qa`, `prod`, and `dev`.

```nunjucks
{%- for key, value in $.resource.turbot.tags -%}


{%- if not $.resource.turbot.tags.environment -%}
- environment: "missing"
{%- elif $.resource.turbot.tags.environment == 'dev' -%}
- owner: {{ $.tag_file.data.dev }}
{%- elif $.resource.turbot.tags.environment == 'qa' -%}
- owner: {{ $.tag_file.data.qa }}
{%- elif $.resource.turbot.tags.environment == 'prod' -%}
- owner: {{ $.tag_file.data.prod }}
{%- else -%}
- environment: "invalid_value"
{%- endif -%}
```

As always, first check for the existence of the key. If the key does exist,
check it's value to see if it matches with any of the key terms, and if it does,
create the necessary new tag. Lastly, if the environment key does exist but it
is not qa, prod, or dev, output that the environment key has an invalid value.

### Tagging Resources with Guardrails Folder Metadata

This example will detail how to pull tagging information about a Guardrails folder
and apply that tag to all resources within it. The query response will include
the folder that is "closest to the resource" in the Guardrails hierarchy. For
example, if there existed folder A and folder B, with B inside of folder A, and
a resource was inside folder B, the hierarchy would show **A > B > Resource**,
and folder B is considered "closest."

```graphql
{
  resource {
    turbot {
      tags
    }
  }
  folder {
    turbot {
      tags
    }
  }
}
```

Assume the tag `environment`:`qa` exists on the folder and this must be applied
to all resources within it. This one is easy - we can just echo the folder tag
value to set it.

```nunjucks
{%- if $.folder.turbot.tags.environment -%}
- environment: {{ $.folder.turbot.tags.environment }}
{%- else -%}
- environment: "folder missing tag"
{%- endif -%}
```

If the environment tag does not exist on the folder, simply output a static
value stating there is no tag.

### Tagging Resources with User who Created Resource (and Creation Time)

Guardrails can automate the tagging of resources with the user who created it and
the time at which it was created. Like these other examples, this will be a
calculated policy, but this time our query will be a bit different!

Query:

```graphql
{
  resource {
    creator: notifications(filter: "sort: version_id limit:1") {
      items {
        actor {
          identity {
            turbot {
              title
            }
          }
        }
        turbot {
          createTimestamp
        }
      }
    }
  }
}
```

An example response might look as follows:

```json
{
  "resource": {
    "creator": {
      "items": [
        {
          "actor": {
            "identity": {
              "turbot": {
                "title": "John Doe"
              }
            }
          },
          "turbot": {
            "createTimestamp": "2020-09-28T18:42:20.990Z"
          }
        }
      ]
    }
  }
}
```

In the template, we simply reference the two objects then use the nunjucks
template to force everything lower case, as well as replacing unapproved
characters.

Template:

```nunjucks
{%- set owner = $.resource.creator.items[0].actor.identity.turbot.title -%}
created_by: "{{ owner | lower | replace(" ", "_") }}"

{%- set create_time = $.resource.creator.items[0].turbot.createTimestamp %}
created_time: "{{ create_time | lower | replace(".", "_") | replace(":", "-") }}"
```

This policy can be applied to any resource. Be sure to test the GraphQL query to
ensure that it is responding with the correct info! Also notice that in the
second `set` variable line, we remove the trailing `-` to ensure that the
`created_time` key is a new line and parsable by the policy.
