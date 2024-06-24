---
title: Post Installation
sidebar_label: Post Installation
---

# Post Installation Steps

## Set Workspace Policies

If you are using the **Public Api Gateway** option, you should ensure that
gateway is set in the **Turbot > Workspace Gateway Domain** name policy to your
gateway DNS name. You can find the value in the **ApiGatewayEventsURL** output
of the TEF stack. The policy should be set to the DNS name only, without the
protocol or path. This is usually `gateway.{installation domain}` – for example
if your installation domain is “turbot.mycompany.com”, the gateway would be
“gateway.turbot.mycompany.com”.

<div className="alert alert-warning"> If you are using the API Gateway option, you <strong>must</strong> set the Turbot > Workspace Gateway Domain policy!  If you are <strong>NOT</strong> using a gateway (the default configuration), you should <strong>leave the policy blank!</strong>
</div>

## Update DNS Records

If you chose not use Route53 to manage the DNS during the TEF, TE, or Workspace
Manager Installation, you will need to create/update the DNS records yourself.
If you have opted to use Route53-managed DNS during the installation (the
default option), Turbot will manage the records for you - you can ignore this
section.

#### API Gateway DNS

If you chose to create public API gateway, but did not choose to use Route53 to
manage DNS, then you must register a DNS alias for the api gateway in your DNS
server. You should create a record for the gateway DNS name (from the
`ApiGatewayEventsURL` in the TEF stack output - `gateway.{installation domain}`)
to point to the regional endpoint, listed in the `ApiGatewayRegionalDomainName`
stack output variable.

#### Workspace DNS

If you chose not to enable **Manage DNS Records in Route 53**, then you must
manually create (or modify) a CNAME record for your workspace to point to the
load balancer for the new version after running workspace manager. You can
obtain the version-specific load balancer DNS name from the `LoadBalancerDNS`
variable in the TE output.

<div className="alert alert-warning"> If you are managing your own DNS, you must update the dns alias for your workspace <strong>every time you update the workspace </strong> with a new version (after running Workspace Manager)!  
</div>

## Update Turbot Mods

After installing a new workspace, you should always update the `turbot` and
`turbot-iam` mods to the latest version. These core mods will already be
installed into your blank workspace, but they must be updated when the workspace
is first created:

1. **turbot**
2. **turbot-iam**

Note that the `turbot-iam` mod depends on `turbot`, so they should be installed
in order - `turbot` first, then `turbot-iam`. The **turbot** and **turbot-iam**
mods cannot be removed.

A guide for installing additional mods can be found
[here](guides/managing-mods/install-mods).

## Importing AWS, GCP, and Azure accounts into Turbot

Turbot supports importing an account from any of the three major cloud
providers. More information about required policy settings and mod installations
can be found in the [Integrations](integrations).

## Setting up Single Sign On access

Customers are encouraged to [setup SSO](guides/directories) access into their
Turbot workspaces as soon as possible. In case of break-glass or workspace
bootstrapping, customers can use the default Turbot Local directory. Be aware
that Turbot Local user passwords expire after a default of 90 days. Customers
should develop a plan for how they will regain access should the password
expire.

Credentials, password and API keys, for the `admin@turbot.io` user should be
securely stored.
