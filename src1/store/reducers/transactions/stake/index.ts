import { createSlice } from "@reduxjs/toolkit";
import {
  SetStakeAmount,
  StakeAmount,
  StakeTransactionPayload,
  SetTransactionFailedStatus,
  SetTransactionStep
} from "./types";

const initialState: StakeAmount = {
  amount: "",
  showModal: false,
  txFailed: false,
  stepNumber: 0
};

const stake = createSlice({
  name: "Stake",
  initialState,
  reducers: {
    executeStakeTransactionSaga: (state, action: StakeTransactionPayload) => {},
    setStakeAmount: (state, { payload }: SetStakeAmount) => {
      state.amount = payload;
    },
    hideStakeModal: (state) => {
      state.showModal = false;
    },
    showStakeModal: (state) => {
      state.showModal = true;
    },
    setStakeTxnFailed: (state, { payload }: SetTransactionFailedStatus) => {
      state.txFailed = payload;
    },
    setStakeTxnStepNumber: (state, { payload }: SetTransactionStep) => {
      state.stepNumber = payload;
    }
  }
});

export const {
  setStakeAmount,
  executeStakeTransactionSaga,
  hideStakeModal,
  showStakeModal,
  setStakeTxnFailed,
  setStakeTxnStepNumber
} = stake.actions;

export default stake.reducer;
