import {
  QueryAllBalancesResponse,
  QueryClientImpl as BankQuery,
  QueryTotalSupplyResponse
} from "cosmjs-types/cosmos/bank/v1beta1/query";

import { QueryClientImpl as StakeQuery } from "cosmjs-types/cosmos/staking/v1beta1/query";

import {
  decimalize,
  genericErrorHandler,
  getBaseRate,
  getCommission,
  GetStkAtomValidatorAPY,
  printConsole,
  RpcClient
} from "../../helpers/utils";

import {
  QueryAllDelegatorUnbondingEpochEntriesResponse,
  QueryClientImpl,
  QueryUnbondingEpochCValueResponse
} from "persistenceonejs/pstake/lscosmos/v1beta1/query";

import { QueryClientImpl as EpochQueryClient } from "persistenceonejs/persistence/epochs/v1beta1/query";

import { Scope } from "@sentry/nextjs";
import { Coin } from "@cosmjs/proto-signing";
import Long from "long";
import moment from "moment";
import { ChainInfo } from "@keplr-wallet/types";
import {
  APR_BASE_RATE,
  APR_DEFAULT,
  COSMOS_UNBOND_TIME,
  STK_ATOM_MINIMAL_DENOM
} from "../../../AppConstants";
import { CHAIN_ID, ExternalChains } from "../../helpers/config";
import { StatusResponse, Tendermint34Client } from "@cosmjs/tendermint-rpc";

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

const persistenceChainInfo = ExternalChains[env].find(
  (chain: ChainInfo) => chain.chainId === CHAIN_ID[env].persistenceChainID
);

const cosmosChainInfo = ExternalChains[env].find(
  (chain: ChainInfo) => chain.chainId === CHAIN_ID[env].persistenceChainID
);

export const getTokenBalance = (
  balances: QueryAllBalancesResponse,
  tokenDenom: string
) => {
  if (balances && balances!.balances!.length) {
    const token: Coin | undefined = balances.balances.find(
      (item: Coin) => item.denom === tokenDenom
    );
    if (token === undefined) {
      return "0";
    } else {
      return token!.amount;
    }
  } else {
    return "0";
  }
};

export const fetchAccountBalance = async (address: string, rpc: string) => {
  try {
    const rpcClient = await RpcClient(rpc);
    const bankQueryService = new BankQuery(rpcClient);
    return await bankQueryService.AllBalances({
      address: address
    });
  } catch (error) {
    printConsole(error);
    return "0";
  }
};

export const getExchangeRate = async (rpc: string): Promise<number> => {
  try {
    const rpcClient = await RpcClient(rpc);
    const pstakeQueryService = new QueryClientImpl(rpcClient);
    const cvalue = await pstakeQueryService.CValue({});
    return Number(decimalize(cvalue.cValue, 18));
  } catch (e) {
    const customScope = new Scope();
    customScope.setLevel("fatal");
    customScope.setTags({
      "Error while fetching exchange rate": rpc
    });
    genericErrorHandler(e, customScope);
    return 1;
  }
};

export const getFee = async (rpc: string): Promise<number> => {
  try {
    const rpcClient = await RpcClient(rpc);
    const pstakeQueryService = new QueryClientImpl(rpcClient);
    const chainParamsResponse = await pstakeQueryService.HostChainParams({});
    const fee =
      chainParamsResponse.hostChainParams?.pstakeParams?.pstakeRedemptionFee!;
    return Number(Number(decimalize(fee, 18)).toFixed(6));
  } catch (e) {
    const customScope = new Scope();
    customScope.setLevel("fatal");
    customScope.setTags({
      "Error while fetching exchange rate": rpc
    });
    genericErrorHandler(e, customScope);
    return 0;
  }
};

export const getAPR = async () => {
  try {
    const baseRate = await getBaseRate();
    const commission = await getCommission();
    const incentives = 0;
    const apr =
      Number(baseRate) * 100 -
      (commission / 100) * (Number(baseRate) * 100) +
      incentives;
    return isNaN(apr) ? APR_DEFAULT : apr.toFixed(2);
  } catch (e) {
    const customScope = new Scope();
    customScope.setLevel("fatal");
    customScope.setTags({
      "Error while fetching apr": persistenceChainInfo?.rpc
    });
    genericErrorHandler(e, customScope);
    return -1;
  }
};

export const getAPY = async () => {
  try {
    const apy = await GetStkAtomValidatorAPY();
    const apyPercentage = apy * 100;
    return Number(apyPercentage.toFixed(2));
  } catch (e) {
    return -1;
  }
};

