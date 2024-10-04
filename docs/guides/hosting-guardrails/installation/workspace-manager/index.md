---
title: Create Workspace
sidebar_label: Create Workspace
---

# Guardrails Workspace Manager

A **Workspace** is an independent tenant of Guardrails, with its own version and its
own schema (logical shard) in a hive. Each Workspace has its own Turbot root,
its own set of mods, and its own web console endpoint.

Your workspaces will use the Collective, Hive, and Versions that you deployed
previously, using the TEF, TED, and TE products in the Service Catalog.

Workspaces are deployed and managed using **Guardrails Workspace Manager**, which is
implemented as a CloudFormation custom resource.

## Prerequisites

- Ensure the Guardrails TEF, TED and TE stacks are successfully installed.

## Step 1: Access AWS Console

In the AWS Console, navigate to the CloudFormation service in the alpha region.

## Step 2: Create New Stack

Create a new stack, using the [Sample Workspace Manager CloudFormation Template](#sample-workspace-manager-cloudformation-template)

![CloudFormation Create Stack](/images/docs/guardrails/guides/hosting-guardrails/installation/workspace-manager/cloudformation-upload-template.png)

## Step 3: Enter Parameters

Enter the appropriate parameters:

- **Name:** The name of workspace, which will be used as the first part of
  the console URL. For instance, if you specify “dev” as the workspace name,
  and you set up the TEF stack using `mycompany.turbot.com` as the domain
  name, the console URL will be `dev.mycompany.turbot.com`

- **Version:** The version of Turbot Guardrails Enterprise to install in the workspace.
  This must match an installed (via TE) version exactly, For example:
  `5.46.0`

- **Hive:** The Hive name where the database is hosted. This should be the
  Hive name that you specified when setting up TED

- **UseRoute53:** If set to `True`, the stack will automatically update the
  DNS alias for the console URL to point to the newly installed version. If
  you do not use Route53 to manage the DNS, choose "False". You will need to
  create (or modify) a CNAME record for your workspace to point to the load
  balancer for the new version (available as `LoadBalancerDNS` in the stack
  output variables).

- **FoundationStackOutputPrefix:** This must match the resource prefix that
  you specified in the Turbot Guardrails Enterprise Foundation stack so that this stack
  can use exported outputs from the TEF stack.

![CloudFormation Update Parameters](/images/docs/guardrails/guides/hosting-guardrails/installation/workspace-manager/cloudformation-update-parameters.png)

> [!NOTE]
> Turbot recommends enabling **Termination Protection** on the Workspace Manager CloudFormation stack. This can be done at creation by expanding the **Stack creation options** and enabling Termination Protection. This can also be configured post CloudFormation stack deployment. Select the stack while viewing the CloudFormation service in the AWS console, click **Stack actions** in the top right, then click **Edit termination protection**. Set this to enabled and click **Save**!

![CloudFormation Enable Termination Protection](/images/docs/guardrails/guides/hosting-guardrails/installation/workspace-manager/cloudformation-enable-termination-protection.png)

## Step 4: Complete Stack Creation

Click on **Submit** and wait for the stack creation to complete.

![CloudFormation Stack Creation Complete](/images/docs/guardrails/guides/hosting-guardrails/installation/workspace-manager/cloudformation-creation-complete.png)

## Step 5: Provision Admin Account and Access the Workspace

Once the Workspace Manager CloudFormation stack is created, the Workspace Manager generates the initial Turbot Admin account and password, along with a key pair.
Go to the stack outputs to find:

- Console URL: Available in the `WorkspaceUrl` output variable. Use this link to access the web console.
- Admin Credentials: Displayed in the `WorkspaceManagerOutput` variable in the stack outputs.

Login using the generated admin credentials. Once logged in, change the admin password and delete the generated keys.

> [!WARNING]
> The username, password, and keys will appear in plain text in the CloudFormation stack output variables. If you re-run the stack, the stack output variables will be overwritten, so it’s important to secure this information immediately after stack creation.

Navigate to Profile (from the user icon in the top right of the Turbot Console).

Change the admin password and delete the access keys by clicking [X] next to the access key generated during install. New access keys can be created if necessary.

## Sample Workspace Manager CloudFormation Template

While the sample template provides a simple, out-of-the box mechanism for
deploying a single workspace, it is merely a starting point. You may wish to
deploy ALL your workspaces from a single template, so that you can manage
versions for all workspaces from a single stack, for instance.

This template can also be found on the Guardrails Samples Repo -
[Workspace Manager CloudFormation Template](https://github.com/turbot/guardrails-samples/blob/main/enterprise_installation/workspace_template.yml)

```yaml
AWSTemplateFormatVersion: 2010-09-09

Description: Workspace Manager, manage workspace creation & upgrades

Metadata:
  AWS::CloudFormation::Interface:
    ParameterGroups:
      - Label:
          default: "Workspace Data"
        Parameters:
          - Name
          - Version
          - VersionSafe
          - Hive
          - UseRoute53
          - FoundationStackOutputPrefix
          - AlternateURL
          - InstallationDomainSsmValue

Parameters:
  Name:
    Type: String
    Description: Name of workspace

  AlternateURL:
    Type: String
    Description: Alternate URL for Workspace (Leave empty if not needed)

  Version:
    Type: String
    Description: Version
    Default: "5.0.0"

  Hive:
    Type: String
    Description: Hive Name

  UseRoute53:
    Description: Use Route 53 DNS Management
    Default: true
    Type: String
    AllowedValues: [true, false]

  # This can be removed for simplicity
  FoundationStackOutputPrefix:
    Description: >
      Name of the resource prefix used by the Turbot Foundation stack, which
      is a prefix for exported outputs from that stack.
    Type: String
    Default: turbot

  InstallationDomainSsmValue:
    Description: >
      Name of the SSM Param that holds the installation domain name,
      which is exported from the TEF foundation stack.
    Type: "AWS::SSM::Parameter::Value<String>"
    Default: "/turbot/enterprise/installation_domain"

Conditions:
  UseRoute53DnsManagement: !Equals [true, !Ref UseRoute53]
  CreateAlternateUrl: !Not [!Equals ["", !Ref AlternateURL]]

Resources:
  Workspace:
    Type: Custom::CustomResource
    Properties:
      ServiceToken:
        Fn::Sub: "arn:aws:lambda:${AWS::Region}:${AWS::AccountId}:function:${FoundationStackOutputPrefix}_workspace_manager"
      WorkspaceId: !Ref Name
      Version: !Ref Version
      Hive: !Ref Hive
      # This section is not normally required
      Options:
        FoundationStackOutputPrefix: !Sub "${FoundationStackOutputPrefix}"

  #
  # Example how to use Route 53 to manage workspace DNS
  #
  # This is tricky, nesting Fn::Import within Fn::Sub, this article helps:
  #
  # https://www.fischco.org/technica/2017/cloud-formation-sub/
  #
  WorkspaceDnsAlias:
    Type: AWS::Route53::RecordSet
    Condition: UseRoute53DnsManagement
    Properties:
      HostedZoneName:
        Fn::Sub:
          - "${hostedZone}."
          - hostedZone: !Ref InstallationDomainSsmValue
      Name:
        Fn::Sub:
          - "${workspace}.${hostedZone}."
          - workspace: !Ref Name
            hostedZone: !Ref InstallationDomainSsmValue
      Type: CNAME
      TTL: 30
      ResourceRecords:
        - Fn::Sub:
            - "${FoundationStackOutputPrefix}-${version}.${hostedZone}."
            - version: !Join ["-", !Split [".", !Ref Version]]
              hostedZone: !Ref InstallationDomainSsmValue

  #
  # If the Param AlternateURL is set then create an SSM Parameter to match the url with the workspace.
  #
  WorkspaceParam:
    Type: AWS::SSM::Parameter
    Condition: CreateAlternateUrl
    Properties:
      Description: SSM Parameter the matching a workspace to a url
      Name: !Sub "/${FoundationStackOutputPrefix}/tenant/${AlternateURL}"
      Type: String
      Value:
        Fn::Sub:
          - '{"hive":"${Hive}","id":"${Name}.${hostedZone}","name":"${Name}","version":"${Version}","schema":"${Name}","log_level":"debug","trace":"true"}'
          - hostedZone: !Ref InstallationDomainSsmValue

  #
  # Minute tick per workspace.
  #
  # NOTE: this needs to be replaced with a new design, the current per-workspace minute tick
  # is not sustainable (limit on the number of rules) and not efficient, each minute we tick
  # all the workspaces.
  #
  WorkspaceMinuteTick:
    Type: AWS::Events::Rule
    Properties:
      Name:
        Fn::Sub:
          - "${WorkspaceId}_minute_tick"
          - WorkspaceId: !Ref Name
      Description:
        Fn::Sub:
          - "Minute tick scheduler for workspace ${WorkspaceId}"
          - WorkspaceId: !Ref Name
      ScheduleExpression: "cron(1/1 * * * ? *)"
      State: ENABLED
      Targets:
        - Arn:
            Fn::Sub:
              - "arn:aws:sqs:${AWS::Region}:${AWS::AccountId}:${FoundationStackOutputPrefix}_${VersionSafe}_events"
              - VersionSafe: !Join ["_", !Split [".", !Join ["_", !Split ["-", !Ref Version]]]]
          Id:
            Fn::Sub:
              - "${WorkspaceId}_minute_tick"
              - WorkspaceId: !Ref Name
          InputTransformer:
            InputPathsMap:
              account: "$.account"
              "detail-type": "$.detail-type"
              detail: "$.detail"
              id: "$.id"
              region: "$.region"
              resources: "$.resources"
              source: "$.source"
              time: "$.time"
              version: "$.version"
            InputTemplate:
              Fn::Sub:
                - >
                  {
                    "time":<time>,
                    "type": "tick.turbot.com:EveryMinute",
                    "detail-type": <detail-type>,
                    "source": <source>,
                    "account": <account>,
                    "region": <region>,
                    "detail": <detail>,
                    "version": <version>,
                    "resources": <resources>,
                    "id": <id>,
                    "meta": {
                      "tenantId": "${WorkspaceId}.${InstallationDomain}"
                    }
                  }
                - WorkspaceId: !Ref Name
                  InstallationDomain: !Ref InstallationDomainSsmValue

Outputs:
  WorkspaceUrl:
    Value:
      Fn::Sub:
        - "https://${WorkspaceId}.${InstallationDomain}"
        - WorkspaceId: !Ref Name
          InstallationDomain: !Ref InstallationDomainSsmValue
  WorkspaceManagerOutput:
    Value:
      Fn::GetAtt:
        - Workspace
        - Output
```

## Next Steps

- Head over to the [Post Installation document](https://turbot.com/guardrails/docs/guides/hosting-guardrails/installation/post-installation) for further instructions after setting up the workspace.

- Learn more about managing versions and updating workspaces from [Turbot Guardrails Enterprise Documentation](https://turbot.com/guardrails/docs/guides/hosting-guardrails/updating-stacks).
