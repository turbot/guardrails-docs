---
title: EBS Volume Configuration
sidebar_label: EBS Volume Configuration
---

# Automating AWS EBS Volume Conversion

This guide provides a detailed walkthrough for automating the conversion of AWS EBS volumes through policy settings. These settings allow you to manage volume performance configurations effectively, including IOPS capacity, throughput, and volume type.  Refer to the [AWS EBS Volume documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/modify-volume-requirements.html) for additional information about the prerequisites and conversion process. 

## Overview of Policy Settings

The policy settings described below are part of the `AWS > EC2 > Volume > Performance Configuration` policy setting family. They are designed to describe how EBS volumes are configured and managed within your AWS environment.

###  Performance Configuration Policy

- **URI**: `tmod:@turbot/aws-ec2#/policy/types/volumeConfiguration`
- **Valid Values**:
  - `Skip`: Bypasses the performance configuration.
  - `Check: Configured per Configuration > * policies`: Verifies the volume's configuration against specified policies.
  - `Enforce: Configured per Configuration > * policies`: Ensures the volume's configuration adheres to specified policies.
- **Default**: `Skip`

#### Usage:
This setting allows you to define how EBS volumes should be checked or enforced for performance configurations, including IOPS and throughput settings, based on predefined policies.

###  IOPS Capacity

- **URI**: `tmod:@turbot/aws-ec2#/policy/types/volumeConfigurationIopsCapacity`
- **Schema**: Numeric value defining the IOPS capacity.
- **Default**: Will use the current IOPS value for the volume.

#### Usage:
Specifies the IOPS (Input/Output Operations Per Second) capacity for an EBS volume. It's crucial for optimizing performance, especially for IO-intensive applications.

###  Throughput

- **URI**: `tmod:@turbot/aws-ec2#/policy/types/volumeConfigurationThroughput`
- **Minimum**: 125 MiB/s
- **Maximum**: 1000 MiB/s
- **Default**: Will use the current Throughput value for the volume.

#### Usage:
Defines the throughput in MiB/s required for the EBS volume, which is essential for data-intensive applications needing high-speed data transfer.

###  Volume Type

- **URI**: `tmod:@turbot/aws-ec2#/policy/types/volumeConfigurationType`
- **Valid Values**: `io1`, `io2`, `gp2`, `gp3`, `sc1`, `st1`, `standard`
- **Default**: Will preserve the current volume type.

#### Usage:
Determines the type of EBS volume. The volume type affects performance characteristics and cost, so it's important to choose the appropriate type based on your application's needs.

## Automating Volume Conversion

To automate the conversion of AWS EBS volumes using these policy settings, follow these steps:

1. **Identify Volume Requirements**: Determine the performance requirements of your applications, including IOPS, throughput, and volume type.

2. **Configure Policies**: Based on your requirements, set the appropriate policy values for IOPS Capacity, Throughput, and Volume Type. Use the `Enforce: Configured per Configuration > * policies` option under the Performance Configuration Policy to automatically apply these configurations. Consider the use of calculated policies to properly identify source and target volume types. For example, while `gp3` volumes are popular and performant, they are not the universal best volume type for all workloads.  

3. **Apply Policies**: Implement these policies within your Guardrails workspace. This can be done through the Guardrails Console, or Guardrails Terraform, depending on your preference and the tools you're familiar with.

4. **Monitor and Adjust**: After applying the policies, monitor the performance of your EBS volumes. Adjust the policy settings as necessary to optimize performance and costs.

## Conclusion

Automating EBS volume conversion through Guardrails policy settings streamlines the management of your AWS environment, ensuring that volumes are optimized for performance and cost. By carefully configuring and applying these policies, you can enhance the efficiency and reliability of your applications running on AWS EC2 instances.