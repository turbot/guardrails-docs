---
title: Google
sidebar_label: Google
---

# Google SSO

Organizations using Google Cloud Platform (GCP) can use Google as an identity provider (IdP) for authentication into Guardrails.

## Google OAuth 2.0 Client ID Initialization

1. Log into the GCP Project that will be managing the OAuth client, https://console.cloud.google.com/.
2. Select the menu button in the top left, then **API & Services**, then **Credentials**.
3. Select the **Create Credentials** button at the top of the window, then **Create OAuth client ID**.
4. For the **Application Type**, select **Web Application**.
5. Enter a name for the application. An example is **Turbot OAuth**.
6. Leave the rest of the options default and select **Create**. Once the client ID has been created, select it in the list.

## Guardrails Google Directory Initialization

1. Log into Guardrails using a profile with `Turbot/Owner` access.
1. At the root level, click the **Workspace** tab on the top right hand corner.
1. Select the **Permissions** tab (designated with a user icon), then click **Directories**.
1. Click the **New Directory** button and finally the **Google** option.
1. Enter a name for the directory and a description if desired.
1. Enter the **Hosted Domain**. Guardrails will restrict login for this directory to this specific domain name only.
1. Define the **Profile ID Template**. This profile ID MUST be unique, but it is possible to have multiple directories map users to the same ID. The value cannot be changed unless the directory is **New**.

## Input Google Information into Guardrails

1. Navigate back to the Client ID created in the **Google OAuth 2.0 Client ID Initialization** section.
2. On the right side, copy the **Client ID**. Input this value into the **Client ID** text field in the Guardrails Google Directory.
3. Back in GCP, copy the **Client secret** (directly below the Client ID) and paste this into the **Client Secret** field in Guardrails.
4. Verify all values are correct in Guardrails then click **Create**. The directory is now created with a status of **New**. It is currently not activated.

## Finish Directory Setup in Google

1. After creating the directory in Guardrails, click the **Pencil** icon to open the directory settings.
2. Copy the **Callback URL** found at the bottom of the directory settings.
3. Navigate back to the Client ID for Web Application in GCP.
4. Under the **Authorized JavaScript origins** section, click **Add URI**. Enter in the HTTPS URL for the Guardrails console - i.e. `https://test-environment.dev.turbot.com`.
5. Select the **Add URI** under the **Authorized redirect URIs** section, and paste the callback URL that was copied in step 2.
6. Click **Save** for the Google OAuth 2.0 Client ID, as well as closing the directory settings in Guardrails.

## Activate the Directory

1. At the Directory screen in Guardrails, click the **Up** arrow in line with the new Google directory. This will activate the directory for use.
2. Verify the new directory works by attempting to log in with a new window.
3. Unless the Profile ID template pools users into existing profiles, users who log in with the new Google directory will have a new profile created. Administrators need to assign permissions after profile creation.
4. Congratulations! Users can now log into Guardrails using their Google profiles.
