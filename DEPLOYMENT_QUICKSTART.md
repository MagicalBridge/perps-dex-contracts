# 快速部署指南

## 🚀 快速开始（3步完成部署）

### 1️⃣ 配置环境变量

```bash
# 复制环境变量模板
cp env.example .env
```

编辑 `.env` 文件，至少配置以下内容：

```env
# 你的私钥（不带 0x）
PRIVATE_KEY=你的私钥

# Arbiscan API Key（用于验证合约）
ARBISCAN_API_KEY=你的API密钥

# 验证者配置
HOT_VALIDATOR_ADDRESSES=地址1,地址2
COLD_VALIDATOR_ADDRESSES=地址3,地址4
VALIDATOR_POWERS=100,100

# USDC 地址（Arbitrum Sepolia 测试网）
USDC_ADDRESS=0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d
```

### 2️⃣ 获取测试 ETH

访问水龙头获取 Arbitrum Sepolia 测试 ETH：
- https://faucet.quicknode.com/arbitrum/sepolia
- https://faucet.triangleplatform.com/arbitrum/sepolia

### 3️⃣ 部署并验证

```bash
# 一键部署并自动验证合约
pnpm run deploy:arbitrum-sepolia:verify
```

## ✅ 完成！

部署成功后，你可以在以下位置查看：
- 终端输出会显示合约地址
- 部署信息保存在 `ignition/deployments/` 目录
- 在 Arbiscan 查看: https://sepolia.arbiscan.io

---

## 📚 详细文档

需要更多信息？查看完整的部署指南：
- [完整部署指南](./docs/部署指南.md)

## 🔗 重要链接

- **网络**: Arbitrum Sepolia (Chain ID: 421614)
- **RPC**: https://sepolia-rollup.arbitrum.io/rpc
- **浏览器**: https://sepolia.arbiscan.io
- **水龙头**: https://faucet.quicknode.com/arbitrum/sepolia

## ⚠️ 注意事项

1. 确保 `.env` 文件已配置正确
2. 账户需要有足够的 ETH 支付 gas
3. 不要将 `.env` 文件提交到 Git
4. Arbiscan API Key 可以在 https://arbiscan.io/myapikey 获取

## 🆘 遇到问题？

常见问题解决方案：

**余额不足** → 访问水龙头获取测试 ETH  
**验证失败** → 检查 ARBISCAN_API_KEY 是否正确  
**参数错误** → 确保验证者地址和权重数量一致  

