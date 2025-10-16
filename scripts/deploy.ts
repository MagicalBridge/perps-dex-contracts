import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

async function main() {
  console.log("=".repeat(60));
  console.log("开始部署 Bridge2 合约到 Arbitrum Sepolia");
  console.log("=".repeat(60));

  // 获取部署账户
  const [deployer] = await ethers.getSigners();
  console.log("\n📍 部署账户:", deployer.address);
  
  const balance = await deployer.getBalance();
  console.log("💰 账户余额:", ethers.utils.formatEther(balance), "ETH");

  if (balance.isZero()) {
    console.error("\n❌ 错误: 账户余额为零，请先获取测试 ETH");
    console.log("水龙头: https://faucet.quicknode.com/arbitrum/sepolia");
    process.exit(1);
  }

  // 从环境变量读取构造函数参数
  const hotAddresses = process.env.HOT_VALIDATOR_ADDRESSES?.split(",") || [];
  const coldAddresses = process.env.COLD_VALIDATOR_ADDRESSES?.split(",") || [];
  const powers = process.env.VALIDATOR_POWERS?.split(",").map((p) => p.trim()) || [];
  const usdcAddress = process.env.USDC_ADDRESS || "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d";
  const disputePeriodSeconds = process.env.DISPUTE_PERIOD_SECONDS || "86400";
  const blockDurationMillis = process.env.BLOCK_DURATION_MILLIS || "250";
  const lockerThreshold = process.env.LOCKER_THRESHOLD || "2";

  // 验证参数
  if (hotAddresses.length === 0 || coldAddresses.length === 0) {
    console.error("\n❌ 错误: 验证者地址未配置");
    console.log("请在 .env 文件中配置 HOT_VALIDATOR_ADDRESSES 和 COLD_VALIDATOR_ADDRESSES");
    process.exit(1);
  }

  if (hotAddresses.length !== coldAddresses.length || hotAddresses.length !== powers.length) {
    console.error("\n❌ 错误: 验证者地址和权重数量不匹配");
    console.log(`Hot 地址数: ${hotAddresses.length}`);
    console.log(`Cold 地址数: ${coldAddresses.length}`);
    console.log(`权重数: ${powers.length}`);
    process.exit(1);
  }

  console.log("\n📋 构造函数参数:");
  console.log("─".repeat(60));
  console.log("Hot Validators:");
  hotAddresses.forEach((addr, i) => console.log(`  ${i + 1}. ${addr}`));
  console.log("\nCold Validators:");
  coldAddresses.forEach((addr, i) => console.log(`  ${i + 1}. ${addr}`));
  console.log("\nPowers:", powers.join(", "));
  console.log("USDC Address:", usdcAddress);
  console.log("Dispute Period:", disputePeriodSeconds, "seconds");
  console.log("Block Duration:", blockDurationMillis, "ms");
  console.log("Locker Threshold:", lockerThreshold);
  console.log("─".repeat(60));

  // 部署合约
  console.log("\n🚀 正在部署合约...");
  
  const Bridge2 = await ethers.getContractFactory("Bridge2");
  const bridge2 = await Bridge2.deploy(
    hotAddresses,
    coldAddresses,
    powers,
    usdcAddress,
    disputePeriodSeconds,
    blockDurationMillis,
    lockerThreshold
  );

  console.log("⏳ 等待合约部署确认...");
  await bridge2.deployed();

  console.log("\n" + "=".repeat(60));
  console.log("✅ Bridge2 合约部署成功!");
  console.log("=".repeat(60));
  console.log("\n📍 合约地址:", bridge2.address);
  console.log("📍 部署交易:", bridge2.deployTransaction.hash);
  console.log("📍 区块号:", bridge2.deployTransaction.blockNumber);
  console.log("\n🔍 在 Arbiscan 查看:");
  console.log(`   https://sepolia.arbiscan.io/address/${bridge2.address}`);
  console.log("\n🔍 查看交易:");
  console.log(`   https://sepolia.arbiscan.io/tx/${bridge2.deployTransaction.hash}`);

  // 保存部署信息
  const deploymentInfo = {
    network: "arbitrumSepolia",
    chainId: 421614,
    contractAddress: bridge2.address,
    deployerAddress: deployer.address,
    transactionHash: bridge2.deployTransaction.hash,
    blockNumber: bridge2.deployTransaction.blockNumber,
    timestamp: new Date().toISOString(),
    constructorArgs: {
      hotAddresses,
      coldAddresses,
      powers,
      usdcAddress,
      disputePeriodSeconds,
      blockDurationMillis,
      lockerThreshold,
    },
  };

  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const deploymentFile = path.join(deploymentsDir, `Bridge2-${Date.now()}.json`);
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
  
  console.log("\n💾 部署信息已保存到:", deploymentFile);

  // 等待几个区块后验证
  console.log("\n⏳ 等待 6 个区块确认后再验证合约...");
  await bridge2.deployTransaction.wait(6);

  console.log("\n✅ 已确认 6 个区块");
  console.log("\n📝 现在可以运行验证命令:");
  console.log(`   pnpm run verify:arbitrum-sepolia`);
  console.log("\n或手动验证:");
  console.log(`   npx hardhat verify --network arbitrumSepolia ${bridge2.address} \\`);
  hotAddresses.forEach((addr) => console.log(`     "${addr}" \\`));
  console.log("     # ... 其他参数");

  console.log("\n" + "=".repeat(60));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ 部署失败:");
    console.error(error);
    process.exit(1);
  });

