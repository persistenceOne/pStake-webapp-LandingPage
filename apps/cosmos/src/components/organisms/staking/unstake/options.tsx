import { truncateToFixedDecimalPlaces } from "utils";
import styles from "./styles.module.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/reducers";
import { unStakeType } from "../../../../store/reducers/transactions/unstake/types";
import { setUnStakeOption } from "../../../../store/reducers/transactions/unstake";
import { INSTANT, MIN_REDEEM } from "../../../../../AppConstants";
import { Icon } from "ui";

const Options = () => {
  const dispatch = useDispatch();
  const { amount, type } = useSelector((state: RootState) => state.unStake);
  const { exchangeRate, redeemFee } = useSelector(
    (state: RootState) => state.initialData
  );

  // user balance after deducting redeem fee
  const stkAtomAmount = Number(amount) - Number(amount) * redeemFee;

  //converting stkAtom to atom
  const atomAmount = Number(stkAtomAmount) / exchangeRate;

  let redeemAmount: number;

  if (Number(amount) > MIN_REDEEM) {
    redeemAmount = truncateToFixedDecimalPlaces(atomAmount);
  } else {
    redeemAmount = Number(atomAmount.toFixed(18).match(/^\d+(?:\.\d{0,6})?/));
  }

  const optionHandler = (value: unStakeType) => {
    dispatch(setUnStakeOption(value));
  };

  return (
    <div
      className={`${styles.options} rounded-md flex flex-wrap flex-col p-6 bg-input border border-solid border-[#1b1b1b99] md:p-3`}
    >
      <div
        className={`${
          type === INSTANT ? "active" : ""
        } option-item cursor-pointer block relative rounded-lg p-6 my-4 border border-solid border-[#373737] md:p-4`}
        onClick={() => optionHandler("instant")}
      >
        <p
          className={`${styles.preferred} preferred absolute py-1 px-4 text-dark-emphasis font-normal leading-6 text-xsm md:px-2 md:py-0.5`}
        >
          Preferred option
        </p>
        <div className="flex items-center">
          <p className="option-heading m-0 font-normal text-base text-light-disabled leading-normal flex-1 md:text-sm flex items-center">
            Redeem Instantly
            <Icon iconName="lightning" viewClass="lightning" />
          </p>
          <p
            className={`${styles.amount} option-value font-medium m-0 text-light-mid
             text-2xl text-center text-right overflow-x-auto md:text-base`}
          >
            {truncateToFixedDecimalPlaces(redeemAmount)} ATOM
          </p>
        </div>
      </div>
      <div
        className={`${
          type !== INSTANT ? "active" : ""
        } option-item cursor-pointer block relative 
        rounded-lg py-3 px-6 border border-solid border-[#373737] md:p-4`}
        onClick={() => optionHandler("normal")}
      >
        <div className="flex items-center">
          <p className="option-heading m-0 font-normal text-base text-light-disabled leading-normal flex-1 md:text-sm">
            Unstake
          </p>
          <p
            className={`${styles.amount} option-value font-medium m-0 text-light-mid 
            text-2xl text-center text-right overflow-x-auto md:text-base`}
          >
            ~{truncateToFixedDecimalPlaces(Number(amount) / exchangeRate)} ATOM
          </p>
        </div>
      </div>
    </div>
  );
};
export default Options;
