---
title: "FAQs"
sidebar_label: "FAQs"
---

# FAQs

---

- [Where can I learn more about Guardrails?](#where-can-i-learn-more-about-guardrails)
- [Can I trial Guardrails for free before purchasing?](#can-i-trial-guardrails-for-free-before-purchasing)
- [How do I sign up for a free trial?](#how-do-i-sign-up-for-a-free-trial)
- [Are there any limits to the free trial?](#are-there-any-limits-to-the-free-trial)
- [Is there anything defaulted or pre-configured in the environment?](#is-there-anything-defaulted-or-pre-configured-in-the-environment)
- [Can I extend my free trial?](#can-i-extend-my-free-trial)
- [Can I run a free trial of Guardrails Enterprise?](#can-i-run-a-free-trial-of-guardrails-enterprise)
- [What type of support is included during the free trial?](#what-type-of-support-is-included-during-the-free-trial)
- [I got my workspace, what do I do next?](#i-got-my-workspace-what-do-i-do-next)
- [How do I add other team members to my free trial?](#how-do-i-add-other-team-members-to-my-free-trial)
- [I am ready to purchase! Where can I complete the Order Form?](#i-am-ready-to-purchase-where-can-i-complete-the-order-form)
- [What happens when trial expires?](##what-happens-when-trial-expires)
- [How do I close out the Free Trial?](#how-do-i-close-out-the-free-trial)
- [I am not ready yet to purchase, how do I close the Free Trial?](#i-am-not-ready-yet-to-purchase-how-do-i-close-the-free-trial)
- [How do I pay for Guardrails?](#how-do-i-pay-for-guardrails)
- [Where do I learn more about Guardrails’ Support Plans?](#where-do-i-learn-more-about-guardrails-support-plans)
- [Where do I learn more about Guardrails’ Onboarding Services?](#where-do-i-learn-more-about-guardrails-onboarding-services)

---

## Where can I learn more about Guardrails?

- Overview: [Enterprise Governance](https://turbot.com/videos/AWS-Sydney/) |
  [Product Overview](https://turbot.com/videos/Turbot-Overview)
- [Overview Slides](https://turbot.com/guardrails/docs/getting-started#guardrails-overview)|
- Product Demos:
  [Governance Controls](https://turbot.com/videos/Turbot-cloud-governance/) |
  [AWS](https://turbot.com/videos/Turbot-AWS-Demo) |
  [Azure](https://turbot.com/videos/Turbot-Azure-Demo) |
  [GCP](https://turbot.com/videos/Turbot-GCP-Demo)

- [Concepts](concepts): Overview of Guardrails concepts such as
  [Policies](concepts/policies), [Controls](concepts/controls), and
  [Guardrails](concepts/guardrails). Each of these are fundamental cornerstones to how Guardrails functions!
- [Cloud Integrations](integrations): Read about how you can connect your cloud accounts to Guardrails to begin automatically remediating and deploying resources!

## Can I trial Guardrails for free before purchasing?

Yes! Guardrails offers fully functional trials of our Guardrails Cloud (SaaS) product for a period of 14 days. Customers can request the trial to be located in our
_US Cloud_ or _EU Cloud_ environment.

## How do I sign up for a free trial?

[Schedule your free trial onboarding call](https://turbot.com/start)
with us by clicking on the link!

The form will also ask you the following to help us prepare your environment:

- Add guests to the invite you would like to join the onboarding (or forward them the invite later).
- Which Guardrails Cloud (SaaS) environment do you prefer your Guardrails Workspace to reside in? US or EU.
- List the turbot.com usernames being granted first access to the environment.
- Which Cloud Provider(s) are you focusing on for testing? **AWS**, **Azure**, and/or **GCP**
  - For AWS, please list any regions beyond us-east-1 you will be testing. (for simplicity we focus on your preferred regions)
  - For AWS, we support over 125 services but for simplicity start with a small subset of Guardrails mods to get started.
  - Please list any services preferred for testing beyond: CloudTrail, CloudWatch, Config, EC2, IAM, KMS, Lambda, S3, SNS, VPC.
- Comments, Questions, Areas of focus.

Ahead of your onboarding call you will receive login instructions. In prep for the call, you can prepare your cloud accounts used for testing with our handy [Integrations Guide](integrations).

Any questions? Reach out to your Guardrails contact, or [Guardrails Sales](mailto:sales+poc@turbot.com).

## Are there any limits to the free trial?

Guardrails offers a fully functional trial. However, Guardrails is a large platform so it is recommended to start small to master the basics. Most customers can choose one (or a few) of AWS, Azure, and/or GCP cloud accounts. Follow the [getting started](getting-started) guide and trial a handful of custom use cases.

## Are there any default or pre-configured settings in the environment?

As part of your onboarding form we ask which regions, cloud services, and cloud providers you will be starting with. Guardrails pre-configures the workspace with the appropriate Guardrails mods (for various services) and regions for the event handlers (Guardrails' mechanism for receiving real time events from the cloud). Guardrails also onboards the [getting started policy baselines](https://github.com/turbot/guardrails-samples/tree/main/baselines/getting_started) in check mode. These can be adjusted as needed during the free trial.

## Can I extend my free trial?

Yes! Please reach out to your sales representative or `sales+poc@turbot.com` for assistance. We ask during the extension period of 1-2 week, we work together on your final use cases to close out the evaluation before the extension period ends.

## Can I run a free trial of Guardrails Enterprise?

We do not offer a free trial of Guardrails Enterprise. The Cloud (SaaS) and Enterprise versions of Guardrails have the same features, but the Enterprise version allows you (the customer) to host and manage the Guardrails Master account (as in, where all the good stuff happens!) in your environment. Guardrails recommends that you first test features with the Cloud (SaaS) product to help you evaluate your use cases. After your trial, we can transition to an Enterprise installation.

## What type of support is included during the free trial?

At the moment we include a free onboarding, status check-ins, and close out meeting during your free trial. The [getting started](getting-started) guide will provide a self-service tour of the product with additional examples to try. If you would like to trial your specific use cases, reach out to `sales+poc@turbot.com` for additional assistance.

## I got my workspace, what do I do next?

Follow the [getting started](getting-started) guide for a self-service tour of the product.

## How do I add other team members to my free trial?

- Have the team member sign up for a profile at [turbot.com](turbot.com/user/sign-up).
- Navigate to your Workspace URL. In the directory drop down menu, ensure the directory is selected, then log in.
- Users do not have permissions on first login, as the user profile gets created only after the initial login. You can assign permissions once that profile exists. To do so:
  - Click on the **Permissions** tab in the header.
  - Click the **Grant Permission** button marked in green.
  - Keep the **Resource Scope** as `Turbot`.
  - In the **Identities** field, type in the users name or turbot.com username.
    Select the new user.
  - Click the window to close the dropdown menu, then click in the
    **Permissions** field.
  - You will be presented with roles that can be applied to the new user.
  - Click on the **Grant** button.
  - Now users have the same permissions as you. Have them refresh their screen,
    should be able to get access.

## I am ready to purchase! Where can I complete the Order Form?

If it was not already emailed to you, you can download the form <a target="_blank" href="https://turbot.com/legal/pdf/Turbot-Software-Support-Services-Order-Form.pdf">here</a>. Also, you can go to our <a target="_blank" href="https://turbot.com/legal/service/">services</a> page to learn more information about pricing, services, and support.

## What happens when trial expires?

When your trial expires, you can continue using Guardrails Cloud by associating a **payment method** (e.g. a credit card, bank account details, AWS Marketplace sign-up etc.) in your Guardrails Account. If you choose to not add a payment method at the end of your trial, your Guardrails Workspace will automatically be suspended and subsequently deleted. Trials are temporary environments - there will be no backups of configurations before removal of your workspace.

## How do I close out the Free Trial?

Before your free trial expires, you will receive notifications to complete your [Order Form](https://turbot.com/legal/pdf/Turbot-Software-Support-Services-Order-Form.pdf). Once the Order Form is signed, you can continue your use of the Guardrails Cloud workspace in a paid version, or we can convert you to an Enterprise install in your environment.

## I am not ready yet to purchase. How do I close the Free Trial?

Please let your sales representative know or reach out to [sales+poc@turbot.com](mailto:sales+poc@turbot.com) for assistance with shutting down your free trial. We would be grateful for your feedback and to stay connected with us through our social media and [newsletters](https://on.turbot.com/). We are grateful for any feedback and would love for you to stay connected via our social media and [newsletters](https://on.turbot.com/)!

## How do I pay for Guardrails?

You can pay for Guardrails directly with a Credit Card, ACH (Bank Transfer), or via the <a target="_blank" href="https://aws.amazon.com/marketplace/seller-profile?id=f11627a8-c2ef-4092-8f71-8f66173794db">AWS Marketplace</a>.

If purchasing through the AWS Marketplace, no signature is required on the [Order Form](https://turbot.com/legal/pdf/Turbot-Software-Support-Services-Order-Form.pdf). We simply need your AWS Account ID to submit the offer with your [Order Form](https://turbot.com/legal/pdf/Turbot-Software-Support-Services-Order-Form.pdf) filled out.

## Where can I learn more about Guardrails’ Support Plans?

Guardrails offers paid support plans (Premium and Premium+) to support customers under SLAs, and include supporting services to assist your growing governance needs. <a target="_blank" href="https://turbot.com/legal/service/">Learn More</a> about our support plans!

## Where do I learn more about Guardrails’ Onboarding Services?

Getting started with a Guardrails architect helps accelerate your onboarding to ensure you are setup for success and meet your requirements per your schedule. We have standard packages and custom scope we can partner with you on. Learn more <a target="_blank" href="https://turbot.com/legal/service/">here</a> for `Customer Success Services - Onboarding Plans`.
