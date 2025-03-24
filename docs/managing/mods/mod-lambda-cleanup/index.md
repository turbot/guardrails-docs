---
title: Mod Lambda Cleanup
sidebar_label: Mod Lambda Cleanup 🛠
---

# Enabling Mod Lambda Cleanup
New mod versions bring new mod lambda versions with them. Over time these older unused mod Lambdas version can accumulate.   This document will discuss how to configure Guardrails to clean up those old mod versions and how to tell the process is working.  The below procedure will also clean up mod version that use EOL versions of Node.

Once enabled, the maintenance container will handle all mod lambda version cleanup.

WARNING: Old mod Lambdas should not be cleaned up manually. It's easy to make a mistake and cleanup a version that is in use.

## Enabling Mod Cleanup
### AWS Lambda Console
Note how much storage is used in the Lambda console. Also, take note of any mod lambdas that are using old versions of Node.js. As mod version cleanup happens, lambda storage should go down.

### TEF
1. Set the Mods Cleanup parameter to "On".
2. Toggle the Deployment Trigger to force reevaluation of all SSM parameters.

### TE
1. Keep the current TE version then toggle the Deployment Trigger to force reevaluation of all SSM parameters.
Or
1. Deploy a new TE version.  If Mod Cleanup has already been enabled in TEF, then TE will pick up this parameter.

### Mods in the Guardrails Console
1. Any mods that haven't been updated since TE 5.36.* was deployed in the environment will need to be upgraded or removed+reinstalled. The upgrade approach is recommended. Customers with pinned mod versions or with mod auto-update disabled should upgrade to the latest mod release.

## Is it working?
There is no visible change in the Guardrails console that mod lambda clean up is underway.  All change records appear in the CloudWatch Logs for the maintenance container.

### CloudWatch Logs

To verify that mod lambda cleanup is happening:
1. Go to the CloudWatch log group `/{turbot_prefix}/{current_te_version}/maintenance`
2. Search with the log group for the string "Running delete operation".

Example:
```
Running delete operation for {
  functionName: 'turbot-turbotawsguarddutyipSetDelete-0a4a2dd2',
  aliasName: '5_6_1'
}
```

If Mod Cleanup has just been enabled in a long lived Guardrails Master account, there could be hundreds or thousands of entries of lambda version deletion.  Subsequent mod deployments may need only a handfull of lambda version to be cleaned up.
