---
title: Tagging Helpers
sidebar_label: Tagging Helpers
---

# Tagging Helpers

To help with complex tagging use cases, Guardrails offers additional functionality to assist in writing calculated policies for tagging. Collectively, these improvements are known as "Tagging Helpers".

## createdBy and createTimestamp

A common tagging requirement is to tag a resource with the identity of the creator and the time it was created. Here is an example graphql query for the resource metadata (which includes the creation information).
```graphql
{
  resource {
    metadata
  }
}
```
Query results:
```yaml
metadata:
  aws:
    accountId: 012345678912
    partition: aws
    region: us-east-1
  createTimestamp: 2023-01-28T05:31:46.000Z
  createdBy: "arn:aws:sts::013122550996:user/dwight"
```

### createdBy data source

Guardrails populates the createdBy attribute based on the identity found in the creation event. For resources that exist prior to Guardrails discovering them, createdBy will be set to null. The format for the createdBy value varies by cloud provider:

**AWS**
- userIdentity.arn: The full ARN of the identity that created the resource.

**Azure**
- initiatedBy.userPrincipalName (Active Directory resources)
- caller (Azure resources)

**GCP**
- authenticationInfo.principalEmail

### Example of how to use createdBy and createTimestamp

This example shows a generic `template_input` and `template` that will work for any AWS, Azure or GCP resource type.

template_input:
```graphql
{
  resource  {
    metadata
    turbot{ tags }
  }
}
```

```nunjucks
{# As createdBy and createTimestamp can be null, it's important to test that they are available. -#}
{% if $.resource.metadata.createdBy %}
- "creator": "{{ $.resource.metadata.createdBy }}"
{% endif %}
{% if $.resource.metadata.createTimestamp %}
- "createTimestamp": "{{ $.resource.metadata.createTimestamp }}"
{% endif %}
```

## Tag Maps with setAttribute

In more complex tagging scenarios, accumulating tag key:value pairs into a map can assist in writing clean readable code. Nunjucks does not natively supply a way to create mutable dictionaries. To overcome this limitation, the `setAttribute()` function can help. The function accepts a dictionary object and two string parameters.

**Template**
```nunjucks
{% set currentTags = {"Key1":"Value1"} -%}
{% set currentTags = setAttribute(currentTags, "Key2", "ValueTwo") %}
{% set currentTags = setAttribute(currentTags, "Key1", "ValueOne") %}
{% for key,value in currentTags -%}
- "{{key}}": "{{value}}"
{% endfor -%}
```

**Output**
With output of:
```yaml
- "Key1": "ValueOne"
- "Key2": "ValueTwo"
```

Note: Appending to arrays is not supported by this function but can be accomplished in other ways.

## Rectify and cleanup bad keys and values

Fixing incorrect keys and values is the most common tagging use case. The `transformMap` function can be used in calculated policies to easily process rules across all tags on any given resource.

### transformMap(tags_map, rules) -> transformed_map

Transforms `tags_map` based on `rules` and returns `transformed_map`; the `tags_map` parameter and the `transformed_map` return value are simple arrays of `key:value` pairs e.g.:

```json
{
  "foo": "bar",
  "fizz": "buzz",
  "crop": "beets"
}
```
or
```yaml
- foo: bar,
- fizz: buzz,
- crop: beets
```

The `rules` object must conform to a specific schema which will be outlined in a series of examples.  All examples will use the following starting `tags_map` (the current tags on the resource):

```yaml
- Env: prd,
- CostCenter: scranton-1138,
- owner: dwight
```

### Example: Create remediated tags while preserving existing tags

**Rules**
```yaml
environment:
  incorrectKeys:
    - Env
```

**Transformed Tags**
```yaml
- "CostCenter": "scranton-1138"
- "Env": "prd"
- "environment": "prd"
- "owner": "dwight"
```

### Example: Replace an incorrect tag key.

**Rules**
```yaml
environment:
  incorrectKeys:
    - Env
  replacementValue: undefined
cost_center:
  incorrectKeys:
    - CostCenter
  replacementValue: undefined
```

_Reminder: "undefined" is a reserved value in Guardrails to indicate a tag that should be removed!_

**Transformed Tags**
```yaml
- "cost_center": "scranton-1138"
- "environment": "prd"
- "owner": "dwight"
```

### Example: Replace an incorrect tag value.

**Rules**
```yaml
owner:
  values:
    dwight.schrute@dmi.com:
      incorrectValues:
        - dwight
        - dks
        - dwight.schrute
    pam.beasly@dmi.com:
          incorrectValues:
            - Beasly
            - pam
```

**Transformed Tags**
```yaml
- "CostCenter": "scranton-1138"
- "Env": "prd"
- "owner": "dwight.schrute@dmi.com"
```

### Example: Combine value and key replacement.

**Rules**
```yaml
environment:
  incorrectKeys:
    - Env
  replacementValue: undefined
  values:
    production:
      incorrectValues:
        - prod
        - prd
        - PROD
    development:
      incorrectValues:
        - dev
        - DEV
cost_center:
  incorrectKeys:
    - CostCenter
  replacementValue: undefined
  values:
    SCR1138:
      incorrectValues:
        - scranton-1138
    NSH1234:
      incorrectValues:
        - nashua-1234
owner:
  values:
    dwight.schrute@dmi.com:
      incorrectValues:
        - dwight
        - dks
        - dwight.schrute
    pam.beasly@dmi.com:
          incorrectValues:
            - Beasly
            - pam
```

**Transformed Tags**
```yaml
- "cost_center": "SCR1138"
- "environment": "production"
- "owner": "dwight.schrute@dmi.com"
```

