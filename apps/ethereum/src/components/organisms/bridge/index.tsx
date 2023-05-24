import React from "react";
import { Icon } from "ui";
import styles from "./styles.module.css";
import Token from "./token";
import Submit from "./submit";
import Tooltip from "rc-tooltip";

const Bridge = () => {
  return (
    <div
      className={`${styles.tabsContainer} max-w-[616px] md:max-w-[500px] m-auto px-10 pb-10 lg:px-3`}
    >
      <div className="p-6 bg-[#18181899] items-center mt-4 rounded-md">
        <div className="flex justify-between">
          <div className="w-[200px]">
            <p className="text-light-mid text-sm leading-normal text-center">
              Source
            </p>
            <div
              className={`bg-[#1B1B1B] mb-4 mt-2 flex items-center justify-center rounded-md py-3 px-8 chain-box `}
            >
              <img
                src={"/images/logos/eth.svg"}
                width={28}
                height={28}
                className="mr-2"
                alt="atom Logo"
              />
              <span className="text-light-emphasis text-lg font-medium leading-normal text-center">
                Ethereum
              </span>
            </div>
          </div>
          <div className={"flex mx-2 items-baseline pt-[30px]"}>
            <div
              className={`icon-box rounded-full flex justify-center items-center
               border-2 border-solid border-[#272727] w-[48px] h-[48px] bg-[#1A1A1A] md:w-[28px] md:h-[28px] group`}
            >
              <Icon
                iconName="arrow-right"
                viewClass="!w-[16px] md:!w-[12px] "
              />
            </div>
          </div>
          <div className="w-[200px]">
            <p className="text-light-mid text-sm leading-normal text-center">
              Destination
            </p>
            <div
              className={`bg-[#1B1B1B] mb-4 mt-2 flex items-center justify-center rounded-md py-3 px-8 chain-box `}
            >
              <img
                src={"/images/logos/optimism.svg"}
                width={28}
                height={28}
                className="mr-2"
                alt="atom Logo"
              />
              <span className="text-light-emphasis text-lg font-medium leading-normal text-center">
                Optimism
              </span>
            </div>
          </div>
        </div>
        <div className="my-2">
          <Token />
        </div>
        <div className="flex items-center justify-between flex-wrap px-4 md:p-0">
          <p className="font-normal text-sm leading-7 text-light-emphasis flex items-center">
            Fee
            <Tooltip placement="bottom" overlay={<span>Protocol fee</span>}>
              <button className="icon-button px-1">
                <Icon viewClass="arrow-right" iconName="info" />
              </button>
            </Tooltip>
          </p>
          <p className="font-normal text-sm leading-7 text-light-emphasis text-right flex items-center">
            {0}%
          </p>
        </div>
        <Submit />
      </div>
    </div>
  );
};

export default Bridge;
