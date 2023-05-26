import { Dropdown } from "ui";
import React, { useEffect, useState } from "react";
import { chains, Networks } from "../../../helpers/config";
import { NetworkInfo } from "./types";
import { useAppStore } from "../../../store/store";
import { getWalletProvider } from "../../../helpers/utils";
import { META_MASK, WALLET_ERROR } from "../../../../appConstants";
import { displayToast } from "ui";
import { addNetwork } from "../../../helpers/wallets";
import { Icon } from "../../atoms/icon";
import { useLocalStorage } from "hooks";
import { ToastType } from "ui/components/molecules/toast/types";

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

// available network list
const networkList: NetworkInfo[] = [
  {
    network: "ethereum",
    logo: "eth", // logo name. logo must be svg format
  },
  {
    network: "optimism",
    logo: "optimism",
  },
];

const Networks = () => {
  const [show, setShow] = useState<boolean>(false);
  const walletInfo = useAppStore((state) => state.wallet);
  const network = useAppStore((state) => state.network);
  const connectWallet = useAppStore((state) => state.connectWallet);
  const [networkItem, setNetworkItem] = useLocalStorage("network", "");

  // selected network info based network connected
  const selectedNetwork: NetworkInfo | undefined = networkList.find(
    (item) => item.network === network.name
  );

  const [dropDownItem, setDropdownItem] = useState<NetworkInfo | undefined>(
    selectedNetwork // set initial data
  );

  useEffect(() => {
    setDropdownItem(selectedNetwork);
    setNetworkItem(selectedNetwork!.network);
  }, [network.name]);

  const dropDownHandler = async (type: Networks) => {
    const dropDownSelection: NetworkInfo | undefined = networkList.find(
      (item) => item.network === type
    );
    const chain = chains[env][type];
    const provider = getWalletProvider(walletInfo.walletName!);
    const response = await addNetwork(provider, chain);
    if (!response) {
      displayToast(
        {
          heading: WALLET_ERROR,
          message: "Error while Switching network",
        },
        ToastType.ERROR
      );
      return;
    }
    setShow(false);
    setDropdownItem(dropDownSelection!);
  };

  const dropCloseDownHandler = (value: boolean) => {
    setShow(value);
  };

  return (
    <>
      <Dropdown
        className="text-light-high mr-4 md:hidden"
        dropDownVariant="custom"
        closeDropdown={show}
        closeHandler={(value) => dropCloseDownHandler(value)}
        dropDownVariantBg="bg-[#181818] text-[12px] text-light-high"
        dropdownLabel={
          <div className="flex items-center">
            {!network.error ? (
              <>
                <img
                  width={20}
                  height={20}
                  className="mr-2"
                  src={`/images/logos/${dropDownItem!.logo}.svg`}
                  alt="stkATOM logo"
                />
                <span className="text-sm text-light-emphasis font-medium leading-normal md:text-xsm md:ml-2 capitalize">
                  {dropDownItem!.network}
                </span>
              </>
            ) : (
              <div className={"flex items-center"}>
                <Icon
                  iconName="exclamation"
                  viewClass="disconnect !w-[16px] !h-[14px] mr-[5px] -mt-[3px]"
                />
                Unsupported Network
              </div>
            )}
          </div>
        }
        dropDownButtonClass="!py-2.5"
        dropdownType={"click"}
        staticBackDrop={false}
        dropDownIcon={true}
        dropDownContentClass="!bg-[#282828] drop-shadow-md round-md w-max py-1 md:p-0"
      >
        {networkList.map((item, index) =>
          item.network !== dropDownItem?.network || network.error ? (
            <div
              className="px-4 py-2 flex items-center md:py-3
                        hover:cursor-pointer hover:bg-[#383838] text-dark-high whitespace-nowrap"
              key={index}
              onClick={() => {
                dropDownHandler(item.network);
              }}
            >
              <div className="flex items-center">
                <img
                  width={20}
                  height={20}
                  className="mr-2"
                  src={`/images/logos/${item.logo}.svg`}
                  alt="stkATOM logo"
                />
                <span
                  className="text-sm text-light-emphasis font-medium
                  leading-normal md:text-xsm md:ml-2 capitalize"
                >
                  {item.network}
                </span>
              </div>
            </div>
          ) : (
            ""
          )
        )}
      </Dropdown>
    </>
  );
};

export default Networks;
