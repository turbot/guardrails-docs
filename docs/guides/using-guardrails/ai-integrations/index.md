---
title: AI Integrations (MCP)
sidebar_label: AI Integrations (MCP)
---

# Configure Guardrails MCP Server

In this guide, you will:

- Install and configure the Guardrails [Model Context Protocol](https://modelcontextprotocol.io) (MCP) server to enable AI assistant integration.
- Connect your AI assistant to interact with your Guardrails environment.
- Use natural language to explore and manage your cloud infrastructure.

The [Guardrails](https://turbot.com/guardrails) Model Context Protocol (MCP) server enables AI assistants to interact with your Guardrails environment through natural language queries. By connecting AI assistants to your Guardrails data, you can:

- Querying and analyzing cloud resources using GraphQL
- Listing and filtering resource, control, and policy types
- Executing controls and reviewing compliance
- Exploring GraphQL schemas for custom queries
- Processing templates using Nunjucks for dynamic configurations

## Prerequisites

Before setting up Guardrails MCP, you need:

- Node.js v20 or higher installed on your system
- A Turbot Guardrails API key with appropriate permissions
  - At minimum, Turbot/ReadOnly permission to run GraphQL queries
  - Turbot/Operator permission if you need to run controls or modify policies
- Your Guardrails workspace URL (e.g., `https://your-workspace.cloud.turbot.com`)
- An AI assistant that supports MCP (Claude Desktop, Cursor, etc.)

To generate a Guardrails API key, see [Guardrails API Access Keys](https://turbot.com/guardrails/docs/guides/using-guardrails/iam/access-keys#generate-a-new-guardrails-api-access-key).

## Step 1: Install MCP Server

Guardrails MCP is installed using npx, which runs the published npm package without requiring manual installation.

The npx approach is used in the configuration examples throughout this guide and provides the simplest way to get started with Guardrails MCP.

No additional installation steps are required as the configuration will automatically handle this for you.

> [!NOTE]
> If you need to customize the MCP server functionality, you can clone and modify the code from the [Guardrails MCP GitHub repo](https://github.com/turbot/guardrails-mcp). However, for most use cases, the npx installation method described above is recommended.

## Step 2: Configure MCP Server

Set up a configuration file for your AI assistant with the following structure:

```json
{
  "mcpServers": {
    "turbot-guardrails": {
      "command": "npx",
      "args": ["-y", "@turbot/guardrails-mcp"],
      "env": {
        "TURBOT_GRAPHQL_ENDPOINT": "https://your-workspace.cloud.turbot.com/api/latest/graphql",
        "TURBOT_ACCESS_KEY_ID": "your-access-key-id",
        "TURBOT_SECRET_ACCESS_KEY": "your-secret-access-key"
      }
    }
  }
}
```

### Configuration Locations

Place the configuration file in the correct location based on your AI assistant:

| Assistant                | Configuration File Location                                               | Setup Guide                                                                   |
| ------------------------ | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Claude Desktop (Windows) | `%APPDATA%\Claude Desktop\claude_desktop_config.json`                     |
| Claude Desktop (macOS)   | `~/Library/Application Support/Claude Desktop/claude_desktop_config.json` | [Claude Desktop MCP Guide →](https://modelcontextprotocol.io/quickstart/user) |
| Claude Desktop (Linux)   | `~/.config/Claude Desktop/claude_desktop_config.json`                     |
| Cursor (Per-user)        | `~/.cursor/mcp.json`                                                      |
| Cursor (Per-workspace)   | `.cursor/mcp.json` in the workspace directory                             | [Cursor MCP Guide →](https://docs.cursor.com/context/model-context-protocol)  |

### Environment Variables

The configuration requires these environment variables:

| Variable                   | Description                              |
| -------------------------- | ---------------------------------------- |
| `TURBOT_GRAPHQL_ENDPOINT`  | Your Guardrails GraphQL API endpoint URL |
| `TURBOT_ACCESS_KEY_ID`     | Your Guardrails API access key ID        |
| `TURBOT_SECRET_ACCESS_KEY` | Your Guardrails API secret access key    |

## Step 3: Configure AI Assistant

### Claude Desktop

1. Create or edit the Claude Desktop configuration file in the appropriate location for your OS.
2. Add the Guardrails MCP server configuration (as shown above).
3. Save the file and restart Claude Desktop.

### Cursor

For Cursor, you have two options for configuration:

#### Per-user Configuration (applies to all workspaces)

1. Create or edit `~/.cursor/mcp.json`
2. Add the Guardrails MCP server configuration
3. Save the file and restart Cursor

#### Per-workspace Configuration (applies only to the current workspace)

1. Create or edit `.cursor/mcp.json` in your workspace directory
2. Add the Guardrails MCP server configuration
3. Save the file and restart Cursor

> [!NOTE]
> Per-workspace configuration takes precedence over per-user configuration when both exist.

## Step 4: Querying Guardrails

Start by asking about your Guardrails environment, for example:

```
Which Turbot Environment (TE) version is currently running in my workspace?
```

Simple, specific questions work well:

```
Show me all S3 buckets created in the last week
```

Generate compliance and security reports:

```
List all EC2 instances that are non-compliant with our tagging standards
```

Explore policy and control types:

```
Show me all policy types related to encryption
List all control types for S3 buckets
```

Dive into resource details:

```
Show details for resource ID 1234567890
```

Remember to:

- Be specific about which resources, controls, or policies you want to analyze
- Use filters for categories, titles, or tags
- Start with simple queries before adding complex conditions
- Use natural language – the LLM will handle the GraphQL translation

<!-- ## Next Steps

- Explore the [Turbot Guardrails documentation](https://turbot.com/guardrails/docs) for more information about Guardrails concepts
- Check out the [Guardrails Hub](https://hub.guardrails.turbot.com) for available policy packs
- Try the example prompts in the [Example Usage](#example-usage) section below -->

## Troubleshooting

| Issue                 | Description                                                           | Guide                                                                                                |
| --------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Authentication Errors | API key is incorrect or lacks necessary permissions                   | [Guardrails Access Keys](https://turbot.com/guardrails/docs/guides/using-guardrails/iam/access-keys) |
| Connection Issues     | Guardrails endpoint URL is incorrect or network connectivity problems | Check your network configuration and endpoint URL format                                             |
| API Errors            | GraphQL error messages in server logs                                 | Review server logs and ensure your API key has required permissions                                  |
| Further Assistance    | If you continue to encounter issues                                   | [Open Support Ticket](https://support.turbot.com)                                                    |
