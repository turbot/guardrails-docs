---
title: Policy Management
sidebar_label: Policy Management
---

# Policy Management

Now that we have gone over resources and controls, the next step is implementing simple pre-canned out-of-the-box ("OOTB") [policies](concepts/policies) and how to extend them further with [calculated policies](concepts/policies/values-settings#calculating-policy-values-for-a-resource).

Policy management is critical in defining how you want Guardrails to act and what metadata resources must have in order to not violate business requirements.

## Suggested Reading

- [Policy Concepts](concepts/policies)
- [Calculated Policies](concepts/policies/values-settings#calculating-policy-values-for-a-resource)
- [Calculated Policies FAQ](concepts/policies/calculated-faq)

## Policies Page - Set a Simple Policy

Remember that users must have `Turbot/Admin` rights at the level where the policy is being set!

1. Start by clicking the **Policies** tab at the very top of the screen. This is designated with a wrench icon.
2. In the search bar, type the following. Pick a search that correlates to resources you know you have.

   - AWS S3 Versioning
   - Azure Storage Access Tier
   - GCP Storage Versioning

Note: You can search for any policy by its name for this example.

3. Select the sole result, e.g.

   - AWS > S3 > Bucket > Versioning
   - Azure > Storage > Storage Account > Access Tier
   - GCP > Storage > Bucket > Versioning

4. This will first take you to the **Policy Type** Explore page. Click on the **New Policy Setting** button in the upper right hand corner.
5. Under the Resource dropdown, select the **Sandbox** folder. If you do not have one, feel free to select a folder or even the account that you imported previously.
6. Under the Settings section, select the relevant option:

   - AWS: `Check: Enabled`
   - Azure: `Check: Hot`
   - GCP: `Check: Enabled`

![](/images/docs/guardrails/s3-policy-setting.png)

7. Click **Create**.
8. You will be redirected to the **Settings** subtab to view the setting you just made on the Sandbox folder. Congrats! You just set your first policy in Guardrails!

Check out the other subtabs while viewing the policy setting to get an idea of what you can find. Once the policy is created, it will immediately take effect on relevant resources. Click the **Controls** tab at the top, then do a similar search as in step 2 (e.g. AWS S3 Versioning, Azure Storage Access Tier, or GCP Storage Versioning). Select the result then click the **Controls** subtab to see the result of setting this new policy!

This is just an example of the power of Turbot Guardrails. To find a full list of policies (as well as controls and resource types) for any mod (for example, aws-s3, azure-storage, or gcp-storage), head on over to the [Mods](mods) page, search for the mod, then click the **Inspect** tab.

For more complex examples, however, we need to use what are called **Calculated Policies**.

## Policies Page - Set a Calculated Policy

1. Stay on, or go back to the Policy Type from step 1 in the previous section. Follow step 1 above up to step 4 if you need guidance on how to get back to the policy creation page.
2. Do the same thing as in step 5 above and select a resource in the resource drop down.
3. Click the **Enable calculated mode** link, then **Launch calculated policy builder**. This is a place where you can test queries and templates against a resource.
4. Select a **Test Resource**. You can either drill down to the resource via the options or simply type in the name of a known resource and select it.
5. Click into the **Step 2: Query data using GraphQL** box and paste the following query (it will be the same for AWS, Azure, or GCP examples)

```graphql
{
  resource {
    turbot {
      tags
    }
  }
}
```

6. The output will display very shortly to the right. As you can see, this query finds the tags/labels, if they exist, on the test resource.
7. Click into the **Step 3: Transform using Jinja2 Template** box and copy the following template:

If the test resource is AWS or GCP:

```nunjucks
{%- if $.resource.turbot.tags.turbotpoc == "yes" -%}
"Check: Disabled"
{%- else -%}
"Check: Enabled"
{%- endif -%}
```

If the test resource is in Azure:

```nunjucks
{%- if $.resource.turbot.tags.turbotpoc == "yes" -%}
"Check: Hot"
{%- else -%}
"Check: Cool"
{%- endif -%}
```

8. Notice the Output to the right shows the evaluation of the template and the subsequent result. The result must match acceptable values for a specific policy (sometimes the acceptable value is simply a string or array). In this example, if we used the Azure template but had an AWS S3 bucket as the test resource, the template validation would fail.

![](/images/docs/guardrails/calc-policy-query.png)

9. Click the green button at the bottom. If you are editing an existing policy, this will show **Update**. If new, it will show **Create**.

10. Similar the Simple Policy, we can search the control type using the Controls tab to view the results of the new policy setting. We created conditions that are dynamic in the evaluation of an approved resource. In this case, if the tag key `turbotpoc` exists with the tag value `yes`, the resource is approved. As a test, try changing the cloud resource tags to include the key: value pair, `turbotpoc`:`yes`, and watch Guardrails approve the resource in real time!

## Optional: Policy Settings with Developer Tools

As an optional use case for developers, we can query, create or update policies through GraphQL, or create and update policies through Terraform.

1. Once again, click the **Policies** tab at the top of the screen.
2. In the search bar, type the following. Pick a search that correlates to resources you know you have.

   - AWS S3 Versioning
   - Azure Storage Access Tier
   - GCP Storage Versioning

3. Select the result.
4. Click on the **Settings** subtab to view the setting we made earlier on the Sandbox folder (or whatever resource you chose to create the setting on).
5. Select the setting.
6. Click on the **Developers** subtab next the **Activity**.

   - The GraphQL section provides quick links to the GraphiQL IDE to query the policy setting, mutation for creating a policy setting, or updating an existing policy setting.
   - The CLI section provides query examples through the `turbot graphql` command.
   - The Terraform section provides the Terraform config for the policy setting. You can also import the existing policy setting into your state file with Terraform Import.

7. For getting started with developer tools, head over to
   [Reference section](reference).

   - [GraphQL 7 minute lab](7-minute-labs/graphql)
   - [CLI 7 minute lab](7-minute-labs/cli)
   - [Terraform 7 minute lab](7-minute-labs/terraform)

## Next steps

We just walked through the creation of a simple, OOTB policy and applied it to a resource type. Then, we modified that existing policy to include logic. This allows Guardrails to dynamically evaluate resources based on very specific and potentially complex requirements.

For additional examples, head over to our 7 minute lab section where you will find:

- [Policy Settings 7 minute lab](7-minute-labs/set-policy)
- [Calculated Policy Settings 7 minute lab](7-minute-labs/calc-policy)

Cloud accounts contain resources against which Turbot Guardrails runs guardrails. That results in a control state based on the definition you set for the policy. Next, we look to manage resource activity and introduce **Policy exceptions**.

\[[Search and Visualize](getting-started/search-and-visualize)\]
\[[Getting Started Main Page](getting-started)\]
\[[Manage Resource Activity and Policy Exceptions](getting-started/activity-exceptions)\]