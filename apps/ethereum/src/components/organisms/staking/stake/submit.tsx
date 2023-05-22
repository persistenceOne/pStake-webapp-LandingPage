import React from "react";
import Button from "../../../atoms/button";
import { useAppStore } from "../../../../store/store";
import {
  executeMintOnOptimismTransaction,
  executeStakeTransaction,
} from "../../../../helpers/transaction";
import { Spinner } from "../../../atoms/spinner";

const Submit = () => {
  const stakeTxnInfo = useAppStore((state) => state.stakeTxnInfo);
  const setStakeTxnModal = useAppStore((state) => state.setStakeTxnModal);
  const transactionInfo = useAppStore((state) => state.transactionInfo);
  const walletInfo = useAppStore((state) => state.wallet);
  const instances = useAppStore((state) => state.instances);

  const stakeHandler = async () => {
    setStakeTxnModal(true);
    console.log("stakeNetwork", stakeTxnInfo);
    if (stakeTxnInfo.stakeNetwork === "ethereum") {
      await executeStakeTransaction(instances?.stakingInstance, {
        ethAddress: walletInfo.account!,
        amount: stakeTxnInfo.amount,
      });
    } else {
      await executeMintOnOptimismTransaction(instances?.stakingInstance, {
        address: walletInfo.account!,
        amount: stakeTxnInfo.amount,
      });
    }
  };

  const enable = stakeTxnInfo.amount && Number(stakeTxnInfo.amount) > 0;

  return walletInfo.walletConnection ? (
    <Button
      className={`button w-full md:py-2 md:text-sm flex items-center justify-center`}
      type="primary"
      size="large"
      disabled={
        !enable ||
        ((transactionInfo.name === "stake" ||
          transactionInfo.name === "mintOnOptimism") &&
          transactionInfo.inProgress)
      }
      content={
        (transactionInfo.name === "stake" ||
          transactionInfo.name === "mintOnOptimism") &&
        transactionInfo.inProgress ? (
          <Spinner size={"small"} />
        ) : (
          "Stake"
        )
      }
      onClick={stakeHandler}
    />
  ) : (
    <Button
      className="button w-full md:py-2 md:text-sm"
      type="primary"
      size="large"
      disabled={true}
      content="Connect wallet"
    />
  );
};

export default Submit;
