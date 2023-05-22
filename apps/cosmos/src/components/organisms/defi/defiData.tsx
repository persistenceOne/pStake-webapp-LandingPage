import React from "react";
import { InitialTvlApyFeeTypes } from "../../../store/reducers/initialData/types";

export type AvailableDefiOption = "dexList" | "blList";

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
  borrow_apy?: number | string | React.ReactNode;
  total_supply?: number | string | React.ReactNode;
  lending_apy?: number | string | React.ReactNode;
  type: AvailableDefiOption;
}

export type DefiDataList = {
  [key in AvailableDefiOption]: DefiInfo[];
};

export const defiDataList = (
  osmosisInfo: InitialTvlApyFeeTypes,
  crescentInfo: InitialTvlApyFeeTypes,
  dexterInfo: InitialTvlApyFeeTypes,
  umeeInfo:InitialTvlApyFeeTypes,
): DefiDataList => {
  return {
    dexList: [
      {
        id: 1,
        token0: "stkATOM",
        token0_logo: "/images/tokens/stk_atom.svg",
        token1: "ATOM",
        token1_logo: "/images/tokens/atom.svg",
        platform: "Osmosis",
        platform_logo: "/images/defi/osmosis.svg",
        button_one_text: "Swap",
        button_one_url: "https://app.osmosis.zone/?from=stkATOM&to=ATOM",
        button_two_text: "Add Liquidity",
        button_two_url: "https://app.osmosis.zone/pool/886",
        launched: true,
        apy: osmosisInfo.total_apy,
        tvl: osmosisInfo.tvl,
        fee: osmosisInfo.fees,
        type: "dexList"
      },
      {
        id: 1,
        token0: "stkATOM",
        token0_logo: "/images/tokens/stk_atom.svg",
        token1: "ATOM",
        token1_logo: "/images/tokens/atom.svg",
        platform: "Crescent",
        platform_logo: "/images/defi/crescent.svg",
        button_one_text: "Swap",
        button_one_url:
          "https://app.crescent.network/swap?from=stkatom&to=atom",
        button_two_text: "Add Liquidity",
        button_two_url:
          "https://app.crescent.network/farm?open_modal_pool_id=57",
        launched: true,
        apy: crescentInfo.total_apy,
        tvl: crescentInfo.tvl,
        fee: "0%",
        type: "dexList"
      },
      {
        id: 0,
        token0: "stkATOM",
        token0_logo: "/images/tokens/stk_atom.svg",
        token1: "ATOM",
        token1_logo: "/images/tokens/atom.svg",
        platform: "Dexter",
        platform_logo: "/images/defi/dexter.svg",
        button_one_text: "Swap",
        button_one_url: "https://app.dexter.zone/",
        button_two_text: "Add Liquidity",
        button_two_url:
          "https://app.dexter.zone/pools/persistence1335rlmhujm0gj5e9gh7at9jpqvqckz0mpe4v284ar4lw5mlkryzszkpfrs",
        launched: true,
        apy: dexterInfo.total_apy,
        tvl: dexterInfo.tvl,
        fee: dexterInfo.fees,
        type: "dexList"
      }
    ],
    blList: [
      {
        id: 3,
        token0: "stkATOM",
        token0_logo: "/images/tokens/stk_atom.svg",
        token1: "ATOM",
        token1_logo: "/images/tokens/atom.svg",
        platform: "Umee",
        platform_logo: "/images/defi/umee.svg",
        button_one_text: "Add Collateral",
        button_one_url: "https://app.umee.cc/#/markets",
        button_two_text: "Borrow",
        button_two_url: "https://app.umee.cc/#/markets",
        launched: true,
        borrow_apy: umeeInfo.borrow_apy,
        lending_apy: umeeInfo.lending_apy,
        total_supply: umeeInfo.total_supply,
        fee: 0,
        type: "blList"
      }
    ]
  };
};
