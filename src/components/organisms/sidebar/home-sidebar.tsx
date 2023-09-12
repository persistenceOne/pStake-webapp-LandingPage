"use client";
import React, { useRef, useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";
import { useWindowSize } from "../../../customHooks/useWindowSize";
import { useOnClickOutside } from "../../../customHooks/useOnClickOutside";
import { Icon } from "../../atoms/icon";
import { BUG_REPORT_URL } from "../../../../AppConstants";

const socialList = [
  {
    url: "https://twitter.com/pStakeFinance?utm_source=pstake_website&utm_medium=pstake&utm_campaign=pstake_liquid_staking",
    iconName: "twitter-logo",
    tooltip: "twitter"
  },
  {
    url: "https://t.me/pstakefinance",
    iconName: "telegram-plane",
    tooltip: "telegram"
  },
  {
    url: "https://blog.pstake.finance/",
    iconName: "medium-m",
    tooltip: "medium"
  },
  {
    url: "https://discord.com/invite/2ek5rUyT8x",
    iconName: "discord",
    tooltip: "discord"
  },
  {
    url: "https://pstake.finance/",
    iconName: "globe",
    tooltip: "Website"
  }
];

const HomeSidebar = () => {
  const [show, setShow] = useState(false);

  const closeHandler = () => {
    setShow(false);
  };

  const { isMobile } = useWindowSize();
  const sideBarRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(sideBarRef, closeHandler);

  const moreList = [
    {
      url: "https://docs.pstake.finance/",
      name: "Docs",
      icon: "docs"
    },
    {
      url: "https://forum.pstake.finance/",
      name: "Governance",
      icon: "governance"
    },
    {
      url: BUG_REPORT_URL,
      icon: "bug",
      name: "Bug Report"
    }
  ];

  return (
    <div
      className={`${
        isMobile ? `${styles.mobileDropdownContainer} offCanvas` : ""
      } ${show ? "show" : "close"} w-[284px]`}
    >
      <div
        className={`${isMobile ? styles.mobileSidebarBackdrop : ""} backDrop`}
      />
      <div
        className={`${isMobile ? styles.mobileSidebar : ""}`}
        ref={isMobile ? sideBarRef : null}
      >
        <aside className="w-[284px] md:w-[220px]">
          <div
            className={`${styles.sideBarContent} flex flex-col justify-between overflow-y-auto sticky`}
          >
            <div>
              <div className="text-center pt-8 pb-[1.9rem]">
                <Link href="/" className="nav-link" passHref>
                  <Image
                    src={`/images/logo.svg`}
                    alt={"logo"}
                    className="m-auto"
                    height={22}
                    width={isMobile ? 90 : 124}
                  />
                </Link>
              </div>
              <div className="pb-4">
                {moreList.map((item, index) => (
                  <li className={`list-none`} key={index}>
                    <a
                      className="group py-[0.625rem] px-8 flex items-center cursor-pointer"
                      href={item.url}
                      target={"_blank"}
                      rel="noopener noreferrer"
                    >
                      <span className={"mr-8 md:mr-4 "}>
                        <Icon
                          iconName={item.icon}
                          viewClass={`!w-[18px] !h-[18px] side-bar-icon group-hover:fill-[#fcfcfc]`}
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
            <div
              className={`socialLinks flex py-4 px-8 justify-between border-t border-solid border-[#2b2b2b]`}
            >
              {socialList.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  rel="noopener noreferrer"
                  className="mr-2.5"
                  target="_blank"
                >
                  <Icon
                    viewClass="socialIcon !w-[14px] !h-[14px]"
                    iconName={item.iconName}
                  />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomeSidebar;
