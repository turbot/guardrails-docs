---
title: Generating access keys in Guardrails
sidebar_label: Managing Access Keys 🛠
---

# API Access Keys in Guardrails

In order to interact with the Guardrails GraphQL API, users must first generate an API access key pair. Any user with access to the Guardrails UI can generate an access key. However, permissions within Guardrails can and will limit the actions permitted via the API.

## Generate a new Guardrails API Access Key

1. Log into Guardrails.
![Turbot login](/images/docs/guardrails/access-key-1.png)
2. Click on your user name (or avatar, if you have one) in the top right. It will take you to the **User Profile Overview** page.
![Turbot Profile](/images/docs/guardrails/access-key-2.png)
3. Click on the **Access Keys** tab, then the green button titled **Create Access Key**.
![Turbot Access Key](/images/docs/guardrails/access-key-3.png)
4. Copy the private key into a secure location, as this will be the first and last time it will be available. The key pair can be used to access the Guardrails API immediately.
![Turbot Access Key Window](/images/docs/guardrails/access-key-4.png)
![Turbot Access Key Profile Window](/images/docs/guardrails/access-key-5.png)

## Deactivate a Guardrails API Access Key

1. Log into Guardrails.
2. Click on your user name (or avatar, if you have one) in the top right. It will take you to the **User Profile Overview** page.
3. Click on the **Access Keys** tab, then the green button titled **Create Access Key**.
4. Find the access key that you would like to deactivate and click the gray down arrow to the right on the key's row.
5. Confirm the deactivation by clicking the **Deactivate** button.

**Note**: Access keys that are deactivated will not be able to authenticate to the Guardrails API. They can, however, be reactivated by clicking the gray up arrow.

## Delete a Guardrails API Access Key

**Note**: An access key must be deactivated prior to deletion. Deleting an access key is a destructive action. *They cannot be retrieved once they are deleted!*

1. Log into Guardrails.
2. Click on your user name (or avatar, if you have one) in the top right. It will take you to the **User Profile Overview** page.
3. Click on the **Access Keys** tab, then the green button titled **Create Access Key**.
4. Find the access key that you would like to delete and click the gray `X` icon on the far right.
5. Confirm the deletion by clicking the **Delete** button.
