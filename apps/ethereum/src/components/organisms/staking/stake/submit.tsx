import React from "react";
import { Button, Spinner } from "ui";
import { useAppStore } from "../../../../store/store";
import {
  executeMintOnOptimismTransaction,
  executeStakeTransaction,
} from "../../../../helpers/transaction";
import { handleMetamask } from "../../../../helpers/wallets";

const Submit = () => {
  const stakeTxnInfo = useAppStore((state) => state.stakeTxnInfo);
  const setStakeTxnModal = useAppStore((state) => state.setStakeTxnModal);
  const transactionInfo = useAppStore((state) => state.transactionInfo);
  const walletInfo = useAppStore((state) => state.wallet);
  const network = useAppStore((state) => state.network);
  const instances = useAppStore((state) => state.instances);

  const stakeHandler = async () => {
    setStakeTxnModal(true);
    if (
      stakeTxnInfo.stakeNetwork === "ethereum" ||
      network.name === "optimism"
    ) {
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

  const enable =
    stakeTxnInfo.amount && Number(stakeTxnInfo.amount) > 0 && !network.error;

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
      disabled={false}
      onClick={() => {
        handleMetamask();
      }}
      content="Connect wallet"
    />
  );
};

export default Submit;
