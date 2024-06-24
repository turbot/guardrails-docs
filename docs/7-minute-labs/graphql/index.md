---
title: GraphQL in 7 minutes
template: Documentation
nav:
  title: GraphQL
---

# GraphQL in 7 minutes

| Goal | Query Turbot Guardrails using GraphQL and learn how to explore the GraphQL API. |
| ---- |---------------------------------------------------------------------------------|
| Time | 7 minutes                                                                       |

## Overview

[GraphQL](https://graphql.org/) is the native query language for the Turbot Guardrails API.

In this exercise, you will explore the Turbot Guardrails GraphQL API via the GraphiQL
interface built into the Turbot Guardrails Console.

By the end of this lab, you will be able to query the Turbot Guardrails API with GraphQL,
filter and page through results, and leverage the basic features of the GraphiQL
editor.

## Open GraphiQL for your Turbot Guardrails Workspace

GraphiQL is a built-in tool to explore, build and run GraphQL queries in Turbot Guardrails.

To open the explorer, login to your Turbot Guardrails Workspace and click on **Developers**
in the top right corner. ![GraphiQL](/images/docs/guardrails/graphiql.png)

## Run your first GraphQL query

Copy & paste this query into GraphiQL and click run:

```graphql
{
  resources {
    items {
      title
    }
  }
}
```

The JSON results will match your requested format:

```javascript
{
  "data": {
    "resources": {
      "items": [
        {
          "title": "my first resource"
        },
        {
          "title": "my second resource"
        }
      ]
    }
  }
}
```

## Expand your query, observing autocomplete capabilities

Edit the query (resist the urge to copy & paste!) to request extra `turbot`
metadata about the resources:

```graphql
{
  resources {
    items {
      title
      // highlight-start
      turbot {
        id
        createTimestamp
      }
      // highlight-end
    }
  }
}
```

While you are editing the query above, you'll see autocompletion options
appearing in the editor. Use this to try adding other fields to the results.

## Discover inline documentation

In addition to autocomplete, GraphiQL comes with extensive inline documentation.
Click the `< Docs` link in the top right hand corner to start exploring.

Search for the `resources` query in the documentation, you'll see it produces a
list of the resource type `[resource]`.

Clicking through to the resource type, you can see all the available fields.

## Use filters to target your query

Add a filter to the resources query to target the results. In this case, we'll
restrict results to the Turbot Guardrails Profile resource type:

```graphql
{
  resources(filter:"resourceType:profile") { // highlight-line
    items {
      turbot {
        id
        createTimestamp
        title
      }
    }
  }
}
```

Find resources created in the last 6 hours:

```graphql
{
  resources(filter:"createTimestamp:>=T-6h") {  // highlight-line
    items {
      turbot {
        id
        createTimestamp
        title
      }

    }
  }
}

```

## Paging through results

Get the first page of results, including the `next` token. Notice the filter
support for sorting and limiting results.

```graphql
{
  resources(filter:"resourceType:profile sort:title limit:3") { // highlight-line
    items {
      turbot {
        id
        createTimestamp
        title
      }
    }
    // highlight-start
    paging {
      previous
      next
    }
    // highlight-end
  }
}
```

The result includes `paging` metadata that can be used in the next request:

```json
{
  "data": {
    "resources": {
      "items": [
        {
          "turbot": {
            "id": "162723451277834",
            "createTimestamp": "2019-06-19T10:33:40.387Z",
            "title": "Batman"
          }
        },
        {
          "turbot": {
            "id": "162723451277834",
            "createTimestamp": "2019-06-19T10:33:40.387Z",
            "title": "Danger Mouse"
          }
        },
        {
          "turbot": {
            "id": "162674901433086",
            "createTimestamp": "2019-06-18T21:23:28.429Z",
            "title": "Superman"
          }
        }
      ],
      "paging": {
        "previous": null
        "next": "eyJzb3J0IjpbeyJ0ZXh0IjoidGl0bGUifSx7InRleHQiOiJpZCIsIm9wZXJhdG9yIjoiLSJ9XSwid2hlcmUiOlt7InBpdm90IjoidGl0bGUiLCJvcGVyYXRvciI6Ij4iLCJ2YWx1ZSI6IkNodWNrIEdhbWJsZSJ9LHsicGl2b3QiOiJpZCIsIm9wZXJhdG9yIjoiPCIsInZhbHVlIjoiMTY1MDQyODYzMjU1MTk2In1dLCJtb2RlIjoibmV4dCJ9" // highlight-line
      }
    }
  }
}
```

Query the second page of results by including the `paging` parameter. You have
reached the end of the results set when `next` is returned as null.

```graphql
{
  resources(filter:"resourceType:profile sort:title limit:3" paging:"eyJzb3J0IjpbeyJ0ZXh0IjoidGl0bGUifSx7InRleHQiOiJpZCIsIm9wZXJhdG9yIjoiLSJ9XSwid2hlcmUiOlt7InBpdm90IjoidGl0bGUiLCJvcGVyYXRvciI6Ij4iLCJ2YWx1ZSI6IkNodWNrIEdhbWJsZSJ9LHsicGl2b3QiOiJpZCIsIm9wZXJhdG9yIjoiPCIsInZhbHVlIjoiMTY1MDQyODYzMjU1MTk2In1dLCJtb2RlIjoibmV4dCJ9") { // highlight-line
    items {
      turbot {
        id
        createTimestamp
        title
      }
    }
    paging {
      previous
      next
    }
  }
}
```

The final page of results will have a `previous` token, but `next` is `null`:

```json
{
  "data": {
    "resources": {
      "items": [
        {
          "turbot": {
            "id": "164235079971230",
            "createTimestamp": "2019-07-06T12:37:00.283Z",
            "title": "Wonder Woman"
          }
        }
      ],
      "paging": {
        "previous": "eyJzb3J0IjpbeyJ0ZXh0IjoidGl0bGUifSx7InRleHQiOiJpZCIsIm9wZXJhdG9yIjoiLSJ9XSwid2hlcmUiOlt7InBpdm90IjoidGl0bGUiLCJvcGVyYXRvciI6IjwiLCJ2YWx1ZSI6IlJ1cGVzaCBQYXRpbCJ9LHsicGl2b3QiOiJpZCIsIm9wZXJhdG9yIjoiPiIsInZhbHVlIjoiMTYzMTQ1NDk2MDAyNTUxIn1dLCJtb2RlIjoicHJldmlvdXMifQ==", // highlight-line
        "next": null // highlight-line
      }
    }
  }
}
```

## Mutations

Mutations allow modifications to existing Turbot resource metadata using
GraphQL.

It is important to first start with a query to ensure the correct resource is
being acted upon. Consider an example of updating an existing mod in Turbot
using a GraphQL mutation.

Start with the query of all installed mods to get a list of the names and
versions.

```graphql
query InstalledMods {
  resources(
    filter: "resource:'tmod:@turbot/turbot#/' resourceType:tmod:@turbot/turbot#/resource/types/mod resourceTypeLevel:self sort:title limit:200"
  ) {
    items {
      akas
      version: get(path: "version")
    }
  }
}
```

An example response looks like the following:

```json
{
  "data": {
    "resources": {
      "items": [
        {
          "akas": ["tmod:@turbot/aws"],
          "version": "5.2.0"
        },
        {
          "akas": ["tmod:@turbot/aws-acm"],
          "version": "5.2.2"
        },
        {
          "akas": ["tmod:@turbot/aws-amplify"],
          "version": "5.0.1"
        },
        {
          "akas": ["tmod:@turbot/aws-apigateway"],
          "version": "5.1.0"
        },
        {
          "akas": ["tmod:@turbot/aws-appstream"],
          "version": "5.0.0-beta.4"
        },
        {
          "akas": ["tmod:@turbot/aws-athena"],
          "version": "5.1.1"
        }
      ]
    }
  }
}
```

Suppose the `tmod:@turbot/aws` mod needs to be updated. This can be done by
using the following GraphQL mutation.

```graphql
mutation installMod {
  installMod(
    input: {
      parent: "tmod:@turbot/turbot#/" # AKA or ID for the turbot product
      org: "turbot" # Name of the organization to which mod belongs
      mod: "aws" # Name of the mod
      version: "5.3.0" # Desired version of mod
    }
  ) {
    turbot {
      id
    }
    data
  }
}
```

The as with other GraphQL queries, the response will be json.

```json
{
  "data": {
    "installMod": {
      "turbot": {
        "id": "177146224838314"
      },
      "data": null
    }
  }
}
```

The `id` returned is the Turbot Id for the mod resource.

Mutations can also be used to create, change, or delete policy settings, update
local user passwords, as well as creating various Turbot resources such as a
smart folder.

## Further Reading

- [Turbot GraphQL API Reference](reference/graphql)
- [Turbot Filter Language Reference](reference/filter)
- [Turbot Guardrails GraphQL Examples in Samples Repo](https://github.com/turbot/guardrails-samples/tree/master/api_examples/graphql/queries)
- [Introduction to GraphQL](https://graphql.org/learn/)
