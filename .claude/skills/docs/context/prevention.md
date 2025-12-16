# Prevention Documentation Prompt for LLMs

This prompt guides LLMs in writing and updating documentation for the Turbot Guardrails Prevention section.

## Overview

The Prevention section documents Guardrails' prevention-first cloud security approach. This system discovers preventive controls already in cloud environments (Service Control Policies, Azure Policies, account settings, etc.), maps them to security objectives, and scores how effectively they prevent security issues before they reach production.

**Key principle**: Prevention-first security stops misconfigurations, policy violations, and risky deployments before they happenrather than detecting them after deployment.

## Documentation Structure

Documentation mirrors the UI structure with strict folder organization:

**Folder structure rules:**
- Each documentation page must have its own folder containing `index.md`
- Store all images for that page in the same folder
- Use relative paths `./image.png` to reference images
- One folder per sidebar item, sub-folders for each tab

**Example structure:**
```
docs/prevention/
  dashboard/
    index.md                     (main dashboard page)
    dashboard-overview.png
    explore/
      index.md                   (explore tab)
      explore-view.png
    reports/
      index.md                   (reports tab)
      reports-view.png
  objectives/
    index.md                     (objectives overview)
    benchmarks/
      index.md                   (benchmarks tab)
      benchmarks-list.png
    benchmark-detail/
      index.md                   (benchmark detail page)
      benchmark-detail.png
    objectives/
      index.md                   (objectives tab)
      objectives-list.png
    objective-detail/
      index.md                   (objective detail page)
      objective-detail.png
    priorities/
      index.md                   (priorities tab)
    categories/
      index.md                   (categories tab)
    recommendations/
      index.md                   (recommendations - under objectives)
      recommendations-list.png
```

**Current sections:**
- Dashboard - Overall prevention posture and scores
- Accounts - Account-level prevention coverage and hierarchy
- Objectives - Security goals and their prevention status (includes Recommendations)
- Preventions - Inventory of active security controls
- Simulator - SCP testing environment

**Sidebar structure:**
- Detail pages appear immediately after their list page (e.g., Benchmark Detail after Benchmarks)
- Recommendations is nested under Objectives (not a top-level item)
- Tab names in sidebar match the actual tab names (e.g., "Objectives" not "Objectives List")

## Core Concepts

### Objectives
Security goals you're trying to achieve. NOT technical controlsthese are outcomes.
- Examples: "Restrict AWS resources to allowed regions", "Require encryption at rest for AWS EBS volumes"
- Have categories (Identity & Access, Data Governance, etc.)
- Have priorities (P1-P5, where P1 is critical)
- P1 objectives weighted 8x more than P5 (reverse Fibonacci sequence)

### Preventions
Actual technical controls implementing objectives. Multiple preventions can contribute to one objective.
- Types: Service Control Policies, Azure Policies, account settings, Guardrails controls, GitHub branch protection
- Layers: Build, Access, Config, Runtime (when they operate in resource lifecycle)
- Each type has tradeoffs in complexity, flexibility, and overhead

### Layers
When preventions operate in the resource lifecycle:
- **Build**: Catch problems in IaC before deployment (weight: 0.75)
- **Access**: Block dangerous API calls at org level (weight: 0.95, highest)
- **Config**: Enforce settings on existing resources
- **Runtime**: Detect and respond during operation
- Defense-in-depth = controls at multiple layers

### Categories
Seven security domains organizing objectives:
- Identity & Access
- Feature Restrictions
- Trust & Sharing
- Data Governance
- Network Perimeter
- Core Infrastructure
- Audit & Logging

### Priorities
Criticality indicators (P1-P5):
- P1: Foundational controls, implement immediately
- P2: Strong security improvements
- P3: Defense-in-depth enhancements
- P4-P5: Optimizations and hygiene

### Benchmarks
Compliance frameworks organizing objectives:
- Examples: AWS CIS v6.0.0, NIST 800-53 Rev 5, Azure CIS v5.0.0
- Show prevention scores for each framework
- Many objectives appear in multiple benchmarks

### Prevention Scores
0-5 scale measuring how well you prevent security issues before they occur.
- Considers: coverage (which objectives have preventions), quality (layer weighting), importance (priority weighting)
- Aggregates at every level: by objective, account, category, benchmark

## Writing Style and Tone

### DO:
- **Conversational tone**: Write naturally, as if explaining to a colleague
- **Explain concepts and capabilities**: Focus on WHY things matter, not just WHAT they are
- **Purpose-driven**: Explain how users can use features to accomplish security goals
- **Brief callouts**: Mention important fields/features in a sentence or two, not exhaustive lists
- **Context**: Explain when and why you'd use specific views or filters
- **Real scenarios**: Include common use cases and practical examples

### DON'T:
- **Bulleted lists everywhere**: Use prose paragraphs for explanation
- **Page Layout sections**: No exhaustive lists of every UI element, field, or card component
- **Dry reference style**: This isn't API documentation
- **Just describe UI**: Don't just say "this page shows X"explain why X matters
- **Repetitive structure**: Vary the writing, don't template every page identically

### Examples of Good vs. Bad

**Bad (too dry, too many bullets):**
```
## Page Layout

The Preventions page contains:
- Title: "Preventions"
- Filter bar with the following fields:
  - Search box
  - Account filter
  - Type filter
- Card list showing:
  - Prevention name
  - Prevention type
  - Status badge
  - Number of objectives
```

