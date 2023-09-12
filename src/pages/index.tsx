import type { NextPage } from "next";
import { PageTemplate } from "../components/templates/template";
import NetworkSection from "../components/organisms/networks";
import Footer from "../components/organisms/Footer";

const Home: NextPage = () => {
  return (
    <PageTemplate className="home" title="pSTAKE">
      <NetworkSection />
        <Footer/>
    </PageTemplate>
  );
};

export default Home;
