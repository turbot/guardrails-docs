---
title: Encryption in Transit Guardrails
sidebar_label: Encryption in Transit
---

# Encryption in Transit Guardrails

## Overview

Most corporations already have standards around data encryption. These vary from
detailed rules that classify data by sensitivity and provide encryption
requirements for each, to more general guidelines like "encrypt everything!".
Guardrails provides a simple yet flexible platform for the implementation and
auditing of these standards, whatever they may be.

**Encryption in Transit** refers specifically to the encryption of data while
data moves between your site and the cloud provider or between two services.
This protection is achieved by encrypting the data before transmission;
authenticating the endpoints; and decrypting and verifying the data on arrival.
All the major cloud vendors provide options for encryption of the data that they
transfer on your behalf.

Guardrails generally solves these with below policy:

- `Encryption in Transit`: This policy allows you check or enforce the minimum
  or actual level of encryption required for the resource.

For service resources that support the encryption, Guardrails can enforce your
organization standard and change the encryption on the fly. These policies can
be found directly under the service in the hierarchy:

- `{Provider} > {Service} > {Resource} > Encryption in Transit`

<div className="example">
  <ul>
    <li><code>AWS > S3 > Bucket > Encryption in Transit</code></li>
    <li><code>AWS > Redshift > Cluster > Encryption in Transit</code></li>
    <li><code>Azure > Storage > Storage Account > Encryption in Transit</code></li>
    <li><code>Azure > PostgreSQL > Server > Encryption in Transit</code></li>
  </ul>
  </div>

The values for this policy are consistent across all resource types. The basic
form is:

```
    Skip
    Check: Disabled
    Check: Enabled
    Enforce: Disabled
    Enforce: Enabled
```

### Policy Values

Note that policies may not contain all of these possible values depending on the
implementation, and there may be other values specific to a service/resource.
Most `Check` policies have a matching `Enforce` policy.

| Value               | Description                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| `Skip`              | Skip                                                                                    |
| `Check: Disabled`   | Check that encryption is NOT enabled                                                    |
| `Check: Enabled`    | Check that encryption is enabled                                                        |
| `Enforce: Disabled` | Check that encryption is disabled. If not, then set it using the right parameter/policy |
| `Enforce: Enabled`  | Check that encryption is enabled. If not, then set it using the right parameter/policy  |

<div className="example">
    <pre>
    # AWS > S3 > Bucket > Encryption in Transit
    - Skip
    - Check: Disabled
    - Check: Enabled
    - Enforce: Disabled
    - Enforce: Enabled
    </pre>
</div>
