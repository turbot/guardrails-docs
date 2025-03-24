---
title: Create TE Critical Alarms
sidebar_label: Create TE Critical Alarms
---

# Set Up Critical Alarms for Turbot Enterprise (TE)

In this guide, you will:

- Use AWS CloudFormation to set up critical alarms for Turbot Enterprise (TE)
- Monitor key metrics such as worker and factory queue backlogs
- Ensure proactive monitoring and alerting for TE instances

Monitoring your Turbot Enterprise environment is crucial for maintaining optimal performance and ensuring system reliability. By setting up critical alarms, you can proactively detect and respond to potential issues before they impact your operations. This guide will walk you through deploying a CloudFormation template to set up these alarms.

## Prerequisites

- Access to the AWS account where Turbot Enterprise is deployed
- AWS IAM permissions to create CloudFormation stacks and necessary resources
- Existing Turbot Enterprise (TE) installations
- Access to the Turbot Guardrails AWS account with [Administrator Privileges](/guardrails/docs/enterprise/FAQ/admin-permissions)

## Step 1: Access AWS Console

Log in to the AWS Management Console and navigate to the **CloudFormation** service in the region where your TE is deployed.

<!-- ![CloudFormation Console](/images/docs/guardrails/guides/hosting-guardrails/installation/post-installation/cloudformation-console.png) -->

## Step 2: Copy the CloudFormation Template

Below is the **TE Critical Alarms CloudFormation Template** that you will use to set up the alarms. Copy the entire template and save it as a file on your local machine with a `.yml` extension (e.g., `te_alarms_template.yml`).

