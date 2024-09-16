---
title: Install TEF
sidebar_label: Install TEF
---

# Install Turbot Guardrails Enterprise Foundation (TEF)

In this runbook, you will:
- Use AWS Service Catalog to install Turbot Guardrails Enterprise Foundation (TEF). This guide demonstrates the installation process using the default `Network Option A - Created in this Stack`, where Turbot Guardrails manages the creation of the VPC and related networking resources.
- Monitor and troubleshoot the TEF install process.

The [Turbot Guardrails Enterprise Foundation (TEF)](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-foundation-tef) is an AWS Service Catalog product that provides automated configuration and management of the infrastructure needed to run the enterprise version of Turbot Guardrails in your AWS account.

The TEF CloudFormation stack creates and manages the networking and compute components that will be shared by all workspaces in a Turbot Guardrails Enterprise installation (Collective).

## Prerequisites

- Access to the Guardrails AWS account with [Administrator Privileges](/guardrails/docs/enterprise/FAQ/admin-permissions).
- Familiarity with AWS Console, Service Catalog, and CloudFormation services.
- Available Domain name(s) and Valid ACM Certificate(s).


## Step 1: Access AWS Console

Open the AWS Console and navigate to the Service Catalog service in the region where you wish to install TEF.

![AWS Console Home Page](/images/docs/guardrails/runbooks/enterprise-install/install-tef/install-tef-aws-console.png)

## Step 2: Navigate to Products

Select the **Products** section from the left navigation menu.

![Product Selection](/images/docs/guardrails/runbooks/enterprise-install/install-tef/install-tef-service-catalog-select-products.png)

## Step 3: Launch Product

Select **Turbot Guardrails Enterprise Foundation** from the products list, select **Launch Product**.

![Launch Product](/images/docs/guardrails/runbooks/enterprise-install/install-tef/install-tef-launch-product.png)

## Step 4: Name Provisioned Product

Select a Name for the provisioned project. Typically, this will be "tef"

![Name Provisioned Product](/images/docs/guardrails/runbooks/enterprise-install/install-tef/install-tef-name-provisioned-product.png)

## Step 5: Find Version

Sort the Product versions section by **Created time** (descending) to see the latest available version.

![Find TEF Version](/images/docs/guardrails/runbooks/enterprise-install/install-tef/install-tef-find-version.png)

## Step 6: Select Version

Select the desired TED version under **Product Versions**. Usually, you will want the latest version.

![Select TEF Version](/images/docs/guardrails/runbooks/enterprise-install/install-tef/install-tef-select-version.png)

## Step 7: Configure Installation

Table Option: (For Demo)

| Parameters                                   | Description                                              |
|----------------------------------------------|----------------------------------------------------------|
| Installation Domain Name                     | Provide the base domain name for the installation.       |
| Turbot Certificate ARN | ARN of an ACM certificate to be used in this region. |

> [!NOTE]
> The remaining parameters can be left with their default values for now.

Text Option: (For Demo)

Enter the **Installation Domain Name**. This is the base domain name for the installation. For example, turbot.mycompany.com. Workspaces will be setup as subdomains of the InstallationDomain in the formation. For example, dev.turbot.mycompany.com.

> [!IMPORTANT]
> If you elect to create a public API gateway, it will also be a subdomain of the installation domain (for example, external.mycompany.turbot.com).
> Domain names CANNOT be shared across multiple TEF installs if the API Gateway is deployed. Attempting to do so will result in connection errors.

Enter the **Turbot Certificate ARN** ARN of an ACM certificate to be used in this region.

> [!NOTE]
> For environments where wildcard certs are not allowed, the certification should include the base Installation Domain Name, all workspace domain names and any public API gateways.

<!--
Select **Manage DNS records in Route 53**. If enabled, a version alias domain records will be created using Route 53 for the Installation Domain zone. Set to Disabled if using a custom DNS approach to versions.

> [!NOTE]
> It is highly recommended that you allow Turbot to manage DNS records in Route53. If you choose not to do so, you must manually update DNS records every time you install a new version in your workspaces.

Enter the **Region Code**. This is the unique code for this region in the multi-region setup.

> [!NOTE]
> Ensure each region is different! Up to 3 regions may be configured separately: alpha, beta and gamma. We recommend to use alpha for the installation -->

![Installation](/images/docs/guardrails/runbooks/enterprise-install/install-tef/install-tef-installation-1.png)

## Step 8: Configure Logging

Select the desired values for **Turbot Handler Log Retention Days**, **Audit Trail Log Retention Days**, **Turbot Guardrails Process Log Objects Retention Days** and **Turbot Guardrails Mod Installation Data Retention Days** or keep the defaults.

