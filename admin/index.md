<!--
 * @Author: 杨仕明 shiming.y@qq.com
 * @Date: 2026-01-07 06:02:18
 * @LastEditors: 杨仕明 shiming.y@qq.com
 * @LastEditTime: 2026-01-07 06:03:44
 * @FilePath: /nove-doc/nove-admin/技术栈选型.md
 * @Description: 技术栈选型文档
-->

## 技术栈选型

- **构建**：Vite
- **框架**：React 18 + TypeScript
- **路由**：React Router v6
- **状态**：TanStack Query（服务端状态） + Zustand（少量全局 UI 状态）
- **表单**：React Hook Form + Zod
- **表格**：后台高频 → TanStack Table（可配合虚拟滚动）
- **UI 组件**：Ant Design / Arco Design / Mantine 三选一
  - 想"后台效率"就 AntD/Arco
  - 想"高级感 + 可定制"就 Mantine
- **权限**：前端 RBAC/ABAC（见下）
- **HTTP**：axios（或 fetch + 封装）
- **工程质量**：ESLint + Prettier + Husky + lint-staged + commitlint
- **测试**：Vitest（单测）+ Playwright（E2E）
- **可观测**：Sentry（异常）+ OpenTelemetry（可选）+ 前端埋点