**Good (conversational, explains value):**
```
Each card represents a prevention that's actually implemented in your environment. For example, you might see "Block Public ACLs on AWS S3 Buckets" or "Require encryption for Azure Storage accounts." These aren't just recommendations or desired statesthese are active controls that Guardrails has discovered in your cloud accounts.

What makes this view useful is seeing everything in one place. Instead of checking the AWS Organizations console, then Azure Policy, then your Guardrails workspace, you can see all your preventive controls togetherfiltered, sorted, and mapped to the objectives they achieve.
```

## Common Use Cases to Document

When writing prevention docs, address these scenarios:

1. **Understanding current posture**: "How secure are we right now?"
2. **Finding gaps**: "What security objectives aren't we meeting?"
3. **Prioritizing work**: "What should we implement next?"
4. **Verifying coverage**: "Do we have this control in place?"
5. **Testing before deployment**: "Will this SCP break anything?"
6. **Comparing across frameworks**: "How close are we to CIS compliance?"
7. **Account-level analysis**: "Which accounts are least protected?"
8. **Strategic planning**: "Are we relying too much on one control type?"

## Technical Implementation Details

### Screenshots
- Store in same directory as markdown: `docs/prevention/dashboard/dashboard-overview.png`
- Use markdown syntax: `![Prevention Dashboard overview](./dashboard-overview.png)`
- PNG format, 1280px width, light mode, no browser chrome
- Take screenshots that show meaningful content, not empty states

### Links
- Use absolute paths: `[Explore](/guardrails/docs/prevention/dashboard/explore)`
- Omit `.md` extensions: NOT `explore.md`
- Omit `index.md` for directory pages: `/dashboard` not `/dashboard/index`
- Link terms on first mention per section only

### Document Structure
```yaml
---
title: Page Title
sidebar_label: Page Title
---

# Page Title

Opening paragraph(s) explaining what this is and why it matters.
NO "## Overview" header.

## First Concept/Feature

Explanatory prose...

## Second Concept/Feature

More prose...

## Common Use Cases (or "How to Use This Information")

Practical scenarios...

## Next Steps

- [Related page 1](/guardrails/docs/prevention/related1)
- [Related page 2](/guardrails/docs/prevention/related2)
```

## Application Details

- **Location**: https://demo.cloud.turbot-dev.com/apollo
- **Login**: User must log in first (request credentials if needed)
- **Navigation**: Use Chrome DevTools MCP tools to navigate and capture screenshots
- **Testing**: Explore features before documenting to understand behavior

## Key Resources

While writing prevention docs, reference:
- Existing prevention docs in `docs/prevention/` for tone and structure
- `style-llm.md` for formatting rules
- Visual hierarchy in the UI (what's prominent = what's important to document)
- User workflows (how people actually use these features)

## Section-Specific Guidance

### Dashboard
Focus on: Overall scores, how to interpret them, what actions to take based on scores

### Accounts
Focus on: Organization hierarchy, account-level coverage, identifying gaps, visualizations

### Objectives
Focus on: What objectives are, how they're categorized/prioritized, tracking progress toward goals

### Preventions
Focus on: Inventory of controls, understanding types and layers, verification workflows, defense-in-depth strategy

### Recommendations
Focus on: How recommendations are prioritized, implementation guidance, risk reduction

### Simulator
Focus on: Why test SCPs, how to use simulator, testing workflows, understanding SCP behavior, catching unintended consequences

## Validation Before Completing

- [ ] Conversational tone, not dry reference style
- [ ] Explains WHY features matter, not just WHAT they do
- [ ] Includes practical use cases and scenarios
- [ ] No exhaustive "Page Layout" bullet lists
- [ ] Screenshots show meaningful content
- [ ] Links use absolute paths with `/guardrails` prefix
- [ ] Images use relative paths with `./` prefix
- [ ] All concepts explained for readers unfamiliar with prevention-first security
- [ ] Writing varies, not templated/repetitive across pages

## Common Pitfalls

1. **Too much UI description**: Don't enumerate every button and field
2. **Missing the "why"**: Always explain why a feature or view matters
3. **Bulleted lists overuse**: Use prose paragraphs to explain concepts
4. **Ignoring workflows**: Show how users accomplish goals, not just what pages exist
5. **Assuming knowledge**: Explain prevention-first concepts, not everyone knows them
6. **Repetitive structure**: Each page should fit its content, not follow a rigid template

## Example Opening Paragraphs

**Good example (from preventions/index.md):**
> The Preventions page shows all the security controls actively protecting your cloud environment. Think of this as your inventory of preventive measuresevery Service Control Policy, Azure Policy, account setting, and other control that's stopping risky configurations before they can cause problems.
>
> Each card represents a prevention that's actually implemented in your environment. For example, you might see "Block Public ACLs on AWS S3 Buckets" or "Require encryption for Azure Storage accounts." These aren't just recommendations or desired statesthese are active controls that Guardrails has discovered in your cloud accounts.

**Why this works:**
- Conversational tone
- Explains what it is (inventory) AND why it matters (stops risky configs)
- Concrete examples
- Clarifies it's discovered controls, not just recommendations
- Sets up the mental model for understanding the page
