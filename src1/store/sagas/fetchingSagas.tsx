import { FetchBalanceSaga } from "../reducers/balances/types";
import {
  fetchAccountBalance,
  fetchAllEpochEntries,
  getChainStatus,
  getTVU
} from "../../pages/api/onChain";
import { put } from "@redux-saga/core/effects";
import {
  setAtomBalance,
  setIbcAtomBalance,
  setStkAtomBalance
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
import { fetchAtomPrice } from "../../pages/api/externalAPIs";

import { FetchLiveDataSaga } from "../reducers/liveData/types";
import {
  setAtomPrice,
  setCosmosChainStatus,
  setPersistenceChainStatus,
  setTVU
} from "../reducers/liveData";

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
  //atom balance on persistence chain
  const ibcAtomBalance: number = yield fetchAccountBalance(
    persistenceAddress,
    IBCInfo!.coinDenom,
    persistenceChainInfo.rpc
  );
  //stk atom balance
  const stkAtomBalance: number = yield fetchAccountBalance(
    persistenceAddress,
    STK_ATOM_MINIMAL_DENOM,
    persistenceChainInfo.rpc
  );
  //atom balance on cosmos chain
  const atomBalance: number = yield fetchAccountBalance(
    cosmosAddress,
    cosmosChainInfo.stakeCurrency.coinMinimalDenom,
    cosmosChainInfo.rpc
  );
  yield put(setIbcAtomBalance(Number(decimalize(ibcAtomBalance))));
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
  const { persistenceChainInfo, cosmosChainInfo }: any = payload;
  const [tvu, cosmosChainStatus, persistenceChainStatus, atomPrice] =
    yield Promise.all([
      getTVU(persistenceChainInfo.rpc),
      getChainStatus(cosmosChainInfo.rpc),
      getChainStatus(persistenceChainInfo.rpc),
      fetchAtomPrice()
    ]);
  yield put(setAtomPrice(atomPrice));
  yield put(setTVU(tvu));
  yield put(setCosmosChainStatus(cosmosChainStatus));
  yield put(setPersistenceChainStatus(persistenceChainStatus));
}
