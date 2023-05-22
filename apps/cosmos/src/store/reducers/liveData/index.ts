import { createSlice } from "@reduxjs/toolkit";
import {
  SetAtomPrice,
  FetchLiveDataSaga,
  InitialDataState,
  SetChainStatus,
  SetTVU
} from "./types";

const initialState: InitialDataState = {
  atomPrice: 0,
  tvu: 0,
  cosmosChainStatus: false,
  persistenceChainStatus: false
};

const initData = createSlice({
  name: "LiveData",
  initialState,
  reducers: {
    fetchLiveDataSaga: (state, action: FetchLiveDataSaga) => {},
    setAtomPrice: (state, action: SetAtomPrice) => {
      state.atomPrice = action.payload;
    },
    setCosmosChainStatus: (state, action: SetChainStatus) => {
      state.cosmosChainStatus = action.payload;
    },
    setTVU: (state, action: SetTVU) => {
      state.tvu = action.payload;
    },
    setPersistenceChainStatus: (state, action: SetChainStatus) => {
      state.persistenceChainStatus = action.payload;
    }
  }
});

export const {
  fetchLiveDataSaga,
  setAtomPrice,
  setTVU,
  setCosmosChainStatus,
  setPersistenceChainStatus
} = initData.actions;

export default initData.reducer;
