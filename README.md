# Hyperliquid Perps DEX Contracts

[![License: UNLICENSED](https://img.shields.io/badge/License-UNLICENSED-red.svg)](https://opensource.org/licenses/Unlicense)
[![Solidity](https://img.shields.io/badge/Solidity-^0.8.9-blue.svg)](https://soliditylang.org/)
[![Arbitrum](https://img.shields.io/badge/Network-Arbitrum-2B353B.svg)](https://arbitrum.io/)

## 📋 项目概述

这是一个运行在Arbitrum上的跨链桥合约项目，与Hyperliquid L1协同工作。该项目实现了安全的USDC跨链转移机制，支持验证者集合更新、存款、提款等核心功能。

## 🏗️ 项目架构

### 核心合约

- **`Bridge2.sol`** - 主要的跨链桥合约，处理USDC的跨链转移
- **`Signature.sol`** - 签名验证工具库，提供EIP-712签名功能

### 技术栈

- **Solidity**: ^0.8.9
- **OpenZeppelin**: 4.7.3
- **Arbitrum Nitro**: 1.1.0
- **Hardhat**: ^3.0.6
- **TypeScript**: ~5.8.3

## 🔐 安全机制

### 验证者系统
- 每个验证者拥有热钱包（内存中）和冷钱包
- 自动提款和验证者集合更新需要2/3验证者权力签名
- 热钱包用于日常操作，冷钱包用于紧急解锁

### 争议期机制
- 所有提款和验证者集合更新都有争议期
- 争议期内，任何锁定者可以锁定桥合约
- 争议期结束后才能最终确定操作

### 多重安全层
1. **锁定者 (Lockers)**: 可以锁定合约防止恶意操作
2. **最终确定者 (Finalizers)**: 负责最终确定提款和更新
3. **争议期**: 提供额外的安全检查时间

## 🚀 快速开始

### 环境要求

- Node.js 20.19.2+ (推荐 22.10.0+)
- pnpm 10.11.0+

### 安装依赖

```bash
pnpm install
```

### 编译合约

```bash
pnpm build
```

### 运行测试

```bash
pnpm test
```

### 清理构建

```bash
pnpm clean
```

## 📁 项目结构

```
perps-dex-contracts/
├── contracts/                 # 智能合约源码
│   ├── Bridge2.sol           # 主桥合约
│   └── Signature.sol         # 签名工具库
├── test/                     # 测试文件
├── scripts/                  # 部署脚本
├── ignition/                 # Hardhat Ignition模块
├── docs/                     # 文档
├── hardhat.config.ts         # Hardhat配置
├── package.json              # 项目依赖
└── README.md                 # 项目说明
```

## 🔧 配置说明

### Hardhat配置

项目使用Hardhat作为开发框架，支持以下网络：

- **hardhatMainnet**: EDR模拟L1网络
- **hardhatOp**: EDR模拟OP网络  
- **sepolia**: Sepolia测试网

### 编译器设置

- **Solidity版本**: 0.8.9
- **优化器**: 启用，运行200次
- **EVM版本**: 默认

## 💡 核心功能

### 1. 存款 (Deposits)
- 用户通过`batchedDepositWithPermit`函数存入USDC
- 支持ERC20 Permit机制，无需预授权
- 存款事件由L1验证者监听并签名

### 2. 提款 (Withdrawals)
- 两阶段提款流程：请求 → 最终确定
- 需要验证者签名确认
- 支持批量提款操作

### 3. 验证者集合更新
- 支持动态更新验证者集合
- 需要当前验证者2/3权力签名
- 更新后进入争议期

### 4. 紧急机制
- 锁定者可以投票锁定合约
- 冷钱包签名可以紧急解锁
- 支持参数调整（争议期、区块时长等）

## 🛡️ 安全特性

### 重入攻击防护
- 使用OpenZeppelin的`ReentrancyGuard`
- 所有外部调用都有重入保护

### 暂停机制
- 继承`Pausable`合约
- 紧急情况下可以暂停所有操作

### 签名验证
- 使用EIP-712标准签名
- 支持批量签名验证
- 防止签名重放攻击

## 📊 事件系统

合约发出以下关键事件：

- `Deposit`: 存款事件
- `RequestedWithdrawal`: 提款请求
- `FinalizedWithdrawal`: 提款完成
- `RequestedValidatorSetUpdate`: 验证者集合更新请求
- `FinalizedValidatorSetUpdate`: 验证者集合更新完成
- `FailedWithdrawal`: 提款失败
- `ModifiedLocker`: 锁定者状态变更
- `ModifiedFinalizer`: 最终确定者状态变更

## 🔍 开发指南

### 添加新功能

1. 在`contracts/`目录下创建新合约
2. 编写相应的测试用例
3. 更新文档说明

### 部署合约

1. 配置网络参数
2. 运行部署脚本
3. 验证合约部署

### 测试

项目使用Hardhat测试框架，支持：

- 单元测试
- 集成测试
- Gas优化测试

## 📝 许可证

本项目采用UNLICENSED许可证。

## 🤝 贡献指南

1. Fork项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 创建Issue
- 提交Pull Request
- 联系开发团队

---

**注意**: 这是一个生产级合约项目，请在主网部署前进行充分测试和审计。
