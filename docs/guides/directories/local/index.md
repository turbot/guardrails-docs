---
title: Local
sidebar_label: Local
---

# Guardrails Local Directories

By default, a **Guardrails Local Directory** exists with the user **Turbot Admin**.
This default user has `Turbot/Admin` and `Turbot/Owner` assigned. Guardrails
recommends that a [new user is created](guides/iam/user-mgt) at initialization
of a new workspace as well as deleting the default. Instructions for both
objectives can be found on our
[Guardrails Admin Best Practice](guides/iam/administrators) guide.

Local directories are considered the best "break glass" approach. Many
organizations will use an SSO solution, and in the event of an outage, it is
extremely important to have a way to access both Guardrails and AWS/Azure/GCP
accounts.

## Local Directory vs Turbot Directory

Local directories are specific to a workspace and have a local password and user
name. Turbot Directories, on the other hand, authenticate using profiles at
https://guardrails.turbot.com/users and will sync to the workspace being logged into.

## Create a Local Directory

1. Log into Guardrails with `Turbot/Owner` permissions at the root (Turbot) level.
2. At the main screen level, select the **Permissions** tab (designated with a
   user icon).
3. Click the **Directories** button.
4. Select **New Directory**, then **Local**.
5. Enter a **Title**, **description**, and a **Profile ID Template**. The
   template is used to generate the ID of the profile for users. This CANNOT be
   changed after directory creation. It is possible to set this ID to match the
   Profile ID Template in other directories - this will pool permissions to a
   single profile across multiple dierctories.
6. Click **Create**.
7. Congrats! The new Local directory can be activated for immediate use.

## Create a Turbot Directory

1. Log into Guardrails with `Turbot/Owner` permissions.
2. At the root (Turbot) level, select the **Permissions** tab (designated with a
   user icon).
3. Click the **Directories** button.
4. Select **New Directory**, then **Turbot**.
5. Enter a **Title**, **description**, and a **Profile ID Template**. The
   template is used to generate the ID of the profile for users. This CANNOT be
   changed after directory creation. It is possible to set this ID to match the
   Profile ID Template in other directories - this will pool permissions to a
   single profile across multiple directories.
6. Click **Create**.
7. Congrats! The new Turbot directory can be activated for immediate use.

After creation of a directory, users will need to log in using that directory
for profile creation to happen and to allow administrators to grant permissions.

### Additional Reading

- [Authentication Concepts](concepts/iam/authentication)
- [Permission Concepts](concepts/iam/permissions)
- [Assigning Permissions in Guardrails](guides/iam/permission-assignment)
