---
title: Terraform
sidebar_label: Terraform
---

# Building your environment completely by Terraform

If you're familiar with Terraform and want to get started on Guardrails in a infrastructure-as-code approach, here's the sequence and Terraform required to bootstrap your environment.

This overviews how to leverage Terraform in a Guardrails environment, from initialization to resource creation and management.

## References

- [Guardrails Resources Reference](https://www.terraform.io/docs/providers/turbot/index.html) shows all the resources that can be configured by Terraform.
- Turbot Guardrails folders form the [Resource Hierarchy](concepts/resources/hierarchy) as places to put polices, other folders and cloud resources. Consider the [Best Practices](guides/managing-policies#best-practices) for policies when designing your folder hierarchy.

## Prep Work for Terraform

### Build your pipeline

For those just getting started with Terraform, an install on your local workstation of the [Turbot Guardrails CLI](7-minute-labs/cli) and [Terraform](7-minute-labs/terraform) will be sufficient to get started.

Many customers wish to take an infrastructure-as-code approach, which requires a CI/CD pipeline. For those customers, use whatever code pipeline makes sense for your team and environment. Options include but are not limited to:

- AWS Codepipline
- Azure Pipelines
- GCP Cloud Build
- Jenkins
- Atlassian Bamboo

### Notes on Recovery and Idempotency

Most changes to the Guardrails resource hierarchy can be recreated with ease. Should someone accidentally remove a folder which deletes a considerable number of accounts and resources, they can be brought back relatively easily by reversing the change and performing `terraform apply`. Be aware that this restoration may run into errors in these reimported cloud accounts. For example, deleting an account out of Guardrails merely deletes Guardrails' representation of that account. It will not clean up the regional event handler resources as a part of deletion. (The event handlers were deployed outside the scope of the Terraform on your workstation.) Reimporting an account after accidental deletion may require some clean-up.

### Handle sharing of state files

For teams larger than one person, statefile management becomes an important subject. Hashicorp has some [documentation](https://www.terraform.io/docs/state/remote.html) on how to solve this problem. Come up with a solution that sustainably works well for the team and environment.

### Authenticate and connect to your workspace

Make sure you can run Terraform in your pipeline with your Guardrails API keys. Ensure that commits to source control trigger the required actions in your pipeline. Avoid committing credentials to source control.

### Folders

Use [folders](https://www.terraform.io/docs/providers/turbot/r/folder.html) to build a hierarchy. This hierarchy is how your resources, permission grants, and policies will be organized. Develop a hierarchy that makes sense in your environment. There are any number of ways to slice and dice, so there's plenty opportunity to make this fit your needs. If you have questions, contact [Guardrails Customer Support](mailto:help@turbot.com) for guidance.

Build your folder hierarchy in Terraform. At the top should be a single folder representing your entire enterprise. This is recommended since the highest that any policy pack can be created is as a child of the Turbot level. Policy packs can only be assigned to folders and resources lower than themselves in the hierarchy. Steps later in this guide will omit the second {Top Level Folder}.

```
Turbot
  {Company} (Folder)
    {Top Level Folder} (Folder)
      {Intermediate Folder} (Folder)
      {Intermediate Folder} (Folder)
    {Top Level Folder}  (Folder)
      {Intermediate Folder} (Folder)
      {Intermediate Folder} (Folder)
```

### Policy Packs

[Policy packs](https://www.terraform.io/docs/providers/turbot/r/policy_pack.html) are containers that exclusively hold policies. They are the primary method of grouping together related policies and attaching these policies in the resource hierarchy (We'll cover policy pack attachment later). An unattached policy pack is inert, thus making it a safe place to practice applying policies and ensuring that the policy Terraform is working properly.

This example shows a policy pack created at the Turbot level.

```
Turbot
  Enterprise Enforcements (Policy Packs)
  Enterprise Checks (Policy Packs)
  {Company} (Folder)
    {Top Level Folder} (Folder)
      {Intermediate Folder} (Folder)
      {Intermediate Folder} (Folder)
```

### Policies

[Policies](https://www.terraform.io/docs/providers/turbot/r/policy_setting.html) specify what actions Guardrails should take to realize your control objectives. The [v5 mods directory](mods/) is an invaluable resource for looking up policy URIs, policy values, and policy defaults (A free, self-registered account is required).

Given the breadth of prepackaged policies that Guardrails offers, it is very easy to enable a ton of nice-to-have policies without considering the technical debt and environmental noise associated with all those alarms.

"Pick one thing; pick one control; roll that out; have that be successful. And then if that's automated, you don't have to think about that anymore." [-David Boeke](https://turbot.com/guardrails/blog/2020/06/screaminginthecloud)

We can see that policies have been added to the Enterprise Enforcements policy pack. These policies have no effect because the policy pack is unattached.

```
Turbot
  Enterprise Enforcements (Policy Packs)
    [Policies]
  Enterprise Checks (Policy Packs)
    [Policies]
  {Company} (Folder)
    {Top Level Folder} (Folder)
      {Intermediate Folder} (Folder)
      {Intermediate Folder} (Folder)
```

### Policy Pack Attachments

[Attaching policy packs](https://registry.terraform.io/providers/turbot/turbot/latest/docs/resources/policy_pack_attachment) to folders and resources "activates" the policies contained in the policy pack. Notice that the ordering of policy pack attachment matters a great deal. When evaluating policies, Guardrails starts at the resource then ascends the resource hierarchy looking for an applicable policy. A check-mode policy above the same policy in enforce-mode will have no effect. The enforce-mode policy is closer to the resource, so it wins. Remember, "the closest policy wins".

If no policies are set, then the default policy value is used. The "Enterprise Enforcements" and "Enterprise Checks" policy packs are intentionally indented to indicate their presence in the folder hierarchy. The check-mod policies in "Enterprise Checks" are set lower because we are not yet ready for enforcements.

```
Turbot
  Enterprise Enforcements (Policy Pack)
    [Policies]
  Enterprise Checks (Policy Pack)
    [Policies]
  {Company} (Folder)
    Enterprise Enforcements (Policy Pack Attachment)
      Enterprise Checks (Policy Pack Attachment)
        {Top Level Folder} (Folder)
          {Intermediate Folder} (Folder)
```

### Account Import

Now that Guardrails is configured with a folder hierarchy, policy packs and policies, we are ready for [account imports](https://www.terraform.io/docs/providers/turbot/r/resource.html).
Examples can be found in the Guardrails Samples Repo for [AWS](https://github.com/turbot/guardrails-samples/tree/master/baselines/aws/aws_account_import), [Azure](https://github.com/turbot/guardrails-samples/tree/master/baselines/azure/azure_sub_import), and [GCP](https://github.com/turbot/guardrails-samples/tree/master/baselines/gcp/gcp_project_import). Be sure to set the parent for each new account/subscription/project to the appropriate destination folder. If the cloud account is imported into the incorrect folder, simply update your Terraform and Guardrails will move it to the right place.

Be deliberate with your first few imports. Ensure that the proper permissions are in place. Hunt down outstanding errors. Try to get and keep an All-Green environment.

```
Turbot
  Enterprise Enforcements (Policy Pack)
    [Policies]
  Enterprise Checks (Policy Pack)
    [Policies]
  {Company} (Folder)
    Enterprise Enforcements (Policy Pack Attachment)
    Enterprise Checks (Policy Pack Attachment)
    {Top Level Folder} (Folder)
      {Intermediate Folder} (Folder)
        [Accounts, Subscriptions, Projects]
          [Cloud Resources] (Folder)
```

### Profit!

Import the rest of your your cloud accounts. Verify that your policies are returning the information you expect and/or are taking the desired remediation. Ensure that your error, invalid and tbd control counts are low and stay low, ideally, zero. Controls in error, invalid, and tbd indicate that Guardrails isn't able to do its job.
