import React, { useEffect, useRef, useState } from "react";
import Styles from "./styles.module.css";
import { useWallet } from "../../../context/WalletConnect/WalletConnect";
import { Icon, Button, Copy } from "ui";
import { stringTruncate } from "utils";
import { Window as KeplrWindow } from "@keplr-wallet/types/build/window";
import { useOnClickOutside, useWindowSize } from "hooks";
import { walletType } from "../../../context/WalletConnect/types";

declare global {
  interface Window extends KeplrWindow {}
}

const getLogo = (walletType: walletType) => {
  switch (walletType) {
    case "cosmosStation":
      return "cosmos_station";
    case "keplr":
      return "keplr_round";
    case "leap":
      return "leap";
  }
};

export const LoginOptions = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { connect, isWalletConnected, persistenceAccountData, walletType } =
    useWallet();
  const { isMobile } = useWindowSize();

  const connectHandler = async (wallet: walletType) => {
    await connect(wallet);
    setDropdownOpen(false);
  };

  const disconnectHandler = async () => {
    localStorage.removeItem("wallet");
    localStorage.removeItem("walletName");
    window.location.reload();
  };

  useEffect(() => {
    const fetchApi = async () => {
      if (walletType === "keplr") {
        window.addEventListener("keplr_keystorechange", async () => {
          await connect("keplr");
        });
      } else if (walletType === "cosmosStation") {
        window.cosmostation.cosmos.on("accountChanged", async () => {
          await connect("cosmosStation");
        });
      }
      return null;
    };
    if (isWalletConnected) {
      fetchApi();
    }
  }, [walletType, isWalletConnected, connect]);

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setDropdownOpen(false);
  });

  return (
    <div className="inline-block w-fit cursor-pointer relative">
      {isWalletConnected ? (
        <Button
          size="medium"
          type="custom"
          content={
            <span className="flex items-center">
              <span
                className={`${
                  dropdownOpen ? "pointer-events-none" : "pointer-events-auto"
                } 
              flex items-center py-2 pr-1.5 pl-3 !text-sm`}
                onClick={() => {
                  setDropdownOpen(true);
                }}
              >
                <img
                  src={`/images/wallets/${getLogo(walletType)}.svg`}
                  alt={"logo"}
                  className="w-[20px] h-[20px]"
                />
                <span className="ml-3">
                  {stringTruncate(
                    persistenceAccountData!.address,
                    isMobile ? 3 : 7
                  )}
                </span>
              </span>
              <span className="py-2 pr-3 pl-1.5">
                <Copy id={persistenceAccountData!.address} />
              </span>
            </span>
          }
          className="button custom connected md:text-xsm !text-sm"
        />
      ) : (
        <Button
          size="medium"
          type="primary"
          content="Connect Wallet"
          className={`${
            dropdownOpen ? "pointer-events-none" : "pointer-events-auto"
          }
             button md:text-xsm md:py-2 md:px-4 !text-sm !px-6`}
          onClick={() => {
            setDropdownOpen(true);
          }}
        />
      )}
      <div
        className={`${Styles.DropdownMenu} 
      ${dropdownOpen && Styles.DropdownMenuActive} 
      absolute bg-dropDown rounded-md w-fit min-w-full`}
        ref={ref}
      >
        {isWalletConnected ? (
          <>
            <div
              className="p-4 flex items-center md:py-3 rounded-md"
              onClick={disconnectHandler}
            >
              <Icon
                iconName="disconnect"
                viewClass="disconnect md:!w-[16px] md:!h-[16px]"
              />
              <span className="ml-4 text-light-high text-sm font-bold leading-normal uppercase md:text-xsm md:ml-2">
                Disconnect
              </span>
            </div>
          </>
        ) : (
          <div className="py-2">
            <div
              className="px-4 py-2 flex items-center md:py-3 hover:bg-[#383838] rounded-tr-md rounded-tl-md"
              onClick={() => connectHandler("keplr")}
            >
              <img
                src={"/images/wallets/keplr_round.svg"}
                alt={"logo"}
                className="w-[20px] h-[20px]"
              />
              <span className="ml-4 text-light-high text-sm font-medium leading-normal md:text-xsm md:ml-2">
                Keplr Wallet
              </span>
            </div>
            <div
              className="px-4 py-2 flex items-center md:py-3 hover:bg-[#383838] rounded-br-md rounded-bl-md"
              onClick={() => connectHandler("cosmosStation")}
            >
              <img
                src={"/images/wallets/cosmos_station.svg"}
                alt={"logo"}
                className="w-[20px] h-[20px]"
              />
              <span className="ml-4 text-light-high text-sm font-medium leading-normal md:text-xsm md:ml-2">
                Cosmostation
              </span>
            </div>
            <div
              className="px-4 py-2 flex items-center md:py-3 hover:bg-[#383838] rounded-br-md rounded-bl-md"
              onClick={() => connectHandler("leap")}
            >
              <img
                src={"/images/wallets/leap.svg"}
                alt={"logo"}
                className="w-[20px] h-[20px]"
              />
              <span className="ml-4 text-light-high text-sm font-medium leading-normal md:text-xsm md:ml-2">
                Leap Wallet
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginOptions;
