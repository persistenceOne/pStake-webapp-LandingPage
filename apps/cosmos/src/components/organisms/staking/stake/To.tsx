import React from "react";
import { InputText } from "ui";
import { formatNumber, truncateToFixedDecimalPlaces } from "utils";

import { useSelector } from "react-redux";
import { RootState } from "../../../../store/reducers";
import { useWindowSize } from "hooks";

const To = () => {
  const { stkAtomBalance } = useSelector((state: RootState) => state.balances);
  const { amount } = useSelector((state: RootState) => state.stake);
  const { exchangeRate } = useSelector((state: RootState) => state.initialData);
  const { atomPrice } = useSelector((state: RootState) => state.liveData);
  const stkATOMAmount = truncateToFixedDecimalPlaces(
    Number(amount) * exchangeRate
  );

  const priceInDollars = atomPrice * Number(amount);
  const { isMobile } = useWindowSize();

  return (
    <div className="flex-1 mt-2 mb-4">
      <div className="p-6 bg-input border rounded-md border-solid border-[#1b1b1b99] flex-wrap flex md:p-3">
        <div className="flex justify-center flex-col flex-1">
          <div className="input-logo flex items-center">
            <img
              src={"/images/tokens/stk_atom.svg"}
              width={isMobile ? 20 : 32}
              height={isMobile ? 20 : 32}
              className="logo"
              alt="atomIcon"
            />
            <span className="text-light-high text-3xl font-normal ml-2 md:text-lg lg:text-lg">
              stkATOM
            </span>
          </div>
          <p className="mt-3 leading-normal text-sm font-normal md:text-xsm">
            <span className="text-light-low">Available: </span>
            <span className="text-light-mid">
              {formatNumber(stkAtomBalance, 3, isMobile ? 2 : 6)}
            </span>
          </p>
        </div>
        <div>
          <InputText
            type="number"
            placeholder="0.00"
            value={stkATOMAmount.toString()}
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
            ${formatNumber(priceInDollars, 3, 2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default To;
