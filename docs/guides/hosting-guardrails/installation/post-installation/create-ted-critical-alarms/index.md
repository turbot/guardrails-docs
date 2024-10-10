---
title: Create TED Critical Alarms
sidebar_label: Create TED Critical Alarms
---

# Set Up Critical Alarms for Turbot Enterprise Database (TED)

In this guide, you will:

- Use AWS CloudFormation to set up critical alarms for Turbot Enterprise Database (TED)
- Monitor key metrics such as CPU utilization, database connections, and cache evictions
- Ensure proactive monitoring and alerting for TED instances

Monitoring your Turbot Enterprise Database is crucial for maintaining optimal performance and ensuring system reliability. By setting up critical alarms, you can proactively detect and respond to potential issues before they impact your operations. This guide will walk you through deploying a CloudFormation template to set up these alarms.

## Prerequisites

- Access to the AWS account where Turbot Enterprise Database is deployed
- AWS IAM permissions to create CloudFormation stacks and necessary resources
- Existing Turbot Enterprise Database (TED) installations
- Access to the Turbot Guardrails AWS account with [Administrator Privileges](/guardrails/docs/enterprise/FAQ/admin-permissions)

## Step 1: Access AWS Console

Log in to the AWS Management Console and navigate to the **CloudFormation** service in the region where your TED is deployed.

<!-- ![CloudFormation Console](/images/docs/guardrails/guides/hosting-guardrails/installation/post-installation/cloudformation-console.png) -->

## Step 2: Copy the CloudFormation Template

Below is the **TED Critical Alarms CloudFormation Template** that you will use to set up the alarms. Copy the entire template and save it as a file on your local machine with a `.yml` extension (e.g., `ted_alarms_template.yml`).

