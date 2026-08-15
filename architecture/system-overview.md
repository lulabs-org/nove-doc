# nove 系统架构图集

本文档以架构图形式展示 nove（个人 / 组织 / 企业智能数据仓库）的整体架构。

## 一、ASCII 架构总览

```
┌──────────────────────────── 客户端 / 消费方层 ────────────────────────────┐
│  AI / Agent 调用方          外部系统 / Agent Harness       人类(nove-admin) │
│  (API / MCP / Skill / CLI)  (读取数据、执行任务)          (查看 / 操作)     │
└───────────────┬───────────────────┬───────────────────┬──────────────────┘
                │                   │                   │
                └────────────── API Gateway / BFF ──────┘
                                (Nginx / Kong / API网关)
                                        │
                           ┌────────────┴─────────────┐
                           │  身份与权限 Auth          │
                           │  人机统一 (人类+AI Agent)  │
                           │  JWT / API Key / RBAC     │
                           └────────────┬─────────────┘
                                        │
                          ┌─────────────┴─────────────┐
                          │  数据仓库主服务 nove-api    │
                          │ (NestJS：获取/存储/权限/接口) │
                          └───────┬─────────┬──────────┘
                                  │         │
                     同步HTTP/gRPC│         │异步MQ/任务
                                  │         │
                    ┌─────────────▼───┐   ┌▼──────────────────┐
                    │  AI 服务 nove-ai  │   │ Worker/Jobs 服务   │
                    │ (FastAPI/Python) │   │(预处理/关联/通知)   │
                    └───────┬──────────┘   └─────────┬─────────┘
                            │                        │
             ┌──────────────▼──────────────┐   ┌────▼─────────┐
             │ LLM/Embedding/规则/向量检索  │   │ MQ/队列/调度   │
             └──────────────┬──────────────┘   └────┬─────────┘
                            │                        │
┌───────────────────────────▼───────────────┬────────▼─────────────────────────┐
│                  数据层 / 基础设施层      │       可观测 / 安全 / DevOps       │
│ PostgreSQL(业务)  Redis(缓存/会话/锁)     │ Logs/Traces/Metrics  CI/CD  Sentry │
│ Vector DB(向量)  Object Storage(文件)    │ WAF/RateLimit  Secret Manager      │
│ 内置数据仓库格式  Search(可选)           │ Backup/DR  Audit/Compliance        │
└───────────────────────────────────────────┴───────────────────────────────────┘
```

## 二、Mermaid 架构图（分层版）

```mermaid
flowchart TB
    %% ───────────── 客户端 / 消费方层 ─────────────
    subgraph Client["客户端 / 消费方层"]
        C1["AI / Agent 调用方<br/>(API / MCP / Skill / CLI)"]
        C2["外部系统 / Agent Harness<br/>(读取数据、执行任务)"]
        C3["人类用户<br/>(nove-admin 查看 / 操作)"]
    end

    %% ───────────── API Gateway ─────────────
    GW["API Gateway / BFF<br/>(Nginx / Kong / API网关)"]

    %% ───────────── 认证与权限 ─────────────
    AUTH["身份与权限 Auth<br/>(人机统一：JWT / API Key / RBAC / 多租户)"]

    %% ───────────── 数据仓库主服务 ─────────────
    API["数据仓库主服务 nove-api<br/>(NestJS：获取 / 存储 / 权限 / 接口)"]

    %% ───────────── AI 与任务 ─────────────
    AI["AI 服务 nove-ai<br/>(FastAPI / Python)"]
    WORKER["Worker / Jobs 服务<br/>(预处理 / 关联 / 通知)"]

    %% ───────────── AI 内部能力 ─────────────
    LLM["LLM / Embedding<br/>规则引擎 / 向量检索"]
    MQ["MQ / 队列 / 调度"]

    %% ───────────── 数据层 ─────────────
    subgraph Data["数据层 / 基础设施层"]
        DB["PostgreSQL<br/>(业务数据 / 内置仓库格式)"]
        REDIS["Redis<br/>(缓存 / 会话 / 锁)"]
        OBJ["Object Storage<br/>(文件)"]
        SEARCH["Search<br/>(可选)"]
        VECTOR["Vector DB<br/>(pgvector / Milvus，可选)"]
    end

    %% ───────────── 可观测 & DevOps ─────────────
    subgraph OPS["可观测 / 安全 / DevOps"]
        OBS["Logs / Traces / Metrics"]
        CICD["CI / CD"]
        SENTRY["Sentry"]
        SEC["WAF / RateLimit<br/>Secret Manager"]
        BACKUP["Backup / DR<br/>Audit / Compliance"]
    end

    %% ───────────── 连接关系 ─────────────
    C1 --> GW
    C2 --> GW
    C3 --> GW

    GW --> AUTH
    AUTH --> API

    API -->|同步 HTTP / gRPC| AI
    API -->|异步 MQ / 任务| WORKER

    AI --> LLM
    WORKER --> MQ

    API --> DB
    API --> REDIS
    API --> OBJ
    API --> SEARCH
    AI --> VECTOR

    %% 运维关联（虚线）
    API -.-> OBS
    AI -.-> OBS
    WORKER -.-> OBS

    API -.-> CICD
    API -.-> SENTRY
    API -.-> SEC
    API -.-> BACKUP
```

