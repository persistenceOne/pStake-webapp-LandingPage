import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/reducers";
import {
  hideWithdrawModal,
  setWithdrawAmount,
  setWithdrawTxnFailed,
  setWithdrawTxnStepNumber,
} from "../../../../store/reducers/transactions/withdraw";
import { Icon, Button, Modal } from "ui";
import styles from "../../staking/stake/styles.module.css";
import { resetTransaction } from "../../../../store/reducers/transaction";
import TransactionIcon from "@/components/molecules/transactionHelper/transactiosIcon";

const WithdrawModal = () => {
  const dispatch = useDispatch();
  const { showModal, txFailed, stepNumber, amount } = useSelector(
    (state: RootState) => state.withdraw
  );

  const handleClose = () => {
    dispatch(setWithdrawTxnStepNumber(0));
    dispatch(setWithdrawTxnFailed(false));
    dispatch(hideWithdrawModal());
    dispatch(setWithdrawAmount(0));
  };

  useEffect(() => {
    if (showModal && txFailed) {
      dispatch(resetTransaction());
    }
  }, [txFailed, showModal, dispatch]);

  return (
    <Modal
      show={showModal}
      onClose={handleClose}
      className="stakeModal"
      staticBackDrop={false}
      closeButton={false}
    >
      <div className="flex items-center justify-center px-10 pt-10 md:px-7 md:pt-7">
        <div className="w-[60px] h-[60px] md:w-[46px] md:h-[46px] bg-[#000] rounded-full flex items-center justify-center">
          <img
            src={"/images/tokens/stk_atom.svg"}
            className="logo w-[40px] h-[40px] md:w-[26px] md:h-[26px]"
            alt="atomIcon"
          />
        </div>
        <Icon iconName="right-arrow-bold" viewClass="icon-arrow mx-4" />
        <div className="w-[60px] h-[60px] md:w-[46px] md:h-[46px] bg-[#000] rounded-full flex items-center justify-center">
          <img
            src={"/images/tokens/atom.svg"}
            className="logo w-[40px] h-[40px] md:w-[26px] md:h-[26px]"
            alt="atomIcon"
          />
        </div>
      </div>
      <p className="text-light-high text-center font-semibold text-lg leading normal px-8 md:text-base md:px-7">
        Withdrawing {amount} ATOM from Persistence to Cosmos
      </p>
      <div className={`${styles.stakeModalBody} px-10 pt-10 md:px-7 md:pt-7`}>
        <div className="mb-10 md:mb-7">
          <div className="flex items-center mb-5">
            <div className="mr-3">
              {TransactionIcon(stepNumber, 1, txFailed)}
            </div>
            <p
              className={`${
                stepNumber >= 1 ? "text-light-emphasis" : "text-light-low"
              } text-base font-normal`}
            >
              Approve wallet transfer
            </p>
          </div>
          <div className="flex items-center mb-5">
            <div className="mr-3">
              {TransactionIcon(stepNumber, 2, txFailed)}
            </div>
            <p
              className={`${
                stepNumber >= 2 ? "text-light-emphasis" : "text-light-low"
              } text-base font-normal`}
            >
              Send ATOM to your Cosmos wallet
            </p>
          </div>
        </div>
        {txFailed ? (
          <p className="text-base text-light-high text-center font-semibold mb-4 md:text-sm">
            Transfer could not be completed.
          </p>
        ) : null}
        {stepNumber === 3 && (
          <p className="text-base text-light-high text-center font-semibold mb-4 md:text-sm">
            {amount} ATOM was withdrawn successfully!
          </p>
        )}
        {txFailed || stepNumber === 3 ? (
          <Button
            className="button w-full md:py-2 md:text-sm flex items-center
             justify-center w-[350px] md:w-[200px] mx-auto mb-10 md:mb-7"
            type="primary"
            size="medium"
            content="Close"
            onClick={handleClose}
          />
        ) : null}
      </div>
    </Modal>
  );
};

export default WithdrawModal;
