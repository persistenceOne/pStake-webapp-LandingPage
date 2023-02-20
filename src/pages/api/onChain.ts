import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { ChainInfo } from "@keplr-wallet/types";
import { CHAIN_ID, CosmosChains } from "../../helpers/config";
import {
  QueryClientImpl,
  QueryAllowListedValidatorsResponse
} from "persistenceonejs/pstake/lscosmos/v1beta1/query";

import {
  QueryClientImpl as StakingQueryClient,
  QueryValidatorsResponse
} from "cosmjs-types/cosmos/staking/v1beta1/query";
import { AllowListedValidator } from "persistenceonejs/pstake/lscosmos/v1beta1/lscosmos";
import Long from "long";
import { decimalize } from "../../helpers/utils";
import { APR_BASE_RATE, APR_DEFAULT } from "../../../AppConstants";
import Axios from "axios";
const STK_BNB_SUBGRAPH_API =
  "https://api.thegraph.com/subgraphs/name/persistenceone/stkbnb";
export const APY_API = "https://api.persistence.one/pstake/stkatom/apy";

const env: string = process.env.NEXT_PUBLIC_ENV!;

const persistenceChainInfo = CosmosChains[env].find(
  (chain: ChainInfo) => chain.chainId === CHAIN_ID[env].persistenceChainID
);

const cosmosChainInfo = CosmosChains[env].find(
  (chain: ChainInfo) => chain.chainId === CHAIN_ID[env].cosmosChainID
);

export async function RpcClient(rpc: string) {
  const tendermintClient = await Tendermint34Client.connect(rpc);
  const queryClient = new QueryClient(tendermintClient);
  return createProtobufRpcClient(queryClient);
}

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
    console.log(e);
    return 0;
  }
};

export const getAPR = async () => {
  try {
    const baseRate = APR_BASE_RATE;
    const commission = await getCommission();
    const incentives = 0;
    const apr = baseRate - (commission / 100) * baseRate + incentives;
    return isNaN(apr) ? APR_DEFAULT : apr.toFixed(2);
  } catch (e) {
    return -1;
  }
};

export const getCosmosApy = async (): Promise<number> => {
  try {
    const res = await Axios.get(APY_API);
    if (res && res.data) {
      return Number((res.data * 100).toFixed(2));
    }
    return -1;
  } catch (e) {
    console.log(e, "getCosmosApy");
    return -1;
  }
};

export const getBNBApy = async () => {
  try {
    const res = await fetch(STK_BNB_SUBGRAPH_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `{
                  stats {
                    apr
                  }
             }`
      })
    });
    const responseJson = await res.json();
    if (responseJson && responseJson.data) {
      return Number(responseJson.data.stats[0].apr).toFixed(2);
    }
    return 0;
  } catch (e) {
    console.log(e, "getBNB");
    return 0;
  }
};
