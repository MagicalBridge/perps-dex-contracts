// @ts-nocheck
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("Bridge2Module", (m) => {
  // 从环境变量或使用默认值获取构造函数参数
  
  // 验证者地址参数
  const hotAddressesParam = m.getParameter(
    "hotAddresses",
    process.env.HOT_VALIDATOR_ADDRESSES?.split(",") || []
  );
  
  const coldAddressesParam = m.getParameter(
    "coldAddresses",
    process.env.COLD_VALIDATOR_ADDRESSES?.split(",") || []
  );
  
  const powersParam = m.getParameter(
    "powers",
    process.env.VALIDATOR_POWERS?.split(",").map((p: string) => BigInt(p)) || []
  );
  
  // USDC 代币地址
  const usdcAddressParam = m.getParameter(
    "usdcAddress",
    process.env.USDC_ADDRESS || "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d"
  );
  
  // 争议期（秒）
  const disputePeriodSecondsParam = m.getParameter(
    "disputePeriodSeconds",
    BigInt(process.env.DISPUTE_PERIOD_SECONDS || "86400")
  );
  
  // 区块持续时间（毫秒）
  const blockDurationMillisParam = m.getParameter(
    "blockDurationMillis",
    BigInt(process.env.BLOCK_DURATION_MILLIS || "250")
  );
  
  // Locker 阈值
  const lockerThresholdParam = m.getParameter(
    "lockerThreshold",
    BigInt(process.env.LOCKER_THRESHOLD || "2")
  );

  // 部署 Bridge2 合约
  const bridge2 = m.contract("Bridge2", [
    hotAddressesParam,
    coldAddressesParam,
    powersParam,
    usdcAddressParam,
    disputePeriodSecondsParam,
    blockDurationMillisParam,
    lockerThresholdParam,
  ]);

  return { bridge2 };
});

