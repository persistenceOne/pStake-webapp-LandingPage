import Axios from "axios";
import { decimalize, genericErrorHandler } from "../../helpers/utils";
import { Scope } from "@sentry/nextjs";
import { APR_DEFAULT, CRESCENT_STK_ATOM_DENOM } from "../../../AppConstants";
import { initialTVLAPY } from "../../store/reducers/initialData";
import { InitialTvlApyFeeTypes } from "../../store/reducers/initialData/types";

export const ATOM_PRICE_URL = "https://api.coingecko.com/api/v3/coins/cosmos";
export const OSMOSIS_POOL_URL = "https://api-osmosis.imperator.co/pools/v2/886";
export const OSMOSIS_POOL_APR_URL = "https://api.osmosis.zone/apr/v2/886";
export const CRESCENT_POOL_URL = "https://apigw-v3.crescent.network/pool/live";
export const UMEE_URL =
  "https://testnet-client-bff-ocstrhuppq-uc.a.run.app/convexity/assets/all";
export const STK_ATOM_APY_API =
  "https://api.persistence.one/pstake/stkatom/apy";
export const STK_ATOM_CVALUE_API =
  "https://api.persistence.one/pstake/stkatom/c_value";
export const STK_ATOM_TVU_API =
  "https://api.persistence.one/pstake/stkatom/atom_tvu";
export const DEXTER_POOL_URL = "https://api.core-1.dexter.zone/v1/graphql";

export const fetchAtomPrice = async (): Promise<number> => {
  try {
    const res = await Axios.get(ATOM_PRICE_URL);
    if (res && res.data) {
      return res.data.market_data.current_price.usd;
    }
    return 1;
  } catch (e) {
    const customScope = new Scope();
    customScope.setLevel("fatal");
    customScope.setTags({
      "Error fetching price of ATOM": ATOM_PRICE_URL
    });
    genericErrorHandler(e, customScope);
    return 0;
  }
};

export const getStkAtomAPY = async (): Promise<number> => {
  try {
    const res = await Axios.get(STK_ATOM_APY_API);
    if (res && res.data) {
      return Number((res.data * 100).toFixed(2));
    }
    return -1;
  } catch (e) {
    const customScope = new Scope();
    customScope.setLevel("fatal");
    customScope.setTags({
      "Error fetching apy": STK_ATOM_APY_API
    });
    genericErrorHandler(e, customScope);
    return -1;
  }
};

export const getExchangeRate = async (): Promise<number> => {
  try {
    const res = await Axios.get(STK_ATOM_CVALUE_API);
    if (res && res.data) {
      return Number(res.data);
    }
    return 1;
  } catch (e) {
    const customScope = new Scope();
    customScope.setLevel("fatal");
    customScope.setTags({
      "Error while fetching exchange rate": STK_ATOM_CVALUE_API
    });
    genericErrorHandler(e, customScope);
    return 1;
  }
};

export const getTVU = async (): Promise<number> => {
  try {
    const res = await Axios.get(STK_ATOM_TVU_API);
    if (res && res.data) {
      return Number(res?.data!.amount!.amount);
    }
    return 0;
  } catch (e) {
    const customScope = new Scope();
    customScope.setLevel("fatal");
    customScope.setTags({
      "Error while fetching tvu": STK_ATOM_TVU_API
    });
    genericErrorHandler(e, customScope);
    return 0;
  }
};

export const fetchOsmosisPoolInfo = async () => {
  try {
    const responses = await Axios.all([
      Axios.get(OSMOSIS_POOL_URL),
      Axios.get(OSMOSIS_POOL_APR_URL)
    ]);
    const responseOne = responses[0];
    const responseTwo = responses[1];

    const osmoInfo: InitialTvlApyFeeTypes = {
      fees: 0,
      total_apy: 0,
      tvl: 0
    };

    if (responseTwo && responseTwo.data) {
      let poolIncentiveApr = 0;
      if (responseTwo.data[0].apr_list.length) {
        responseTwo.data[0].apr_list.forEach((item: any) => {
          poolIncentiveApr += item.apr_14d;
        });
      }
      osmoInfo.total_apy = poolIncentiveApr.toFixed(2);
    } else {
      osmoInfo.total_apy = 0;
    }
    if (responseOne && responseOne.data) {
      osmoInfo.tvl = Math.round(responseOne.data[0].liquidity).toFixed(2);
      osmoInfo.fees = responseOne.data[0].fees;
    } else {
      osmoInfo.fees = 0;
      osmoInfo.tvl = 0;
    }
    return osmoInfo;
  } catch (e) {
    const customScope = new Scope();
    customScope.setLevel("fatal");
    customScope.setTags({
      "Error fetching info from osmosis": OSMOSIS_POOL_URL
    });
    genericErrorHandler(e, customScope);
    return initialTVLAPY;
  }
};

