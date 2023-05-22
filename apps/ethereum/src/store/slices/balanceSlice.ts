import { StateCreator } from "zustand";
import { getEthBalance, getStkEthBalance } from "../../helpers/utils";

export interface BalanceSliceState {
  balance: {
    eth: number | string;
    stkETH: number | string;
  };
}

export interface BalanceSliceActions {
  fetchBalances: () => Promise<any>;
  resetBalanceSlice: () => void;
}

const initialState: BalanceSliceState = {
  balance: {
    eth: 0,
    stkETH: 0,
  },
};

export type BalanceSlice = BalanceSliceState & BalanceSliceActions;

export const createBalanceSlice: StateCreator<BalanceSlice> = (set) => ({
  ...initialState,
  fetchBalances: async () => {
    const ethBalance = await getEthBalance();
    const sktEthBalance = await getStkEthBalance();
    set({
      balance: {
        eth: ethBalance,
        stkETH: sktEthBalance,
      },
    });
  },
  resetBalanceSlice: () => {
    set(initialState);
  },
});