```yaml
AWSTemplateFormatVersion: "2010-09-09"

Description: Turbot Guardrails Enterprise Monitoring

Metadata:
  AWS::CloudFormation::Interface:
    ParameterGroups:
      - Label:
          default: Advanced - Infrastructure
        Parameters:
          - ResourceNamePrefix
          - StackResourceNamePrefix
          - EnterpriseVersion

    ParameterLabels:
      # Advanced - Turbot
      ResourceNamePrefix:
        default: Resource Name Prefix

      # Temporary parameter, since there are existing alarms and resources in place with ResourceNamePrefix,
      # adding additional prefix.
      StackResourceNamePrefix:
        default: Stack Resource Name Prefix

      EnterpriseVersion:
        default: Enterprise Version

Parameters:
  ResourceNamePrefix:
    Description: >
      Name of the resource prefix used by the Turbot Guardrails Database stack, which
      is a prefix for exported outputs from that stack.
    Type: String
    Default: turbot
    AllowedPattern: "^[a-z][a-z0-9]*$"

  StackResourceNamePrefix:
    Description: >
      Name of the resources prefix created by this Stack.
    Type: String
    Default: monitoring
    AllowedPattern: "^[a-z][a-z0-9]*$"

  EnterpriseVersion:
    Description: Select the version of the Enterprise.
    Type: String
    Default: 5.46.0

Mappings:
  Constants:
    Turbot:
      EntityName: Turbot HQ Inc

Resources:
  Dashboard:
    Type: AWS::CloudWatch::Dashboard
    Properties:
      DashboardName: !Sub
        - "${ResourceNamePrefix}_${StackResourceNamePrefix}_${SafeVersion}_${Region}"
        - SafeVersion: !Join ["_", !Split [".", !Join ["_", !Split ["-", !Ref EnterpriseVersion]]]]
          Region: !Join ["_", !Split ["-", !Ref "AWS::Region"]]
      DashboardBody: !Join
        - ""
        - - |
            { "widgets": [

          - !Join
            - ","
            - - !Sub
                - |
                  {
                    "height": 2,
                    "width": 24,
                    "y": 0,
                    "x": 0,
                    "type": "text",
                    "properties": {
                        "markdown": "# Events & Workers"
                    }
                  }
                - {}

              - !Sub
                - |
                  {
                    "height": 6,
                    "width": 15,
                    "y": 2,
                    "x": 0,
                    "type": "metric",
                    "properties": {
                      "metrics": [
                        [ "AWS/SQS", "NumberOfMessagesReceived", "QueueName", "${WorkerQueueName}", { "stat": "Sum", "period": 300  } ],
                        [ "AWS/SQS", "NumberOfMessagesSent",     "QueueName", "${WorkerQueueName}", { "stat": "Sum", "period": 300  } ],
                        [ "AWS/SQS", "NumberOfMessagesDeleted",  "QueueName", "${WorkerQueueName}", { "stat": "Sum", "period": 300  } ],
                        [ "AWS/SQS", "NumberOfMessagesReceived", "QueueName", "${FactoryQueueName}", { "stat": "Sum", "period": 300  } ],
                        [ "AWS/SQS", "NumberOfMessagesSent",     "QueueName", "${FactoryQueueName}", { "stat": "Sum", "period": 300  } ],
                        [ "AWS/SQS", "NumberOfMessagesDeleted",  "QueueName", "${FactoryQueueName}", { "stat": "Sum", "period": 300  } ]
                      ],
                      "view": "timeSeries",
                      "stacked": false,
                      "region": "${AWS::Region}",
                      "title": "Events Queue Activity",
                      "period": 300,
                      "yAxis": {
                        "left": {
                          "min": 0
                        }
                      }
                    }
                  }
                - WorkerQueueName: !Sub
                    - "${ResourceNamePrefix}_${SafeVersion}_events"
                    - SafeVersion: !Join ["_", !Split [".", !Join ["_", !Split ["-", !Ref EnterpriseVersion]]]]
                  FactoryQueueName: !Sub
                    - "${ResourceNamePrefix}_${SafeVersion}_events_factory"
                    - SafeVersion: !Join ["_", !Split [".", !Join ["_", !Split ["-", !Ref EnterpriseVersion]]]]

              - !Sub
                - |
                  {
                    "height": 6,
                    "width": 9,
                    "y": 2,
                    "x": 15,
                    "type": "text",
                    "properties": {
                        "markdown": "_The Events Queue is the heart of running controls, actions, calculated policies, notifications and all worker tasks._\n\n**Healthy**: Tasks done (green) will match exactly tasks planned (red) and tasks attempted (orange). There may be spikes in load, but generally the chart appears as a single steady line. By design, Turbot Guardrails should have very few events when there is no activity in the environment.\n\n**Overloaded**: Tasks planned (red) exceeds tasks done (green) for a sustained period, creating a backlog of work.\n\n**High Task Retry Rate**: Tasks attempted (orange) is at a sustained, high level. Retries happen occasionally (e.g. throttling) but ongoing levels usually indicate a noisy mod or control.\n"
                    }
                  }
                - {}

              - !Sub
                - |
                  {
                    "height": 6,
                    "width": 15,
                    "y": 8,
                    "x": 0,
                    "type": "metric",
                    "properties": {
                      "metrics": [
                        [ "AWS/SQS", "ApproximateNumberOfMessagesDelayed",    "QueueName", "${WorkerQueueName}" ],
                        [ "AWS/SQS", "ApproximateNumberOfMessagesVisible",    "QueueName", "${WorkerQueueName}" ],
                        [ "AWS/SQS", "ApproximateNumberOfMessagesNotVisible", "QueueName", "${WorkerQueueName}" ],
                        [ "AWS/SQS", "ApproximateNumberOfMessagesDelayed",    "QueueName", "${FactoryQueueName}" ],
                        [ "AWS/SQS", "ApproximateNumberOfMessagesVisible",    "QueueName", "${FactoryQueueName}" ],
                        [ "AWS/SQS", "ApproximateNumberOfMessagesNotVisible", "QueueName", "${FactoryQueueName}" ]
                      ],
                      "view": "timeSeries",
                      "stacked": true,
                      "region": "${AWS::Region}",
                      "yAxis": {
                        "left": {
                          "min": 0
                        }
                      },
                      "annotations": {
                          "horizontal": [
                              {
                                  "label": "Number of messages visible >= 50000 for 24 datapoints within 2 hours.",
                                  "value": 50000
                              }
                          ]
                      },
                      "title": "Events Queue Backlog"
                    }
                  }
                - WorkerQueueName: !Sub
                    - "${ResourceNamePrefix}_${SafeVersion}_events"
                    - SafeVersion: !Join ["_", !Split [".", !Join ["_", !Split ["-", !Ref EnterpriseVersion]]]]
                  FactoryQueueName: !Sub
                    - "${ResourceNamePrefix}_${SafeVersion}_events_factory"
                    - SafeVersion: !Join ["_", !Split [".", !Join ["_", !Split ["-", !Ref EnterpriseVersion]]]]

              - !Sub
                - |
                  {
                    "height": 6,
                    "width": 9,
                    "y": 8,
                    "x": 15,
                    "type": "text",
                    "properties": {
                        "markdown": "_Events queue backlog shows any buildup of tasks, often visible as slower processing and handling._\n\n**Healthy**: Backlog (red) and running tasks (orange) are low (often zero) with short buildups (< 30 mins) associated with events like resource imports, mod updates, etc.\n\n**Overloaded**: Sustained backlog growth (red) indicating that ECS workers cannot keep up with incoming events. Increase capacity or check for a flood of unnecessary events.\n\n**Stalled processing**: Running tasks (orange) appear for long periods. Typically indicates a misconfigured mod failing to terminate the task.\n"
                    }
                  }
                - {}

          - |
            ] }

  EventsQueueThresholdAlarmWorker:
    Type: "AWS::CloudWatch::Alarm"
    Properties:
      AlarmName: !Sub
        - "${ResourceNamePrefix}_${StackResourceNamePrefix}_${SafeVersion}_events_worker_queue_messages_visible_alarm"
        - SafeVersion: !Join ["_", !Split [".", !Join ["_", !Split ["-", !Ref EnterpriseVersion]]]]
      AlarmDescription: "Events Queue Backlog number of messages visible alarm threshold"
      Namespace: "AWS/SQS"
      MetricName: ApproximateNumberOfMessagesVisible
      ComparisonOperator: "GreaterThanOrEqualToThreshold"
      Dimensions:
        - Name: QueueName
          Value: !Sub
            - "${ResourceNamePrefix}_${SafeVersion}_events"
            - SafeVersion: !Join ["_", !Split [".", !Join ["_", !Split ["-", !Ref EnterpriseVersion]]]]
      EvaluationPeriods: 24
      Period: 300
      Statistic: "Average"
      Threshold: 50000
      AlarmActions:
        - !Sub "arn:${AWS::Partition}:sns:${AWS::Region}:${AWS::AccountId}:${ResourceNamePrefix}_${StackResourceNamePrefix}_alarms"

  EventsQueueThresholdAlarmFactory:
    Type: "AWS::CloudWatch::Alarm"
    Properties:
      AlarmName: !Sub
        - "${ResourceNamePrefix}_${StackResourceNamePrefix}_${SafeVersion}_events_factory_queue_messages_visible_alarm"
        - SafeVersion: !Join ["_", !Split [".", !Join ["_", !Split ["-", !Ref EnterpriseVersion]]]]
      AlarmDescription: "Events Queue Backlog number of messages visible alarm threshold"
      Namespace: "AWS/SQS"
      MetricName: ApproximateNumberOfMessagesVisible
      ComparisonOperator: "GreaterThanOrEqualToThreshold"
      Dimensions:
        - Name: QueueName
          Value: !Sub
            - "${ResourceNamePrefix}_${SafeVersion}_events_factory"
            - SafeVersion: !Join ["_", !Split [".", !Join ["_", !Split ["-", !Ref EnterpriseVersion]]]]
      EvaluationPeriods: 24
      Period: 300
      Statistic: "Maximum"
      Threshold: 50000
      AlarmActions:
        - !Sub "arn:${AWS::Partition}:sns:${AWS::Region}:${AWS::AccountId}:${ResourceNamePrefix}_${StackResourceNamePrefix}_alarms"
```

