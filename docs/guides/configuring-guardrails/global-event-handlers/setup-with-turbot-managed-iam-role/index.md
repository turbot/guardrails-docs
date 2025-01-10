---
title: Setup With Turbot-Managed IAM Role
sidebar_label: Setup With Turbot-Managed IAM Role
---

# Setting Up With Turbot-Managed IAM Role

In this guide, you will:

- Setup Global Event Handlers in the Guardrails workspace using the Guardrails UI.
- Monitor and troubleshoot the GEH update process.

Guardrails is designed to enable organizations to selectively install policies, controls, and guardrails tailored to specific services. The Global [Event Handler](/guardrails/docs/reference/glossary#event-handler) simplifies cloud management by providing a unified framework for responding to and managing events, ensuring proactive governance and security across cloud environments.

## Prerequisites

- **Turbot/Owner** permissions at the Turbot resource level.
- Familiarity with Guardrails console.
- Turbot Guardrails configured IAM role should have required IAM permissions to create IAM role and policy.
- CloudTrail should be configured. See [here](/guardrails/docs/guides/aws/event-handlers#configuring-cloudtrail) for more details.

## Step 1: Login Guardrails Console

Log into the Guardrails console with provided local credentials or by using any SAML based login.

![Guardrails Console Login](/images/docs/guardrails/guides/configuring-guardrails/global-event-handlers/setup-with-turbot-managed-iam-role/guardrails-console-login.png)

## Step 2: Enable Service Role

IAM role is required for Global Event handler. This can be created manually by customer or can be done by AWS Turbot Service Role

![Enable Service Role](/images/docs/guardrails/guides/configuring-guardrails/global-event-handlers/setup-with-turbot-managed-iam-role/geh-aws-turbot-service-roles.png)

Check if all the `AWS > Turbot > Service Roles`controls in all AWS accounts are in `OK` state

![Service Role Control](/images/docs/guardrails/guides/configuring-guardrails/global-event-handlers/setup-with-turbot-managed-iam-role/geh-check-control-status.png)

## Step 3: Check Service Role Source Policy

Select any one of the control from the above step and navigate to **Policies**, select **Source** to validate the created policy.

![Service Role Source Policy](/images/docs/guardrails/guides/configuring-guardrails/global-event-handlers/setup-with-turbot-managed-iam-role/geh-service-role-source-policy.png)

> [!NOTE]
> You can create these roles manually and use the same. Open a [Support Ticket](https://support.turbot.com) to help you with the process in case you need to create these roles manually as per your compliance need.

## Step 4: Enable Global Event Handler

In the Guardrails's console navigate to the **Policies** and search for `AWS > Turbot > Service Roles > Event Handlers [Global]` policy. Select **New Policy Setting**

![Event Handlers [Global] Policy](/images/docs/guardrails/guides/configuring-guardrails/global-event-handlers/setup-with-turbot-managed-iam-role/geh-policy.png)

Choose **Resource** as `Turbot` and **Setting** as `Enabled`

![Enable GEH](/images/docs/guardrails/guides/configuring-guardrails/global-event-handlers/setup-with-turbot-managed-iam-role/gen-aws-turbot-event-handler-global-enabled.png)

## Step 5: Review

Validate that the setting is applied successfully. While in **Settings** tab, select **Event Handler [Global]** value.

![Select Value](/images/docs/guardrails/guides/configuring-guardrails/global-event-handlers/setup-with-turbot-managed-iam-role/select-value.png)

Ensure the value is shown as `Enabled`. Select no of values circled to validate the number of account where the policy is applied.

![Validate Post Setting Values](/images/docs/guardrails/guides/configuring-guardrails/global-event-handlers/setup-with-turbot-managed-iam-role/validate-post-setting-values.png)

Check if all the related controls for `AWS > Turbot > Event Handlers [Global]` are in `OK` state. You can browse to the **Reports** tab, navigate to `Controls by State`, select `AWS > Turbot > Event Handlers [Global]` in _`Types`_. Ensure all controls are in `OK` state.

![Report Event Handler Global](/images/docs/guardrails/guides/configuring-guardrails/global-event-handlers/setup-with-turbot-managed-iam-role/event-handler-global-controls.png)

## Step 6: Verify Events

The global event handlers are now configured in the target account. To verify they are functioning correctly:

1. **Primary Region Testing**:
   Create a resource in the primary region and verify its detection. Confirm that the associated controls are triggered and executed based on the policies set in the Guardrails console.

2. **Secondary Region Testing**:
   Create a resource in a secondary region and verify its detection. Ensure that the associated controls are triggered and executed according to the policies set in the Guardrails console.


## Troubleshooting

| Issue                                                                                                                                              | Description                                                                                                                                            | Guide                                                                                                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Permission Issues                                                                                                                                  | If the permissions granted to the Turbot IAM role do not allow configuration of event rules and SNS topics, then the logs will indicate access denied. | [Troubleshoot Permission Issues](/guardrails/docs/enterprise/FAQ/admin-permissions#aws-permissions-for-turbot-guardrails-administrators)                                                                  |
| [Service control policies (SCPs)](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html) Regional Restrictions | SCPs restrictions will appear as `Access Denied` errors in the Guardrails console.                                                                     | Work with your SCP admins to determine which regions are permitted then update the [AWS > Account > Regions](/guardrails/docs/mods/awsaws/policy#aws--account--approved-regions-default) policy to match. |
| Further Assistance                                                                                                                                 | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                  | [Open Support Ticket](https://support.turbot.com)                                                                                                                                                         |
