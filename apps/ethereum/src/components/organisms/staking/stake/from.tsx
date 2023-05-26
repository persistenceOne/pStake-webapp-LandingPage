import React, { ChangeEvent } from "react";
import { InputText } from "ui";

import { useWindowSize } from "hooks";
import { truncateToFixedDecimalPlaces } from "utils";
import { useAppStore } from "../../../../store/store";
import { shallow } from "zustand/shallow";

const From = () => {
  const [ethPrice, stakeAmount] = useAppStore(
    (state) => [state.ethPrice, state.stakeTxnInfo.amount],
    shallow
  );

  const setStakeInputAmount = useAppStore((state) => state.setStakeInputAmount);
  const walletConnection = useAppStore(
    (state) => state.wallet.walletConnection
  );
  const ethBalance = useAppStore((state) => state.balance.eth);

  const { isMobile } = useWindowSize();

  const inputStakeAmount = stakeAmount;
  const priceInDollars = (ethPrice * Number(inputStakeAmount)).toFixed(2);

  const inputHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    let rex = /^\d{0,10}(\.\d{0,18})?$/;
    if (rex.test(evt.target.value)) {
      setStakeInputAmount(evt.target.value);
    } else {
      return false;
    }
  };

  const maxHandler = async () => {
    setStakeInputAmount(ethBalance);
  };

  return (
    <div className="flex-1">
      <div className="inputContainer p-6 bg-input border rounded-md border-solid border-[#1b1b1b99] flex-wrap flex md:p-3">
        <div className="flex justify-center flex-col flex-1">
          <div className="input-logo flex items-center">
            <img
              src={"/images/logos/eth.svg"}
              width={isMobile ? 20 : 32}
              height={isMobile ? 20 : 32}
              className="tokenImage"
              alt="ethIcon"
            />
            <span className="text-light-high text-3xl font-normal ml-2 md:text-lg md:text-lg lg:text-lg">
              ETH
            </span>
          </div>
          <p className="mt-3 leading-normal text-sm md:text-xsm">
            <span className="text-light-low">Available: </span>
            <span className="text-light-mid">
              {truncateToFixedDecimalPlaces(ethBalance!, isMobile ? 2 : 6)}
            </span>
            {walletConnection && Number(ethBalance) > 0 ? (
              <span
                className="text-light-high ml-2 font-bold uppercase cursor-pointer"
                onClick={maxHandler}
              >
                Max
              </span>
            ) : null}
          </p>
        </div>
        <div>
          <InputText
            type="number"
            placeholder="0.00"
            value={inputStakeAmount.toString()}
            disable={false}
            required={true}
            name="stakeInput"
            onChange={inputHandler}
            className={`bg-transparent border-0
             text-light-high leading-normal 
             box-shadow-none font-normal 
             text-3xl m-0 focus:border-0 
             focus:box-shadow-none text-right md:text-lg 
             p-0 mb-2 placeholder:text-light-mid 
             placeholder:leading-normal placeholder:font-normal outline-none max-w-[160px] md:max-w-[100px]`}
          />
          <p className="text-light-low font-normal leading-normal text-right text-sm">
            ${truncateToFixedDecimalPlaces(priceInDollars, 2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default From;
