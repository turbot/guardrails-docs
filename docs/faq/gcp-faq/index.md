---
title: "GCP FAQ"
sidebar_label: "GCP FAQ"
---

# GCP FAQs

---

- [Is there a set of Mods that need to be installed before importing GCP projects?](#is-there-a-set-of-mods-that-need-to-be-installed-before-importing-gcp-projects)
- [Where can I restrict which regions Guardrails is monitoring?](#where-can-i-restrict-which-regions-guardrails-is-monitoring)
- [How do I rotate the GCP Project credentials integrated with Guardrails?](#how-do-i-rotate-the-gcp-project-credentials-integrated-with-guardrails)

---

## Is there a set of Mods that need to be installed before importing GCP projects?

Yes! The `@turbot/GCP` and `@turbot/gcp-iam` mods must be installed prior to
importing a GCP project. Service specific mods, such as
`@turbot/gcp-computeengine`, must also be installed to populate relevant
policies and controls. Check out our
[recommended baseline mods](mods#recommended-starting-mods) for any new
environment.

## Where can I restrict which regions Guardrails is monitoring?

Guardrails will monitor all GCP regions by default. Using the
`GCP > Turbot > Regions` policy, organizations can restrict which regions Guardrails
monitors. The expected format is an array of regions names. This policy is the
default value for all service Regions policies, such as
`GCP > Compute Engine > Instance > Regions`. It is important to note that any
resource in a region not listed will not be recorded in the Guardrails CMDB.

## How do I rotate the GCP Project credentials integrated with Guardrails?

When you need to update your credentials that link Guardrails to your GCP Project, the following steps can be followed
via the Turbot Guardrails console. For programmatic updates, you can use the Turbot
Guardrails [GraphQL API](https://turbot.com/guardrails/docs/reference/graphql) or
the [Guardrails Terraform provider](https://turbot.com/guardrails/docs/reference/terraform).

There are two policies used to integrate a GCP Project with Turbot Guardrails:

**GCP > Client Email:**

1. Navigate to the Policies tab and search for "Client Email" or browse to `GCP > Client Email`.
2. In the `GCP > Client Email` policy page, click the `Settings` subtab.
3. Click on the pencil icon next to the `GCP > Client Email` policy you intend to update.

**GCP > Private Key:**

1. Navigate to the Policies tab and search for "Private Key" or browse to `GCP > Private Key`.
2. In the `GCP > Private Key` policy page, click the `Settings` subtab.
3. Click on the pencil icon next to the `GCP > Private Key` policy you intend to update.
4. Note: you will need to format the Key in a multi-line format. Example of the Key format can be
   found [here](https://turbot.com/guardrails/docs/integrations/gcp/import-gcp-project#creating-a-service-account-via-the-gcloud-cli).

**Credential Verification:**

After updating the credentials, Guardrails will automatically trigger the `GCP > Project > CMDB` control to verify
access to the Project. Successful credential updates should have the `GCP > Project > CMDB` control go into or stay in
an `ok` state.

**Manual Verification**: To manually verify if the credentials are functional:

1. Visit the `Controls` tab and navigate to the `GCP > Project > CMDB` page.
2. Access the `Controls` subtab to view all Project CMDB controls.
3. Select the applicable GCP Project, choose `Actions`, then click on `Run control` to prompt Turbot Guardrails for a
   CMDB update.

If an error arises, consult the log for permission issues. If the status is OK, the credential update was successful. After you confirm the new credential is working as expected, you can remove the prior Service Account Key.
