import _ from "lodash";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import {
  createProtobufRpcClient,
  decodeCosmosSdkDecFromProto,
  QueryClient
} from "@cosmjs/stargate";
import { Decimal } from "@cosmjs/math";
import { Scope } from "@sentry/nextjs";
import * as Sentry from "@sentry/nextjs";
import { fetchAccountBalance, getTokenBalance } from "../pages/api/onChain";
import { CHAIN_ID, ExternalChains, PollingConfig } from "./config";
import { APR_BASE_RATE, COIN_ATOM_DENOM, TEST_NET } from "../../AppConstants";
import {
  QueryAllowListedValidatorsResponse,
  QueryClientImpl,
  QueryDelegationStateResponse
} from "persistenceonejs/pstake/lscosmos/v1beta1/query";
import {
  QueryClientImpl as StakeQuery,
  QueryClientImpl as StakingQueryClient,
  QueryValidatorResponse,
  QueryValidatorsResponse
} from "cosmjs-types/cosmos/staking/v1beta1/query";
import { ChainInfo } from "@keplr-wallet/types";
import { AllowListedValidator } from "persistenceonejs/pstake/lscosmos/v1beta1/lscosmos";
import Long from "long";
const tendermint = require("cosmjs-types/ibc/lightclients/tendermint/v1/tendermint");
import {
  QueryAllBalancesResponse,
  QueryClientImpl as BankQueryClient,
  QueryTotalSupplyResponse
} from "cosmjs-types/cosmos/bank/v1beta1/query";

import { QueryClientImpl as MintQueryClient } from "cosmjs-types/cosmos/mint/v1beta1/query";

import { QueryClientImpl as DistrQueryClient } from "cosmjs-types/cosmos/distribution/v1beta1/query";

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

const persistenceChainInfo = ExternalChains[env].find(
  (chain: ChainInfo) => chain.chainId === CHAIN_ID[env].persistenceChainID
);

const cosmosChainInfo = ExternalChains[env].find(
  (chain: ChainInfo) => chain.chainId === CHAIN_ID[env].cosmosChainID
);

export async function RpcClient(rpc: string) {
  const tendermintClient = await Tendermint34Client.connect(rpc);
  const queryClient = new QueryClient(tendermintClient);
  return createProtobufRpcClient(queryClient);
}

export const removeCommas = (str: any) =>
  _.replace(str, new RegExp(",", "g"), "");

const reverseString = (str: any) =>
  removeCommas(_.toString(_.reverse(_.toArray(str))));

const recursiveReverse = (input: any): string => {
  if (_.isArray(input))
    return _.toString(_.reverse(_.map(input, (v) => recursiveReverse(v))));
  if (_.isString()) return reverseString(input);
  return reverseString(`${input}`);
};

export const sixDigitsNumber = (value: string, length = 6) => {
  let inputValue = value.toString();
  if (inputValue.length >= length) {
    return inputValue.substring(0, length);
  } else {
    const stringLength = length - inputValue.length;
    let newString = inputValue;
    for (let i = 0; i < stringLength; i++) {
      newString += "0";
    }
    return newString;
  }
};

export const formatNumber = (v = 0, size = 3, decimalLength = 6) => {
  let str = `${v}`;
  if (!str) return "NaN";
  let substr = str.split(".");
  if (substr[1] === undefined) {
    let newString = "0";
    for (let i = 1; i < decimalLength; i++) {
      newString += "0";
    }
    substr.push(newString);
  } else {
    substr[1] = sixDigitsNumber(substr[1], decimalLength);
  }
  str = reverseString(substr[0]);
  const regex = `.{1,${size}}`;
  const arr = str.match(new RegExp(regex, "g"));
  return `${recursiveReverse(arr)}${substr[1] ? `.${substr[1]}` : ""}`;
};

export const stringTruncate = (str: string, length = 7) => {
  if (str.length > 30) {
    return (
      str.substring(0, length) +
      "..." +
      str.substring(str.length - length, str.length)
    );
  }
  return str;
};

