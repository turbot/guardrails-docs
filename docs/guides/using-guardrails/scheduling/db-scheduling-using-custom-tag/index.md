---
title: Schedule DB Start/Stop with Custom Tag
sidebar_label: Schedule DB Start/Stop with Custom Tag
---

# Scheduling DB Instance Start/Stop Using Custom Tag

In this guide, you will:

- Use Guardrails UI to automate the scheduling of AWS RDS DB Instances using Guardrails policies.

Turbot Guardrails' [Instance Scheduling](/guardrails/docs/concepts/guardrails/scheduling#scheduling-in-guardrails) allows you to define pre-scheduled start and stop times for RDS DB Instances at the resource or account level. Automating scheduling ensures instances run only when needed, optimizing costs and improving efficiency. By applying Guardrails policies, you can align instance usage with business hours, workload demands, and compliance requirements, reducing unnecessary compute costs while maintaining operational flexibility.

## Prerequisites

- **Turbot/Admin** permissions at the Turbot resource level.
- Access to the Guardrails AWS account.
- Familiarity with Guardrails console and AWS RDS Service.

## Step 1: Navigate to Policies

Log into the Guardrails console with provided local credentials or by using any SAML-based login and select **Policies** from the top navigation menu.

![Navigate to Policies](/images/docs/guardrails/guides/using-guardrails/scheduling/db-scheduling-using-custom-tag/guardrails-navigate-policies.png)

## Step 2: Locate Schedule Tag Policy

From Policies, search and locate the `AWS > RDS > Instance > Schedule Tag` policy.

![RDS Schedule Tag Policy](/images/docs/guardrails/guides/using-guardrails/scheduling/db-scheduling-using-custom-tag/guardrails-locate-schedule-tag.png)

## Step 3: Configure the Schedule Tag Policy

Select **New Policy Setting** from the top right corner.

![New Policy Setting](/images/docs/guardrails/guides/using-guardrails/scheduling/db-scheduling-using-custom-tag/guardrails-schedule-tag-select-setting.png)

Select the resource and choose `Enforce: Schedule per turbot_custom_schedule` setting. Select **Create**.

![Create Schedule Tag](/images/docs/guardrails/guides/using-guardrails/scheduling/db-scheduling-using-custom-tag/guardrails-schedule-tag-create-setting.png)

## Step 4: Configure Schedule Tag Name Policy

Navigate to the `AWS > RDS > DB Instance > Schedule Tag > Name` policy. Select **New Policy Setting** from the top right corner.

![Select Schedule Tag Name](/images/docs/guardrails/guides/using-guardrails/scheduling/db-scheduling-using-custom-tag/guardrails-schedule-tag-name-new-setting.png)

Select the resource, go to Settings, and enter the tag key to define the schedule for the DB instance. Here we use `turbot_custom_schedule` as the key. Click **Create** to apply the changes.

![Create Policy Setting](/images/docs/guardrails/guides/using-guardrails/scheduling/db-scheduling-using-custom-tag/guardrails-schedule-tag-name-create-setting.png)

## Step 5: Apply Tag to Instance

When the Schedule Tag policy is set to `Enforce: Schedule per turbot_custom_schedule tag`, Guardrails will attempt to use the tag's value for setting the schedule. A tag with the exact key name as `turbot_custom_schedule` and value with the correct expression should be set for the instance.

Ensure the cron job follows the format:
`{"start": "8 * * MON-FRI", "stop": "16 * * MON-FRI"}`
and encode it in Base64 as
`eyJzdGFydCI6ICIqIDggKiAqIE1PTi1GUkkiLCAic3RvcCI6ICIqIDE2ICogKiBNT04tRlJJIn0=`.
This format is required for RDS tagging.

![Apply Tag on RDS DB Instance](/images/docs/guardrails/guides/using-guardrails/scheduling/db-scheduling-using-custom-tag/aws-rds-set-tag.png)

## Step 6: Review

- [ ] Verify that the scheduling policy has been successfully applied in the Guardrails console under **Controls**.
- [ ] Check that the RDS DB instance has been stopped at the scheduled time by reviewing its state in the AWS Console under **RDS > Instances**.
- [ ] If the instance has not stopped as expected, review the applied tag to ensure it matches the **turbot_custom_schedule** key with the correct cron format.
- [ ] If issues persist, check the [Guardrails control logs](/guardrails/docs/guides/using-guardrails/troubleshooting/access-control-logs) to identify any policy misconfigurations or errors.

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Scheduling policy is not applied | The schedule tag may not be configured correctly or the tag name might not match the expected key. | Verify the policy settings and confirm that the tag name aligns with the defined `Schedule Tag Name` policy. |
| DB instance is not stopping as per schedule | The cron expression may be incorrect or improperly formatted. | Validate the Base64 encoding of the cron expression and confirm that it is correctly applied to the instance. |
| Common errors                     | Common issues that may prevent controls from running include network connectivity problems, permission issues, and API rate limits. These can cause controls to enter an error state. | Refer to [Common Troubleshooting](/guardrails/docs/guides/troubleshooting) for detailed resolution steps. |
| Further Assistance                       | If you encounter further issues, please open a ticket with us and attach the relevant information to assist you more efficiently. | [Open Support Ticket](https://support.turbot.com) |