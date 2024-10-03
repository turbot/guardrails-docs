---
title: Importing a Portfolio
sidebar_label: Import Portfolio
---

# Importing a Portfolio

In this guide, you will:
- Use AWS Service Catalog to import a Turbot Guardrails portfolio
- Monitor and troubleshoot the import process.

Portfolios provide a collection of products that can be installed and configured via the Service Catalog. Turbot Guardrails portfolios are only available to customers after being shared / given permission – Contact your Turbot Guardrails Solutions Engineer if you require permission to a Turbot Guardrails Portfolio.

## Prerequisites

- Access to Guardrails AWS account with [Administrator Privileges](/guardrails/docs/enterprise/FAQ/admin-permissions).
- Familiarity with AWS Console and Service Catalog service.

## Step 1: Access AWS Console

Open the AWS Console and navigate to the Service Catalog service in the region where you wish to import the portfolio.

![AWS Console](/images/docs/guardrails/guides/hosting-guardrails/installation/pre-installation/import-portfolio/aws-console-service-catalog.png)

## Step 2: Navigate to Portfolios

Select the **Portfolios** section from the left navigation menu.

![Product Selection](/images/docs/guardrails/guides/hosting-guardrails/installation/pre-installation/import-portfolio/service-catalog-select-portfolio.png)

Select the **Imported** tab, from **Actions** dropdown, choose **Import portfolio**

![Select Import Portfolio](/images/docs/guardrails/guides/hosting-guardrails/installation/pre-installation/import-portfolio/service-catalog-select-import-portfolio.png)

## Step 3: Import Portfolio

