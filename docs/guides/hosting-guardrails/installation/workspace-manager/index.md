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

<div className="alert alert-info" role="alert"><p>Turbot recommends enabling Termination Protection on the Workspace Manager CloudFormation stack. This can be done at creation by expanding the <b>Stack creation options</b> and enabling Termination Protection.</p><p>This can also be configured post CloudFormation stack deployment. Select the stack while viewing the CloudFormation service in the AWS console, click <b>Stack actions</b> in the top right, then click <b>Edit termination protection</b>. Set this to enabled and click Save!</p></div>

## Create a Workspace

1. In the AWS Console, navigate to the CloudFormation service in the alpha
   region.

1. Create a new stack, using the
   [Sample Workspace Manager CloudFormation Template](#sample-workspace-manager-cloudformation-template)

1. Enter the appropriate parameters:

   - **Name:** The name of workspace, which will be used as the first part of
     the console URL. For instance, if you specify “dev” as the workspace name,
     and you set up the TEF stack using `mycompany.turbot.com` as the domain
     name, the console URL will be `dev.mycompany.turbot.com`

   - **Version:** The version of Turbot Guardrails Enterprise to install in the workspace.
     This must match an installed (via TE) version exactly, For example:
     `5.0.0-beta.18`

   - **Hive:** The Hive name where the database is hosted. This should be the
     Hive name that you specified when setting up TED

   - **UseRoute53:** If set to `True`, the stack will automatically update the
     DNS alias for the console URL to point to the newly installed version. If
     you do not use Route53 to manage the DNS, choose “False”. You will need to
     create (or modify) a CNAME record for your workspace to point to the load
     balancer for the new version (available as `LoadBalancerDNS` in the stack
     output variables).

   - **FoundationStackOutputPrefix:** This must match the resource prefix that
     you specified in the Turbot Guardrails Enterprise Foundation stack so that this stack
     can use exported outputs from the TEF stack.

1. Currently, the Workspace Manager generates the initial Turbot Admin account
   and password, as well as a key pair. You should login and change the password
   and keys as soon as the stack is complete. a. The Console URL for the
   workspace is available in the `WorkspaceUrl` output variable. Go to the stack
   outputs and click the link to go to the web console. b. The admin username
   and password are displayed in the `WorkspaceManagerOutput` variable in the
   stack outputs. Login using the admin username and password. c. Once logged
   in, change the admin password and delete the generated keys. You can do this
   from the profile settings page. i. In the top right of the Turbot Console,
   you will see currently logged in user, “Turbot Admin”. Hover over this link,
   and then click “Profile” from the popup menu to take you to the profile page.
   ii. In the list of access keys, click the [X] button to delete the access key
   generated during the install. If desired, you can generate new access keys by
   clicking the New access key button iii. On the left side of the page, click
   the Reset Password button to change the admin password

<div className="alert alert-warning">
  You should login and change the password and keys as soon as the stack is complete:
  <ul>
    <li> The username, password, and keys will appear in plain text in the CloudFormation stack output variables </li>
    <li> If you re-run the stack, the stack output variable will be overwritten  </li>
  </ul>
  </div>

### Sample Workspace Manager CloudFormation Template

While the sample template provides a simple, out-of-the box mechanism for
deploying a single workspace, it is merely a starting point. You may wish to
deploy ALL your workspaces from a single template, so that you can manage
versions for all workspaces from a single stack, for instance.

This template can also be found on the Guardrails Samples Repo -
[Workspace Manager CloudFormation Template](https://github.com/turbot/guardrails-samples/blob/master/installation/workspace-template.yml)

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
      Name of the resource prefix used by the Turbot Foundation stack, which is
      a prefix for exported outputs from that stack.
    Type: String
    Default: turbot

  InstallationDomainSsmValue:
    Description: >
      Name of the SSM Param that holds the installation domain name, which is
      exported from the TEF foundation stack.
    Type: "AWS::SSM::Parameter::Value<String>"
    Default: "/${FoundationStackOutputPrefix}/enterprise/installation_domain"

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
              - VersionSafe:
                  !Join [
                    "_",
                    !Split [".", !Join ["_", !Split ["-", !Ref Version]]],
                  ]
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
