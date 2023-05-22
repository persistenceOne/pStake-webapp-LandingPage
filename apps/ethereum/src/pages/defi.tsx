import type { NextPage } from "next";
import { Template } from "../components/templates";
import DefiList from "../components/organisms/defi";

const Defi: NextPage = () => {
  return (
    <Template className={""} title={"stake"}>
      <>
        <DefiList />
      </>
    </Template>
  );
};

export default Defi;
