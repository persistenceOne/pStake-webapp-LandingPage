import React, { useState } from "react";
import styles from "./styles.module.css";
import Stake from "../stake";
import UnStake from "../unstake";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/reducers";
import { Icon, Spinner } from "ui";
import Tooltip from "rc-tooltip";
import { decimalize } from "../../../../helpers/utils";
import { formatNumber } from "utils";
import { APR_DEFAULT } from "../../../../../AppConstants";
import { TabItem } from "ui/components/molecules/tabs/tabItem";
import { TabContent } from "ui/components/molecules/tabs/tabContent";

const StakingTabs = () => {
  const [activeTab, setActiveTab] = useState("Stake");
  const { apy, exchangeRate } = useSelector(
    (state: RootState) => state.initialData
  );
  const { tvu } = useSelector((state: RootState) => state.liveData);
  const inverseExchangeRate: number = 1 / exchangeRate;
  const tabItemClasses =
    "cursor-pointer w-full bg-tabHeader " +
    "font-semibold text-lg leading-normal text-center" +
    " text-light-mid flex-1 px-4 py-2 md:px-2 md:py-1.5 md:text-base";

  return (
    <div
      className={`${styles.tabsContainer} max-w-[616px] md:max-w-[500px] m-auto px-10 pb-10 md:px-3`}
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
          <UnStake />
        </TabContent>
      </div>
      <div className="p-4 bg-[#18181899] flex items-center mt-4 rounded-md">
        <div className="flex-1 border-r-[1px] border-solid border-[#2a2a2a]">
          <div className="text-center">
            <span className="text-light-mid font-normal leading-normal text-sm text-center">
              APY
            </span>
            <Tooltip
              placement="bottom"
              overlay={<span>Rewards are auto-compounded daily</span>}
            >
              <button className="icon-button px-1 align-middle mb-1">
                <Icon viewClass="arrow-right" iconName="info" />
              </button>
            </Tooltip>
          </div>
          {apy !== 0 ? (
            <p className="text-light-emphasis font-semibold leading-normal text-2xl text-center md:text-base">
              {apy === -1 ? APR_DEFAULT : apy}%
            </p>
          ) : (
            <div className="text-center mt-1">
              <Spinner size="small" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <p className="text-light-mid font-normal leading-normal text-sm text-center">
            Total Value Unlocked(TVU)
          </p>
          <p className="text-light-emphasis font-semibold leading-normal text-2xl text-center md:text-base">
            {formatNumber(Number(decimalize(tvu)), 3, 2)} ATOM
          </p>
        </div>
      </div>
    </div>
  );
};

export default StakingTabs;
