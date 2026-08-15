---
layout: home

hero:
  name: nove
  text: 个人、组织与企业的智能数据仓库
  tagline: 实时汇聚多源数据，经 AI 预处理形成有机关联的数据资产，通过 API / MCP / Skill / CLI 对外提供数据交互 —— 主要服务 AI 与 Agent，人类通过 nove-admin 查看与操作。
  actions:
    - theme: brand
      text: 📖 阅读项目书
      link: /project-book
    - theme: alt
      text: 项目完整概述
      link: /guide/overview
    - theme: alt
      text: 架构与技术
      link: /architecture/overview

features:
  - icon: 🗄️
    title: 多源数据汇聚
    details: 实时、定时地从会议、订单、用户、聊天记录、客户对接、用户画像、群聊、产品、邮件、合同等方方面面获取数据。
  - icon: 🧠
    title: AI 预处理与关联
    details: AI 对入库数据实时预处理，自动找出其中的关联与联系，形成组织庞大的、有机结合的数据仓库。
  - icon: 🔌
    title: 多协议对外接口
    details: 通过 API、MCP、Skill、CLI 等一系列接口对外提供数据交互，成为其他 Agent Harness 的强大数据后盾。
  - icon: 🤖
    title: 面向 AI 与 Agent
    details: 数据的主要消费者是 AI 与 Agent；人类用户主要通过 nove-admin 查看与操作。
  - icon: 🛡️
    title: 严格的人机权限控制
    details: 对 AI 实行严格、全面的权限访问控制 —— 独立身份、最小 scope、全量审计，AI 只能在授权范围内访问数据。
  - icon: 🧩
    title: 可拓展的数据格式
    details: 内置数据仓库格式，支持通过插件等自定义方式接入新的数据形态，随业务演进持续扩展。
---

## 项目文档导航

- **项目总览** — [项目介绍](/guide/)、[项目完整概述](/guide/overview)、[项目名称](/guide/naming)、[陆向谦实验室介绍](/guide/lulabs)
- **项目书** — [NOVE 项目书](/project-book)（v2.0 · 个人/组织/企业数据仓库）
- **架构与技术** — [技术方案总览](/architecture/overview)、[系统架构图集](/architecture/system-overview)、[技术白皮书](/architecture/whitepaper)、[历史方案探讨](/architecture/tech-framework)
- **路线图** — [实施路线图](/roadmap/implementation)、[三年技术与 AI 演进路线图](/roadmap/evolution)
- **数据与合规** — [数据隐私白皮书](/compliance/privacy-whitepaper)

## 相关仓库

| 仓库 | 说明 |
| --- | --- |
| `nove_api` | 数据仓库主服务（NestJS）：数据获取、存储、权限、API/MCP/Skill 暴露，技术文档见 `nove_api/docs/` |
| `nove-ai` | AI 智能服务（FastAPI + Python）：数据预处理、关联发现、知识图谱、批量智能计算（规划中） |
| `nove-admin` | 人类用户入口（React + Vite + Ant Design）：数据查看与操作 |
| `nove-cli` | 命令行数据访问工具（oclif） |
| `nove-skills` | Agent 技能包（meeting-api / user-api 参考） |

> 本站点承载 **项目级业务文档**（定位、项目书、架构、路线图、方案沉淀）；各代码仓库的技术文档仍由各自仓库维护。
