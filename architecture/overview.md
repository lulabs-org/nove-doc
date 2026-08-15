<!--
 * @Author: 杨仕明 shiming.y@qq.com
 * @Date: 2026-01-07 00:50:32
 * @LastEditors: 杨仕明 shiming.y@qq.com
 * @LastEditTime: 2026-01-07 05:40:50
 * @Description: nove 技术方案总览（NestJS + FastAPI）
-->

# nove 技术方案总览（NestJS + FastAPI）

> 本文档是 nove 的**架构与技术**总览，融合了项目书中"总体架构 / 关键功能 / 技术方案"的内容。系统级架构图见 [系统架构图集](./system-overview)，完整技术论证见 [技术白皮书](./whitepaper)。

## 一、整体架构

nove 采用 **数据平面与智能平面分离 + 人类入口独立** 的架构：

- **nove-admin**：人类用户入口（Vite+React+TS + Ant Design），数据查看与操作
- **nove-api**：数据仓库主服务（NestJS），数据获取 / 存储 / 权限 / 多协议接口
- **nove-ai**：AI 智能服务（FastAPI + Python），数据预处理 / 关联发现 / 知识图谱
- **PostgreSQL**：核心业务数据库
- **Redis**：缓存 / 会话 / 异步任务状态
- **消息队列（可选）**：RabbitMQ / Redis Stream
- **对象存储（可选）**：OSS / S3 / COS

```
AI/Agent(API/MCP/Skill/CLI) ──► nove-api ──► nove-ai
人类(nove-admin)        ──► nove-api        │
                    (权限/审计)               ▼
                              PostgreSQL / Redis / 向量库
```

---

## 二、系统四层架构

```
[数据源层]
  - 会议（腾讯会议/飞书会议 Webhook + API）
  - 订单 / 用户 / 产品（业务系统）
  - 聊天 / 群聊 / 邮件 / 合同（IM、邮件、文档系统）
  - 其它云文档与非结构化文本

        │ 实时 / 定时拉取 · Webhook 订阅 · ETL 清洗/脱敏
        ▼
[数据与索引层]
  - 关系库（PostgreSQL + Prisma：主数据/权限/审计/元数据）
  - 向量库（pgvector / Milvus：嵌入、语义检索）
  - 版本 / 溯源与元数据管理；内置数据仓库格式

        │ AI 预处理 · 关联发现 · RAG
        ▼
[能力与中台层]
  - AI 预处理（总结/抽取/映射）
  - 关联引擎（数据关联、知识图谱、语义层）
  - 智能体能力（RAG 问答、报告生成、任务执行）
  - 人机统一权限（RBAC + ABAC + AI 独立身份 + 审计）

        │ API / 网关
        ▼
[接口与应用层]
  - REST API / GraphQL / MCP / Skill / CLI
  - nove-admin（人类查看与操作）
  - SDK / 接口文档（OpenAPI 契约驱动）
```

---

## 三、核心模块详解

### 3.1 多源数据接入（Connector）

1. **数据源抽象**：统一连接器接口，支持 OAuth / API Key 等认证方式。
2. **同步策略**：实时（Webhook / 流）与定时（增量拉取 / 变更检测）结合。
3. **统一处理**：结构化与非结构化数据的统一入库流程（元数据提取、权限映射、冲突解决）。
4. **自定义扩展**：插件化接入新数据源 / 新数据格式。

**数据源范围**：会议（转写 / 摘要 / 关键词 / 行动项）、业务（订单、退款、用户、产品、渠道）、沟通（聊天记录、群聊、客户对接、邮件、合同）等。

### 3.2 AI 预处理与关联引擎

1. **实时预处理**：数据入库时自动总结、抽取实体、映射字段（轻量任务）。
2. **关联发现**：批量分析数据间关联（Embedding、图谱构建、跨源关联），形成"有机结合的数据仓库"（重量任务）。
3. **语义层**：统一检索、推理、会话记忆，支撑 RAG 问答与 Agent 调用。
4. **RAG 问答**：多轮会话、权限感知检索、可追溯引用、幻觉检测与质量保证。
5. **智能体能力**：模板化配置（按部门/场景）、数据源绑定（Agent 可访问范围）、API 封装。

### 3.3 人机统一权限体系

1. **双主体模型**：人类用户与 AI Agent 均为独立访问主体。
2. **权限模型**：RBAC 为主 + ABAC 场景补充；AI 按 scope 白名单授权。
3. **身份认证**：OAuth 2.0、JWT、API Key（含 `sk_` 前缀的长期密钥）等多种方式。
4. **全链路审计**：人类与 AI 的每次访问均可追溯、可回放。
5. **数据脱敏**：自动识别敏感信息（手机号、身份证号）并模糊化处理。

### 3.4 多协议接口层

1. **REST / GraphQL**：标准数据访问接口（OpenAPI 契约驱动）。
2. **MCP（Model Context Protocol）**：作为 MCP Server 暴露，供 LLM 直接理解与调用。
3. **Skill**：面向 Agent 的技能化封装（如 nove-skills）。
4. **CLI**：命令行数据访问（nove-cli）。

### 3.5 运营监控与数据分析

- 实时指标：数据接入量、接口调用量、AI 任务成功率、权限审计事件。
- 智能分析：数据质量、关联覆盖率、热门数据访问识别。
- 预警机制：系统性能、错误率、安全威胁的智能监控与通知。

---

## 四、为什么 AI 服务要独立（FastAPI）

- Python 是 AI / 数据 / LLM 生态事实标准
- AI 推理慢、依赖重，不应拖慢数据仓库主服务
- AI 迭代频繁，需独立部署、回滚
- 未来可单独扩容 / 上 GPU

