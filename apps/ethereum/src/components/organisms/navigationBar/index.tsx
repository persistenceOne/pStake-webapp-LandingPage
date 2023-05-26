import React, { useEffect } from "react";

import { Icon } from "../../atoms/icon";
import Link from "next/link";
import { useWindowSize } from "hooks";
import { useAppStore } from "../../../store/store";
import LoginOptions from "./loginOptions";
import Networks from "./networks";
import AddToken from "./addToken";

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;
const NavigationBar = () => {
  const handleSidebar = useAppStore((state) => state.handleSidebar);
  const { isMobile } = useWindowSize();
  const walletInfo = useAppStore((state) => state.wallet);

  const handleMenu = () => {
    handleSidebar(true);
  };

  return (
    <div className="flex mb-10 py-6 pl-7 pr-14 md:px-3">
      <div className="flex items-center flex-1">
        <div className="hidden md:block">
          <Link href="/" className="nav-link" passHref>
            <img
              src={"/images/logo.svg"}
              alt={"logo"}
              width={isMobile ? 90 : 124}
            />
          </Link>
        </div>
        <div className="flex ml-auto">
          {walletInfo.walletConnection ? (
            <>
              <AddToken />
              <Networks />
            </>
          ) : null}
          <LoginOptions />
          <button className="md:block hidden pl-2" onClick={handleMenu}>
            <Icon iconName="menu" viewClass="menu" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
