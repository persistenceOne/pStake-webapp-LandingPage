import React, { useState } from "react";
import logo from "../../assets/images/logo.svg";
import Link from "next/link";
import { Icon } from "ui";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import Styles from "./styles.module.css";
import { useRouter } from "next/router";
import { emptyFunc } from "utils";
import { useWindowSize } from "hooks";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import WithdrawToasts from "./withdrawModal/withdrawToasts";
import BalanceList from "./balanceList";
import { hideMobileSidebar } from "../../../store/reducers/sidebar";
import { useWallet } from "../../../context/WalletConnect/WalletConnect";
import { BUG_REPORT_URL } from "../../../../AppConstants";

const socialList = [
  {
    url: "https://twitter.com/pSTAKE_Cosmos",
    iconName: "twitter-logo",
    tooltip: "Twitter",
  },
  {
    url: " https://t.me/pstakefinancechat",
    iconName: "telegram-plane",
    tooltip: "Telegram",
  },
  {
    url: "https://blog.pstake.finance/category/stkatom/",
    iconName: "medium-m",
    tooltip: "Medium",
  },
  {
    url: "https://pstake.finance/atom",
    iconName: "globe",
    tooltip: "Website",
  },
  {
    url: BUG_REPORT_URL,
    iconName: "bug",
    tooltip: "Bug Report",
  },
];

const moreList = [
  {
    url: "https://docs.pstake.finance/stkATOM_Introduction/",
    name: "Docs",
    icon: "docs",
  },
  {
    url: "https://forum.pstake.finance/",
    name: "Governance",
    icon: "governance",
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();

  const { showModal } = useSelector((state: RootState) => state.withdraw);
  const { persistenceAccountData, isWalletConnected } = useWallet();

  const { isMobile } = useWindowSize();

  const closeSideHandler = () => {
    dispatch(hideMobileSidebar());
  };

  const routeList = [
    {
      icon: "staking",
      text: "Staking",
      path: "/",
    },
    {
      icon: "defi",
      text: "DeFi",
      path: "/defi",
    },
  ];

  const router = useRouter();
  return (
    <aside className="w-[284px] md:w-[220px]">
      <div
        className={`${Styles.sideBarContent} flex flex-col justify-between overflow-y-auto sticky`}
      >
        <div>
          <div className="text-center pt-8 pb-[1.9rem]">
            <Link href="/" className="nav-link text-center" passHref>
              <img
                src={"/images/logo.svg"}
                alt={"logo"}
                className="m-auto"
                width={isMobile ? 90 : 124}
              />
            </Link>
          </div>
          <div className="pb-4">
            {routeList.map((item, index) => (
              <li className={`list-none`} key={index}>
                <Link href={item.path} passHref>
                  <p
                    className={`${
                      router.pathname == item.path
                        ? `border-r-[3px] border-[#c73238] bg-black-700 navItemActive`
                        : "group"
                    } 
                py-[0.625rem] px-8 flex items-center cursor-pointer`}
                    onClick={isMobile ? closeSideHandler : emptyFunc}
                  >
                    <span className={"mr-8 md:mr-4 "}>
                      <Icon
                        iconName={item.icon}
                        viewClass="!w-[20px] !h-auto fill-[#a6a6a6] [.navItemActive_&]:fill-[#c73238] side-bar-icon
                         group-hover:fill-[#fcfcfc]"
                      />
                    </span>
                    <span
                      className="[.navItemActive_&]:text-light-high text-light-mid leading-6 text-base md:text-sm
                      group-hover:text-light-high"
                    >
                      {item.text}
                    </span>
                  </p>
                </Link>
              </li>
            ))}

            {isWalletConnected ? (
              <li className={`list-none`}>
                <Link
                  href={`https://www.mintscan.io/persistence/account/${persistenceAccountData?.address}`}
                  className={`${Styles.navBarLink} nav-link group py-[0.625rem] sm:pb-6 px-8 flex items-center cursor-pointer`}
                  onClick={isMobile ? closeSideHandler : emptyFunc}
                  passHref
                  target={"_blank"}
                >
                  <span className={"mr-8 md:mr-4 "}>
                    <Icon
                      iconName="transactions"
                      viewClass={`!w-[18px] !h-[18px] side-bar-icon  group-hover:fill-[#fcfcfc]`}
                    />
                  </span>
                  <span className="text text-light-mid leading-6 text-base md:text-sm group-hover:text-light-high">
                    Transactions
                  </span>
                  <span>
                    <Icon
                      iconName="new-tab"
                      viewClass={`!w-[8px] !h-[8px] side-bar-icon -mb-0.5 mr-8 ml-1.5 group-hover:fill-[#fcfcfc]`}
                    />
                  </span>
                </Link>
              </li>
            ) : null}
            {moreList.map((item, index) => (
              <li className={`list-none`} key={index}>
                <a
                  className="group py-[0.625rem] px-8 flex items-center cursor-pointer"
                  href={item.url}
                  target={"_blank"}
                  rel="noopener noreferrer"
                  onClick={isMobile ? closeSideHandler : emptyFunc}
                >
                  <span className={"mr-8 md:mr-4 "}>
                    <Icon
                      iconName={item.icon}
                      viewClass={`!w-[18px] !h-[18px] side-bar-icon  group-hover:fill-[#fcfcfc]`}
                    />
                  </span>
                  <span className="text text-light-mid leading-6 text-base md:text-sm group-hover:text-light-high">
                    {item.name}
                  </span>
                  <span>
                    <Icon
                      iconName="new-tab"
                      viewClass={`!w-[8px] !h-[8px] side-bar-icon 
                        -mb-0.5 mr-8 ml-1.5 group-hover:fill-[#fcfcfc]`}
                    />
                  </span>
                </a>
              </li>
            ))}
          </div>
        </div>
        <div className="border-t border-solid border-[#2b2b2b]">
          <BalanceList />
          <div className={`socialLinks flex py-3 px-8`}>
            {socialList.map((item, index) => (
              <Tooltip placement="bottom" overlay={item.tooltip} key={index}>
                <a
                  href={item.url}
                  rel="noopener noreferrer"
                  className="mr-2.5"
                  target="_blank"
                >
                  <Icon viewClass="socialIcon" iconName={item.iconName} />
                </a>
              </Tooltip>
            ))}
          </div>
          <div className="text-light-low text-xsm font-medium leading-4 pb-3 px-8">
            <a href="https://persistence.one/" target="_blank" rel="noreferrer">
              By Persistence
            </a>
          </div>
        </div>
      </div>
      {!showModal ? <WithdrawToasts /> : null}
    </aside>
  );
};

export default Sidebar;
