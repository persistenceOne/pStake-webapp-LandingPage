import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/reducers";
import { displayToast } from "ui";
import {
  setStakeTxnFailed,
  setStakeTxnStepNumber,
} from "../../../../store/reducers/transactions/stake";
import { resetTransaction } from "../../../../store/reducers/transaction";
import { ToastType } from "ui/components/molecules/toast/types";

const StakeToasts = () => {
  const dispatch = useDispatch();
  const { txFailed, stepNumber } = useSelector(
    (state: RootState) => state.stake
  );

  useEffect(() => {
    if (stepNumber === 5) {
      dispatch(setStakeTxnStepNumber(0));
    }
  }, [stepNumber, dispatch]);

  useEffect(() => {
    if (txFailed) {
      dispatch(setStakeTxnFailed(false));
      dispatch(setStakeTxnStepNumber(0));
      dispatch(resetTransaction());
    }
  }, [txFailed, dispatch]);

  return (
    <>
      {txFailed ? (
        displayToast(
          {
            message: "This transaction could not be completed",
          },
          ToastType.ERROR
        )
      ) : (
        <>
          {stepNumber === 2 && !txFailed
            ? displayToast(
                {
                  message: "Deposit Transaction in progress",
                },
                ToastType.LOADING
              )
            : ""}
          {stepNumber === 3 && !txFailed
            ? displayToast(
                {
                  message: "Atom transferred to persistence chain successfully",
                },
                ToastType.SUCCESS
              )
            : ""}
          {stepNumber === 4 && !txFailed
            ? displayToast(
                {
                  message: "Stake Transaction in progress",
                },
                ToastType.LOADING
              )
            : ""}
          {stepNumber === 5 && !txFailed
            ? displayToast(
                {
                  message: "Your ATOM Staked Successfully",
                },
                ToastType.SUCCESS
              )
            : ""}
        </>
      )}
    </>
  );
};

export default StakeToasts;
