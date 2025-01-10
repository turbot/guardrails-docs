---
title: Network Stacks
sidebar_label: Network Stacks
---

# Managing Network Configurations with Stacks

> [!IMPORTANT] 
> This document pertains to the legacy `Stack` and `Configured` controls.  Consider migrating to the [Stack [Native] Controls](/guardrails/docs/concepts/guardrails/stacks) for [even more power and flexibility!](/guardrails/docs/concepts/guardrails/stacks#stack-native-controls-vs-legacy-stacks--configured-controls).



## Overview

Network controls and guardrails have been an essential part of Guardrails since
Turbot Guardrails version 1.0. And with good reason - the security and reliability of the
network are fundamentally important. The network is one of the foundational
components on which your infrastructure (and therefore your application!)
relies.

The cloud has shifted the networking paradigm from static, hardware-driven
configurations to dynamic, software driven approaches. In modern cloud
platforms, entire networks can be built and destroyed in minutes, including
routers, gateways, firewalls, VPNs... The challenge is balancing security and
consistency with speed and agility -- How can you harness the agility of
software-defined networks while ensuring that these networks comply with
standards? How can you keep dozens, hundreds, or even thousands of disparate
virtual networks configured consistently?

Guardrails can help you centrally deploy, configure, and manage your cloud-based
networks using Guardrails Stacks. WIth Guardrails network stacks, you describe your
network configuration in Terraform, and Guardrails manages deploying and updating
your configuration. Guardrails' real-time event triggering prevents drift by
re-running your stack whenever a configured item is changed.

### A note for Turbot Guardrails V3 customers

Existing V3 customers will notice that the V5 stack capability is a departure
from the approach in V3 and earlier.

The first version of Guardrails provided a VPC configuration feature that allowed
customers to define IP ranges and other basic configuration parameters, and
Guardrails would create and manage those VPCs. This automated, prescriptive approach
was useful to customers, but as more and more VPC features were added, it was
not flexible enough for many customers.

The V3 approach was more guardrail focused. V3 did not provide a mechanism for
creating VPCs, but instead concentrated on simplifying the ongoing management of
increasingly complex and varied configurations.
[V3 Network Guardrails](https://support.turbot.com/hc/en-us/articles/360012565452-Network-Guardrails-for-AWS)
defined six network security zones, and managed routing and gateway
configuration based on theses subnet types. This abstraction provided a common
language for network routing and simplified defining configurations.

But cloud networks continue to evolve, and Guardrails must evolve with them. While
the types of network security zones have not fundamentally changed, the ways of
implementing and connecting them has expanded. Technologies like Transit
Gateways and VPC sharing provide new options for existing configurations, as
well as entirely new capabilities. As the cloud has matured, our customers have
matured with it. Our customers often already have very specific, defined
standards for their network configuration. The problem that Guardrails needs to
solve has shifted from "How can Guardrails help me configure and manage **_a_**
secure, standard VPC Configuration" to "How can Guardrails help me configure and
manage **_my_** secure, standard VPC Configuration." We believe that network
stack controls are the answer.

## Managing Network Configurations with AWS > VPC > Stack

The `AWS > VPC > Stack` control is a
[custom stack](concepts/guardrails/configured#user-defined-stacks) that you can
use to create and subsequently manage VPCs and related objects across your AWS
accounts and regions.

The stack control can automate the deployment and ongoing updates to your
standard VPCs. Note that this control is NOT intended to manage existing VPCs
that were created outside of the stack. You should leverage the other Guardrails
standard [guardrails](concepts/guardrails) (`Active`, `Approved`, `Tags`, etc)
to manage these resources.

### Example: Setting up a VPC Network Stack

The `AWS > VPC > Stack` control targets an AWS region; regardless of what level
you set the stack policies, the control actually runs once for each region in
scope.

While you can set policies and exceptions down to the region level, you likely
want to set your policies as high in the Guardrails Hierarchy as possible as the
goal is to manage as many VPCs from a single, consistent configuration. It is
often useful to test your policies at the region level before setting them at a
higher scope, however.

#### Scenario

In this example, we will define a simple, standard VPC configuration with 2
public and 2 private subnets. Because we would like to deploy this across all of
our accounts, will use a map variable to define what ip ranges are assigned to
which regions for each account.

In this example, we will assume:

- We have 4 AWS Accounts with the following AWS account aliases:
  - gnb-aaa
  - gnb-bbb
  - gnb-ccc
  - gnb-ddd
- We have imported all accounts into a single folder named **Goliath**
- We only use 2 regions:
  - us-east-1
  - us-west-2

#### Set the `AWS > VPC > Stack > Source`

The `Stack > Source` policy contains the Terraform configuration code that
should be applied. This policy can contain any standard Terraform HCL. This
Terraform configuration will be run in each region that is in scope.

Note that the stack expects to continue to manage any resources that were
created in the stack - if you delete a resource from the Terraform configuration
in the `Source` policy, the stack control will destroy the resource. If you
modify a resource in the `Source`, the control will modify that AWS resource
accordingly.

If you wish to destroy all the objects created by the stack, set the `Source`
policy to `{}`, and leave the `Stack` policy set to `Enforce: Configured`.

For this example, we will set the `Source` policy on the parent folder
(**Goliath**), as we would like the configuration to apply to all accounts below
that folder. We will navigate to the folder, and set the
`AWS > VPC > Stack > Source` to:

```hcl

 variable "tag_prefix" {
    default   = ""
  }

######
variable "ip_assignments" {
  type = "map"
  # map of ip addresses to assign, by account-alias, then region
  default = {
    account-1-us-east-1 = "1.2.3.0/24"
    account-1-us-east-2 = "1.2.4.0/24"
    account-2-us-west-1 = "1.2.5.0/24"
    account-3-eu-east-1 = "1.2.6.0/24"
  }
}

  ######

# Declare the data source
data "aws_availability_zones" "available" {
  state = "available"
}

data "aws_region" "current" {}

data "aws_iam_account_alias" "current" {}

# VPC
resource "aws_vpc" "turbot_default" {
  cidr_block            =  "${lookup(var.ip_assignments, "${data.aws_iam_account_alias.current.account_alias}-${data.aws_region.current.name}")}"
  instance_tenancy      = "default"
  enable_dns_support    = true
  enable_dns_hostnames  = true

  tags = {
    Name	= "${var.tag_prefix}${data.aws_iam_account_alias.current.account_alias}-${data.aws_region.current.name}"
  }
}

resource "aws_subnet" "turbot_public_0" {
  vpc_id            = "${aws_vpc.turbot_default.id}"
  availability_zone = "${data.aws_availability_zones.available.names[0]}"
  cidr_block        = "${cidrsubnet(aws_vpc.turbot_default.cidr_block, 2, 0)}"
  tags  = {
      Name          =  "${var.tag_prefix}public-${data.aws_availability_zones.available.names[0]}-${data.aws_iam_account_alias.current.account_alias}"
  }
}

resource "aws_subnet" "turbot_public_1" {
  vpc_id            = "${aws_vpc.turbot_default.id}"
  availability_zone = "${data.aws_availability_zones.available.names[1]}"
  cidr_block        = "${cidrsubnet(aws_vpc.turbot_default.cidr_block, 2, 1)}"
  tags  = {
      Name          =  "${var.tag_prefix}public-${data.aws_availability_zones.available.names[1]}-${data.aws_iam_account_alias.current.account_alias}"
  }
}

resource "aws_subnet" "turbot_private_0" {
  vpc_id            = "${aws_vpc.turbot_default.id}"
  availability_zone = "${data.aws_availability_zones.available.names[0]}"
  cidr_block        = "${cidrsubnet(aws_vpc.turbot_default.cidr_block, 2, 2)}"
  tags  = {
      Name          =  "${var.tag_prefix}private-${data.aws_availability_zones.available.names[0]}-${data.aws_iam_account_alias.current.account_alias}"
  }
}

resource "aws_subnet" "turbot_private_1" {
  vpc_id            = "${aws_vpc.turbot_default.id}"
  availability_zone = "${data.aws_availability_zones.available.names[1]}"
  cidr_block        = "${cidrsubnet(aws_vpc.turbot_default.cidr_block, 2, 3)}"
  tags  = {
      Name          =  "${var.tag_prefix}private-${data.aws_availability_zones.available.names[1]}-${data.aws_iam_account_alias.current.account_alias}"
  }
}

#  IGW
resource "aws_internet_gateway" "turbot_igw" {
  vpc_id            =  "${aws_vpc.turbot_default.id}"
  tags  = {
      Name          =  "${var.tag_prefix}igw-${data.aws_iam_account_alias.current.account_alias}-${data.aws_region.current.name}"
  }
}

# NAT GW

resource "aws_eip" "nat_eip_0" {
  tags  = {
    Name          =  "${var.tag_prefix}eip-nat-${data.aws_availability_zones.available.names[0]}-${data.aws_iam_account_alias.current.account_alias}"
  }
}

resource "aws_eip" "nat_eip_1" {
  tags  = {
    Name          =  "${var.tag_prefix}eip-nat-${data.aws_availability_zones.available.names[1]}-${data.aws_iam_account_alias.current.account_alias}"
  }
}

resource "aws_nat_gateway" "turbot_nat_gw_0" {
  allocation_id = "${aws_eip.nat_eip_0.id}"
  subnet_id     = "${aws_subnet.turbot_public_0.id}"
  depends_on = ["aws_internet_gateway.turbot_igw" ]

  tags  = {
    Name          =  "${var.tag_prefix}natgw-${data.aws_availability_zones.available.names[0]}-${data.aws_iam_account_alias.current.account_alias}"
  }

}

resource "aws_nat_gateway" "turbot_nat_gw_1" {
  allocation_id = "${aws_eip.nat_eip_1.id}"
  subnet_id     = "${aws_subnet.turbot_public_1.id}"
  depends_on = ["aws_internet_gateway.turbot_igw" ]

  tags  = {
    Name          =  "${var.tag_prefix}natgw-${data.aws_availability_zones.available.names[1]}-${data.aws_iam_account_alias.current.account_alias}"
  }

}

# Public route table / routes
resource "aws_route_table" "public" {
  vpc_id            =  "${aws_vpc.turbot_default.id}"

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.turbot_igw.id}"
  }
  tags  = {
    Name          =  "${var.tag_prefix}public-rtb-${data.aws_iam_account_alias.current.account_alias}-${data.aws_region.current.name}"
  }
}

resource "aws_route_table_association" "public_0" {
  subnet_id      = "${aws_subnet.turbot_public_0.id}"
  route_table_id = "${aws_route_table.public.id}"
}

resource "aws_route_table_association" "public_1" {
  subnet_id      = "${aws_subnet.turbot_public_1.id}"
  route_table_id = "${aws_route_table.public.id}"
}

# private Route Tables / Routes

resource "aws_route_table" "private_0" {
  vpc_id                    =  "${aws_vpc.turbot_default.id}"
  tags  = {
    Name          =  "${var.tag_prefix}private-rtb-${data.aws_availability_zones.available.names[0]}-${data.aws_iam_account_alias.current.account_alias}"
  }
}

resource "aws_route" "private_natgw_0" {
  route_table_id              = "${aws_route_table.private_0.id}"
  destination_cidr_block      = "0.0.0.0/0"
  nat_gateway_id = "${aws_nat_gateway.turbot_nat_gw_0.id}"
}

resource "aws_route_table_association" "private_0" {
  subnet_id      = "${aws_subnet.turbot_private_0.id}"
  route_table_id = "${aws_route_table.private_0.id}"
}

##

resource "aws_route_table" "private_1" {
  vpc_id                    =  "${aws_vpc.turbot_default.id}"

  tags  = {
    Name          =  "${var.tag_prefix}private-rtb-${data.aws_availability_zones.available.names[1]}-${data.aws_iam_account_alias.current.account_alias}"
  }
}
resource "aws_route" "private_natgw_1" {
  route_table_id              = "${aws_route_table.private_1.id}"
  destination_cidr_block      = "0.0.0.0/0"
  nat_gateway_id = "${aws_nat_gateway.turbot_nat_gw_1.id}"
}

resource "aws_route_table_association" "private_1" {
  subnet_id      = "${aws_subnet.turbot_private_1.id}"
  route_table_id = "${aws_route_table.private_1.id}"
}


####### Outputs ###

output "vpc_id" {
  value = "${aws_vpc.turbot_default.id}"
}

output "public_subnets" {
  value = ["${aws_subnet.turbot_public_0.id}", "${aws_subnet.turbot_public_1.id}"]
}

output "private_subnets" {
  value = ["${aws_subnet.turbot_private_0.id}", "${aws_subnet.turbot_private_1.id}"]
}

```

Note that the `Source` policy is just standard Terraform code. We use data
providers to determine which account and region we are running in, and use that
information to look up configuration information specific to this account/region
in variables defined at the top of the configuration. This configuration will
create a VPC, 2 public subnets, 2 private subnets, and 2 NAT gateways (in 2
different availability zones), an internet gateway, and the appropriate routing
tables.

You can, of course, extend this configuration to meet your specific needs - set
up VPN connectivity, create VPC endpoints, security groups, transit gateway
attachments, etc, all using standard Terraform!

#### Set the `AWS > VPC > Stack > Variables`

The `Variables` and `Secret Variables` policies allow you to set variables to
use when running the Terraform configuration. The `Variables` and
`Secret Variables` policies are merged into a single set of variables that are
passed as a
[tfvars](https://www.terraform.io/docs/configuration/variables.html#variable-definitions-tfvars-files)
file to Terraform by the stack control.

In our `Source` policy, we look up the IP assignment information specific to
this account/region in the `ip_assignments` variable defined at the top of the
configuration. We will override this value in the `Variables` policy with the IP
address assignments for our accounts/regions.

For this example, we will set the `Variables` policy on the parent folder
(**Goliath**), as we would like the configuration to apply to all accounts below
that folder. We will navigate to the folder, and set the
`AWS > VPC > Stack > Variables` to:

```hcl
## map of ip addresses to assign, by account-alias, then region
ip_assignments = {
    gnb-aaa-us-east-1 = "10.100.8.0/22"
    gnb-aaa-us-west-2 = "10.104.8.0/22"
    gnb-bbb-us-east-1 = "10.108.8.0/22"
    gnb-bbb-us-west-2 = "10.112.8.0/22"
    gnb-ccc-us-east-1 = "10.116.8.0/22"
    gnb-ccc-us-west-2 = "10.120.8.0/22"
    gnb-ddd-us-east-1 = "10.124.8.0/22"
    gnb-ddd-us-east-2 = "10.128.8.0/22"
}
```

Separating the configuration (`Source`) from the data (`Variables`) is
considered best practice when using stacks:

- This makes the source easily testable outside of Guardrails.
- You can add new VPC IP assignments by simply editing the `Variables` - the
  `Source` does not change.
- At times, you may wish to use calculated policies to set the configuration
  based on other data in the Guardrails CMDB. Rendering the input variables in
  nunjucks is much simpler than rendering the whole Terraform source.

#### Set the `AWS > VPC > Stack`

At this point, we are ready to enable the stack control.

For this example, we will set the `Variables` policy on the parent folder
(**Goliath**), as we would like the configuration to apply to all accounts below
that folder. We will navigate to the folder, and set the `AWS > VPC > Stack` to
`Enforce: Configured`.

In a few seconds, the stack control will run for each region in scope, and will
create new VPCs in each of the regions of all accounts in scope!
