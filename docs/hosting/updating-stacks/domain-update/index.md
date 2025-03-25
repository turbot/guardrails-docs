---
title: "Workspace URL Change"
template: Documentation
nav:
  order: 80
---

# Updating Your Turbot Guardrails Installation Domain

In some situations, you may be required to change the URL for your workspace due
to a domain name change, or a migration from internal DNS to Route 53. This
guide outlines the full process of moving to a new URL/domain.

## Limitations
Given a complete workspace URL like `https://console.prod.turbot.customer.com`, an enterprise customer would be able to 
change the installation domain of `prod.turbot.customer.com` to something else.  The `console` portion cannot be 
changed since it is also the name of the Postgresql table schema that stores the workspace data.  If a workspace
absolutely requires a new name, then create a new workspace with the desired name.  Migrate all cloud accounts from 
the old workspace to the new. 


## Prerequisites

1. Create a hosted zone for the new domain.
2. Create a new matching TLS certificate and upload it to AWS Certificate
   Manager. Your certificate names will need to include:
   - Domain name
   - Workspace URL (e.g. `{workspace_name}.{domain}`)
   - API Gateway (e.g. `gateway.{domain}`) -- only if applicable

## Phase 1:

1. Navigate to CloudFormation.
2. Select the workspace stack and select "Update".
3. When prompted, choose "Replace Workspace Template" and upload the latest
   [workspace template](enterprise/installation/workspace-manager).
4. Do not change any values from your current workspace template.
5. Apply the stack and wait for it to finish.

## Phase 2:

1. Navigate to Service Catalog > Provisioned Products.
2. Select the Turbot Guardrails Enterprise Foundation (TEF) product and update using the
   same version as is currently deployed.
3. Change the installation domain to the new domain.
4. Change the certificate ARN to match the new certificate. Update and wait for
   it to complete.

#### Verification

- Verify that the SSM parameter `/turbot/enterprise/installation_domain` is set
  to the new domain in Systems Manager.

## Phase 3:

1. Navigate to Service Catalog > Provisioned Products.
2. Open the Turbot Guardrails Enterprise (TE) product.
3. Click Actions > Update.
4. Scroll to the bottom and change the Parameter Deployment Trigger to the
   opposite of its current value. This will force the SSM parameters to be
   reevaluated.
5. Run the update and wait for it to complete.

#### Verification

- Verify that a CNAME record was created for
  `turbot-$version.your.new.domain.com` that points to the ALB in your new
  hosted zone.
- Verify that a CNAME record was created for
  `workspace_name.your.new.domain.com` that points to
  `turbot-$version.your.new.domain.com` in your new hosted zone.
- Verify that a new SSM parameter
  `/turbot/tenant/workspace_name.your.new.domain.com` is created in Systems
  Manager.
- Test connectivity to the workspace.

    <div className="alert alert-warning">
    Note: If you are not using Route53 for DNS management, you will need to create/update the above CNAME records manually.
    </div>

# If using API gateway:

- Complete the Prerequisites.
- Prior to Phase 2:
  1.  Navigate to API Gateway in AWS. Open your API Gateway and delete any
      custom domain names that exist.
  2.  Run an update to the TEF stack in Service Catalog, deprovisioning the API
      gateway by setting the `Create public API gateway` parameter to
      `Disabled`.
  3.  Run the update with no other changes.
  4.  Verify that all events completed successfully via the linked
      Cloudformation stack.
- Complete Phase 2, making sure to set the API Gateway parameter to Enabled to
  provision the new API gateway.
- Complete Phase 3.
- Open your Guardrails workspace and update the policy
  `Turbot > Workspace > Gateway Domain Name` with the value from the API Gateway
  Invoke URL in AWS. (API gateway > Stages > Turbot)
- Verify that any Event Handler policies/controls have been updated and re-ran
  successfully.
