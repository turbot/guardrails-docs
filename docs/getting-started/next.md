---
title: Final Notes
sidebar_label: Final Notes
---

# Now What?

With all your accounts imported and a few policies set, you're ready to get into the main loop of Guardrails usage. Consider these areas of exploration as you plan your next move.

## Guardrails Usage Loop

Using Guardrails follows the familiar pattern.

1. Identify some governance need.
2. Develop a policy set to meet this need.
3. Deploy the policies in Check mode. Assess the scope of what would change if the policies were put in Enforce mode.
4. Plan out how to remediate these resources. Either identify exceptions or let Guardrails take the remediation action. Don't break production.
5. Verify that Guardrails took the appropriate actions.
6. All alarms are resolved. Go back to step 1 and start over.

Get and keep your environment green. Having lots of alarms can lead to "Alarm blindness". Alarms that no one cares about or takes action on make it hard to find the real problems.

## Reach Goals

There's a brief list of things you may want to do with Guardrails now that the basics are working.

## Alarms and Policies

- Resolve alarms raised by the CIS benchmarks.
- Resolve alarms raised by your initial policies.
- Enforcement of policies your initial policies. Make sure to test them first.
- Targeting a restricted set of regions (unless this is a part of the initial policies).

### Automation

- Development of pipelines for account import, notifications and policy application.
- If you have a dashboard product you like, pull data out of Guardrails to populate that dashboard.
- Assignment of Guardrails user permissions for users outside of the Customer Guardrails Admin team.
- Extracting data from Guardrails to data analytics platforms.
- Decommissioning process for accounts imported into v5.
- Develop a ratcheting policy pipeline that will move a policy from 'check' to 'enforce' when all controls are in 'ok'.

### Extra Nice to Have Configuration

- Provision SAML directory if not setup already.

### Knowledge of your environment

- What are your most common resources?
- What is the rate of change in your environment? Is it noisy or quiet?
- What are the most common events?
- Are there anti-patterns in your environment that are less efficient or less secure than they could be?
- How many alarms are generated when you turn on a new policy?

### Social Integration of Guardrails into your enterprise

Ultimately, Guardrails is a tool that engineers and architects will directly or indirectly interact with. Blind-siding the organization with a bunch of policies in Enforce-mode helps no one.

Develop a plan for some or all of the following:

- How new policies will be rolled out.
- How developers & engineers will get exceptions to policies.
- How to remediate out-of-compliance resources in legacy Production accounts.
- How to run a short and fast feedback loop between remediation actions and informing the affected party what happened and why. This often involves notifications, ticketing and dashboard systems. Guardrails' GraphQL API provides considerable power to get the information your enterprise needs. The Guardrails Samples Repo has plenty of [GraphQL examples](https://github.com/turbot/guardrails-samples/tree/master/api_examples/graphql) for controls and notifications.
- How to make it easy for devs and engineers to look up information about active policies.
  - What policies are enforced
  - What policies are checked
  - How to resolve alarms
  - When will enforcements start

[[Previous]](getting-started/activity-exceptions) [[Table of Contents]](getting-started)
