---
layout: home

hero:
  name: nove
  text: 「太子洗马」式个性化智能教育平台
  tagline: 让每一位学员都享受如同古代太子般的顶级教育服务 —— AI 智能系统与专属导师团队协同，实现因材施教、一生一案、全程陪伴式成长。
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
  - icon: 🎓
    title: 一生一案
    details: 每位学员拥有唯一、长期、持续演进的个人成长档案，方案随能力、兴趣与目标动态调整。
  - icon: 🧠
    title: 因材施教
    details: 基于能力水平、学习风格与节奏差异，自动生成差异化教学与练习内容。
  - icon: 🤖
    title: AI 全程辅助
    details: 学前评估、学中指导、学后总结，AI 全程参与但永不取代人类判断。
  - icon: 📈
    title: 实时追踪与反馈
    details: 学习进度、理解程度与薄弱点实时可视化，支持学生、教师、管理者多视角查看。
  - icon: 🤝
    title: 人机协作体系
    details: AI 负责数据、分析、推荐与自动化；人负责判断、引导、激励与价值塑造。
  - icon: 🚀
    title: 从实验室到平台
    details: 首个落地客户为陆向谦实验室，逐步拓展至教育机构、高校与企业培训，构建新一代智能教育基础设施。
---

## 项目文档导航

- **项目总览** — [项目介绍](/guide/)、[项目完整概述](/guide/overview)、[项目名称](/guide/naming)、[陆向谦实验室介绍](/guide/lulabs)
- **项目书** — [NOVE 项目书](/project-book)（实验室 AI 智脑与教育中台）
- **架构与技术** — [技术方案总览](/architecture/overview)、[系统架构图集](/architecture/system-overview)、[技术框架方案探讨](/architecture/tech-framework)、[EduMind 完整方案构思](/architecture/edumind-plan)、[技术白皮书](/architecture/whitepaper)
- **路线图** — [实施路线图](/roadmap/implementation)、[三年技术与 AI 演进路线图](/roadmap/evolution)
- **数据与合规** — [数据隐私白皮书](/compliance/privacy-whitepaper)
- **管理后台方案** — [技术栈选型](/admin/)、[开发路线](/admin/development-roadmap)、[架构落地方案](/admin/architecture-plan)

## 相关仓库

| 仓库 | 说明 |
| --- | --- |
| `nove_api` | 主业务后端（NestJS + Prisma + PostgreSQL + Redis），技术文档见 `nove_api/docs/` |
| `nove-admin` | 后台管理系统（React + Vite + Ant Design） |
| `nove-cli` | 命令行工具（oclif） |
| `nove-skills` | Agent 技能包（meeting-api / user-api 参考） |
| `nove-ai` | AI 智能服务（FastAPI + Python，规划中） |

> 本站点用于承载 **项目级业务文档**（愿景、项目书、架构、路线图、方案沉淀）；各代码仓库的技术文档仍由各自仓库维护。
