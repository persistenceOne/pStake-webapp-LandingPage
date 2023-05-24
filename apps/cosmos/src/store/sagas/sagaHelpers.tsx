import { put } from "redux-saga/effects";
import React from "react";
import { displayToast } from "ui";
import { resetTransaction } from "../reducers/transaction";
import { fetchBalanceSaga } from "../reducers/balances";
import { ChainInfo } from "@keplr-wallet/types";
import { fetchPendingClaimsSaga } from "../reducers/claim";
import { TransactionType } from "../reducers/transaction/types";
import { ToastType } from "ui/components/molecules/toast/types";

export function* failedTransactionActions(txnHash: string) {
  displayToast(
    {
      message: `This transaction could not be completed${
        txnHash ? `: ${txnHash}` : ""
      }`,
    },
    ToastType.ERROR
  );
  yield put(resetTransaction());
}

export function* postTransactionActions(
  type: TransactionType,
  persistenceAddress: string,
  cosmosAddress: string,
  persistenceChainData: ChainInfo,
  cosmosChainData: ChainInfo
) {
  yield put(
    fetchBalanceSaga({
      persistenceAddress: persistenceAddress,
      cosmosAddress: cosmosAddress,
      persistenceChainInfo: persistenceChainData!,
      cosmosChainInfo: cosmosChainData!,
    })
  );
  if (type === "unstake" || type === "claim") {
    yield put(
      fetchPendingClaimsSaga({
        address: persistenceAddress,
        persistenceChainInfo: persistenceChainData!,
      })
    );
  }
}
