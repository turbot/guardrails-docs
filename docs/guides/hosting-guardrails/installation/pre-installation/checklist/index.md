---
title: Pre-install Checklist
sidebar_label: Pre-install Checklist
---

# Turbot Guardrails Enterprise Pre-Installation Checklist

## For all enterprise installations
1. **Installation Domain Name**: Decide on the base domain for your environment.  (e.g. `.cloudportal.company.com`, `.guardrails.acme.com`)
1. **Console Name**: Decide on the name of your web console. (e.g. `prod` => `https://prod.cloudportal.company.com` or `console` => `https://console.guardrails.acme.com`)
1. **ACM Certificate**: Use Amazon Certificate Manager (ACM) to create a wildcard SSL/TLS certificate for your chosen domain (e.g. `*.cloudportal.company.com`), or have the certificate issued by your certificate authority and then upload into ACM.
    - **Wildcards**: If wildcards are not allowed for the Guardrails TLS certificate, you must add at least two domains to the certificate:  `gateway.cloudportal.company.com` and `{workspace_name}.cloudportal.company.com`. For environments that host more than one workspace, a domain will need to be added to the certificate for each workspace.
1. **HA/DR Config**: Decide on your HA/DR configuration.  Guardrails can be installed in up to 3 availability zones across 3 regions for mission critical production applications or in a single region/az for dev/sandbox environments.
1. **Networking**: Decide on how you will configure your networking. Turbot Support recommends that you use the Turbot Guardrails Enterprise Foundation (TEF) product to create the VPC and necessary Security Groups for your initial deployment.  After successful initial install of the environment you can then progressively harden the VPC to enterprise standards.  If you choose to install Guardrails into a custom VPC, it must be set up BEFORE installation starts.
1. **Security Groups**: If using a custom VPC, the Guardrails Samples repo contains a [CloudFormation template](https://github.com/turbot/guardrails-samples/blob/master/installation/security_groups.yml) to create the three required security groups with the required ports.  If a proxy is in use, the security group rule for the proxy port must be added to the `OutboundInternetSecurityGroup` resource.
1. **Event Handling**: Plan out how events will get from the managed cloud accounts back to Guardrails for processing.  Turbot Support recommends using an API Gateway when the Guardails console is only reachable from internal networks.
1. **DNS**: Guardrails can use Route53 or third party DNS resolution. Turbot Support recommends Route53 for ease of maintenance during upgrades. Private Route53 hosted zones may be used with proper inbound resolvers.
1. **Custom IAM Roles**: If the organization requires custom external roles not created by Guardrails, refer to the guide for creating [Custom Guardrails IAM Roles](pre-installation/external-role).
1. **Turbot License Key**: Turbot Support will provide a license key for the Guardrails installation.

## AWS AutoScaling Role
Ensure that the IAM service role called `AWSServiceRoleForAutoScaling` already exists in the account. If it doesn't, run the following aws cli command to create it prior to TEF installation:  
```sh
aws iam create-service-linked-role --aws-service-name autoscaling.amazonaws.com
```

## Custom network pre-install checklist
1. **Network Infrastructure as Code** - Turbot Support recommends building the Custom VPC via Terraform or Cloudformation to ensure accuracy and repeatability. Building the Guardrails security groups with the [CloudFormation template](https://github.com/turbot/guardrails-samples/blob/master/installation/security_groups.yml) works best. Any changes to the configuration should be updated in the source template and redeployed to prevent errors and to allow the template to be shared with Turbot Support for troubleshooting.
1. **Configuration Crib Sheet** - After deployment of your VPC and security groups, record the IDs/Values of the key resources that will be used as inputs to the TEF product.  An example:

    ```
    Installation Domain: cloudportal.company.com
    Certificate ARN:     arn:aws:acm:{region}:{accountId}:certificate/{certificateId}
    Turbot License Key:  -----BEGIN TURBOT LICENSE-----{redacted}-----END TURBOT LICENSE-----

    VPC ID:           vpc-0f3e50fad8a67dbb5
    VPC CIDR Range:   10.10.0.0/23

    LB Subnet IDs:    subnet-0024a21029654500e,subnet-091f6dfc55269a679
    App Subnet IDs:   subnet-0bd06d20b6d54857d,subnet-061c8fbc8f88dfa66
    DB Subnet IDs:    subnet-0a2d7f12a0357d850,subnet-0f5d3436eb1cff5c6

    Security Groups:
    LoadBalancerSecurityGroup:     sg-04904bbac705630f4
    ApiServiceSecurityGroup:       sg-056a37a3f2ebc3453
    OutboundInternetSecurityGroup: sg-0711d5475ece2e659

    HTTP_PROXY:       http://{proxy_address}:{proxy_port}
    HTTPS_PROXY:      http://{proxy_address}:{proxy_port}
    ```

1. **Access to the Guardrails Console UI/API** - Ensure a network path exists from your desktop clients to the Guardrails Loadbalancer Subnets.  That can be accomplished with public access via an IGW (Turbot recommends using IP address restrictions when using public routing), or via a private network link (e.g. VPN, Direct Connect, Transit Gateway, Bastion). If using private connectivity:

    a) Ensure that route tables for the Load Balancer Subnets have a path to your private network.
    b) Ensure the Load Balancer Security Group allows **ingress** to port `443` (https) from your private IP space. (e.g. 10.0.0.0/8)
    c) Ensure the Load Balancer Security Group also allows **ingress** on port `443` from at least one of the following: [VPC CIDR, App Subnet CIDRs, Egress Security Group]
    d) Ensure the Load Balancer Security Group allows **egress** on port range `32768` to `65535` to at least one of the following: [VPC CIDR, App Subnet CIDRs, API Security Group]

