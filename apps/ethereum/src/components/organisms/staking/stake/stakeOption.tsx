import React, { useState } from "react";
import { useAppStore } from "../../../../store/store";
import { useWindowSize } from "../../../../customHooks/useWindowSize";
import { Networks } from "../../../../helpers/config";
import { Dropdown } from "ui";

interface MintList {
  name: Networks;
  image: string;
}

const Networks = () => {
  const setStakeNetwork = useAppStore((state) => state.setStakeNetwork);
  const stakeTxnInfo = useAppStore((state) => state.stakeTxnInfo);
  const [dropDownItem, setDropdownItem] = useState<MintList>({
    name: "ethereum",
    image: "/images/logos/eth.svg",
  });

  const [show, setShow] = useState<boolean>(false);
  const { isMobile } = useWindowSize();

  const list: MintList[] = [
    {
      name: "ethereum",
      image: "/images/logos/eth.svg",
    },
    {
      name: "optimism",
      image: "/images/logos/optimism.svg",
    },
  ];

  const dropDownHandler = async (type: Networks) => {
    const token: MintList | undefined = list.find((item) => item.name === type);
    setStakeNetwork(type);
    console.log("value", type);

    setShow(false);
    setDropdownItem(token!);
  };

  const dropCloseDownHandler = (value: boolean) => {
    setShow(value);
  };
  console.log(show, "sho");
  return (
    <div className="lex justify-between items-center">
      <Dropdown
        className="text-light-high"
        dropDownVariant="custom"
        closeDropdown={show}
        closeHandler={(value) => dropCloseDownHandler(value)}
        dropDownVariantBg="bg-black-400 text-[12px] text-light-high"
        dropdownLabel={
          <div className="flex items-center">
            <img
              width={20}
              height={20}
              className="mr-2"
              src={dropDownItem.image}
              alt="stkATOM logo"
            />
            <span className="text-sm text-light-emphasis font-medium leading-normal md:text-xsm md:ml-2 capitalize">
              {dropDownItem.name}
            </span>
          </div>
        }
        dropDownButtonClass="!py-2.5"
        dropdownType={"click"}
        staticBackDrop={false}
        dropDownIcon={true}
        dropDownContentClass="!bg-[#282828] drop-shadow-md round-md
                       py-1 md:p-0"
      >
        {list.map((item, index) => (
          <div key={index}>
            {item.name !== stakeTxnInfo.stakeNetwork ? (
              <div
                className="px-4 py-2 flex items-center md:py-3
                        hover:cursor-pointer hover:bg-[#383838] text-dark-high whitespace-nowrap"
                key={1}
                onClick={() => {
                  dropDownHandler(item.name);
                }}
              >
                <div className="flex items-center">
                  <img
                    width={20}
                    height={20}
                    className="mr-2"
                    src={item.image}
                    alt="stkATOM logo"
                  />
                  <span className="text-sm text-light-emphasis font-medium leading-normal md:text-xsm md:ml-2 capitalize">
                    {item.name}
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </Dropdown>
    </div>
  );
};

export default Networks;
