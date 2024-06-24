---
title: "OCL"
template: Documentation
nav:
  title: "OCL"
  order: 40
---

# Object Control List (OCL)

An **Object Control List (OCL)** is a list of statements that determine whether
an item is allowed to exist. Using OCL, you can create custom rules that
describe what configurations are acceptable or unacceptable for any yaml or json
object. Turbot Guardrails leverages OCL in many
[Approved Controls](concepts/guardrails/approved) to provide a flexible,
user-definable mechanism for defining what objects are approved.

## OCL Structure

An OCL is a list of filter rule statements to determine whether an item is
allowed to exist.

- An OCL is a YAML ordered list of statements:
  ```yaml
  - APPROVE {rule}
  - REJECT {rule}
  - REJECT {rule}
  ```
- Each statement contains the action (usually `APPROVE` or `REJECT`, case-insensitive) and one or more match conditions.

- Rules are processed in order. Processing stops at the first match, which
  determines whether the item is approved or rejected.

    - To implement a default APPROVE policy, `APPROVE *` should be the last entry
      in the list
    - To implement a default REJECT policy, `REJECT *` should be the last entry in
      the list
    - The default value should always be explicit: `APPROVE *` OR `REJECT *`. For
      most policies, Guardrails injects the default rule in
      `Approved > Compiled Rules`.