export const truncateToFixedDecimalPlaces = (
  num: number,
  decimalPlaces = 6
) => {
  const regexString = "^-?\\d+(?:\\.\\d{0,dp})?";
  const regexToMatch = regexString.replace("dp", `${decimalPlaces}`);
  const regex = new RegExp(regexToMatch);
  const matched = num.toString().match(regex);
  if (matched) {
    return parseFloat(matched[0]);
  }
  return 0;
};

export const emptyFunc = () => ({});

export const decimalize = (valueString: string | number, decimals = 6) => {
  let truncate: number;
  if (typeof valueString === "string") {
    truncate = Number(valueString);
  } else {
    truncate = valueString;
  }
  return Decimal.fromAtomics(
    Math.trunc(truncate!).toString(),
    decimals
  ).toString();
};

export const unDecimalize = (valueString: string | number, decimals = 6) => {
  return Decimal.fromUserInput(valueString.toString(), decimals).atomics;
};

export const genericErrorHandler = (e: any, scope = new Scope()) => {
  console.log(e);
  Sentry.captureException(e, scope);
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function pollAccountBalance(
  address: string,
  denom: string,
  rpc: string,
  availableAmount: string
) {
  let initialBalance;
  if (availableAmount) {
    initialBalance = availableAmount;
  } else {
    const balances: any = await fetchAccountBalance(address, rpc);
    initialBalance = getTokenBalance(balances, denom);
  }
  printConsole(initialBalance, "initialBalance");
  await delay(PollingConfig.initialTxHashQueryDelay);
  for (let i = 0; i < PollingConfig.numberOfRetries; i++) {
    try {
      const balances: any = await fetchAccountBalance(address, rpc);
      const fetchResult = getTokenBalance(balances, denom);
      if (fetchResult !== "0" && decimalize(fetchResult) !== initialBalance) {
        return fetchResult;
      } else {
        throw Error("Balance unchanged");
      }
    } catch (error: any) {
      printConsole(
        "polling balance in " +
          PollingConfig.scheduledTxHashQueryDelay +
          ": " +
          i +
          "th time"
      );
      await delay(PollingConfig.scheduledTxHashQueryDelay);
    }
  }
  throw new Error("failed all retries");
}

export const decodeTendermintClientStateAny = (clientState: any) => {
  if (
    (clientState === null || clientState === void 0
      ? void 0
      : clientState.typeUrl) !== "/ibc.lightclients.tendermint.v1.ClientState"
  ) {
    throw new Error(
      `Unexpected client state type: ${
        clientState === null || clientState === void 0
          ? void 0
          : clientState.typeUrl
      }`
    );
  }
  return tendermint.ClientState.decode(clientState.value);
};

// copied from node_modules/@cosmjs/stargate/build/queries/ibc.js
export const decodeTendermintConsensusStateAny = (consensusState: any) => {
  if (
    (consensusState === null || consensusState === void 0
      ? void 0
      : consensusState.typeUrl) !==
    "/ibc.lightclients.tendermint.v1.ConsensusState"
  ) {
    throw new Error(
      `Unexpected client state type: ${
        consensusState === null || consensusState === void 0
          ? void 0
          : consensusState.typeUrl
      }`
    );
  }
  return tendermint.ConsensusState.decode(consensusState.value);
};

export const printConsole = (message: any, helpText = "") => {
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === TEST_NET) {
    console.log(message, helpText);
  }
};

