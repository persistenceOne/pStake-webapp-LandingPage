import React, { useState } from "react";
import styles from "./styles.module.css";
import { Icon } from "ui";
import Tooltip from "rc-tooltip";
import Stake from "../stake";
import { useAppStore } from "../../../../store/store";
import { shallow } from "zustand/shallow";
import { TabItem } from "ui/components/molecules/tabs/tabItem";
import { TabContent } from "ui/components/molecules/tabs/tabContent";

const StakingTabs = () => {
  const [apr, tvl] = useAppStore((state) => [state.apr, state.tvl], shallow);
  const [activeTab, setActiveTab] = useState("Stake");
  const tabItemClasses =
    "cursor-pointer w-full bg-tabHeader " +
    "font-semibold text-lg leading-normal text-center" +
    " text-light-mid flex-1 px-4 py-2 md:px-2 md:py-1.5 md:text-base";

  return (
    <div
      className={`${styles.tabsContainer} max-w-[616px] md:max-w-[500px] m-auto px-10 pb-10 lg:px-3`}
    >
      <ul className="tabsHeaderList flex flex-wrap mb-4">
        <TabItem
          id="Stake"
          title={"Stake"}
          activeTab={activeTab}
          className={tabItemClasses}
          setActiveTab={setActiveTab}
        />
        <TabItem
          id="Unstake"
          title={"Unstake"}
          activeTab={activeTab}
          className={tabItemClasses}
          setActiveTab={setActiveTab}
        />
      </ul>
      <div>
        <TabContent
          id="Stake"
          activeTab={activeTab}
          className="p-6 md:p-4 bg-tabContent rounded-md"
        >
          <Stake />
        </TabContent>
        <TabContent
          id="Unstake"
          activeTab={activeTab}
          className="p-6 md:p-4 bg-tabContent rounded-md"
        >
          <p className="text-light-emphasis text-center">Coming soon</p>
        </TabContent>
      </div>
      <div className="p-4 bg-[#18181899] flex items-center mt-4 rounded-md">
        <div className="flex-1 border-r-[1px] border-solid border-[#2a2a2a]">
          <div className="text-center">
            <span className="text-light-mid font-normal leading-normal text-sm text-center">
              APR
            </span>
            <Tooltip placement="bottom" overlay={<span>Apr</span>}>
              <button className="icon-button px-1 align-middle mb-1">
                <Icon viewClass="info" iconName="info" />
              </button>
            </Tooltip>
          </div>
          <p className="text-light-emphasis font-semibold leading-normal text-2xl text-center md:text-base">
            {apr}%
          </p>
        </div>
        <div className="flex-1">
          <p className="text-light-mid font-normal leading-normal text-sm text-center">
            Total Value Unlocked(TVU)
          </p>
          <p className="text-light-emphasis font-semibold leading-normal text-2xl text-center md:text-base">
            {tvl} ETH
          </p>
        </div>
      </div>
    </div>
  );
};

export default StakingTabs;
