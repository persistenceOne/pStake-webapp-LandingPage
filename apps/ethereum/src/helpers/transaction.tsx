import React from "react";
import { displayToast, Icon } from "ui";
import { ToastType } from "ui/components/molecules/toast/types";
import { BigNumberish, ContractTransaction, utils } from "ethers";
import { exceptionHandle, stringTruncate } from "./utils";
import { useAppStore } from "../store/store";
import { Staking } from "../contracts/types";
import { PromiseOrValue } from "../contracts/types/common";
import { chains } from "./config";

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
  const network = useAppStore.getState().wallet.network!;
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
    console.log(
      contractParams,
      "contractParams",
      utils.parseEther(contractParams.amount.toString())
    );
    const txn: ContractTransaction | undefined = await instance?.stake({
      from: contractParams.ethAddress,
      value: utils.parseEther(contractParams.amount.toString()),
    });
    console.log(txn, "txn");
    await transactionActions(txn);
  } catch (e: any) {
    exceptionHandle(e, { "Error while staking": "" });
  }
};

export type sparams = {
  token: number;
};

export const executeMintOnOptimismTransaction = async (
  instance: Staking | undefined,
  contractParams?: MintOnOptimismParams
) => {
  useAppStore.getState().setTxnInfo(true, "mintOnOptimism", null);
  try {
    console.log(
      contractParams,
      "minting",
      utils.parseEther(contractParams!.amount.toString())
    );
    const txn: ContractTransaction | undefined = await instance?.mintOptimism(
      contractParams!.address,
      {
        value: utils.parseEther(contractParams!.amount!.toString()),
      }
    );
    await transactionActions(txn);
  } catch (e: any) {
    exceptionHandle(e, { "Error while un-staking": "" });
  }
};

export const executeTransferToOptimismTransaction = async (
  instance: Staking | undefined,
  contractParams?: TransferToOptimism
) => {
  useAppStore.getState().setTxnInfo(true, "transferToOptimism", null);
  try {
    const txn: ContractTransaction | undefined =
      await instance?.transferToOptimism(
        contractParams!.address,
        utils.parseEther(contractParams!.amount!.toString()),
        { from: contractParams!.address }
      );
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
    useAppStore.getState().setTxnInfo(false, null, "success");
    console.log(txn);
  } catch (e) {
    useAppStore.getState().setTxnInfo(false, null, "failed");
    exceptionHandle(e, { "Error while making txn": "" });
  }
};
