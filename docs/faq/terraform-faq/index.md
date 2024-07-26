---
title: "Terraform FAQ"
sidebar_label: "Terraform FAQ"
---

# Terraform FAQ

---

- [How do I create a resource with multiple AKAs?](#how-do-i-create-a-resource-with-multiple-akas)
- [Where can I find example Guardrails Terraform configurations?](#where-can-i-find-example-guardrails-terraform-configurations)
- [Which Terraform versions does Guardrails support?](#which-terraform-versions-does-guardrails-support)

---

## How do I create a resource with multiple AKAs?

To create a resource such as a folder with a single AKA, we can add the argument
`aka` to the resource block in the configuration file.

```hcl
resource "turbot_folder" "test_folder" {
    parent = "tmod:@turbot/turbot#/"
    title = "My Test Folder"
    description = "My test folder with 1 AKA"
    akas = ["test-folder"]  //highlight-line
}
```

To add additional AKA to the resource, simply add items to the array.

```hcl
resource "turbot_folder" "test_folder_multi_aka" {
    parent = "tmod:@turbot/turbot#/"
    title = "My Test Folder"
    description = "My test folder with multiple AKAs"
    akas = ["test-folder-akas-1", "test-folder-akas-2"] //highlight-line
}
```

## Where can I find example Guardrails Terraform configurations?

You can find lots of examples on our Guardrails Samples Repo.

- [Policy Packs](https://github.com/turbot/guardrails-samples/tree/main/policy_packs) contains a collection of trivial as well as complex policies for compliance requirements such as to limit S3 public access.

## Which Terraform versions does Guardrails support?

The Guardrails provider supports up to Terraform 0.15.x.
