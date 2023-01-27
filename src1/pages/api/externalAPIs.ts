import Axios from "axios";
import { genericErrorHandler } from "../../helpers/utils";
import { Scope } from "@sentry/nextjs";
import { FEES, POOL_LIQUIDITY } from "../../../AppConstants";

export const ATOM_PRICE_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=cosmos&order=market_cap_desc&per_page=100&page=1&sparkline=false";
export const OSMOSIS_POOL_URL = "https://api-osmosis.imperator.co/pools/v2/886";

const initialLiquidity_Fees = { [POOL_LIQUIDITY]: 0, [FEES]: 0 };

export const fetchAtomPrice = async (): Promise<number> => {
  try {
    const res = await Axios.get(ATOM_PRICE_URL);
    if (res && res.data && res.data[0]) {
      return Number(res.data[0].current_price);
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
  return 0;
};

export const fetchOsmosisPoolInfo = async () => {
  try {
    const res = await Axios.get(OSMOSIS_POOL_URL);
    if (res && res.data) {
      return {
        [POOL_LIQUIDITY]: Math.round(res.data[0].liquidity).toLocaleString(),
        [FEES]: res.data[0].fees
      };
    }
  } catch (e) {
    const customScope = new Scope();
    customScope.setLevel("fatal");
    customScope.setTags({
      "Error fetching info from osmosis": OSMOSIS_POOL_URL
    });
    genericErrorHandler(e, customScope);
    return initialLiquidity_Fees;
  }
  return initialLiquidity_Fees;
};
