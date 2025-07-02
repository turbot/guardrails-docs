---
title: Notification Templates
sidebar_label: Templates
---

# Notification Templates

Templates control the format of notifications. Separate templates exist for each delivery channel (Email, Slack, Teams) and for each delivery type (single and batch).  The default templates for each channel integrate [Guardrails Quick Actions](guides/quick-actions) and serve as a great jumping off point for your own customization. 

**Slack Notification Example**

![Slack Notification](/images/docs/guardrails/slack_notification_example.png)

**Email Notification Example**

![Individual Email Notification](/images/docs/guardrails/email_notification_example.png)

**Batch Email Notification Example**

![Batch Email Notification](/images/docs/guardrails/batch_email_example.png)


The default templates can be overridden by setting the following policies:

```
Turbot > Notifications > Email > Action Template > Subject
Turbot > Notifications > Email > Action Template > Body
Turbot > Notifications > Email > Action Template > Batch Subject
Turbot > Notifications > Email > Action Template > Batch Body

Turbot > Notifications > Email > Control Template > Subject
Turbot > Notifications > Email > Control Template > Body
Turbot > Notifications > Email > Control Template > Batch Subject
Turbot > Notifications > Email > Control Template > Batch Body

Turbot > Notifications > Slack > Action Template > Body
Turbot > Notifications > Slack > Action Template > Batch Body

Turbot > Notifications > Slack > Control Template > Body
Turbot > Notifications > Slack > Control Template > Batch Body

Turbot > Notifications > Microsoft Teams > Action Template > Body
Turbot > Notifications > Microsoft Teams > Action Template > Batch Body

Turbot > Notifications > Microsoft Teams > Control Template > Body
Turbot > Notifications > Microsoft Teams > Control Template > Batch Body

Turbot > Notifications > Webhook > Action Template > Body
Turbot > Notifications > Webhook > Control Template > Body
```

## Template Definition

Template syntax should be familiar for anyone that has written a Guardrails calculated policy.  Each template consists of a [GraphQL](guides/graphql) query and a [Nunjucks](guides/nunjucks) template definition. Here is a simple example for the email subject template:

```nunjucks
{% input %}
query notificationDetails($filter: [String!], $resourceId: ID!) {
  workspaceUrl: policyValue(
    uri: "tmod:@turbot/turbot#/policy/types/workspaceUrl"
    resourceId: $resourceId
  ) {
    value
  }
  notifications(filter: $filter) {
    items {
      notificationType
      message
      resource {
        turbot {
          id
        }
        trunk {
          title
        }
      }
      turbot {
        createTimestamp
      }
    }
  }
}
{% endinput %}

{%- if domain %}
    {% set workspace = domain.split('/')[2].split('.')[0] %}
    [{{ workspace }}] {{ $.notifications.items.length }} actions by Turbot
{%- else %}
    {{ $.notifications.items.length }} actions by Turbot
{%- endif %}
```

The GraphQL query is contained between the `{% input %}` and `{% endinput %}` tags.  GraphQL is not case sensitive.

All content after `{% endinput %}` is the template. Keep in mind that Nunjucks flow logic (e.g. `{% if domain %}`) can generate newlines or whitespace. For template sections where extra newlines would be problematic (e.g. the email subject) make sure that you use whitespace control features of Nunjucks (i.e. `{%- if domain -%}`) does not generate newlines or excess whitespace, or keep all logic on a single line.

## Example Email Body Template

