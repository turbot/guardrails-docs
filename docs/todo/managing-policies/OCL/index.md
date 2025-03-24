---
title: OCL Examples
sidebar_label: OCL Examples
---

# Object Constraint Language

Object Constraint Language (OCL) grants immense flexibility within Guardrails. While
complex, there are some key points that can help aid in implementation.

OCL is commonly used to define security group ingress and egress rules. In
general, the pseudo-code for security group rule policy evaluation looks
something like this:

```ocl
For all security group rules
   for all OCL rules
      evaluate OCL against security group rule.
      note the result
Combine results from all rule evaluations
   Take actions based on policy and APPROVE/REJECT status.
```

OCL is very useful for restricting permissions in policies such as IAM or a KMS
Key policy.

OCL incorporates implicit logic. Items separated by a space is implicitly `AND`,
while commas indicate `OR`. It must be noted that commas are only available in
each condition and cannot be used to join rules. Let's take a look at some
examples.

## Policy Examples Using Object Constraint Language (OCL)

Guardrails allows the use of OCL formatting for a variety of policies. Syntax is
consistent across all policy types that accept OCL as an input. For more in
depth information regarding how OCL rules work, check out our
[OCL reference page](reference/ocl)

Below are example policy settings using OCL:

### Example 1: AWS > VPC > Security Group > Egress Rules > Approved > Rules (CIDR REJECT)

Starting simple, we can reject the CIDR 0.0.0.0/0. `::/0` is the IPv6 version of
IPv4's zero block, and Guardrails policies allow us to also reject IPv6 addresses.
Note how the comma is used to implicitly say if either `0.0.0.0/0` or `::/0`
exists in the rules, it will alarm/ remediate.

```ocl
### Reject the default route, always
REJECT $.turbot.cidr:0.0.0.0/0,"::/0"

### Approve everything else
APPROVE *
```

In this next example, not only are we restricting the `0.0.0.0/0` CIDR block,
but also any block that IS NOT `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`.
Here we can see the use of the backslash, `\`, implicitly denotes a space, which
in turn denotes an AND operator.

```ocl
### Reject if IP is outside (>) these CIDRs
REJECT \
  $.turbot.cidr:>10.0.0.0/8 \
  $.turbot.cidr:>172.16.0.0/12 \
  $.turbot.cidr:>192.168.0.0/16

### Approve anything else
APPROVE *
```

### Example 2: AWS > VPC > Security Group > Ingress Rules > Approved > Rules (CIDR and PORT REJECT)

Logic can be stacked to create complex rules. In the below case, we are allowing
the use of the default route (`0.0.0.0/0`) IF AND ONLY IF using web ports 80
and 443. All other use of the default route will be flagged or removed by the
`AWS > VPC > Security Group > Ingress Rules > Approved` control, depending on
the configuration. Any route outside of the above restriction is allowed.

```ocl
### Approve use of default route if using web ports
APPROVE \
  $.turbot.ports.+:80,443 \
  $.turbot.cidr:0.0.0.0/0,"::/0"

### Reject all other use of default route
REJECT $.turbot.cidr:0.0.0.0/0,"::/0"

### Approve anything else
APPROVE *
```

Again, we can stack the logic to reject specific ports (21 or 25), a specific
port range (anything greater than 4, or -1. -1 is defined as the entire port
range), and only allow the use of specific CIDR ranges.

```ocl
### Reject if using port 25 or 21
REJECT $.turbot.ports.+:25,21

### Reject if port range is > 4 or == -1
REJECT $.turbot.portRangeSize:>4,-1

### Reject if IP is outside (>) these cidrs
REJECT \
  $.turbot.cidr:>10.0.0.0/8 \
  $.turbot.cidr:>172.168.0.0/16 \
  $.turbot.cidr:>192.168.0.0/24

### Approve anything else
APPROVE *
```

### Example 3: AWS > VPC > Security Group > Ingress Rules > Approved > Rules (PORT REJECT over Range)

In this example, let's suppose we want to block a specific port (say, port `22`)
but at the same time, allow large ranges of ports. The key caveat is that the
blocked port _cannot be a part of the range_. We saw in the above example that
we can block a port using the OCL:

```ocl
REJECT $.turbot.ports.+:25
APPROVE *
```

However, we can circumvent this restriction by defining a range that does not
specifically mention port 25. To account for this possibility, we can tweak the
rule:

```ocl
REJECT $.turbot.fromPort:<=25 $.turbot.toPort:>=25
APPROVE *
```

This rule can be stacked in a similar manner to example 2 to restrict a number
of ports, as well as restricting by CIDR (`REJECT $.turbot.cidr:0.0.0.0`),
IpProtocol (`REJECT $.IpProtocol:icmp`), or any other metadata about the
security group stored in the Guardrails CMDB.

### Example 4: AWS > KMS > Key > Policy Statements > Approved > Rules (REJECT Permission Sets)

We can alarm on or remove any not approved rule using OCL. Often, KMS Key
policies will have multiple entries, such as a user with access to kms:Encrypt,
kms:Decrypt, and kms:DescribeKey. Using pipes (`|`), we can concatenate the
rules to be easier to create and read.

In this example, we are going to reject any action that is NOT kms:Encrypt,
kms:Decrypt, or kms:DescribeKey.

**Example without pipes**:

```ocl
REJECT !$.Action:kms:Encrypt

REJECT !$.Action:kms:Decrypt

REJECT !$.Action:kms:DescribeKey

APPROVE *
```

**Example with pipes**:

```ocl
REJECT !$.Action:/^kms:(Encrypt|Decrypt|DescribeKey)$/

APPROVE *
```

Much easier to read and write! Note the use of the `^` and `$/` at the end of
the REJECT statement.

When setting this KMS rules policy, do not forget to also set **AWS > KMS >
Key > Policy Statements > Approved**!

### Example 5: AWS > IAM > Role > Policy Attachments > Approved > Rules (REJECT Policies)

OCL logic can also be applied to IAM roles and users. Often, organizations will
want to restrict the usage of the full access `AdministratorAccess` policy in
AWS IAM. This below example will trigger an alarm (and possible remediation) if
the `AdministratorAccess` policy is attached to any role.

```ocl
### Reject administrator access policy attachments to an IAM role
REJECT $.PolicyName:/^.+FullAccess.*$/
REJECT $.PolicyName:AdministratorAccess

### Approve anything else
APPROVE *
```
