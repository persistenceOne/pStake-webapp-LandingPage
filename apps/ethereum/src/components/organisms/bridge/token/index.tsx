import React, { ChangeEvent } from "react";
import { InputText } from "ui";
import { useWindowSize } from "hooks";
import { formatNumber } from "../../../../helpers/utils";
import { useAppStore } from "../../../../store/store";
import { shallow } from "zustand/shallow";

const Token = () => {
  const { isMobile } = useWindowSize();
  const setBridgeInputAmount = useAppStore(
    (state) => state.setBridgeInputAmount
  );

  const [ethPrice, stkEthBalance, bridgingAmount] = useAppStore(
    (state) => [
      state.ethPrice,
      state.balance.stkETH,
      state.bridgeTxnInfo.amount,
    ],
    shallow
  );

  const inputAmount = bridgingAmount;
  const priceInDollars = ethPrice * Number(inputAmount);

  const inputHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    let rex = /^\d{0,10}(\.\d{0,18})?$/;
    if (rex.test(evt.target.value)) {
      setBridgeInputAmount(evt.target.value);
    } else {
      return false;
    }
  };

  const maxHandler = async (value: string) => {
    setBridgeInputAmount(value);
  };

  return (
    <div>
      <div className="relative inline-block w-full">
        <div className="inputContainer py-5 px-6 bg-input border rounded-md border-solid border-[#1b1b1b99] flex-wrap flex md:p-3">
          <div className="flex justify-center flex-col flex-1">
            <div className="input-logo flex items-center">
              <img
                src={"/images/logos/stkEth.svg"}
                width={isMobile ? 20 : 28}
                height={isMobile ? 20 : 28}
                className="tokenImage"
                alt="ethIcon"
              />
              <span className="text-light-high text-2xl font-normal ml-2 md:text-lg md:text-lg lg:text-lg">
                stkETH
              </span>
            </div>
            <p className="mt-3 leading-normal text-sm md:text-xsm">
              <span className="text-light-low">Total Available: </span>
              <span className="text-light-mid">{stkEthBalance}</span>
              <span
                className="text-light-high ml-2 font-bold uppercase cursor-pointer"
                onClick={() => maxHandler(stkEthBalance.toString())}
              >
                Max
              </span>
            </p>
          </div>
          <div>
            <InputText
              type="number"
              placeholder="0.00"
              value={inputAmount.toString()}
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
              ${formatNumber(priceInDollars, 3, 2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Token;
