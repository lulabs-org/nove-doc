# nove-doc

nove 项目级文档中心（VitePress 站点），承载**跨子项目的业务文档**：

- 定位：组织级 Agent 数据基础设施（数据网关）——让组织数据成为 AI 与 Agent 可安全调用的资产
- 项目书总览、项目概述、架构与技术、路线图、权限安全与合规
- 技术参考（HMAC 等）与历史方案归档

> 各代码仓库（`nove_api` / `nove-admin` / `nove-cli` / `nove-skills`）的技术文档仍由各自仓库维护；本站只收录项目级文档。

## 本地开发

```bash
pnpm install
pnpm docs:dev        # http://localhost:5173
```

## 构建与预览

```bash
pnpm docs:build      # 产物输出到 .vitepress/dist
pnpm docs:preview    # 本地预览构建产物
```

## 站点结构

```
.
├── index.md                    # 首页（按板块导航）
├── guide/                      # 项目总览
│   ├── index.md                # 板块索引（文档导航页）
│   ├── overview.md             # 项目概述（定位/愿景/系统定位/特点/历史沿革/术语）
│   ├── requirements.md         # 需求与范围
│   ├── goals.md                # 目标与成功指标（KPI）
│   ├── organization.md         # 组织与运营（分工/风险/预算）
│   └── naming.md               # 项目名称
├── partners/                   # 合作方与落地场景
│   ├── index.md                # 板块索引（文档导航页）
│   └── lulabs.md               # 陆向谦实验室（首个落地客户）
├── architecture/               # 架构与技术（板块索引 / 总览 / 架构图集 / 技术白皮书）
├── roadmap/                    # 路线图（板块索引 / 实施路线图 / 三年演进路线图）
├── security/                   # 权限安全与合规（板块索引 / 人机统一权限 / 数据隐私白皮书）
├── reference/                  # 技术参考（板块索引 / HMAC 介绍 / 实战指南）
├── archive/                    # 历史方案归档（板块索引 / v1.0 技术框架 / EduMind 构想 / 合作方资料）
└── .vitepress/                 # VitePress 配置与主题
```

## 约定

- 新项目级文档按上述分类放入对应目录，并同步更新 `.vitepress/config.mts` 的导航与侧边栏。
- `.qoder/` 为 Qoder 工具生成内容，不入站、不维护。
- OpenAPI 契约等 API 产物不属于站点内容，一律不入本仓库（从 nove-api 的 Swagger 实时获取）。
- 各代码仓库的规划期方案 / 工程文档归各自仓库维护（如 nove-admin 的工程文档在 `nove-admin/docs/`），本仓库只保留项目级文档。
