import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {Button, Spinner} from "ui";
import { RootState } from "../../../../../store/reducers";
import { useWallet } from "../../../../../context/WalletConnect/WalletConnect";
import { LiquidStakeMsg } from "../../../../../helpers/protoMsg";
import { unDecimalize } from "../../../../../helpers/utils";
import {
  CHAIN_ID,
  IBCChainInfos,
  IBCConfiguration
} from "../../../../../helpers/config";
import {
  COSMOS_CHAIN_ID,
  DEPOSIT,
  STAKE
} from "../../../../../../AppConstants";
import { setStakeTxnFailed } from "../../../../../store/reducers/transactions/stake";
import { setTransactionProgress } from "../../../../../store/reducers/transaction";
import { MakeIBCTransferMsg } from "../../../../../helpers/transaction";
import { executeDepositTransactionSaga } from "../../../../../store/reducers/transactions/deposit";

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

const Submit = () => {
  const dispatch = useDispatch();
  let ibcInfo = IBCChainInfos[env].find(
    (chain) => chain.counterpartyChainId === CHAIN_ID[env].cosmosChainID
  );
  const { atomBalance, stkAtomBalance, ibcAtomBalance } = useSelector(
    (state: RootState) => state.balances
  );
  const { amount, txFailed, stepNumber } = useSelector(
    (state: RootState) => state.stake
  );
  const { inProgress, name } = useSelector(
    (state: RootState) => state.transaction
  );
  const {
    cosmosAccountData,
    cosmosChainData,
    cosmosSigner,
    persistenceAccountData,
    persistenceSigner,
    persistenceChainData
  } = useWallet();

  const stakeHandler = async () => {
    dispatch(setStakeTxnFailed(false));
    dispatch(setTransactionProgress(DEPOSIT));

    const depositMsg = await MakeIBCTransferMsg({
      channel: ibcInfo?.sourceChannelId,
      fromAddress: cosmosAccountData?.address,
      toAddress: persistenceAccountData?.address,
      amount: unDecimalize(amount),
      timeoutHeight: undefined,
      timeoutTimestamp: undefined,
      denom: cosmosChainData?.stakeCurrency.coinMinimalDenom,
      sourceRPCUrl: cosmosChainData?.rpc,
      destinationRPCUrl: persistenceChainData?.rpc,
      port: IBCConfiguration.ibcDefaultPort
    });

    const stakeMsg = LiquidStakeMsg(
      persistenceAccountData!.address,
      unDecimalize(amount),
      ibcInfo!.coinDenom
    );

    dispatch(
      executeDepositTransactionSaga({
        cosmosSigner: cosmosSigner!,
        cosmosChainInfo: cosmosChainData!,
        persistenceChainInfo: persistenceChainData!,
        cosmosAddress: cosmosAccountData!.address,
        persistenceAddress: persistenceAccountData!.address,
        depositMsg: depositMsg,
        stakeMsg: stakeMsg,
        pollInitialDepositBalance: ibcAtomBalance,
        pollInitialStakeBalance: stkAtomBalance,
        persistenceSigner: persistenceSigner!
      })
    );
  };

  const enable =
    amount && Number(amount) > 0 && Number(amount) <= Number(atomBalance);

  return (
    <Button
      className={`${
        (name === STAKE || name === DEPOSIT) && inProgress
          ? "!py-[0.8125rem]"
          : ""
      } 
            button w-full md:py-2 md:text-sm flex items-center justify-center`}
      type="primary"
      size="large"
      disabled={!enable || ((name === STAKE || name === DEPOSIT) && inProgress)}
      content={
        (name === STAKE || name === DEPOSIT) && inProgress ? (
          <Spinner size={"medium"} />
        ) : txFailed && stepNumber === 1 ? (
          "Retry"
        ) : (
          "Liquid Stake"
        )
      }
      onClick={stakeHandler}
    />
  );
};

export default Submit;
