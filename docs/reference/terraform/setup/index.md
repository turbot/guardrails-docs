---
title: Setup
template: Documentation
nav:
  order: 10
---

# Setup Guide

## Download & Install Terraform

[Download and install Terraform](https://learn.hashicorp.com/terraform/getting-started/install.html)
from the official website of HashiCorp.

## Set up the Turbot Guardrails Terraform Provider

Turbot Guardrails Terraform Provider is available in the official Hashicorp provider registry! This allows users to
easily create a configuration file and install the Guardrails Terraform provider with little effort.

The Guardrails Terraform provider users the same credentials storage as the Turbot Guardrails CLI. If you haven't already done
so, [set up your Turbot Guardrails CLI credentials](reference/cli/installation#setup-your-turbot-credentials).

1. To install the Turbot Guardrails provider, it is necessary to define a provider configuration in the working
   directory. Terraform will automatically install the provider in the chosen directory.

```hcl
terraform {
  required_providers {
    turbot  = {
    source  =  "turbot/turbot"
    version  =  "1.9.1"
    }
  }
}

provider "turbot" {
  # Configuration options
  # profile = 'default'
  # OR
  # workspace           = "https://turbot-customer.cloud.turbot.com"
  # access_key          = "b05*****-****-****-****-********580a"
  # secret_key          = "d79*****-****-****-****-********b28"
}
```

2. After specifying the Terraform Provider, execute:

```shell
$ terraform init
```

- Documentation about specific configuration options can be found in the
  <a href="https://www.terraform.io/docs/providers/turbot/" target="_blank">Terraform
  Turbot Provider</a> documentation. This includes instructions on how to set
  static credentials as well as using environment variables to pass in access
  keys.

- To specify a particular provider version when installing the Turbot provider,
  see the
  [Terraform documentation on provider versioning](https://www.terraform.io/docs/configuration/providers.html#version-provider-versions).

## Reference

- https://www.terraform.io/downloads.html
- https://www.terraform.io/docs/providers/turbot/index.html
