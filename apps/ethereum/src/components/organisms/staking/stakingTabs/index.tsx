import React, { useState } from "react";
import styles from "./styles.module.css";
import Stake from "../stake";
import { useAppStore } from "../../../../store/store";
import { shallow } from "zustand/shallow";
import { Button } from "ui";
import { useRouter } from "next/router";
import { TabItem } from "ui/components/molecules/tabs/tabItem";
import { TabContent } from "ui/components/molecules/tabs/tabContent";

const StakingTabs = () => {
  const [apr, tvl, network] = useAppStore(
    (state) => [state.apr, state.tvl, state.network.name],
    shallow
  );
  const router = useRouter();
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
          <div className="h-[300px] flex items-center justify-center flex-col">
            <p className="text-center text-light-mid mb-4">
              pSTAKE will enable withdrawals soon. Till then you can exchange
              your stkETH for ETH through our DeFI integrations
            </p>
            <Button
              className="button w-[250px] mx-auto md:py-2 md:text-sm"
              type="primary"
              size="large"
              disabled={false}
              onClick={() => {
                router.push("/defi");
              }}
              content="Go to DeFi page"
            />
          </div>
        </TabContent>
      </div>
      <div className="p-4 bg-[#18181899] flex items-center mt-4 rounded-md">
        <div className="flex-1 border-r-[1px] border-solid border-[#2a2a2a]">
          <p className="text-light-mid font-normal leading-normal text-sm text-center">
            APR
          </p>
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
