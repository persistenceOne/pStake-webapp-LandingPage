import React, { ChangeEvent } from "react";
import { InputText } from "ui";
import { COIN_ATOM, MIN_STAKE_FEE } from "../../../../../AppConstants";
import { formatNumber } from "utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/reducers";
import { setStakeAmount } from "../../../../store/reducers/transactions/stake";
import { useWallet } from "../../../../context/WalletConnect/WalletConnect";
import { useWindowSize } from "hooks";

const From = () => {
  const dispatch = useDispatch();
  const { atomBalance, ibcAtomBalance } = useSelector(
    (state: RootState) => state.balances
  );
  const { amount } = useSelector((state: RootState) => state.stake);
  const { atomPrice } = useSelector((state: RootState) => state.liveData);
  const { minDeposit } = useSelector((state: RootState) => state.initialData);
  const priceInDollars = atomPrice * Number(amount);

  const totalAtomBalance = atomBalance + ibcAtomBalance;
  const { isWalletConnected } = useWallet();
  const { isMobile } = useWindowSize();

  const inputHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    let rex = /^\d{0,10}(\.\d{0,6})?$/;
    if (rex.test(evt.target.value)) {
      dispatch(setStakeAmount(evt.target.value));
    } else {
      return false;
    }
  };

  const maxHandler = () => {
    dispatch(
      setStakeAmount((Number(totalAtomBalance) - MIN_STAKE_FEE).toFixed(6))
    );
  };

  return (
    <div className="flex-1">
      <div className="inputContainer p-6 bg-input border rounded-md border-solid border-[#1b1b1b99] flex-wrap flex md:p-3">
        <div className="flex justify-center flex-col flex-1">
          <div className="input-logo flex items-center">
            <img
              src={"/images/tokens/atom.svg"}
              width={isMobile ? 20 : 32}
              height={isMobile ? 20 : 32}
              className="tokenImage"
              alt="atomIcon"
            />
            <span className="text-light-high text-3xl font-normal ml-2 md:text-lg md:text-lg lg:text-lg">
              {COIN_ATOM}
            </span>
          </div>
          <p className="mt-3 leading-normal text-sm md:text-xsm">
            <span className="text-light-low">Available: </span>
            <span className="text-light-mid">
              {formatNumber(totalAtomBalance, 3, isMobile ? 2 : 6)}
            </span>
            {isWalletConnected &&
            Number(atomBalance) > MIN_STAKE_FEE + minDeposit ? (
              <span
                className="text-light-high ml-2 font-bold uppercase cursor-pointer"
                onClick={maxHandler}
              >
                Max
              </span>
            ) : null}
            {isWalletConnected &&
            Number(amount) > 0 &&
            Number(atomBalance) <= MIN_STAKE_FEE + minDeposit &&
            Number(amount) < MIN_STAKE_FEE + minDeposit ? (
              <span className="text-light-high ml-2 font-semibold">
                Min Stake: {MIN_STAKE_FEE}
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
  );
};

export default From;