- Each rule contains one or more conditions, using the
  [Turbot Guardrails filter syntax](reference/filter#filter-syntax)

- Arrays
    - To compare items that contain arrays, use a splat. You may specify how to
      match the items:
        - `.*.` - All items in the array must match for the rule to match. An empty
          list also matches.
        - `.+.` - All items in the array must match for the rule to match. An empty
          list does NOT match
    - Use `[]` to specify an empty list:

<br />

| Aim                                                                 | Rule                                                                                    |
|---------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| Approved if the port is 443 AND the cidr is in the 10.0.0.0/8 range | `APPROVE $.turbot.ports.+:443 $.turbot.cidr:<=10.0.0.0/8`                               |
| Approved if the port 80 or 443                                      | `APPROVE $.turbot.ports.+:80,443`                                                       |
| Unapproved if not enabled                                           | `REJECT $.enabled:!true`                                                                |
| Unapproved if the portRangeSize is -1 or is greater than 4          | `REJECT $.turbot.portRangeSize:>4,-1`                                                   |
| Unapproved if not AWS account `268085402721` or `525041748188`      | `REJECT !$.Principal.AWS.*.AWS:/arn:aws:iam::268085402721/,/arn:aws:iam::525041748188/` |

## Canonical Form for complex objects

Resources such as IAM policies and security groups are complex, and often have
variable forms. In addition, the corrective action sometimes requires modifying
an item instead of deleting it. To facilitate searching and matching against
these objects in a consistent way, Guardrails first transforms them into a single,
standard form. The OCL rules should be written against this canonical form, as
that is the format that Approved controls will match against.

Note that resources are stored in their native form in the Guardrails CMDB, not the canonical form used for OCL
processing. Controls that use the canonical form will output the canonical version in the control logs to assist in
troubleshooting.

<div className="alert alert-warning">
The canonical form requires knowledge of the underlying schema and implementation for that specific object type, and the form varies by type.
</div>

When a list is canonicalized:

- Items containing arrays may be flattened such into each combination possible.
- items with more than one possible schema will be linted into a single canonical schema.
- Guardrails may enrich the data or calculate fields and add them to a top level
  `turbot` field in the canical form

### Example - Security Group Rules

##### A security group will have ingress rules stored in the CMDB in the native format:

```yaml
IpPermissions:
  - FromPort: 0
    IpProtocol: icmp
    IpRanges:
      - CidrIp: 0.0.0.0/0
        Description: ""
    Ipv6Ranges: [ ]
    PrefixListIds: [ ]
    ToPort: -1
    UserIdGroupPairs: [ ]
  - FromPort: 22
    IpProtocol: tcp
    IpRanges: [ ]
    Ipv6Ranges: [ ]
    PrefixListIds: [ ]
    ToPort: 22
    UserIdGroupPairs:
      - GroupId: sg-0e2a05296f27460d5
        UserId: "876515858155"
  - FromPort: 20
    IpProtocol: tcp
    IpRanges:
      - CidrIp: 192.168.0.0/24
        Description: ""
    Ipv6Ranges: [ ]
    PrefixListIds: [ ]
    ToPort: 21
    UserIdGroupPairs: [ ]
  - FromPort: 443
    IpProtocol: tcp
    IpRanges:
      - CidrIp: 0.0.0.0/0
        Description: ""
      - CidrIp: 10.0.0.0/8
        Description: ""
      - CidrIp: 172.16.0.0/16
        Description: ""
    Ipv6Ranges: [ ]
    PrefixListIds: [ ]
    ToPort: 443
    UserIdGroupPairs: [ ]
```

##### These rules will be transformed into a canonical form:

```yaml
data:
  - ToPort: -1
    turbot:
      cidr: 0.0.0.0/0
      ports: [ ]
      bitmaskLength: "0"
    FromPort: 0
    IpRanges:
      CidrIp: 0.0.0.0/0
      Description: ""
    IpProtocol: icmp
    Ipv6Ranges: [ ]
    PrefixListIds: [ ]
    UserIdGroupPairs: [ ]
  - ToPort: 22
    turbot:
      ports:
        - 22
      portRangeSize: 1
    FromPort: 22
    IpRanges: [ ]
    IpProtocol: tcp
    Ipv6Ranges: [ ]
    PrefixListIds: [ ]
    UserIdGroupPairs:
      UserId: "876515858155"
      GroupId: sg-0e2a05296f27460d5
  - ToPort: 21
    turbot:
      cidr: 192.168.0.0/24
      ports:
        - 20
        - 21
      bitmaskLength: "24"
      portRangeSize: 2
    FromPort: 20
    IpRanges:
      CidrIp: 192.168.0.0/24
      Description: ""
    IpProtocol: tcp
    Ipv6Ranges: [ ]
    PrefixListIds: [ ]
    UserIdGroupPairs: [ ]
  - ToPort: 443
    turbot:
      cidr: 0.0.0.0/0
      ports:
        - 443
      bitmaskLength: "0"
      portRangeSize: 1
    FromPort: 443
    IpRanges:
      CidrIp: 0.0.0.0/0
      Description: ""
    IpProtocol: tcp
    Ipv6Ranges: [ ]
    PrefixListIds: [ ]
    UserIdGroupPairs: [ ]
  - ToPort: 443
    turbot:
      cidr: 10.0.0.0/8
      ports:
        - 443
      bitmaskLength: "8"
      portRangeSize: 1
    FromPort: 443
    IpRanges:
      CidrIp: 10.0.0.0/8
      Description: ""
    IpProtocol: tcp
    Ipv6Ranges: [ ]
    PrefixListIds: [ ]
    UserIdGroupPairs: [ ]
  - ToPort: 443
    turbot:
      cidr: 172.16.0.0/16
      ports:
        - 443
      bitmaskLength: "16"
      portRangeSize: 1
    FromPort: 443
    IpRanges:
      CidrIp: 172.16.0.0/16
      Description: ""
    IpProtocol: tcp
    Ipv6Ranges: [ ]
    PrefixListIds: [ ]
    UserIdGroupPairs: [ ]
```

##### Matching rules become intuitive

```
 Reject prohibited ports
 REJECT $.turbot.ports.+:20,21,25

# Reject bitmasks below minimum
REJECT $.turbot.bitmaskLength:<8

# Reject port range sizes above maximum (including -1 for all)
REJECT $.turbot.portRangeSize:>4,-1

# Reject CIDR ranges not in approved list
REJECT \
  $.turbot.cidr:>10.0.0.0/8 \
  $.turbot.cidr:>172.168.0.0/16 \
  $.turbot.cidr:>192.168.0.0/24

# Approve unmatched rules
APPROVE *
```

---

## List Approved Policies

Most `Approved` controls that apply to lists (ingress rules, egress rules,
policy statements, attachments, etc) leverage OCL. These are composite policy
controls - their behavior is defined by multiple policies. The policy types
share a common structure:

- `Approved`: Defines the enforcement action - `Skip`, `Check`, or `Enforce`
- `Approved > Compiled Rules`: A read-only policy value generated by Guardrails containing
  the full OCL rule set, including any Guardrails policy values from the "friendly" Approved > * policies. The `Approved`
  control always evaluates against the `Compiled Rules` policy.
- `Approved > Rules`: A list of user-defined OCL rules for approving or
  rejecting items.
- `Approved > {name}`: Guardrails may providce "friendly" policies to generate OCL
  rules for common configuration items.

<div className="example">
  <pre>
  # Standard OCL Approved Policies
  AWS > VPC > Security Group > Ingress Rules > Approved
  AWS > VPC > Security Group > Ingress Rules > Approved > Rules
  AWS > VPC > Security Group > Ingress Rules > Approved > Compiled Rules
  ## "Friendly" Policies 
  AWS > VPC > Security Group > Ingress Rules > Approved > CIDR Ranges
  AWS > VPC > Security Group > Ingress Rules > Approved > Maximum Port Range
  AWS > VPC > Security Group > Ingress Rules > Approved > Minimum Bitmask
  AWS > VPC > Security Group > Ingress Rules > Approved > Prohibited Ports
  </pre>
</div>
