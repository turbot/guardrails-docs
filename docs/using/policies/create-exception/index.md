---
title: Create an Exception
sidebar_label: Create an Exception 🛠
---

# Create an Exception

The Guardrails [Resource Hierarchy](concepts/policies/hierarchy) allows you to
define a policy setting in a single place and have it enforced on all descendant
resources. However, there are occasions when the policy setting should not (or
cannot) be enforced on specific resources. **Exceptions** allow you to override
a required setting on a resource lower in the policy hierarchy.

<div class = "alert alert-warning">
To create an exception, you must have Turbot/Admin permission on the resource where the required setting is defined.
</div>

Exceptions can be created in the Guardrails Console from the **Policy Setting
Hierarchy** page:

1.  From the home page, search the resource for which you wish to create an
    exception. Click on the **Resource**. Resource details page displayed.
    ![](/images/docs/guardrails/using/policies/create-exception/exception-1.png)
2.  Click **Policies** tab for the resource (under the resource name, not at the
    top of the window). Note that this page is filtered to show only the
    policies at the resource level. ![](/images/docs/guardrails/using/policies/create-exception/exception-2.png)
3.  Search and click on the policy setting to open the **Policy Value** page.
    ![](/images/docs/guardrails/using/policies/create-exception/exception-3.png)
    ![](/images/docs/guardrails/using/policies/create-exception/exception-4.png)

        Notice that the detail page for a policy value shows the current value as well as where the value is inherited from (if it is inherited).

4.  From the policy value page, click the **Create Setting** link.
5.  Enter the information in the **Create Policy Setting** page, and click
    **Create**. This creates the policy setting on the resource.
6.  The policy type will automatically fill, but be sure to verify that it is as
    expected and that the resource in the resource field is correct.
7.  Once verified, select the correct setting (or input the value if required)
    and click **Create**! Once created, you will see a page showing both the
    `Required` setting as well as the new `Exception`.
    ![](/images/docs/guardrails/using/policies/create-exception/exception-5.png)