export async function getBaseRate() {
  try {
    const cosmosClient = await RpcClient(cosmosChainInfo!.rpc);
    const stakingQueryClient = new StakingQueryClient(cosmosClient);
    const bankQueryClient = new BankQueryClient(cosmosClient);
    const mintQueryClient = new MintQueryClient(cosmosClient);
    const distributionQueryClient = new DistrQueryClient(cosmosClient);
    const stakingPool = await stakingQueryClient.Pool({});
    const supply = await bankQueryClient.SupplyOf({ denom: "uatom" });
    const inflation = await mintQueryClient.Inflation({});
    const distributionParams = await distributionQueryClient.Params({});
    return (
      (Number(decodeCosmosSdkDecFromProto(inflation.inflation).toString()) *
        Number(supply!.amount!.amount) *
        (1 -
          Number(
            decodeCosmosSdkDecFromProto(
              distributionParams!.params!.communityTax
            ).toString()
          ))) /
      Number(stakingPool!.pool!.bondedTokens)
    );
  } catch (e) {
    const customScope = new Scope();
    customScope.setLevel("fatal");
    customScope.setTags({
      "Error while fetching baseRate": cosmosChainInfo?.rpc
    });
    genericErrorHandler(e, customScope);
    return APR_BASE_RATE;
  }
}

/**
 * It fetches the commission rates of all the validators in the network and returns the average
 * commission rate
 * @returns The commission rate of the validators.
 */
export const getCommission = async () => {
  try {
    const weight: number = 1;
    let commission: number = 0;
    const rpcClient = await RpcClient(persistenceChainInfo?.rpc!);
    const pstakeQueryService = new QueryClientImpl(rpcClient);
    const allowListedValidators: QueryAllowListedValidatorsResponse =
      await pstakeQueryService.AllowListedValidators({});
    const cosmosRpcClient = await RpcClient(cosmosChainInfo?.rpc!);
    const cosmosQueryService = new StakingQueryClient(cosmosRpcClient);
    const validators: AllowListedValidator[] | undefined =
      allowListedValidators?.allowListedValidators?.allowListedValidators;
    const commissionRates: number[] = [];

    let key: any = new Uint8Array();
    let cosmosValidators = [];

    do {
      const validatorCommission: QueryValidatorsResponse =
        await cosmosQueryService.Validators({
          status: "BOND_STATUS_BONDED",
          pagination: {
            key: key,
            offset: Long.fromNumber(0, true),
            limit: Long.fromNumber(0, true),
            countTotal: true,
            reverse: false
          }
        });
      key = validatorCommission?.pagination?.nextKey;
      cosmosValidators.push(...validatorCommission.validators);
    } while (key.length !== 0);

    if (cosmosValidators?.length !== 0) {
      for (const validator of cosmosValidators) {
        const listedValidator: any = validators?.find(
          (item: any) => item?.validatorAddress === validator.operatorAddress
        );
        if (listedValidator) {
          let commissionRate =
            parseFloat(
              decimalize(
                validator!.commission
                  ? validator!.commission.commissionRates!.rate
                  : 0,
                18
              )
            ) * 100;
          commissionRates.push(commissionRate);
        }
      }
      commission =
        (weight * commissionRates.reduce((a, b) => a + b, 0)) /
        validators!.length;
    } else {
      commission = 0;
    }
    return commission;
  } catch (e) {
    const customScope = new Scope();
    customScope.setLevel("fatal");
    customScope.setTags({
      "Error while fetching commission": persistenceChainInfo?.rpc
    });
    genericErrorHandler(e, customScope);
    return 0;
  }
};

export const numberFormat = (number: any, decPlaces: number) => {
  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = Math.pow(10, decPlaces);

  const abbrev = ["K", "M", "M", "T"];

  // Go through the array backwards, so we do the largest first
  for (let i = abbrev.length - 1; i >= 0; i--) {
    // Convert array index to "1000", "1000000", etc
    const size = Math.pow(10, (i + 1) * 3);

    // If the number is bigger or equal do the abbreviation
    if (size <= number) {
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.
      number = Math.round((number * decPlaces) / size) / decPlaces;

      // Handle special case where we round up to the next abbreviation
      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      // Add the letter for the abbreviation
      number += abbrev[i];

      break;
    }
  }

  return number;
};