**结论：AI = 独立服务（nove-ai），不是业务模块。**

---

## 五、nove-ai（FastAPI）职责

> ⚠️ **现状说明**：nove-ai 目前为**规划中**（仓库尚未实现），本节为既定职责设计；当前轻量 AI 调用由 nove-api 内嵌 LlmService 承担。整体能力状态见 [能力状态总览](/guide/capabilities)。

### 核心能力

1. 数据预处理（自动总结、实体抽取、字段映射）
2. 数据关联发现（跨源关联、语义层、知识图谱）
3. Embedding 入库与向量索引
4. 批量转写总结 / 报告生成
5. 用户画像构建

**原则：**
- 只做"智能计算"，不存业务真相
- 返回结构化 JSON 为主，文本为辅
- 慢任务一律异步 Job 化
- AI 行为全量可审计（TraceId 透传）

---

## 六、AI 能力归属：轻/重分层（架构决策）

| 任务类型 | 示例 | 归属 |
|---|---|---|
| 轻量同步 | 实体抽取、字段映射、短文本分类、单场会议摘要 | nove-api 内嵌封装（AiClient） |
| 重量异步 | Embedding 入库、语义关联发现、知识图谱构建、批量转写总结、用户画像 | nove-ai（Python），Job 化 |

### 为什么实体归属 nove-ai

1. **"找关联、形成有机结合的数据仓库"是语义层 / 知识图谱工程** —— Python 的 LangChain / LlamaIndex / networkx / 向量库生态是 TS 无法比的。
2. **严格权限控制要求 AI 行为全量可审计** —— 所有 AI 计算收敛到 nove-ai 一个出口，统一加 TraceId / 审计 / 配额。
3. **不拖慢数据平面** —— nove-api 的核心职责是"数据快、权限严、接口稳"，AI 推理抖动不能影响它。
4. **演进自由度** —— 换模型、调 prompt、加 RAG 均在 nove-ai 内独立发布回滚，nove-api 只依赖稳定接口。

### nove-api 侧 AI 调用封装

- 所有 AI 调用统一封装为 **AiClient**（超时 / 重试 / 熔断 / 降级）
- 禁止 Controller 直接调用 AI
- AI 不可成为单点故障

---

## 七、服务间鉴权方案：HMAC

### HMAC 是什么？

> HMAC（Hash-based Message Authentication Code）
> 使用 **共享密钥 + 哈希算法** 对请求内容签名，用于：
> - 身份校验（是不是自己服务）
> - 防篡改
> - 防重放（配合 timestamp）

### nove-api → nove-ai 使用方式

**Header 示例：**
```
X-Timestamp: 1700000000
X-Signature: <hmac_sha256>
```

**签名内容：**
```
METHOD | PATH | TIMESTAMP | BODY
```

> 后期服务多了 / 对外开放 → 可升级为 Service JWT

---

## 八、异步任务（Job）模型

适用于：
- 批量 AI 预处理
- 关联发现 / 图谱重建
- 报告生成

### 标准状态
- queued
- running
- succeeded
- failed

**nove-api 接单，nove-ai 计算，结果回写数据库**

---

## 九、技术选型

### 9.1 推荐技术架构

#### 数据仓库主服务 nove-api
- **框架**: NestJS + TypeScript（模块化单体，强类型）
- **数据存储**: PostgreSQL + Prisma ORM（主数据 / 权限 / 审计 / 元数据）；Redis（缓存 / 会话 / 队列）；向量库（pgvector 起步 → Milvus 后期）
- **异步任务**: BullMQ（Redis）
- **接口**: REST + GraphQL + MCP Server + CLI（nove-cli）+ Skill（nove-skills）

#### AI 服务 nove-ai（实体归属）
- **框架**: FastAPI + Python（AI 生态：LLM 编排、Embedding、图谱、pandas/networkx）
- **能力**: 数据预处理、关联发现、知识图谱、批量总结、用户画像
- **任务形态**: 异步 Job（queued → running → succeeded / failed），结果回写数据库

#### 人类入口 nove-admin
- **框架**: React + Vite + TypeScript + Ant Design
- 数据查看、数据源管理、权限配置、审计查询、系统管理

### 9.2 技术选型对比

| 方案 | 适用 | 推荐度 |
|---|---|---|
| NestJS（业务）+ FastAPI（AI） | 数据仓库 + AI 预处理，双后端解耦 | ⭐⭐⭐⭐⭐ |
| 单后端承载全部 | 早期 MVP、AI 需求轻 | ⭐⭐⭐ |
| 微服务 | 大型项目、多团队协作 | ⭐⭐⭐ |

### 9.3 核心技术要求

- **多源接入**：统一连接器 + 插件化扩展
- **异步调度**：转写、总结、批量预处理等长时任务
- **权限控制**：人机统一 RBAC + ABAC，细粒度数据访问控制
- **多协议**：REST / GraphQL / MCP / Skill / CLI
- **可观测性**：性能监控、错误追踪、AI 行为审计

---

## 十、关键工程共识（非常重要）

- AI 是加速器，不是单点故障
- 结构化输出 > 文本生成
- 所有 AI 接口必须可观测
- 字段稳定性 > 模型聪明程度
- MVP 先可用，再智能
- 权限为本：AI 访问数据必须受控、可审计

---

## 十一、一句话总结

> nove =
> **NestJS 承载数据秩序（获取 / 存储 / 权限 / 接口）**
> **FastAPI 承载智能计算（预处理 / 关联 / 图谱）**
> **AI 独立演进，但永远服务于"让组织数据成为 AI 可安全调用的资产"**
