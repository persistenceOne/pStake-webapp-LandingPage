import { InitialTvlApyFeeTypes } from "../../../store/slices/initialDataSlice";
import React from "react";

export interface DefiInfo {
  id: number;
  token0: string;
  token1: string;
  token0_logo: string;
  token1_logo: string;
  platform: string;
  platform_logo: string;
  button_one_text?: string;
  button_one_url?: string;
  button_two_text?: string;
  button_two_url?: string;
  launched: boolean;
  apy?: number | string | React.ReactNode;
  tvl?: number | string | React.ReactNode;
  fee?: number | string | React.ReactNode;
}

export type AvailableDefiOption = "dexList" | "blList";

export type EthereumData = {
  [key in AvailableDefiOption]: DefiInfo[];
};

export const ethereumData = (
  uniswap: InitialTvlApyFeeTypes,
  uniswap1: InitialTvlApyFeeTypes
): EthereumData => {
  return {
    dexList: [
      {
        id: 1,
        token0: "stkETH",
        token0_logo: "/images/logos/stkEth.svg",
        token1: "ETH",
        token1_logo: "/images/logos/eth.svg",
        platform: "Optimism",
        platform_logo: "/images/logos/optimism.svg",
        button_one_text: "Swap",
        button_one_url: "#",
        button_two_text: "Add Liquidity",
        button_two_url: "#",
        launched: true,
        apy: uniswap.apy,
        tvl: uniswap.tvl,
      },
      {
        id: 0,
        token0: "stkETH",
        token0_logo: "/images/logos/stkEth.svg",
        token1: "ETH",
        token1_logo: "/images/logos/eth.svg",
        platform: "Persistence",
        platform_logo: "/images/logos/xprt_logo.svg",
        button_one_text: "Swap",
        button_one_url: "#",
        button_two_text: "Add Liquidity",
        button_two_url: "#",
        launched: true,
        apy: uniswap.apy,
        tvl: uniswap.tvl,
      },
    ],
    blList: [
      {
        id: 1,
        token0: "stkETH",
        token0_logo: "/images/logos/stkEth.svg",
        token1: "ETH",
        token1_logo: "/images/logos/eth.svg",
        platform: "Uniswap",
        platform_logo: "/images/logos/uniswap.svg",
        button_one_text: "Swap",
        button_one_url: "#",
        button_two_text: "Add Liquidity",
        button_two_url: "#",
        launched: true,
        apy: uniswap.apy,
        tvl: uniswap.tvl,
      },
    ],
  };
};

export const optimismData = (
  uniswap: InitialTvlApyFeeTypes,
  uniswap1: InitialTvlApyFeeTypes
): EthereumData => {
  return {
    dexList: [
      {
        id: 1,
        token0: "stkETH",
        token0_logo: "/images/logos/stkEth.svg",
        token1: "ETH",
        token1_logo: "/images/logos/eth.svg",
        platform: "Uniswap",
        platform_logo: "/images/logos/uniswap.svg",
        button_one_text: "Swap",
        button_one_url: "#",
        button_two_text: "Add Liquidity",
        button_two_url: "#",
        launched: true,
        apy: uniswap.apy,
        tvl: uniswap.tvl,
      },
    ],
    blList: [
      {
        id: 0,
        token0: "stkETH",
        token0_logo: "/images/logos/stkEth.svg",
        token1: "ETH",
        token1_logo: "/images/logos/eth.svg",
        platform: "Persistence",
        platform_logo: "/images/logos/xprt_logo.svg",
        button_one_text: "Swap",
        button_one_url: "#",
        button_two_text: "Add Liquidity",
        button_two_url: "#",
        launched: true,
        apy: uniswap.apy,
        tvl: uniswap.tvl,
      },
    ],
  };
};
