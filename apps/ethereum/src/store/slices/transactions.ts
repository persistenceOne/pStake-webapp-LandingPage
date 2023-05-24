import { StateCreator } from "zustand";
import produce from "immer";
import { Networks } from "../../helpers/config";
import { bool } from "prop-types";
import { SidebarSlice } from "./sidebarSlice";

export type TransactionNames =
  | "stake"
  | "mintOnOptimism"
  | "transferToOptimism"
  | null;

export type TransactionStatus = "failed" | "success" | null;

export interface TransactionSliceActions {
  setStakeTxnModal: (value: boolean) => void;
  setBridgeTxnModal: (value: boolean) => void;
  setBridgeInputAmount: (value: number | string) => void;
  setStakeNetwork: (value: Networks) => void;
  setStakeInputAmount: (value: number | string) => void;
  setTxnInfo: (
    inProgress: boolean,
    name: TransactionNames,
    status?: TransactionStatus
  ) => void;
  setTxnBroadCast: (broadCast: boolean) => void;
  resetTxnSlice: () => void;
}

export interface TransactionSliceState {
  stakeTxnInfo: {
    amount: number | string;
    stakeNetwork: Networks;
    modal: boolean;
  };
  bridgeTxnInfo: {
    amount: number | string;
    modal: boolean;
  };
  transactionInfo: {
    inProgress: boolean;
    name: TransactionNames | null;
    status?: TransactionStatus;
  };
  txnBroadCast: boolean;
}

export type TransactionSlice = TransactionSliceState & TransactionSliceActions;

const initialState: TransactionSliceState = {
  stakeTxnInfo: {
    amount: "",
    stakeNetwork: "optimism",
    modal: false,
  },
  transactionInfo: {
    inProgress: false,
    name: null,
    status: null,
  },
  bridgeTxnInfo: {
    amount: "",
    modal: false,
  },
  txnBroadCast: false,
};

export const createTransactionSlice: StateCreator<TransactionSlice> = (
  set
) => ({
  ...initialState,
  setStakeTxnModal: (value: boolean) =>
    set(
      produce((state: TransactionSlice) => {
        state.stakeTxnInfo.modal = value;
      })
    ),
  setBridgeTxnModal: (value: boolean) =>
    set(
      produce((state: TransactionSlice) => {
        state.bridgeTxnInfo.modal = value;
      })
    ),
  setStakeInputAmount: (value: string | number) =>
    set(
      produce((state: TransactionSlice) => {
        state.stakeTxnInfo.amount = value;
      })
    ),
  setBridgeInputAmount: (value: string | number) =>
    set(
      produce((state: TransactionSlice) => {
        state.bridgeTxnInfo.amount = value;
      })
    ),
  setStakeNetwork: (value: Networks) =>
    set(
      produce((state: TransactionSlice) => {
        state.stakeTxnInfo.stakeNetwork = value;
      })
    ),
  setTxnInfo: (
    inProgress: boolean,
    name: TransactionNames,
    status?: TransactionStatus
  ) => set((state) => ({ transactionInfo: { inProgress, name, status } })),
  setTxnBroadCast: (broadCast: boolean) =>
    set(
      produce((state: TransactionSlice) => {
        state.txnBroadCast = broadCast;
      })
    ),
  resetTxnSlice: () => {
    set(initialState);
  },
});
