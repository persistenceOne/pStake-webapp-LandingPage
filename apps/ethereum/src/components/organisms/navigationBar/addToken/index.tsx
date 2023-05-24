import { Dropdown } from "ui";
import { useState } from "react";
import { contracts, Networks } from "../../../../helpers/config";
import { useAppStore } from "../../../../store/store";
import { NetworkInfo } from "../types";
import { registerToken } from "../../../../helpers/wallets";
import { displayToast } from "ui";
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

const AddToken = () => {
  const [show, setShow] = useState<boolean>(false);
  const walletInfo = useAppStore((state) => state.wallet);
  const network = useAppStore((state) => state.network);

  const dropDownHandler = async (type: Networks) => {
    setShow(false);
    if (type === network.name && !network.error) {
      let contractAddress: string = "";
      if (type === "ethereum") {
        contractAddress = contracts[env]["stkETH"];
      } else if (type === "optimism") {
        contractAddress = contracts[env]["l2stkETH"];
      }
      await registerToken(walletInfo, contractAddress);
    } else {
      displayToast(
        {
          message: (
            <>
              Please connect with <span className="capitalize">{type}</span>{" "}
              <span>{env}</span> network to add stkEth to wallet
            </>
          ),
        },
        ToastType.INFO
      );
    }
  };

  const dropCloseDownHandler = (value: boolean) => {
    setShow(value);
  };

  return (
    <>
      <Dropdown
        className="text-light-high mr-4 lg:hidden"
        dropDownVariant="custom"
        closeDropdown={show}
        closeHandler={(value) => dropCloseDownHandler(value)}
        dropDownVariantBg="bg-[#181818] text-[12px] text-light-high"
        dropdownLabel={
          <div className="flex items-center">
            <span className="text-sm text-light-emphasis font-medium leading-normal md:text-xsm md:ml-2">
              Add stkETH
            </span>
            <img
              width={20}
              height={20}
              className="ml-2 md:m-0"
              src={`/images/logos/stkEth.svg`}
              alt="stkATOM logo"
            />
          </div>
        }
        dropDownButtonClass="!py-2.5"
        dropdownType={"click"}
        staticBackDrop={false}
        dropDownIcon={false}
        dropDownContentClass="!bg-[#282828] drop-shadow-md round-md w-max py-1 md:p-0"
      >
        {networkList.map((item, index) => (
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
              <span className="text-sm text-light-emphasis font-medium leading-normal md:text-xsm mr-2 capitalize">
                On {item.network}
              </span>
            </div>
          </div>
        ))}
      </Dropdown>
    </>
  );
};

export default AddToken;