export const getTVU = async (rpc: string): Promise<number> => {
  try {
    const rpcClient = await RpcClient(rpc);
    const bankQueryService = new BankQuery(rpcClient);
    const supplyResponse: QueryTotalSupplyResponse =
      await bankQueryService.TotalSupply({});
    if (supplyResponse.supply.length) {
      const token: Coin | undefined = supplyResponse.supply.find(
        (item: Coin) => item.denom === STK_ATOM_MINIMAL_DENOM
      );
      if (token !== undefined) {
        return Number(token?.amount);
      } else {
        return 0;
      }
    }
    return 0;
  } catch (e) {
    const customScope = new Scope();
    customScope.setLevel("fatal");
    customScope.setTags({
      "Error while fetching exchange rate": rpc
    });
    genericErrorHandler(e, customScope);
    return 0;
  }
};

export const fetchAllEpochEntries = async (address: string, rpc: string) => {
  try {
    const filteredPendingClaims: Array<any> = [];
    const filteredUnlistedPendingClaims: Array<any> = [];
    let totalFailedUnbondAmount: number = 0;
    let claimableAmount: number = 0;
    const rpcClient = await RpcClient(rpc);
    const pstakeQueryService: QueryClientImpl = new QueryClientImpl(rpcClient);

    const epochEntriesResponse: QueryAllDelegatorUnbondingEpochEntriesResponse =
      await pstakeQueryService.DelegatorUnbondingEpochEntries({
        delegatorAddress: address
      });
    if (epochEntriesResponse.delegatorUnbondingEpochEntries.length) {
      for (let item of epochEntriesResponse.delegatorUnbondingEpochEntries) {
        const epochNumber = item.epochNumber;
        const unbondEpochResponse: QueryUnbondingEpochCValueResponse =
          await getUnbondingEpochCvalue(epochNumber, pstakeQueryService);

        const isFailed: boolean =
          unbondEpochResponse.unbondingEpochCValue?.isFailed!;
        const isMatured: boolean =
          unbondEpochResponse.unbondingEpochCValue?.isMatured!;
        const cValueEpochNumber: Long =
          unbondEpochResponse.unbondingEpochCValue?.epochNumber!;

        let unbondAmount: number = 0;
        if (cValueEpochNumber.toNumber() > 0) {
          const sTKBurnAmount: any =
            unbondEpochResponse.unbondingEpochCValue?.sTKBurn?.amount!;
          const amountUnbonded: any =
            unbondEpochResponse.unbondingEpochCValue?.amountUnbonded?.amount!;

          const amount: string = item?.amount?.amount!;
          const cvalue: any = Number(sTKBurnAmount) / Number(amountUnbonded);

          unbondAmount = Number(amount) / Number(cvalue);
        }

        // pending unbonding list
        if (!isFailed && !isMatured && cValueEpochNumber.toNumber() > 0) {
          const unbondTimeResponse: any = await getUnbondingTime(
            epochNumber,
            pstakeQueryService
          );

          printConsole(unbondTimeResponse, "unbondTimeResponse");
          if (unbondTimeResponse) {
            const unbondTime =
              unbondTimeResponse.hostAccountUndelegation.completionTime;

            const unStakedon = moment(
              unbondTime.seconds.toNumber()! * 1000
            ).format("DD MMM YYYY hh:mm A");

            const remainingTime = moment(unStakedon).fromNow(true);

            filteredPendingClaims.push({
              unbondAmount: unbondAmount,
              unStakedon,
              daysRemaining: remainingTime
            });
          }
        } else if (isFailed && cValueEpochNumber.toNumber() > 0) {
          // failed unbonding list
          totalFailedUnbondAmount += Number(item?.amount?.amount);
        } else if (isMatured && cValueEpochNumber.toNumber() > 0) {
          // claimable unbonding list
          claimableAmount += Number(unbondAmount);
        } else {
          // unlisted pending unbonding list
          const epochInfo = await getEpochInfo(rpc);
          const currentEpochNumberResponse = await getCurrentEpoch(rpc);
          const currentEpochNumber =
            currentEpochNumberResponse.currentEpoch.toNumber();

          const nextEpochNumber = epochNumber.toNumber();
          const drs = epochInfo.epochs[0]?.duration?.seconds.toNumber()!;

          const diff = (nextEpochNumber - currentEpochNumber + 1) * drs;

          const tentativeTime = moment(
            epochInfo!.epochs[0]!.currentEpochStartTime?.seconds.toNumber()! * // ms conversion
              1000
          )
            .add(diff + COSMOS_UNBOND_TIME, "seconds")
            .local()
            .format("DD MMM YYYY hh:mm A");
          const remainingTime = moment(tentativeTime).fromNow(true);
          filteredUnlistedPendingClaims.push({
            unbondAmount: item.amount?.amount,
            unStakedon: tentativeTime,
            daysRemaining: remainingTime
          });
        }
      }
    }
    return {
      filteredPendingClaims,
      totalFailedUnbondAmount,
      claimableAmount:
        claimableAmount > 2 ? claimableAmount - 2 : claimableAmount,
      filteredUnlistedPendingClaims
    };
  } catch (error) {
    const customScope = new Scope();
    customScope.setLevel("fatal");
    customScope.setTags({
      "Error while fetching pending claims": rpc
    });
    genericErrorHandler(error, customScope);
    return {
      filteredPendingClaims: [],
      totalFailedUnbondAmount: 0,
      claimableAmount: 0,
      filteredUnlistedPendingClaims: []
    };
  }
};

