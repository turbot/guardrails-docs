---
title: "Service Accounts to Projects"
template: Documentation
nav:
  title: "Service Accounts "
  order: 20
---

# Project to Service Account Ratios

**Can I use the same service account for multiple projects?** Yes, to a point. Google Cloud makes it easy to create a
single service account then manage many projects with it. The convenience is inescapable. However, Turbot Support recommends one
service account for each project as this scales the best, maximizes API quota headroom for each service account and
minimizes blast radius.

## Scaling of Projects to Service Accounts

**Works to a Point**: A single service account for multiple projects using event pollers will top out about 100 to 120
projects depending on event poller settings and overall environmental churn. As more projects are assigned to a single
service account, the greater portion of the API quota will go to event polling, leaving less headroom for Discovery,
CMDB or remediation calls. With enough projects, the event poller API calls will completely dominate the API quota.

**Scales to High Degree**: A service account handling many projects using event handlers will scale much better than
event pollers. Exactly how many projects depends on multiple factors such as: the number of projects per service
account, average volume of change, peak volume of change, size of synchronous change across all managed projects. If the
volume of change consistently exceeds the API quota then Guardrails can fall behind. This can appear as missed events or
remediations that should have happened but didn't. Using event handlers frees up the API quota that would have been
spent on event polling.

**Scale to Infinity**: The safest approach is to have 1 service account for each project. This maximizes the API quota
headroom for each project. Event pollers and event handlers will work just fine at a 1:1 project:service account ratio. 
This approach also restricts blast radius to a single project. There is also no post-deployment monitoring required of 
API quotas.  
