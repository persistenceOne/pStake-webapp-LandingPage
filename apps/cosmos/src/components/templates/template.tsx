import Head from "next/head";
import React from "react";
import Topbar from "../organisms/navigationBar";
import MobileSideBar from "../organisms/sidebar/mobileSidebar";
import ClaimModal from "../organisms/staking/claim";
import StakeModal from "../organisms/staking/stake/stakeModal";
import WithdrawModal from "../organisms/sidebar/withdrawModal";
import StakeToasts from "../organisms/staking/stake/stakeToasts";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";

export const PageTemplate = ({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className: string;
  title: string;
}) => {
  const { showModal } = useSelector((state: RootState) => state.stake);
  return (
    <div>
      <div className="flex md:block bg-body-bg">
        <MobileSideBar />
        <div
          className={
            `flex-1 px-8 lg:px-4 h-screen overflow-auto bg-no-repeat ` +
            className
          }
        >
          <Topbar />
          {children}
        </div>
      </div>
      <ClaimModal />
      <StakeModal />
      <WithdrawModal />
      {!showModal ? <StakeToasts /> : null}
    </div>
  );
};
