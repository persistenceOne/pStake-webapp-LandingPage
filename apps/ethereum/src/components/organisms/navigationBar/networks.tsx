import { Dropdown } from "ui";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

// available network list
const networks: any[] = [
  {
    network: "Cosmos",
    logo: "atom", // logo name. logo must be svg format
    link: "/",
  },
  {
    network: "Ethereum",
    logo: "eth",
    link: "/eth",
  },
];

const Networks = () => {
  const [show, setShow] = useState<boolean>(false);
  const [networkList, setNetworkList] = useState<any[]>([]);

  useEffect(() => {
    const response = networks.filter((item) => item.network !== "Cosmos");
    setNetworkList(response);
  }, []);

  // selected network info based network connected
  const selectedNetwork = networks.find((item) => item.network === "Cosmos");

  const dropCloseDownHandler = (value: boolean) => {
    setShow(value);
  };

  console.log(selectedNetwork, "selectedNetwork");

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
            <>
              <img
                width={20}
                height={20}
                className="mr-2"
                src={`/images/logos/${selectedNetwork.logo}.svg`}
                alt="stkATOM logo"
              />
              <span className="text-sm text-light-emphasis font-medium leading-normal md:text-xsm md:ml-2 capitalize">
                {selectedNetwork.network}
              </span>
            </>
          </div>
        }
        dropDownButtonClass="!py-2.5"
        dropdownType={"click"}
        staticBackDrop={false}
        dropDownIcon={true}
        dropDownContentClass="!bg-[#282828] drop-shadow-md round-md w-max py-1 md:p-0"
      >
        {networkList.map((item, index) => (
          <Link
            className="px-4 py-2 flex items-center md:py-3
                        hover:cursor-pointer hover:bg-[#383838] text-dark-high whitespace-nowrap"
            key={index}
            href={item.link}
          >
            <p className="flex items-center">
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
            </p>
          </Link>
        ))}
      </Dropdown>
    </>
  );
};

export default Networks;
