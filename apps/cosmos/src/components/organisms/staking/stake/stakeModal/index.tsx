import React, { useEffect } from "react";
import {Modal ,Icon, Button} from "ui";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import {
  hideStakeModal,
  setStakeTxnStepNumber,
  setStakeTxnFailed,
  setStakeAmount
} from "@/store/reducers/transactions/stake";
import styles from "../styles.module.css";
import { resetTransaction } from "@/store/reducers/transaction";
import TransactionIcon from "../../../../molecules/transactionHelper/transactiosIcon";

const StakeModal = () => {
  const dispatch = useDispatch();
  const { showModal, txFailed, stepNumber, amount, liquidStakeType } =
    useSelector((state: RootState) => state.stake);

  const handleClose = () => {
    dispatch(setStakeTxnStepNumber(0));
    dispatch(setStakeTxnFailed(false));
    dispatch(hideStakeModal());
    dispatch(setStakeAmount(""));
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
            src={"/images/tokens/atom.svg"}
            className="logo w-[40px] h-[40px] md:w-[26px] md:h-[26px]"
            alt="atomIcon"
          />
        </div>
        <Icon iconName="right-arrow-bold" viewClass="icon-arrow mx-4" />
        <div className="w-[60px] h-[60px] md:w-[46px] md:h-[46px] bg-[#000] rounded-full flex items-center justify-center">
          <img
            src={"/images/tokens/stk_atom.svg"}
            className="logo w-[40px] h-[40px] md:w-[26px] md:h-[26px]"
            alt="atomIcon"
          />
        </div>
      </div>
      <p className="text-light-high text-center font-semibold text-lg leading normal px-8 md:text-base md:px-7">
        Liquid Staking {amount} ATOM
      </p>
      <div className={`${styles.stakeModalBody} px-10 pt-10 md:px-7 md:pt-7`}>
        <div className="mb-10 md:mb-7">
          {liquidStakeType === "dual" ? (
            <div className="flex items-center mb-5 md:mb-3">
              <div className="mr-3">
                {TransactionIcon(
                  stepNumber === 1 || stepNumber === 2 ? 1 : stepNumber,
                  1,
                  txFailed
                )}
              </div>
              <p
                className={`${
                  stepNumber >= 1 ? "text-light-emphasis" : "text-light-low"
                } text-base font-normal`}
              >
                Approve wallet transfer
              </p>
            </div>
          ) : null}
          <div className="flex items-center mb-5 md:mb-3">
            <div className="mr-3">
              {TransactionIcon(
                stepNumber === 3 || stepNumber === 4 ? 3 : stepNumber,
                3,
                txFailed
              )}
            </div>
            <p
              className={`${
                stepNumber >= 3 ? "text-light-emphasis" : "text-light-low"
              } text-base font-normal`}
            >
              Approve staking with pSTAKE
            </p>
          </div>
        </div>

        {txFailed ? (
          <p className="text-base text-light-high text-center font-semibold mb-4 md:mb-3 md:text-sm">
            Transfer could not be completed.
          </p>
        ) : null}
        {stepNumber === 5 && (
          <p className="text-base text-light-high text-center font-semibold mb-4 md:text-sm">
            You&apos;ve successfully staked {amount} ATOM on pSTAKE
          </p>
        )}
        {txFailed || stepNumber === 5 ? (
          <Button
            className="button w-full md:py-2 md:text-sm flex items-center
            justify-center w-[350px]  md:w-[200px]  mx-auto mb-10 md:mb-7"
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

export default StakeModal;