## Step 3: Create New Stack

In the AWS CloudFormation console, click on **Create stack** and select **With new resources (standard)**.

<!-- ![Create New Stack](/images/docs/guardrails/guides/hosting-guardrails/installation/post-installation/cloudformation-create-stack.png) -->

Under **Specify template**, choose the **Upload a template file** option. Click **Choose file** and select the template file you downloaded earlier. Click **Next**.

<!-- ![Upload Template](/images/docs/guardrails/guides/hosting-guardrails/installation/post-installation/cloudformation-upload-template.png) -->

## Step 4: Enter Stack Details

Provide a **Stack name** and enter the required parameters:

| Parameter Name            | Description                                                                                                                                                                    |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ResourceNamePrefix        | Resource prefix used by the Turbot Guardrails stack. Default is `turbot`.                                                                                                      |
| StackResourceNamePrefix   | Resource prefix for resources created by this stack. Default is `monitoring`.                                                                                                  |
| EnterpriseVersion         | The version of Turbot Enterprise. This should match the TE version you have installed (e.g., `5.46.0`).                                                                         |

<!-- ![Enter Stack Details](/images/docs/guardrails/guides/hosting-guardrails/installation/post-installation/cloudformation-enter-parameters.png) -->

Click **Next** after filling in the parameters.

