---
title: Network Testing
sidebar_label: Network Testing
---

# Testing internet connectivity prior to Installation

  Because custom network configuration is a complex and multifaceted, it is critical to perform practical tests to ensure connectivity prior to starting the install process.  The install process is automated and several steps take extended periods of time; diagnosing issues, uninstalling services and reinstalling is time-consuming and frustrating; in contrast, taking the time to perform the following tests is a relatively painless process that can provide a higher probability of "first run success" and eliminate many variables if troubleshooting is needed. Pre-install testing process:  

  1. **Launch Linux Instance**: Launch a linux test instance into each App subnet.    

  1. **DNS Resolution for Instance**: If using private DNS (or a non-Guardrails managed Route53 hosted zone) register an `A` record for one of the test instances (e.g. `test-a.cloudportal.company.com` => `10.10.0.10`).    

  1. **Outbound Security Group**: Attach the `OutboundInternetSecurityGroup` to the instances in addition to the security group used for inbound ssh access. Ensure that the security group used for SSH access does not provide any Egress rules to prevent false positives when testing.   

  1. **Instance Profile**: Attach an instance profile with the aws managed `Administrator` role to the instances.  

  1. **Install Required Utiltiies**: Log into the instances and install NetCat, Curl, AWS CLI utilities.  

  1. **Public DNS resolution**: Test DNS resolution to the public internet:  
    
      ```
      > nslookup google.com

      Non-authoritative answer:
      Name:	google.com
      Address: 172.217.7.174

      > nslookup amazonaws.com

      Non-authoritative answer:
      Name:	amazonaws.com
      Address: 207.171.166.22
      Name:	amazonaws.com
      Address: 72.21.210.29
      ```

  1. **Private DNS resolution**: Test DNS resolution to private DNS
      ```
      > nslookup test-a.cloudportal.company.com  #substitute your domain and hostname

      Name:	test-a.cloudportal.company.com
      Address: 10.10.0.10
      ```
  
  1. **VPC Endpoint Resolution**: Test DNS resolution to VPC Endpoints: *Only test if using VPC endpoints*.  **Expected Result**: If configured correctly, this should resolve to a private IP address within the VPC. If it resolves to a public IP, please check the configuration of [Private DNS for VPC Endpoints](https://docs.aws.amazon.com/vpc/latest/userguide/vpce-interface.html#vpce-private-dns).  Note that VPC endpoints are region specific so in this example only the us-east-1 endpoint resolves to a private address, us-east-2 resolves to a public IP because the VPC in the example is in us-east-1.
      ```
      > nslookup logs.us-east-1.amazonaws.com

      Name:	logs.us-east-1.amazonaws.com
      Address: 10.10.0.8    

      > nslookup logs.us-east-2.amazonaws.com

      Name:	logs.us-east-2.amazonaws.com
      Address: 52.95.18.172
      ```
  
  1. **Public Internet Connectivity**: Test connectivity to the public Internet:
      ```
      > curl https://google.com

      <HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
      <TITLE>301 Moved</TITLE></HEAD><BODY>
      <H1>301 Moved</H1>
      The document has moved
      <A HREF="https://www.google.com/">here</A>.
      </BODY></HTML>
      ```
  
  
  1. **AWS Connectivity**: Test connectivity to AWS  
      ```
      > curl amazonaws.com

      <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
      <html><head>
      <title>301 Moved Permanently</title>
      </head><body>
      <h1>Moved Permanently</h1>
      <p>The document has moved <a href="http://aws.amazon.com">here</a>.</p>
      </body></html>
      ```
  
  1. **AWS Service Connectivity**: Test connectivity to AWS services using NetCat:  **If not using VPC endpoints** the two tests below will suffice; **If using VPC endpoints** make sure to test both the VPC region and a secondary region and repeat for each VPC Endpoint configured and at least one service that does not have an endpoint.
      ```
      > nc -vz logs.us-east-1.amazonaws.com 443

      Connection to logs.us-east-1.amazonaws.com port 443 [tcp/https] succeeded!

      > nc -vz logs.us-east-2.amazonaws.com 443

      Connection to logs.us-east-2.amazonaws.com port 443 [tcp/https] succeeded!

      > nc -vz s3.us-east-1.amazonaws.com 443

      Connection to s3.us-east-1.amazonaws.com port 443 [tcp/https] succeeded!

      > nc -vz s3.us-east-2.amazonaws.com 443

      Connection to s3.us-east-2.amazonaws.com port 443 [tcp/https] succeeded!
      ```
  
  1. **AWS CLI Commands**: Test the ability to execute AWS API commands:  If any of the following tests fail, Guardrails will not be able to install correctly; follow-up and diagnose any errors **prior to beginning the installation process**. 
      ```
      > aws s3 ls
      ... (list of buckets)
      > aws s3 mb s3://{some_random_bucket_name} --region {installation_region}
      > touch test.file
      > aws s3 cp test.file s3://{some_random_bucket_name}
      > aws s3 rm s3://{some_random_bucket_name}/test.file
      > aws s3 rb s3://{some_random_bucket_name}/

      > aws logs create-log-group --log-group-name /turbot/test-logging --tags test=tag
      > aws logs create-log-stream --log-group-name /turbot/test-logging --log-stream-name test001
      > aws logs create-log-stream --log-group-name /turbot/test-logging --log-stream-name test001
      > aws logs put-log-events --log-group-name /turbot/test-logging --log-stream-name test001 --log-events timestamp=1433190184356,message=test-event-1

      > aws kms list-keys
      ```

  1. **CloudFormation Custom Resource Response**: If using S3 endpoints or a proxy, test connectivity to the CloudFormation custom resource response URL using the following curl.

      ```
      curl 'https://cloudformation-custom-resource-response-{region}.s3.amazonaws.com/?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-SignedHeaders=host&X-Amz-Expires=7200'
      ```

      **WARNING**: If this test to the CloudFormation Response bucket fails, resolve before proceeding with installation.  If CloudFormation can't receive responses that the custom resources are complete then the CloudFormation stack will stall for 30 minutes to an hour. Clean up of the stalled custom resources can be quite time consuming. 

     The `{region}` value will be the AWS region that Guardrails is being installed into. An unauthorized response is ok - the purpose is to test network connectivity to the endpoint. Once this has been verified, along with the rest of this list, the Guardrails installation can move forward.
