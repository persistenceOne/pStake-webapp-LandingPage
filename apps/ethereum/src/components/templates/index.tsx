import React, { useEffect } from "react";
import SideBar from "../organisms/sidebar";
import NavigationBar from "../organisms/navigationBar";
import AddTokenModal from "../organisms/navigationBar/addToken/modal";
import { useAppStore } from "../../store/store";
import StakeInfoModal from "../organisms/staking/stakeModal";
import { chains } from "../../helpers/config";
import { AlchemyProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { handleMetamask } from "../../helpers/wallets";
import { resetStore } from "../../helpers/utils";
import { displayToast } from "UI";
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
  const wallet = useAppStore((state) => state.wallet);
  const fetchExchangeRate = useAppStore((state) => state.fetchExchangeRate);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (wallet.walletConnection) {
      fetchBalances();
    }
  }, [wallet.account]);

  // loading exchangeRate before connecting wallet
  useEffect(() => {
    if (!wallet.walletConnection) {
      const fetchInitialInstances = async () => {
        const apiKey: string = process.env.NEXT_PUBLIC_ALCHEMY_NODE!;
        const chain = chains[env]["ethereum"];
        const provider: AlchemyProvider = new ethers.providers.AlchemyProvider(
          chain.network,
          apiKey
        );
        await fetchExchangeRate(provider);
      };
      fetchInitialInstances();
    }
  }, [wallet.walletConnection]);

  useEffect(() => {
    // listen for account changes
    if (wallet.walletConnection) {
      let metamaskProvider: any;
      if (window.ethereum?.providers) {
        metamaskProvider = window.ethereum?.providers.find((item: any) => {
          return item && item.isMetaMask;
        });
      } else {
        metamaskProvider = window.ethereum;
      }

      metamaskProvider?.on("accountsChanged", function (accounts: any) {
        handleMetamask();
      });

      metamaskProvider?.on("chainChanged", function (chainId: string) {
        const chain = chains[env][wallet.network!];
        if (chainId !== chain.networkIdHex) {
          displayToast(
            {
              message: "Network changed please re-connect wallet",
            },
            ToastType.INFO
          );
          resetStore();
        }
      });
    }
  }, [wallet]);

  return (
    <div>
      <div className="flex md:block bg-body-bg">
        <SideBar />
        <div
          className={
            `flex-1 px-8 lg:px-4 h-screen overflow-auto bg-no-repeat ` +
            className
          }
        >
          <NavigationBar />
          {children}
        </div>
      </div>
      <AddTokenModal />
      <StakeInfoModal />
    </div>
  );
};
