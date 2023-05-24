import React from "react";
import { useAppStore } from "../../../store/store";
import { Button, Spinner, displayToast } from "ui";
import { executeTransferToOptimismTransaction } from "../../../helpers/transaction";
import { addNetwork, handleMetamask } from "../../../helpers/wallets";
import { chains, Networks } from "../../../helpers/config";
import { getWalletProvider } from "../../../helpers/utils";
import { WALLET_ERROR } from "../../../../appConstants";
import { shallow } from "zustand/shallow";
import { ToastType } from "ui/components/molecules/toast/types";

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

const Submit = () => {
  const setBridgeTxnModal = useAppStore((state) => state.setBridgeTxnModal);

  const [
    instances,
    transactionInfo,
    walletInfo,
    stkEthBalance,
    bridgingAmount,
    network,
  ] = useAppStore(
    (state) => [
      state.instances,
      state.transactionInfo,
      state.wallet,
      state.balance.stkETH,
      state.bridgeTxnInfo.amount,
      state.network,
    ],
    shallow
  );

  const transferHandler = async () => {
    setBridgeTxnModal(true);
    await executeTransferToOptimismTransaction(instances?.stakingInstance, {
      address: walletInfo.account!,
      amount: bridgingAmount,
    });
  };

  const switchNetworkHandler = async (type: Networks) => {
    const chain = chains[env][type];
    const provider = getWalletProvider(walletInfo.walletName!);
    const response = await addNetwork(provider, chain);
    if (!response) {
      displayToast(
        {
          heading: WALLET_ERROR,
          message: "Error while Switching network",
        },
        ToastType.ERROR
      );
      return;
    }
  };

  const enable =
    (stkEthBalance >= Number(bridgingAmount) &&
      bridgingAmount &&
      Number(bridgingAmount) > 0 &&
      !network.error) ||
    network.name === "optimism";

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
            ) : network.name === "ethereum" ? (
              "Transfer"
            ) : (
              "Change Network"
            )
          }
          onClick={
            network.name === "ethereum"
              ? transferHandler
              : () => switchNetworkHandler("ethereum")
          }
        />
      ) : (
        <Button
          className="button w-full md:py-2 md:text-sm"
          type="primary"
          size="large"
          onClick={() => {
            handleMetamask();
          }}
          disabled={false}
          content="Connect wallet"
        />
      )}
    </div>
  );
};

export default Submit;