export async function GetCosmosAPY() {
  const cosmosClient = await RpcClient(cosmosChainInfo!.rpc);
  const stakingQueryClient = new StakingQueryClient(cosmosClient);
  const bankQueryClient = new BankQueryClient(cosmosClient);
  const mintQueryClient = new MintQueryClient(cosmosClient);
  const distributionQueryClient = new DistrQueryClient(cosmosClient);
  const stakingPool = await stakingQueryClient.Pool({});
  const supply = await bankQueryClient.SupplyOf({ denom: COIN_ATOM_DENOM });
  const inflation = await mintQueryClient.Inflation({});
  const distributionParams = await distributionQueryClient.Params({});
  return (
    (Number(decodeCosmosSdkDecFromProto(inflation.inflation).toString()) *
      Number(supply!.amount!.amount) *
      (1 -
        Number(
          decodeCosmosSdkDecFromProto(
            distributionParams!.params!.communityTax
          ).toString()
        ))) /
    Number(stakingPool!.pool!.bondedTokens)
  );
}

export async function GetStkAtomValidatorAPR() {
  const baseRate = await GetCosmosAPY();
  const pstakeValidators: any = await getValidatorStates();
  let commissionAdjustedAPYFactor = 0;
  let totalDelegations = 0;
  for (const val in pstakeValidators) {
    commissionAdjustedAPYFactor =
      commissionAdjustedAPYFactor +
      (1 - pstakeValidators[val]!.commission) *
        pstakeValidators[val].delegation;
    totalDelegations = totalDelegations + +pstakeValidators[val].delegation;
  }
  const incentives = 0;
  const apr =
    (baseRate * commissionAdjustedAPYFactor) / totalDelegations + incentives;
  return isNaN(apr) ? baseRate : apr;
}

export const GetStkAtomValidatorAPY = async () => {
  const apr = await GetStkAtomValidatorAPR();
  return (1 + Number(apr) / 365) ** 365 - 1;
};

export const getValidatorStates = async () => {
  const rpcClient = await RpcClient(persistenceChainInfo!.rpc);
  const pstakeQueryService = new QueryClientImpl(rpcClient);
  const allowListedValidators: QueryAllowListedValidatorsResponse =
    await pstakeQueryService.AllowListedValidators({});
  const cosmosRpcClient = await RpcClient(cosmosChainInfo!.rpc);
  const cosmosQueryService = new StakeQuery(cosmosRpcClient);
  const validators =
    allowListedValidators!.allowListedValidators!.allowListedValidators;
  let pstakeValidators: any = {};
  for (let validator of validators) {
    pstakeValidators[validator.validatorAddress] = {
      targetWeight: validator.targetWeight,
      commission: 1,
      delegation: 0
    }; //keep commission 1
  }
  const pstakeDelegationState: QueryDelegationStateResponse =
    await pstakeQueryService.DelegationState({});
  for (const delegation of pstakeDelegationState!.delegationState!
    .hostAccountDelegations) {
    if (pstakeValidators.hasOwnProperty(delegation.validatorAddress)) {
      // @ts-ignore
      pstakeValidators[delegation.validatorAddress].delegation =
        delegation!.amount!.amount;
    } else {
      // @ts-ignore
      pstakeValidators[delegation.validatorAddress] = {
        targetWeight: 0,
        commission: 1,
        delegation: delegation!.amount!.amount
      };
    }
  }
  let key: any = new Uint8Array();
  let cosmosValidators = [];
  do {
    const validatorCommission = await cosmosQueryService.Validators({
      status: "BOND_STATUS_BONDED",
      pagination: {
        key: key,
        offset: Long.fromNumber(0, true),
        limit: Long.fromNumber(0, true),
        countTotal: true,
        reverse: false
      }
    });
    key = validatorCommission?.pagination?.nextKey;
    cosmosValidators.push(...validatorCommission.validators);
  } while (key.length !== 0);

  if (cosmosValidators?.length !== 0) {
    for (let validator of cosmosValidators) {
      if (pstakeValidators.hasOwnProperty(validator.operatorAddress)) {
        pstakeValidators[validator?.operatorAddress]!.commission = parseFloat(
          decimalize(
            validator.commission
              ? validator!.commission!.commissionRates!.rate
              : 0,
            18
          )
        );
      }
    }
  }
  return pstakeValidators;
};
