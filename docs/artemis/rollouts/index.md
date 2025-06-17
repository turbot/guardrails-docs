---
title: Rollouts
---

# Rollouts

You may set up a **Rollout** to automate the rollout of one or more [guardrails](guardrails).  

A rollout provides a predictable, ordered mechanism for deploying guardrails to your organization.  When you create a rollout, you choose one or more guardrails that you would like to deploy, select the accounts to deploy them to, and set a deployment and communication schedule for promoting the guardrails through phases.

Rollout allow you to control the deployment schedule as well as communications with application team, for example: 
- Schedule automatic transitions from one [phase](guardrails#phases) to another.
- Automatically enforce guardrails once there are no alarms.
- Send email notices to account teams on a schedule or when phase change events occur.


## Examples
The following examples use terraform to illustrate the capabilities of a rollout, but you can create a rollout from the console if you prefer.  

### Rollout Basics
A rollout should include at least one guardrail.  Once the rollout starts, you cannot be subsequently add, remove, or change the guardrails.  You may add or remove accounts after the rollout starts, but you will usually want to include all the accounts before you move beyond the `draft` phase. 

```hcl
resource "rollout" "foo" {
  guardrails = [ "199358163546318", "173967295044320"]  
  accounts   = ["111111111111", "222222222222"]

  preview {}
  check {}
  enforce {}
}
```


You do not need to include all the phases in the rollout.

```hcl
resource "rollout" "foo" {
  guardrails = [ "199358163546318", "173967295044320"]  
  accounts   = ["111111111111", "222222222222"]
  
  preview {}
  check {}
}
```

### Sending Notices
By default, transitions are manual only, and no email notices are sent. **Start notices** can be enabled on a per-phase basis.  When enabled, emails will be sent to `recipients` when an account enters the phase.  Notice `recipients` may be "profiles" similar to [notification routing](), or hardcoded email addresses.

```hcl
resource "rollout" "foo" {
  guardrails = [ "199358163546318", "173967295044320"]  
  accounts   = ["111111111111", "222222222222"]
  recipients = [ "Account/*", "Turbot/Owner",  "Turbot/Admin"]

  preview {
    start_notice = "enabled"
  }

  check {
    start_notice = "enabled"
  }

  enforce {
    start_notice = "enabled"
  }
}
```

## Scheduling Phase Transitions
You can (and usually should) schedule the transitions to occur automatically.

```hcl
resource "rollout" "foo" {
  guardrails = [ "199358163546318", "173967295044320"]  
  accounts   = ["111111111111", "222222222222"]
  recipients = [ "Account/*", "Turbot/Owner",  "Turbot/Admin"]

  preview {
    start_at     = "2024-10-30T00:00:00Z"
    start_notice = "enabled"
  }

  check {
    start_at     = "2024-11-30T00:00:00Z"
    start_notice = "enabled"
  }

  enforce {
    start_at     = "2025-01-01T00:00:00Z"
    start_notice = "enabled"
  }
}
```


## Sending Warnings
You can also send **warning notices** to the `recipients` to notify them of the scheduled transition and highlight items that they should address.  You can send the warning multiple times per phase if desired.

```hcl
resource "rollout" "foo" {
  guardrails = [ "199358163546318", "173967295044320"]  
  accounts   = ["111111111111", "222222222222"]
  recipients = [ "Account/*", "Turbot/Owner",  "Turbot/Admin"]

  preview {
    start_at     = "2024-10-30T00:00:00Z"
    start_notice = "enabled"
  }

  check {
    start_at     = "2024-11-30T00:00:00Z"
    warn_at      = ["2024-10-23T00:00:00Z", "2024-10-29T00:00:00Z"]
    start_notice = "enabled"
  }

  enforce {
    start_at     = "2025-01-01T00:00:00Z"
    start_notice = "enabled"
    warn_at      = ["2024-11-24T00:00:00Z", "2024-12-29T00:00:00Z"]
  }
}
```

You can override the recipients on a per-phase basis if you want.

```hcl
resource "rollout" "foo" {
  guardrails = [ "199358163546318", "173967295044320"]  
  accounts   = ["111111111111", "222222222222"]
  recipients = [ "Account/*"]

  preview {
    start_at     = "2024-10-30T00:00:00Z"
    start_notice = "enabled"
  }

  check {
    start_at     = "2024-11-30T00:00:00Z"
    start_notice = "enabled"
  }

  enforce {
    start_at     = "2025-01-01T00:00:00Z"
    start_notice = "enabled"
    recipients = [ "Account/*", "Turbot/Owner",  "Turbot/Admin"]
  }
}
```

### Relative Dates

All dates are "absolute" in the rollout, but you can use HCL functions to make them relative.  This makes it easier to manage the plan if dates change in the future since they tend to be related to each other.

```hcl
locals {
  preview_date = "2024-10-30T00:00:00Z"
  check_date   = timeadd(preview_date, "720h")
  enforce_date = timeadd(check_date, "720h")
}

resource "rollout" "foo" {
  guardrails = [ "199358163546318", "173967295044320"]  
  accounts   = ["111111111111", "222222222222"]
  recipients = [ "Account/*", "Turbot/Owner",  "Turbot/Admin"]

  preview {
    start_at     = local.preview_date
    start_notice = "enabled"
  }

  check {
    start_at     = local.check_date
    warn_at      = [ timeadd(check_date, "-168h"), timeadd(check_date, "-24h") ]
    start_notice = "enabled"
  }

  enforce {
    start_at     = local.enforce_date
    start_notice = "enabled"
    warn_at      = [ timeadd(enforce_date, "-168h"), timeadd(enforce_date, "-24h") ]
  }
}
```


### Transitioning as soon as there are no alerts

If you want, you may use `start_early_if = "no_alerts"` automatically enter a phase when there are no alerts, regardless of the schedule.  For example, accounts could go straight to enforce if they don't have any alarms for the controls in the rollout.   

```hcl
resource "rollout" "foo" {
  guardrails = [ "199358163546318", "173967295044320"]  
  accounts   = ["111111111111", "222222222222"]
  recipients = [ "Account/*", "Turbot/Owner",  "Turbot/Admin"]

  preview {
    start_at     = "2024-10-30T00:00:00Z"
    start_notice = "enabled"
  }

  check {
    start_at       = "2024-11-30T00:00:00Z"
    warn_at        = ["2024-10-23T00:00:00Z", "2024-10-29T00:00:00Z"]
    start_notice   = "enabled"
    start_early_if = "no_alerts"
  }

  enforce {
    start_at       = "2025-01-01T00:00:00Z"
    start_notice   = "enabled"
    warn_at        = ["2024-11-24T00:00:00Z", "2024-12-29T00:00:00Z"]
    start_early_if = "no_alerts"
  }
}
```

### Dynamic attachments via tags

You can use the `turbot_resources` [data source](https://developer.hashicorp.com/terraform/language/data-sources) to search the CMDB for guardrails or accounts dynamically.  This makes it possible to attach accounts or guardrails en masse by tag.


```hcl
data "turbot_resources" "guardrails" {
  filter = "tags:baseline=required resourceType:guardrail" 
}

data "turbot_resources" "accounts" {
  filter = "tags:environment=dev resourceType:account" 
}

resource "rollout" "bar" {
  guardrails = data.turbot_resources.guardrails.ids
  accounts   = data.turbot_resources.accounts.ids

  preview {}
  check {}
  enforce {}
}
```

Note that by using the data source in the terraform plan, the account list will ONLY be updated if you re-run the plan;  The list of accounts is resolved in the plan phase of the terraform run.  If you want to update the list, you have to re-run the plan. The UI also makes it possible to add accounts by tag, even though they are stored internally as IDs.

Guardrails, on the other hand, cannot be added or removed once the rollout has started. If guardrails are added or removed that match the tag, then subsequent terraform runs will fail - the list of guardrails no longer match the current state, but you are not allowed to update them.  To avoid this situation, you can use an `ignore_changes` lifecycle policy.

```hcl
data "turbot_resources" "guardrails" {
  filter = "tags:baseline=required resourceType:guardrail" 
}

data "turbot_resources" "accounts" {
  filter = "tags:environment=dev resourceType:account" 
}

resource "rollout" "bar" {
  guardrails = data.turbot_resources.guardrails.ids
  accounts   = data.turbot_resources.accounts.ids

  preview {}
  check {}
  enforce {}

  lifecycle {
    ignore_changes = [ guardrails ]
  }  
}
```


The data provider is quite flexible - any filter should work..

```hcl
# list of account aliases
filter = "$.AccountAlias:morales-aaa,morales-aab"

# regex of account aliases
filter = "$.AccountAlias:/morales-aa.*/"

# GCP project ids...
filter = "$.projectId:morales-aac"

# Azure Sub ids...
filter =  "$.subscriptionId:'236a078d-0292-46be-80a3-cd8a1cbccde0'"
# or title  and type?
filter = "$.displayName:'morales AAA' resourceType:subscription"
```


### Baselines

Rollouts provide a predictable way to roll out your guardrails.  How to deploy them is up to you; many customer prefer to deploy small, incremental changes frequently, while others prefer larger, less frequent changes.  Both options are possible with guardrails.  

In either case, your policy posture is dynamic, and will change over time. As new guardrails are rolled out to existing accounts, they also need to be applied to new accounts, or existing accounts that are newly imported.  You can use `tags` on guardrails to help define baselines and manage to a known set of guardrails.

The process is simple; define a [tag](#dynamic-attachments-via-tags) for your baseline, and as you deploy guardrails, tag them with any baseline that you want them to be included in.

This can simplify managing a consistent posture:
- When *brand new accounts* are added, you can deploy the baseline by creating a rollout that includes all guardrails with the baseline tag(s).  Since the accounts are new, you can probably move them straight to enforce (or use `start_early_if` to allow a relaxed scheduled but progress faster if there are no alarms).
- When *existing account are newly imported*, you may choose to deploy the baseline to bring them "up to standards".  Alternatively, deploy guardrails iteratively in priority order until the baseline has been reached.
- You can *manage drift* and ensure accounts have the baseline installed. Because guardrails that are already in `enforce` will not be re-applied, simply create a deployment plan to apply the baseline and attach any accounts.  Any "missing" guardrails will be deployed on the rollout schedule.  Accounts that already meet the baseline will be unaffected, and will not receive any notices.


### Detaching guardrails

You can detach guardrails from accounts via a rollout as well, using the same communication and scheduling capabilities that you can use to deploy them.

```hcl
resource "rollout" "foo" {
  guardrails = [ "199358163546318", "173967295044320"]  
  accounts   = ["111111111111", "222222222222"]
  recipients = [ "Account/*", "Turbot/Owner",  "Turbot/Admin"]

  detach {
    start_at     = "2025-01-01T00:00:00Z"
    start_notice = enabled
    warn_at      = ["2024-11-24T00:00:00Z", "2024-12-29T00:00:00Z"]
  }
}
```

## Conflicts

A guardrail may be included in more than one rollout, and an account may be a member of multiple rollouts that include the same guardrail.  If this occurs, the guardrail will be in the most advanced phase. For example: 
- Given:
  - Rollout `foo` includes the `S3 Bucket Encryption at Rest` guardrail. Account `111111111111` is included in this rollout.  Currently, this rollout is in `Preview` phase, scheduled to go to `Check` in 1 week, and enforce a week after that.
  - Rollout `bar` also includes the `S3 Bucket Encryption at Rest` guardrail. Account `111111111111` is also included in this rollout.  Currently, this rollout is in `Check` phase, scheduled to go to `Enforce` in 3 weeks.
- As a result:
  - For account `111111111111`, the `S3 Bucket Encryption at Rest` is currently in `Check` phase.
  - There should be no warning or welcome notices from the `foo` for the `111111111111` account, because it is already in the `Check` phase.  It would have already been sent warnings and/or welcome notices from the `bar` rollout.
  - Warnings and welcome for the `Enforce` phase will be sent to `111111111111` from the the `foo` rollout, because `foo` rollout is scheduled to transition the account to `enforce` before `bar` will.


The schedule is the same for all accounts in a rollout.  Rollouts only move forward, from `draft` -> `preview` -> `check` -> `enforce`.

You can manually move an account through the phases for a guardrail, or for a rollout (essentially, all guardrails in the rollout).
  - Moving it "forward" does not change its schedule as it relates to future phases. For example, if you manually move an account from `preview` to `check` before the scheduled time, the owner will not receive any notifications to warn about moving the `check` phase, but it will then move to `enforce` phase along with the other accounts, according to the plan (unless it is manually moved).
  - You cannot move an account backward before the current rollout state without removing it from the rollout.   You can, however, move it backward as far as the "current" phase of the rollout if it is "ahead". For example, if the rollout is in `check`, you cannot move an included guardrail for that account back to `preview`.  If you had manually moved it to enforce, you may move it back to `check`, however.


## Starting, Stopping, and Pausing a Rollout

The guardrails for a rollout are set when the rollout starts, and cannot be subsequently changed

Accounts can be attached after the rollout starts, and they will immediately proceed to the "current" phase of the rollout.  They will not receive any missed notices, but they will receive the "welcome" message for the current phase if they are transitioned due to the rollout.

Accounts can be detached from a rollout after the rollout starts.

You may change the dates in the rollout after it has started.

You can pause a rollout.  While paused, no state transitions will occur and no notices will be sent.  If you subsequently resume the rollout, any "missed" notices will not be sent, but accounts will be moved to whatever state the rollout dictates, and they will receive the "welcome" notice for that phase if they are transitioned due to the rollout.

Likewise, you can pause a single account to "pin" it to its current phase. The behavior is the same as when the rollout is paused: While paused, no state transitions will occur and no notices will be sent.  If you subsequently resume the rollout, any "missed" notices will not be sent, but the account will be moved to whatever state the rollout dictates, and will receive the "welcome" notice for that phase if it is transitioned due to the rollout.

A rollout is "complete" once all the accounts in it are at the final phase, or you choose to mark it "complete".

Updating policies on a guardrail would be done via a new rollout.  Either:
  - Move the guardrail back to `preview` or `draft` and then deploy the change with a new rollout, or
  - Create a new guardrail with the new policy settings and deploy it with a new rollout.

Removing a guardrail "uninstalls it".  You cannot delete a guardrail that is part of an active rollout.

If you attempt to delete a guardrail, or to edit a policy setting for a guardrail that is in `check` or `enforce` for any account, it will fail unless "forced".  You must either:
  - move the guardrail back to `preview` or `draft` for all accounts first or
  - detach the guardrail from all accounts or
  - resubmit the request with a 'force' flag 




<!--
### Terraform

```hcl
  resource "rollout" "foo" {
    guardrails = [ "199358163546318", "173967295044320"]  
    accounts   = ["111111111111", "222222222222"]
    recipients = [ "Account/*", "Turbot/Owner",  "Turbot/Admin"]

    preview {
      start_at     = "2024-10-30T00:00:00Z"
      start_notice = "enabled"
    }

    check {
      start_at       = "2024-11-30T00:00:00Z"
      warn_at        = ["2024-10-23T00:00:00Z", "2024-10-29T00:00:00Z"]
      start_early_if = "no_alerts"
      start_notice   = "enabled"
    }

    enforce {
      start_at       = "2025-01-01T00:00:00Z"
      start_notice   = "enabled"
      start_early_if = "no_alerts"
      warn_at        = ["2024-11-24T00:00:00Z", "2024-12-29T00:00:00Z"]
    }
  }
```
  
#### Arguments

| Name	      | Type	    | Required? | Description
|-------------|-----------|-----------|-------------------------
| `phase`     | Block     | Required  | one or more [phase blocks](#phase-block) to manage transitions and notices through the rollout.
| `accounts`  | List      | Optional  | A list of akas or ids of accounts that will be targeted by the rollout.  These may be AWS Accounts, Azure Subscriptions, GRP Projects, Kubernetes Clusters, or Github repos
| `guardrails`| List      | Optional  | A list of akas or ids of Guardrails to manage via the rollout
| `recipients`| List      | Optional  | A list of recipients to send notice emails to.  These may be "profiles" similar to [notification routing](https://github.com/turbotio/turbot-core/wiki/Governance:-Contacts-and-Communications#routing-notifications) (e.g. `Account/Owner`,`Account/*`, etc ) or hardcoded email addresses.  The `recipients` for the rollout are treated as defaults for the phases, but you can override them for a phase if desired.

- ***Note: we should add the aws account id as an `aka` for aws account***

#### Phase Block

```hcl
    check {
      start_at       = "2024-11-30T00:00:00Z"
      warn_at        = ["2024-10-23T00:00:00Z", "2024-10-29T00:00:00Z"]
      start_notice   = "enabled"
      start_early_if = "no_alerts"
    }
```


A rollout manages the deployment of one or more guardrails to one or more accounts through a set of known [phases](#phases).  The `phase` labels are meaningful: only `draft`, `preview`, `check`,  `enforce`, `detach` allowed at present
  - A rollout must have at least one phase.
  - Each phase may have a `start_at` - when to transition to the phase
  - The rollout is 'started' when the `preview` phase starts 
  - The rollout is 'completed' after all accounts / guardrails are in the last phase of the rollout (usually `enforce`)
  - The `draft` phase is not usually a phase that you would want to communicate or schedule.  We will include it for completeness, but it has no notice templates as the intent is specifically to **not** inform the account teams.
  


##### Arguments

| Name	             | Type	    | Required? | Description
|--------------------|-----------|-----------|-------------------------
| `start_at`    | Timestamp | Optional  | The time at which the guardrails will begin automatically transitioning to the phase.  If not set, they must be moved manually
| `start_notice`| String    | Optional  | Control whether to send an email notice when an account transitions to the phase, one of `enabled`, `disabled` (default). The transition notice is sent when you enter the phase, regardless of why - if an account is attached and you manually move to enforce, it will send the transition notice 
| `start_early_if`  | String | Optional     | Automatically transition to the phase regardless of the date when the condition is met.  Currently, only  `no_alerts` is supported, which will transition when there are no alerts for the account related to the guardrails in the rollout.
| `warn_at`          | List[Timestamp] | Optional  | The times at which to send warning notices about the phase.  Warn notices are sent on the dates specified in the rollout, but only for accounts that are not already in that state. For example, if an account is already in `enforce` prior to the `start_at` for the `enforce` phase, either because it was manually moved or due to `start_early_if = "no_alerts"`, it will not be sent any enforce warning.   If `warn_at` is not set, warning notices will not be sent.  
| `recipients`| List      | Optional  | A list of recipients to send notice emails to.  These may be "profiles" similar to [notification routing](https://github.com/turbotio/turbot-core/wiki/Governance:-Contacts-and-Communications#routing-notifications) (e.g. `Account/Owner`,`Account/*`, etc ) or hardcoded email addresses.  If not set in the `phase`, the `recipients` for the rollout will be used.

-->