```yaml
AWSTemplateFormatVersion: "2010-09-09"

Description: Turbot Guardrails Enterprise Database Monitoring

Metadata:
  AWS::CloudFormation::Interface:
    ParameterGroups:
      - Label:
          default: Hive Configuration
        Parameters:
          - HiveName
          - PrimaryRegion

      - Label:
          default: Database - Advanced - Encryption
        Parameters:
          - KeyAliasSsmValue

      - Label:
          default: Database - Advanced - Parameters
        Parameters:
          - MaxConnections
          - MaxConnectionsAlarmThreshold

      - Label:
          default: Advanced - Infrastructure
        Parameters:
          - ResourceNamePrefix
          - StackResourceNamePrefix

    ParameterLabels:
      # Hive Configuration
      HiveName:
        default: Database Hive Name
      PrimaryRegion:
        default: Primary Region

      KeyAliasSsmValue:
        default: Key Alias Parameter
      KMSKeyForPerformanceInsights:
        default: KMS Key For RDS Instance Performance Insights

      # Advanced - Parameters
      MaxConnections:
        default: Maximum number of concurrent connections
      MaxConnectionsAlarmThreshold:
        default: Alarm threshold for maximum number of concurrent connections

      # Advanced - Turbot
      ResourceNamePrefix:
        default: Resource Name Prefix

      StackResourceNamePrefix:
        default: Stack Resource Name Prefix

Parameters:
  HiveName:
    Description: Name For the Database Hive.
    Type: String
    Default: newton
    AllowedPattern: "^[a-z][a-z0-9_-]*[a-z0-9]$"

  PrimaryRegion:
    Description: Region where the primary Database currently resides. If set to empty, Turbot Guardrails will use the Alpha region set by TEF as the database's primary region.
    Type: String
    Default: ""
    AllowedValues:
      - ""
      - ap-northeast-1
      - ap-northeast-2
      - ap-northeast-3
      - ap-south-1
      - ap-southeast-1
      - ap-southeast-2
      - ca-central-1
      - cn-north-1
      - cn-northwest-1
      - eu-central-1
      - eu-north-1
      - eu-west-1
      - eu-west-2
      - eu-west-3
      - sa-east-1
      - us-east-1
      - us-east-2
      - us-west-1
      - us-west-2
      - us-gov-west-1
      # US Gov East 1 is not supported, however this is left here for development purpose
      - us-gov-east-1

  FoundationAlphaRegion:
    Description: Alpha region specified in TEF.
    Type: AWS::SSM::Parameter::Value<String>
    Default: "/turbot/enterprise/alpha_region"

  KeyAliasSsmValue:
    Description: |
      KMS Key alias defined in Turbot Guardrails Enterprise Foundation.
      YOU SHOULD ONLY CHANGE THIS PARAMETER IF YOU USED A NON-DEFAULT PREFIX IN THE TEF STACK
    Type: AWS::SSM::Parameter::Value<String>
    Default: "/turbot/enterprise/foundation_key_alias"

  MaxConnections:
    Description: Sets the maximum number of concurrent connections.
    Type: Number
    MinValue: 6
    MaxValue: 8388607
    Default: 600

  MaxConnectionsAlarmThreshold:
    Description: Sets the alarm threshold for maximum number of concurrent connections.
    Type: Number
    MinValue: 6
    MaxValue: 8388607
    Default: 500

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

  ParameterDeploymentTrigger:
    Description: >
      Changes to SSM parameter overrides (e.g. IAM role ARNs) are not automatically detected by CloudFormation.
      Upgrades will recalculate the parameters, but if you wish to refresh you parameters without upgrading you can toggle this parameter.
      Simply changing it is enough to force the parameters to be re-read and recalculated.
    Type: String
    Default: Blue
    AllowedValues:
      - Blue
      - Green

Mappings:
  Constants:
    Turbot:
      EntityName: Turbot HQ Inc

    Product:
      Name: Turbot Enterprise Database
      Version: ${tedVersion}

    RequiredVersion:
      TEF: ${requiredTefVersion}

Conditions:
  UseFoundationAlphaRegion: !Equals [!Ref PrimaryRegion, ""]
  IsFoundationPrimary: !Equals [!Ref FoundationAlphaRegion, !Ref "AWS::Region"]
  IsTEDRegionPrimary: !Equals [!Ref PrimaryRegion, !Ref "AWS::Region"]

  IsPrimary: !Or
    - !And
      - Condition: IsFoundationPrimary
      - Condition: UseFoundationAlphaRegion
    - !And
      - Condition: IsTEDRegionPrimary
      - !Not
        - Condition: UseFoundationAlphaRegion

Resources:
  HiveSNSTopic:
    Type: "AWS::SNS::Topic"
    Properties:
      TopicName: !Sub "${ResourceNamePrefix}_${StackResourceNamePrefix}_alarms"
      KmsMasterKeyId: !Ref KeyAliasSsmValue

  HiveDashboard:
    Type: "AWS::CloudWatch::Dashboard"
    Properties:
      DashboardName: !Sub
        - "${ResourceNamePrefix}_${StackResourceNamePrefix}_ted_${HiveName}_${Region}"
        - HiveName: !Ref HiveName
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
                    "type": "metric",
                    "x": 0,
                    "y": 0,
                    "width": 15,
                    "height": 6,
                    "properties": {
                      "metrics": [
                        [ "AWS/RDS", "CPUUtilization", "DBInstanceIdentifier", "${PrimaryHive}", { "id": "m1", "color": "#1f77b4" } ]
                      ],
                      "annotations": {
                        "horizontal": [
                            {
                              "label": "CPUUtilization >= 90 for 12 datapoints within 1 hour",
                              "value": 90
                            }
                        ]
                      },
                      "yAxis": {
                        "left": {
                            "min": 0
                        }
                      },
                      "view": "timeSeries",
                      "stacked": false,
                      "title": "CPU",
                      "region": "${Region}",
                      "period": 5
                    }
                  }
                - PrimaryHive: !Join ["-", !Split ["_", !Sub "${ResourceNamePrefix}_${HiveName}"]]
                  Region: !Ref "AWS::Region"

              - !Sub
                - |
                  {
                    "type": "text",
                    "x": 15,
                    "y": 0,
                    "width": 9,
                    "height": 6,
                    "properties": {
                        "markdown": "_CPU utilization indicates how hard the Hive is working to process requests._\n\n**Healthy:** Consistent load with some spikes.\n\n**Overloaded:** The Hive CPU is overloaded when it is consistently above 50% or higher.\n\n**Under-provisioned:** When there are no errors in Turbot Guardrails operations and CPU is very high, the Hive instances may be too small for the workload.\n\n**Over-provisioned:** When CPU is consistently very low and the largest load spikes are below 50%.\n"
                    }
                  }
                - {}

              - !Sub
                - |
                  {
                    "type": "metric",
                    "x": 0,
                    "y": 6,
                    "width": 15,
                    "height": 6,
                    "properties": {
                      "metrics": [
                        [ "AWS/RDS", "DatabaseConnections", "DBInstanceIdentifier", "${PrimaryHive}", { "id": "m1", "color": "#1f77b4" } ]
                      ],
                      "yAxis": {
                        "left": {
                            "showUnits": true,
                            "min": 0,
                            "max": ${Max_Connections}
                        }
                      },
                      "annotations": {
                        "horizontal": [
                            {
                              "label": "Number of connections alarm threshold.",
                              "value": ${Max_Connections_AlarmThreshold}
                            }
                        ]
                      },
                      "view": "timeSeries",
                      "stacked": false,
                      "region": "${Region}",
                      "period": 300,
                      "title": "Connections"
                    }
                  }
                - PrimaryHive: !Join ["-", !Split ["_", !Sub "${ResourceNamePrefix}_${HiveName}"]]
                  Region: !Ref "AWS::Region"
                  Max_Connections: !Ref MaxConnections
                  Max_Connections_AlarmThreshold: !Ref MaxConnectionsAlarmThreshold

              - !Sub
                - |
                  {
                    "type": "text",
                    "x": 15,
                    "y": 6,
                    "width": 9,
                    "height": 6,
                    "properties": {
                        "markdown": "_Connection counts should roughly correlate with the number of ECS Tasks and invoked Lambdas._\n\n**Healthy:** Connections should slowly churn over time as Lambdas and Turbot Guardrails Tasks spin up and down.\n\n**Abnormal Spike:** An abrupt spike in connections may indicate a failure in the Tasks or Lambdas that caused lots of reconnections.\n\n**Connections Flood:** Should the connections count continually increase over time, this may indicate stale connections from processes that can't finish.\n"
                    }
                  }
                - {}

              - !Sub
                - |
                  {
                    "type": "metric",
                    "x": 0,
                    "y": 86,
                    "width": 15,
                    "height": 6,
                    "properties": {
                        "view": "timeSeries",
                        "stacked": false,
                        "metrics": [
                          [ "AWS/ElastiCache", "DatabaseMemoryUsagePercentage", { "yAxis": "right" } ],
                          [ "AWS/ElastiCache", "SwapUsage" ]
                        ],
                        "yAxis": {
                          "right": {
                              "min": 0
                          }
                        },
                        "region": "${Region}",
                        "title": "Cache Swap Usage & Memory Usage Percentage",
                        "period": 300,
                        "stat": "Average"
                    }
                  }
                - Region: !Ref "AWS::Region"

              - !Sub
                - |
                  {
                    "type": "text",
                    "x": 15,
                    "y": 86,
                    "width": 9,
                    "height": 6,
                    "properties": {
                        "markdown": "_ElastiCache Swap Usage and Database Memory Usage Percentage._\n\n**Swap Usage:** The amount of swap used on the host (in MB).\n\n**Database Memory Usage Percentage:** Percentage of memory utilization, based on the current memory utilization (BytesUsedForCache) and the maxmemory. Maxmemory sets the maximum amount of memory for the dataset."
                    }
                  }
                - {}

              - !Sub
                - |
                  {
                    "type": "metric",
                    "x": 0,
                    "y": 86,
                    "width": 15,
                    "height": 6,
                    "properties": {
                        "view": "timeSeries",
                        "stacked": false,
                        "metrics": [
                          [ "AWS/ElastiCache", "Evictions" ]
                        ],
                        "yAxis": {
                          "right": {
                              "min": 0
                          }
                        },
                      "annotations": {
                        "horizontal": [
                            {
                              "label": "Number of evictions alarm threshold.",
                              "value": 500000
                            }
                        ]
                      },
                        "region": "${Region}",
                        "title": "Cache Evictions",
                        "period": 300,
                        "stat": "Sum"
                    }
                  }
                - Region: !Ref "AWS::Region"

              - !Sub
                - |
                  {
                    "type": "text",
                    "x": 15,
                    "y": 86,
                    "width": 9,
                    "height": 6,
                    "properties": {
                        "markdown": "_ElastiCache Evictions._\n\n**Evictions:** This metric represents the number of non-expired items that the cache evicted due to memory constraints to allow space for new writes. For ElastiCache Redis, this is derived from the evicted_keys statistic at Redis INFO."
                    }
                  }
                - {}

          - |
            ] }

  HiveCPUUtilAlarm:
    Type: "AWS::CloudWatch::Alarm"
    Condition: IsPrimary
    Properties:
      AlarmDescription: "Database CPU Utilization alarm threshold"
      AlarmActions:
        - !Sub "arn:${AWS::Partition}:sns:${AWS::Region}:${AWS::AccountId}:${ResourceNamePrefix}_${StackResourceNamePrefix}_alarms"
      AlarmName: !Sub "${ResourceNamePrefix}_${StackResourceNamePrefix}_${HiveName}_cpu_util_alarm"
      ComparisonOperator: "GreaterThanOrEqualToThreshold"
      Dimensions:
        - Name: DBInstanceIdentifier
          Value: !Join ["-", !Split ["_", !Sub "${ResourceNamePrefix}-${HiveName}"]]
      EvaluationPeriods: 12
      MetricName: CPUUtilization
      Namespace: AWS/RDS
      Period: 300
      Statistic: Average
      Threshold: 90
      TreatMissingData: missing

  HivePrimaryMaxDBConnectionThresholdAlarm:
    Type: "AWS::CloudWatch::Alarm"
    Condition: IsPrimary
    Properties:
      AlarmActions:
        - !Sub "arn:${AWS::Partition}:sns:${AWS::Region}:${AWS::AccountId}:${ResourceNamePrefix}_${StackResourceNamePrefix}_alarms"
      AlarmName: !Sub "${ResourceNamePrefix}_${StackResourceNamePrefix}_${HiveName}_db_max_connections_alarm"
      ComparisonOperator: "GreaterThanOrEqualToThreshold"
      Dimensions:
        - Name: DBInstanceIdentifier
          Value: !Join ["-", !Split ["_", !Sub "${ResourceNamePrefix}-${HiveName}"]]
      EvaluationPeriods: 3
      MetricName: DatabaseConnections
      Namespace: AWS/RDS
      Period: 300
      Statistic: Maximum
      Threshold: !Ref MaxConnectionsAlarmThreshold
      TreatMissingData: missing

  HiveElastiCacheEvictionsThresholdAlarmNodeOne:
    Type: "AWS::CloudWatch::Alarm"
    Properties:
      AlarmActions:
        - !Sub "arn:${AWS::Partition}:sns:${AWS::Region}:${AWS::AccountId}:${ResourceNamePrefix}_${StackResourceNamePrefix}_alarms"
      AlarmName: !Sub "${ResourceNamePrefix}_${StackResourceNamePrefix}_${HiveName}_elasticache_evictions_alarm_1"
      ComparisonOperator: "GreaterThanOrEqualToThreshold"
      Dimensions:
        - Name: CacheClusterId
          Value: !Join ["-", !Split ["_", !Sub "${ResourceNamePrefix}-${HiveName}-cache-cluster-001"]]
      EvaluationPeriods: 3
      MetricName: Evictions
      Namespace: AWS/ElastiCache
      Period: 300
      Statistic: Sum
      Threshold: 500000
      TreatMissingData: missing
```

