import { createSlice } from "@reduxjs/toolkit";
import {
  SetStakeAmount,
  StakeAmount,
  StakeTransactionPayload,
  SetTransactionFailedStatus,
  SetTransactionStep,
  SetLiquidStakeType
} from "./types";

const initialState: StakeAmount = {
  amount: "",
  showModal: false,
  txFailed: false,
  stepNumber: 0,
  liquidStakeType: "single"
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
    },
    setLiquidStakeTxnType: (state, { payload }: SetLiquidStakeType) => {
      state.liquidStakeType = payload;
    }
  }
});

export const {
  setStakeAmount,
  executeStakeTransactionSaga,
  hideStakeModal,
  showStakeModal,
  setStakeTxnFailed,
  setStakeTxnStepNumber,
  setLiquidStakeTxnType
} = stake.actions;

export default stake.reducer;