### Example: Using regex matches

Regular expressions can be used in `incorrectValues` and `incorrectKeys` are identified by this regex:
```
^/((?:\\/|[^/])*)/([dgimsuy]*)$
```
Malformed regexes are treated as string literals.

**Rules**
```yaml
environment:
  incorrectKeys:
    - /env.*/gi
  replacementValue: undefined
  values:
    production:
      incorrectValues:
        - /pr.*/gi
    development:
      incorrectValues:
        - /dev.*/gi
cost_center:
  incorrectKeys:
    - /cost.*cent.*/gi
  replacementValue: undefined
  values:
    SCR1138:
      incorrectValues:
        - /.*1138.*/
    NSH1234:
      incorrectValues:
        - /.*1234.*/
```

**Transformed Tags**
```yaml
- "cost_center": "SCR1138"
- "environment": "production"
- "owner": "dwight"
```

### Edge Cases
- If there are multiple matches for an incorrect value then the first alphabetical match for the correct key will be used.
- Malformed regexes are treated as string literals.
- If there is no match for the incorrectKeys or in incorrectValues, the output map will match the input.
- Multiple matches for an incorrect value will result in the the first alphabetical match being used.

## Rules Schema

### Structure of the Rules YAML

The transformMap function expects a JSON object with the following structure:

```json
{
  "key1": {
    "incorrectKeys": [
      "badkey1a",
      "badkey1b"
    ],
    "replacementValue": "newKey1",
    "values": {
      "value1": {
        "incorrectValues": [
          "badValue1a",
          "badValue1b"
        ]
      }
    }
  },
  "key2": {
    "incorrectKeys": [
      "badkey2a",
      "badkey2b"
    ],
    "replacementValue": "newKey2",
    "values": {
      "value2": {
        "incorrectValues": [
          "badValue2a",
          "badValue2b"
        ]
      }
    }
  }
}
```

The rules object can be stored in Guardrails using the policy `Turbot > Tags > Transform Rules`. When setting this policy via the Guardrails console yaml format can be used in addition to json:

```yaml
key1:
  incorrectKeys:
  - badkey1a
  - badkey1b
  replacementValue: newKey1
  values:
    value1:
      incorrectValues:
      - badValue1a
      - badValue1b
key2:
  incorrectKeys:
  - badkey2a
  - badkey2b
  replacementValue: newKey2
  values:
    value2:
      incorrectValues:
      - badValue2a
      - badValue2b
```

## Storing rules in a Guardrails File

The recommended way of managing transform rules as code, is to store them in a `Guardrails File`.  Here is an example terraform template for creating a Guardrails file.

```hcl
resource "turbot_file" "tag_rules" {
  parent  = "tmod:@turbot/turbot#/"
  title   = "Tag Transform Rules"
  akas    = ["tag_rules"]
  content = <<-EOT
    {
      "key1": {
        "incorrectKeys": [
          "badkey1a",
          "badkey1b"
        ],
        "replacementValue": "newKey1",
        "values": {
          "value1": {
            "incorrectValues": [
              "badValue1a",
              "badValue1b"
            ]
          }
        }
      },
      "key2": {
        "incorrectKeys": [
          "badkey2a",
          "badkey2b"
        ],
        "replacementValue": "newKey2",
        "values": {
          "value2": {
            "incorrectValues": [
              "badValue2a",
              "badValue2b"
            ]
          }
        }
      }
    }
    EOT
}
```

Guardrails Files only accept JSON, but YAML can still be used for the rules here by using the built-in YAML and JSON encode and decode functions in Terraform:

```hcl
locals {
  yaml_string = <<-EOT
    key1:
      incorrectKeys:
      - badkey1a
      - badkey1b
      replacementValue: newKey1
      values:
        value1:
          incorrectValues:
          - badValue1a
          - badValue1b
    key2:
      incorrectKeys:
      - badkey2a
      - badkey2b
      replacementValue: newKey2
      values:
        value2:
          incorrectValues:
          - badValue2a
          - badValue2b
    EOT
}

resource "turbot_file" "tag_rules" {
  parent  = "tmod:@turbot/turbot#/"
  title   = "Tag Transform Rules"
  akas    = ["tag_rules"]
  content =  jsonencode(yamldecode(local.yaml_string))
}
```

## Example Calculated Policy

The example creates a Policy Pack, sets the `AWS > S3 > Bucket > Tags` guardrail to `Enforce: Set tags`, and creates our calculated policy that reads the rules from the Guardrails File specified in the previous section.

```hcl
resource "turbot_policy_pack" "tag_transform_example" {
  parent = "tmod:@turbot/turbot#/"
  title  = "Tagging Transformation Example"
}

resource "turbot_policy_setting" "aws_s3_bucket_tags" {
  resource = turbot_policy_pack.tag_transform_example.id
  type     = "tmod:@turbot/aws-s3#/policy/types/bucketTags"
  value    = "Enforce: Set tags"
}

resource "turbot_policy_setting" "aws_s3_bucket_tags_template" {
  resource = turbot_policy_pack.tag_transform_example.id
  type           = "tmod:@turbot/aws-s3#/policy/types/bucketTagsTemplate"
  template_input = <<-EOT
    {
      rules: resource(id:"tag_rules") {
        data
      }
      resource {
        turbot {
          tags
        }
      }
    }
    EOT
  template       = <<-EOT
    {%- set tags_map = $.resource.turbot.tags -%}
    {%- set rules = $.rules.data -%}
    {% for key,value in transformMap(tags_map, rules) -%}
    - "{{key}}": "{{value}}"
    {% endfor -%}
    EOT
}
```
