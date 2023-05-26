import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import Tooltip from "rc-tooltip";
import { Icon, Button } from "ui";
import { decimalize } from "../../../helpers/utils";
import { formatNumber, truncateToFixedDecimalPlaces } from "utils";
import { hideMobileSidebar } from "../../../store/reducers/sidebar";
import { showClaimModal } from "../../../store/reducers/transactions/claim";
import { useWallet } from "../../../context/WalletConnect/WalletConnect";
import { useWindowSize } from "hooks";
import WithdrawButton from "./withdrawModal/submit";
import { MIN_BALANCE_CHECK } from "../../../../AppConstants";

const BalanceList = () => {
  const dispatch = useDispatch();
  const [activeClaims, setActiveClaims] = useState<number>(0);
  const { exchangeRate } = useSelector((state: RootState) => state.initialData);
  const { atomPrice } = useSelector((state: RootState) => state.liveData);
  const [activeStkAtomClaims, setActiveStkAtomClaims] = useState<number>(0);
  const [pendingList, setPendingList] = useState<any>([]);
  const [open, setOpen] = useState<any>({
    persistenceBalance: true,
    cosmosBalance: false,
    unStaking: false,
  });
  const [totalPendingBalance, setTotalPendingBalance] = useState<number>(0);
  const [totalUnListedPendingClaims, setTotalUnlistedPendingClaims] =
    useState<number>(0);
  const { ibcAtomBalance, stkAtomBalance, xprtBalance, atomBalance } =
    useSelector((state: RootState) => state.balances);

  const stkATOMAmount = truncateToFixedDecimalPlaces(
    Number(stkAtomBalance) * (1 / exchangeRate)
  );

  const { isWalletConnected } = useWallet();
  const { isMobile } = useWindowSize();

  const {
    claimableBalance,
    pendingClaimList,
    claimableStkAtomBalance,
    unlistedPendingClaimList,
  } = useSelector((state: RootState) => state.claimQueries);

  const claimHandler = async () => {
    dispatch(hideMobileSidebar());
    dispatch(showClaimModal());
  };

  useEffect(() => {
    setActiveClaims(claimableBalance);
    setPendingList(pendingClaimList);
    setActiveStkAtomClaims(claimableStkAtomBalance);
    let totalPendingClaimableAmount: number = 0;

    if (pendingList.length) {
      pendingList.forEach((item: any) => {
        totalPendingClaimableAmount += item.unbondAmount;
      });
    }
    setTotalPendingBalance(totalPendingClaimableAmount);

    let totalUnlistedPendingClaimableAmount: number = 0;
    if (unlistedPendingClaimList.length) {
      unlistedPendingClaimList.forEach((item: any) => {
        totalUnlistedPendingClaimableAmount += item.unbondAmount;
      });
    }
    setTotalUnlistedPendingClaims(totalUnlistedPendingClaimableAmount);
  }, [
    claimableBalance,
    pendingClaimList,
    claimableStkAtomBalance,
    pendingList,
    unlistedPendingClaimList,
  ]);

  const handleCollapse = (value: string) => {
    for (const key in open) {
      if (key === value) {
        open[key] = !open[key];
      }
      setOpen({ ...open });
    }
  };

  return (
    <div>
      <div>
        <p
          onClick={() => handleCollapse("persistenceBalance")}
          className={`flex items-center justify-between navLink moreListHeader cursor-pointer m-0 
                 ${
                   open["persistenceBalance"] ? "opened" : "closed"
                 } py-3 px-8 group`}
        >
          <span className="flex items-center">
            <span className="text-light-emphasis text-sm flex items-center font-medium leading-normal">
              Assets on Persistence
            </span>
          </span>
          <Icon iconName="right-arrow" viewClass="side-bar-icon arrow" />
        </p>
        <div
          id="persistenceBalance"
          className={`${
            open["persistenceBalance"] ? "active" : ""
          } collapseMenu ease-in overflow-hidden relative bg-[#1B1B1B] px-6`}
        >
          <div className="pb-4 pt-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={"/images/tokens/stk_atom.svg"}
                  width={22}
                  height={22}
                  alt="atom"
                />
                <span className="text-light-mid text-sm leading-5 ml-2.5">
                  stkATOM
                </span>
              </div>
              <p
                className="text-light-mid text-sm font-medium leading-5"
                title={`$${formatNumber(
                  atomPrice * stkATOMAmount,
                  3,
                  isMobile ? 2 : 6
                )}`}
              >
                {formatNumber(stkAtomBalance, 3, isMobile ? 2 : 6)}
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <img
                  src={"/images/tokens/xprt_white.svg"}
                  width={22}
                  height={22}
                  alt="xprt_white"
                />
                <span className="text-light-mid text-sm leading-5 ml-2.5">
                  XPRT
                </span>
              </div>
              <p className="text-light-mid text-sm font-medium leading-5">
                {formatNumber(xprtBalance, 3, isMobile ? 2 : 6)}
              </p>
            </div>

            <>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                  <img
                    src={"/images/tokens/atom.svg"}
                    width={22}
                    height={22}
                    alt="atom"
                  />
                  <span className="text-light-mid text-sm leading-5 ml-2.5">
                    ATOM
                  </span>
                  <Tooltip
                    placement="bottom"
                    overlay={
                      <span className="text-center block">
                        (ATOM on Persistence)
                      </span>
                    }
                  >
                    <button className="icon-button px-1">
                      <Icon viewClass="arrow-right" iconName="info" />
                    </button>
                  </Tooltip>
                </div>
                <p
                  className="text-light-mid text-sm font-medium leading-5"
                  title={`$${formatNumber(
                    atomPrice * ibcAtomBalance,
                    3,
                    isMobile ? 2 : 6
                  )}`}
                >
                  {formatNumber(ibcAtomBalance, 3, isMobile ? 2 : 6)}
                </p>
              </div>
              {ibcAtomBalance > MIN_BALANCE_CHECK ? (
                <div className={`m-auto w-[220px] md:w-auto`}>
                  <WithdrawButton />
                </div>
              ) : null}
            </>
          </div>
        </div>
      </div>
      <div>
        <p
          onClick={() => handleCollapse("cosmosBalance")}
          className={`flex items-center justify-between navLink moreListHeader cursor-pointer m-0 
                 ${
                   open["cosmosBalance"] ? "opened" : "closed"
                 } py-3 px-8 group`}
        >
          <span className="flex items-center">
            <span
              className="text-light-emphasis flex items-center
             text-sm flex items-center font-medium leading-normal"
            >
              {isMobile ? "Assets on Cosmos" : "Assets on Cosmos Hub"}
            </span>
          </span>
          <Icon iconName="right-arrow" viewClass="side-bar-icon arrow" />
        </p>
        <div
          id="cosmosBalance"
          className={`${
            open["cosmosBalance"] ? "active" : ""
          } collapseMenu overflow-hidden relative bg-[#1B1B1B] px-6`}
        >
          <div className="flex justify-between items-center pb-4 pt-2">
            <div className="flex items-center">
              <img
                src={"/images/tokens/atom.svg"}
                width={22}
                height={22}
                alt="atom"
              />
              <span className="text-light-mid text-sm leading-5 ml-2.5">
                ATOM
              </span>
            </div>
            <p
              className="text-light-mid text-sm font-medium leading-5"
              title={`$${formatNumber(
                atomPrice * atomBalance,
                3,
                isMobile ? 2 : 6
              )}`}
            >
              {formatNumber(atomBalance, 3, isMobile ? 2 : 6)}
            </p>
          </div>
        </div>
      </div>
      <div>
        <p
          onClick={() => handleCollapse("unStaking")}
          className={`flex items-center justify-between navLink moreListHeader cursor-pointer m-0 
                 ${open["unStaking"] ? "opened" : "closed"} py-3 px-8 group`}
        >
          <span className="flex items-center">
            <span
              className="text-light-emphasis flex items-center text-sm flex
             items-center font-medium leading-normal"
            >
              Unstaking
            </span>
            <Tooltip
              placement="bottom"
              overlay={
                <span>
                  Your assets in the process of <br />
                  being unstaked, after which <br />
                  they can be claimed.
                </span>
              }
            >
              <button className="icon-button px-1">
                <Icon viewClass="arrow-right" iconName="info" />
              </button>
            </Tooltip>
          </span>
          <Icon iconName="right-arrow" viewClass="side-bar-icon arrow" />
        </p>
        <div
          id="unStaking"
          className={`${open["unStaking"] ? "active" : ""} collapseMenu
              overflow-hidden relative bg-[#1B1B1B] px-6 `}
        >
          <div className="pb-4 pt-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={"/images/tokens/atom.svg"}
                  width={22}
                  height={22}
                  alt="atom"
                />
                <span className="text-light-mid text-sm leading-5 ml-2.5">
                  ATOM
                </span>
              </div>
              <p className="text-light-mid text-sm font-medium leading-5">
                {formatNumber(
                  Number(decimalize(activeClaims)) +
                    Number(decimalize(totalPendingBalance)) +
                    Number(decimalize(activeStkAtomClaims)) +
                    Number(decimalize(totalUnListedPendingClaims)),
                  3,
                  isMobile ? 2 : 6
                )}
              </p>
            </div>
            {isWalletConnected &&
            (activeClaims > 0 ||
              totalPendingBalance > 0 ||
              activeStkAtomClaims > 0 ||
              totalUnListedPendingClaims > 0) ? (
              <div className={`m-auto w-[220px] md:w-auto`}>
                <Button
                  size="small"
                  type="secondary"
                  content="Claim"
                  className="w-full mt-4 md:text-xsm md:py-1 md:px-2"
                  onClick={claimHandler}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceList;