## Step 3: Create New Stack

In the AWS CloudFormation console, click on **Create stack** and select **With new resources (standard)**.

<!-- ![Create New Stack](/images/docs/guardrails/guides/hosting-guardrails/installation/post-installation/cloudformation-create-stack.png) -->

Under **Specify template**, choose the **Upload a template file** option. Click **Choose file** and select the template file you downloaded earlier. Click **Next**.

<!-- ![Upload Template](/images/docs/guardrails/guides/hosting-guardrails/installation/post-installation/cloudformation-upload-template.png) -->

## Step 4: Enter Stack Details

Provide a **Stack name** and enter the required parameters:

| Parameter Name                | Description                                                                                                                                                                                                                  |
|-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| HiveName                      | The name of the database hive. This should match the hive name used in your TED installation.                                                                                                                                |
| PrimaryRegion                 | The primary region where the database resides. Leave empty to use the default alpha region.                                                                                                                                  |
| KeyAliasSsmValue              | The KMS Key alias defined in Turbot Guardrails Enterprise Foundation. Leave as default unless you used a non-default prefix in the TEF stack.                                                                                |
| MaxConnections                | Sets the maximum number of concurrent database connections as defined in TED installation. Default is `600`.                                                                                                                                               |
| MaxConnectionsAlarmThreshold  | Sets the alarm threshold for maximum number of concurrent connections. Default is `500`.                                                                                                                                    |
| ResourceNamePrefix            | Resource prefix used by the Turbot Guardrails Database stack. Default is `turbot`.                                                                                                                                          |
| StackResourceNamePrefix       | Resource prefix for resources created by this stack. Default is `monitoring`.                                                                                                                                               |
| ParameterDeploymentTrigger    | Toggle this parameter if you wish to refresh your parameters without upgrading.                                                                                                                           |

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

