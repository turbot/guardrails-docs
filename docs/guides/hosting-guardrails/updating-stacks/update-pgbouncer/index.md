---
 title: Enable PgBouncer
 sidebar_label: Enable PgBouncer
---

# Enable PgBouncer Connection Pooling for Turbot Guardrails

PgBouncer is a lightweight connection-pooler that sits between Turbot Guardrails services and the Hive PostgreSQL database.  By multiplexing thousands of client connections into a much smaller pool of backend connections, PgBouncer dramatically reduces the number of active sessions on Hive, lowering memory consumption and protecting the database from connection storms.

Beginning with **TEF&nbsp;1.68.0**, **TED&nbsp;1.50.0**, and **TE&nbsp;5.52.0**, PgBouncer support is fully integrated into Turbot Guardrails Enterprise.  This guide walks you through the upgrade path to enable PgBouncer in an existing environment, verify it is working, and tune common parameters.

> [!TIP]
> New deployments of TEF ≥ 1.68.0 and TED ≥ 1.50.0 have PgBouncer disabled by default.  Follow this guide to enable it after you upgrade, or skip straight to **Step&nbsp;3** during a fresh install.

---

## Prerequisites

- **TEF** version **1.68.0** or later
- **TED** version **1.50.0** or later
- **TE** version **5.52.0** or later
- Access to the Guardrails AWS account with **Administrator** privileges
- Familiarity with AWS Console, Service Catalog, and CloudFormation

---

## Upgrade & Enable Sequence

1. **Update TEF** – add PgBouncer support and write discovery parameters.<br/>
2. **Update TED** – deploy the PgBouncer ECS service inside the Hive stack.<br/>
3. **Install or update TE to ≥ 5.52.0 and migrate workspaces** – workers will automatically route through PgBouncer *when it is enabled*; otherwise they continue connecting directly to Hive<br/>
4. **Verify** – confirm traffic is flowing through PgBouncer.

Each step is outlined in detail below.

---

## Step 1: Update TEF

Follow the standard [Update TEF](guides/hosting-guardrails/updating-stacks/update-tef) procedure and select a version **≥ 1.68.0**.

Set **Enable PgBouncer** to **true** in the *Advanced – PgBouncer* section to turn on connection pooling for your Collective.

Continue through the wizard and monitor CloudFormation until the TEF stack reports **UPDATE_COMPLETE**.

---

## Step 2: Update TED

Next, follow the standard [Update TED](guides/hosting-guardrails/updating-stacks/update-ted) procedure and select a version **≥ 1.50.0**.

### PgBouncer parameters in TED

TED exposes a rich set settings, but you can leave every value at its default when first enabling PgBouncer. Fine-tuning is optional and can be done later.  See [Configuration & Tuning](#configuration--tuning) if you need to understand or adjust specific settings later.

> You can safely accept all default values during the TED update.  Only revisit these parameters if you need to scale PgBouncer beyond the baseline; see the [Configuration & Tuning](#configuration--tuning) section below.

Adjust any parameters as required, then complete the update and monitor CloudFormation until **UPDATE_COMPLETE**.

---

## Step 3: Install or update TE to ≥ 5.52.0 and migrate workspaces

PgBouncer support requires **Turbot Guardrails Enterprise (TE) 5.52.0** or later.  Use the existing [Update TE](guides/hosting-guardrails/updating-stacks/update-te) guide to install a new TE product or upgrade an existing one to 5.52.0+.  After TE is updated, upgrade each workspace – they will automatically start using PgBouncer as long as the **Enable PgBouncer** flag remained **true** during the TED update.

No additional parameters need changing at the workspace level.

---

## Step 4: Verify PgBouncer is Active

The most reliable way to verify PgBouncer is working is through its statistics output:

1. In TED parameters, set **PgBouncerLogStats** to **enabled**
2. Navigate to your ECS service `<prefix>_<hive>_pgbouncer`
3. Select the running task and view its logs
4. Look for `STATS` lines that appear every 5 minutes with metrics like:
   ```
   stats: 9 xacts/s, 8 queries/s, 8 client parts/s, 8 server parts/s, 8 kB/s/s, in 277 B/s, out 1000 B/s, xact 54224 us, query 47520 us, wait 126 us
   ```
   
   These stats show:
   - Active client and server connections
   - Query throughput
   - Transaction latency
   - Network traffic

The presence of these stats confirms PgBouncer is running and processing database traffic.

---

## Configuration & Tuning

### Sizing Guidelines

1. **Database Connections** – a good starting point is **2–3 connections per vCPU** on the Hive instance.
   * r6g.large (2 vCPU) → 4–6 connections
   * r6g.2xlarge (8 vCPU) → 16–24 connections
   This usually represents 10–20% of the instance's Postgres `max_connections`, leaving plenty of headroom for maintenance users and bursts.

2. **Client Connections** – the default **2000** is sufficient for most Collectives. If you need more:
   * Add more PgBouncer tasks by increasing the desired task count
   * Adjust container resources (CPU and memory allocation)

3. **High Availability** – enable zone spreading and set at least 2 desired tasks so a single AZ outage doesn't break connectivity.

### Connection Settings

- **Maximum Client Connections** (`PgBouncerMaxClientConnections`) – raise beyond 2000 only if you have many concurrent workers
- **Maximum Database Connections** (`PgBouncerMaxDbConnections`) – adjust when you upscale your RDS instance
- **Worker Pool Size** (`PgBouncerConnectionPoolSize`) – size of the worker connection pool (default: 10)
- **API Pool Size** (`PgBouncerApiConnectionPoolSize`) – size of the API connection pool (default: 2)

### Resource Settings

- **Task Count** (`PgBouncerDesiredCount`) – number of PgBouncer tasks to run (≥ 2 recommended for HA)
- **CPU Units** (`PgBouncerCpuAllocation`) – CPU units per task (default: 512 = 0.5 vCPU)
- **Memory** (`PgBouncerMemoryAllocation`) – memory per task (default: 128 MiB)

### Monitoring Settings

- **Statistics Logging** (`PgBouncerLogStats`) – enables aggregated stats every 5 minutes showing active clients, connections, and performance metrics
- **Connection Logging** (`PgBouncerLogConnections`, `PgBouncerLogDisconnections`) – enables logging of individual connections/disconnections (useful for troubleshooting)
