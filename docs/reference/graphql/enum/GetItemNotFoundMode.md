---
title: 'GetItemNotFoundMode'
template: Documentation
sidebar_label: GetItemNotFoundMode
deprecated: false
nav:
  title: 'GetItemNotFoundMode'
  order: 10
---

# GetItemNotFoundMode

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>GetItemNotFoundMode</span></div>

The error mode to determine the behaviour of error from a get request.

| | |
| -- | -- |
| `ERROR` | Return all errors. |
| `RETURN_NULL` | Return null if the item is not found. All other errors are returned. |