---
title: LDAP and LDAPS
sidebar_label: LDAP and LDAPS
---

# LDAP and LDAPS Directories

On premise Active Directories utilizing LDAP or LDAPS are a common feature in large organizations. Guardrails supports the use of LDAP and LDAPS to sync groups to Guardrails profiles. Note that LDAP and LDAPS **CANNOT** be used as an authentication method - it is to map Active Directory groups to Guardrails profiles.

## Prerequisites

This guide will assume that a Windows Server Domain Controller with AD named `example-controller` for a domain named `internal.company.com`. Be sure to use the real values when setting up the directory.

We will also assume that:

* A group named `TURBOTADMINGROUP` exists.
* A group named `TURBOTUSERGROUP` exists.
* A user named `TURBOTADMIN` exists, has a password `secret`, and belongs to the `TURBOTADMINGROUP` group.
* A user named `TURBOTUSER` exists, has password `secret`, and does NOT belong to the `TURBOTADMINGROUP` group, but does belong to the `TURBOTUSERGROUP` group.

## Configure the LDAP/LDAPS directory

1. Log into the Guardrails console with `Turbot/Owner` permissions at the root (Turbot) level.
2. Click the **Permissions** tab (designated with a user icon).
3. Click the **Directories** button next to the search bar, then click **New Directory**, then **LDAP**.
4. Enter a title to easily identify the directory, such as `Turbot Guardrails AD`.
5. If desired, enter a description for the directory.
6. Enter the LDAP or LDAPS URL into the **URL** field. For this example, it would be `ldap://example-controller.internal.company.com/DC=internal,DC=company,DC=com`.
* NOTE! If your organization uses LDAPS, use the following URL - `ldap://example-controller.internal.company.com:636/DC=internal,DC=company,DC=com.
7. Set the **Distinguished Name** to `CN=TURBOTADMIN,OU=TURBOTADMINGROUP,DC=internal,DC=company,DC=com`. This user, `TURBOTADMIN`, must have read access to all users.
8. Enter the password `secret`.
9. The **BASE** section is the LDAP base for all Guardrails user queries. For our example, enter `CN=TURBOTUSERGROUP,DC=internal,DC=company,DC=com`.
10. The **Profile ID Template** is used to generate the ID of the profile for users authenticated via this directory. The value must be unique for each profile in Guardrails. The default `{{profile.$source.mail}}` generally will produce unique profile IDs. 
11. The **Group Profile ID Template**, similar to the above user profile template, generates the URN of the profile for groups retrieved via this directory. The profile MUST be unique for each group profile in Guardrails. The default `{{groupProfile.#source.cn}}` will often be sufficient.

The above steps are necessary to connect via LDAP/ LDAPS, but often organizations have custom configurations beyond what has already been done.

### TLS Settings

If the organization uses TLS, configure that in this section.

* **Enforce TLS** - Can be set to `Enabled` or `Disabled`.
* **Require Trusted Certificate** - Can be set to `Enabled` or `Disabled`.
* **CA Certificate** - If a certificate is required, paste in the TLS CA cert here.

### User Filters

* **User Object Filter** - All searches and matches for user objects must match this filter. 

    An Active Directory example is `"(&(objectCategory=person)(objectClass=user))"`, while a simpler LDAP directory example would be `"(objectClass=person)"`. This is used in combination with the match and search filters.

* **Disabled User Filter** - The Disabled User Filter is used to exclude disabled users when searching in LDAP.

    The LDAP filter is an AND combination of the User Object Filter and NOT the Disabled User Filter, specifically `(&{userObjectFilter}!{disabledUserFilter}`. Do not include the NOT operator in this field. It is included in the code when building the complete search filter. A typical value for this field is:
    
    `"userAccountControl:1.2.840.113556.1.4.803:=2"`
    
    This results in a filter of:
    
    `"(&(&(objectCategory=person)(objectClass=user))(!userAccountControl:1.2.840.113556.1.4.803:=2))"`
    
    Note, if you are testing manually, the tool you are using may need different formatting of the filter, for example for ldapsearch it would be:
    
    `"(&(&(objectCategory=person)(objectClass=user))(!(userAccountControl:1.2.840.113556.1.4.803:=2)))"`

* **User Match Filter** - The User Match Filter is used when searching for a specific single user match in LDAP (e.g. login credentials).
        
    The string `{{username}}` in this filter will be automatically replaced by the search query string. The LDAP filter is an `AND` combination of the User Object Filter and the User Match Filter, specifically `(&{userObjectFilter}{userMatchFilter})`. The User Search Filter must have surrounding parantheses. If empty (the default), Guardrails will automatically construct a filter to search common fields based on their option definitions.

* **User Search Filter** - The User Search Filter is used for general user searches in LDAP.

    The string `{{username}}` in this filter will be automatically replaced by the search query string. The LDAP filter is an `AND` combination of the User Object Filter and the User Search Filter, specifically `(&{userObjectFilter}{userSearchFilter})`. The User Search Filter must have surrounding parentheses. If empty (the default), Guardrails will automatically construct a filter to search common fields based on their option definitions. To ensure good performance, please be careful to only use indexed fields.

* **User Search Attributes** - The User Search Attributes are used to define the attributes that will be requested from the LDAP server. 

    If the value of any search attribute is `*`, we will not request any specific attributes, meaning all available attributes will be returned. This is the default setting. Display name and SAM Account Name will always be returned.

### Group Filters

* **Group Object Filter** - All searches and matches for group objects must match this filter.

    An Active Directory / LDAP example is `"(objectCategory=group)"`. This is to be used in combination with the match and search filters.

* **Disabled Group Filter** - The Disabled Group Filter is used to exclude disabled groups when searching in LDAP.

    The LDAP filter is an `AND` combination of the Group Object Filter and `NOT` the Disabled Group Filter, specifically (&{groupObjectFilter}!{disabledGroupFilter}). Do not include the NOT operator in this field. This defaults to (description=disabled) where the description of the group object is matched to the string ‘disabled’ to indicate that it has been deactivated. This can be changed to track any other existing attribute of the group object to indicate whether it is disabled or not.

* **Group Search Filter** - The Group Search Filter is used for general group searches in LDAP.

    The string `{{groupname}}` in this filter will be automatically replaced by the search query string. The LDAP filter is an `AND` combination of the Group Object Filter and the Group Search Filter, specifically `(&{groupObjectFilter}{groupSearchFilter})`. The Group Search Filter must have surrounding parentheses. If empty (the default), Guardrails will automatically construct a filter to search common fields based on their option definitions. To ensure good performance, please be careful to only use indexed fields.

* **Group Sync Filter** - The Group Sync Filter is used to filter the list of groups that will be sync'd in to Guardrails that a user is a member of.

    If not specified, all groups that a user is a member of (within the Groups Base DN) will sync into Guardrails. An Active Directory / LDAP example is `"(ou:dn:=DEV)"`.

### Attribute Map

The **Attribute Map** section allows AD administrators to define values such as the **User Email Attribute**, **User Family Name Attribute**, and **Group Membership Attribute**.

## Create, Test, and Active the Directory

After all the settings have been verified, click **Create**.

Guardrails includes a control called **Turbot > IAM > LDAP Directory > Connectivity Test**. This control will run immediately following creation of the directory to test the connection between Guardrails and the AD server. Verify that this control goes into the `OK` state prior to activating the directory. If this control does not go into the `OK` state, verify all settings are correct, along with any relevant networking resources.

Once the connectivity test clears, click the **Activate Directory** button on the directory page to enable the directory for group sync.
