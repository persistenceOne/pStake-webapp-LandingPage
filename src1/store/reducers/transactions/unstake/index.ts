import { createSlice } from "@reduxjs/toolkit";
import {
  SetUnStakeAmount,
  UnStakeAmount,
  UnStakeTransactionPayload,
  SetUnStakeOption
} from "./types";

const initialState: UnStakeAmount = {
  amount: "",
  type: "instant"
};

const unStake = createSlice({
  name: "Unstake",
  initialState,
  reducers: {
    executeUnStakeTransactionSaga: (
      state,
      action: UnStakeTransactionPayload
    ) => {},
    setUnStakeAmount: (state, { payload }: SetUnStakeAmount) => {
      state.amount = payload;
    },
    setUnStakeOption: (state, { payload }: SetUnStakeOption) => {
      state.type = payload;
    }
  }
});

export const {
  setUnStakeAmount,
  executeUnStakeTransactionSaga,
  setUnStakeOption
} = unStake.actions;

export default unStake.reducer;
