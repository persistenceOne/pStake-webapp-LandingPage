import { StateCreator } from "zustand";
import { Networks } from "../../helpers/config";
import { handleWalletConnection } from "../../helpers/wallets";
import { Staking, StkETH } from "../../contracts/types";
import { AlchemyProvider, JsonRpcSigner } from "@ethersproject/providers";
import { getInstance } from "../../helpers/utils";
import produce from "immer";

export interface Instances {
  stkEthInstance: StkETH;
  stakingInstance: Staking;
}

export type WalletNames = "Metamask";

export interface WalletInfo {
  walletConnection: boolean;
  account: string | null;
  walletName: WalletNames | null;
}

export interface WalletSliceState {
  wallet: WalletInfo;
  tokenModal: {
    modal: boolean;
    networkToSwitch: Networks | null;
  };
  instances: Instances | null;
  network: {
    error: boolean;
    name: Networks | null;
  };
  walletSigner: JsonRpcSigner | null;
}

export interface WalletSliceActions {
  handleAddTokenNetwork: (value: Networks) => void;
  handleAddTokenModal: (value: boolean) => void;
  handleWalletSigner: (signer: JsonRpcSigner) => void;
  fetchInstances: (signer: JsonRpcSigner | AlchemyProvider) => Promise<any>;
  connectWallet: (
    contract: any,
    wallet: WalletNames,
    network: Networks
  ) => Promise<any>;
  handleWalletNetwork: (value: Networks) => void;
  handleNetworkError: (value: boolean) => void;
  resetWalletSlice: () => void;
}

export type WalletSlice = WalletSliceState & WalletSliceActions;

const initialState = {
  wallet: {
    account: "",
    walletConnection: false,
    walletName: null,
  },
  walletSigner: null,
  networkError: {
    name: null,
    error: null,
  },
  tokenModal: {
    modal: false,
    networkToSwitch: null,
  },
  network: {
    error: false,
    name: null,
  },
  instances: null,
};

export const createWalletSlice: StateCreator<WalletSlice> = (set) => ({
  ...initialState,
  fetchInstances: async (signer: JsonRpcSigner | AlchemyProvider) => {
    const response: Instances = await getInstance(signer);
    set((state) => ({
      ...state,
      instances: response,
    }));
  },
  handleAddTokenModal: (value: boolean) =>
    set(
      produce((state: WalletSlice) => {
        state.tokenModal.modal = value;
      })
    ),
  handleWalletSigner: (signer: JsonRpcSigner) => set({ walletSigner: signer! }),
  handleAddTokenNetwork: (value: Networks) =>
    set(
      produce((state: WalletSlice) => {
        state.tokenModal.networkToSwitch = value;
      })
    ),
  handleWalletNetwork: (value: Networks) =>
    set(
      produce((state: WalletSlice) => {
        state.network.name = value;
      })
    ),
  handleNetworkError: (value: boolean) =>
    set(
      produce((state: WalletSlice) => {
        state.network.error = value;
      })
    ),
  connectWallet: async (
    contract: any,
    wallet: WalletNames,
    network: Networks
  ) => {
    const response: WalletInfo = await handleWalletConnection(
      contract,
      wallet,
      network
    );
    set((state) => ({
      ...state,
      wallet: response,
    }));
  },
  resetWalletSlice: () => {
    set(initialState);
  },
});
