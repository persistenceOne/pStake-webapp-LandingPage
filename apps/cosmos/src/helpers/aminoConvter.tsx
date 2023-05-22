import {
  MsgClaim,
  MsgLiquidStake,
  MsgLiquidUnstake,
  MsgRedeem
} from "persistenceonejs/pstake/lscosmos/v1beta1/msgs";
import { AminoMsg, Coin } from "@cosmjs/amino";
import { AminoConverters } from "@cosmjs/stargate";

export interface AminoMsgLiquidStake extends AminoMsg {
  readonly type: "cosmos/MsgLiquidStake";
  readonly value: {
    readonly delegator_address: string;
    readonly amount?: Coin;
  };
}

export interface AminoMsgLiquidUnStake extends AminoMsg {
  readonly type: "cosmos/MsgLiquidUnstake";
  readonly value: {
    readonly delegator_address: string;
    readonly amount?: Coin;
  };
}

export interface AminoMsgClaim extends AminoMsg {
  readonly type: "cosmos/MsgClaim";
  readonly value: {
    readonly delegator_address: string;
  };
}

export interface AminoMsgRedeem extends AminoMsg {
  readonly type: "cosmos/MsgRedeem";
  readonly value: {
    readonly delegator_address: string;
    readonly amount?: Coin;
  };
}

export function createLSCosmosAminoConverters(): AminoConverters {
  return {
    "/pstake.lscosmos.v1beta1.MsgLiquidStake": {
      aminoType: "cosmos/MsgLiquidStake",
      toAmino: ({
        delegatorAddress,
        amount
      }: MsgLiquidStake): AminoMsgLiquidStake["value"] => ({
        delegator_address: delegatorAddress,
        amount: amount
      }),
      fromAmino: ({
        delegator_address,
        amount
      }: AminoMsgLiquidStake["value"]): MsgLiquidStake => ({
        delegatorAddress: delegator_address,
        amount: amount
      })
    },
    "/pstake.lscosmos.v1beta1.MsgLiquidUnstake": {
      aminoType: "cosmos/MsgLiquidUnstake",
      toAmino: ({
        delegatorAddress,
        amount
      }: MsgLiquidUnstake): AminoMsgLiquidUnStake["value"] => ({
        delegator_address: delegatorAddress,
        amount: amount
      }),
      fromAmino: ({
        delegator_address,
        amount
      }: AminoMsgLiquidUnStake["value"]): MsgLiquidUnstake => ({
        delegatorAddress: delegator_address,
        amount: amount
      })
    },
    "/pstake.lscosmos.v1beta1.MsgClaim": {
      aminoType: "cosmos/MsgClaim",
      toAmino: ({ delegatorAddress }: MsgClaim): AminoMsgClaim["value"] => ({
        delegator_address: delegatorAddress
      }),
      fromAmino: ({ delegator_address }: AminoMsgClaim["value"]): MsgClaim => ({
        delegatorAddress: delegator_address
      })
    },
    "/pstake.lscosmos.v1beta1.MsgRedeem": {
      aminoType: "cosmos/MsgRedeem",
      toAmino: ({
        delegatorAddress,
        amount
      }: MsgRedeem): AminoMsgRedeem["value"] => ({
        delegator_address: delegatorAddress,
        amount: amount
      }),
      fromAmino: ({
        delegator_address,
        amount
      }: AminoMsgRedeem["value"]): MsgRedeem => ({
        delegatorAddress: delegator_address,
        amount: amount
      })
    }
  };
}
