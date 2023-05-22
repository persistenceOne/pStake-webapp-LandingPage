import { createSlice } from "@reduxjs/toolkit";
import {
  WithdrawTransactionPayload,
  WithdrawState,
  SetTransactionStep,
  SetTransactionFailedStatus,
  SetWithdrawAmount
} from "./types";

const initialState: WithdrawState = {
  amount: 0,
  showModal: false,
  txFailed: false,
  stepNumber: 0
};

const withdraw = createSlice({
  name: "Withdraw",
  initialState,
  reducers: {
    executeWithdrawTransactionSaga: (
      state,
      action: WithdrawTransactionPayload
    ) => {},
    hideWithdrawModal: (state) => {
      state.showModal = false;
    },
    setWithdrawAmount: (state, { payload }: SetWithdrawAmount) => {
      state.amount = payload;
    },
    showWithdrawModal: (state) => {
      state.showModal = true;
    },
    setWithdrawTxnFailed: (state, { payload }: SetTransactionFailedStatus) => {
      state.txFailed = payload;
    },
    setWithdrawTxnStepNumber: (state, { payload }: SetTransactionStep) => {
      state.stepNumber = payload;
    }
  }
});

export const {
  executeWithdrawTransactionSaga,
  hideWithdrawModal,
  showWithdrawModal,
  setWithdrawTxnFailed,
  setWithdrawTxnStepNumber,
  setWithdrawAmount
} = withdraw.actions;

export default withdraw.reducer;
