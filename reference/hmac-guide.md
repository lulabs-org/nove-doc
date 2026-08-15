# HMAC 项目实战指南（工程向）

> 适用场景：API 签名、微服务通信、Webhook 校验、开放平台安全

---

## 一、为什么项目中要用 HMAC

在真实项目中，我们常常面临以下安全问题：

- 请求参数被篡改
- 请求被伪造（伪装成合法客户端）
- 请求被重放（Replay Attack）

**HMAC** 是一种成本低、实现简单、工程上非常成熟的解决方案，广泛用于：
- 云厂商 API（AWS / 阿里云 / 腾讯云）
- 支付接口
- 内部微服务鉴权
- Webhook 签名校验

---

## 二、典型架构示意

```
Client                      Server
  | ---- 请求 + HMAC -----> |
  |                         | 校验 HMAC
  | <---- 响应 -------------|
```

双方**提前共享密钥（Secret Key）**，请求中携带签名，服务端负责验证。

---

## 三、API 请求签名实战（核心）

### 1️⃣ 约定签名规则（非常关键）

双方必须 **严格一致**：

- 哈希算法：HMAC-SHA256
- 参数排序：ASCII 升序
- 编码方式：UTF-8
- 拼接格式：`key=value&key=value`
- 是否包含 body / header / timestamp

---

### 2️⃣ 示例请求参数

```json
{
  "userId": "10001",
  "amount": "99.00",
  "timestamp": "1700000000"
}
```

---

### 3️⃣ 客户端生成签名（Python）

```python
import hmac
import hashlib

secret = "my_secret_key"

params = {
    "amount": "99.00",
    "timestamp": "1700000000",
    "userId": "10001"
}

# 1. 参数排序
query = "&".join(f"{k}={params[k]}" for k in sorted(params))

# 2. 计算 HMAC
signature = hmac.new(
    secret.encode(),
    query.encode(),
    hashlib.sha256
).hexdigest()

print(signature)
```

最终请求示例：

```
POST /pay
Headers:
X-Signature: <signature>
```

---

### 4️⃣ 服务端验证签名（Python）

```python
def verify_signature(params, client_signature, secret):
    query = "&".join(f"{k}={params[k]}" for k in sorted(params))
    server_signature = hmac.new(
        secret.encode(),
        query.encode(),
        hashlib.sha256
    ).hexdigest()

    return hmac.compare_digest(server_signature, client_signature)
```

> ✅ 一定要使用 `compare_digest` 防止时序攻击

---

## 四、防重放攻击（项目必做）

仅 HMAC **不足以防止重放攻击**，必须结合以下机制：

### ✅ 时间戳（timestamp）

- 请求中包含时间戳
- 服务端校验时间窗口（如 ±5 分钟）

```python
if abs(now - timestamp) > 300:
    reject()
```

---

### ✅ nonce（一次性随机数）

- 客户端生成随机 nonce
- 服务端缓存已用 nonce（Redis）
- 同一个 nonce 只能使用一次

---

## 五、Webhook 签名校验实战

### 场景

第三方平台向你推送事件（如支付成功），你需要确认：
- 请求来自官方
- 数据未被篡改

---

### 示例（Node.js）

```js
const crypto = require("crypto");

function verifyWebhook(body, signature, secret) {
  const hmac = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(hmac),
    Buffer.from(signature)
  );
}
```

---

## 六、常见踩坑总结（非常重要）

❌ 参数顺序不一致  
❌ 客户端和服务端编码不一致  
❌ body 是否参与签名未约定  
❌ 使用 MD5 / SHA1  
❌ 密钥硬编码在代码仓库  
❌ 没有防重放机制  

---

## 七、密钥管理最佳实践

- 每个客户端 **独立密钥**
- 支持 **密钥轮换**
- 存储在：
  - KMS
  - 环境变量
  - 安全配置中心
- 禁止明文日志打印

---

## 八、什么时候不该用 HMAC？

- 需要**非对称认证** → 使用 RSA / ECDSA
- 需要**加密数据** → 使用 HTTPS / AES
- 公网第三方无法安全分发密钥的场景

---

## 九、项目级总结

✔ HMAC 非常适合 **服务端到服务端**  
✔ 成本低、实现简单、性能高  
✔ 一定要结合 **timestamp + nonce**  
✔ 规则文档比代码更重要  

---

**文档类型**：项目实战 / 工程实践  
**适用人群**：后端工程师 / 架构师 / API 设计者
