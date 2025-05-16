---
title: S3 Bucket Report in Guardrails
sidebar_label: S3 Bucket Report
guide_type: guide
---

# S3 Bucket Report in Guardrails

This guide walks you through generating and interpreting the S3 Bucket Report in Turbot Guardrails. The S3 Bucket Report helps you quickly assess the state of your AWS S3 buckets, including versioning and logging status, so you can identify risks and improve your cloud security posture.

The report is especially useful for:
- Auditing S3 bucket configurations
- Identifying buckets with versioning suspended or logging disabled
- Monitoring compliance and security best practices

## Prerequisites

- **Turbot/Operator** permissions at the Turbot resource level
- Access to the Guardrails console
- AWS S3 buckets managed in your Guardrails workspace

## Step 1: Open Workspace and Reports

Log in to your Guardrails console, navigate to your **Workspace**, and then go to the **Reports** section.

![Navigate to Workspace and Reports](https://ajeuwbhvhr.cloudimg.io/https://colony-recorder.s3.amazonaws.com/files/2025-05-07/d0bb8cd5-4e69-4a65-8cf7-053618923a47/user_cropped_screenshot.webp?tl_px=0,88&br_px=1376,857&force_format=jpeg&q=100&width=1120.0)

## Step 2: Access S3 Buckets Section

In the resource detail section, select **AWS S3 Buckets**.

![S3 Buckets Section](https://ajeuwbhvhr.cloudimg.io/https://colony-recorder.s3.amazonaws.com/files/2025-05-07/a40c92f6-7e2c-4989-8646-e5e3bbdac95c/user_cropped_screenshot.webp?tl_px=0,0&br_px=1376,769&force_format=jpeg&q=100&width=1120.0)

## Step 3: Review Bucket Count

The report displays the total number of S3 buckets in your workspace.

![Bucket Count](https://ajeuwbhvhr.cloudimg.io/https://colony-recorder.s3.amazonaws.com/files/2025-05-07/a781e635-2236-405d-b03a-955df1f81ed9/ascreenshot.jpeg?tl_px=0,0&br_px=1376,769&force_format=jpeg&q=100&width=1120.0&wat=1&wat_opacity=0.7&wat_gravity=northwest&wat_url=https://colony-recorder.s3.us-west-1.amazonaws.com/images/watermarks/FB923C_standard.png&wat_pad=91,219)

## Step 4: Check Buckets with Versioning Suspended

To check which buckets have versioning suspended, look for the relevant filter or indicator in the report.

![Buckets with Versioning Suspended](https://ajeuwbhvhr.cloudimg.io/https://colony-recorder.s3.amazonaws.com/files/2025-05-07/a1c06036-3869-4ad1-9dff-a78cdf33dfdc/ascreenshot.jpeg?tl_px=0,5&br_px=1376,774&force_format=jpeg&q=100&width=1120.0&wat=1&wat_opacity=0.7&wat_gravity=northwest&wat_url=https://colony-recorder.s3.us-west-1.amazonaws.com/images/watermarks/FB923C_standard.png&wat_pad=1055,155)

## Step 5: Click Suspended Filter

Click the **Suspended** filter to view only those buckets with versioning suspended.

![Click Suspended Filter](https://ajeuwbhvhr.cloudimg.io/https://colony-recorder.s3.amazonaws.com/files/2025-05-07/f03f74ad-6812-4146-8c71-a0a1208b5b67/ascreenshot.jpeg?tl_px=0,0&br_px=1376,769&force_format=jpeg&q=100&width=1120.0&wat=1&wat_opacity=0.7&wat_gravity=northwest&wat_url=https://colony-recorder.s3.us-west-1.amazonaws.com/images/watermarks/FB923C_standard.png&wat_pad=1053,217)

> [!TIP]
> Use the **Suspended** filter to quickly identify buckets that may not have versioning enabled, which is a best practice for data protection.

## Step 6: View Buckets Without Versioning

The report will show the number of buckets without versioning enabled (e.g., "Out of 123 buckets, 93 have no versioning available").

![Buckets Without Versioning](https://ajeuwbhvhr.cloudimg.io/https://colony-recorder.s3.amazonaws.com/files/2025-05-07/3de77f93-5463-4e3c-a4bf-76a371f0f068/ascreenshot.jpeg?tl_px=0,5&br_px=1376,774&force_format=jpeg&q=100&width=1120.0&wat=1&wat_opacity=0.7&wat_gravity=northwest&wat_url=https://colony-recorder.s3.us-west-1.amazonaws.com/images/watermarks/FB923C_standard.png&wat_pad=607,281)

## Step 7: Check Logging Disabled

To further audit, check which buckets have logging disabled by applying the relevant filter.

![Check Logging Disabled](https://ajeuwbhvhr.cloudimg.io/https://colony-recorder.s3.amazonaws.com/files/2025-05-07/cada66de-52ee-47f3-9c13-4a35674dfbba/user_cropped_screenshot.webp?tl_px=0,0&br_px=1541,934&force_format=jpeg&q=100&width=1120.0)

## Step 8: Review Buckets with Logging Disabled

The report will display the number of buckets with logging disabled (e.g., "92 buckets have logging disabled").

![Buckets with Logging Disabled](https://ajeuwbhvhr.cloudimg.io/https://colony-recorder.s3.amazonaws.com/files/2025-05-07/8426b160-aa46-4d94-8851-5d33e0b082c6/ascreenshot.jpeg?tl_px=0,34&br_px=1376,803&force_format=jpeg&q=100&width=1120.0&wat=1&wat_opacity=0.7&wat_gravity=northwest&wat_url=https://colony-recorder.s3.us-west-1.amazonaws.com/images/watermarks/FB923C_standard.png&wat_pad=913,262)

## Monitor and Review

After following the steps above, you should be able to:
- [ ] View the total number of S3 buckets
- [ ] Identify buckets with versioning suspended
- [ ] Identify buckets with logging disabled

> [!NOTE]
> Regularly reviewing your S3 bucket configurations helps maintain compliance and security.

## Next Steps

- Learn more about [S3 Bucket Security Best Practices](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html)
- Explore [Guardrails Reports Overview](/guardrails/docs/guides/using-guardrails/console/reports)

## Troubleshooting

| Issue                        | Description                                                                                                   | Guide                                              |
|------------------------------|---------------------------------------------------------------------------------------------------------------|----------------------------------------------------|
| Buckets not visible          | Ensure you have the correct permissions and are at the right resource level.                                   | [Open Support Ticket](https://support.turbot.com)  |
| Data not updating            | Try refreshing the page or check for any ongoing maintenance in Guardrails.                                    | [Open Support Ticket](https://support.turbot.com)  |
| Further Assistance           | If you continue to encounter issues, please open a ticket and attach relevant information for faster support.  | [Open Support Ticket](https://support.turbot.com)  |