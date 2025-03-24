---
title: Processes
sidebar_label: Processes
---

# Processes

All work done by Guardrails is organized into discrete processes - API handling,
control execution, actions, etc. Each process has a unique identifier and can
be monitored for progress, logs and outcome. Processes provide a single point
to track progress and information about a sequence of backend decisions and
processing in a single place.

## States

Processes follow a clearly defined state machine for phases of execution:

| State      | Description                                                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Starting   | Process is being started and input gathered for the Running phase. Any triggering event has been received and acknowledged to the sender.        |
| Running    | Mods are doing process work. Input is passed from Guardrails and commands are sent back.                                                         |
| Handling   | The Guardrails engine is handling commands issued during the Running phase.                                                                      |
| Terminated | The process has finished, no further work will be done. Upon termination the process is immutable, with no extra log entries or changes allowed. |

Ensuring consistent, reliable process execution is a complex problem with many error conditions. Some examples:

| Error condition | Description | Remediation |
| -- | -- | -- |
| Zombie | A process that is still in "Running" state in Guardrails, but the associated function or state machine defined by the mod has actually completed without successfully informing Guardrails. | Guardrails checks periodically for zombie processes based on the time spent in Running state. If considered as a zombie, Guardrails will update the error log and terminate the process. |
| Retryable error (e.g. throttling) | A retryable error occurred during process handling. | The process phase will be retried multiple times with backoff between attempts. If the error persists then an error is logged and the process is terminated. |


## Log

Workers may log to the process to record data points, decisions and key actions.

Log entries are recorded in JSON with the following format:

    {
      "level": "info",
      "message": "I am information.",
      "timestamp": "2018-10-19T12:51:36",
      "data": {
        "ad": "hoc",
        "json": true
      }
    }

Log levels follow the [syslog standard](https://en.wikipedia.org/wiki/Syslog#Severity_level):

| Severity      | ID          | Used by           | Description |
| ---------     | ----------- | ----------------- | ----------- |
| Emergency     | `emergency` | Guardrails Engine | Guardrails is unavailable and automatic recovery is unlikely. |
| Alert         | `alert`     | Guardrails Engine | Alert from a key component or dependency. Guardrails is unusable, but may automatically recover. |
| Critical      | `critical`  | Guardrails Engine | Critical conditions. Guardrails may be unavailable or have severely degraded performance. |
| Error         | `error`     | Mods              | Error significant to an action, but not critical to Guardrails. Review and remediation required. |
| Warning       | `warning`   | Mods              | Warning that an error may occur if action is not taken. Review recommended. |
| Notice        | `notice`    | Mods              | Significant, but normal, events such as automated actions. |
| Informational | `info`      | Mods              | Information about decisions and interim data. |
| Debug         | `debug`     | Mods              | Debug messages used in development only. |
