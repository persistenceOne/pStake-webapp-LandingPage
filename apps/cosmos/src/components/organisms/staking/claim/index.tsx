import React, { useEffect, useState } from "react";
import { Icon } from "ui";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import {
  ClaimMsg,
  ClaimMsgTypes,
  LiquidUnStakeMsgTypes,
} from "../../../../helpers/protoMsg";
import { decimalize } from "../../../../helpers/utils";
import { truncateToFixedDecimalPlaces } from "utils";
import { useWallet } from "../../../../context/WalletConnect/WalletConnect";
import {
  executeClaimTransactionSaga,
  hideClaimModal,
} from "../../../../store/reducers/transactions/claim";
import { RootState } from "../../../../store/reducers";
import { CLAIM, COSMOS_CHAIN_ID } from "../../../../../AppConstants";
import { Spinner, Modal } from "ui";
import { setTransactionProgress } from "../../../../store/reducers/transaction";
import { MakeIBCTransferMsg } from "../../../../helpers/transaction";
import {
  CHAIN_ID,
  IBCChainInfos,
  IBCConfiguration,
} from "../../../../helpers/config";
import { claimType } from "../../../../store/reducers/transactions/claim/types";

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

const IndividualUnstakingClaim = ({
  index,
  amount,
  unstakedOn,
  daysRemaining,
  type,
}: any) => {
  return (
    <>
      <div
        className="p-4 rounded-md bg-[#383838] flex items-center justify-between flex-wrap mb-4 "
        key={index}
      >
        <div>
          <p className="amount text-light-mid font-normal leading-normal text-lg mb-2">
            {decimalize(amount)}
            {type === "listedClaims" ? " ATOM" : " stkATOM"}
          </p>
          <p className="leading-normal text-light-mid text-xsm font-normal">
            {type === "listedClaims"
              ? "Unbond time: " + unstakedOn
              : "Tentative Unbond time: " + unstakedOn}
          </p>
        </div>
        <div>
          <p className="leading-normal text-light-mid text-xsm font-normal">
            {daysRemaining} remaining
          </p>
        </div>
      </div>
    </>
  );
};

