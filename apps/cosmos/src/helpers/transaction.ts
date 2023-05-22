import {
  MsgClaim,
  MsgLiquidStake,
  MsgLiquidUnstake,
  MsgRedeem
} from "persistenceonejs/pstake/lscosmos/v1beta1/msgs";
import { AminoConverters, AminoTypes, GasPrice } from "@cosmjs/stargate";
import { OfflineDirectSigner, Registry } from "@cosmjs/proto-signing";
import {
  COSMOS_LIQUID_STAKE_URL,
  COSMOS_LIQUID_UN_STAKE_URL,
  REDEEM_URL,
  CLAIM_URL
} from "../../AppConstants";
import { OfflineSigner } from "@cosmjs/launchpad";
import { IBCConfiguration } from "./config";
import * as Sentry from "@sentry/nextjs";
import {
  decodeTendermintClientStateAny,
  decodeTendermintConsensusStateAny
} from "./utils";
import { QueryChannelClientStateResponse } from "cosmjs-types/ibc/core/channel/v1/query";
import { TransferMsg } from "./protoMsg";
import Long from "long";
import { createLSCosmosAminoConverters } from "./aminoConvter";
import {
  createAuthzAminoConverters,
  createBankAminoConverters,
  createDistributionAminoConverters,
  createFeegrantAminoConverters,
  createGovAminoConverters,
  createIbcAminoConverters,
  createStakingAminoConverters,
  createVestingAminoConverters
} from "@cosmjs/stargate";

function createAminoTypes(prefix: string): AminoConverters {
  return {
    ...createAuthzAminoConverters(),
    ...createBankAminoConverters(),
    ...createDistributionAminoConverters(),
    ...createGovAminoConverters(),
    ...createStakingAminoConverters(prefix),
    ...createIbcAminoConverters(),
    ...createFeegrantAminoConverters(),
    ...createVestingAminoConverters(),
    ...createLSCosmosAminoConverters()
  };
}

const tendermintRPC = require("@cosmjs/tendermint-rpc");
const {
  SigningStargateClient,
  QueryClient,
  setupIbcExtension
} = require("@cosmjs/stargate");
const { defaultRegistryTypes } = require("@cosmjs/stargate");

export async function Transaction(
  signer: OfflineSigner | OfflineDirectSigner,
  signerAddress: string,
  msgs: any,
  gasPrice: string,
  memo = "",
  rpc: string
) {
  const client = await SigningStargateClient.connectWithSigner(rpc, signer, {
    registry: new Registry([
      ...defaultRegistryTypes,
      [COSMOS_LIQUID_STAKE_URL, MsgLiquidStake],
      [COSMOS_LIQUID_UN_STAKE_URL, MsgLiquidUnstake],
      [REDEEM_URL, MsgRedeem],
      [CLAIM_URL, MsgClaim]
    ]),
    gasPrice: GasPrice.fromString(gasPrice),
    aminoTypes: new AminoTypes(createAminoTypes(signerAddress.split("1")[0]))
  });
  return await client.signAndBroadcast(signerAddress, msgs, "auto", memo);
}

export async function MakeIBCTransferMsg({
  channel,
  fromAddress,
  toAddress,
  amount,
  timeoutHeight,
  timeoutTimestamp = IBCConfiguration.timeoutTimestamp,
  denom,
  sourceRPCUrl,
  destinationRPCUrl,
  port = "transfer"
}: any) {
  const tendermintClient = await tendermintRPC.Tendermint34Client.connect(
    sourceRPCUrl
  );
  const queryClient = new QueryClient(tendermintClient);

  const ibcExtension = setupIbcExtension(queryClient);

  return await ibcExtension.ibc.channel
    .clientState(port, channel)
    .then(async (clientStateResponse: QueryChannelClientStateResponse) => {
      const clientStateResponseDecoded = decodeTendermintClientStateAny(
        clientStateResponse?.identifiedClientState?.clientState
      );
      timeoutHeight = {
        revisionHeight:
          clientStateResponseDecoded.latestHeight.revisionHeight.add(
            IBCConfiguration.ibcRevisionHeightIncrement
          ),
        revisionNumber: clientStateResponseDecoded.latestHeight.revisionNumber
      };
      if (destinationRPCUrl === undefined) {
        const consensusStateResponse =
          await ibcExtension.ibc.channel.consensusState(
            port,
            channel,
            clientStateResponseDecoded.latestHeight.revisionNumber.toInt(),
            clientStateResponseDecoded.latestHeight.revisionHeight.toInt()
          );
        const consensusStateResponseDecoded = decodeTendermintConsensusStateAny(
          consensusStateResponse.consensusState
        );
        const timeoutTime = Long.fromNumber(
          consensusStateResponseDecoded.timestamp.seconds.toNumber()
        )
          .add(timeoutTimestamp)
          .multiply(1000000000); //get time in nanoesconds
        return TransferMsg(
          channel,
          fromAddress,
          toAddress,
          amount,
          timeoutHeight,
          timeoutTime,
          denom,
          port
        );
      } else {
        const remoteTendermintClient =
          await tendermintRPC.Tendermint34Client.connect(destinationRPCUrl);
        const latestBlockHeight = (await remoteTendermintClient.status())
          .syncInfo.latestBlockHeight;
        timeoutHeight.revisionHeight = Long.fromNumber(latestBlockHeight).add(
          IBCConfiguration.ibcRemoteHeightIncrement
        );
        const timeoutTime = Long.fromNumber(0);
        return TransferMsg(
          channel,
          fromAddress,
          toAddress,
          amount,
          timeoutHeight,
          timeoutTime,
          denom,
          port
        );
      }
    })
    .catch((error: any) => {
      Sentry.captureException(
        error.response ? error.response.data.message : error.message
      );
      throw error;
    });
}
