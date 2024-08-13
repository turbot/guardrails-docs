---
title: Enterprise Installation
sidebar_label: Enterprise Installation
---

# Getting Started with Turbot Guardrails Enterprise

<div className="alert alert-warning">
Turbot Guardrails Enterprise is a cloud-native application, built from the ground up on Amazon Web Services (AWS).  <strong>A dedicated AWS account is recommended for installing Turbot Guardrails Enterprise.</strong>
</div>

## Installation Overview

//TO DO Link updates based on review//

At a high level, the installation process involves 3 stages:

1. Installing Turbot Guardrails Enterprise via Turbot Portfolio Manager and AWS Service
   Catalog:

   - Install the Collective via the
     [Turbot Guardrails Enterprise Foundation](enterprise/installation/tef-installation)
     product
   - Install the Hive via the
     [Turbot Guardrails Enterprise Database product](enterprise/installation/ted-installation)
   - Install a version via the
     [Turbot Guardrails Enterprise product](enterprise/installation/te-installation)

2. Creating a Workspace via the
   [Turbot Guardrails Workspace Manager](enterprise/installation/workspace-manager)
   CloudFormation Custom Resource.

3. Performing one-time
   [post-installation](enterprise/installation/post-installation) steps

### Prerequisite – Importing a Portfolio

Turbot Guardrails Products are published through
[AWS Service Catalog](https://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html).

Portfolios provide a collection of products that can be installed and configured
via the Service Catalog. Turbot Guardrails portfolios are only available to customers after
being shared / given permission – Contact your Turbot Guardrails Solutions Engineer if you
require permission to a Turbot Guardrails Portfolio.

### To import the portfolio(s)

1. In your Turbot Guardrails master account, import the portfolio into each region that you
   will install into. [Portfolio links](#portfolios) are provided below.
2. After importing the portfolio, you must grant access to the portfolio in
   Service Catalog so that users may deploy the products.
3. Once the portfolio is imported, and you have been granted access, you can
   provision Turbot products from Service Catalog Product List.

---

### Turbot Guardrails Portfolio

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