```nunjucks
{% input %}
query controlGet($id: ID!, $resourceId: ID!, $filter: [String!]) {
  workspaceUrl: policyValue(uri: "tmod:@turbot/turbot#/policy/types/workspaceUrl", resourceId:$resourceId){
      value
    }
  oldControl: control(id: $id) {
    actor {
      identity {
        picture
        turbot {
          title
          id
        }
      }
    }
    state
    reason
    details
    type {
      trunk {
        title
      }
    }
    turbot {
      createTimestamp
      updateTimestamp
      id
    }
    resource {
      turbot {
        id
      }
      trunk {
        title
      }
      type {
        title
      }
    }
  }
  quickActions: controlTypes(filter: $filter) {
    items {
      actionTypes{
        items{
          title
          icon
          description
          uri
          confirmationType
          defaultActionPermissionLevels
          turbot {
            id
          }
        }
      }
    }
  }
}

{% endinput %}

<!DOCTYPE html>
<html>
   <head>
      <meta charset="UTF-8">
      <title>Email Content</title>
   </head>
   <body>
      <p style="color: #999999; font-size: 10px; font-family: Arial, Helvetica, sans-serif; margin-bottom: 0;">RESOURCE</p>
      <p style="font-size: small; font-family: Arial, Helvetica, sans-serif; margin-top: 0;">
         <a style="color: #0000FF; text-decoration: none;" href="{{ domain }}/resources/{{$.oldControl.resource.turbot.id }}">{{ $.oldControl.resource.trunk.title | replace('>', '&gt;')}}</a>
      </p>
      <p style="color: #999999; font-size: 10px; font-family: Arial, Helvetica, sans-serif; margin-bottom: 0; margin-top: 20px;">CONTROL</p>
      <p style="font-size: small; font-family: Arial, Helvetica, sans-serif; margin-top: 0;">
         <a style="color: #0000FF; text-decoration: none;" href="{{ domain }}/controls/{{$.oldControl.turbot.id }}">{{ $.oldControl.type.trunk.title | replace('>', '&gt;')}}</a>
      </p>
      <p style="color: #999999; font-size: 10px; font-family: Arial, Helvetica, sans-serif; margin-bottom: 0; margin-top: 20px;">STATUS</p>
      <p style="font-size: small; font-family: Arial, Helvetica, sans-serif; margin-top: 0;">{% if $.oldControl.state == 'ok' %}OK{% elif $.oldControl.state == 'tbd'%}TBD{% else %}{{ $.oldControl.state | capitalize }}{% endif %}  → <span style="font-weight: bold; {% if newControl.state == 'alarm' or newControl.state == 'error' %}color: #CC0000;{% elif newControl.state == 'ok' %}color: #36a64f;{% else %}color: #d3d3d3;{% endif %}">{% if newControl.state == 'ok' %}OK{% elif newControl.state == 'tbd'%}TBD{% else %}{{ newControl.state | capitalize }}{% endif %}</span></p>
      <p style="color: #999999; font-size: 10px; font-family: Arial, Helvetica, sans-serif; margin-bottom: 0; margin-top: 20px;">REASON</p>
      <p style="font-size: small; font-family: Arial, Helvetica, sans-serif; margin-top: 0;">{{ newControl.reason }}</p>
      {%- if $.quickActions.items and $.quickActions.items[0].actionTypes and $.quickActions.items[0].actionTypes.items.length > 0 %}
      <p style="color: #999999; font-size: 10px; font-family: Arial, Helvetica, sans-serif; margin-bottom: 0; margin-top: 20px;">QUICK ACTIONS</p>
      <p style="font-size: small; font-family: Arial, Helvetica, sans-serif; margin-top: 0;">
        {% for item in $.quickActions.items[0].actionTypes.items -%}
         &rarr; <a style="color: #0000FF; text-decoration: none;" href="{{ domain }}/resources/{{ $.oldControl.resource.turbot.id }}?executeActionType={{ item.uri | replace('#', '%23')}}">{{ item.title }}</a><br>
        {% endfor -%}
      </p>
      {% endif -%}
      <p style="color: #999999; font-size: 10px; font-family: Arial, Helvetica, sans-serif; margin-bottom: 0; margin-top: 20px;">TIMESTAMP</p>
      <p  style="font-size: small; font-family: Arial, Helvetica, sans-serif; margin-top: 0;">{{ newControl.turbot.updateTimestamp }} UTC <a style="color: #0000FF; text-decoration: none;" href="{{ domain }}/processes/{{ process.id }}/logs?filter=logLevel%3A>%3Dinfo">[Log]</a></p>
      <div style="font-size: 11px; color: #848884; margin-top: 20px;">
         You have been subscribed to these email alerts by the system administrator of <a style="color: #0000FF; text-decoration: none;" href="{{ domain }}">{{ domain }}</a>. Please contact them directly for changes.
      </div>
   </body>
</html>
```

## Example Slack Template

