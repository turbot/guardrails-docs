---
title: graphql
template: Documentation
nav:
  order: 10
---

# Command: graphql

Execute graphql queries against a Turbot Guardrails workspace.

### Passing a query on command line

The graphql query may be passed using the `--query` argument. This may be either
a string query, or the path to a file containing the query

```bash
turbot graphql --query '{ resource(id:"tmod:@turbot/turbot#/"){ turbot {title}  } }'
```

or

```bash
turbot graphql --query ~/queries/query1.txt
```

where `~/queries/query1.txt` is a file containing the same query as above.

These return:

```yaml
resource:
  turbot:
    title: Turbot
```

### Specify json output format

```bash
  - turbot graphql --query ~/queries/query1.txt --format json
```

This returns

```json
{
  "resource": {
    "turbot": {
      "title": "Turbot"
    }
  }
}
```

### Executing specific resolver

Instead of using the `--query` parameter, you can use
[any graphql resolver](reference/graphql/query) as a sub-command.

For many resolvers, the default graphql output is defined, so it is not required.
You can override the default output (or provide a default output for a type not
yet implemented by the cli) by adding an entry to the cli config file:
~/.config/turbot/config.yyl

To override the default output for resource and control, add the following to
the config:

```
defaultGraphqlOutput:
  resource: "{ title }"
  control: " { state }"
```

Alternatively, you can specify the output data you wish graphql to return with
the `--output` parameter

#### Query resource by id, returning default output fields

```bash
graphql resource --id "tmod:@turbot/turbot#/"
```

This returns:

```yaml
resource:
  type:
    uri: "tmod:@turbot/turbot#/resource/types/turbot"
  turbot:
    id: "165643650699265"
    parentId: null
    title: Turbot
```

#### Query resource by id, returning custom output fields

The output may be either a format string or a file path:

```bash
turbot graphql resource --id "tmod:@turbot/turbot#/" --output '{ title }'
```

or

```bash
turbot graphql resource --id "tmod:@turbot/turbot#/" --output ~/queries/resourceOutput.txt
```

where `~/queries/resourceOutput.txt` is a file containing the same output format
text as above.

These return

```yaml
resource:
  title: Turbot
```

### Awaiting expected graphql output

If the `--expected` argument is provided, the cli will check the results of the
graphql query against the expected result and if they not match it will retry
every 5 seconds for up to a minute (by default).

For example:

```bash
turbot graphql resource-list --filter "resourceType:folder waitTest" --output {items{title}} --expected ~/queries/expected1.yml
```

Where `expected1.yml` is:

```yaml
resourceList:
  items:
    - title: waitTest
```

This query will retry until the result matches the expected value.

Notes:

- The expected argument (or file) should be json or yaml format text
- The timeout may be customized by passing the `--timeout` argument, which
  specifies the timeout in seconds

## Usage

### Usage: `turbot graphql [options]`

The `turbot graphql` command executes graphql queries against a Turbot Guardrails
workspace. You can use the `--query` to specify the full graphql query to run

The supported options are:

- `--expected` : Either a file path to a yml/json file or a yml/json string,
  containing expected result.
- `--timeout` : The number of second to retry the graphql query, until the
  result matches the expected result. The default is `60` (one minute).
