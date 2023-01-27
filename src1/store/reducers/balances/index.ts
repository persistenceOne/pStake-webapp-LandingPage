import { createSlice } from "@reduxjs/toolkit";
import {
  BalanceState,
  FetchBalanceSaga,
  SetAtomBalance,
  SetIbcAtomBalance,
  SetStkAtomBalance
} from "./types";

const initialState: BalanceState = {
  atomBalance: 0,
  stkAtomBalance: 0,
  ibcAtomBalance: 0
};

const balances = createSlice({
  name: "Balance",
  initialState,
  reducers: {
    fetchBalanceSaga: (state, action: FetchBalanceSaga) => {},
    setAtomBalance: (state, action: SetAtomBalance) => {
      state.atomBalance = action.payload;
    },
    setStkAtomBalance: (state, action: SetStkAtomBalance) => {
      state.stkAtomBalance = action.payload;
    },
    setIbcAtomBalance: (state, action: SetIbcAtomBalance) => {
      state.ibcAtomBalance = action.payload;
    }
  }
});

export const {
  setAtomBalance,
  setStkAtomBalance,
  setIbcAtomBalance,
  fetchBalanceSaga
} = balances.actions;

export default balances.reducer;
