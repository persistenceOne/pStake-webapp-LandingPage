import React from "react";
import { Icon } from "../../../atoms/icon";
import { Spinner, Modal, Button } from "ui";
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
  ) : txName === "transferToOptimism" && inProgress ? (
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

const TxnInfoModal = () => {
  const transactionInfo = useAppStore((state) => state.transactionInfo);
  const setTxnInfo = useAppStore((state) => state.setTxnInfo);
  const txnBroadCast = useAppStore((state) => state.txnBroadCast);
  const bridgeTxnInfo = useAppStore((state) => state.bridgeTxnInfo);
  const setBridgeTxnModal = useAppStore((state) => state.setBridgeTxnModal);

  const handleClose = () => {
    setBridgeTxnModal(false);
    setTxnInfo(false, null, null);
  };

  return (
    <Modal
      show={bridgeTxnInfo.modal}
      onClose={handleClose}
      header=""
      className="txnInfoModal"
      staticBackDrop={true}
      closeButton={true}
    >
      <div className="px-10 pt-10 md:px-7 md:pt-7 pb-4 border-b border-solid border-[#383838]">
        <div className="flex items-center justify-center ">
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
              src={"/images/logos/optimism.svg"}
              className="logo w-[40px] h-[40px] md:w-[26px] md:h-[26px]"
              alt="atomIcon"
            />
          </div>
        </div>
        <p className="text-light-high text-center font-semibold text-lg leading normal md:text-base pt-4">
          Transferring {bridgeTxnInfo.amount} ETH
        </p>
      </div>
      <div className={`p-6`}>
        <div className="flex items-center justify-center">
          <div className="mr-3">
            {TransactionIcon(
              transactionInfo.name,
              transactionInfo.inProgress,
              transactionInfo.status!
            )}
          </div>
          <p className={`text-light-emphasis text-base font-normal`}>
            {transactionInfo.inProgress && txnBroadCast
              ? "Broadcasting your transaction"
              : !transactionInfo.inProgress &&
                transactionInfo.status === "success"
              ? "Transaction complete."
              : "Approve transaction to bridge"}
          </p>
        </div>

        {transactionInfo.status === "failed" ? (
          <p className="text-base text-light-high text-center font-semibold my-4 md:text-sm">
            Transaction failed. Please try again
          </p>
        ) : null}
        {transactionInfo.status === "success" ? (
          <p className="text-base text-light-high text-center font-semibold my-4 md:text-sm">
            You will be get {bridgeTxnInfo.amount} stkETH on Optimism in about
            20 min
          </p>
        ) : (
          ""
        )}
        {transactionInfo.status === "failed" ||
        transactionInfo.status === "success" ? (
          <Button
            className="button md:text-sm flex items-center
            justify-center w-[350px] md:w-[200px] mx-auto"
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

export default TxnInfoModal;
