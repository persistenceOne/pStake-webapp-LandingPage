import type { NextPage } from "next";
import { Template } from "../components/templates";
import StakingTabs from "../components/organisms/staking/stakingTabs";

const Home: NextPage = () => {
  return (
    <Template className={""} title={"stake"}>
      <StakingTabs />
    </Template>
  );
};

export default Home;
