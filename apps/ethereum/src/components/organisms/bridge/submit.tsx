import React from "react";
import { useAppStore } from "../../../store/store";
import Button from "../../atoms/button";
import { executeTransferToOptimismTransaction } from "../../../helpers/transaction";
import { Spinner } from "../../atoms/spinner";

const Submit = () => {
  const walletInfo = useAppStore((state) => state.wallet);
  const instances = useAppStore((state) => state.instances);
  const transactionInfo = useAppStore((state) => state.transactionInfo);
  const bridgeTxnInfo = useAppStore((state) => state.bridgeTxnInfo);

  const transferHandler = async () => {
    console.log("transferHandler");
    await executeTransferToOptimismTransaction(instances?.stakingInstance, {
      address: walletInfo.account!,
      amount: bridgeTxnInfo.amount,
    });
  };

  const enable = bridgeTxnInfo.amount && Number(bridgeTxnInfo.amount) > 0;

  return (
    <div className="mt-6">
      {walletInfo.walletConnection ? (
        <Button
          className={`button w-full md:py-2 md:text-sm flex items-center justify-center`}
          type="primary"
          size="large"
          disabled={
            !enable ||
            (transactionInfo.name === "transferToOptimism" &&
              transactionInfo.inProgress)
          }
          content={
            transactionInfo.name === "transferToOptimism" &&
            transactionInfo.inProgress ? (
              <Spinner size={"small"} />
            ) : (
              "Transfer"
            )
          }
          onClick={transferHandler}
        />
      ) : (
        <Button
          className="button w-full md:py-2 md:text-sm"
          type="primary"
          size="large"
          disabled={true}
          content="Connect wallet"
        />
      )}
    </div>
  );
};

export default Submit;
