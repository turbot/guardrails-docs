---
title: Guardrails Admin Best Practice
sidebar_label: Guardrails Admin Best Practice
---

# Guardrails Admin Best Practice

As a part of workspace creation, Guardrails will provision a local administrator. Guardrails recommends that at minimum the password to this user is changed. It is also recommended that at least one "break glass" administrator is created in the Guardrails local directory in case of issues with a directory connected to a 3rd party authentication method (such SAML).

## Changing admin@turbot.io User Password

Guardrails highly recommends changing the admin@turbot.io user password as soon as possible.

1. Log into the Guardrails application.
2. Click the **Permissions** tab.
3. Click the **DIRECTORIES** card, then select **Turbot Local**.
4. Click the **Users** tab.
5. There should be one user named **Turbot Admin**. On the right side, click the key icon to reset the password. This will display the new password once. Copy this somewhere safe. These steps can be repeated to reset the password if issues arise in the future.

## The "Break glass" user

Some organizations will require "default" user accounts to be deleted immediately. In this case, Guardrails recommends creating a new, local administrator in case of authentication failures.

1. Log into the Guardrails application.
2. Click the **Permissions** tab.
3. Click the **DIRECTORIES** card, then select **Turbot Local**.
4. Select the **New User** button.
5. Fill out the email, given name, family name, and display name text fields. Users will log in with the "break glass" user using the email.
6. Click **Create**. The password will be displayed on the next window. Save and share this with any team member who might need guaranteed access.

### Granting permission to "Break glass" user

1. Log into Guardrails application as the "Break glass" user using an incognito window. It will create an user profile under **Turbot Local** directory.
2. Log into the Guardrails application as "admin@turbot.io" user (or any other user profile with `Turbot/Owner` permissions) in a different browser.
3. Using the admin profile, click the **Permissions** tab. Click **Grant Permission** button on the right side of the page.
4. Keep `Resource Scope` as "Turbot", search `Identities` for the "Break glass" user, and select `Permission` as "Turbot/Owner". Click **Grant**.
5. Log in with the "break glass" user to verify permissions.

## Deleting admin@turbot.io user

This delete operation must be done from a different user other than the Guardrails Admin. Ensure that the password for a local user administrator is safe and correct before deleting the original Guardrails Admin.

1. Log into Guardrails with a user that has `Turbot/Owner` permissions.
2. Click the **Permissions** tab.
3. Click the **DIRECTORIES** card, then select **Turbot Local**.
4. Click the **Users** tab.
5. Find the **Turbot Admin** listed. On the right side of the window, click the icon with the downward facing arrow. select **Deactivate**.
6. Either refresh the page or wait a few seconds for the user to be displayed as inactive. Select the icon with the **X** to initiate the delete.
7. Hover the mouse over the username in the gray text field and click the icon to copy the text, then paste in the text field. Click **Delete** to confirm.

## Setting password expiration for local admins to `Never`

A policy can be set in Guardrails to prevent a password rotation on the break glass user, be it the Guardrails created administrator user or a custom break glass user. The default value is 8760 hours, or 365 days. This is the [CIS recommendation](https://www.cisecurity.org/white-papers/cis-password-policy-guide/). The default is also the maximum value, but `-1` can be used to never expire passwords and the value of `0` to expire all local user passwords.

1. Log into Guardrails with `Turbot/Admin` permissions.
2. Select the **Policies** tab.
3. Click the **New Policy Setting** button.
4. In the **Policy Type** drop down menu, navigate to the password expiration policy by clicking **Turbot** -> **IAM** -> **Local Directory** -> **User** -> **Password expiration period in hours**. It is also possible to paste the string `Password expiration period in hours` into the field and select the policy that is displayed.
5. The policy can be applied at the Turbot level (all users will inherit this policy setting) or at the individual user level. In the **Resource** drop down menu, select which resource to apply the policy to.
6. Enter a value, in hours, for how long the password should live. As a general guideline, 8760 hours is equivalent to one year.
7. Click the **Create** button. The policy will take effect immediately.

## Changing the minimum password length

Guardrails allows administrators to set a custom minimum password length for local directory users.

1. Log into Guardrails with `Turbot/Admin` permissions.
2. Select the **Policies** tab.
3. Click the **New Policy Setting** button.
4. In the **Policy Type** drop down menu, navigate to the password expiration policy by clicking **Turbot** -> **IAM** -> **Local Directory** -> **User** -> **Password Minimum Length**. It is also possible to paste the string `Password Minimum Length` into the field and select the policy that is displayed.
5. The policy can be applied at the Turbot level (all users will inherit this policy setting) or at the individual user level. In the **Resource** drop down menu, select which resource to apply the policy to.
6. Enter the desired value. Default value is `14` characters.
7. Click **Create**. User passwords reset after the policy is applied will generate passwords with the desired length.

## Setting Guardrails API Keys to expire

By default, Guardrails API keys do not expire. Passwords for users in the Guardrails Local directory expire by default at 365 days. Usually, the API keys for the break glass described above are method of last resort to get back into a workspace in the event of an emergency.  The [Password Reset](https://github.com/turbot/guardrails-tools/tree/master/api_examples/graphql/queries/password_reset) queries in the Guardrails Samples Repo require API keys. These instructions describe a method for expiring all Guardrails API keys except the break glass user(s).  A benefit of this approach is that it makes it easy to apply to one directory but not others.

1. Use the "Aging Turbot Access Keys" report to get an idea of which keys this policy will deactivate.  API keys in this report show all keys over 90 days of age, regardless of "Active" or "Inactive" status.
2. In the Terraform below, adjust the regex to match the break glass user(s). Make additional changes to the calc policy as required.
3. Execute the Terraform to create the policy pack and policies.
4. Attach to required directories in the workspace:
   1. Terraform option: Use [policypacks_attachments](https://registry.terraform.io/providers/turbot/turbot/latest/docs/resources/policy_pack_attachment) to attach the policy pack to the required directories.
   2. Manual Option: In the Turbot console, attach the policy pack to each required directories.
```terraform
resource "turbot_policy_pack" "breakglass_user_exceptions" {
  parent      = "tmod:@turbot/turbot#/"
  title       = "Breakglass User Exceptions"
  description = "A set of policies to make sure that breakglass users stay viable. Directions: Attach this policy pack to each directory that holds breakglass users. "
}
resource "turbot_policy_setting" "turbot_iam_access_key_expiration" {
  resource       = turbot_policy_pack.breakglass_user_exceptions.id
  type           = "tmod:@turbot/turbot-iam#/policy/types/accessKeyExpiration"
  template_input = <<EOT
{
  key:resource
  {
    user: parent{
        email: get(path:"email")
      }
	}
}
EOT
  template       = <<EOT
{% set breakGlass = r/break_glass@customer.com/g %}
{% if breakGlass.test($.key.user.email) %}
'Skip'
{% else -%}
'Enforce: Deactivate expired with 7 day warning'
{%- endif %}
EOT
  note           = <<EOT
You must specify the regex for the breakglass users emails. This policy is a guard to ensure that only the Breakglass user's API keys never expire, while everyone else's does.
EOT
}
resource "turbot_policy_setting" "turbot_iam_access_key_expiration_period" {
  resource = turbot_policy_pack.breakglass_user_exceptions.id
  type     = "tmod:@turbot/turbot-iam#/policy/types/accessKeyExpirationDays"
  value    = "90"
}
```
