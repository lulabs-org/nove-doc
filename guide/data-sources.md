# 数据源接入矩阵

> 本文档以**实际代码现状**为准，列出 nove 已接入 / 规划中的数据源、接入方式与承载模块。与 [需求与范围](./requirements) 配合阅读；能力整体状态见 [能力状态总览](./capabilities)。

## 一、接入方式说明

| 方式 | 含义 | 典型场景 |
|---|---|---|
| **Webhook 订阅（推）** | 数据源主动回调 nove-api，实时入库 | 腾讯会议 / 飞书会议事件、微信小店订单事件 |
| **API 拉取（拉）** | nove-api 定时 / 按需调用数据源开放 API | 会议录制、转写、参会成员明细同步 |
| **内部业务数据** | nove 自身业务系统产生的数据，直接入库 | 订单、退款、产品、渠道、平台用户 |
| **生成类数据** | 由 nove 内 AI / 任务引擎产出的派生数据 | 会议摘要、周期跟踪报告 |

## 二、接入矩阵（以 nove-api 代码为准）

| 数据源 | 接入方式 | 承载模块 | 主要实体 | 状态 |
|---|---|---|---|---|
| **腾讯会议** | API 拉取（同步处理器）+ Webhook | `tencent-mtg` / `tencent-mtg-hook` | Meeting、MeetingRecording、Transcript、MeetingSummary、MeetingParticipant | ✅ 已接入 |
| **飞书 / 乐享会议** | Webhook 订阅 + 消息队列 | `lark-meeting` | Meeting（Platform=FEISHU） | ✅ 已接入 |
| **微信小店** | Webhook 事件 + 订单接口 | `wechat-shop` | Order、OrderRefund | ✅ 已接入 |
| **业务订单 / 退款** | 内部业务数据 | `order` / `order-refund` | Order、OrderRefund | ✅ 已接入 |
| **产品** | 内部业务数据 | `product` | Product | ✅ 已接入 |
| **渠道** | 内部业务数据 | `channel` | Channel | ✅ 已接入 |
| **平台用户** | 内部业务数据（平台类型：腾讯会议 / Zoom / Teams / 钉钉 / 飞书 / Webex / Voov / 其他） | `user-platform` | PlatformUser | ✅ 已接入 |
| **用户** | 注册 / 导入 | `user` / `auth` / `verification` / `oauth` | User、UserProfile、UserPreference、OAuthClient | ✅ 已接入 |
| **周期跟踪报告** | 生成类（AI 汇总任务，队列化） | `tracking-report` / `task` | UserTrackingReport、TrackingReportSourceReport | ✅ 已接入 |
| **会议转写 / 摘要** | 生成类（AI 预处理） | `llm` + `meet_*` 模型 | Transcript、TranscriptSegment、MeetingSummary、ParticipantSummary | ✅ 已接入（基础版） |
| **邮件 / 短信** | 通知类服务（发送，非数据汇聚） | `mail` / `sms` | —（工具能力） | ✅ 已接入 |
| **聊天记录 / 群聊** | 待定 | — | — | ⏳ 规划中 |
| **客户对接 / 合同** | 待定 | — | — | ⏳ 规划中 |
| **用户画像 / 语义关联 / 知识图谱** | 生成类（重量 AI，归属 nove-ai） | `nove-ai`（仓库为空） | — | ⏳ 规划中 |

> 说明：`nove-ai`（FastAPI）尚未实现，当前 AI 能力由 nove-api 内嵌 LlmService 承担轻量调用（详见 [能力状态总览](./capabilities)）。

## 三、入库链路约定

1. **统一处理**：无论推 / 拉，均走统一入库流程（元数据提取、权限映射、冲突解决）。
2. **幂等**：Webhook 事件按外部事件 ID 去重，重复回调不产生脏数据。
3. **溯源**：每条入库数据保留来源（平台、外部 ID、回调时间 / 拉取时间）。
4. **失败重试**：拉取与队列任务失败进入重试 / 失败状态，可在 nove-admin「任务」页查看与重跑。

---

> 相关：[需求与范围](./requirements) · [能力状态总览](./capabilities) · [架构与技术](/architecture/overview)
