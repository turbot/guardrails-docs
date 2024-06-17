---
title: Integrations
template: Documentation
nav:
  order: 30
---

# Integrations

Turbot Guardrails' fundamental goal is to solve configuration governance for the enterprise in a dynamic, ever-changing
landscape. Its modular design allows it to be fully extensible. Guardrails provides integrations for common cloud platforms, such as AWS, Azure, GCP, and ServiceNow.

| Service                                           | Description                      |
|---------------------------------------------------|----------------------------------|
| [Amazon Web Services (AWS)](./integrations/aws)   | Onboard your AWS accounts        |
| [Microsoft Azure](./integrations/azure)           | Onboard your Azure subscriptions |
| [Google Cloud Platform (GCP)](./integrations/gcp) | Onboard your GCP projects        |
| [Kubernetes](./integrations/kubernetes)           | Onboard your Kubernetes clusters |
| [ServiceNow](./integrations/servicenow)           | Onboard your ServiceNow instance |

Check out [Best Practices](integrations/best-practice) for importing AWS accounts, Azure subscriptions, and GCP Projects
to ensure smooth onboarding!

## Using a custom API Endpoint for Event Handling

Most organizations have strict requirements around the flow of information, both where it enters the internal network
and where it leaves. Guardrails upports the use of a customer managed reverse proxy as well as AWS' API Gateway as a
service. In either case, Guardrails requires just one policy setting in the application to facilitate proper event
message
handling.

These steps require Guardrails to be installed and the UI accessible via a browser. `Turbot/Admin` permissions are
required at
the Turbot level to set this policy.

1. Log into the Guardrails console, then click on the top **Policies** tab.
2. Click on the green **New Policy Setting** button.
3. Click on the **Policy Type** field, search for the string `gateway domain name`. Select the result with the
   title `Turbot > Workspace > Gateway Domain Name`.
4. Select the **Resource** as `Turbot`.
5. In the **Setting** text field, input either the AWS API Gateway CNAME (gateway.deployment.customer.com) or the
   Guardrails API Gateway's invoke URL. If using a custom reverse proxy,
   this policy value will be the custom CNAME or API URL defined by the organization.
6. Click **Create**. Continue to the [AWS](aws), [Azure](azure), or [GCP](gcp) integration pages to add accounts into
   Turbot and configure
   event handlers for real-time discovery and remediation.

## Common Questions Regarding Eventing

### Event Handlers or Event Pollers?

There are a number of trade-offs between between pollers and event handlers. In general, event pollers are easier to
setup because they require no additional infrastructure, merely access to the cloud provider API endpoints. Event
handlers have lower latency but require additional infrastructure to get working.

Turbot recommends event handlers unless latency concerns make an event poller more practical.

#### Event Pollers

##### Pros:

- Very easy to set up. Ensure Guardrails has the right credentials and it's ready. There is no additional infrastructure
  that
  needs to be deployed in the target cloud account.

##### Cons:

- Persistent API and compute costs. Running a poller happens every polling interval, regardless of whether events are
  waiting or not.
- Latency in getting events. New events will only show up on the next poll.

#### Event Handlers:

##### Pros:

- If there are no events to process, the event handler infrastructure is quiet.
- Depending on cloud provider, the latency can be very low.
- There are no hits against cloud account API rate/quota limits.

##### Cons:

- The performance of event handlers varies greatly by cloud provider. Some providers can process events in less than a
  second. Others can take several minutes to emit an event.
- Event handlers requires additional infrastructure to be deployed in the target cloud account.

### How do Event Pollers work?

Guardrails pollers send event queries to the target cloud provider's event history service. The question the pollers ask
is "Give me events in the last `${window_size}`". The poller runs on a frequency of `${polling_interval}`. The window
size and polling interval are policies configured at initial setup, and are of the
format `{Cloud Provider} > Turbot > Window` and `{Cloud Provider} > Turbot > Interval`, respectively.

### What does the event path look like using Event Pollers?

The Event Poller runs outside the VPC so it won't have access to the ALB to submit the events. All communication with
non-management Lambdas (ex. hive_manager, workspace_manager) are done over SQS/SNS. Event messages from the Event
Pollers would have to go to the worker or API containers for processing (more likely it's the API container). After it
hits the api/worker containers, CMDB/discovery/remediation events would go back on the queue to be handled by other Az
mod lambdas.

Remember (from the Turbot perspective):

- Pollers are clients. Guardrails reaches out to get info from the Azure/GCP/AWS event service.
- Event Handlers are Servers. Guardrails waits for Azure/GCP/AWS to send it information.

### Can I use a custom solution?

In brief, an event can be sent over any path between CloudTrail and the Guardrails ALB. This could be custom or
consolidated
Event Rules fed to an internal EventBridge bus then passed to Guardrails; or SNS to SQS to the Guardrails ALB; or some
combination of those or none of those. The out-of-the-box Guardrails Event Handler solution is offered to simplify the
setup
process.

In some cases, customers have used the Guardrails  `AWS > Region > Stack` control to push out the required event
handling infrastructure. This allows consistency across all accounts and all regions. The policies `GCP > Region > Stack`
and `Azure > Subscription > Stack` can be used in a similar fashion to deploy event handler resources to GCP and Azure,
respectively.

While custom event handling is uncommon, Guardrails understands that some organizations have strict requirements that make
it necessary. [Turbot support](mailto:help@turbot.com) is available to answer high level questions as needed. 
