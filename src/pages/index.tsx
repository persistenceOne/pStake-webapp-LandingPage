import type { NextPage } from "next";
import { PageTemplate } from "../components/templates/template";
import HomepageContainer from "../components/organisms/Homepage";

const Home: NextPage = () => {
  return (
    <PageTemplate className="home" title="pSTAKE">
        <HomepageContainer/>
    </PageTemplate>
  );
};

export default Home;
