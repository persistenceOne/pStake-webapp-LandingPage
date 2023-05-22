import { PayloadAction } from "@reduxjs/toolkit";
import { ChainInfo } from "@keplr-wallet/types";
import { OfflineSigner } from "@cosmjs/launchpad";
import { LiquidStakeMsgTypes } from "../../../../helpers/protoMsg";
import { OfflineDirectSigner } from "@cosmjs/proto-signing";

// 0- initialized, 1-depositStart, 2-depositSigned, 3-stakeStart, 4-stakeSigned, 5-complete
export type TransactionSteps = 0 | 1 | 2 | 3 | 4 | 5; // These are txn steps number for easy transaction tracking in ui.

export type LiquidStakeType = "single" | "dual";

export interface StakeAmount {
  amount: string;
  showModal: boolean;
  txFailed: boolean;
  stepNumber: TransactionSteps;
  liquidStakeType: LiquidStakeType;
}

export interface StakeTransactionParams {
  persistenceSigner: OfflineSigner | OfflineDirectSigner;
  persistenceChainInfo: ChainInfo;
  account: string;
  msg: LiquidStakeMsgTypes;
  pollInitialBalance: number;
  cosmosAddress: string;
  cosmosChainInfo: ChainInfo;
}

export type StakeTransactionPayload = PayloadAction<StakeTransactionParams>;
export type SetStakeAmount = PayloadAction<string>;
export type SetTransactionFailedStatus = PayloadAction<boolean>;
export type SetLiquidStakeType = PayloadAction<LiquidStakeType>;
export type SetTransactionStep = PayloadAction<TransactionSteps>;
