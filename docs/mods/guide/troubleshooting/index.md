---
title: Troubleshooting
sidebar_label: Troubleshooting
---

# Common Troubleshooting Scenarios for Mods

- [Error: "Forbidden: Mod dist URL has expired"](#error-forbidden-mod-dist-url-has-expired)
- [Mod Management in Large AWS Environments](#mod-management-in-large-environments)
- [Mod Removal Process](#mod-removal-process)
- [Using Guardrails Interval Policies](#using-turbot-interval-policies)

## Error: "Forbidden: Mod dist URL has expired"

### Symptom

When trying to update a Type Installed control, an error message similar to
"Forbidden: Mod dist URL has expired" appears. Re-running the control will not
clear the error.

### Cause

Guardrails distributes mods using S3 pre-signed URLs. These URLs will expire after
three days. As the controls belong to the mod, the entire mod must be refreshed
to get a new URL.

<div className="alert alert-primary" role="alert"><b>WARNING</b>: Resolving this error should be done without removing the mod first.  Removing a mod from a workspace will delete all resources defined by that mod. For example, deleting the <code>azure</code> mod will cause Guardrails to delete all subscriptions, requiring them to be reimported.</div>

### Remediation

1. Login to the Guardrails Console as a user with `Turbot/Owner` permissions.
1. Navigate to the **Admin** page by clicking the gear icon in the top right,
   then select the **Mods** tab.
1. Find the mod that is in error in the list.
1. Click the pencil icon. A dialog box with a number of versions will pop up.
   Click the version that is already installed.
1. Click the **Update Mod** mod button.
1. Guardrails will begin to download the selected version of the mod and deploy it.
   This can take a moment depending on the size of the environment.
1. Once the mod re-installation is complete, the **Mod Health** control will
   re-run. If the control does not go into the `OK` state, contact the Turbot Guardrails
   support team at [help@turbot.com](mailto:help@turbot.com).

## Mod Management in Large Environments

Mod installation in large environments requires care and attention. For the
purposes of this document, we will define a large environment as having more
than 100 active AWS accounts. Failure to follow these processes may result in an
unhealthy workspace, excessive controls in `error`, delayed processing and/or
high operating costs during the change. The AWS Event Handler steps don't apply
when installing or removing Azure and GCP mods.

### New Mod Installation Process

1. Identify the list of new mods to be installed.
2. Set `AWS > Turbot > Event Handlers` to `Skip`. We don't want to kick off any
   Event Handler Terraform runs until we are ready. The `Skip` setting tells
   Guardrails to ignore any changes but preserve any existing Event Handler
   infrastructure.
3. Install the new mod. Avoid installing more than one mod at a time.
4. Wait until all new Discovery and CMDB controls have transitioned out of
   `tbd`. Letting TBDs accumulate over several mod installations will complicate
   and extend clean up. All Discovery and CMDB controls should be in `ok` before
   installing the next mod.
5. Repeat steps 3 and 4 until all new mods have been installed.
6. Resolve workspace issues related to the mod installs:
   - Identify the cause of any persistent policy values in `error` or `invalid`.
   - If you have large numbers of **policy values** in `tbd` and the number is
     not steadily decreasing over time, resolve that issue before tackling any
     controls in `tbd`. (Controls depend on policy values to operate. Controls
     with policy values in `tbd` cannot transition out of `tbd` themselves.)
   - Identify any issues with **controls** in `tbd`, `error` or `invalid`.
     Resolve any problems.
   - Use the
     [run_policy](https://github.com/turbot/guardrails-samples/tree/master/api_examples/graphql/clients/python/run_policies)
     and
     [run_controls](https://github.com/turbot/guardrails-samples/tree/master/api_examples/graphql/clients/python/run_controls)
     scripts help a lot with resolving policy values and controls stuck in
     `tbd`.
   - A healthy workspace has zero controls or policy values in `error` or
     `invalid`. A small number of short-lived controls/policy values in `tbd` is
     okay.
7. Set `AWS > Turbot > Event Handlers` to `Enforce: Configured`. Behind the
   scenes all the event handler source policies will have updated to include the
   new Event Rules. We want the event handlers to run once, not every time each
   mod is installed.
8. Event Handlers are good to go when all `Event Handler`,
   `Event Rule > Configured` and `Event Target > Configured` controls are in
   `ok`.
9. (Optional) It may be desirable to rerun the `Discovery` and `CMDB` controls
   for the new mods. A resource may have change between when the Discovery
   control ran and when the event handlers updated to handle the new events.

### Mod Upgrade Process

It's best practice to set the `Turbot > Mod > Auto Update > Schedule`
[policy](/guardrails/docs/mods/turbot/turbot/policy#turbot--mod--auto-update--schedule)
to run mod updates on the weekends. (Turbot Guardrails SaaS customers are already
configured to use an Auto Update schedule.) This way, if a mod upgrade does
generate event handler churn, it's during off hours.

### Mod Removal Process

Mod removal is most reliable when all the resources for that mod have been
removed from Guardrails first. For Azure and GCP mod removal, the AWS Event Handler
steps should be disregarded.

1. Identify the list of mods to remove.
2. For each mod, identify the list of resources managed by that mod. Reading the
   mods docs (/guardrails/docs/mods/) can help.
3. For your workspace identify how many resources of those resource types exist.
4. (Optional) build a Terraform template that will set all the CMDB policies for
   those resources to `Enforce: Disabled`
5. Set `AWS > Turbot > Event Handlers` to `Skip` across all resources. (We set
   these here to prevent churn from the aws-ec2 and aws-vpc-\* mods where event
   handlers are calculated on a per-resource basis.)
6. Apply the CMDB policies at the Turbot level manually (or via terraform) in
   batches start with the resource types with the lowest total number of
   resources and move up to the higher volume resources to not overwhelm the
   database.
7. Let Guardrails clean up the resources. Time taken will depend on overall system
   load, Guardrails configuration and the number of resources for that mod.
   - Use the
     [run_controls](https://github.com/turbot/guardrails-samples/tree/master/api_examples/graphql/clients/python/run_controls)
     script in the case where CMDB controls need a kick to finish cleaning
     themselves up.
8. Verify that all resources for each mod have been removed from Guardrails. There
   should be zero resources for each mod at this point in the process.
9. Remove each mod from the admin page.
10. Wait 20 minutes for the Event Handler source policies to recalculate.
11. Set `AWS > Turbot > Event Handlers` to `Enforce: Configured`.
12. Verify that `Event Handler` controls are in `ok`.

## Using Guardrails Interval Policies

Guardrails, by default, utilizes an event driven model to detect resource changes.
In some rare circumstances this is either not possible or does not meet very
specific business needs.

This introduces us to the concept of Guardrails Intervals. Intervals can be used to
force regular “ticking” of CMDB controls, which then trigger guardrails when
misconfigurations are detected. While this method can solve many use cases, it
is important to recognize the cost associated with doing so.

Why Intervals?

- Ability to regularly update resource metadata which generate no events when
  changed, i.e. the number of available IP addresses in a subnet.
- An organization requires resources to be scanned and logged on a regular
  basis.

Guardrails Intervals come at a cost. Each “tick” represents a request from Guardrails to
describe a set of resources. As the number of resources in the environment goes
up, so does the amount of requests sent to and received from the cloud service
API endpoint. Similarly, setting a short interval triggers more requests.

### Setting a Guardrails Interval

In order to set a Guardrails Interval policy, you must have Turbot/Admin permissions
at the root level, [CLI configured](reference/cli/installation), and
[Terraform configured](reference/terraform/setup).

1\. Either create a new [Terraform configuration file](reference/terraform) or
open an existing one in a text editor.

2\. Paste the following code in the configuration file:

```hcl
resource "turbot_policy_setting" "turbot_interval" {
  resource = "tmod:@turbot/aws-ec2#/control/types/volumeCmdb"
  type     = "tmod:@turbot/turbot#/policy/types/interval"
  value    = "days: 1"
  note     = "[Ticket CLOUD-152] Run the volume CMDB control on a scheduled interval"
}
```

Let's break this down:

- **resource** - This is the resource where the policy will be set. Notice it is
  a **Control** for **Volume CMDB**. We can use any control here that needs to
  be triggered on a regular interval. For example, if the requirement was to
  refresh S3 Bucket CMDB entries, the control would then be
  `tmod:@turbot/aws-s3#/control/types/s3AccountCmdb`. Use the
  [Mods Registry](mods) to find the correct control
- **type** - The policy type is defining which policy is being created. This URI
  corresponds to the policy `Turbot > Interval`.
- **value** - This defines the time in between control runs. It is recommended
  to start at the upper bound of the time requirements and slowly increment
  towards the desired time requirement. Additional keys that can be used are
  `hours` and `minutes`. Great care must be taken to not set too small of an
  interval!
- **note** - While not required, it is highly recommended to set a note for
  future you (and anyone viewing said policy)!

3\. Apply the configuration file.

4\. That's it! CMDB controls will now be triggered for the desired resource type
(EC2 volumes for this example) on the defined interval.

**Important Note**: This works well for new controls, but existing controls will
require a control run to adhere to the new, defined interval. We suggest running
all relevant resource controls which can be done all at once by utilizing a
[control run](https://github.com/turbot/guardrails-samples/tree/master/api_examples/graphql/clients/python/run_controls)
script.

### **WARNING!!**

Cloud providers can and will throttle requests once the request rate is
exceeded. Regular control runs at short intervals can also generate a
considerable amount of “noise” in the environment.

Mod Interval policies are applied on controls themselves and apply for ALL
resources defined by the control. For example, setting the policy
`Turbot > Interval` policy on the
`tmod:@turbot/aws-ec2#/control/types/volumeCmdb` control type will cause Guardrails
to poll ALL EC2 volumes in ALL accounts imported into Guardrails. This CANNOT be set
at a lower level in the hierarchy!

If setting a Guardrails Mod Interval policy is required, it is recommended to start
at the upper bound of the time frame. For example, start with 24 hours per tick
to determine the impact on your environment and adjust downwards as necessary
and as the environment allows it.

Guardrails is not liable for misconfigurations of the Interval policy resulting in
application downtime and throttling of service API. Great care must be taken
when setting the interval to not overload the API endpoints.
