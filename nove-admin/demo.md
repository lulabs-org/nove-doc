<!--
 * @Author: 杨仕明 shiming.y@qq.com
 * @Date: 2026-01-07 05:18:17
 * @LastEditors: 杨仕明 shiming.y@qq.com
 * @LastEditTime: 2026-01-07 05:28:23
 * @FilePath: /nove-doc/nove-admin/demo.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# 架构设计

## 1. 模块化设计

### 目录结构
建议采用插件化架构：

```
src/
├── core/              # 核心功能
│   ├── auth/
│   ├── permissions/
│   └── i18n/
├── features/          # 业务功能模块
│   ├── user-management/
│   ├── course-management/
│   └── analytics/
└── shared/            # 共享资源
```

### 关键点

- 每个功能模块独立开发、测试、部署
- 模块间通过明确的接口通信
- 支持模块的动态加载

## 2. 技术栈

### 核心技术
- **状态管理**: Zustand
- **API调用**: Axios
- **代码组织**: 按功能模块
- **表单验证**: Ant Form 和 RHF + Zod

### 测试框架
- Vitest + Testing Library

### API生成
- orval

## 3. 依赖包

```json
{
  "vitest": "^4.0.16",
  "jsdom": "^27.4.0",
  "fast-check": "^4.5.3",
  "react-router-dom": "^7.11.0",
  "@ant-design/icons": "^6.1.0",
  "antd": "^6.1.4"
}
```