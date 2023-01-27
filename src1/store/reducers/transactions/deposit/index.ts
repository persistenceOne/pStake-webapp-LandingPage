import { createSlice } from "@reduxjs/toolkit";
import {
  SetDepositAmount,
  DepositState,
  DepositTransactionPayload
} from "./types";

const initialState: DepositState = {
  amount: "",
  showModal: false
};

const deposit = createSlice({
  name: "Deposit",
  initialState,
  reducers: {
    executeDepositTransactionSaga: (
      state,
      action: DepositTransactionPayload
    ) => {},
    setDepositAmount: (state, { payload }: SetDepositAmount) => {
      state.amount = payload;
    },
    hideDepositModal: (state) => {
      state.showModal = false;
    },
    showDepositModal: (state) => {
      state.showModal = true;
    }
  }
});

export const {
  executeDepositTransactionSaga,
  setDepositAmount,
  showDepositModal,
  hideDepositModal
} = deposit.actions;

export default deposit.reducer;
