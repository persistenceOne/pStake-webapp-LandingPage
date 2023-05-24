import React from "react";
import From from "./from";
import To from "./To";
import { Icon } from "../../../atoms/icon";
import styles from "./styles.module.css";
import Submit from "./submit";
import Tooltip from "rc-tooltip";
import Networks from "./stakeOption";
import ExchangeRate from "../../../molecules/exchangeRate";
import { useAppStore } from "../../../../store/store";
import { shallow } from "zustand/shallow";

const Stake = () => {
  const [stakeNetwork, network] = useAppStore(
    (state) => [state.stakeTxnInfo.stakeNetwork, state.network.name],
    shallow
  );

  return (
    <>
      <From />
      <div className="swap-icon flex w-full items-center justify-center relative">
        <div
          className={`${styles.iconBox} icon-box 
          rounded-full flex justify-center items-center absolute 
          w-[40px] h-[40px] bg-[#1A1A1A] md:w-[28px] md:h-[28px]`}
        >
          <Icon
            iconName="exchange-arrow"
            viewClass="search !w-[14px] md:!w-[10px]"
          />
        </div>
      </div>
      <To />
      {network === "ethereum" ? (
        <div className="px-6 py-2 bg-input border rounded-md border-solid border-[#1b1b1b99] flex justify-between items-center">
          <p className="text-sm text-light-mid">I want to mint stkETH on </p>
          <Networks />
        </div>
      ) : (
        ""
      )}
      <div className="flex items-center justify-between flex-wrap px-4 md:p-0 mt-3">
        <p className="font-normal text-sm leading-7 text-light-emphasis">
          Exchange Rate
        </p>
        <p className="font-normal text-sm leading-7 text-light-emphasis text-right flex items-center">
          <ExchangeRate type={"stake"} />
        </p>
      </div>
      <div className="flex items-center justify-between flex-wrap px-4 md:p-0">
        <p className="font-normal text-sm leading-7 text-light-emphasis flex items-center">
          Fee
          <Tooltip
            placement="bottom"
            overlay={
              <span>
                {stakeNetwork === "ethereum"
                  ? "Protocol fee"
                  : "Protocol fee + Bridging and minting fee"}
              </span>
            }
          >
            <button className="icon-button px-1">
              <Icon viewClass="arrow-right" iconName="info" />
            </button>
          </Tooltip>
        </p>
        <p className="font-normal text-sm leading-7 text-light-emphasis text-right flex items-center">
          {0}%
        </p>
      </div>
      <div className="mt-4">
        <Submit />
      </div>
    </>
  );
};

export default Stake;
