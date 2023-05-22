import { PayloadAction } from "@reduxjs/toolkit";
import { ChainInfo } from "@keplr-wallet/types";
import React from "react";

export interface InitialTvlApyFeeTypes {
  tvl?: number | React.ReactNode;
  total_apy?: number | React.ReactNode;
  fees?: number;
  borrow_apy?:  number | React.ReactNode;
  lending_apy?:  number | React.ReactNode;
  total_supply?:  number | React.ReactNode;
}

export interface InitialDataState {
  exchangeRate: number;
  apy: number;
  redeemFee: number;
  osmosisInfo: InitialTvlApyFeeTypes;
  crescentInfo: InitialTvlApyFeeTypes;
  dexterInfo: InitialTvlApyFeeTypes;
  umeeInfo: InitialTvlApyFeeTypes;
  maxRedeem: number;
  minDeposit: number;
}

export interface FetchInitialDataSagaParams {
  persistenceChainInfo: ChainInfo;
  cosmosChainInfo: ChainInfo;
}

export type SetExchangeRate = PayloadAction<number>;
export type SetAPR = PayloadAction<number>;
export type SetRedeemFee = PayloadAction<number>;
export type SetMaxRedeem = PayloadAction<number>;
export type SetMinRedeem = PayloadAction<number>;

export type FetchInitialDataSaga = PayloadAction<FetchInitialDataSagaParams>;
