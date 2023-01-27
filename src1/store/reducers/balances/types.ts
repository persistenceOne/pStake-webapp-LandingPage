import { PayloadAction } from "@reduxjs/toolkit";
import { AccountData } from "@cosmjs/launchpad/build/signer";
import { ChainInfo } from "@keplr-wallet/types";

export interface BalanceState {
  atomBalance: number;
  stkAtomBalance: number;
  ibcAtomBalance: number;
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

export type FetchBalanceSaga = PayloadAction<FetchBalanceSagaParams>;
