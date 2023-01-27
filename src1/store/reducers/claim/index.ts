import { createSlice } from "@reduxjs/toolkit";
import {
  ClaimState,
  SetPendingClaimList,
  SetClaimableBalance,
  FetchPendingClaimSaga,
  SetClaimableStkAtomBalance
} from "./types";

const initialState: ClaimState = {
  pendingClaimList: [],
  claimableBalance: 0,
  claimableStkAtomBalance: 0,
  unlistedPendingClaimList: []
};

const claimQueries = createSlice({
  name: "ClaimQueries",
  initialState,
  reducers: {
    fetchPendingClaimsSaga: (state, action: FetchPendingClaimSaga) => {},
    setPendingClaimList: (state, action: SetPendingClaimList) => {
      state.pendingClaimList = action.payload;
    },
    setUnlistedPendingClaimList: (state, action: SetPendingClaimList) => {
      state.unlistedPendingClaimList = action.payload;
    },
    setClaimableBalance: (state, action: SetClaimableBalance) => {
      state.claimableBalance = action.payload;
    },
    setClaimableStkAtomBalance: (state, action: SetClaimableStkAtomBalance) => {
      state.claimableStkAtomBalance = action.payload;
    }
  }
});

export const {
  fetchPendingClaimsSaga,
  setPendingClaimList,
  setClaimableBalance,
  setClaimableStkAtomBalance,
  setUnlistedPendingClaimList
} = claimQueries.actions;

export default claimQueries.reducer;
