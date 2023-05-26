import React from "react";
import { InputText } from "ui";
import { truncateToFixedDecimalPlaces } from "utils";
import { useWindowSize } from "hooks";
import { useAppStore } from "../../../../store/store";

const To = () => {
  const amount = 0;
  const { isMobile } = useWindowSize();
  const balance = useAppStore((state) => state.balance);
  const ethPrice = useAppStore((state) => state.ethPrice);
  const stakeTxnInfo = useAppStore((state) => state.stakeTxnInfo);
  const exchangeRate = useAppStore((state) => state.exchangeRate);

  const stkEthAmount = Number(stakeTxnInfo.amount) / Number(exchangeRate);

  const priceInDollars = (stkEthAmount * ethPrice).toFixed(2);

  return (
    <div className="flex-1 mt-2 mb-4">
      <div className="p-6 bg-input border rounded-md border-solid border-[#1b1b1b99] flex-wrap flex md:p-3">
        <div className="flex justify-center flex-col flex-1">
          <div className="input-logo flex items-center">
            <img
              src={"/images/logos/stkEth.svg"}
              width={isMobile ? 20 : 32}
              height={isMobile ? 20 : 32}
              className="logo"
              alt="stkEth"
            />
            <span className="text-light-high text-3xl font-normal ml-2 md:text-lg lg:text-lg">
              stkETH
            </span>
          </div>
          <p className="mt-3 leading-normal text-sm font-normal md:text-xsm">
            <span className="text-light-low">Available: </span>
            <span className="text-light-mid">
              {truncateToFixedDecimalPlaces(balance.stkETH!, isMobile ? 2 : 6)}
            </span>
          </p>
        </div>
        <div>
          <InputText
            type="number"
            placeholder="0.00"
            value={stkEthAmount.toString()}
            disable={true}
            required={true}
            name="stakeInput"
            className={`bg-transparent border-0
             text-light-high leading-normal 
             box-shadow-none font-normal 
             text-3xl mb-1 focus:border-0 
             focus:box-shadow-none text-right md:text-lg
             p-0 mb-2 placeholder:text-light-mid placeholder:leading-normal 
             placeholder:font-normal outline-none max-w-[160px] md:max-w-[100px]`}
          />
          <p className="text-light-low font-normal leading-normal text-right text-sm">
            ${truncateToFixedDecimalPlaces(priceInDollars, 2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default To;