![Logging](/images/docs/guardrails/runbooks/enterprise-install/install-tef/install-tef-product-parameter-logging.png)


## Step 9: Configure Network  Option A - Created in this Stack

The Turbot Guardrails Enterprise Foundation setup can create the VPC to host Turbot Guardrails, when `Network  Option A` is selected for the installation.

> [!NOTE]
> Leave all fields in `Network - This Region [Option B - Predefined]` as blank.


Table Option: (For Demo)

| Parameters                                   | Description                                              |
|----------------------------------------------|----------------------------------------------------------|
| Public Subnets                     | Provide CIDR ranges for the public subnets or continue with default value provided in the parameter.       |
| Turbot Guardrails Subnets          | Provide CIDR ranges for the Guardrails subnets or continue with default value provided in the parameter.        |
| Database Subnets                   | Provide CIDR ranges for the database subnets or continue with default value provided in the parameter.       |
| NAT Gateway High Availability      | Default value is Single-AZ. For a production deployment, you should choose Multi-AZ      |



Text Option: (For Demo)

**Public Subnets** will route through an Internet Gateway, allowing public IP addresses to be used. If you wish to access the Guardrails Console via the Internet, on a public IP address, then you should configure one or more public subnets to host the load balancers.

**Turbot Guardrails Subnets** are configured as private subnets that may route outbound to the internet via a NAT gateway, but not inbound. Guardrails application servers and containers will be launched in these subnets.

**Database Subnets** are configured as private subnets with no inbound or outbound access – only VPC traffic is routed to and from these subnets. These subnets can be used to host the Postgres database instances.

> [!IMPORTANT]
> Any subnet with an empty CIDR will NOT be created. For each subnet type, there are 3 possible subnets that corresponds to 3 different availability zones. If you wish to create a 2 AZ network, only enter CIDRs for subnets #1 and #2.

![Network Created in Stack](/images/docs/guardrails/runbooks/enterprise-install/install-tef/install-tef-network-create-in-stack.png)

<!-- ### This Region [Option B - Predefined]

> [!IMPORTANT]
> Turbot requires outbound https to the Internet from the load balancer and application (Turbot) subnets. This can be routed through your proxy if desired. If using a proxy, you must also create VPC endpoints to allow fargate to access ECR API, CloudWatch Logs, ECR DKR and S3 AWS services.

Enter the predefined **VPC** that will be used to host Turbot Guardrails. If empty, then a new VPC will be deployed by this stack.

Enter the predefined **Load Balancer Subnets** where the load balancers will be deployed. These May be public facing or internal facing and can be identical to the Application Subnet IDs. Defined as a comma separated list of subnet IDs. If you have selected a pre-defined VPC, you MUST specify Load Balancer Subnet Ids here.

Enter the predefined **Application (Turbot Guardrails) Subnets** where the Turbot Guardrails Containers and private lambda functions (workspace manager Lambda) will be deployed. Defined as a comma separated list of subnet IDs. If you have selected a pre-defined VPC, you MUST specify Application (Turbot Guardrails) Subnet IDs here.

Enter the predefined **Database Subnets** where the databases will be deployed. Defined as a comma separated list of subnet IDs. If you have selected a pre-defined VPC, you MUST specify Database Subnet IDs here.

![Network Predefined](/images/docs/guardrails/runbooks/enterprise-install/install-tef/install-tef-network-predefined.png) -->


### Load Balancer

Select the load balancer **Scheme** that determines if the load balancer is internal or internet facing. If internet-facing then the load balancer subnets must be "public". Otherwise, the subnets should be "guardrails".

Enter the **CIDR for inbound access from Clients / Users** for inbound traffic to the Turbot Guardrails load balancer (i.e. end users). Typically 0.0.0.0/0, but may be updated for environments with limited access requirements.If you choose to use an internal load balancer, you should set Create public API gateway to Enabled. This will create an API Gateway that allows Turbot to receive real-time events.

Enter the **SSL Policy** for the ALB HTTPS listener.

![Network Load Balancer](/images/docs/guardrails/runbooks/enterprise-install/install-tef/install-tef-network-load-balancer.png)

### Proxy

Enter the **HTTP_PROXY** and **HTTPS_PROXY** configuration used by the Turbot Guardrails application containers for HTTP and HTTPS requests, e.g. https://internal.proxy.com:2011 or http://internal.proxy.com:2011. Default is null (no proxy).

Enter the **NO_PROXY** configuration used by the Turbot Guardrails application containers as exceptions to the HTTPS_PROXY and HTTP_PROXY settings, e.g. 169.254.169.254,169.254.170.2,localhost . Set this to 'null' if you do not wish to use a NO_PROXY configuration.

