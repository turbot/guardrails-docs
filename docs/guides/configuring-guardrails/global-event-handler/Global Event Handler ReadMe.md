# README for Global Event Handlers
Migration of AWS Event Handlers (EH) to AWS Global Event Handlers requires three stages:
1. Deploy the EventBridge IAM role.  Without this IAM role, all the GEH secondary regions will not properly pass events to the primary region.
2. Configure the GEH > IAM Role ARN policy setting to use the EventBridge IAM role. The primary region defaults to `us-east-1`.
3. Deploy GEH.
4. Decommission EH.
5. Post deployment Validation.

## Deploying EventBridge IAM Role for Global Event Handlers
EventBridge requires an IAM role with permissions to pass data between regional eventbuses. Without this role, Global Event Handlers will not work; only events from the primary region will get back to Guardrails for processing.  Note that GEH will only use the `default` event bus.  There is no need to create second event bus exclusively for GEH use. 

### Assume Role Policy
```
{
  Version = "2012-10-17"
  Statement = [
    {
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "events.amazonaws.com"
      }
    },
  ]
}
```

### IAM Policy
This can be a separate policy or an inline policy. 
```
{
 Version = "2012-10-17"
 Statement = [
   {
     Action   = ["events:PutEvents"]
     Effect   = "Allow"
     Resource = "arn:${partition}:events:${GLOBAL_EVENTS_PRIMARY_REGION}:${AWS_ACCOUNT_ID}:event-bus/default"
   },
 ]
}
```

To trade-off specificity for convenience, this example allows the primary region to be any region without changes to the EventBridge IAM policy.   While it is uncommon to change the GEH Primary Region, this formulation of the IAM policy wouldn't require any changes.
```
{
 Version = "2012-10-17"
 Statement = [
   {
     Action   = ["events:PutEvents"]
     Effect   = "Allow"
     Resource = "arn:${partition}:events:*:${AWS_ACCOUNT_ID}:event-bus/default"
   },
 ]
}
```

Terraform example
```
resource "aws_iam_role" "event-handlers-global-role" {
   name = "${$.eventHandlersGlobalNamePolicy}"
   path = "${$.serviceRolesNamePathPolicy}"
   assume_role_policy = jsonencode({
     Version = "2012-10-17"
     Statement = [
       {
         Action = "sts:AssumeRole"
         Effect = "Allow"
         Principal = {
           Service = "events.amazonaws.com"
         }
       },
     ]
   })
   inline_policy {
     name = "aws_api_events_policy"
     policy = jsonencode({
       Version = "2012-10-17"
       Statement = [
         {
           Action   = ["events:PutEvents"]
           Effect   = "Allow"
           Resource = "arn:${partition}:events:${$.eventHandlersGlobalPrimaryRegionPolicy}:${$.item.accountId}:event-bus/default"
         },
       ]
     })
   }
}
```

## Example Calc Policy for Global Events IAM Role ARN
```
resource "turbot_policy_setting" "aws_event_handlers_global_events_target_iam_role_arn" {
  resource       = "RESOURCE_ID" # or the smart folder that holds the other GEH policies
  type           = "tmod:@turbot/aws#/policy/types/eventHandlersGlobalEventsTargetIamRoleArn"
  template_input = <<EOT
{
  account
  {
    # Look for the name of the EventBridge IAM role. 
    event_bridge_role: children(filter:"$.RoleName:${EVENTBRIDGE_IAM_ROLE}"){  
      role:items
      {
        akas
      } 
    }
  }
}
EOT
  template       = <<EOT
{% if $.account.event_bridge_role.role | length == 1 -%}
{{ $.account.event_bridge_role.role[0].akas[0] }}
{% else -%}
{#  if something weird happens, the GEH control will go into `error` because the ARN isn't well-formed. #}
"missing or too many eventbridge roles"
{% endif -%}
EOT
}
```

## Process for migrating to Global Event Handlers 

After deploying the EventBridge IAM role and configuring the GEH > IAM Role ARN, get started on deploy GEH across the workspace.

1. Apply the provided GEH Terraform to your workspace.
2. Use the Global Event Handler Report link below to validate the state of the Global Event Handlers.   It will give you a complete overview of the state of global event handlers for the workspace.   When all GEH controls are in `ok` and have a message of "All required resources exist", deployment is successful. 
3. On successful deployment of global event handlers, set the Event Handlers policy to `Enforce: Not configured`.  This will force cleanup of the legacy event handler infrastructure.  WARN: Setting the event handlers to `Skip` at this point will leave event handler infrastructure deployed concurrent to global event handlers; effectively doubling the events sent back to Guardrails for processing. 
4. Use the Event Handler Report link below to validate the state of the Event Handlers.  When complete, the event handler controls will be in `ok` with a message of "Empty configuration - no action needed".
5. After verification that the event handlers have been successfully decommissioned,  delete the event handler policy settings.  This will change the Event Handler controls to `Skipped`.

