---
title: Encryption at Rest Guardrails
sidebar_label: Encryption at Rest
---


# Encryption at Rest Guardrails

## Overview

Most corporations already have standards around data encryption. These vary from
detailed rules that classify data by sensitivity and provide encryption
requirements for each, to more general guidelines like "encrypt everything!".
Guardrails provides a simple yet flexible platform for the implementation and
auditing of these standards, whatever they may be.

**Encryption at Rest** refers specifically to the encryption of data when
written to an underlying storage system. All the major cloud vendors provide
options for encryption of the data that they store on your behalf. Often, the
details vary by service; within a given cloud provider, the encryption options
may be different for their object storage, relational databases, no-sql
databases, file servers, etc. While the details may differ, the type of options
are generally the same:

- Encryption Level: is it enabled? Is it the correct algorithm/type?
- Key Management: what key should be used?

Guardrails generally solves these with 2 policies:

- `Encryption at Rest`: This policy allows you check or enforce the minimum or
  actual level of encryption required for the service. The option values are
  ordered from least secure to most secure. Note that in these policies, Guardrails
  considers a customer managed key more secure than a default key managed by the
  vendor.
- `Encryption At Rest > Customer Managed Key`: This allows you to specify the
  key to be used for encryption (assuming you have set the "Encryption at Rest")
  policy to use a customer managed key.

For services that support changing the encryption level and/or key, Guardrails can
enforce your standard and change the encryption on the fly. These policies can
be found directly under the service in the hierarchy:

- `{Provider} > {Service} > {Resource} > Encryption at Rest`
- `{Provider} > {Service} > {Resource} > Encryption at Rest > Customer Managed Key`

<div className="example">
  <ul>
    <li><code>AWS > S3 > Bucket > Encryption at Rest </code></li>
    <li><code>AWS > S3 > Bucket > Encryption at Rest > Customer Managed Key</code></li>
    <li><code>GCP > Storage > Bucket > Encryption at Rest </code></li>
    <li><code>GCP > Storage > Bucket > Encryption at Rest > Customer Managed Key</code></li>
  </ul>
  </div>

Some services only allow you to set the encryption options when the resource is
created. While you may not be able to change the encryption level on the fly in
this case, you may want to take some other action such as stopping, detaching,
or deleting the resource. Guardrails provides these capabilities in the "Approved"
policies:

- `{Provider} > {Service} > {Resource} > Approved > Encryption at Rest`
- `{Provider} > {Service} > {Resource} > Approved > Encryption at Rest > Customer Managed Key`

<div className="example">
  <ul>
    <li><code>AWS > EC2 > Volume > Approved > Encryption at Rest</code></li>
    <li><code>AWS > EC2 > Volume > Approved > Encryption at Rest > Customer Managed Key</code></li>
    <li><code>GCP > BigQuery > Table > Approved > Encryption at Rest</code></li>
    <li><code>GCP > BigQuery > Table > Approved > Encryption at Rest > Customer Managed Key</code></li>
  </ul>
  </div>

## General Guidelines

Most Encryption At Rest policies have options for using a custom key. This will
be defined in a sub policy `Encryption At Rest > Customer Managed Key`

### Values

Encryption at Rest value names are consistent where possible, though all of the
implementations support different values:

- The term `{provider) Managed Key` refers to encryption using default keys
  (Microsoft managed keys, AWS managed keys)
- The term `Customer Managed Key` refers to non-default keys (customer keys in
  KMS or KeyVault)
- When using an policy specifies “or higher”, the values list will appear in
  order from least secure to most secure

Note that policies may not contain all of these possible values depending on the
implementation, and there may be other values specific to a service/resource .
Most `Check` policies have a matching `Enforce` policy. A notable exception is
that we don't use `Enforce: None or higher` as it would never take an action.

| Value                                                | Description                                                                                                                                                |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Skip`                                               | Skip                                                                                                                                                       |
| `Check: None`                                        | Check that encryption is NOT enabled                                                                                                                       |
| `Check: None or higher`                              | will always pass, but notes that we have explicitly checked it, not just skipped                                                                           |
| `Check: {Provider} managed key`                      | Check that encryption is enabled and set to use the providers default key (Microsoft key, aws/ebs service key, etc)                                        |
| `Check: {Provider} managed key or higher`            | Check that encryption is enabled with either a default key or a custom key (which Guardrails considers more secure)                                            |
| `Check: Customer managed key`                        | Check that encryption is enabled using **any** customer managed key (A custom KMS/KeyVault key, not a Microsoft/AWS/google default key)                     |
| `Check: Encryption at Rest > Customer Managed Key`   | Check that encryption is enabled using the customer managed key that is defined in the sub-policy for this resource                                        |
| `Enforce: None`                                      | Disable encryption at rest                                                                                                                                 |
| `Enforce: {Provider} managed key`                    | **Always** set the the encryption to the provider managed key.                                                                                             |
| `Enforce: {Provider} managed key or higher`          | Set the the encryption to the provider managed key unless it is already set using a customer managed key, which Guardrails considers a higher encryption level |
| `Enforce: Customer managed key`                      | Check that encryption is enabled using **ANY** customer managed key. If not, then set it using the key defined in the sub-policy for this resource.        |
| `Enforce: Encryption at Rest > Customer Managed Key` | Set the encryption to use the key defined in the sub-policy for this resource, regardless of the current setting.                                          |

<div className="example">
    <pre>
    # AWS > S3 > Bucket > Encryption at Rest
    - Skip
    - "Check: None"
    - "Check: None or higher"
    - "Check: AWS SSE"
    - "Check: AWS SSE or higher"
    - "Check: AWS managed key"
    - "Check: AWS managed key or higher"
    - "Check: Customer managed key"
    - "Check: Encryption at Rest > Customer Managed Key"
    - "Enforce: None"
    - "Enforce: None or higher"
    - "Enforce: AWS SSE"
    - "Enforce: AWS SSE or higher"
    - "Enforce: AWS managed key"
    - "Enforce: AWS managed key or higher"
    - "Enforce: Customer managed key"
    - "Enforce: Encryption at Rest > Customer Managed Key"
    </pre>
</div>
