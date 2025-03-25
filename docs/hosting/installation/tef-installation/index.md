---
title: TEF Installation
sidebar_label: TEF Installation
---

# Turbot Guardrails Enterprise Foundation (TEF) Installation

**The Turbot Guardrails Enterprise Foundation** stack creates networking components that
will be shared by all workspaces.

## Install

### Launch the TEF Service Catalog item

1. In the AWS Console, navigate to Service Catalog in the region into which you
   wish to install TEF.
1. Select **Turbot Guardrails Enterprise Foundation** from the Products list and click
   "Launch Product."
1. Select a **Name** for the provisioned project. Typically, this will be "tef".
1. Select a **Version**. Usually, you will want the latest version.

### Installation

1. Enter the **Installation Domain Name**.

   - This should be the base domain name for the installation (for example,
     `turbot.mycompany.com`). This should be unique per Turbot installation –
     you cannot share an Installation Domain Name across multiple collectives.
   - Workspaces will be set up as subdomains of this installation domain (for
     example, `dev.turbot.mycompany.com`).
   - If you elect to create a public API gateway, it will also be a subdomain of
     the installation domain (for example, `external.mycompany.turbot.com`).
   - Domain names **CANNOT** be shared across multiple TEF installs if the API
     Gateway is deployed. Attempting to do so will result in connection errors.

1. Enter the **Turbot Certificate ARN** to be used for the Turbot Console (and
   gateway, if applicable) in this region.

   - This **_must_** be the ARN of an **_ACM certificate in this region_**.
   - The certificate domain name must match the **Installation Domain Name**.
   - Wildcard certificates should include entries for the base **Installation
     Domain Name** and a wildcard for workspaces. Example:
     `turbot.mycompany.com` and `*.turbot.mycompany.com`.
   - For environments where wildcard certs are not allowed, the certification
   should include the base **Installation Domain Name**, all workspace domain
   names and any public API gateways.

   <div className="alert alert-warning">
   A wildcard certificate is highly recommended.  Without a wildcard cert, the certificate will need to be updated with the new workspaces as they are brought online.
   </div>

1. Select whether Turbot domain names should be managed in Route53.

   - When enabled, Turbot will manage blue/green deployments by swapping DNS
     names during version upgrades
   - If the API gateway feature and Route53 management are enabled, Turbot will
     manage routing to the nearest regional gateway.
   - To use this feature, _you must host the DNS zone for the Installation
     Domain Name in Route 53 in the Turbot account_.

    <div className="alert alert-warning">
    It is highly recommended that you allow Turbot to manage DNS records in Route53.  If you choose not to do so, you must manually update DNS records every time you install a new version in your workspaces.
    </div>

1. Each region must be given a different **Region Code** identifier, allowing
   the stacks to be automatically coordinated for peering etc. Select "Alpha" as
   the **Region Code** for this first region.

### Logging

1. Select the **Turbot Handler Log Retention Days** or keep the default.
1. Select the **Audit Trail Log Retention Days** or keep the default.

### Network

If desired, the Turbot Guardrails Enterprise Foundation setup can create the VPC to host
Turbot. Alternatively, you can install Turbot into an existing VPC.

#### Network - This Region [Option A - Created in this Stack]

<div class = "alert alert-warning">
To have TEF create the Turbot VPC, enter the required information in <b>Network - This Region [Option A - Created in this Stack]</b> and <span style={{color:"red"}}>leave all fields in <b>Network - This Region [Option B  Predefined]</b> blank!</span>.
</div>

