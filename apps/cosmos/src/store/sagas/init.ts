import {
  FetchInitialDataSaga,
  InitialTvlApyFeeTypes
} from "../reducers/initialData/types";
import { getFee, getMaxRedeem } from "../../pages/api/onChain";
import {
  fetchCrescentPoolInfo,
  fetchDexterPoolInfo,
  fetchOsmosisPoolInfo,
  fetchUmeeInfo,
  getExchangeRate
} from "../../pages/api/externalAPIs";
import { put } from "@redux-saga/core/effects";
import {
  setExchangeRate,
  setOsmosisInfo,
  setMaxRedeem,
  setCrescentInfo,
  setRedeemFee,
  setDexterInfo,
  setUmeeInfo
} from "../reducers/initialData";

export function* fetchInit({ payload }: FetchInitialDataSaga): any {
  const { persistenceChainInfo }: any = payload;
  const [exchangeRate, redeemFee, maxRedeem] = yield Promise.all([
    getExchangeRate(),
    getFee(persistenceChainInfo.rpc),
    getMaxRedeem(persistenceChainInfo.rpc)
  ]);
  yield put(setExchangeRate(exchangeRate));
  yield put(setRedeemFee(redeemFee));
  const osmosisInfo: InitialTvlApyFeeTypes = yield fetchOsmosisPoolInfo();
  const crescentInfo: InitialTvlApyFeeTypes = yield fetchCrescentPoolInfo();
  const dexterInfo: InitialTvlApyFeeTypes = yield fetchDexterPoolInfo();
  const umeeInfo: InitialTvlApyFeeTypes = yield fetchUmeeInfo();
  yield put(setDexterInfo(dexterInfo));
  yield put(setCrescentInfo(crescentInfo));
  yield put(setOsmosisInfo(osmosisInfo));
  yield put(setUmeeInfo(umeeInfo));
  yield put(setMaxRedeem(maxRedeem));
}
