import { PayloadAction } from "@reduxjs/toolkit";
import { ChainInfo } from "@keplr-wallet/types";
import { OfflineSigner } from "@cosmjs/launchpad";
import { LiquidStakeMsgTypes } from "../../../../helpers/protoMsg";
import { OfflineDirectSigner } from "@cosmjs/proto-signing";

export type unStakeType = "instant" | "normal";

export interface UnStakeAmount {
  amount: string;
  type: unStakeType;
}

export interface UnStakeTransactionParams {
  persistenceSigner: OfflineSigner | OfflineDirectSigner;
  persistenceChainInfo: ChainInfo;
  address: string;
  msg: LiquidStakeMsgTypes[];
  pollInitialBalance: number;
  cosmosChainInfo: ChainInfo;
  cosmosAddress: string;
}

export type UnStakeTransactionPayload = PayloadAction<UnStakeTransactionParams>;
export type SetUnStakeAmount = PayloadAction<string>;
export type SetUnStakeOption = PayloadAction<unStakeType>;
