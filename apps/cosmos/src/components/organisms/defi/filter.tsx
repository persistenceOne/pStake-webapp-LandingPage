import React, { useState } from "react";
import styles from "./styles.module.css";
import { Icon } from "ui";

const Filters = ({ setSortActive, sortActive, searchHandler }: any) => {
  const handleSort = (sortKey: string) => {
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

  const buttonClass =
    "filterButton rounded-md py-2.5 px-4 " +
    " border border-solid border-[#ecececb3] text-sm text-light-emphasis " +
    "mr-3 my-2 md:px-2.5 md:py-1.5 md:text-xsm";

  return (
    <div className="flex items-center justify-between mb-6 flex-wrap">
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
        {" "}
        <button
          className={`${sortActive["lending"] ? "active" : ""} ` + buttonClass}
          onClick={() => handleSort("lending")}
        >
          Borrowing/Lending
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
  );
};

export default Filters;
