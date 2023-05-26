import React, { ChangeEvent } from "react";
import { InputText } from "ui";
import { formatNumber } from "utils";
import { truncateToFixedDecimalPlaces } from "utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/reducers";
import { setUnStakeAmount } from "../../../../store/reducers/transactions/unstake";
import { useWindowSize } from "hooks";
import { useWallet } from "../../../../context/WalletConnect/WalletConnect";

const From = () => {
  const dispatch = useDispatch();
  const { stkAtomBalance } = useSelector((state: RootState) => state.balances);
  const { amount } = useSelector((state: RootState) => state.unStake);
  const { exchangeRate } = useSelector((state: RootState) => state.initialData);
  const { atomPrice } = useSelector((state: RootState) => state.liveData);
  const { isMobile } = useWindowSize();
  const { isWalletConnected } = useWallet();

  const stkATOMAmount = truncateToFixedDecimalPlaces(
    Number(amount) * (1 / exchangeRate)
  );

  // dollar value of user input based on exchangeRate at that moments
  const priceInDollars = atomPrice * Number(stkATOMAmount);

  const inputHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    let rex = /^\d{0,10}(\.\d{0,6})?$/;
    if (rex.test(evt.target.value)) {
      dispatch(setUnStakeAmount(evt.target.value));
    } else {
      return false;
    }
  };

  const maxHandler = () => {
    dispatch(setUnStakeAmount(stkAtomBalance.toString()));
  };

  return (
    <div className="flex-1 mb-2">
      <div className="inputContainer border rounded-md p-6 bg-input border-solid border-[#1b1b1b99] flex-wrap flex md:p-3">
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
          <p className="mt-3 leading-normal text-sm font-normal text-sm">
            <span className="text-light-low">Available: </span>
            <span className="text-light-mid">
              {formatNumber(stkAtomBalance, 3, isMobile ? 2 : 6)}
            </span>
            {isWalletConnected && stkAtomBalance > 0 ? (
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
            value={amount.toString()}
            disable={false}
            required={true}
            name="stakeInput"
            onChange={inputHandler}
            className={`bg-transparent border-0
             text-light-high leading-normal 
             box-shadow-none font-normal 
             text-3xl focus:border-0 
             focus:box-shadow-none text-right md:text-lg
             p-0 mb-2 placeholder:text-light-mid placeholder:leading-normal
              placeholder:font-normal outline-none max-w-[160px] md:max-w-[100px]`}
          />
          <p className="text-light-low font-normal leading-normal text-right text-sm">
            ${formatNumber(priceInDollars, 3, isMobile ? 2 : 6)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default From;
