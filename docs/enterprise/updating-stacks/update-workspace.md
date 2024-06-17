---
title: TE/Workspace Update
sidebar_label: TE/Workspace Update
---

# Updating TE Service Catalog Product and Guardrails Workspace

Updating a Guardrails workspace is a two step process. First, use Service Catalog to
create a new TE stack with the desired version. Second, update the Guardrails
workspace stack to point to the new TE version. Updating the TE product is done
along side the existing TE product, which means a new CloudFormation stack will
be created. The Workspace CloudFormation stack will be updated using the
existing stack.

<div className="alert alert-warning">
     <span style={{color:"red"}}>Critical: The TE stack and workspace stack will need to be updated in tandem! Do not delete the old TE stack until the new, udpated stack has completed in CloudFormation. In other words, the TE stacks must always be blue-green deployments. The custom workspace stack should, on the other hand, NEVER be deleted. Always update the original stack in CloudFormation.</span>
</div>

## Launching a new TE Service catalog product

1. Verify there is a new version available for the TE stack.
2. Ensure that the the current version of TEF and TED are supported by the TE
   stack before installing.
3. In the Service Catalog UI, select Products List, then Turbot Guardrails Enterprise.
4. Select Launch product.
5. Select the updated version in the version list, and title the new stack
   appropriately.
6. Confirm the parameters are correct. The following instructions are taken from
   the original install doc:
   1. The **Advanced - Foundation Parameters** provides the SSM parameters
      created/modified by the TEF stack. These usually do not change. _You
      should not need to modify any of these settings unless you used a
      non-default prefix in the TEF setup._
   2. The **Advanced - Foundation Parameters** can be used if you wish to
      override one of the settings selected in the TEF stack. _Normally, these
      should all be blank._
   3. You may set **Advanced – Deployment** options. Normally, you should accept
      the default values:
      1. Select a Resource Name Prefix. This prefix will be added to all Guardrails
         resources. _This MUST match the Turbot Guardrails Enterprise Foundation Resource
         Name Prefix!_
      2. _DO NOT MODIFY_ the **Release Stream** unless instructed to do so by
         Turbot. This selects the Portfolio lifecycle phase which defines the
         artifacts to be used for this deployment.
7. Click Next at the bottom of the page.
8. Add tags if desired and click Next.
9. Click next at the Notifications page.
10. Scroll to the bottom of the page and select Launch. This will start the
    CloudFormation stack.
11. Navigate to CloudFormation to verify the stack updates with no errors.

## Updating the Workspace

1. Navigate to CloudFormation and select the Guardrails workspace stack.
2. Click Update.
3. Select Use current template and click Next.
4. Modify the Version to match the new version number used in the TE stack. It
   will stay of the form 5.x.x.
5. Click Next at the bottom of the page, then Next, then Update stack.
6. Verify the stack completes the update with no errors.

## Delete previous TE version

1. In the Service Catalog UI, click the menu button then select Provisioned
   products list.
2. Find the old TE stack, click the three dots, then click Terminate provisioned
   product.
3. The product in Service Catalog as well as the associated CloudFormation stack
   will begin to delete resources. This can take an extended period of time (15
   plus minutes).
4. Once the stack has completed deletion, verify the Guardrails environment is
   behaving as expected.
