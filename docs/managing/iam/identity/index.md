---
title: Identity
sidebar_label: Identity
---

# Identity in Guardrails

Guardrails attempts to map event to specific entities to facilitate analysis and correlation of notifications and events. Every Guardrails event contains an Actor object with this identifying information.

An Identity represents an actor known to Guardrails. An Identity can be:

 - A Guardrails Profile - A user that can log in to Guardrails.
 - A cloud resource like an AWS Account (for Root activities) or EC2 Instance.
 - Turbot - A special Guardrails Identity represents Turbot.
 - If Guardrails cannot map the request to a known resource, it is Unidentified.

A **Persona** is a physical representation of an identity id in a given scope. A single identity may have multiple personas. For example. John (Identity) has an user accounts (personas) in AWS, Azure and Google. Examples of personas include:

  - AWS User Account
  - AWS Role
  - GCP User

Guardrails attempts to map both Identities and Personas to resources in the CMDB, however not all security principles may be present in the Guardrails CMDB. Guardrails uses the **Alternate Persona** as a way to help provide context for such instances. The **alternate persona** for an event is NOT mapped to a Guardrails entity, but is a string representation to identify the actor in the native format provided in the event.

**Note**:
Guardrails maps the actor information at the time that it receives the event. If we cannot map the identity and persona at the time the event is received, they will be unidentified in the event. The events are never updated with actor information. Note that something is always written to the alternate persona, so some minimal set of identifying information is always contained in the event. For example:

  - Guardrails receives a Bucket created event for bucket1, and the user was `john@mycompany.com`
  - Assume that there is no profile for `john@mycompany.com`, so the identity is Unidentified, and the alternate persona is set to `john@mycompany.com`
  - An admin creates a Guardrails profile for `john@mycompany.com`
  - Any new events from `john@mycompany.com` will map his profile as the identity, however the bucket created event for bucket1 will NOT be updated with his identity.

Guardrails identity mapping is a powerful mechanism for providing user context and correlating user activity throughout the infrastructure stack. In order to simplify the setup and operation, Guardrails must make certain (usually safe) assumptions about the identifying information in the provider's events. While Guardrails provides enhanced visibility into user activity, your cloud provider's audit trail should be considered the data of record.

## AWS Identities
AWS identities are determined from the `userIdentity` element in CloudTrail.

### userIdentity Schema
   - `userIdentity` schemas varies by type
   - `IAMUser` and `AssumedRole` are the most common types

### Types


| Type | Description
|-|-
| **Root** | The request is made with your AWS account credentials. If the `userIdentity` type is Root and you set an `alias` for your account, the *userName* field contains your account alias.
| **IAMUser** | The request is made with the credentials of an IAM user.
| **AssumedRole**| The request is made with security credentials that were obtained with a role via a call to the AWS Security Token Service (AWS STS) AssumeRole API.
| **FederatedUser**| The request is made with security credentials that were obtained via a call to the AWS STS GetFederationToken API. The `sessionIssuer` element indicates if the API was called with root or IAM user credentials.
| **AWSAccount** | The request is made by another AWS account. (Another AWS account switches to that role to assume the role for your account).
| **AWSService** | The request is made by an AWS account that belongs to an AWS service. (An AWS account owned by an AWS service assumes a role in your account. For example, AWS Elastic Beanstalk assumes an IAM role in your account to call other AWS services on your behalf).

*AWSAccount* and *AWSService* appear for type in your logs when there is cross-account access using an IAM role that you own. The AssumeRole call is of *AWSAccount* or *AWSService* type, but subsequent calls from that role seem to be AssumeRole type.

## Examples userIdentity schemas

### userIdentity with IAM user credentials (User)

```json
"userIdentity": {
  "type": "IAMUser",
  "principalId": "AIDAJ45Q7YFFAREXAMPLE",
  "arn": "arn:aws:iam::123456789012:user/Alice",
  "accountId": "123456789012",
  "accessKeyId": "AKIAIOSFODNN7EXAMPLE",
  "userName": "Alice"
}
```
### userIdentity with temporary security credentials (assume role)

```json
"userIdentity": {
    "type": "AssumedRole",
    "principalId": "AROAIDPPEZS35WEXAMPLE:AssumedRoleSessionName",
    "arn": "arn:aws:sts::123456789012:assumed-role/RoleToBeAssumed/MySessionName",
    "accountId": "123456789012",
    "accessKeyId": "AKIAIOSFODNN7EXAMPLE",
    "sessionContext": {
      "attributes": {
        "mfaAuthenticated": "false",
        "creationDate": "20131102T010628Z"
      },
      "sessionIssuer": {
        "type": "Role",
        "principalId": "AROAIDPPEZS35WEXAMPLE",
        "arn": "arn:aws:iam::123456789012:role/RoleToBeAssumed",
        "accountId": "123456789012",
        "userName": "RoleToBeAssumed"
      }
    }
}
```
## Mapping AWS Identities in Guardrails


| Type | Identity | Persona | AltPersona
|-|-|-|-
| **Root**|	An AWS Account resource via `arn` | undefined | `arn`
| **FederatedUser** | reverse lookup of `sessionContext.sessionIssuer.userName` in Login user names policy | Resources with aka `sessionContext.sessionIssuer.arn` | `sessionContext.sessionIssuer.userName`
| **AWSAccount** | An AWS Account resource via `accountId` | Any resource with aka `roleArn` | `recipientAccountId`
| **AWSService**| none | none | `invokedBy`
| **IAMUser**| reverse lookup of `userName` in login user names policy to a Guardrails Profile | (AWS User) resource via resource with aka matching `arn` | `userName`
| **AssumedRole**| Set to Turbot if `sessionIssuer.arn` is the Guardrails service role. If it has a token in the arn, get the identity (Guardrails Profile) from it. Else it is `unidentified` | any resource with aka matching `arn` | first 2 fields after the first slash in the `arn`

**Note**:
 - IAM Users are mapped via a reverse lookup of the username to the `AWS > IAM > Login User Names` policy to find a matching profile.
 - Guardrails roles (AWS/Superuser, AWS/Admin, AWS/S3/Operator, etc) contain an encoded token in the session name that contains the id of the Guardrails Profile that is logged in.
    - These tokens are encrypted with a secret
    - The tokens are valid for 1 hour

 - Non-Guardrails roles are mapped via a reverse lookup of the role session id to the `AWS > IAM > Login User Names` policy to find a matching profile, similar to user names
    - This is not completely secure because we don't know for sure who assumed the role - anyone that can assume the role can set the role session name.


