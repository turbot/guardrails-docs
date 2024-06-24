---
title: TEF Update
sidebar_label: TEF Update
---

# Updating TEF Service Catalog Product

Access to the Guardrails master account is required in order to update the TEF Service Catalog product. Administrator privileges are highly recommended. An update to the TEF product is done via the existing Service Catalog product.

1. Open the AWS Console and navigate to the Service Catalog service.

2. Select the hamburger menu in the top left and click on `Provisioned products list`.

3. There should be three provisioned products: a TEF product, a TED product, and a TE product. Different organizations may have different naming conventions.

4. Select the TEF product. If it is not obvious via the name of the product, selecting the product itself will open a details page. The product type will be listed here.

5. While looking at the Turbot Guardrails Enterprise Foundation product, select `Actions` and then click `Update`.

6. Select the desired version, then click `Next`.

7. Verify all the parameters are correct, but in general, these can be left untouched. Scroll down to the bottom of the page and click `Next`.

8. Again, verify the parameters are correct, then select `Update`.

9. The TEF stack in CloudFormation will immediately begin to update. The stack can take a few minutes to complete the update, but often it will be less than one or two minutes.
