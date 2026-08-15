<!--
 * @Author: 杨仕明 shiming.y@qq.com
 * @Date: 2026-01-07 00:50:32
 * @LastEditors: 杨仕明 shiming.y@qq.com
 * @LastEditTime: 2026-01-07 05:40:50
 * @Description: nove 技术方案总览（NestJS + FastAPI）
-->

# nove 技术方案总览（NestJS + FastAPI）

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

## 二、为什么 AI 服务要独立（FastAPI）

- Python 是 AI / 数据 / LLM 生态事实标准
- AI 推理慢、依赖重，不应拖慢数据仓库主服务
- AI 迭代频繁，需独立部署、回滚
- 未来可单独扩容 / 上 GPU

**结论：AI = 独立服务（nove-ai），不是业务模块。**

---

## 三、nove-ai（FastAPI）职责

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

## 四、AI 能力归属：轻/重分层（架构决策）

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

## 五、服务间鉴权方案：HMAC

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

## 六、异步任务（Job）模型

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

## 七、关键工程共识（非常重要）

- AI 是加速器，不是单点故障
- 结构化输出 > 文本生成
- 所有 AI 接口必须可观测
- 字段稳定性 > 模型聪明程度
- MVP 先可用，再智能
- 权限为本：AI 访问数据必须受控、可审计

---

## 八、最终技术选型结论

**数据仓库主服务**
- NestJS + TypeScript

**AI 服务**
- FastAPI + Python

**数据**
- PostgreSQL + Redis（+ 向量库）

**接口**
- REST / GraphQL / MCP / Skill / CLI

**部署**
- Docker 起步 → Kubernetes

---

## 九、一句话总结

> nove =
> **NestJS 承载数据秩序（获取 / 存储 / 权限 / 接口）**
> **FastAPI 承载智能计算（预处理 / 关联 / 图谱）**
> **AI 独立演进，但永远服务于"让组织数据成为 AI 可安全调用的资产"**
