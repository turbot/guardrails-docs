---
title: Monitoring Using AI Integration
sidebar_label: Monitoring Using AI Integration
---

# Monitoring Using AI Integration

In this guide, you will:
- Configure the AWS MCP server, then submit a pre-defined prompt that inspects recent Lambda errors and produces a structured analysis.

Leverage the [AWS Cloud Control API MCP Server](https://aws.amazon.com/blogs/devops/introducing-aws-cloud-control-api-mcp-server-natural-language-infrastructure-management-on-aws/) with an MCP host (e.g., Amazon Q Developer CLI, Cursor, or Claude Desktop), to analyze your environments through natural-language interaction. This setup allows you to run prompts that inspect your environment and generate structured, actionable reports. By integrating MCP capabilities, you can accelerate triage, minimize context switching, produce consistent summaries, and safely investigate your environment in read-only mode — simplifying the overall troubleshooting and reporting process.

## Prerequisites

- Access to the Guardrails AWS account with appropriate **read-only** permissions.
- An MCP host installed.
- AWS credentials configured.

## Step 1: Configure the AWS MCP Server

You can configure MCP servers either globally or per workspace. The examples below cover [Cursor](https://cursor.com/) setup and also include a generic JSON reference if needed.

### Configure with Cursor (UI)

1. Open Cursor and from the top left corner select `Cursor > Settings > Cursor Settings > Tools & Integrations`

2. Select `New MCP Server`.
3. Fill in the fields:
   - Name: `awslabs.ccapi-mcp-server`
   - Command: `uvx`
   - Args: `awslabs.ccapi-mcp-server@latest`
   - Env:
     - `AWS_PROFILE`: your named AWS profile (or use environment-based credentials/SSO)
     - `DEFAULT_TAGS`: `enabled`
     - `SECURITY_SCANNING`: `enabled`
     - `FASTMCP_LOG_LEVEL`: `ERROR`
4. Save and restart Cursor (or reload the window) to initialize the server.
5. Optional: To run in read-only mode, add an additional arg `--readonly`.

### Generic JSON reference (for hosts that use a JSON config)

If you wish to use a JSON config file (note: Cursor uses the UI-based setup above), create it in one of these typical locations:

```
Global (applies to all workspaces): `~/.aws/amazon/mcp.json`
```

Use the following structure and replace values as appropriate for your environment.

**Minimal server configuration**

```json
{
  "mcpServers": {
    "awslabs.ccapi-mcp-server": {
      "command": "uvx",
      "args": [
        "awslabs.ccapi-mcp-server@latest"
      ],
      "env": {
        "AWS_PROFILE": "your-named-aws-profile",
        "DEFAULT_TAGS": "enabled",
        "SECURITY_SCANNING": "enabled",
        "FASTMCP_LOG_LEVEL": "ERROR"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

### Read-only mode

If you want to restrict the server from performing mutating actions (Create/Update/Delete), add the `--readonly` flag:

```json
{
  "mcpServers": {
    "awslabs.ccapi-mcp-server": {
      "command": "uvx",
      "args": [
        "awslabs.ccapi-mcp-server@latest",
        "--readonly"
      ],
      "env": {
        "AWS_PROFILE": "your-named-aws-profile",
        "DEFAULT_TAGS": "enabled",
        "SECURITY_SCANNING": "enabled",
        "FASTMCP_LOG_LEVEL": "ERROR"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

## Step 2: Start MCP Host and Verify Server

**In Cursor**:

1. Open a new Chat.
2. To confirm the MCP server is available, Select the `@Add Context` box in the chat box and check the tools list, the server and its tools should appear.
> [!NOTE] If the server does not appear, reload the window and re-check the MCP settings.

## Step 3: Run Prompt

Paste the following prompt into your MCP chat. Approve requested tool actions when prompted.

```
Analyze CloudWatch Logs for Lambda Function Errors

1. Run error search query:
   aws logs start-query --log-group-name /aws/lambda/turbot_5_50_6_worker --start-time $(date -v-3H +%s) --end-time $(date +%s) --query-string "fields @timestamp, @message | filter level = 'error'" --profile mcp-prod --region us-east-2

2. Extract from results:
   - error message
   - requestId
   - tenantId
   - timestamp

3. For each requestId, run detailed analysis:
   aws logs start-query --log-group-name /aws/lambda/turbot_5_50_6_worker --start-time $(date -v-3H +%s) --end-time $(date +%s) --query-string "filter @requestId = 'REQUEST_ID_HERE'" --profile mcp-prod --region us-east-2

4. Present findings in table format:
   | Timestamp | Error Code | Error Message | Tenant | Request ID |

5. Include summary of:
   - Total errors found
   - Error patterns
   - Affected tenants
   - Recommendations

Please execute these steps and provide the complete analysis in a structured format.
```

[!NOTE]
- Replace the `--profile` and `--region` values to match your environment if different.
- If your environment uses a different Lambda worker log group name, substitute `/aws/lambda/turbot_5_50_6_worker` accordingly.

### Example Output

```
/aws/lambda/turbot_5_50_7_worker  
No database errors found in the last 3 hours.

/aws/lambda/turbot_5_51_3_worker (Top 5, by most recent)

| Timestamp           | Error Code | Error Message (Summary)                                                            | Tenant      | Request ID                              |
|---------------------|------------|------------------------------------------------------------------------------------|--------------|------------------------------------------|
| 2025-05-23 12:34:07 | 40P01      | deadlock detected during DELETE FROM ONLY "turbot_acme"."controls"                | turbot-acme  | 7cce8956-76c6-5ef6-8463-e9fc1bb5e85b    |
| 2025-05-23 12:34:07 | 40P01      | deadlock detected during DELETE FROM ONLY "turbot_acme"."controls"                | turbot-acme  | ee54dcd6-0233-59d1-b88d-16f56f40eca6    |
| 2025-05-23 12:34:07 | 40P01      | deadlock detected during DELETE FROM ONLY "turbot_acme"."controls"                | turbot-acme  | 2d4c3591-1191-5a30-8b21-9c7b7ce083dc    |
| 2025-05-23 12:34:05 | 40P01      | deadlock detected during DELETE FROM ONLY "turbot_acme"."controls"                | turbot-acme  | 4a7d752b-955e-5b7c-bc39-1581f828566d    |
| 2025-05-23 12:34:05 | 40P01      | deadlock detected during DELETE FROM ONLY "turbot_acme"."controls"                | turbot-acme  | 8b8e0349-644d-59b7-a60f-63e3093c3880    |

**Error Pattern Observed:**  
All errors are PostgreSQL `40P01` (deadlock detected) during DELETE operations on the `controls` table in the `turbot_acme` schema.  
All errors are for the tenant **turbot-acme**.  
The errors are tightly clustered in time, suggesting potential contention or concurrency issues.
```

## Step 4: Review and iterate

The MCP server will execute the queries, then return a structured analysis summarizing errors, affected tenants, correlations, and recommendations. If needed, request follow-ups, e.g., “drill into tenant X” or “export this analysis to a CSV.”

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn [Turbot AI Configuration](https://turbot.com/guardrails/docs/guides/using-guardrails/ai/ai-configuration#turbot-ai-configuration).
- Learn how to [Intelligent Assessment Guardrails](https://turbot.com/guardrails/docs/concepts/guardrails/intelligent-assessment#overview).

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Further Assistance                       | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)   |