## Post Deployment Validation
1. **Event Handler Cleanup**: After setting Event Handlers to `Enforce: Not configured`, the number of EH resources in the Guardrails CMDB should go down fairly quickly.  If EH SNS topics or EventBridge rules stick around in the CMBD, this may be an early indication that the configuration of the Global Event Handlers isn't 100% correct. The Event Handler stack is responsible for destroying the resources, so they won't appear in AWS anymore.  However, those destruction events have to make their way back to Guardrails for processing.  If the GEH aren't working then these events don't make it. After fixing the GEH configuration, it may be necessary to rerun the CMDB controls for SNS topics and EventBridge Rules to clear the residual CMDB entries. 
2. **Primary Region**: Create a new resource in the primary region.  The change should be reflected quickly in the Guardrails console. 
3. **Secondary Regions**: Create a new resource in a secondary region. The change should be reflected quickly in the Guardrails console. 

## Common Problems
**Residual EH Resources in Guardrails CMDB**
If GEH wasn't functioning properly at the time of Event Handler decommission then the EH resource records will remain in the Guardrails CMDB.  After fixing the GEH misconfiguration, the SNS topics and Event Rules need to be removed.  The EH stack has already removed the resources from AWS, it's the Guardrails resource records that need to be cleaned-up. 
   - **Rerun CMDB Controls**: This filter `controlTypeId:'tmod:@turbot/aws-sns#/control/types/topicCmdb','tmod:@turbot/aws-events#/control/types/ruleCmdb' /turbot_/` can be fed to the   [run_controls.py script](https://github.com/turbot/guardrails-samples/tree/master/api_examples/graphql/clients/python/run_controls) for clean-up. 

**Missed Events from Primary Region**
   - **Misconfigured SNS Encryption at Rest**: For enterpises that require encryption at rest for SNS topics, proper configuration of the KMS keys used by Global Event Handlers is crucial. If no events are coming through at all from any region, there may be a misconfiguration with the designated CMK or that the CMK's key policy prevents use by the CloudWatch service. Ensure that the [AWS > Turbot > Event Handlers [Global] > SNS > Topic > Customer Managed Key](https://turbot.com/guardrails/docs/mods/aws/aws/policy#aws--turbot--event-handlers-global--sns--topic--customer-managed-key) points to a CMK that grants `kms:GenerateDataKey*` and `kms:Decrypt` permissions to the CloudWatch Service.  Additional troubleshooting can be done by clearning the `Customer Managed Key` policy setting, letting the GEH control run again and retesting event processing. 
   - **Missing CloudTrail**: Cloudtrail is the source of events that are then passed through EventBridge and SNS back to Guardrails for processing.  Verify that there is at least one active CloudTrail trail serving the primary and secondary regions. Event handling will function properly with Regional, Global or Org CloudTrail trails. A seperate trail *should not* be made for Guardrails use.  This is unnecessary expense and complexity. 
   
**Missed Events from Secondary Regions**
If the EventBridge IAM role is missing, incorrect permissions, or incorrect assume role policy, this prevents functionality in the secondary regions.  The primary region doesn't use the EventBridge role.
   - **Missing IAM Role**:  If the supplied IAM role doesn't exist in the target, the GEH control will go into `error`.  Either deploy the EventBridge role, or adapt the IAM Role ARN calc policy to point at a role that can be used.  
   - **Missing Permissions**: When testing secondary regions, if the EventBridge service doesn't have permissions to use the EventBridge role, then event handling from secondary regions will not happen.  You will be able to see the invocations in the `default` event bus, but no events make it back to Guardrails. Verify that the GEH IAM role has the assume role policy described at the start of this document. Insufficient permissions is another potential cause of missed events from secondary regions.
   


## Reports
Replace `{workspace}` with the hostname of the target workspace to go directly to the Controls by State report for the given workspace. 

### Global Event Handler Reports
`https://{workspac}/apollo/reports/controls-by-state?filter=controlTypeId%3A%27tmod%3A%40turbot%2Faws%23%2Fcontrol%2Ftypes%2FeventHandlersGlobal%27`

### Event Handler Report
`https://{workspace}/apollo/reports/controls-by-state?filter=controlTypeId%3A%27tmod%3A%40turbot%2Faws%23%2Fcontrol%2Ftypes%2FeventHandlers%27`


### Filter String for Controls by State
In the Controls by State report, use this search string to give a complete view of Event Handlers and Global Event Handlers in the workspace.
`controlTypeId:'tmod:@turbot/aws#/control/types/eventHandlersGlobal','tmod:@turbot/aws#/control/types/eventHandlers'`

