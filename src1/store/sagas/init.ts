import {
  FetchInitialDataSaga,
  InitialLiquidityFees
} from "../reducers/initialData/types";
import {
  getAPR,
  getExchangeRate,
  getMaxRedeem,
  getFee
} from "../../pages/api/onChain";
import { fetchOsmosisPoolInfo } from "../../pages/api/externalAPIs";
import { put } from "@redux-saga/core/effects";
import {
  setExchangeRate,
  setOsmosisInfo,
  setMaxRedeem,
  setRedeemFee
} from "../reducers/initialData";

export function* fetchInit({ payload }: FetchInitialDataSaga): any {
  const { persistenceChainInfo }: any = payload;
  const [exchangeRate, fee, maxRedeem] = yield Promise.all([
    getExchangeRate(persistenceChainInfo.rpc),
    getFee(persistenceChainInfo.rpc),
    getMaxRedeem(persistenceChainInfo.rpc)
  ]);
  yield put(setExchangeRate(exchangeRate));
  yield put(setRedeemFee(fee));
  const osmosisInfo: InitialLiquidityFees = yield fetchOsmosisPoolInfo();
  yield put(setOsmosisInfo(osmosisInfo));
  yield put(setMaxRedeem(maxRedeem));
}
