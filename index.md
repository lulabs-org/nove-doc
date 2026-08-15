---
layout: home

hero:
  name: nove
  text: 组织级 Agent 数据基础设施
  tagline: 实时汇聚组织多源数据，经 AI 预处理形成有机关联的数据资产，以最小权限、全量审计开放为 API / MCP / Skill / CLI —— 让 AI 与 Agent 安全地调用组织数据；人类通过 nove-admin 查看与操作。
  actions:
    - theme: brand
      text: 📖 项目概述
      link: /guide/overview
    - theme: alt
      text: 需求与范围
      link: /guide/requirements
    - theme: alt
      text: 架构与技术
      link: /architecture/overview

features:
  - icon: 🛡️
    title: 人机统一权限与审计
    details: 对 AI 实行严格、全面的权限访问控制 —— 独立身份、最小 scope、全量审计，AI 只能在授权范围内访问数据。
  - icon: 🔌
    title: 多协议开放接口
    details: 通过 API、MCP、Skill、CLI 对外提供数据交互，可嵌入任何 Agent Harness 与 Agent 应用平台，是组织数据的开放网关。
  - icon: 🧠
    title: AI 预处理与关联
    details: AI 对入库数据实时预处理，自动找出数据间的关联与联系，形成组织级有机结合的数据资产。
  - icon: 🗄️
    title: 多源数据汇聚
    details: 实时、定时地从会议、订单、用户、聊天记录、客户对接、用户画像、群聊、产品、邮件、合同等方方面面获取数据。
  - icon: 🧩
    title: 可扩展的数据格式
    details: 内置数据仓库格式，支持通过插件等自定义方式接入新的数据形态，随业务演进持续扩展。
---

## 按板块浏览

> 文档按主题分布在以下板块，每项主题有唯一权威来源；首页即为全站导航。

### 🎓 项目总览

- [项目概述](/guide/overview) — 定位、对外交互方式、权限控制、首个落地场景 · 愿景理念 · 系统定位 · 核心特点 · AI 归属决策 · 历史沿革 · 术语
- [需求与范围](/guide/requirements) — 核心用户 · 典型场景 · 范围边界
- [目标与成功指标](/guide/goals) — 项目目标 · 建设原则 · KPI
- [组织与运营](/guide/organization) — 组织分工 · 风险应对 · 预算资源
- [项目名称](/guide/naming) — nove 命名理念（New / Organized / Versatile / Empowered）

### 📡 产品现状（文档与代码对齐）

- [数据源接入矩阵](/guide/data-sources) — 已接入 / 规划中数据源 · 接入方式 · 承载模块
- [能力状态总览](/guide/capabilities) — 组件 / 接口协议 / AI 能力状态（已可用 · 部分可用 · 规划中）

### 🤝 合作方与落地场景

- [陆向谦实验室介绍](/partners/lulabs) — 首个落地客户与合作方（教育场景）

### 🏗️ 架构与技术

- [技术方案总览](/architecture/overview) — 整体架构 · 系统四层架构 · 核心模块详解 · AI 轻/重分层 · Job 模型 · 技术选型
- [系统架构图集](/architecture/system-overview) — ASCII / Mermaid 架构图
- [技术白皮书](/architecture/whitepaper) — 数据仓库 + AI 服务独立化的完整技术论证
- [数据格式与扩展机制（方案探讨）](/architecture/data-format) — 内置数据仓库格式现状 · 三种设计取向 · 落地路径
- [HMAC 介绍](/reference/hmac-intro) · [HMAC 项目实战指南](/reference/hmac-guide) — 服务间鉴权参考（技术参考板块）
- [历史方案归档](/archive/tech-framework) — v1.0 教育中台时期的技术选型参考（归档板块）

### 🗺️ 路线图

- [实施路线图](/roadmap/implementation) — 迭代策略 · 三阶段规划 · 12 周里程碑（M1-M6）· v1.0 交付物
- [三年技术与 AI 演进路线图](/roadmap/evolution) — 2026-2028 系统 / AI / 数据治理 / 工程成熟度演进

### 🔒 权限安全与合规

- [人机统一权限体系](/security/permission-system) — 双主体模型 · RBAC/ABAC · AI scope 白名单 · 全链路审计 · 数据脱敏
- [数据与隐私保护白皮书](/security/privacy-whitepaper) — 数据治理原则 · 生命周期 · AI 访问审计 · 合规对齐

---

## 相关仓库

| 仓库 | 说明 |
| --- | --- |
| `nove_api` | 数据仓库主服务（NestJS）：数据获取、存储、权限、API/MCP/Skill 暴露，技术文档见 `nove_api/docs/` |
| `nove-ai` | AI 智能服务（FastAPI + Python）：数据预处理、关联发现、知识图谱、批量智能计算（规划中） |
| `nove-admin` | 人类用户入口（React + Vite + Ant Design）：数据查看与操作 |
| `nove-cli` | 命令行数据访问工具（oclif） |
| `nove-skills` | Agent 技能包（meeting-api / user-api 参考） |

> 本站点承载 **项目级业务文档**（定位、项目书、架构、路线图、合规）；各代码仓库的技术文档仍由各自仓库维护。
