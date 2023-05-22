import { createSlice } from "@reduxjs/toolkit";
import {
  SetExchangeRate,
  FetchInitialDataSaga,
  InitialDataState,
  SetAPR,
  SetRedeemFee,
  SetMaxRedeem,
  SetMinRedeem,
  InitialTvlApyFeeTypes
} from "./types";
import { MIN_DEPOSIT } from "../../../../AppConstants";

export const initialTVLAPY: InitialTvlApyFeeTypes = {
  tvl: 0,
  total_apy: 0,
  fees: 0,
  total_supply: 0,
  borrow_apy: 0,
  lending_apy: 0
};

const initialState: InitialDataState = {
  exchangeRate: 1,
  apy: 0,
  redeemFee: 0,
  osmosisInfo: initialTVLAPY,
  maxRedeem: 0,
  minDeposit: MIN_DEPOSIT,
  crescentInfo: initialTVLAPY,
  dexterInfo: initialTVLAPY,
  umeeInfo:initialTVLAPY
};

const initData = createSlice({
  name: "InitData",
  initialState,
  reducers: {
    fetchInitSaga: (state, action: FetchInitialDataSaga) => {},
    setExchangeRate: (state, action: SetExchangeRate) => {
      state.exchangeRate = action.payload;
    },
    setAPY: (state, action: SetAPR) => {
      state.apy = action.payload;
    },
    setRedeemFee: (state, action: SetRedeemFee) => {
      state.redeemFee = action.payload;
    },
    setOsmosisInfo: (state, action) => {
      state.osmosisInfo = action.payload;
    },
    setMaxRedeem: (state, action: SetMaxRedeem) => {
      state.maxRedeem = action.payload;
    },
    setMinDeposit: (state, action: SetMinRedeem) => {
      state.minDeposit = action.payload;
    },
    setCrescentInfo: (state, action) => {
      state.crescentInfo = action.payload;
    },
    setDexterInfo: (state, action) => {
      state.dexterInfo = action.payload;
    },
    setUmeeInfo: (state, action) => {
      state.umeeInfo = action.payload;
    }
  }
});

export const {
  setRedeemFee,
  setAPY,
  fetchInitSaga,
  setOsmosisInfo,
  setExchangeRate,
  setMaxRedeem,
  setMinDeposit,
  setCrescentInfo,
  setDexterInfo,
  setUmeeInfo
} = initData.actions;

export default initData.reducer;
