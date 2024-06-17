---
title: 'TagsResolution'
template: Documentation
sidebar_label: TagsResolution
deprecated: false
nav:
  title: 'TagsResolution'
  order: 10
---

# TagsResolution

<div style={{'fontFamily':'monospace'}}><span style={{'fontSize':'1.5rem','fontWeight':500}}>TagsResolution</span></div>

Specify the scope and merge strategy for resource tags. `SELF` - return only the tags set on this object, not the ancestors. `REQUIRED` - return the merged set of tags for this resource and all of its ancestors. If a duplicate key exists, use the value from the resource highest in the hierarchy. `RECOMMENDED` - return the merged set of tags for this resource and all of its ancestors. If a duplicate key exists, use the value from the resource lowest (nearest this resource) in the hierarchy.

| | |
| -- | -- |
| `RECOMMENDED` |  |
| `REQUIRED` |  |
| `SELF` |  |