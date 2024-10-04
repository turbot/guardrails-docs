---
title: With Existing VPC
sidebar_label: Install TEF into Existing VPC
---

Work in Progress

# Install TEF into Existing VPC

In this guide, you will:
- Use AWS Service Catalog to install Turbot Guardrails Enterprise Foundation (TEF). This guide demonstrates the installation process using the `Network - This Region [Option B - Predefined]`, where Turbot Guardrails is installed in the existing VPC and related networking resources.
- Monitor and troubleshoot the TEF install process.

The [Turbot Guardrails Enterprise Foundation (TEF)](/guardrails/docs/reference/glossary#turbot-guardrails-enterprise-foundation-tef) is an AWS Service Catalog product that provides automated configuration and management of the infrastructure needed to run the enterprise version of Turbot Guardrails in your AWS account.

The TEF CloudFormation stack creates and manages the networking and compute components that will be shared by all workspaces in a Turbot Guardrails Enterprise installation (Collective).

## Prerequisites

- Availability of Turbot's Guardrails enterprise products [Link Here Service Catalog Portfolios Guide]
- Preparedness on the [Turbot Guardrails Enterprise Pre-Installation Checklist](/guardrails/docs/guides/hosting-guardrails/installation/pre-installation/checklist)
- Access to the Guardrails AWS account with [Administrator Privileges](/guardrails/docs/enterprise/FAQ/admin-permissions).
- Familiarity with AWS Console, Service Catalog, and CloudFormation services.
- Available Domain name(s), Valid ACM Certificate(s) and existing VPC & it's related network resources configuration details.

## Step 1: Access AWS Console

Open the AWS Console and navigate to the Service Catalog service in the region where you wish to install TEF.

![AWS Console Home Page](/images/docs/guardrails/guides/hosting-guardrails/installation/install-tef/with-guardrail-vpc/aws-service-catalog-console.png)

## Step 2: Navigate to Products

Select the **Products** section from the left navigation menu.

![Product Selection](/images/docs/guardrails/guides/hosting-guardrails/installation/install-tef/with-guardrail-vpc/service-catalog-products.png)

## Step 3: Launch Product

Select **Turbot Guardrails Enterprise Foundation** from the products list, select **Launch Product**.

![Launch Product](/images/docs/guardrails/guides/hosting-guardrails/installation/install-tef/with-guardrail-vpc/service-catalog-launch-product-tef.png)

## Step 4: Name Provisioned Product

Select a Name for the provisioned project. Typically, this will be "tef"

![Name Provisioned Product](/images/docs/guardrails/guides/hosting-guardrails/installation/install-tef/with-guardrail-vpc/service-catalog-name-provisioned-product.png)

## Step 5: Find Version

Sort the Product versions section by **Created time** (descending) to see the latest available version.

![Find TEF Version](/images/docs/guardrails/guides/hosting-guardrails/installation/install-tef/with-guardrail-vpc/service-catalog-find-tef-product-versions.png)

## Step 6: Select Version

Select the desired TEF version under **Product Versions**. Usually, you will want the latest version.

![Select TEF Version](/images/docs/guardrails/guides/hosting-guardrails/installation/install-tef/with-guardrail-vpc/service-catalog-select-tef-version.png)

## Step 7: Configure Installation

The required parameters for this  installation option are as below

**Installation Domain Name**: This should be the base domain name for the installation (for example, `turbot.mycompany.com`). This should be unique per Guardrails installation. You cannot share an Installation Domain Name across multiple collectives. Workspaces will be set up as subdomains of this installation domain (for example, `dev.turbot.mycompany.com`). If you elect to create a public API gateway, it will also be a subdomain of the installation domain (for example, `external.mycompany.turbot.com`).

> [!IMPORTANT]
> Domain names CANNOT be shared across multiple TEF installs if the API Gateway is deployed. Attempting to do so will result in connection errors.

**Turbot Certificate ARN**: This is used for the Turbot Console (and gateway, if applicable) in this region. This **_must_** be the ARN of an **_ACM certificate in this region_**, and the certificate domain name must match the **Installation Domain Name**.

> [!IMPORTANT]
> A wildcard certificate is highly recommended.  Without a wildcard cert, the certificate will need to be updated with the new workspaces as they are brought online.
> Wildcard certificates should include entries for both the base **Installation Domain Name** and a wildcard for workspaces (e.g., `turbot.mycompany.com` and `*.turbot.mycompany.com`). If wildcard certificates are not allowed, the certificate should cover the base **Installation Domain Name**, all workspace domain names, and any public API gateways.

> [!IMPORTANT]
> **Manager DNS records in Route 53** It is highly recommended that you allow Turbot to manage DNS records in Route53.  If you choose not to do so, you must manually update DNS records every time you install a new version in your workspaces.

> [!IMPORTANT]
> Enter the desired **NAT Gateway High Availability** configuration.  For a production deployment, you should choose **Multi-AZ**.

![Installation Parameter](/images/docs/guardrails/guides/hosting-guardrails/installation/install-tef/with-guardrail-vpc/service-catalog-tef-parameter-installation.png)

> [!Note]
> Each region must be given a different **Region Code** identifier, allowing the stacks to be automatically coordinated for peering etc. Select "alpha" as the **Region Code** for this first region.

Proceed to `Logging` section leaving the `Turbot Guardrails License Key` field blank.

## Step 8: Configure Logging

Select the desired values for `Turbot Handler Log Retention Days`, `Audit Trail Log Retention Days`, `Turbot Guardrails Process Log Objects Retention Days`, and `Turbot Guardrails Mod Installation Data Retention Days`, or leave them all at their default values.

<!-- ![Logging](/images/docs/guardrails/guides/hosting-guardrails/installation/install-tef/with-guardrail-vpc/service-catalog-tef-parameter-logging.png) -->

## Step 9: Configure Network with Existing VPC

The Turbot Guardrails Enterprise Foundation setup can use your existing VPC to host Turbot Guardrails, when `Network - This Region [Option B - Predefined]` is opted for the installation.

<!-- Leave all fields in `Network  Option A` as blank as this option is used to install [Guardrails with new VPC](/guides/hosting-guardrails/installation/install-tef/with-guardrail-vpc). -->

<!-- Enter the VPC ID that will be used to host Turbot in the `VPC` field. This VPC must already exist. If empty, then a new VPC will be deployed by this stack, per **Network - This Region [Option A - Created in this Stack]**.

In the `Load Balancer Subnets field`, enter a comma separated list of subnet IDs where the load balancers will be deployed. These subnets may be public facing or internal facing, and can be identical to the Application Subnet IDs. Id you have selected a pre-defined VPC, you MUST specify Load Balancer Subnet Ids here.

In the `Application (Turbot Guardrails) Subnets` field, enter a comma separated list of subnet IDs where the Turbot Containers and private lambda functions (such as the workspace manager) will be deployed. If you have selected a pre-defined VPC, you MUST specify Application (Turbot Guardrails) Subnet IDs here. These subnets must be able to route https outbound to the Internet, either directly or through a proxy.

In the `Database Subnets` field, enter a comma separated list of subnet IDs where the databases will be deployed. If you have selected a pre-defined VPC, you MUST specify Database Subnet IDs here. -->

Enter the VPC ID in `VPC`, comma separated list of subnet IDs in` Load Balancer Subnets`, `Application (Turbot Guardrails) Subnets` and in `Database Subnets` fields.

<!-- ![Network Created in Stack](/images/docs/guardrails/guides/hosting-guardrails/installation/install-tef/with-guardrail-vpc/service-catalog-tef-parameter-network-create-in-stack.png) -->

![Network With Existing VPC](/images/docs/guardrails/guides/hosting-guardrails/installation/install-tef/with-guardrail-vpc/service-catalog-tef-parameter-network-existing-vpc.png)

> [!CAUTION]
> Turbot Guardrails requires outbound https to the Internet from the load balancer and application (Turbot Guardrails) subnets. This can be routed through your proxy if desired. If using a proxy, you must also create VPC endpoints to allow fargate to access ECR API, CloudWatch Logs, ECR DKR and S3 AWS services.

Make appropriate changes for any predefined values for `Load Balancer`, `Proxy`, `Security Groups`, else you can leave then with the default provided values and proceed to `Advanced - ECS EC2 configuration` section.

![Default Parameter Sections](/images/docs/guardrails/guides/hosting-guardrails/installation/install-tef/with-guardrail-vpc/service-catalog-tef-default-parameter-sections-netowrk-opt-b.png)

## Step 10: Advanced - ECS EC2 Configuration

By default, support is provided for the `Instance Type for EC2 ECS host` and `AMI type for EC2 ECS host` for [AWS Graviton (ARM64)](https://aws.amazon.com/pm/ec2-graviton/) instances.

> [!NOTE]
> You can choose between `Standard Instances` (powered by Intel/AMD processors with the AMD64 architecture) or `Graviton Instances` (powered by AWS Graviton processors using the ARM64 architecture).

![AMI and ECS Type for EC2 ECS host](/images/docs/guardrails/guides/hosting-guardrails/installation/install-tef/with-guardrail-vpc/service-catalog-tef-ecs-host-parameter.png)

> [!CAUTION]
> For `Graviton Instances`, ensure that your TE version is at least `5.47.x`.
> Standard Instances are compatible with all TE versions.

You can modify the rest of the parameters as needed, or leave them at their default values.

## Step 11: Launch Product

Select **Launch product**.

![Launch Product](/images/docs/guardrails/guides/hosting-guardrails/installation/install-tef/with-guardrail-vpc/service-catalog-tef-launch-product-action.png)

## Step 12: Monitor Installation

You have initiated the installation of the new TEF version. This triggers an update of several nested CloudFormation stacks.

The TEF provisioned product should be in the **Under Change** status.

![Under Change Status](/images/docs/guardrails/guides/hosting-guardrails/installation/install-tef/with-guardrail-vpc/service-catalog-tef-under-change.png)

## Step 13: Review

- [ ] The TEF CloudFormation stack status should change to `CREATE_COMPLETE` indicating the installation completed successfully.

![CFN Create Complete](/images/docs/guardrails/guides/hosting-guardrails/installation/install-tef/with-guardrail-vpc/cfn-tef-create-complete.png)

- [ ] The TE `Provisioned product` status should change to `Succeeded`.

![Installation Complete Verification](/images/docs/guardrails/guides/hosting-guardrails/installation/install-tef/with-guardrail-vpc/service-catalog-tef-succeeded.png)

## Step 14: Enable Termination Protection

> [!IMPORTANT]
> To ensure that the TEF stack is not accidentally deleted, it is strongly recommend that termination protection is enabled.

Select the TEF Provisioned Product, select **Outputs** tab, and use the `CloudFormationStackARN` **Value** link to navigate to the respective CloudFormation stack.

![Navigate to CloudFormation Stack](/images/docs/guardrails/guides/hosting-guardrails/installation/install-tef/with-guardrail-vpc/service-catalog-install-tef-navigate-to-cfn.png)

Select the TEF stack. The description of the correct stack should say **Turbot Guardrails Enterprise Foundation &lt;version&gt;**.

![TEF CFN Stack](/images/docs/guardrails/guides/hosting-guardrails/installation/install-tef/with-guardrail-vpc/cfn-stack-tef.png)

Select **Edit termination protection** from **Stack actions** dropdown menu.

![Edit Termination Protection](/images/docs/guardrails/guides/hosting-guardrails/installation/install-tef/with-guardrail-vpc/cfn-stack-edit-termination-protection.png)

Choose `Termination protection` as **Activated** and select **Save**.

![Termination Protection Activated](/images/docs/guardrails/guides/hosting-guardrails/installation/install-tef/with-guardrail-vpc/cfn-stack-edit-termination-protection-activated.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [Turbot Guardrails Enterprise - Architecture](/guardrails/docs/enterprise/architecture).
- Learn more about [Updating TEF](/guardrails/docs/runbooks/enterprise-install/update-tef).

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Permission Issues                        | If the current logged-in user lacks permission to modify, update, or create resources in the stack, or if IAM roles or SCPs have changed, preventing built-in roles from accessing needed configuration settings.   | [Troubleshoot Permission Issues](/guardrails/docs/enterprise/FAQ/admin-permissions#aws-permissions-for-turbot-guardrails-administrators)             |
| Further Assistance                       | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)   |
