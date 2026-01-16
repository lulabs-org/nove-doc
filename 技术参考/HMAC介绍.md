# HMAC（Hash-based Message Authentication Code）介绍

## 一、什么是 HMAC

**HMAC**（基于哈希的消息认证码）是一种用于验证消息**完整性**和**真实性**的密码学机制。  
它结合了**密钥（Secret Key）**和**哈希函数（Hash Function）**，生成一个固定长度的认证码（MAC）。

常见用途包括：
- API 请求签名
- 消息防篡改校验
- 身份认证与数据完整性验证

---

## 二、HMAC 的核心作用

HMAC 主要解决两个问题：

1. **数据是否被篡改**
2. **数据是否来自可信的发送方**

只要密钥不泄露，攻击者就无法伪造合法的 HMAC。

---

## 三、HMAC 的工作原理

HMAC 的计算公式如下：

```
HMAC(K, m) = H((K ⊕ opad) || H((K ⊕ ipad) || m))
```

其中：
- `H`：哈希函数（如 SHA-256）
- `K`：密钥
- `m`：消息
- `ipad`：内部填充常量（0x36）
- `opad`：外部填充常量（0x5c）
- `||`：拼接操作

### 简化流程

1. 对密钥进行长度处理
2. 密钥与 `ipad` 异或后拼接消息并哈希
3. 将结果与 `opad` 异或后的密钥再次哈希
4. 得到最终的 HMAC 值

---

## 四、常见的 HMAC 算法

| HMAC 变体 | 使用的哈希算法 | 输出长度 |
|----------|----------------|----------|
| HMAC-MD5 | MD5            | 128 bit  |
| HMAC-SHA1 | SHA-1         | 160 bit  |
| HMAC-SHA256 | SHA-256     | 256 bit  |
| HMAC-SHA512 | SHA-512     | 512 bit  |

> ✅ **推荐使用：HMAC-SHA256 或 HMAC-SHA512**

---

## 五、HMAC 与 Hash 的区别

| 对比项 | Hash | HMAC |
|------|------|------|
| 是否使用密钥 | ❌ 否 | ✅ 是 |
| 防篡改 | 部分 | ✅ 强 |
| 防伪造 | ❌ 否 | ✅ 是 |
| 典型用途 | 数据校验 | 身份认证、签名 |

---

## 六、HMAC 示例

### Python 示例

```python
import hmac
import hashlib

key = b'secret_key'
message = b'hello world'

signature = hmac.new(key, message, hashlib.sha256).hexdigest()
print(signature)
```

### Java 示例

```java
Mac mac = Mac.getInstance("HmacSHA256");
SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "HmacSHA256");
mac.init(keySpec);
byte[] rawHmac = mac.doFinal(dataBytes);
```

---

## 七、安全使用建议

1. 使用**足够长且随机的密钥**
2. 避免使用已不安全的哈希算法（如 MD5、SHA-1）
3. HMAC 只保证完整性与认证，不提供加密
4. 密钥必须安全存储，避免硬编码

---

## 八、总结

- HMAC 是一种**对称密钥**消息认证机制
- 广泛用于 API 安全、网络通信和身份认证
- 推荐使用 **HMAC-SHA256+安全密钥管理**

---

**文件格式**：Markdown  
**适合用途**：技术文档、博客、开发说明
