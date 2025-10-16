import { run } from "hardhat";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

async function main() {
  console.log("=".repeat(60));
  console.log("开始验证 Bridge2 合约");
  console.log("=".repeat(60));

  // 读取最新的部署信息
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  
  if (!fs.existsSync(deploymentsDir)) {
    console.error("\n❌ 错误: 未找到部署记录目录");
    console.log("请先运行部署命令: pnpm run deploy:arbitrum-sepolia");
    process.exit(1);
  }

  const files = fs.readdirSync(deploymentsDir)
    .filter((f) => f.startsWith("Bridge2-") && f.endsWith(".json"))
    .sort()
    .reverse();

  if (files.length === 0) {
    console.error("\n❌ 错误: 未找到部署记录");
    console.log("请先运行部署命令: pnpm run deploy:arbitrum-sepolia");
    process.exit(1);
  }

  const latestDeployment = files[0];
  const deploymentPath = path.join(deploymentsDir, latestDeployment);
  const deploymentInfo = JSON.parse(fs.readFileSync(deploymentPath, "utf-8"));

  console.log("\n📍 合约地址:", deploymentInfo.contractAddress);
  console.log("📍 部署时间:", deploymentInfo.timestamp);
  console.log("📍 部署交易:", deploymentInfo.transactionHash);

  console.log("\n📋 构造函数参数:");
  console.log("─".repeat(60));
  const args = deploymentInfo.constructorArgs;
  console.log("Hot Validators:", args.hotAddresses);
  console.log("Cold Validators:", args.coldAddresses);
  console.log("Powers:", args.powers);
  console.log("USDC Address:", args.usdcAddress);
  console.log("Dispute Period:", args.disputePeriodSeconds);
  console.log("Block Duration:", args.blockDurationMillis);
  console.log("Locker Threshold:", args.lockerThreshold);
  console.log("─".repeat(60));

  console.log("\n🔍 正在验证合约...");

  try {
    await run("verify:verify", {
      address: deploymentInfo.contractAddress,
      constructorArguments: [
        args.hotAddresses,
        args.coldAddresses,
        args.powers,
        args.usdcAddress,
        args.disputePeriodSeconds,
        args.blockDurationMillis,
        args.lockerThreshold,
      ],
    });

    console.log("\n" + "=".repeat(60));
    console.log("✅ 合约验证成功!");
    console.log("=".repeat(60));
    console.log("\n🔍 在 Arbiscan 查看验证结果:");
    console.log(`   https://sepolia.arbiscan.io/address/${deploymentInfo.contractAddress}#code`);
    
  } catch (error: any) {
    if (error.message.includes("Already Verified")) {
      console.log("\n✅ 合约已经验证过了");
      console.log(`   https://sepolia.arbiscan.io/address/${deploymentInfo.contractAddress}#code`);
    } else {
      console.error("\n❌ 验证失败:");
      console.error(error.message);
      console.log("\n💡 提示:");
      console.log("1. 确保 ARBISCAN_API_KEY 在 .env 中正确配置");
      console.log("2. 等待几分钟后再试（合约可能还未被索引）");
      console.log("3. 检查网络连接");
      console.log("\n或通过 Arbiscan 界面手动验证:");
      console.log(`   https://sepolia.arbiscan.io/address/${deploymentInfo.contractAddress}#code`);
      process.exit(1);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ 错误:");
    console.error(error);
    process.exit(1);
  });

