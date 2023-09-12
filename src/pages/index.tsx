import type { NextPage } from "next";
import { PageTemplate } from "../components/templates/template";
import NetworkSection from "../components/organisms/networks";

const Home: NextPage = () => {
  return (
    <PageTemplate className="home" title="pSTAKE">
      <NetworkSection />
    </PageTemplate>
  );
};

export default Home;
