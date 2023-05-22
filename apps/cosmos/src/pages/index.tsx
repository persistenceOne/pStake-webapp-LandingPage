import type { NextPage } from "next";
import { PageTemplate } from "../components/templates/template";
import StakingTabs from "../components/organisms/staking/stakingTabs";

const Home: NextPage = () => {
  return (
    <PageTemplate className="stake" title="Stake">
      <StakingTabs />
    </PageTemplate>
  );
};

export default Home;
