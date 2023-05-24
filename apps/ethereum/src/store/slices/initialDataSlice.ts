import { StateCreator } from "zustand";
import { fetchTokensInfo } from "../../pages/api/externalApi";
import React from "react";
import { getExchangeRate } from "../../helpers/utils";
import { AlchemyProvider } from "@ethersproject/providers";

export interface InitialTvlApyFeeTypes {
  tvl: number | React.ReactNode;
  apy: number | React.ReactNode;
}

export interface InitialDataSliceState {
  ethPrice: number;
  apr: number;
  tvl: number;
  defiList: {
    uniSwap: InitialTvlApyFeeTypes;
  };
  exchangeRate: number | React.ReactNode;
}

export interface InitialDataSliceActions {
  fetchInitialData: () => Promise<void>;
  fetchExchangeRate: () => Promise<void>;
  resetInitialDataSlice: () => void;
}

const initialState: InitialDataSliceState = {
  ethPrice: 0,
  apr: 0,
  tvl: 0,
  exchangeRate: 1,
  defiList: {
    uniSwap: {
      tvl: 0,
      apy: 0,
    },
  },
};

export type InitialDataSlice = InitialDataSliceState & InitialDataSliceActions;

export const createInitialDataSlice: StateCreator<InitialDataSlice> = (
  set
) => ({
  ...initialState,
  fetchInitialData: async () => {
    const response: number = await fetchTokensInfo();
    set({
      ethPrice: response,
    });
  },
  fetchExchangeRate: async () => {
    const response: string = await getExchangeRate();
    set({
      exchangeRate: response,
    });
  },
  resetInitialDataSlice: () => {
    set(initialState);
  },
});