const ClaimModal = () => {
  let ibcInfo = IBCChainInfos[env].find(
    (chain) => chain.counterpartyChainId === CHAIN_ID[env].cosmosChainID
  );
  const [expand, setExpand] = useState(true);
  const { showModal } = useSelector((state: RootState) => state.claim);

  const { inProgress, name } = useSelector(
    (state: RootState) => state.transaction
  );

  const dispatch = useDispatch();

  const {
    persistenceAccountData,
    persistenceSigner,
    persistenceChainData,
    cosmosChainData,
    cosmosAccountData,
  } = useWallet();

  const { atomBalance, stkAtomBalance } = useSelector(
    (state: RootState) => state.balances
  );

  const [activeClaims, setActiveClaims] = useState(0);
  const [pendingList, setPendingList] = useState<any>([]);
  const [unListedPendingClaims, setUnlistedPendingClaims] = useState<any>([]);

  const {
    claimableBalance,
    pendingClaimList,
    claimableStkAtomBalance,
    unlistedPendingClaimList,
  } = useSelector((state: RootState) => state.claimQueries);

  useEffect(() => {
    setActiveClaims(claimableBalance);
    setPendingList(pendingClaimList);
    setUnlistedPendingClaims(unlistedPendingClaimList);
  }, [claimableBalance, pendingClaimList, unlistedPendingClaimList]);

  const claimHandler = async () => {
    let messages: ClaimMsgTypes[];
    let pollBalance: any;
    let claimType: claimType;
    dispatch(setTransactionProgress(CLAIM));
    if (activeClaims > 0) {
      const withDrawMsg = await MakeIBCTransferMsg({
        channel: ibcInfo?.destinationChannelId,
        fromAddress: persistenceAccountData?.address,
        toAddress: cosmosAccountData?.address,
        amount: truncateToFixedDecimalPlaces(activeClaims),
        timeoutHeight: undefined,
        timeoutTimestamp: undefined,
        denom: ibcInfo?.coinDenom,
        sourceRPCUrl: persistenceChainData?.rpc,
        destinationRPCUrl: cosmosChainData?.rpc,
        port: IBCConfiguration.ibcDefaultPort,
      });
      pollBalance = atomBalance;
      const claimMsg = ClaimMsg(persistenceAccountData!.address);
      messages = [claimMsg, withDrawMsg];
      claimType = "claimAll";
    } else {
      pollBalance = stkAtomBalance;
      const claimMsg = ClaimMsg(persistenceAccountData!.address);
      messages = [claimMsg];
      claimType = "claimStkAtom";
    }

    dispatch(
      executeClaimTransactionSaga({
        persistenceSigner: persistenceSigner!,
        persistenceChainInfo: persistenceChainData!,
        msg: messages,
        cosmosAddress: cosmosAccountData?.address!,
        address: persistenceAccountData!.address,
        cosmosChainInfo: cosmosChainData!,
        pollInitialIBCAtomBalance: pollBalance,
        claimType: claimType,
      })
    );
  };

  const enable =
    Number(activeClaims) > 0 || Number(claimableStkAtomBalance) > 0;

  const handleClose = () => {
    dispatch(hideClaimModal());
  };

  return (
    <Modal
      show={showModal}
      onClose={handleClose}
      className="claimModal"
      header="Claim Unstaked ATOM"
      closeButton={false}
      staticBackDrop={false}
    >
      <div className="px-8 pb-4 pt-4 md:px-7">
        {activeClaims > 0 || claimableStkAtomBalance > 0 ? (
          <div className="bg-[#101010] rounded-md p-6 md:py-4 px-6 mb-4">
            <div className="block">
              <div>
                {activeClaims > 0 ? (
                  <div className="flex justify-between items-center">
                    <p className="font-medium leading-normal text-3xl text-light-high md:text-base">
                      {decimalize(activeClaims)} ATOM
                    </p>
                    <div className="flex text-base text-light-mid leading-normal font-medium">
                      Completed Unstaking
                    </div>
                  </div>
                ) : null}
                {claimableStkAtomBalance > 0 ? (
                  <div className="flex justify-between items-center mt-3">
                    <p className="font-medium leading-normal text-3xl text-light-high md:text-base">
                      {decimalize(claimableStkAtomBalance)} stkATOM
                    </p>
                    <div className="flex text-base text-light-mid leading-normal font-medium">
                      Failed Unstaking
                    </div>
                  </div>
                ) : null}
              </div>
              <p
                className={`mt-4 claimButton rounded-md cursor-pointer border-2 border-[#47C28B] border-solid
                         text-sm text-light-high px-[6.4px] py-[6.4px] w-[86px] text-center mx-auto
                         ${
                           !enable || (name === CLAIM && inProgress)
                             ? "opacity-50 pointer-events-none"
                             : ""
                         }`}
                onClick={claimHandler}
              >
                {name === CLAIM && inProgress ? (
                  <Spinner size={"small"} />
                ) : (
                  "Claim"
                )}
              </p>
            </div>
          </div>
        ) : null}
        <div>
          <p
            onClick={() => setExpand(!expand)}
            className={`unStakeListHeader mb-4 cursor-pointer flex items-center justify-between ${
              expand ? "opened" : "closed"
            }`}
          >
            <span className="font-semibold text-lg leading-normal text-light-high m-0 md:text-base">
              Unstaking in Progress
            </span>
            <Icon
              iconName="right-arrow"
              viewClass={`${
                styles.collapseIcon
              } collapseIcon !w-[16px] !h[16px] ${
                expand ? "fill-[#fcfcfc]" : "fill-[#A6A6A6]"
              }`}
            />
          </p>
          <div
            className={`${
              expand ? "active" : ""
            } unStakeList overflow-hidden max-h-0`}
          >
            <div className="unStakeListContainer">
              {unListedPendingClaims.length
                ? unListedPendingClaims.map((item: any, index: number) => {
                    return (
                      <IndividualUnstakingClaim
                        key={index}
                        amount={item.unbondAmount}
                        unstakedOn={item.unStakedon}
                        daysRemaining={item.daysRemaining}
                        type={"unListedClaims"}
                      />
                    );
                  })
                : null}
              {pendingList.length
                ? pendingList.map((item: any, index: number) => {
                    return (
                      <IndividualUnstakingClaim
                        key={index}
                        amount={item.unbondAmount}
                        unstakedOn={item.unStakedon}
                        daysRemaining={item.daysRemaining}
                        type={"listedClaims"}
                      />
                    );
                  })
                : null}
              {!unListedPendingClaims.length && !pendingList.length ? (
                <p className="mb-3 text-light-mid text-sm leading-normal font-normal md:text-xsm">
                  No pending unbondings found
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ClaimModal;