## 三、Mermaid 架构图（彩色分层版）

```mermaid
flowchart TB
  %% ========= 样式 =========
  classDef client fill:#eef6ff,stroke:#3b82f6,stroke-width:1px,color:#0f172a;
  classDef core fill:#ecfeff,stroke:#06b6d4,stroke-width:1px,color:#0f172a;
  classDef svc fill:#f0fdf4,stroke:#22c55e,stroke-width:1px,color:#0f172a;
  classDef data fill:#fff7ed,stroke:#fb923c,stroke-width:1px,color:#0f172a;
  classDef ops fill:#fdf2f8,stroke:#ec4899,stroke-width:1px,color:#0f172a;

  %% ========= 客户端 / 消费方 =========
  subgraph L1["客户端 / 消费方层"]
    U1["AI / Agent 调用方<br/>API / MCP / Skill / CLI"]:::client
    U2["外部系统 / Agent Harness<br/>读取数据 · 执行任务"]:::client
    U3["人类用户<br/>nove-admin 查看 / 操作"]:::client
  end

  %% ========= 接入与权限 =========
  subgraph L2["接入层 & 权限层"]
    GW["API Gateway / BFF<br/>Nginx / Kong / API网关"]:::core
    AUTH["Auth<br/>人机统一 · JWT / API Key · RBAC · 多租户"]:::core
  end

  %% ========= 数据仓库主服务 =========
  subgraph L3["数据平面（核心域）"]
    API["nove-api 数据仓库主服务<br/>NestJS（获取 / 存储 / 权限 / 接口）"]:::core
  end

  %% ========= 智能与异步 =========
  subgraph L4["智能平面 & 异步计算层"]
    AI["nove-ai AI 服务<br/>FastAPI / Python（预处理 · 关联 · 图谱）"]:::svc
    WORKER["Worker / Jobs<br/>预处理 · 关联 · 通知"]:::svc
    MQ["MQ / 队列 / 调度<br/>Redis / BullMQ（任选）"]:::svc
    LLM["LLM 编排<br/>Embedding · 规则 · RAG / 向量检索"]:::svc
  end

  %% ========= 数据与基础设施 =========
  subgraph L5["数据层 / 基础设施层"]
    PG["PostgreSQL<br/>业务数据 / 内置仓库格式"]:::data
    REDIS["Redis<br/>缓存/会话/锁"]:::data
    OBJ["Object Storage<br/>文件/附件/素材"]:::data
    SEARCH["Search（可选）<br/>ES/OpenSearch"]:::data
    VECTOR["Vector DB（可选）<br/>pgvector/Milvus"]:::data
  end

  %% ========= 可观测与安全 =========
  subgraph L6["可观测 / 安全 / DevOps"]
    OBS["Logs · Traces · Metrics<br/>告警与审计（含 AI 行为审计）"]:::ops
    DEVOPS["CI/CD · Sentry<br/>WAF/RateLimit · Secret Manager<br/>Backup/DR · Compliance"]:::ops
  end

  %% ========= 流向 =========
  U1 --> GW
  U2 --> GW
  U3 --> GW

  GW --> AUTH
  AUTH --> API
  GW --> API

  API -->|同步 HTTP / gRPC| AI
  API -->|异步 事件/任务| MQ
  WORKER <-->|消费/重试/定时| MQ

  AI --> LLM

  API --> PG
  API --> REDIS
  API --> OBJ
  API -.-> SEARCH
  AI -.-> VECTOR

  API -.-> OBS
  AI -.-> OBS
  WORKER -.-> OBS
  GW -.-> OBS

  DEVOPS -.-> GW
  DEVOPS -.-> AUTH
  DEVOPS -.-> API
  DEVOPS -.-> AI
  DEVOPS -.-> WORKER
```

---

> 架构要点：**数据平面（nove-api）承载获取 / 存储 / 权限 / 接口；智能平面（nove-ai）承载预处理 / 关联 / 图谱；人类通过 nove-admin 访问；AI / Agent 通过 API / MCP / Skill / CLI 访问；所有访问受统一的人机权限体系管控。**
