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

![AWS Console Home Page](/images/docs/guardrails/runbooks/enterprise-install/installing-te/install-te-aws-console.png)

## Step 2: Find TE Product

Select the hamburger menu in the top left and choose **Products**.

![Product Selection](/images/docs/guardrails/runbooks/enterprise-install/installing-te/install-te-product-selection.png)

Select **Turbot Guardrails Enterprise** from the products list, then select **Launch Product**.

![Launch Product](/images/docs/guardrails/runbooks/enterprise-install/installing-te/install-te-launch-product.png)

## Step 3: Name TE Product

Select the desired version, then name the product with the version number prefixed with `te`.

![Provisioned Product Naming](/images/docs/guardrails/runbooks/enterprise-install/installing-te/install-te-product-naming.png)

## Step 4: Verify Parameters

Ensure all parameters are correct. Generally, these can be left as default.

![Parameters Verification](/images/docs/guardrails/runbooks/enterprise-install/installing-te/install-te-parameters-verification.png)

## Step 5: Launch Product

Verify the parameters again and select **Launch product**.

99.9% of all TE installations do not need to change any parameters. The parameters for the TE stack are designed by default to pick up their values from the TEF configuration, with no options necessary to change on installation.

![Launch Product](/images/docs/guardrails/runbooks/enterprise-install/installing-te/install-te-launch.png)

## Step 6: Review

You have successfully installed the TE Service Catalog product. Now you can monitor the product for any issues post-installation and document any anomalies.

- [ ] The installed TE version should appear in Provisioned products with the status **Under change**.

![Verify Status](/images/docs/guardrails/runbooks/enterprise-install/installing-te/install-te-verify-install.png)

A new CloudFormation stack should be created with the status CREATE_IN_PROGRESS.

![CFN Verify Status](/images/docs/guardrails/runbooks/enterprise-install/installing-te/install-te-cfn-status.png)

- [ ] The TE provisioned product status should change to **Available** and the CloudFormation stack status should be **CREATE_COMPLETE** to ensure the installation completed successfully.

![Installation Complete verification](/images/docs/guardrails/runbooks/enterprise-install/installing-te/install-te-install-complete-status.png)

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- Learn more about [TE architecture](https://turbot.com/guardrails/docs/enterprise/architecture).
- Learn about [updating TE stacks](https://turbot.com/guardrails/docs/enterprise/updating-stacks).

## Troubleshooting

### Installation Fails or Takes Too Long

Check the CloudFormation stack events tab for errors. If there are any errors, create a support ticket and include a screenshot of the errors.

### Parameters Need Adjustment

Review the parameters and consult the product documentation for correct values.
