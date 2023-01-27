import {
  QueryAllBalancesResponse,
  QueryClientImpl as BankQuery,
  QueryTotalSupplyResponse
} from "cosmjs-types/cosmos/bank/v1beta1/query";

import { decimalize, RpcClient } from "../../helpers/utils";

import { Scope } from "@sentry/nextjs";
import { Coin } from "@cosmjs/proto-signing";
import Long from "long";
import moment from "moment";
import { ChainInfo } from "@keplr-wallet/types";
import {
  APR_BASE_RATE,
  APR_DEFAULT,
  STK_ATOM_MINIMAL_DENOM
} from "../../../AppConstants";
const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

export const getAPR = async () => {
  try {
    const baseRate = APR_BASE_RATE;
    const commission = await getCommission();
    const incentives = 0;
    const apr = baseRate - (commission / 100) * baseRate + incentives;
    return isNaN(apr) ? APR_DEFAULT : apr.toFixed(2);
  } catch (e) {
    const customScope = new Scope();
    customScope.setLevel("fatal");
    customScope.setTags({
      "Error while fetching exchange rate": "persistenceChainInfo?.rpc"
    });
    genericErrorHandler(e, customScope);
    return -1;
  }
};

export const getAPY = async () => {
  try {
    const apr = await getAPR();
    const apy = ((1 + Number(apr) / 36500) ** 365 - 1) * 100;
    return apy.toFixed(2);
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