export const fetchCrescentPoolInfo = async () => {
  try {
    const res = await Axios.get(CRESCENT_POOL_URL);
    if (res && res.data) {
      const response = res.data.data;
      let crescentInfo = response.find(
        (item: any) => item!.Reserved[1]?.denom === CRESCENT_STK_ATOM_DENOM
      );
      const atomTvl =
        Number(crescentInfo.Reserved[0].amount) *
        crescentInfo.Reserved[0].priceOracle;
      const stkAtomTvl =
        Number(crescentInfo.Reserved[1].amount) *
        crescentInfo.Reserved[1].priceOracle;
      return {
        tvl: Number(decimalize(atomTvl + stkAtomTvl)).toFixed(2),
        total_apy: Number(crescentInfo?.apr).toFixed(2)
      };
    }
  } catch (e) {
    const customScope = new Scope();
    customScope.setLevel("fatal");
    customScope.setTags({
      "Error fetching info from crescent": CRESCENT_POOL_URL
    });
    genericErrorHandler(e, customScope);
    return initialTVLAPY;
  }
  return initialTVLAPY;
};

export const fetchDexterPoolInfo = async () => {
  try {
    const res = await fetch(DEXTER_POOL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `{
            pool_aggregate_data {
              fee_apr
              current_liquidity_usd
              pool_id
            }
            pool_current_incentive_apr {
               incentive_apr
               pool_id
            }
          }`
      })
    });
    const responseJson = await res.json();
    if (responseJson && responseJson.data) {
      const poolAggregate = responseJson.data.pool_aggregate_data?.find(
        (item: any) => item.pool_id === 1
      );
      const poolIncentiveAprList =
        responseJson.data.pool_current_incentive_apr?.filter((item: any) => {
          return item.pool_id === 1;
        });
      let poolIncentiveApr = 0;
      if (poolIncentiveAprList && poolIncentiveAprList.length) {
        poolIncentiveAprList.forEach((item: any) => {
          poolIncentiveApr += item.incentive_apr;
        });
      }
      return {
        fees: 0.3,
        total_apy: (
          poolAggregate.fee_apr + (poolIncentiveApr ? poolIncentiveApr : 0)
        ).toFixed(2),
        tvl: poolAggregate.current_liquidity_usd!.toFixed(2)
      };
    }
    return initialTVLAPY;
  } catch (e) {
    const customScope = new Scope();
    customScope.setLevel("fatal");
    customScope.setTags({
      "Error fetching info from dexter": DEXTER_POOL_URL
    });
    genericErrorHandler(e, customScope);
    return initialTVLAPY;
  }
};

export const fetchUmeeInfo = async (): Promise<InitialTvlApyFeeTypes> => {
  try {
    const res = await Axios.get(UMEE_URL);
    if (res && res.data) {
      const stkatom = res.data.find((item: any) => item.asset === "STKATOM");
      if (stkatom) {
        return {
          borrow_apy: Number(stkatom.borrow_apy).toFixed(2),
          lending_apy: Number(stkatom.supply_apy).toFixed(2),
          total_supply: Number(stkatom.market_size_usd).toFixed(2)
        };
      }
      return initialTVLAPY;
    }
    return initialTVLAPY;
  } catch (e) {
    const customScope = new Scope();
    customScope.setLevel("fatal");
    customScope.setTags({
      "Error fetching info from umee": UMEE_URL
    });
    genericErrorHandler(e, customScope);
    return initialTVLAPY;
  }
};
