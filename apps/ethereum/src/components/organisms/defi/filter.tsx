import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./styles.module.css";
import { Icon } from "../../atoms/icon";
import { Networks } from "../../../helpers/config";
import { SortOptions } from "./index";

interface Props {
  setSortByNetwork: Dispatch<SetStateAction<{ [key in Networks]: boolean }>>;
  setSortActive: Dispatch<SetStateAction<{ [key in SortOptions]: boolean }>>;
  sortActive: { [key in SortOptions]: boolean };
  sortByNetwork: { [key in Networks]: boolean };
  searchHandler: any;
}

const Filters: React.FC<Props> = ({
  setSortByNetwork,
  setSortActive,
  sortActive,
  sortByNetwork,
  searchHandler,
}: any) => {
  const handleSort = (sortKey: SortOptions) => {
    const sortList = sortActive;
    for (const key in sortList) {
      if (key === sortKey) {
        sortActive[key] = true;
      } else {
        sortActive[key] = false;
      }
      setSortActive({ ...sortActive });
    }
  };

  const handleNetworkSort = (sortKey: Networks) => {
    const sortList = sortByNetwork;
    let activeNetworkCount = 0;
    for (const key in sortList) {
      sortByNetwork[key] === true
        ? (activeNetworkCount += 1)
        : activeNetworkCount;
    }
    for (const key in sortList) {
      if (key === sortKey) {
        if (sortByNetwork[key] === true && activeNetworkCount === 1) {
          sortByNetwork[key] = sortByNetwork[key];
        } else if (activeNetworkCount > 1) {
          sortByNetwork[key] = false;
        } else {
          sortByNetwork[key] = true;
        }
      } else {
        sortByNetwork[key] = sortByNetwork[key];
      }
    }
    setSortByNetwork({ ...sortByNetwork });
  };

  const buttonClass =
    "filterButton rounded-md py-2.5 px-4 " +
    " border border-solid border-[#ecececb3] text-sm text-light-emphasis " +
    "mr-3 my-2 md:px-2.5 md:py-1.5 md:text-xsm";

  return (
    <div className="mb-6">
      <div className="flex items-center flex-wrap">
        <button
          className={
            `${sortByNetwork["ethereum"] ? "active" : ""} ` + buttonClass
          }
          onClick={() => handleNetworkSort("ethereum")}
        >
          <img
            src={"/images/logos/eth.svg"}
            width={28}
            height={28}
            className="tokenImage"
            alt="ethIcon"
          />
        </button>
        <button
          className={
            `${sortByNetwork["optimism"] ? "active" : ""} ` + buttonClass
          }
          onClick={() => handleNetworkSort("optimism")}
        >
          <img
            src={"/images/logos/optimism.svg"}
            width={28}
            height={28}
            className="tokenImage"
            alt="optimismIcon"
          />
        </button>
      </div>
      <div className="flex items-center justify-between flex-wrap">
        <div>
          <button
            className={`${sortActive["all"] ? "active" : ""} ` + buttonClass}
            onClick={() => handleSort("all")}
          >
            All
          </button>
          <button
            className={`${sortActive["dexes"] ? "active" : ""} ` + buttonClass}
            onClick={() => handleSort("dexes")}
          >
            Decentralized Exchanges
          </button>
          <button
            className={
              `${sortActive["lending"] ? "active" : ""} ` + buttonClass
            }
            onClick={() => handleSort("lending")}
          >
            Lend
          </button>
        </div>
        <div>
          <div className={`w-[196px] relative my-2`}>
            <input
              type="text"
              className={
                "bg-[#161616] py-2 pr-8 pl-4 text-sm text-light-high b-[#070B09] " +
                "rounded-md font-normal border border-solid border-transparent outline-none md:py:1.5 pl-2.5 w-full " +
                "focus:border-[#a6a6a687]"
              }
              placeholder={"Search"}
              autoFocus={false}
              onChange={searchHandler}
            />
            <Icon
              iconName="search"
              viewClass={`${styles.searchInputIcon} absolute`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
