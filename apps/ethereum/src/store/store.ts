import { create } from "zustand";
import { createSidebarSlice, SidebarSlice } from "./slices/sidebarSlice";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { BalanceSlice, createBalanceSlice } from "./slices/balanceSlice";
import {
  TransactionSlice,
  createTransactionSlice,
} from "./slices/transactions";
import {
  createInitialDataSlice,
  InitialDataSlice,
} from "./slices/initialDataSlice";
import { WalletSlice, createWalletSlice } from "./slices/walletSlice";

type StoreState = InitialDataSlice &
  SidebarSlice &
  BalanceSlice &
  TransactionSlice &
  WalletSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createSidebarSlice(...a),
  ...createBalanceSlice(...a),
  ...createTransactionSlice(...a),
  ...createInitialDataSlice(...a),
  ...createWalletSlice(...a),
}));

mountStoreDevtool("Store", useAppStore);
