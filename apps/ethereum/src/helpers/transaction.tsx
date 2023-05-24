import React from "react";
import { displayToast } from "ui";
import { BigNumberish, ContractTransaction, utils } from "ethers";
import { exceptionHandle, stringTruncate } from "./utils";
import { Icon } from "../components/atoms/icon";
import { useAppStore } from "../store/store";
import { Staking } from "../contracts/types";
import { PromiseOrValue } from "../contracts/types/common";
import { chains, messengerId } from "./config";
import { ToastType } from "ui/components/molecules/toast/types";

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

export type StakeParams = {
  ethAddress: string;
  amount: number | string;
};

export type MintOnOptimismParams = {
  address: string;
  amount: number | string;
};

export type TransferToOptimism = {
  address: string;
  amount: PromiseOrValue<BigNumberish>;
};

export const formBlockExplorerLink = (txnHash: string) => {
  const network = useAppStore.getState().network.name!;
  const chain = chains[env][network].explorerUrl;
  if (txnHash) return `${chain}/tx/${txnHash}`;
  return "";
};

export const failedTransactionActions = (txnHash: string) => {
  displayToast(
    {
      message: `This transaction could not be completed${
        txnHash ? `: ${txnHash}` : ""
      }`,
    },
    ToastType.ERROR
  );
};

export const executeStakeTransaction = async (
  instance: Staking | undefined,
  contractParams: StakeParams
) => {
  useAppStore.getState().setTxnInfo(true, "stake", null);
  try {
    const walletSigner = useAppStore.getState().walletSigner;
    const gasPrice = await walletSigner!.estimateGas({
      from: contractParams.ethAddress,
      value: utils.parseEther(contractParams.amount.toString()),
    });
    // const maxFeePerGas: any = utils.formatEther(gasFeeData["maxFeePerGas"]);
    // const transactionFees = result.toNumber() * maxFeePerGas;

    const gasLimit = await instance!.estimateGas.stake({
      from: contractParams.ethAddress,
      value: utils.parseEther(contractParams.amount.toString()),
    });
    console.log(gasLimit, "transactionFees");
    const txn: ContractTransaction | undefined = await instance?.stake({
      from: contractParams.ethAddress,
      value: utils.parseEther(contractParams.amount.toString()),
      gasLimit: gasLimit.toString(),
    });
    console.log(txn, "txn");
    useAppStore.getState().setTxnBroadCast(true);
    await transactionActions(txn);
  } catch (e: any) {
    exceptionHandle(e, { "Error while staking": "" });
  }
};

export const executeMintOnOptimismTransaction = async (
  instance: Staking | undefined,
  contractParams?: MintOnOptimismParams
) => {
  useAppStore.getState().setTxnInfo(true, "mintOnOptimism", null);
  try {
    const gasLimit = await instance!.estimateGas.mintL2(
      messengerId[env],
      contractParams!.address,
      {
        value: utils.parseEther(contractParams!.amount!.toString()),
      }
    );

    const txn: ContractTransaction | undefined = await instance?.mintL2(
      messengerId[env],
      contractParams!.address,
      {
        value: utils.parseEther(contractParams!.amount!.toString()),
        gasLimit: gasLimit,
      }
    );
    useAppStore.getState().setTxnBroadCast(true);
    await transactionActions(txn);
  } catch (e: any) {
    exceptionHandle(e, { "Error while minting on optimism": "" });
  }
};

export const executeTransferToOptimismTransaction = async (
  instance: Staking | undefined,
  contractParams?: TransferToOptimism
) => {
  useAppStore.getState().setTxnInfo(true, "transferToOptimism", null);
  try {
    console.log(contractParams, "contractParams");
    const gasLimit = await instance!.estimateGas.transferToL2(
      messengerId[env],
      utils.parseEther(contractParams!.amount!.toString()),
      contractParams!.address
    );

    const txn: ContractTransaction | undefined = await instance?.transferToL2(
      messengerId[env],
      utils.parseEther(contractParams!.amount!.toString()),
      contractParams!.address,
      {
        gasLimit: gasLimit,
      }
    );
    useAppStore.getState().setTxnBroadCast(true);
    await transactionActions(txn);
  } catch (e: any) {
    exceptionHandle(e, { "Error while transfer": "" });
  }
};

// common actions for all transactions
export const transactionActions = async (
  txn: ContractTransaction | undefined,
  account?: string
) => {
  displayToast(
    {
      message: "Waiting for confirmation",
    },
    ToastType.LOADING
  );
  try {
    await txn!.wait();
    displayToast(
      {
        message: (
          <>
            <a
              rel="noreferrer"
              className="flex items-center"
              target={"_blank"}
              href={formBlockExplorerLink(txn!.hash)}
            >
              {stringTruncate(txn!.hash)}
              <Icon iconName="arrow-redirect" viewClass="icon" />
            </a>
          </>
        ),
      },
      ToastType.SUCCESS
    );
    await useAppStore.getState().fetchBalances();
    useAppStore.getState().setTxnBroadCast(false);
    useAppStore.getState().setTxnInfo(false, null, "success");
    console.log(txn);
  } catch (e) {
    useAppStore.getState().setTxnBroadCast(false);
    useAppStore.getState().setTxnInfo(false, null, "failed");
    exceptionHandle(e, { "Error while making txn": "" });
  }
};