Select **AWS account**, enter the **Portfolio ID** and select **Import**. This will import the portfolio into the region where you plan to install. Region wise [Portfolio links](/guardrails/docs/guides/hosting-guardrails/installation/pre-installation/import-portfolio#turbot-guardrails-portfolio) are provided below.

![Import Portfolio](/images/docs/guardrails/guides/hosting-guardrails/installation/pre-installation/import-portfolio/service-catalog-import-portfolio.png)

The portfolio should be now visible under **Imported portfolios**.

![Portfolio Import Complete](/images/docs/guardrails/guides/hosting-guardrails/installation/pre-installation/import-portfolio/service-catalog-import-complete.png)

## Step 4: Grant Access

Choose the imported portfolio, navigate to the **Access** tab, and select **Grant access**.

![Select Grant Access](/images/docs/guardrails/guides/hosting-guardrails/installation/pre-installation/import-portfolio/service-catalog-navigate-access.png)

Select **IAM Principal** and choose the appropriate **Roles** to grant access to the portfolio in Service Catalog, enabling users to deploy the products. Finally, select **Grant access**.

![Grant Access](/images/docs/guardrails/guides/hosting-guardrails/installation/pre-installation/import-portfolio/service-catalog-grant-access-action.png)

## Step 5: Review

Once the portfolio is imported and access has been granted, you can view and provision Turbot Guardrails products from the Service Catalog **Product** List.

![Product List](/images/docs/guardrails/guides/hosting-guardrails/installation/pre-installation/import-portfolio/service-catalog-products-verify.png)


## Turbot Guardrails Portfolio

| Region         | Portfolio                                                                                                                                            |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| ap-south-1     | [port-neo73tqls24he](https://console.aws.amazon.com/servicecatalog/home?isSceuc=false&region=ap-south-1#portfolios/import?id=port-neo73tqls24he)     |
| ap-southeast-1 | [port-i4uxfyvlszine](https://console.aws.amazon.com/servicecatalog/home?isSceuc=false&region=ap-southeast-1#portfolios/import?id=port-i4uxfyvlszine) |
| ap-southeast-2 | [port-mqrb5j263sbnu](https://console.aws.amazon.com/servicecatalog/home?isSceuc=false&region=ap-southeast-2#portfolios/import?id=port-mqrb5j263sbnu) |
| ca-central-1   | [port-oqi3phgemnvho](https://console.aws.amazon.com/servicecatalog/home?isSceuc=false&region=ca-central-1#portfolios/import?id=port-oqi3phgemnvho)   |
| eu-central-1   | [port-gsp6rwefdjhjk](https://console.aws.amazon.com/servicecatalog/home?isSceuc=false&region=ca-central-2#portfolios/import?id=port-gsp6rwefdjhjk)   |
| eu-west-1      | [port-r2f6tscrxgoz2](https://console.aws.amazon.com/servicecatalog/home?isSceuc=false&region=eu-west-1#portfolios/import?id=port-r2f6tscrxgoz2)      |
| eu-west-2      | [port-c3xxvwv4dlvtm](https://console.aws.amazon.com/servicecatalog/home?isSceuc=false&region=eu-west-2#portfolios/import?id=port-c3xxvwv4dlvtm)      |
| eu-west-3      | [port-52avvwkyky5kk](https://console.aws.amazon.com/servicecatalog/home?isSceuc=false&region=eu-west-3#portfolios/import?id=port-52avvwkyky5kk)      |
| sa-east-1      | [port-ssp6vdgvkgghy](https://sa-east-1.console.aws.amazon.com/servicecatalog/home?region=sa-east-1#/portfolios/import?id=port-ssp6vdgvkgghy)         |
| us-east-1      | [port-3vneddg6vujhq](https://console.aws.amazon.com/servicecatalog/home?isSceuc=false&region=us-east-1#portfolios/import?id=port-3vneddg6vujhq)      |
| us-east-2      | [port-weusplgp6bmua](https://console.aws.amazon.com/servicecatalog/home?isSceuc=false&region=us-east-2#portfolios/import?id=port-weusplgp6bmua)      |
| us-west-1      | [port-lot26rdlx4iry](https://console.aws.amazon.com/servicecatalog/home?isSceuc=false&region=us-west-1#portfolios/import?id=port-lot26rdlx4iry)      |
| us-west-2      | [port-u4rbevxpzwj3m](https://console.aws.amazon.com/servicecatalog/home?isSceuc=false&region=us-west-2#portfolios/import?id=port-u4rbevxpzwj3m)      |
| us-gov-west-1  | [port-akp7iklcswqba](https://console.amazonaws-us-gov.com/servicecatalog/home?region=us-gov-west-1/portfolios/import?id=port-akp7iklcswqba)          |

## Next Steps

Please see the following resources to learn more about Turbot Guardrails Enterprise:

- [Turbot Guardrails Architecture](/guardrails/docs/guides/hosting-guardrails/architecture#turbot-guardrails-enterprise---architecture).
- [Installing Turbot Guardrails Enterprise Foundation (TEF)](/guardrails/docs/guides/hosting-guardrails/installation/install-tef#install-turbot-guardrails-enterprise-foundation-tef)
- [Installing Turbot Guardrails Enterprise Database (TED)](/guardrails/docs/guides/hosting-guardrails/installation/install-ted#install-turbot-guardrails-enterprise-database-ted)
- [Installing Turbot Guardrails Enterprise (TE)](/guardrails/docs/guides/hosting-guardrails/installation/install-te#install-turbot-guardrails-enterprise-te)

## Troubleshooting

| Issue                                      | Description                                                                                                                                                                                                 | Guide                                |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| Permission Issues                        | If the current logged-in user lacks permission or if IAM roles or SCPs have changed, preventing built-in roles from accessing needed configuration settings.   | [Troubleshoot Permission Issues](/guardrails/docs/enterprise/FAQ/admin-permissions#aws-permissions-for-turbot-guardrails-administrators)             |
| Further Assistance                       | If you continue to encounter issues, please open a ticket with us and attach the relevant information to assist you more efficiently.                                                 | [Open Support Ticket](https://support.turbot.com)   |

