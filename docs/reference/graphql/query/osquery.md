---
title: 'osquery'
template: Documentation
sidebar_label: osquery
deprecated: false
nav:
  title: 'osquery'
  order: 10
---

# osquery

<div className="pb-4 font-roboto-slab text-lg"><span className="font-bold">osquery</span> <span style={{'fontWeight':400,'fontSize':'0.85em'}}>(resource: <a href="/guardrails/docs/reference/graphql/scalar/ID">ID</a>, resourceTypeUri: <a href="/guardrails/docs/reference/graphql/scalar/String">String</a>) &rarr; <a href="/guardrails/docs/reference/graphql/object/Osquery">Osquery</a></span>
</div>



Generate a `osquery` response, containing the `enrollSecret` which is required for authenticating the `osqueryd`.

The generated secret ensures that only authorized osqueryd clients can register and communicate securely with the server.