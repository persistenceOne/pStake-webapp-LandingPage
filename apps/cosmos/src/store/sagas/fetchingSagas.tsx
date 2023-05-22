import { FetchBalanceSaga } from "../reducers/balances/types";
import {
  fetchAccountBalance,
  fetchAllEpochEntries,
  getTokenBalance
} from "../../pages/api/onChain";
import { put } from "@redux-saga/core/effects";
import {
  setAtomBalance,
  setIbcAtomBalance,
  setStkAtomBalance,
  setXprtBalance
} from "../reducers/balances";
import { decimalize } from "../../helpers/utils";
import { CHAIN_ID, IBCChainInfos } from "../../helpers/config";
import { STK_ATOM_MINIMAL_DENOM } from "../../../AppConstants";
import { FetchPendingClaimSaga } from "../reducers/claim/types";
import {
  setClaimableBalance,
  setClaimableStkAtomBalance,
  setPendingClaimList,
  setUnlistedPendingClaimList
} from "../reducers/claim";
import { fetchAtomPrice, getTVU } from "../../pages/api/externalAPIs";

import { FetchLiveDataSaga } from "../reducers/liveData/types";
import { setAtomPrice, setTVU } from "../reducers/liveData";

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

let IBCInfo = IBCChainInfos[env].find(
  (chain) => chain.counterpartyChainId === CHAIN_ID[env].cosmosChainID
);

export function* fetchBalance({ payload }: FetchBalanceSaga) {
  const {
    persistenceAddress,
    cosmosAddress,
    persistenceChainInfo,
    cosmosChainInfo
  }: any = payload;
  //fetch balance on persistence chain
  // @ts-ignore
  const persistenceBalances: any = yield fetchAccountBalance(
    persistenceAddress,
    persistenceChainInfo.rpc
  );

  //fetch balance on cosmos chain
  // @ts-ignore
  const cosmosBalances: any = yield fetchAccountBalance(
    cosmosAddress,
    cosmosChainInfo.rpc
  );

  //atom balance on persistence chain
  const ibcAtomBalance = getTokenBalance(
    persistenceBalances,
    IBCInfo!.coinDenom
  );

  //stkAtom balance on persistence chain
  const stkAtomBalance = getTokenBalance(
    persistenceBalances,
    STK_ATOM_MINIMAL_DENOM
  );

  //xprt balance on persistence chain
  const xprtBalance = getTokenBalance(
    persistenceBalances,
    persistenceChainInfo.stakeCurrency.coinMinimalDenom
  );

  //atom balance on cosmos chain
  const atomBalance = getTokenBalance(
    cosmosBalances,
    cosmosChainInfo.stakeCurrency.coinMinimalDenom
  );

  yield put(setIbcAtomBalance(Number(decimalize(ibcAtomBalance))));
  yield put(setXprtBalance(Number(decimalize(xprtBalance))));
  yield put(setStkAtomBalance(Number(decimalize(stkAtomBalance))));
  yield put(setAtomBalance(Number(decimalize(atomBalance))));
}

export function* fetchPendingClaims({ payload }: FetchPendingClaimSaga) {
  const { address, persistenceChainInfo }: any = payload;
  // @ts-ignore
  const accountEpochs: any = yield fetchAllEpochEntries(
    address,
    persistenceChainInfo.rpc
  );
  yield put(setClaimableBalance(accountEpochs.claimableAmount));
  yield put(setPendingClaimList(accountEpochs.filteredPendingClaims));
  yield put(
    setUnlistedPendingClaimList(accountEpochs.filteredUnlistedPendingClaims)
  );
  yield put(setClaimableStkAtomBalance(accountEpochs.totalFailedUnbondAmount));
}

// @ts-ignore
export function* fetchLiveData({ payload }: FetchLiveDataSaga) {
  const { persistenceChainInfo }: any = payload;
  const [tvu, atomPrice] = yield Promise.all([getTVU(), fetchAtomPrice()]);
  yield put(setAtomPrice(atomPrice));
  yield put(setTVU(tvu));
}