- `--query` : `Either a file path to a file containing a graphql query, or a
  graphql query as a string.
- `--variables` : Either a file path to a yml/json file or a yml/json string,
  containing the variables for the query.
- `--output` : Either a file path to a yml/json file or a yml/json string
  containing the graphql output data.
- `--format` : The format of the graphql results. Valid values are `yaml` (the
  default) or `json`.
- `--dir or -d` : Path to the Guardrails mod that you want to upload, and it
  defaults to `"."`.
- `--help` : Shows help.
- `--profile` : The Turbot Guardrails credentials profile to use.
- `--credentials-file` : Path to the
  [shared credentials file](reference/cli/installation#a-sample-credentials-file).
  The default is `~/.config/turbot/credentials.yml`.
- `--access-key`: Turbot Guardrails access key for the workspace. If not specified, 
  credentials will be read from your Guardrails CLI
  [credentials file](reference/cli/installation#setup-your-turbot-credentials)
  or [environment variables](reference/cli/installation#environment-variables)
- `--secret-key`: Turbot Guardrails secret access key id. If not specified,
  credentials will be read from your Guardrails CLI 
  [credentials file](reference/cli/installation#setup-your-turbot-credentials)
  or [environment variables](reference/cli/installation#environment-variables)
- `--workspace`: Turbot Guardrails workspace, for example:
  `parker-turbot.cloud.turbot-dev.com`. If not specified, Turbot Guardrails credentials
  will be read from your Guardrails CLI
  [credentials file](reference/cli/installation#setup-your-turbot-credentials)
  or [environment variables](reference/cli/installation#environment-variables)

### Usage: `turbot graphql <subcommand> [options]`

Instead of using the `--query` parameter, you can use
[any graphql resolver](reference/graphql/query) as a sub-command:

- turbot graphql active-grant
- turbot graphql active-grant-list
- turbot graphql active-grants
- turbot graphql control
- turbot graphql control-categories
- turbot graphql control-category
- turbot graphql control-category-list
- turbot graphql control-list
- turbot graphql control-summaries-by-control-category
- turbot graphql control-summaries-by-control-type
- turbot graphql control-summaries-by-resource
- turbot graphql control-summaries-by-resource-category
- turbot graphql control-summaries-by-resource-type
- turbot graphql control-type
- turbot graphql control-type-list
- turbot graphql control-types
- turbot graphql control-version
- turbot graphql controls
- turbot graphql controls-by-control-category-list
- turbot graphql controls-by-control-type-list
- turbot graphql controls-by-resource-category-list
- turbot graphql controls-by-resource-list
- turbot graphql controls-by-resource-type-list
- turbot graphql favorite
- turbot graphql favorite-list
- turbot graphql favorites
- turbot graphql grant
- turbot graphql grant-list
- turbot graphql grants
- turbot graphql identity-permissions-summary-list
- turbot graphql notification
- turbot graphql notification-list
- turbot graphql notifications
- turbot graphql permission-level
- turbot graphql permission-level-list
- turbot graphql permission-levels
- turbot graphql permission-type
- turbot graphql permission-type-list
- turbot graphql permission-types
- turbot graphql permissions-details-by-identity
- turbot graphql permissions-details-by-resource
- turbot graphql policies
- turbot graphql policy
- turbot graphql policy-detail
- turbot graphql policy-hierarchies
- turbot graphql policy-list
- turbot graphql policy-setting
- turbot graphql policy-setting-list
- turbot graphql policy-setting-summaries-by-control-category
- turbot graphql policy-setting-summaries-by-policy-type
- turbot graphql policy-setting-summaries-by-resource
- turbot graphql policy-setting-summaries-by-resource-type
- turbot graphql policy-settings
- turbot graphql policy-settings-by-control-category-list
- turbot graphql policy-settings-by-policy-type-list
- turbot graphql policy-settings-by-resource-list
- turbot graphql policy-settings-by-resource-type-list
- turbot graphql policy-type
- turbot graphql policy-type-list
- turbot graphql policy-types
- turbot graphql policy-value
- turbot graphql policy-value-list
- turbot graphql policy-value-version
- turbot graphql policy-values
- turbot graphql process
- turbot graphql process-history
- turbot graphql process-list
- turbot graphql process-log-list
- turbot graphql process-logs
- turbot graphql processes
- turbot graphql profile-access-key
- turbot graphql profile-access-keys
- turbot graphql render-template
- turbot graphql resource
- turbot graphql resource-categories
- turbot graphql resource-category
- turbot graphql resource-category-list
- turbot graphql resource-list
- turbot graphql resource-permissions-summary-list
- turbot graphql resource-summaries-by-resource
- turbot graphql resource-summaries-by-resource-category
- turbot graphql resource-summaries-by-resource-type
- turbot graphql resource-type
- turbot graphql resource-type-list
- turbot graphql resource-types
- turbot graphql resource-version
- turbot graphql resources
- turbot graphql resources-by-resource-category-list
- turbot graphql resources-by-resource-list
- turbot graphql resources-by-resource-type-list
- turbot graphql watch
- turbot graphql watch-list
- turbot graphql watch-rule
- turbot graphql watch-rule-list
- turbot graphql watch-rules
- turbot graphql watches

The supported options vary by sub-command, but most support:

- `--expected` : Either a file path to a yml/json file or a yml/json string,
  containing expected result.
- `--timeout` : The number of second to retry the graphql query, until the
  result matches the expected result. The default is `60` (one minute).
- `--query` : `Either a file path to a file containing a graphql query, or a
  graphql query as a string.
- `--variables` : Either a file path to a yml/json file or a yml/json string,
  containing the variables for the query.
- `--output` : Either a file path to a yml/json file or a yml/json string
  containing the graphql output data.
- `--format` : The format of the graphql results. Valid values are `yaml` (the
  default) or `json`.
- `--dir or -d` : Path to the Guardrails mod that you want to upload, and it
  defaults to `"."`.
- `--help` : Shows help.
- `--profile` : The Turbot Guardrails credentials profile to use.
- `--credentials-file` : Path to the
  [shared credentials file](reference/cli/installation#a-sample-credentials-file).
  The default is `~/.config/turbot/credentials.yml`.
- `--access-key`: Turbot Guardrails access key for the workspace. If not specified, 
  credentials will be read from your Guardrails CLI
  [credentials file](reference/cli/installation#setup-your-turbot-credentials)
  or [environment variables](reference/cli/installation#environment-variables)
- `--secret-key`: Turbot Guardrails secret access key id. If not specified,
  credentials will be read from your Guardrails CLI
  [credentials file](reference/cli/installation#setup-your-turbot-credentials)
  or [environment variables](reference/cli/installation#environment-variables)
- `--workspace`: Turbot Guardrails  workspace, for example:
  `parker-turbot.cloud.turbot-dev.com`. If not specified, Turbot Guardrails credentials
  will be read from your Guardrails
  [credentials file](reference/cli/installation#setup-your-turbot-credentials)
  or [environment variables](reference/cli/installation#environment-variables)

Queries that return a single item (`turbot graphql resource`,
`turbot graphql control`, etc) also support:

- `--id` : an aka or id of the resource to return.

List queries (`turbot graphql resources`, `turbot graphql controls`, etc) also
support:

- `--filter` : A Turbot Guardrails [filter](reference/filter) to search for resources.
- `--paging` : A paging token to get the next batch of items
