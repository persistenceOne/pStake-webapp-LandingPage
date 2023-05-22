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
  network: Networks | null;
  signer: JsonRpcSigner | null;
}

export interface WalletSliceState {
  wallet: WalletInfo;
  tokenModal: {
    modal: boolean;
    networkToSwitch: Networks | null;
  };
  instances: Instances | null;
}

export interface WalletSliceActions {
  handleAddTokenNetwork: (value: Networks) => void;
  handleAddTokenModal: (value: boolean) => void;
  fetchInstances: (signer: JsonRpcSigner | AlchemyProvider) => Promise<any>;
  connectWallet: (
    contract: any,
    wallet: WalletNames,
    network: Networks
  ) => Promise<any>;
  resetWalletSlice: () => void;
}

export type WalletSlice = WalletSliceState & WalletSliceActions;

const initialState = {
  wallet: {
    account: "",
    walletConnection: false,
    network: null,
    walletName: null,
    signer: null,
  },
  tokenModal: {
    modal: false,
    networkToSwitch: null,
  },
  instances: null,
};

export const createWalletSlice: StateCreator<WalletSlice> = (set) => ({
  ...initialState,
  fetchInstances: async (signer: JsonRpcSigner | AlchemyProvider) => {
    const response: Instances = await getInstance(signer);
    set({
      instances: response,
    });
  },
  handleAddTokenModal: (value: boolean) =>
    set(
      produce((state: WalletSlice) => {
        state.tokenModal.modal = value;
      })
    ),
  handleAddTokenNetwork: (value: Networks) =>
    set(
      produce((state: WalletSlice) => {
        state.tokenModal.networkToSwitch = value;
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
    set({
      wallet: response,
    });
  },
  resetWalletSlice: () => {
    set(initialState);
  },
});
