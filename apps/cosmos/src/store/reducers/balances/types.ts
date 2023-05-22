import { PayloadAction } from "@reduxjs/toolkit";
import { ChainInfo } from "@keplr-wallet/types";

export interface BalanceState {
  atomBalance: number;
  stkAtomBalance: number;
  ibcAtomBalance: number;
  xprtBalance: number;
}

export interface FetchBalanceSagaParams {
  persistenceAddress: string;
  cosmosAddress: string;
  persistenceChainInfo: ChainInfo;
  cosmosChainInfo: ChainInfo;
}

export type SetAtomBalance = PayloadAction<number>;
export type SetStkAtomBalance = PayloadAction<number>;
export type SetIbcAtomBalance = PayloadAction<number>;
export type SetXprtBalance = PayloadAction<number>;

export type FetchBalanceSaga = PayloadAction<FetchBalanceSagaParams>;
