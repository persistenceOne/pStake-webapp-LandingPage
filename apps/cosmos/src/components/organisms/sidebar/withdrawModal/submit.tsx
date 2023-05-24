import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {Button, Spinner} from "ui";
import { RootState } from "../../../../store/reducers";
import { useWallet } from "../../../../context/WalletConnect/WalletConnect";
import { unDecimalize } from "../../../../helpers/utils";
import {
  CHAIN_ID,
  IBCChainInfos,
  IBCConfiguration
} from "../../../../helpers/config";
import {
  COSMOS_CHAIN_ID,
  DEPOSIT,
  STAKE,
  WITHDRAW
} from "../../../../../AppConstants";
import { setTransactionProgress } from "../../../../store/reducers/transaction";
import { MakeIBCTransferMsg } from "../../../../helpers/transaction";
import {
  executeWithdrawTransactionSaga,
  setWithdrawAmount,
  setWithdrawTxnFailed,
  showWithdrawModal
} from "../../../../store/reducers/transactions/withdraw";
import { hideMobileSidebar } from "../../../../store/reducers/sidebar";

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

const WithdrawButton = () => {
  const dispatch = useDispatch();
  let ibcInfo = IBCChainInfos[env].find(
    (chain) => chain.counterpartyChainId === CHAIN_ID[env].cosmosChainID
  );
  const { atomBalance, ibcAtomBalance } = useSelector(
    (state: RootState) => state.balances
  );
  const { inProgress, name } = useSelector(
    (state: RootState) => state.transaction
  );
  const {
    cosmosAccountData,
    cosmosChainData,
    persistenceAccountData,
    persistenceSigner,
    persistenceChainData
  } = useWallet();
  const { showModal } = useSelector((state: RootState) => state.withdraw);

  const withdrawHandler = async () => {
    dispatch(hideMobileSidebar());
    dispatch(setWithdrawAmount(ibcAtomBalance));
    dispatch(setWithdrawTxnFailed(false));
    dispatch(setTransactionProgress(WITHDRAW));
    const withDrawMsg = await MakeIBCTransferMsg({
      channel: ibcInfo?.destinationChannelId,
      fromAddress: persistenceAccountData?.address,
      toAddress: cosmosAccountData?.address,
      amount: unDecimalize(ibcAtomBalance),
      timeoutHeight: undefined,
      timeoutTimestamp: undefined,
      denom: ibcInfo?.coinDenom,
      sourceRPCUrl: persistenceChainData?.rpc,
      destinationRPCUrl: cosmosChainData?.rpc,
      port: IBCConfiguration.ibcDefaultPort
    });

    dispatch(
      executeWithdrawTransactionSaga({
        cosmosChainInfo: cosmosChainData!,
        persistenceChainInfo: persistenceChainData!,
        cosmosAddress: cosmosAccountData?.address!,
        persistenceAddress: persistenceAccountData?.address!,
        withdrawMsg: withDrawMsg,
        pollInitialIBCAtomBalance: atomBalance,
        persistenceSigner: persistenceSigner!
      })
    );
    dispatch(showWithdrawModal());
  };

  return (
    <Button
      size="small"
      type="secondary"
      content={
        name === WITHDRAW && inProgress && !showModal ? (
          <Spinner size={"small"} />
        ) : (
          "Withdraw"
        )
      }
      disabled={name === WITHDRAW && inProgress}
      className="w-full mt-6 md:text-xsm md:py-2 md:px-4"
      onClick={withdrawHandler}
    />
  );
};

export default WithdrawButton;
