---
title: TED Update
sidebar_label: TED Update
---

# Updating TED Service Catalog Product

Access to the Guardrails master account is required in order to update the TEF Service Catalog product. Administrator privileges are highly recommended. An update to the TED product is done via the existing Service Catalog product.

1. Open the AWS Console and navigate to the Service Catalog service.

2. Select the hamburger menu in the top left and click on `Provisioned products list`.

3. There should be three provisioned products: a TEF product, a TED product, and a TE product. Different organizations may have different naming conventions.

4. Select the TED product. If it is not obvious via the name of the product, selecting a product itself will open the details page. The product type will be listed here.

5. Ensure that the the current version of TEF is supported by the TED stack before installing.

6. While looking at the Turbot Guardrails Enterprise Database product, select `Actions` and then click `Update`.

7. Select the desired version, then click `Next`.

8. Verify that all parameters are correct. In general, these can be left untouched. Scroll down to the bottom of the page and click `Next`.

9. Again, verify the parameters are correct, then select `Update`.

10. The TED stack in CloudFormation will immediately begin to update. The TED stack can take some time to complete the update. Event logging can be seen in CloudFormation.
