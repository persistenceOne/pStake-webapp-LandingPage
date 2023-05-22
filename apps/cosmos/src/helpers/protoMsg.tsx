import {
  COSMOS_LIQUID_STAKE_URL,
  COSMOS_LIQUID_UN_STAKE_URL,
  IBC_TRANSFER_URL,
  REDEEM_URL,
  CLAIM_URL
} from "../../AppConstants";
import {
  MsgClaim,
  MsgLiquidStake,
  MsgLiquidUnstake,
  MsgRedeem
} from "persistenceonejs/pstake/lscosmos/v1beta1/msgs";
import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";
import { coin } from "@cosmjs/amino";
import Long from "long";

export interface LiquidStakeMsgTypes {
  typeUrl?: string;
  value?: MsgLiquidStake;
}

export interface TransferMsgTypes {
  typeUrl?: string;
  value?: MsgTransfer;
}

export interface LiquidUnStakeMsgTypes {
  typeUrl?: string;
  value?: MsgLiquidStake;
}

export interface ClaimMsgTypes {
  typeUrl?: string;
  value?: MsgClaim;
}

export const LiquidStakeMsg = (
  address: string,
  amount: string,
  denom: string
): LiquidStakeMsgTypes => {
  return {
    typeUrl: COSMOS_LIQUID_STAKE_URL,
    value: MsgLiquidStake.fromPartial({
      delegatorAddress: address,
      amount: {
        denom: denom,
        amount: String(amount)
      }
    })
  };
};

export const LiquidUnStakeMsg = (
  address: string,
  amount: string,
  denom: string
): LiquidUnStakeMsgTypes => {
  return {
    typeUrl: COSMOS_LIQUID_UN_STAKE_URL,
    value: MsgLiquidUnstake.fromPartial({
      delegatorAddress: address,
      amount: {
        denom: denom,
        amount: String(amount)
      }
    })
  };
};

export const RedeemMsg = (
  address: string,
  amount: string,
  denom: string
): LiquidUnStakeMsgTypes => {
  return {
    typeUrl: REDEEM_URL,
    value: MsgRedeem.fromPartial({
      delegatorAddress: address,
      amount: {
        denom: denom,
        amount: String(amount)
      }
    })
  };
};

export const ClaimMsg = (address: string): ClaimMsgTypes => {
  return {
    typeUrl: CLAIM_URL,
    value: MsgClaim.fromPartial({
      delegatorAddress: address
    })
  };
};

export const TransferMsg = (
  channel: string,
  fromAddress: string,
  toAddress: string,
  amount: string,
  timeoutHeight: any,
  timeoutTimestamp: string | number | Long.Long | undefined,
  denom: string,
  port = "transfer"
): TransferMsgTypes => {
  return {
    typeUrl: IBC_TRANSFER_URL,
    value: MsgTransfer.fromPartial({
      sourcePort: port,
      sourceChannel: channel,
      token: coin(Math.trunc(Number(amount)), denom),
      sender: fromAddress,
      receiver: toAddress,
      timeoutHeight: {
        revisionNumber: timeoutHeight?.revisionNumber,
        revisionHeight: timeoutHeight?.revisionHeight
      },
      timeoutTimestamp: timeoutTimestamp
    })
  };
};
