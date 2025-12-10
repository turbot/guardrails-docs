---
title: Visualize
sidebar_label: Visualize
---

# Visualize

The Visualize page provides a graphical, interactive representation of your AWS Organization hierarchy and Service Control Policies (SCPs). This view helps you understand the structure of your AWS environment, see which accounts are grouped together, and visualize how SCPs are applied across organizational units.

![Visualize](./visualize.png)

## Understanding the Visualize View

The Visualize view displays AWS Organizations as an interactive tree diagram showing:

- **Organization Root**: The top-level node of the AWS Organization (e.g., "GFB - AWS Organization")
- **Root Container**: The organization root container node
- **Organizational Units (OUs)**: Hierarchical containers for organizing accounts (e.g., "Workloads", "Infrastructure", "Payments")
- **AWS Accounts**: Individual accounts represented as leaf nodes (e.g., "goliath-payments-prod")
- **Folded Nodes**: Nodes showing "3 Accounts" or "4 Accounts" indicate collapsed groups that can be expanded
- **Service Control Policies**: When enabled via filter, visual indicators of SCPs applied at each level
- **Relationships**: Lines (edges) connecting the hierarchy from organization → root → OUs → accounts

This graphical representation makes it easy to:
- See the entire organization structure at a glance
- Understand which accounts belong to which organizational units
- Identify the depth and breadth of your organization structure
- See account groupings within specific OUs
- Navigate complex multi-level organizational structures


## Using the Visualization

The visualization provides interactive controls and features:

### Interactive Navigation

- **Zoom In/Out**: Use the `+` and `−` buttons in the bottom-right corner, or use mouse wheel/touch gestures
- **Pan**: Click and drag on the background to move around the visualization
- **Fit View**: Click the `⊡` button to automatically fit the entire organization tree in the viewport
- **Reset Layout**: Click the `↻` button to reset the tree to its default layout
- **Node Selection**: Click on any organizational unit or account node to navigate to its detail page
- **Search**: Use the "Search graph..." box to quickly find and highlight specific OUs or accounts by name

### Understanding Node Types

Different node types appear in the visualization:

- **Organization Root**: The top-level container (typically one per organization), displayed at the very top
- **Root Container**: The AWS Organization root, immediately below the organization node
- **Organizational Units**: Intermediate nodes grouping accounts and other OUs in a hierarchical structure
- **AWS Accounts**: Leaf nodes representing individual accounts, shown at the bottom of their OU branch
- **Folded Nodes**: Nodes displaying a count (e.g., "3 Accounts") indicate collapsed account groups - click to expand
- **Policy Attachments**: When "Show SCPs" filter is enabled, visual indicators showing where SCPs are applied

### Filtering the View

![Visualize Filter Options](./visualize-filter.png)

Use the **Filter** button to control what's displayed in the visualization:

- **Show SCPs**: Toggle this switch to display or hide Service Control Policy attachments on the organization tree. When enabled, SCPs attached to the organization, root, OUs, or accounts will be visually indicated on the graph.

The filter panel can be collapsed by clicking the Filter button again or by clicking outside the panel.

### Exporting the Visualization

![Visualize Export Options](./visualize-export.png)

Use the **Export** button to save the organization visualization in various formats:

- **Export as PNG**: Download a high-quality image (1920x1080 resolution) of the entire organization tree, ideal for presentations and documentation
- **Export as SVG**: Download as scalable vector graphics, perfect for high-resolution printing or further editing in design tools
- **Export Viewport**: Export only the current visible viewport as PNG, useful for capturing a specific portion of the tree
- **Export as JSON**: Download the graph data structure (nodes and edges) in JSON format, useful for programmatic analysis or integration with other tools


## Use Cases

**Understanding organization structure**
Quickly grasp how your AWS environment is organized, especially useful for:
- Onboarding new team members
- Documenting architecture
- Planning organizational changes

**SCP impact analysis**
See which accounts are affected by Service Control Policies:
- Trace SCP inheritance from root through OUs to accounts
- Identify accounts that may be missing required preventions
- Understand the blast radius of policy changes

**Planning reorganization**
Use the visualization when planning to:
- Move accounts between organizational units
- Restructure the organization hierarchy
- Add or remove organizational units


## Next Steps

- Return to the [Accounts](/guardrails/docs/prevention/accounts) view for a list of all accounts
- Use the [Organizations](/guardrails/docs/prevention/accounts/organizations) view for a table-based hierarchy view
- Use the [Folders](/guardrails/docs/prevention/accounts/folders) view to see Turbot Guardrails logical groupings
- Click into any account to view detailed prevention scores by objective
