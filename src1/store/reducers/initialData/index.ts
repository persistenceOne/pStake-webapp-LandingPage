import { createSlice } from "@reduxjs/toolkit";
import { FEES, POOL_LIQUIDITY } from "../../../../AppConstants";
import {
  SetExchangeRate,
  FetchInitialDataSaga,
  InitialDataState,
  SetAPR,
  SetRedeemFee,
  InitialLiquidityFees,
  SetMaxRedeem,
  SetMinRedeem
} from "./types";
import { MIN_DEPOSIT } from "../../../../AppConstants";

const initialLiquidity_Fees: InitialLiquidityFees = {
  [POOL_LIQUIDITY]: 0,
  [FEES]: 0
};

const initialState: InitialDataState = {
  exchangeRate: 1,
  apy: 0,
  redeemFee: 0,
  osmosisInfo: initialLiquidity_Fees,
  maxRedeem: 0,
  minDeposit: MIN_DEPOSIT
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
  setMinDeposit
} = initData.actions;

export default initData.reducer;
