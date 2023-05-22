import { AccountData } from "@cosmjs/launchpad/build/signer";
import { OfflineSigner } from "@cosmjs/launchpad";
import { GasPrice } from "@cosmjs/stargate";
import { ChainInfo } from "@keplr-wallet/types";
import { OfflineDirectSigner } from "@cosmjs/proto-signing";

export interface IBCChainInfo {
  counterpartyChainId: string;
  chainName: string;
  sourceChannelId: string;
  destinationChannelId: string;
  portID: string;
  coinDenom: string;
  prefix: string;
}

export interface Options {
  prefix: string;
  broadcastPollIntervalMs: number;
  broadcastTimeoutMs: number;
  gasPrice: GasPrice;
}

export interface WalletProviderProps {
  cosmosChainInfo: ChainInfo;
  persistenceChainInfo: ChainInfo;
  children: JSX.Element;
}

export type walletType = "keplr" | "cosmosStation" | "leap";

export interface WalletState {
  isWalletConnected: boolean;
  persistenceAccountData: AccountData | null;
  cosmosAccountData: AccountData | null;
  cosmosChainData: ChainInfo | null;
  cosmosSigner: OfflineSigner | OfflineDirectSigner | null;
  persistenceSigner: OfflineSigner | OfflineDirectSigner | null;
  persistenceChainData: ChainInfo | null;
  connect: (walletType: walletType) => Promise<boolean>;
  walletType: walletType;
}
