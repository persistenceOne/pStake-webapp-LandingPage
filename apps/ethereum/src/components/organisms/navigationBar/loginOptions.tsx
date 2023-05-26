import React, { useEffect, useRef, useState } from "react";
import Styles from "./styles.module.css";
import { Button, Copy } from "ui";
import { Icon } from "../../atoms/icon";
import { stringTruncate } from "../../../helpers/utils";
import { useOnClickOutside, getStorageValue, useWindowSize } from "hooks";
import { handleMetamask } from "../../../helpers/wallets";
import { META_MASK } from "../../../../appConstants";
import { useAppStore } from "../../../store/store";

const getWalletIcon = (walletName: string) => {
  if (walletName === META_MASK) {
    return "metamask";
  }
  return "metamask";
};

export const LoginOptions = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [walletIcon, setWalletIcon] = useState("metamask");

  const networkItem = getStorageValue("network", "");

  const walletInfo = useAppStore((state) => state.wallet);
  const { isTablet } = useWindowSize();
  const handleWalletNetwork = useAppStore((state) => state.handleWalletNetwork);

  const disconnectHandler = async () => {
    localStorage.removeItem("network");
    window.location.reload();
  };

  useEffect(() => {
    const wallet: string = getWalletIcon(walletInfo.walletName!);
    setWalletIcon(wallet!);
  }, [walletInfo.walletName]);

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setDropdownOpen(false);
  });

  useEffect(() => {
    if (networkItem !== "" && networkItem !== null) {
      handleWalletNetwork(networkItem);
      handleMetamask();
    }
  }, [networkItem]);

  const walletHandler = async () => {
    await handleMetamask();
  };

  return (
    <div className="inline-block w-fit cursor-pointer relative">
      {walletInfo.walletConnection ? (
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
                  src={`/images/wallets/${walletIcon}.svg`}
                  alt={"logo"}
                  className="w-[20px] h-[20px]"
                />
                <span className="ml-3">
                  {stringTruncate(walletInfo.account!, isTablet ? 3 : 7)}
                </span>
              </span>
              <span className="py-2 pr-3 pl-1.5">
                <Copy id={walletInfo.account!} />
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
          onClick={walletHandler}
        />
      )}
      <div
        className={`${Styles.DropdownMenu} 
      ${dropdownOpen && Styles.DropdownMenuActive} 
      absolute bg-dropDown rounded-md`}
        ref={ref}
      >
        <>
          <div
            className="px-4 py-3 flex items-center"
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
      </div>
    </div>
  );
};

export default LoginOptions;
