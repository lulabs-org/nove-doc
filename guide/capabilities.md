# 能力状态总览

> 以**实际代码仓库现状**为准，标注 nove 各组件 / 接口协议 / AI 能力的状态（✅ 已可用 · 🟡 部分可用 · ⏳ 规划中）。本页是"文档宣称 vs 产品现实"的权威对齐入口，避免读者按过时文档接入尚未存在的能力。

## 一、组件状态

| 组件 | 技术栈 | 状态 | 说明 |
|---|---|---|---|
| **nove-api** | NestJS + TypeScript | ✅ 已可用 | 数据仓库主服务：数据接入、存储、权限、REST/GraphQL/MCP、异步任务、审计 |
| **nove-admin** | React + Vite + Ant Design | ✅ 已可用 | 人类入口：仪表盘、会议、订单/退款、产品、渠道、平台用户、API Key、权限、任务、跟踪报告、系统配置等页面 |
| **nove-cli** | oclif | 🟡 部分可用 | 已有 `login` 与会议模块命令（create / get / list / update / delete / stats / transcript）；其余命令待扩展 |
| **nove-skills** | Agent Skill 包 | 🟡 部分可用 | 已提供 `meeting-api` 参考；`user-api` 等模块参考待补充 |
| **nove-ai** | FastAPI + Python | ⏳ 规划中 | **仓库为空，尚未实现**。文档中的 nove-ai 能力（关联发现、知识图谱、用户画像等）均为规划目标 |
| **PostgreSQL / Redis** | 基础设施 | ✅ 已可用 | 主数据 / 权限 / 审计 / 元数据；缓存 / 会话 / 任务队列 |

## 二、接口协议状态

| 协议 | 状态 | 说明 |
|---|---|---|
| **REST API** | ✅ 已可用 | Swagger UI（`/api`）、OpenAPI JSON、Redoc |
| **GraphQL** | ✅ 已可用 | `/graphql`（Apollo，生产环境关闭 playground / introspection） |
| **MCP Server** | 🟡 部分可用 | 已支持 SSE 与 Streamable HTTP 两种传输；当前提供 7 个工具：`greeting-tool`、`get-meeting-stats`、`get-meeting-details`、`get-user-info`、`find-userid-by-username`、`find-userid-by-phone`、`find-userid-by-email` |
| **Skill** | 🟡 部分可用 | nove-skills 已发布 meeting-api 技能，覆盖会议 CRUD / 统计 / 转写 |
| **CLI** | 🟡 部分可用 | 见上表 nove-cli |
| **Webhook 接收** | ✅ 已可用 | 腾讯会议 / 飞书会议 / 微信小店事件回调，均验签 + 队列处理 + 幂等 |

## 三、AI 能力状态

| 能力 | 现状归属 | 状态 | 说明 |
|---|---|---|---|
| 轻量 AI 调用（总结 / 结构化输出） | nove-api 内嵌 `LlmService`（OpenAI 兼容接口，超时 / 重试 / 降级封装） | ✅ 已可用（基础版） | 会议摘要、跟踪报告汇总等已跑通 |
| AiClient 统一封装 | nove-api | ✅ 已可用 | 超时 / 重试 / 熔断 / 降级 |
| 异步 Job 模型 | nove-api（BullMQ + Bull Board） | ✅ 已可用 | queued → running → succeeded / failed，任务页可视化 |
| Embedding 入库与向量检索 | nove-ai（规划） | ⏳ 规划中 | 向量库（pgvector / Milvus）未接入 |
| 跨源关联发现 / 知识图谱 / 语义层 | nove-ai（规划） | ⏳ 规划中 | 核心差异化能力，尚未实现 |
| 用户画像构建 | nove-ai（规划） | ⏳ 规划中 | 尚未实现 |
| 服务间 HMAC 鉴权 | nove-api ↔ nove-ai | ⏳ 规划中 | HMAC 参考文档面向规划中的 nove-ai；当前 nove-ai 不存在，尚无实际服务间调用 |

## 四、权限与审计状态

| 能力 | 状态 | 说明 |
|---|---|---|
| 人机统一认证（JWT / OAuth / API Key `sk_`） | ✅ 已可用 | UnifiedAuthGuard |
| AI scope 白名单 | ✅ 已可用 | ScopeGuard + ApiKey scope 绑定 |
| RBAC + 权限点 | ✅ 已可用 | 角色 / 权限 / 数据权限规则（PermissionGuard） |
| 组织 / 部门 / 成员管理 | ✅ 已可用 | org / dept / org-member 模块（多组织基础能力） |
| 全链路审计 / Webhook 日志 | ✅ 已可用 | webhook-log、登录日志、API Key 用量日志 |
| 数据脱敏 | 🟡 部分可用 | 敏感字段识别与脱敏策略逐步落地中 |

## 五、数据格式与扩展状态

| 能力 | 状态 | 说明 |
|---|---|---|
| 内置数据仓库格式（统一约定） | 🟡 部分可用 | 各业务域强类型表 + JsonB 扩展字段，尚无统一元数据规范 |
| 数据形态注册表 / 插件化接入 | ⏳ 规划中 | 方案探讨见 [数据格式与扩展机制（方案探讨）](/architecture/data-format)；当前未实现 |

## 六、状态约定

- **✅ 已可用**：代码已实现并可实际使用，文档可放心引用。
- **🟡 部分可用**：已实现核心路径，但覆盖面或完善度有限，接入前需确认具体范围。
- **⏳ 规划中**：仅有设计文档 / 路线图，仓库尚无实现，**请勿按已实现能力接入**。

> 本页随代码仓库状态定期更新；若发现与代码不一致，请以代码为准并修正本页。

---

> 相关：[数据源接入矩阵](./data-sources) · [需求与范围](./requirements) · [技术方案总览](/architecture/overview)
