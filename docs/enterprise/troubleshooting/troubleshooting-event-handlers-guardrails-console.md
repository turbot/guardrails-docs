---
title: "AWS Event Handlers in the Guardrails Console"
sidebar_label: "AWS Event Handlers in the Guardrails Console"
---

# Troubleshooting AWS Event Handlers in the Guardrails Console

## When to use this guide?
Use this guide to verify that the configuration for AWS Event Handling is correct and the deployment controls are in `OK` state. This guide focuses on a single region in an account.  In most cases, the problems and fixes identified by this guide will apply to other regions.

## Are event handlers working right now?
As a first pass to see if event handlers are working correctly.
1. Log into the Guardrails console.
2. Go to the problem account then select a region.
3. Go to the Activity tab for that region.
4. Set filter to "Descendant".
5. Change the Type filter to only show "Resources".
6. How long ago was the most recent resource\_\[created,updated,deleted\] event?
7. In the AWS console, create a resource in this region with a unique, easily searchable name.
8. Go back to the Guardrails Console. Check the regional activity tab for references to the new resource.
9. If the resource appears within a few minutes, then event handling is functional for this region.
   a. Generally, AWS event handling is very fast but because of variable system load, can sometimes take a minute or so to process.

## Common Configuration Issues
1. Check that `AWS > Turbot > Event Handlers` policy is set to `Enforce: Configured`.
   1. If not set to `Enforce: Configured` then Guardrails will not create event handler resources.
   2. A common practice is to set the Event Handler policy at the top most folder of the AWS resource hierarchy (or at the turbot level) so that the policy setting applies to all AWS accounts in the workspace.
2. Check for exceptions on the Event Handler policy
   1. Look for `AWS > Turbot > Event Handler policy` settings of `Skip` or `Enforce: Not configured`.  If there are exceptions, then Guardrails is behaving as configured.  It could be that the region of concern has Event Handlers skipped or not configured.
3. Check that `AWS > Turbot > Event Pollers` are not set (or disabled)
   1. By default the Event Pollers are disabled when Event Handling is enabled.  Explicitly enabling Event Pollers induces unnecessary load on Guardrails.
4. Check that required mods are installed:
   1. The following mods are required for event handlers to work: `aws`, `aws-iam`, `aws-kms`, `aws-sns`, and `aws-events`.
   2. Ensure these mods are installed and in OK state.
5. Check that the Guardrails mod for the service of interest has been installed.
   1. Guardrails will only track resources for installed mods.  If the mod is missing, install it.
6. Check that CMDB is enabled for SNS topics, SNS subscriptions, Event Rules or Event Targets.
   1. CMDB is enabled for these resources by default, so the absence of any policy setting is valid and correct.
   2. If the CMDB policy is set to `Enforce: Disabled` or `Skip` for any event handler resources then Guardrails cannot properly manage those resources.  Remove any CMDB policy setting that disables or skips CMDB for these resources.
7. Check that CMDB is enabled for the resource type you are testing.
   1. Even with Event Handlers enabled and the appropriate mod installed, Guardrails will not track resources if that resource type’s CMDB policy has been set to `Skip` or `Enforce: Disabled`.
   2. For example, if the `AWS > S3 > Bucket > CMDB` policy has been set to `Skip` or `Enforce: Disabled` then Guardrails will not track any changes to S3 buckets, regardless of event handler configuration.
8. Check that all Event Handler controls are in an `OK` state.
   1. "Access Denied" error? This will prevent Guardrails from deploying or updating event handler resources.
      1. Check the permissions for the Turbot Guardrails IAM role against the minimum required.
      2. Service Control Policies are commonly used by organizations to lock out unapproved regions or otherwise limit access to accounts.
      3. By default, Guardrails attempts to deploy event handlers in all regions.  Change the `AWS > Account > Regions` policy to match up with the  regions allowed by your organization's SCP.
      4. Ensure other SCPs do not limit Guardrails' access to create SNS and Events resources.
   2. If the control logs show a different error, record the debug output of the control to reference with Guardrails Support if necessary.

If you have changed/corrected any of the above settings, wait ~15 min for the event handlers to reset and then try testing the event flow again.

## Advanced Troubleshooting

If all of the above settings are verified, and events are still not being received by Guardrails, it is possible that the internal representation of the event handler infrastructure is out of sync with current state.