export const getUnbondingAmount = async (
  address: string,
  epochNumber: Long,
  queryService: QueryClientImpl
) => {
  return await queryService.DelegatorUnbondingEpochEntry({
    delegatorAddress: address,
    epochNumber: epochNumber
  });
};

export const getEpochInfo = async (rpc: string) => {
  const rpcClient = await RpcClient(rpc);
  const persistenceQueryService = new EpochQueryClient(rpcClient);
  return await persistenceQueryService.EpochInfos({});
};

export const getCurrentEpoch = async (rpc: string) => {
  const rpcClient = await RpcClient(rpc);
  const persistenceQueryService = new EpochQueryClient(rpcClient);
  return await persistenceQueryService.CurrentEpoch({
    identifier: "day"
  });
};

export const getUnbondingEpochCvalue = async (
  epochNumber: Long,
  queryService: QueryClientImpl
) => {
  return await queryService.UnbondingEpochCValue({
    epochNumber: epochNumber
  });
};

export const getUnbondingTime = async (
  epochNumber: Long,
  queryService: QueryClientImpl
) => {
  try {
    return await queryService.HostAccountUndelegation({
      epochNumber: epochNumber
    });
  } catch (error) {
    printConsole(error, "unbond time error");
  }
};

export const getMaxRedeem = async (rpc: string): Promise<number> => {
  try {
    const rpcClient = await RpcClient(rpc);
    const pstakeQueryService = new QueryClientImpl(rpcClient);
    const moduleAccountResponse = await pstakeQueryService.DepositModuleAccount(
      {}
    );
    return moduleAccountResponse
      ? Number(moduleAccountResponse.balance?.amount)
      : 0;
  } catch (e) {
    const customScope = new Scope();
    customScope.setLevel("fatal");
    customScope.setTags({
      "Error while fetching exchange rate": rpc
    });
    genericErrorHandler(e, customScope);
    return 0;
  }
};

export const getChainStatus = async (rpc: string): Promise<boolean> => {
  try {
    const tmClient: Tendermint34Client = await Tendermint34Client.connect(rpc);
    const status: StatusResponse = await tmClient.status();
    const latestBlockTime = status.syncInfo.latestBlockTime;
    const startTime = moment(latestBlockTime.toString()).format(
      "DD-MM-YYYY hh:mm:ss"
    );
    const endTime = moment().local().format("DD-MM-YYYY hh:mm:ss");
    const ms = moment(endTime, "DD/MM/YYYY HH:mm:ss").diff(
      moment(startTime, "DD/MM/YYYY HH:mm:ss")
    );
    const duration = moment.duration(ms);
    const seconds = duration.asSeconds();
    return seconds > 60;
  } catch (e) {
    const customScope = new Scope();
    customScope.setLevel("fatal");
    customScope.setTags({
      "Error while fetching exchange rate": rpc
    });
    genericErrorHandler(e, customScope);
    return true;
  }
};

export const getCosmosUnbondTime = async (rpc: string): Promise<number> => {
  try {
    const rpcClient = await RpcClient(rpc);
    const pstakeQueryService = new StakeQuery(rpcClient);
    const chainParamsResponse = await pstakeQueryService.Params({});
    if (chainParamsResponse.params?.unbondingTime?.seconds) {
      return chainParamsResponse.params?.unbondingTime?.seconds.toNumber();
    }
    return 0;
  } catch (e) {
    const customScope = new Scope();
    customScope.setLevel("fatal");
    customScope.setTags({
      "Error while fetching cosmos unbond time": rpc
    });
    genericErrorHandler(e, customScope);
    return 0;
  }
};
