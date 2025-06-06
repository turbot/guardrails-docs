---
title: "Guardrails and AWS SCPs"
sidebar_label: "Guardrails and AWS SCPs"
---

# Guardrails and AWS SCPs

## Can Guardrails work with SCPs that limit Region Access?

With the introduction of AWS Service Control Policies many organizations use
them to limit the resources that their users deploy in unapproved regions. The
security and cost management gains are considerable, but these restrictions can
cause false alarms within the Guardrails console if certain policies are
misconfigured.

Generally, SCPs are used to restrict the creation of resources outside of
approved regions. Under normal operation, this could cause Guardrails to display
errors in attempting to perform discovery in the unapproved regions, leading to
alarms and errors in the console. Guardrails policy settings allow you to edit a
list of available regions available in AWS. Any region outside of this list will
be invisible to Guardrails; however, Guardrails recommends a defense-in-depth strategy
as it pertains to region restrictions. SCPs are preventative controls, Guardrails
can also provide detective and corrective controls across unapproved regions
that would allow for a greater security and flexibility in the following
situations:

- **Watch the watchers**: In any organization, there will be one or more
  individuals with the ability to create exceptions to SCPs. Detective controls
  allow security, compliance and finance auditors to check for any resources
  that may be created accidentally or maliciously by users with elevated access.
- **Mergers and Acquisitions**: M&As and joint ventures will often carry with
  them new IT infrastructure requirements.
- **Pre-existing accounts and shadow IT**: AWS accounts outside of standard
  practice might need monitoring and assessment prior to being brought under
  enterprise control.
- **Service linked roles**: SCPs do not affect any service-linked role.
  Service-linked roles enable other AWS services to integrate with AWS
  Organizations and can't be restricted by SCPs. SCPs affect only principals
  that are managed by accounts that are part of the organization.
- **Removal of Default VPCs**: It is a well-documented best practice to remove
  default VPCs from unused regions. Guardrails' automation to delete these VPCs can
  not be used to do this if those regions are removed from visibility.

To "turn off" a region in Guardrails, the policy AWS > Account > Regions \[Default]
can be configured to list only allowed regions. This policy can be configured at
almost any level within the hierarchy, with the region itself being the lowest
level.

Setting the policy:

1. Navigate to the level at which the policy should be set in Guardrails. This will
   often be done at the Turbot level, but the scope of the policy will be
   determined based on the scope of the SCP across the organization.

2. Select the **Policies** tab.

3. Click on the **New setting** button on the right side.

4. In the new window, click **Browse** -> **AWS** -> **Account** -> **Regions
   \[Default]**, then click **Select**.

5. Ensure that the **Scope** is set correctly. If not, click **Browse** and
   navigate to the appropriate level in a similar way to navigating the policy
   type.

6. List the approved regions in the Setting field. Each region will be on a new
   line, starting with a hyphen and space. The screenshot below is an example
   for approving both US East 1 and US West 1 regions in AWS.
   ![](/images/docs/guardrails/policy_yaml.jpg)

Guardrails will suspend action within unapproved regions immediately after setting
the policy. Once again - this setting turns off Guardrails in unapproved regions and
as such stops discovery and remediation.

If you have additional questions regarding Guardrails and AWS SCPs, reach out to
Guardrails support at help@turbot.com