```nunjucks
{% input %}
query controlGet($id: ID!, $resourceId: ID!, $filter: [String!]) {
  workspaceUrl: policyValue(
    uri: "tmod:@turbot/turbot#/policy/types/workspaceUrl"
    resourceId: $resourceId
  ) {
    value
  }
  oldControl: control(id: $id) {
    actor {
      identity {
        picture
        turbot {
          title
          id
        }
      }
    }
    state
    reason
    details
    type {
      trunk {
        title
      }
    }
    turbot {
      createTimestamp
      updateTimestamp
      id
    }
    resource {
      turbot {
        id
        title
      }
      trunk {
        title
      }
      type {
        title
      }
    }
  }
  quickActions: controlTypes(filter: $filter) {
    items {
      actionTypes{
        items{
          title
          icon
          description
          uri
          confirmationType
          defaultActionPermissionLevels
          turbot {
            id
          }
        }
      }
    }
  }
}

{% endinput %}

{
    "attachments": [
        {
            "color": "{% if newControl.state == 'alarm' or newControl.state == 'error' %}#cb1119{% elif newControl.state == 'ok' %}#36a64f{% else %}#d3d3d3{% endif %}",
            "author_name": "{{ $.oldControl.resource.trunk.title }}",
            "author_link": "{{ domain }}/resources/{{ $.oldControl.resources.turbot.id }}",
            "title": "{{ $.oldControl.type.trunk.title }}",
            "title_link": "{{ domain }}/controls/{{ $.oldControl.turbot.id }}",
            "mrkdwn_in": [
                "text",
                "footer"
            ],
            "text": "{% if $.oldControl.state == 'ok' %}OK{% elif $.oldControl.state == 'tbd'%}TBD{% else %}{{ $.oldControl.state | capitalize }}{% endif %} → *{% if newControl.state == 'ok' %}OK{% elif newControl.state == 'tbd'%}TBD{% else %}{{ newControl.state | capitalize }}{% endif %}*\n_{{ newControl.reason }}_\n{%- if domain %}{%- for item in $.quickActions.items[0].actionTypes.items %}⭢ <{{domain}}/resources/{{$.oldControl.resource.turbot.id}}?executeActionType={{ item.uri | replace('#', '%23')}}|{{ item.title }}>\n{%- endfor %}{%- endif %}"

        }
    ]
}
```

## Example MS Teams Template

```nunjucks
{% input %} 
query notificationDetails($filter: [String!], $resourceId: ID!) {
  workspaceUrl: policyValue(
    uri: "tmod:@turbot/turbot#/policy/types/workspaceUrl"
    resourceId: $resourceId
  ) {
    value
  }
  turbotId: resource(id: "tmod:@turbot/turbot#/") {
    turbot {
      id
    }
  }
  accountableResource: resource(id: $resourceId) {
    turbot {
      id
    }
    trunk {
      title
    }
  }
  notifications(filter: $filter) {
    items {
      notificationType
      message
      resource {
        turbot {
          id
        }
        trunk {
          title
        }
      }
    }
  }
}

{% endinput %} 

{ 
  "summary": "[{{ $.accountableResource.trunk.title | replace('>', '&gt;')}}]({{ domain }}/resources/{{$.accountableResource.turbot.id}})",
  "sections": [ 
    {%- for i in range(0, 3) -%} 
      {%- if $.notifications.items[i] %} 
        { 
          "activityTitle": "<a href='{{ domain }}/resources/{{$.notifications.items[i].resource.turbot.id }}' style='font-weight:bold; color:black'>{{ $.notifications.items[i].resource.trunk.title | replace('>', '&gt;')}}</a>",
          "activitySubtitle": "<span style='font-size: 14px'>_{{ $.notifications.items[i].message }}_</span>" 
        }
        {%- if $.notifications.items.length <= 3 and $.notifications.items.length - 1 > i %},{% endif %}
        {%- if $.notifications.items.length > 3 %},{% endif %} 
      {%- endif %}
    {%- endfor %}
    {%- if $.notifications.items.length > 3 %} 
      { 
        "activityTitle": "[View all {{ $.notifications.items.length }} notifications →]({{ domain }}/resources/{{$.accountableResource.turbot.id}}/activity?search=id:{{notificationIds}}&level=self%2Cdescendant)",
        "markdown": true } 
    {%- endif %} 
  ] 
}
```

## Example Custom Webhook Control Template

```nunjucks
{% input %}
query controlGet($id: ID!, $resourceId: ID!) {
  workspaceUrl: policyValue(
    uri: "tmod:@turbot/turbot#/policy/types/workspaceUrl"
    resourceId: $resourceId
  ) {
    value
  }
  oldControl: control(id: $id) {
    actor {
      identity {
        picture
        turbot {
          title
          id
        }
      }
    }
    state
    reason
    details
    type {
      trunk {
        title
      }
    }
    turbot {
      createTimestamp
      updateTimestamp
      id
    }
    resource {
     metadata
      turbot {
        id
        title
      }
      trunk {
        title
      }
      type {
        title
      }
    }
  }
}

{% endinput %}

{{ $ | dump }}
```

## Example Custom Webhook Action Template

```nunjucks
{% input %}
query controlGet($id: ID!, $resourceId: ID!, $notificationId: ID!) {
  workspaceUrl: policyValue(
    uri: "tmod:@turbot/turbot#/policy/types/workspaceUrl"
    resourceId: $resourceId
  ) {
    value
  }
  notification(id: $notificationId) {
    message
    resource {
      metadata
      turbot{
        id
      }
      trunk {
        title
      }
    }
  }
  control(id: $id) {
    turbot{
      id
    }
    type {
      trunk {
        title
      }
    }
  }
}

{% endinput %}


{{ $ | dump }}
```