1. Enter the CIDR ranges for the TEF Subnets. These CIDR ranges must all fall
   within the range specified for the VPC in the previous step.

   - CIDRS fall into 3 categories – any subnet with an empty CIDR will NOT be
     created:
     - **Public Subnets** will route through an Internet Gateway, allowing
       public IP addresses to be used. If you wish to access the Turbot Console
       via the Internet, on a public IP address, then you should configure one
       or more public subnets to host the load balancers.
     - **Turbot Subnets** are configured as private subnets that may route
       outbound to the internet via a NAT gateway, but not inbound. Turbot
       application servers and containers will be launched in these subnets.
     - **Database Subnets** are configured as private subnets with no inbound or
       outbound access – only VPC traffic is routed to and from these subnets.
       These subnets can be used to host the Postgres database instances.
   - Note that for each subnet type, there are 3 possible subnets. These
     correspond to 3 different availability zones. As stated previously, a
     subnet with an empty CIDR will not be created – If you wish to create a 2
     AZ network, only enter CIDRs for subnets #1 and #2, for example.

   <div class = "alert alert-warning"> Any subnet with an empty CIDR will NOT be created.
   </div>

1. Enter the desired **NAT Gateway High Availability** configuration.  For a
   production deployment, you should choose **Multi-AZ**.

#### Network - This Region [Option B - Predefined]

To install Turbot into an existing VPC, enter the required information in
**Network - This Region [Option B - Predefined]**

<div className="alert alert-warning">
Note that Turbot requires outbound https to the Internet from the load balancer and application (Turbot) subnets. This can be routed through your proxy if desired.
If using a proxy, you must also create VPC endpoints to allow fargate to access the following AWS services:
<ul>
  <li> ECR API </li>
  <li> CloudWatch Logs </li>
  <li> ECR DKR </li>
  <li> S3 </li>
</ul>
</div>

1. Enter the VPC ID that will be used to host Turbot in the **VPC** field. This
   VPC must already exist. If empty, then a new VPC will be deployed by this
   stack, per **Network - This Region [Option A - Created in this Stack]**.
1. In the **Load Balancer Subnets** field, enter a comma separated list of
   subnet IDs where the load balancers will be deployed. These subnets may be
   public facing or internal facing, and can be identical to the Application
   Subnet IDs. Id you have selected a pre-defined VPC, you MUST specify Load
   Balancer Subnet Ids here.
1. In the **Application (Turbot) Subnets** field, enter a comma separated list
   of subnet IDs where the Turbot Containers and private lambda functions (such
   as the workspace manager) will be deployed. If you have selected a
   pre-defined VPC, you MUST specify Application (Turbot) Subnet IDs here. These
   subnets must be able to route https outbound to the Internet, either directly
   or through a proxy.
1. In the **Database Subnets** field, enter a comma separated list of subnet IDs
   where the databases will be deployed. If you have selected a pre-defined VPC,
   you MUST specify Database Subnet IDs here.

#### Network – Load Balancer

Enter load balancing and gateway information.

1. Select the load balancer **scheme.** The scheme determines if the load
   balancer is internal or internet-facing. If internet-facing then the load
   balancer subnets must be "public". Otherwise, the subnets should be "turbot".
1. Enter a **CIDR for inbound access from Clients / Users**: The CIDR range for
   inbound traffic to the Turbot load balancer (i.e. end users). Typically this
   will be 0.0.0.0/0, but may be updated for environments with limited access
   requirements.
1. If you choose to use an internal load balancer, you should set **Create
   public API gateway** to **Enabled**. This will create an API Gateway that
   allows Turbot to receive real-time events.

#### Network - Proxy

Enter **Network – Proxy** information if you wish to configure Turbot
application containers and VPC lambdas to use a proxy server for outbound HTTPS.
_Note that controls and calculated policies running in most Lambda functions do
not use the proxy configuration since they are outside the VPC._

1. **HTTP_PROXY**: HTTP_PROXY configuration used by the Turbot application
   containers for HTTP requests, e.g. http://internal.proxy.com:2011. Default is
   null (no proxy).
1. **HTTPS_PROXY**: HTTPS_PROXY configuration used by the Turbot application
   containers for HTTPS requests, e.g. http://10.5.6.7:890 or
   http://internal.proxy.com:2011. Default is null (no proxy).