Navigate to the **CloudWatch** service in the AWS Console and select **Alarms** from the sidebar. You should see the newly created alarms for your Turbot Enterprise Database.

- **Database CPU Utilization**: Triggers when CPU utilization is greater than or equal to 90% for 12 data points within 1 hour.
- **Database Max Connections**: Triggers when database connections are greater than or equal to the specified threshold for 3 data points within 15 minutes.
- **ElastiCache Evictions**: Triggers when cache evictions are greater than or equal to 500,000 for 3 data points within 15 minutes.

<!-- ![Verify Alarms](/images/docs/guardrails/guides/hosting-guardrails/installation/post-installation/cloudwatch-alarms-list.png) -->

## Step 10: Set Up Notifications

By default, the CloudFormation template creates an SNS topic for alarm notifications. You can subscribe to this topic to receive email alerts.

1. Navigate to the **SNS** service in the AWS Console.
2. Find the topic named according to your resource prefixes (e.g., `turbot_monitoring_alarms`).
3. Click **Create subscription** and enter your email address.
4. Confirm the subscription via the email you receive.

<!-- ![Create SNS Subscription](/images/docs/guardrails/guides/hosting-guardrails/installation/post-installation/sns-create-subscription.png) -->

## Next Steps

- Monitor the alarms and ensure that they are configured correctly.
- If you have additional TED installations, repeat the process for each, creating separate stacks.
- Consider integrating with your incident management system for automated alerting and response.

## Troubleshooting

| Issue                   | Description                                                                                                                                                                                   | Guide                                                                                                                                                                     |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Permission Issues       | If you encounter permission errors during stack creation, ensure that your IAM user or role has the necessary permissions to create CloudFormation stacks and related resources like SNS topics. | [AWS Permissions for Turbot Guardrails Administrators](/guardrails/docs/enterprise/FAQ/admin-permissions#aws-permissions-for-turbot-guardrails-administrators)             |
| Further Assistance      | If issues persist, please open a support ticket and include relevant stack logs and error messages to help us assist you effectively.                                                          | [Open Support Ticket](https://support.turbot.com)                                                                                                                         |
