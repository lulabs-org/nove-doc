<!--
 * @Author: 杨仕明 shiming.y@qq.com
 * @Date: 2026-01-07 00:50:32
 * @LastEditors: 杨仕明 shiming.y@qq.com
 * @LastEditTime: 2026-01-07 05:40:50
 * @FilePath: /nove-doc/demo.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

# nove 技术方案总览（NestJS + FastAPI）

## 一、整体架构

nove 采用 **前后端分离 + AI 服务独立** 的架构：

- **nove-admin**：后台管理系统（Vite+React+TS + Ant Design Pro）
- **nove-api**：主业务后端（NestJS）
- **nove-ai**：AI 智能服务（FastAPI + Python）
- **PostgreSQL**：核心业务数据库
- **Redis**：缓存 / 会话 / 异步任务状态
- **消息队列（可选）**：RabbitMQ / Redis Stream
- **对象存储（可选）**：OSS / S3 / COS

```
nove-admin  -->  nove-api  -->  nove-ai
                   |
                   v
              PostgreSQL / Redis
```

---

## 二、为什么 AI 服务要独立（FastAPI）

- Python 是 AI / 数据 / LLM 生态事实标准
- AI 推理慢、依赖重，不应拖慢主业务
- AI 迭代频繁，需独立部署、回滚
- 未来可单独扩容 / 上 GPU

**结论：AI = 独立服务，不是业务模块。**

---

## 三、nove-ai（FastAPI）职责

### 核心能力（MVP）

1. 学员画像（Profile）
2. 个性化学习路径生成
3. 作业 / 测验诊断
4. 阶段性学习报告生成
5. 受控 AI 助教点评

**原则：**
- 只做“智能计算”，不存业务真相
- 返回结构化 JSON 为主，文本为辅
- 慢任务一律异步 Job 化

---

## 四、nove-ai 第一批接口清单（MVP）

### 运维
- `GET /health`
- `GET /meta`

### 画像
- `POST /v1/profile/build`
- `GET /v1/profile/{student_id}`

### 学习路径
- `POST /v1/learning-path/generate`
- `POST /v1/learning-path/refine`（P1）

### 评测
- `POST /v1/assessment/diagnose`

### 报告
- `POST /v1/report/generate`（异步）
- `GET /v1/report/{report_id}`

### Job
- `GET /v1/jobs/{job_id}`
- `POST /v1/jobs/{job_id}/cancel`（P1）

---

## 五、nove-api（NestJS）侧 AI 调用封装

### 设计原则

- 所有 AI 调用统一封装为 **AiClient**
- 禁止 Controller 直接调用 AI
- 必须支持：超时、重试、熔断、降级
- AI 不可成为单点故障

---

### 目录结构

```
src/ai/
├── ai.module.ts
├── ai.client.ts
├── ai.config.ts
├── ai.fallback.ts
├── ai.types.ts
└── dto/
```

---

### 技术选型

- HTTP：NestJS HttpModule (axios)
- 重试：axios-retry
- 熔断：opossum
- 日志：Nest Logger

---

### 核心能力

- 自动重试（网络 / 5xx）
- 熔断保护（错误率阈值）
- 统一 Header（TraceId / 鉴权）
- 降级兜底（fallback）

---

## 六、服务间鉴权方案：HMAC

### HMAC 是什么？

> HMAC（Hash-based Message Authentication Code）  
> 使用 **共享密钥 + 哈希算法** 对请求内容签名，用于：
> - 身份校验（是不是自己服务）
> - 防篡改
> - 防重放（配合 timestamp）

---

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

---

### 为什么 MVP 选 HMAC

- 服务数量少
- 实现简单、性能高
- 无需复杂证书 / 公钥体系

> 后期服务多了 / 对外开放 → 可升级为 Service JWT

---

## 七、异步任务（Job）模型

适用于：
- 画像重建
- 报告生成
- 批量评测

### 标准状态
- queued
- running
- succeeded
- failed

**nove-api 接单，nove-ai 计算，结果回写数据库**

---

## 八、关键工程共识（非常重要）

- AI 是加速器，不是单点故障
- 结构化输出 > 文本生成
- 所有 AI 接口必须可观测
- 字段稳定性 > 模型聪明程度
- MVP 先可用，再智能

---

## 九、最终技术选型结论

**后端主业务**
- NestJS + TypeScript

**AI 服务**
- FastAPI + Python

**数据**
- PostgreSQL + Redis

**部署**
- Docker 起步 → Kubernetes

---

## 十、一句话总结

> nove =  
> **NestJS 承载业务秩序**  
> **FastAPI 承载智能决策**  
> **AI 独立演进，但永远服务于“太子洗马式个性化教育”**