1. **NO_PROXY**: NO_PROXY configuration used by the Turbot application
   containers as exceptions to the HTTPS_PROXY and HTTP_PROXY settings, e.g.
   169.254.169.254, localhost. \*Be aware that the node.js AWS SDK does not
   support passing some AWS services through the proxy but not others. Either
   the proxy handles all traffic to the AWS service endpoints, or it should
   handle none of them.

#### Network - Security Groups

If you are using a pre-defined VPC, you will need to create security groups
that allow access appropriate to your environment.  The Guardrails-Samples repo
contains Cloudformation to [build these for you](https://github.com/turbot/guardrails-samples/blob/main/installation/security_groups.yml).
Add additional ports to these three security group to meet your organizational needs.  Do not remove ports or security group
relationships.


1. **Custom Outbound Security Group ID** A security group that allows the
    container services outbound access to the database and aws services. If you
    use an http proxy, you will need to add an egress rule to the custom
    security group to be able to allow the containers to access it. You may also
    need outbound access for other infrastructure services, such as DNS.

        A. Minimum Requirements
        - Ingress: None
        - Egress: HTTPS (443), HTTP (80), DNS (tcp,udp:53), NTP (123)

2. **Custom Load Balancer Security Group ID** A custom load balancer Security
    Group id that has ingress rules for accessing the turbot application.

        A. Minimum Requirements
        - Ingress: HTTPS (443)
        - Egress: ECS API Tasks (port range: 32768 to 65535) to the API Service Security Group only

3. **Custom Api Service Security Group** A custom Api service Security Group id
    that has restricted outbound access and inbound access to load balancer.

        A. Minimum Requirements
        - Ingress: Loopback HTTPS (443)
        - Egress: ECS API Tasks (port range: 32768 to 65535) to the Load Balancer Security Group only

#### Advanced - Scaling

Set **Scaling** options. The defaults are usually sufficient:

1. **Autoscaling target CPU utilisation**: Target CPU Utilization for ECS EC2
   instances in Turbot Autoscaling Group. The current recommended setting is 50.
1. **API Desired Scale Size**: The number of simultaneous API tasks that you
   want to run on the cluster. The current recommended setting is 1.
1. **API Minimum Scale Size:** The minimum value that API Auto Scaling can use
   to scale a target during a scaling activity. The current recommended setting
   is 1.
1. **API Maximum Scale Size**: The maximum value that API Auto Scaling can use
   to scale a target during a scaling activity. The current recommended setting
   is 2.

#### Advanced - Deployment

17. Select the portfolio lifecycle **Release Phase** for deployment
    (development, staging, or production). This should usually be "production".

18. Select a prefix to be used for all resources created in the stack or use the
    default (turbot). Because this prefix will be used across many resource
    types and different resource types have different name restrictions, you
    should avoid special characters and uppercase letters.

  <div className="alert alert-warning">
    <span style={{color:"red"}}>It is HIGHLY RECOMMENDED that you use the default prefix!</span> The TEF Stack will export the parameters that you have select to an SSM parameter, and they will use this prefix.  Using the default will greatly simplify TE deployments and upgrades.
  </div>

### Run the Stack

19. Click through to review your changes and then launch the stack.
20. Verify that the stack completes successfully.

### Termination Protection

21. To ensure that the TEF stack is not accidentally deleted, it is strongly
    recommend that termination protection is enabled. his can be done via the
    following steps once the stack is in the OK state:
    1. Log into the AWS account containing the Turbot install.
    2. Navigate to the CloudFormation Service.
    3. Select the TEF stack. The description of the correct stack should say
       **Turbot Guardrails Enterprise Foundation**.
    4. Click **Stack Actions**.
    5. Click **Edit Termination Protection**.
    6. Switch the setting from **Disabled** to **Enabled**, then click the
       **Save** button.
