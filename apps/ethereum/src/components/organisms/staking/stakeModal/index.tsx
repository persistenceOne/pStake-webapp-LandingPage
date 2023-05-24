import React from "react";
import { Icon, Spinner, Button, Modal } from "ui";
import { useAppStore } from "../../../../store/store";
import {
  TransactionNames,
  TransactionStatus,
} from "../../../../store/slices/transactions";

const TransactionIcon = (
  txName: TransactionNames,
  inProgress: boolean,
  status: TransactionStatus
) => {
  return status === "failed" ? (
    <Icon
      iconName="error"
      viewClass="icon-error !w-[1.5rem] !h-[1.5rem] md:!w-[1.3rem] md:!h-[1.3rem]"
    />
  ) : (txName === "stake" || txName === "mintOnOptimism") && inProgress ? (
    <Spinner size="medium" />
  ) : status === "success" ? (
    <Icon
      iconName="success-full"
      viewClass="icon-arrow !w-[1.5rem] !h-[1.5rem] md:!w-[1.3rem] md:!h-[1.3rem]"
    />
  ) : (
    <Icon
      iconName="success-full-disable"
      viewClass="icon-arrow !w-[1.5rem] !h-[1.5rem] md:!w-[1.3rem] md:!h-[1.3rem]"
    />
  );
};

const StakeInfoModal = () => {
  const transactionInfo = useAppStore((state) => state.transactionInfo);
  const setTxnInfo = useAppStore((state) => state.setTxnInfo);
  const stakeTxnInfo = useAppStore((state) => state.stakeTxnInfo);
  const setStakeTxnModal = useAppStore((state) => state.setStakeTxnModal);

  const handleClose = () => {
    setStakeTxnModal(false);
    setTxnInfo(false, null, null);
  };

  let stakeAmount;
  return (
    <Modal
      show={stakeTxnInfo.modal}
      onClose={handleClose}
      header=""
      className="txnInfoModal"
      staticBackDrop={true}
      closeButton={true}
    >
      <div className="flex items-center justify-center px-10 pt-10 md:px-7 md:pt-7">
        <div className="w-[60px] h-[60px] md:w-[46px] md:h-[46px] bg-[#000] rounded-full flex items-center justify-center">
          <img
            src={"/images/logos/eth.svg"}
            className="logo w-[40px] h-[40px] md:w-[26px] md:h-[26px]"
            alt="atomIcon"
          />
        </div>
        <Icon iconName="arrow-right" viewClass="icon-arrow mx-4" />
        <div className="w-[60px] h-[60px] md:w-[46px] md:h-[46px] bg-[#000] rounded-full flex items-center justify-center">
          <img
            src={"/images/logos/stkEth.svg"}
            className="logo w-[40px] h-[40px] md:w-[26px] md:h-[26px]"
            alt="atomIcon"
          />
        </div>
      </div>
      <p className="text-light-high text-center font-semibold text-lg leading normal px-8 md:text-base md:px-7">
        Liquid Staking {stakeTxnInfo.amount} ETH
      </p>
      <div className={`px-8 pt-4 md:px-7 md:pt-4 m-0`}>
        <div className="mb-8 md:mb-6">
          <div className="flex items-center justify-center mb-5 md:mb-3">
            <div className="mr-3">
              {TransactionIcon(
                transactionInfo.name,
                transactionInfo.inProgress,
                transactionInfo.status!
              )}
            </div>
            <p className={`text-light-emphasis text-base font-normal`}>
              Approve staking with pSTAKE
            </p>
          </div>
        </div>

        {transactionInfo.status === "failed" ? (
          <p className="text-base text-light-high text-center font-semibold mb-4 md:mb-3 md:text-sm">
            Transaction could not be completed.
          </p>
        ) : null}
        {transactionInfo.status === "success" && (
          <p className="text-base text-light-high text-center font-semibold mb-4 md:text-sm">
            You staked {stakeTxnInfo.amount} ETH on pSTAKE successfully!
          </p>
        )}
        {transactionInfo.status === "failed" ||
        transactionInfo.status === "success" ? (
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

export default StakeInfoModal;
