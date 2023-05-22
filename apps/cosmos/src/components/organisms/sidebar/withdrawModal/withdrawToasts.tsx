import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/reducers";
import { displayToast } from "../../../molecules/toast";
import { ToastType } from "../../../molecules/toast/types";
import { resetTransaction } from "../../../../store/reducers/transaction";
import {
  setWithdrawTxnFailed,
  setWithdrawTxnStepNumber
} from "../../../../store/reducers/transactions/withdraw";

const WithdrawToasts = () => {
  const dispatch = useDispatch();
  const { txFailed, stepNumber } = useSelector(
    (state: RootState) => state.withdraw
  );

  useEffect(() => {
    if (stepNumber === 3) {
      dispatch(setWithdrawTxnStepNumber(0));
    }
  }, [stepNumber, dispatch]);

  useEffect(() => {
    if (txFailed) {
      dispatch(setWithdrawTxnFailed(false));
      dispatch(setWithdrawTxnStepNumber(0));
      dispatch(resetTransaction());
    }
  }, [txFailed, dispatch]);

  return (
    <>
      {txFailed ? (
        displayToast(
          {
            message: "This transaction could not be completed"
          },
          ToastType.ERROR
        )
      ) : (
        <>
          {stepNumber === 2 && !txFailed
            ? displayToast(
                {
                  message: "Withdraw Transaction in progress"
                },
                ToastType.LOADING
              )
            : ""}
          {stepNumber === 3 && !txFailed
            ? displayToast(
                {
                  message: "Your ATOM withdrawn Successfully"
                },
                ToastType.SUCCESS
              )
            : ""}
        </>
      )}
    </>
  );
};

export default WithdrawToasts;