## Step 5: Configure Stack Options

Optionally, add tags or adjust advanced options as needed. For this guide, you can proceed with the defaults. Click **Next**.

<!-- ![Configure Stack Options](/images/docs/guardrails/guides/hosting-guardrails/installation/post-installation/cloudformation-configure-stack-options.png) -->

## Step 6: Review and Create Stack

Review the stack details and ensure all parameters are correct. Acknowledge that AWS CloudFormation might create IAM resources by selecting the checkbox under **Capabilities**.

<!-- ![Review Stack](/images/docs/guardrails/guides/hosting-guardrails/installation/post-installation/cloudformation-review-stack.png) -->

Click **Create stack** to initiate the stack creation process.

## Step 7: Enable Termination Protection

It is recommended to enable **Termination Protection** on the CloudFormation stack to prevent accidental deletion. After the stack is created, navigate to the stack details, click on **Stack actions**, and select **Enable termination protection**.

<!-- ![Enable Termination Protection](/images/docs/guardrails/guides/hosting-guardrails/installation/post-installation/cloudformation-enable-termination-protection.png) -->

## Step 8: Verify Stack Creation

Wait for the stack status to reach **CREATE_COMPLETE**. This process may take several minutes.

<!-- ![Stack Creation Complete](/images/docs/guardrails/guides/hosting-guardrails/installation/post-installation/cloudformation-creation-complete.png) -->

## Step 9: Verify Alarms Setup

Navigate to the **CloudWatch** service in the AWS Console and select **Alarms** from the sidebar. You should see the newly created alarms for your Turbot Enterprise environment.

- **Worker Queue Alarm**: Triggers when the `ApproximateNumberOfMessagesVisible` in the worker queue is greater than or equal to 50,000 for 24 data points within 2 hours.
- **Factory Queue Alarm**: Triggers when the `ApproximateNumberOfMessagesVisible` in the factory queue is greater than or equal to 50,000 for 24 data points within 2 hours.

<!-- ![Verify Alarms](/images/docs/guardrails/guides/hosting-guardrails/installation/post-installation/cloudwatch-alarms-list.png) -->

## Next Steps

- Monitor the alarms and ensure that they are configured correctly.
- If you have additional TE installations, repeat the process for each, creating separate stacks.
- Consider integrating with your incident management system for automated alerting and response.

## Troubleshooting

| Issue                   | Description                                                                                                                                                                                   | Guide                                                                                                                                                                     |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Permission Issues       | If you encounter permission errors during stack creation, ensure that your IAM user or role has the necessary permissions to create CloudFormation stacks and related resources like SNS topics. | [AWS Permissions for Turbot Guardrails Administrators](/guardrails/docs/enterprise/FAQ/admin-permissions#aws-permissions-for-turbot-guardrails-administrators)             |
| Further Assistance      | If issues persist, please open a support ticket and include relevant stack logs and error messages to help us assist you effectively.                                                          | [Open Support Ticket](https://support.turbot.com)                                                                                                                         |
