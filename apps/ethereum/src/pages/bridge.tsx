import type { NextPage } from "next";
import { Template } from "../components/templates";
import BridgeContainer from "../components/organisms/bridge";

const Bridge: NextPage = () => {
  return (
    <Template className={""} title={"stake"}>
      <BridgeContainer />
    </Template>
  );
};

export default Bridge;