1. **Outbound Internet Access (OIA)** - Ensure a network path exists from the Guardrails VPC to the Internet.  To perform its governance function Guardrails requires access to cloud service APIs for AWS, Azure, GCP and any other SaaS/PaaS/IaaS service that it is configured to provide governance for.  Due to the size and rate of change of the cloud service IP space it is not practical to restrict this traffic via IP addresses/CIDRs. Ensure that one of the following network connectivity paths exist:

    - **IGW & NAT Gateway**: This scenario allows internet egress via a standard AWS Internet Gateway and NAT Gateways attached to the VPC. Please note that in VPC Lambda functions run in private address space and require the presence of a NAT gateway (or Proxy/TGW) to have internet connectivity.
        - Ensure public subnets exist in each availability zone in use for the App Subnets.
        - Ensure that the Route Table for the public subnets has a path for the default route (`0.0.0.0/0`) to an IGW.
        - Ensure a NAT gateway exists in each of those public subnets.
        - Ensure that the App Subnet Route Tables have a path for the default route (`0.0.0.0/0`) to the NAT gateway in the same availability zone.
        - Test external connectivity prior to install [See Below](#testing-internet-connectivity-prior-to-installation)

    - **Transit Gateway**: In this scenario, Internet connectivity is routed through a Transit Gateway. We do not cover configuration of the Transit Gateway as it is beyond the scope of this document and there are many possible variations.  For a simple TGW outbound internet solution, please see [AWS documentation](https://aws.amazon.com/blogs/networking-and-content-delivery/creating-a-single-internet-exit-point-from-multiple-vpcs-using-aws-transit-gateway/).
        - Ensure the Transit Gateway is attached to the VPC.
        - Ensure Transit Gateway route table can egress data to the VPC CIDR(s).
        - Ensure the Route Tables for the `App Subnets` have a path for the default route (`0.0.0.0/0`) to the Transit Gateway.
        - Ensure the `Egress Security Group` allows https (port 443) to the Default Route
        - Test external connectivity prior to install [See Below](#testing-internet-connectivity-prior-to-installation)

    - **Internet access via on prem network**: In this scenario traffic will be routed from the VPC via Direct Connect or a VPN to your on-premise network.  Network routing rules there will allow OIA like any other device on the corporate network. For performance and cost optimization Turbot Support recommends configuring VPC Endpoints for high volume services that Guardrails will use to manage itself when using on premise networking.
        - Ensure a Virtual Private Gateway (VGW) exists and is attached to your VPC.
        - Ensure the Route Tables for the `App Subnets` have a path for the default route (`0.0.0.0/0`) to the VGW.
        - Ensure the `Egress Security Group` allows https (port 443) to the Default Route (`0.0.0.0/0`)
        - If using VPC Endpoints with this configuration, please read and review the section on VPC endpoints before testing connectivity.
        - Test external connectivity prior to install [See Below](#testing-internet-connectivity-prior-to-installation)

    - **Internet access via an http proxy**:  Guardrails uses several AWS services that *do not* support inclusion of the third party certificates necessary for Man-in-the-middle (MITM) SSL interception proxies to work.  Additionally, the AWS SDK does not support specifying a proxy and also specifying regional excpetions to the proxy. If a proxy is set, all AWS-bound traffic will use the proxy. Contact Turbot Support to discuss any specific considerations.
        - Add the proxy configuration details to your **configuration crib sheet**:
            ```
            HTTP_PROXY:  http://10.1.1.1:7000 or http://internal.proxy.com:2011
            HTTPS_PROXY: http://10.1.1.1:7000 or http://internal.proxy.com:2011  #these should never start with https, see above statement on MITM SSL proxies.
            NO_PROXY: 169.254.169.254,localhost
            ```
        - Ensure the Route Tables for the `App Subnets` have a path to the proxy server.
        - Ensure the `Egress Security Group` allows https (port 443) to egress to the proxy server.
        - Ensure the `Egress Security Group` allows https (port 443) to egress to the VPC CIDR.
        - If using VPC Endpoints with this configuration, please read and review the section on VPC endpoints before testing connectivity.
        - Test external connectivity prior to install [See Below](#testing-internet-connectivity-prior-to-installation)

    - **Considerations for VPC Endpoints**: When OIA is not using the IGW/NAT Gateway it will improve performance and reduce cost to setup [VPC Endpoints](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-endpoints.html) in the Guardrails VPC. If using a proxy configuration with no alternate Internet egress from the VPC. It is required to use VPC Endpoints for AWS services that are not proxy aware. Care should be taken to ensure that any custom configuration of your VPC Endpoint Policies does not interfere with the Guardrails installation or operations; the following are examples of common misconfiguration:
        - **S3 Gateway Endpoint configured to only allow access to specific buckets**: Guardrails requires access to Create, Describe, Get and Put objects in it's own account, and for logging buckets in accounts that it is governing.  Guardrails also requires access to list and get objects from Turbot-owned software buckets to allow for installation of mods. Depending on the S3 bucket policy settings, Guardrails may also require the ability to List, Describe and/or Put bucket configuration for all buckets in all accounts under management.
        - **S3 Gateway Endpoints configured to forbid access to CloudFormation response buckets**: During the configuration of the TED stack, the Guardrails `hive_manager` Lambda needs access to the regional CloudFormation response buckets as described in [Setting Up VPC Endpoints for AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-vpce-bucketnames.html) documentation.  Ensure that the proper endpoint policy allows access to the proper regional response bucket. Specifically, this means the ability to do an HTTPS `PUT`.  The S3 endpoint policy should allow a `PutObject` to `cloudformation-custom-resource-response-<region>` of the [desired regions](https://docs.aws.amazon.com/general/latest/gr/rande.html#cfn\_region).

           This is an example resource section of the S3 VPC endpoint policy. Be sure to include the `/*` at the end of the resource arn.
        ```json
              "Resource": [ "arn:aws:s3:::cloudformation-custom-resource-response-*/*",
                            "arn:aws:s3:::cloudformation-waitcondition-*/*",
                            "arn:aws:s3:::other-permitted-s3-buckets/*"
                      ]
        ```

        - **CloudWatch Endpoints configured to only allow access to limited APIs or to specific log groups**: Guardrails requires the ability to create log groups, log streams, write to log streams, create/update CloudWatch events, create CloudWatch Dashboards, etc.  Turbot Support recommends that you configure the endpoint with the default Full Access policy.
        - **Interface Endpoints configured with a restricted security group**: [Interface Endpoints](https://docs.aws.amazon.com/vpc/latest/userguide/vpce-interface.html) are configured with a security group to optionally restrict traffic. The security group attached must minimally allow port `443` (https) **egress** to the default route (`0.0.0.0/0`), and allow port `443` (https) **ingress** from the VPC CIDR (or from the `egress security group`).
        - `Recommended/Required VPC Endpoints`:
            - CloudWatch
                - com.amazonaws.{region}.logs
                - com.amazonaws.{region}.monitoring
                - com.amazonaws.{region}.events
            - ECS
                - com.amazonaws.{region}.ecr.api
                - com.amazonaws.{region}.ecr.dkr
                - com.amazonaws.{region}.ecs
                - com.amazonaws.{region}.ecs-agent
            - Others
                - com.amazonaws.{region}.kms
                - com.amazonaws.{region}.cloudtrail
                - com.amazonaws.{region}.s3
                - com.amazonaws.{region}.ssm
                - com.amazonaws.{region}.sts
                - com.amazonaws.{region}.sns
                - com.amazonaws.{region}.sqs

## Testing internet connectivity prior to Installation
  Because custom network configuration is a complex and multifaceted, it is critical to perform practical tests to ensure connectivity prior to starting the install process.  The install process is automated and several steps take extended periods of time; diagnosing issues, uninstalling services and reinstalling is time-consuming and frustrating; in contrast, taking the time to perform the following tests is a relatively painless process that can provide a higher probability of "first run success" and eliminate many variables if troubleshooting is needed. Pre-install testing process:

  1. **Launch Linux Instance**: Launch a linux test instance into each App subnet.

  1. **DNS Resolution for Instance**: If using private DNS (or a non-Guardrails managed Route53 hosted zone) register an `A` record for one of the test instances (e.g. `test-a.cloudportal.company.com` => `10.10.0.10`).

  1. **Outbound Security Group**: Attach the `OutboundInternetSecurityGroup` to the instances in addition to the security group used for inbound ssh access. Ensure that the security group used for SSH access does not provide any Egress rules to prevent false positives when testing.

  1. **Instance Profile**: Attach an instance profile with the aws managed `Administrator` role to the instances.

  1. **Install Required Utiltiies**: Log into the instances and install NetCat, Curl, AWS CLI utilities.

  1. **Public DNS resolution**: Test DNS resolution to the public internet:

      ```
      > nslookup google.com

      Non-authoritative answer:
      Name:	google.com
      Address: 172.217.7.174

      > nslookup amazonaws.com

      Non-authoritative answer:
      Name:	amazonaws.com
      Address: 207.171.166.22
      Name:	amazonaws.com
      Address: 72.21.210.29
      ```

  1. **Private DNS resolution**: Test DNS resolution to private DNS
      ```
      > nslookup test-a.cloudportal.company.com  #substitute your domain and hostname

      Name:	test-a.cloudportal.company.com
      Address: 10.10.0.10
      ```

  1. **VPC Endpoint Resolution**: Test DNS resolution to VPC Endpoints: *Only test if using VPC endpoints*.  **Expected Result**: If configured correctly, this should resolve to a private IP address within the VPC. If it resolves to a public IP, please check the configuration of [Private DNS for VPC Endpoints](https://docs.aws.amazon.com/vpc/latest/userguide/vpce-interface.html#vpce-private-dns).  Note that VPC endpoints are region specific so in this example only the us-east-1 endpoint resolves to a private address, us-east-2 resolves to a public IP because the VPC in the example is in us-east-1.
      ```
      > nslookup logs.us-east-1.amazonaws.com

      Name:	logs.us-east-1.amazonaws.com
      Address: 10.10.0.8

      > nslookup logs.us-east-2.amazonaws.com

      Name:	logs.us-east-2.amazonaws.com
      Address: 52.95.18.172
      ```

  1. **Public Internet Connectivity**: Test connectivity to the public Internet:
      ```
      > curl https://google.com

      <HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
      <TITLE>301 Moved</TITLE></HEAD><BODY>
      <H1>301 Moved</H1>
      The document has moved
      <A HREF="https://www.google.com/">here</A>.
      </BODY></HTML>
      ```


  1. **AWS Connectivity**: Test connectivity to AWS
      ```
      > curl amazonaws.com

      <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
      <html><head>
      <title>301 Moved Permanently</title>
      </head><body>
      <h1>Moved Permanently</h1>
      <p>The document has moved <a href="http://aws.amazon.com">here</a>.</p>
      </body></html>
      ```

  1. **AWS Service Connectivity**: Test connectivity to AWS services using NetCat:  **If not using VPC endpoints** the two tests below will suffice; **If using VPC endpoints** make sure to test both the VPC region and a secondary region and repeat for each VPC Endpoint configured and at least one service that does not have an endpoint.
      ```
      > nc -vz logs.us-east-1.amazonaws.com 443

      Connection to logs.us-east-1.amazonaws.com port 443 [tcp/https] succeeded!

      > nc -vz logs.us-east-2.amazonaws.com 443

      Connection to logs.us-east-2.amazonaws.com port 443 [tcp/https] succeeded!

      > nc -vz s3.us-east-1.amazonaws.com 443

      Connection to s3.us-east-1.amazonaws.com port 443 [tcp/https] succeeded!

      > nc -vz s3.us-east-2.amazonaws.com 443

      Connection to s3.us-east-2.amazonaws.com port 443 [tcp/https] succeeded!
      ```

  1. **AWS CLI Commands**: Test the ability to execute AWS API commands:  If any of the following tests fail, Guardrails will not be able to install correctly; follow-up and diagnose any errors **prior to beginning the installation process**.
      ```
      > aws s3 ls
      ... (list of buckets)
      > aws s3 mb s3://{some_random_bucket_name} --region {installation_region}
      > touch test.file
      > aws s3 cp test.file s3://{some_random_bucket_name}
      > aws s3 rm s3://{some_random_bucket_name}/test.file
      > aws s3 rb s3://{some_random_bucket_name}/

      > aws logs create-log-group --log-group-name /turbot/test-logging --tags test=tag
      > aws logs create-log-stream --log-group-name /turbot/test-logging --log-stream-name test001
      > aws logs create-log-stream --log-group-name /turbot/test-logging --log-stream-name test001
      > aws logs put-log-events --log-group-name /turbot/test-logging --log-stream-name test001 --log-events timestamp=1433190184356,message=test-event-1

      > aws kms list-keys
      ```

  1. **CloudFormation Custom Resource Response**: If using S3 endpoints or a proxy, test connectivity to the CloudFormation custom resource response URL using the following curl.

      ```
      curl 'https://cloudformation-custom-resource-response-{region}.s3.amazonaws.com/?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-SignedHeaders=host&X-Amz-Expires=7200'
      ```

      **WARNING**: If this test to the CloudFormation Response bucket fails, resolve before proceeding with installation.  If CloudFormation can't receive responses that the custom resources are complete then the CloudFormation stack will stall for 30 minutes to an hour. Clean up of the stalled custom resources can be quite time consuming.

     The `{region}` value will be the AWS region that Guardrails is being installed into. An unauthorized response is ok - the purpose is to test network connectivity to the endpoint. Once this has been verified, along with the rest of this list, the Guardrails installation can move forward.
