# 🚀 快速开始指南

## 一键部署流程

### 1️⃣ 安装依赖

```bash
pnpm install
```

### 2️⃣ 配置环境变量

编辑 `.env` 文件：

```env
PRIVATE_KEY=0x你的私钥
ARBISCAN_API_KEY=你的API密钥
HOT_VALIDATOR_ADDRESSES=0x地址1,0x地址2
COLD_VALIDATOR_ADDRESSES=0x地址3,0x地址4
VALIDATOR_POWERS=100,100
```

### 3️⃣ 编译合约

```bash
pnpm run compile
```

### 4️⃣ 部署合约

```bash
pnpm run deploy:arbitrum-sepolia
```

### 5️⃣ 验证合约

```bash
pnpm run verify:arbitrum-sepolia
```

---

## ✅ 完成！

部署成功后，您可以：
- 在 Arbiscan 查看合约
- 使用脚本与合约交互
- 编写测试用例

---

## 📋 可用命令

| 命令 | 说明 |
|------|------|
| `pnpm run compile` | 编译合约 |
| `pnpm run clean` | 清理缓存 |
| `pnpm run test` | 运行测试 |
| `pnpm run deploy:arbitrum-sepolia` | 部署到测试网 |
| `pnpm run verify:arbitrum-sepolia` | 验证合约 |

---

## 🔗 重要链接

- **最新部署**: 0x8bcbe680c8d401C1a3024A9364445232E04De64E
- **Arbiscan**: https://sepolia.arbiscan.io/address/0x8bcbe680c8d401C1a3024A9364445232E04De64E
- **水龙头**: https://faucet.quicknode.com/arbitrum/sepolia

---

## 📚 详细文档

- [完整部署文档](./HARDHAT_2X_DEPLOYMENT.md)
- [合约部署指南](./docs/部署指南.md)

---

**当前版本**: Hardhat 2.x (稳定版)

