---
title: GraphQL
sidebar_label: GraphQL
---

# GraphQL Tips and Best Practices

GraphQL allows for complex queries against the Turbot Guardrails API. Find the
[GraphQL reference page](reference/graphql) for more information. If you are new
to GraphQL, check out our [GraphQL 7 minute lab](7-minute-labs/graphql).

## GraphQL best practices

GraphQL queries and mutation have two parts: the query itself and variables.

While it is possible to inline variables into the query, it is best practice to
keep the query distinct from the variables. Dealing with templates to inject
variables into a query is messy, especially when GraphQL can do that kind of
merge for you.

### Bad Query

```graphql
query Profile {
  resource(id: "joe") {
    data
    metadata
    trunk {
      title
    }
    turbot {
      akas
      id
      tags
    }
  }
}
```

Here the date is placed directly inline, making the query less flexible.

### Good Query

Use instead a query with variable input:

```graphql
query Profile($id: ID!) {
  resource(id: $id) {
    data
    metadata
    trunk {
      title
    }
    turbot {
      akas
      id
      tags
    }
  }
}
```

And for this particular query type, you can use variables as follows:

```json
{
  "id": "joe"
}
```

### Expensive Queries

Some queries can become expensive in larger environments. For example,
metadata.stats.total queries can be expensive in large environments. As an
alternative method for checking for presence, one might put `limit:1` in the
[query filter](reference/filter) and replace

```graphql
{
  metadata {
    stats {
      total
    }
  }
}
```

block with

```graphql
items {
  ...
}
```

The advantage of `limit:1` is that Guardrails only needs to grab a single row
instead of getting all rows to generate the `total`.

## GraphQL and Permission Grants

Administrators can query for all active grants in a Guardrails environment, create
and activate grants, as well as remove grants all via the GraphQL API.

### Get All Active Grants

To get a straight list of all the controls, you can use the following GraphQL
query without any variables.

```graphql
query GetListOfActiveGrants {
  activeGrants {
    items {
      grant {
        roleName
        identity {
          akas
        }
        level {
          title
          parentUri
        }
      }
      resource {
        akas
      }
      turbot {
        id
      }
    }
  }
}
```

This will return a list of entries that could be used by Calculated Policies or
consumed by some other application that can manipulate JSON output.

### Get All Active Grants For A Specific User(s)

You will use the above query but added to this query, we now have introduced a
variable called `$filter` which will allow us to specify which users we are
interested in.

```graphql
query GetListOfActiveGrants($filter: [String!]) {
  activeGrants(filter: $filter) {
    items {
      grant {
        roleName
        identity {
          akas
        }
        level {
          title
          parentUri
        }
      }
      resource {
        akas
      }
      turbot {
        id
      }
    }
  }
}
```

If we want to return the results for a single user. We can use that users email
address which is unique in Guardrails. For example, we want to see all _active_
grants for user `omero@turbot.com`, we can use the following input:

```json
{
  "filter": ["profile:omero@turbot.com"]
}
```

If we would like to additional users, for example `bob@turbot.com`, you can
modify the variable as follows:

```json
{
  "filter": ["profile:omero@turbot.com,bob@turbot.com"]
}
```

#### Get Individual Grant

To get a specific grant, you will have to determine the ID of that grant, which
can be found by listing all the grants and using the `turbot.id` property.

```graphql
query ActiveGrant($id: ID!) {
  activeGrant(id: $id) {
    validFromTimestamp
    validToTimestamp
    grant {
      identity {
        akas
      }
      level {
        title
        parent
      }
    }
  }
}
```

Here, we would like to list the grant that has the the specific id:
`190591611773680`

```json
{
  "id": 190591611773680
}
```

### Creating Grants

To create grants, one can use the GraphQL mutation `createGrant`. **NOTE** Any
new grant that you create will have to activated as all grants are created but
are by default inactive as a safety feature.

```graphql
mutation CreateGrant($input: CreateGrantInput!) {
  createGrant(input: $input) {
    turbot {
      id
    }
  }
}
```

Example input variable for creating grants:

```json
{
  "input": {
    "type": "tmod:@turbot/aws#/permission/types/aws",
    "level": "tmod:@turbot/turbot-iam#/permission/levels/operator",
    "resource": "tmod:@turbot/turbot#/",
    "identitySearch": {
      "directory": "226714953374521",
      "type": "USER",
      "identity": "eee@jf.turbot.local"
    }
  }
}
```

Take note of `turbot.id` as this will be used to activate the grant using the
activate grant mutation.

Further details on input parameters:

#### type

For AWS grant use the type: tmod:@turbot/aws#/permission/types/aws For GCP grant
use the type: tmod:@turbot/gcp#/permission/types/gcp For Azure grant use the
type: tmod:@turbot/azure#/permission/types/azure For Guardrails grant use the type:
tmod:@turbot/turbot-iam#/permission/types/turbot

#### level

For level user: tmod:@turbot/turbot-iam#/permission/levels/user For level
operator: tmod:@turbot/turbot-iam#/permission/levels/operator For level admin:
tmod:@turbot/turbot-iam#/permission/levels/admin For level metadata:
tmod:@turbot/turbot-iam#/permission/levels/metadata For level owner:
tmod:@turbot/turbot-iam#/permission/levels/owner For level readonly:
tmod:@turbot/turbot-iam#/permission/levels/readonly For level superuser:
tmod:@turbot/turbot-iam#/permission/levels/superuser

#### resource

This is the resource that you want to attach to. You can find the AKA of a
resource using the Guardrails UI.

For an AWS account the resource AKA is: arn:aws:::<account_number> For a GCP
account the resource AKA is:
gcp://cloudresourcemanager.googleapis.com/projects/<project_name> For an Azure
account the resource AKA is: azure:///subscriptions/<subscription_id> At the
Turbot level the AKA is: tmod:@turbot/turbot#/

#### identitySearch.directory

This holds the details of the Directory where the Users Profile exists

#### identitySearch.type

This is either `GROUP` or `USER`

#### identitySearch.identity

This is usually the User's email address

### Activate Grants

You can activate grants using the mutation:

```graphql
mutation ActivateGrant($input: ActivateGrantInput!) {
  activateGrant(input: $input) {
    turbot {
      id
    }
  }
}
```

The id of the grant is given when creating the grant. Use this id with the
property `input.grant`. You will also need to configure at what resource you
want to activate the grant. This is the same as the `resource` that was used
when creating the grant.

An example input is as follows

```json
{
  "input": {
    "grant": "225901139222587",
    "resource": "tmod:@turbot/turbot#/"
  }
}
```
