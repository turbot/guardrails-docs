---
title: Run Controls Using Scripts
sidebar_label: Run Controls Using Scripts 🛠
---

# Run Controls Using Scripts

In this guide, you will:
- Use the Guardrails Console to identify controls in an error state and resolve them using scripts.

[Controls](/guardrails/docs/reference/glossary#control) enforce [policies](/guardrails/docs/reference/glossary#policy) to ensure cloud resources remain compliant and Guardrails operates effectively. However, a large number of controls may encounter errors due to factors like network outages. To efficiently resolve these errors, use the script available in the [guardrails-samples](https://github.com/turbot/guardrails-samples/tree/main/guardrails_utilities/shell_utils/run-controls) GitHub repository to rerun the affected controls. Regularly addressing controls in an Error state helps maintain system stability and compliance.

## Prerequisites

- **Turbot/Operator** permissions at the Turbot resource level.
- Familiarity with Github and the Guardrails console.

## Step 1: Navigate to Controls

Log into the Guardrails console with provided local credentials or by using any SAML based login and Select **Controls** from the top navigation menu.

![Navigate to Controls](/images/docs/guardrails/using/controls//run-controls-using-scripts/guardrails-navigate-to-controls.png)

## Step 2: Identify Control Errors

In the Controls section, filter and select the controls in an `Error` state that need to be re-run.

![Identify Control Errors](/images/docs/guardrails/using/controls//run-controls-using-scripts/identify-controls-errors.png)

## Step 3: Retrieve Control Type URI

Open the control details, navigate to the **Developers** tab, and copy the `Control Type URI` for use in later steps.

![Control Type URI](/images/docs/guardrails/using/controls//run-controls-using-scripts/guardrails-retrieve-control-uri.png)

## Step 4: Clone Guardrails Samples Repository

Go to [guardrails-samples](https://github.com/turbot/guardrails-samples) and clone the repository.

![Guardrails Samples](/images/docs/guardrails/using/controls//run-controls-using-scripts/github-guardrails-samples-repo.png)

## Step 5: Navigate to Run-Controls Directory

In the cloned repository, navigate to the following folder:

`guardrails_utilities/shell_utils/run-controls`

## Step 6: Set Environment Variables

Set the necessary environment variables using the command below:

```
export TURBOT_WORKSPACE="https://<environment-name>.cloud.turbot.com/"
export TURBOT_ACCESS_KEY_ID=ac61d2e4-730c-4b54-8c3c-6ef172390814
export TURBOT_SECRET_ACCESS_KEY=151b296b-0694-4a28-94c4-4b67fa82ab2c
```

## Step 7: Run Controls via Script

Execute this script using the Control Type URI from [Step 3](#step-3-retrieve-control-type-uri). The batch size is set to 25 to minimize database load.

```
./run-controls.sh --filter 'state:error controlTypeId:tmod:@turbot/turbot#/control/types/controlInstalled' --batch-size 25
```
The script should start running and output results similar to below:

```
[INFO] Control 1 of 22
[INFO]    Type: "Type Installed"
[INFO]    Resource: "Turbot > @turbot/aws-rds > Update Performance Configuration"
[INFO]    State: "error"
[INFO]    Reason: "Error running trusted inline"
[INFO]    ID: "311522861481171"
[INFO] Control 2 of 22
[INFO]    Type: "Type Installed"
[INFO]    Resource: "Turbot > @turbot/aws-rds > Set Tags"
[INFO]    State: "error"
[INFO]    Reason: "Error running trusted inline"
[INFO]    ID: "293907562769114"
[INFO] Control 3 of 22
[INFO]    Type: "Type Installed"
[INFO]    Resource: "Turbot > @turbot/aws-rds > Delete from AWS"
[INFO]    State: "error"
[INFO]    Reason: "Error running trusted inline"
[INFO]    ID: "293907548601779"
[INFO] Control 4 of 22
[INFO]    Type: "Type Installed"
[INFO]    Resource: "Turbot > @turbot/aws-rds > Delete from AWS"
[INFO]    State: "error"
[INFO]    Reason: "Error running trusted inline"
[INFO]    ID: "293907547759782"
[INFO] Control 22 of 22
[INFO]    Type: "Type Installed"
[INFO]    Resource: "Turbot > @turbot/aws-rds > Update Access Logging"
[INFO]    State: "error"
[INFO]    Reason: "Error running trusted inline"
[INFO]    ID: "195756668765883"
[INFO] Total amount of controls re-run: 22
[INFO] Total time taken 7 second(s)
```

The command stops once all controls have successfully run.

## Step 8: Review

Check that all controls have moved to an `OK` state.

![Navigate to Reports](/images/docs/guardrails/using/controls//run-controls-using-scripts/guardrails-verify-control-status.png)

> [!NOTE]
> If you need to resolve policies that are not evaluating properly, you can use the same approach with the run-policies script instead.


## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Common errors                     | Common issues that may prevent controls from running include network connectivity problems, permission issues, and API rate limits. These can cause controls to enter an error state.   |Refer to [Common Troubleshooting](/guardrails/docs/guides/troubleshooting) for detailed resolution steps.|
| Further Assistance                       | If you encounter further issues with Calculated Policies, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)   |