You can use a [script](https://github.com/turbot/guardrails-samples/tree/main/guardrails_utilities/python_utils/run_controls_batches) from the [Guardrails Samples Repo](https://github.com/turbot/guardrails-samples) to get your environment back in-sync.  Running this script will catch any new, altered or destroyed Event Handler resources across the entire workspace. Clone the repo locally and follow the readme for how to set up your environment.  Once setup you can use the following filter to synchronize Guardrails' CMDB with the current state of resources in AWS:
```shell
python3 run_controls.py --profile {workspace_profile} --filter "sort:-stateChangeTimestamp controlCategoryId:'tmod:@turbot/turbot#/control/categories/cmdb' resourceTypeId:'tmod:@turbot/aws-sns#/resource/types/topic','tmod:@turbot/aws-sns#/resource/types/subscription','tmod:@turbot/aws-events#/resource/types/rule','tmod:@turbot/aws-events#/resource/types/target'" --execute
```

After running the above command, if there are differences between the event handler resources in AWS compared to Guardrails, then the Event Handler control will rerun and recreate the missing resources.
Once all of the Event Handler controls are in an `OK` state, retest event handling.  If events are still not working, additional troubleshooting is necessary by Guardrails support, proceed with the steps below to gather the information necessary for support to help troubleshoot.

## Opening a support ticket for Event Handling Issues

1. Log into the Guardrails console.
2. On the top Reports tab then go to the `Policy Settings by Type` report.
3. Search for "policyTypeId:'tmod:@turbot/aws#/policy/types/eventHandlers'".
   1. Click the `Export to CSV` button in the top right corner.
   2. If no Event Handler policies are present then one should be set high in the resource hierarchy to cover all AWS accounts.
   3. Expected result: The policy  should be set to `Enforce: Configured` somewhere high in the resource hierarchy.
   4. Potential problems: Note any exceptions that would turn off or prevent deployment of Event Handlers with policy settings of `Skip` or `Enforce: Not configured.`
4. Stay in the `Policy Settings by Type` report.  Clear the search term then paste in: "policyTypeId:'tmod:@turbot/aws#/policy/types/eventPoller'"
   1. If there are Event Poller settings, click the `Export to CSV` button in the top right corner.
   2. Expected Result: There should be no Event Poller settings
   3. Potential Problems: If event handlers and event pollers are explicitly enabled then there is additional unnecessary load on Guardrails.
5. Stay in the `Policy Settings by Type` report. Clear the search term then paste in: "controlCategoryId:'tmod:@turbot/turbot#/control/categories/cmdb'"
   1. If there are any CMDB policy settings, click the `Export to CSV` button in the top right corner.
   2. CMDB settings of `Skip` or `Enforce: Disabled` for event handler resource types (SNS topics, SNS subscriptions, Event rules and Event Targets) will prevent the event handlers from deploying properly.
6. Go to the Reports tab then go to the Controls by Control Type report. Search for "controlTypeId:'tmod:@turbot/aws#/control/types/eventHandlers' state:tbd,error,skipped"
   1. If there are any rows, click the `Export to CSV` button in the top right corner.
   2. Expected Result: We hope to see no rows returned.  Any control that appears in this list needs to be addressed.
   3. `Skipped` Event Handlers need to have the Event Handlers policy set to `Enforce: Configured`
   4. `TBD` Event handlers haven’t ever run.  Controls in this state for longer than an hour should be rerun.
   5. `Error` Event handlers have encountered an error that prevents them from completing all work.  Event handlers in this state are covered in more depth below.
7. Replace the filter term with "controlTypeId:'tmod:@turbot/aws#/control/types/eventHandlers'" and use the `Resource` filter to find the account of interest.
   1. Click the `Export to CSV` button in the top right corner.
   2. Click into the Event Handler control row for the region of interest.
8. You should be looking at a Controls page with `AWS > Turbot > Event Handler` across the top and the region of interest just below it.
9. Click the orange `Actions` button then click `Run Control`.  This will take you to a Logs screen. Wait for the status graphic in the top left to say `Terminated`.
10. In the top right corner of the logs section, there is a drop down box that says `Info level and above`, change that to `Level: Debug and above`.
11. Below that dropdown menu is a small `Copy to Clipboard` icon.  Copy those logs and save the results into a text file.
12. Collect a list of all installed AWS mods using the `Resources by Resource Type` report.
   1. Search for "resourceTypeId:'tmod:@turbot/turbot#/resource/types/mod' level:self" then click the `Export to CSV` button.
13. Get the policy value for the `Turbot > Workspace > Gateway Domain Name` policy using the `Policy Settings by State` report.
   1. Search for "policyTypeId:'tmod:@turbot/turbot#/policy/types/gatewayDomainName'" then click the `Export to CSV` button.
14. What are the current versions of TEF and TE deployed to your environment?
14. Login to the AWS Console (detailed steps in the companion troubleshooting guide: AWS Event Handlers in the Guardrails Console)
   1. Collect the AWS CloudTrail event log for an event that was tested and not found by Guardrails
   1. Screenshot the EventBridge Rules in this account.
   1. Screenshot of the SNS Topic and Topic Subscription
   1. JSON configuration of the iam policy(ies) used for the Guardrails cross account role
15. Some details on the account:
   1. When was the account imported
   2. When did event handling stop
   3. What resource types have you tested with
   4. What accounts and regions are affected?
   5. Are other regions in the same account working
   6. Are other accounts working?
16. Open a ticket on https://support.turbot.com and attach the collected information.
