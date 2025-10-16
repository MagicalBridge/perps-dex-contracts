import type { HardhatUserConfig } from "hardhat/config";

import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";

// Helper function to ensure private key has 0x prefix
function ensureHexPrefix(key: string | undefined): string | undefined {
  if (!key) return undefined;
  return key.startsWith('0x') ? key : `0x${key}`;
}

const config: HardhatUserConfig = {
  // @ts-ignore - etherscan config from toolbox-viem
  etherscan: {
    apiKey: {
      arbitrumSepolia: process.env.ARBISCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "arbitrumSepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
          browserURL: "https://sepolia.arbiscan.io",
        },
      },
    ],
  },
  plugins: [hardhatToolboxViemPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.9",
      },
      production: {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: process.env.SEPOLIA_RPC_URL || "https://rpc.sepolia.org",
      accounts: process.env.SEPOLIA_PRIVATE_KEY ? [ensureHexPrefix(process.env.SEPOLIA_PRIVATE_KEY)!] : [],
    },
    arbitrumSepolia: {
      type: "http",
      chainType: "generic",
      url: process.env.ARBITRUM_SEPOLIA_RPC_URL || "https://sepolia-rollup.arbitrum.io/rpc",
      accounts: process.env.PRIVATE_KEY ? [ensureHexPrefix(process.env.PRIVATE_KEY)!] : [],
      chainId: 421614,
    },
  },
};

export default config;
