# nove-doc

nove 项目级文档中心（VitePress 站点），承载**跨子项目的业务文档**：

- 定位：个人 / 组织 / 企业智能数据仓库与 Agent 数据基础设施
- 项目书、白皮书、路线图
- 架构与技术方案探讨
- 管理后台方案与草稿

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
├── index.md                    # 首页
├── guide/                      # 项目总览（介绍 / 概述 / 名称 / 陆向谦实验室）
├── project-book.md             # NOVE 项目书
├── architecture/               # 架构与技术（总览 / 图集 / 方案探讨 / 白皮书 / HMAC 参考）
├── roadmap/                    # 实施路线图 / 三年演进路线图
├── compliance/                 # 数据隐私白皮书
├── admin/                      # 管理后台方案与草稿
└── .vitepress/                 # VitePress 配置与主题
```

## 约定

- 新项目级文档按上述分类放入对应目录，并同步更新 `.vitepress/config.mts` 的导航与侧边栏。
- `.qoder/` 为 Qoder 工具生成内容，不入站、不维护。
- OpenAPI 契约等 API 产物不属于站点内容，一律不入本仓库（从 nove-api 的 Swagger 实时获取）。
