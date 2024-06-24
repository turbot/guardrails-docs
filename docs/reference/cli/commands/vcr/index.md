---
title: vcr
template: Documentation
nav:
  order: 10
---

# Command: vcr

The `turbot vcr` command runs a background process to record and mock HTTP requests. It is commonly used with `turbot test`.



## Usage

**Usage: `turbot vcr <command>`**

### Supported Sub-commands
|Command| Description|
|-|-
| `turbot vcr start` | Start the VCR mockserver to record and replay mock responses.
| `turbot vcr stop` | Stop the VCR mockserver.
| `turbot vcr restart` | Restart the VCR mockserver.
| `turbot vcr replay` | Show recent logs from the VCR mockserver (last 1000 lines).

The supported options are:
- `--help` : Shows help.