> [!NOTE]
> Controls and calculated policies running in Lambda functions do not use the proxy configuration since they are outside the VPC.
> The Javascript AWS SDK does not support sending some services through a proxy and not others. Access to AWS service endpoints must all go through the proxy or none.

![Network Proxy](/images/docs/guardrails/runbooks/enterprise-install/install-tef/install-tef-network-proxy.png)

### Security Groups

Enter the **Custom Outbound Security Group ID** which is a security group rule to be added to the Egress Rules for all turbot guardrails containers and VPC lambda functions. If you use an http proxy, you will need to add an egress rule to allow the containers to access it. You may also need outbound access for other infrastructure services, such as dns.

Minimum Requirements
- Ingress: None
- Egress: HTTPS (443), HTTP (80), DNS (tcp,udp:53), NTP (123)

Enter the **Custom load balancer Security Group ID** that has ingress rules for accessing the Turbot Guardrails application.

Minimum Requirements
- Ingress: HTTPS (443)
- Egress: ECS API Tasks (port range: 32768 to 65535) to the API Service Security Group only

Enter the **Custom API Service Security Group ID** that has restricted outbound access and inbound access to load balancer.

Minimum Requirements
- Ingress: Loopback HTTPS (443)
- Egress: ECS API Tasks (port range: 32768 to 65535) to the Load Balancer Security Group only

> [!NOTE] For new deployments, if using TEF 1.35.0 or later, if you don't provide custom security group for Predefined VPC, Turbot Guardrails will create one for you, for previous versions, Turbot Guardrails won't.

![Network Security Groups](/images/docs/guardrails/runbooks/enterprise-install/install-tef/install-tef-network-security-groups.png)

## Step 10: Configure Advanced - Scaling

Set **Autoscaling target CPU Utilisation** for ECS EC2 instances in Turbot Guardrails Autoscaling Group. The current recommended setting is 50.

![Target CPU Utilisation](/images/docs/guardrails/runbooks/enterprise-install/install-tef/install-tef-scaling-target-cpu-utilisation.png)

Set the **API Container Desired Scale Size** for the number of simultaneous API tasks that you want to run on the cluster. The current recommended setting is 1.

Set the **API Container Minimum Scale Size** to the minimum value that API Auto Scaling can use to scale a target during a scaling activity. The current recommended setting is 1.

Set the **API Container Maximum Scale Size** to the maximum value that API Auto Scaling can use to scale a target during a scaling activity. The current recommended setting is 2.

![Advanced Scaling](/images/docs/guardrails/runbooks/enterprise-install/install-tef/install-tef-advanced-scaling.png)

## Step 10: Configure Advanced - Deployment

Select the portfolio lifecycle **Release Phase** for deployment (development, staging, or production). This should usually be "production".

![Release Phase](/images/docs/guardrails/runbooks/enterprise-install/install-tef/install-tef-deployment-release-phase.png)

Select a **Resource Name Prefix** to be used for all resources created in the stack or use the default (turbot). Since this prefix will be used across many resource types and different resource types have different name restrictions, you should avoid special characters and uppercase letters.

> [!IMPORTANT] It is HIGHLY RECOMMENDED that you use the default prefix! The TEF Stack will export the parameters that you have select to an SSM parameter, and they will use this prefix. Using the default will greatly simplify TE deployments and upgrades.

![Resource Name Prefix](/images/docs/guardrails/runbooks/enterprise-install/install-tef/install-tef-deployment-resource-name-prefix.png)

## Step 11: Launch Product

Select **Launch product**.

![Launch Product](/images/docs/guardrails/runbooks/enterprise-install/install-tef/install-tef-final-launch-product.png)

## Step 12: Monitor Installation

You have initiated the installation of the new TEF version. This triggers an update of several nested CloudFormation stacks.

The TEF provisioned product should be in the **Under Change** status.

![Under Change Status](/images/docs/guardrails/runbooks/enterprise-install/install-tef/install-tef-status-under-change.png)

## Step 13: Review

- [ ] The TEF CloudFormation stack status should change to `CREATE_COMPLETE` indicating the installation completed successfully.

![CFN Create Complete](/images/docs/guardrails/runbooks/enterprise-install/install-tef/install-tef-cfn-create-complete.png)

- [ ] The TE `Provisioned product` status should change to `Succeeded`.

![Installation Complete Verification](/images/docs/guardrails/runbooks/enterprise-install/install-tef/install-tef-succeeded-status.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [Turbot Guardrails Enterprise - Architecture](/guardrails/docs/enterprise/architecture).
- Learn more about [Updating TEF](/guardrails/docs/runbooks/enterprise-install/update-tef).

## Troubleshooting

### Permissions Issues

TODO