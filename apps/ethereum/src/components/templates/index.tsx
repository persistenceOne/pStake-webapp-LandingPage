import React, { useEffect, useRef } from "react";
import SideBar from "../organisms/sidebar";
import NavigationBar from "../organisms/navigationBar";
import AddTokenModal from "../organisms/navigationBar/addToken/modal";
import { useAppStore } from "../../store/store";
import StakeInfoModal from "../organisms/staking/stakeModal";
import { ChainInfo, chains } from "../../helpers/config";
import {
  AlchemyProvider,
  JsonRpcProvider,
  JsonRpcSigner,
} from "@ethersproject/providers";
import { ethers } from "ethers";
import { addNetwork, handleMetamask } from "../../helpers/wallets";
import { getWalletProvider, resetStore } from "../../helpers/utils";
import { displayToast } from "ui";
import TxnInfoModal from "../organisms/bridge/txnModal";
import { shallow } from "zustand/shallow";
import { UNSUPPORTED_NETWORK } from "../../../appConstants";
import { ToastType } from "ui/components/molecules/toast/types";

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

export const Template = ({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className: string;
  title: string;
}) => {
  const fetchInitialData = useAppStore((state) => state.fetchInitialData);
  const fetchBalances = useAppStore((state) => state.fetchBalances);
  const handleNetworkError = useAppStore((state) => state.handleNetworkError);
  const handleWalletNetwork = useAppStore((state) => state.handleWalletNetwork);
  const handleWalletSigner = useAppStore((state) => state.handleWalletSigner);
  const fetchExchangeRate = useAppStore((state) => state.fetchExchangeRate);
  const fetchInstances = useAppStore((state) => state.fetchInstances);

  const [wallet, network] = useAppStore(
    (state) => [state.wallet, state.network.name],
    shallow
  );

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (wallet.walletConnection) {
      fetchBalances();
    }
  }, [wallet.account, network]);

  // loading exchangeRate before connecting wallet
  useEffect(() => {
    if (!wallet.walletConnection) {
      const fetchInitialInstances = async () => {
        await fetchExchangeRate();
      };
      fetchInitialInstances();
    }
  }, [wallet.walletConnection]);

  const handleAccountChange = async () => {
    if (wallet.walletConnection) {
      await handleMetamask();
    }
  };

  useEffect(() => {
    window.ethereum?.on("accountsChanged", handleAccountChange);
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountChange);
    };
  }, [wallet.walletConnection]);

  const handleChainChange = async (chainId: string) => {
    const metamaskProvider = getWalletProvider("Metamask");
    if (wallet.walletConnection) {
      const chainsData: any = chains[env];
      let networkCheck = false;
      let network: any;
      // check for network support
      for (const item in chainsData) {
        const chainInfo: ChainInfo = chainsData[item];
        if (chainId === chainInfo.networkIdHex) {
          network = item;
          networkCheck = true;
          break;
        } else {
          networkCheck = false;
        }
      }
      if (!networkCheck) {
        displayToast(
          {
            heading: UNSUPPORTED_NETWORK,
            message: "Please switch network to Ethereum or Optimism",
          },
          ToastType.ERROR
        );
        handleNetworkError(true);
      } else {
        const provider: JsonRpcProvider = new ethers.providers.Web3Provider(
          metamaskProvider
        );
        const signer: JsonRpcSigner = await provider.getSigner();
        handleWalletNetwork(network);
        handleWalletSigner(signer);
        await fetchInstances(signer);
        handleNetworkError(false);
      }
    }
  };

  useEffect(() => {
    window.ethereum?.on("chainChanged", handleChainChange);
    return () => {
      window.ethereum?.removeListener("chainChanged", handleChainChange);
    };
  }, [wallet.walletConnection]);

  return (
    <div>
      <div className="flex md:block bg-body-bg">
        <SideBar />
        <div
          className={`flex-1 h-screen overflow-auto bg-no-repeat ` + className}
        >
          <NavigationBar />
          {children}
        </div>
      </div>
      <AddTokenModal />
      <StakeInfoModal />
      <TxnInfoModal />
    </div>
  );
};
