---
title: Installing TE
sidebar_label: Installing TE
---

# Install Turbot Guardrails Enterprise (TE)

In this runbook, you will:
- Use AWS Service Catalogue to install Turbot Guardrails Enterprise (TE)
- Learn how to monitor installations

**Turbot Guardrails Enterprise (TE)** provides automated configuration and management of Turbot infrastructure to be used when running the Turbot software application. For example, TE provides the setup of load balancers, SQS queues, ECS, etc., while Turbot provides the software to run in the container.

TE deploys a new version of the Turbot software -- Every Turbot release requires a new TE version.

## Prerequisites

- Access to the Guardrails master account.
- Administrator privileges.
- Familiarity with AWS Console, Service Catalog, and CloudFormation services.

## Step 1: Access AWS Console

Open the AWS Console and navigate to the Service Catalog service in the region to deploy TE.

![AWS Console Home Page](/images/docs/guardrails/runbooks/enterprise-install/installing-te/aws-console-1.png)

## Step 2: Navigate to Products & Identify the TE Product

Select the hamburger menu in the top left and click on `Products`.

Select `Turbot Guardrails Enterprise` from the products list.

![Product Selection](/images/docs/guardrails/runbooks/enterprise-install/installing-te/aws-service-catalog-product-selection.png)

Click `Launch Product`.

![Launch Product](/images/docs/guardrails/runbooks/enterprise-install/installing-te/aws-service-catalog-launch-product.png)

## Step 3: Launch & Name the TE Product

Select the desired version and name the provisioned product with the version number prefixed with `te`.

![Provisioned Product Naming](/images/docs/guardrails/runbooks/enterprise-install/installing-te/aws-service-catalog-product-naming.png)

## Step 4: Verify Parameters

Ensure all parameters are correct. Generally, these can be left as default.

<!-- ![Parameters Verification Page](screenshot_parameters_verification.png) -->
![Parameters Verification](/images/docs/guardrails/runbooks/enterprise-install/installing-te/aws-service-catalog-parameters-verify.png)

## Step 5: Launch Product

Verify the parameters again and select `Launch product`.

*99.9% of All TE installations do not need to change any parameters. The parameters for the TE stack are designed by default to pick up their values from the TEF configuration, with no options necessary to change on installation.*

![Launch Product](/images/docs/guardrails/runbooks/enterprise-install/installing-te/aws-service-catalog-te-launch-action.png)

## Step 6: Review

You have successfully installed the TE Service Catalog product. Now you can monitor the product for any issues post-installation and document any anomalies.

- [ ] The installed TE version should appear in Provisioned products with the status `Under change` and a new CloudFormation stack should be created with the status CREATING.

![Verify Status](/images/docs/guardrails/runbooks/enterprise-install/installing-te/aws-service-catalog-install-verification.png)

- [ ] The TE provisioned product status should change to `Available` and the CloudFormation stack status should be `CREATE_COMPLETE` to ensure the installation completed successfully.

![Installation Complete verification](/images/docs/runbooks/enterprise-install/installing-te/aws-service-catalog-installation-complete.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [TE architecture](https://turbot.com/guardrails/docs/enterprise/architecture).
- Learn about [updating TE stacks](https://turbot.com/guardrails/docs/enterprise/updating-stacks).

## Troubleshooting

### **Installation fails or takes too long**:
    - Solution: Check the CloudFormation events tab for errors or issues.

### **Parameters need adjustment**:
    - Solution: Review the parameters and consult the product documentation for correct values.
