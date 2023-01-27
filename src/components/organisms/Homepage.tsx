import React, { useEffect, useState } from "react";
import { CHAIN, ATOM_WEB_URL } from "../../helpers/config";
import { getContractInstance } from "../../helpers/utils";
import useTranslation from "next-translate/useTranslation";
import BigNumber from "bignumber.js";

const env: string = process.env.NEXT_PUBLIC_ENV!;

const HomepageContainer = () => {
  const [ethAPR, setEthAPR] = useState("0.00");
  const [bnbAPR, setBNBAPR] = useState("0.00");
  const [atomAPR, setAtomAPR] = useState("0.00");
  const [xprtAPR, setXprtAPR] = useState("0.00");

  const handleEthAPR = async () => {
    setEthAPR(CHAIN[env].ethAPR);
    setBNBAPR(CHAIN[env].bnbAPR);
  };

  const handleAtomAPR = async () => {
    let stkATOM_SC = CHAIN[env].SmartContracts.STokens;
    let instance = await getContractInstance(stkATOM_SC);
    if (instance) {
      const props = await instance.methods.getRewardRate().call();
      console.log("atom props: ", props);
      if (props) {
        const len = props["rewardRate"].length;
        const rewardRate = new BigNumber(props["rewardRate"][len - 1]);
        const valueDivisor = new BigNumber(props["valueDivisor"]);
        const mulData = (3600 * 24 * CHAIN[env].inflationPeriod).toString();
        const mulData1 = new BigNumber(mulData);

        let rewards = rewardRate.multipliedBy(mulData1).dividedBy(valueDivisor);
        console.log("atom rewards: ", rewards.toString());
        setAtomAPR(rewards.toFixed(2));
        // setLoading(false);
      }
    }
  };

  const handleXprtAPR = async () => {
    let stkXprt_SC = CHAIN[env].SmartContracts.STokensXPRT;
    let instance = await getContractInstance(stkXprt_SC);
    if (instance) {
      const props = await instance.methods.getRewardRate().call();
      console.log("xprt props: ", props);
      if (props) {
        const len = props["rewardRate"].length;
        const rewardRate = new BigNumber(props["rewardRate"][len - 1]);
        const valueDivisor = new BigNumber(props["valueDivisor"]);
        const mulData = (3600 * 24 * CHAIN[env].inflationPeriod).toString();
        const mulData1 = new BigNumber(mulData);

        let rewards = rewardRate.multipliedBy(mulData1).dividedBy(valueDivisor);
        setXprtAPR(rewards.toFixed(2));
        // setLoading(false);
      }
    }
  };

  useEffect(() => {
    handleEthAPR();
    handleAtomAPR();
    handleXprtAPR();
  }, []);
  const { t } = useTranslation("common");
  return (
    <>
      <div className="container-fluid p-0 text-center pt-5">
        <img src={"/images/pstakelogo.svg"} alt="logo" />
      </div>
      <div className="container">
        <div className="row">
          <section className="section-2 stake-section" id="sectiontwo">
            <div className="container">
              <div className="row">
                <div className="heading mt-4 mb-4">
                  <h4>Supported Networks</h4>
                  <h6>
                    Earn staking rewards on your Assets for securing PoS
                    networks and participate in DeFi with stkAssets for
                    additional yields. <br /> Select a network below to get
                    started now.
                  </h6>
                </div>
                <div className="row">
                  <div className="network-list">
                    <div className="network-section">
                      <div className="network-body">
                        <div className={"icon-section"}>
                          <img src={"/images/atom.svg"} alt={"Cosmos"} />
                        </div>
                        <div className={"sub-section"}>
                          <h5>{t("COSMOS")} </h5>
                          <h4 className="value">
                            ~{17.82}% {t("APY")}
                          </h4>
                        </div>
                      </div>
                      <a
                        href={CHAIN[env].atomCosmosURL}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <h5>{t("START_STAKING")}</h5>
                      </a>
                    </div>
                    <div className="network-section">
                      <div className="network-body">
                        <div className="icon-section">
                          <img src={"/images/bnb.svg"} alt={"Binance"} />
                        </div>
                        <div className={"sub-section"}>
                          <h5>{t("BNB")}</h5>
                          <h4 className="value">
                            {bnbAPR}% {t("APY")}
                          </h4>
                        </div>
                      </div>
                      <a
                        href={CHAIN[env].bnbURL}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <h5>{t("START_STAKING")}</h5>
                      </a>
                      {/*<h5 className={"coming-soon"}>{t("Coming Soon")}</h5>*/}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="network-list">
                    <div className="network-section">
                      <div className="network-body">
                        <div className={"icon-section"}>
                          <img src={"/images/stkETH.svg"} alt={"ETH"} />
                        </div>
                        <div className={"sub-section"}>
                          <h5>
                            {t("Ethereum")}
                            <span> (ERC20)</span>
                          </h5>
                          <h4 className="value">
                            {ethAPR}% {t("APY")}
                          </h4>
                        </div>
                      </div>
                      <a
                        href={CHAIN[env].ethURL}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <h5>{t("START_STAKING")}</h5>
                      </a>
                    </div>
                    <div className="network-section">
                      <div className="network-body">
                        <div className={"icon-section"}>
                          <img src={"/images/xprt.svg"} alt={"ETH"} />
                        </div>
                        <div className={"sub-section"}>
                          <h5 className="mb-0">
                            {t("Persistence")} <span>(ERC20)</span>
                          </h5>
                          <span>(Deprecated)</span>
                          <h4 className="value mt-2">
                            {xprtAPR}% {t("APY")}
                          </h4>
                        </div>
                      </div>
                      <a
                        href={CHAIN[env].atomURL}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <h5>Withdraw Assets</h5>
                      </a>
                      <a
                        href={CHAIN[env].atomURL}
                        rel="noopener noreferrer"
                        className="pointer-events-none"
                        target="_blank"
                      >
                        <h5>Migrate to Persistence (coming soon)</h5>
                      </a>
                    </div>
                    <div className="network-section">
                      <div className="network-body">
                        <div className={"icon-section"}>
                          <img src={"/images/atom.svg"} alt={"Cosmos"} />
                        </div>
                        <div className={"sub-section"}>
                          <h5 className="mb-0">
                            {t("COSMOS")} <span>(ERC20)</span>
                          </h5>
                          <span>(Deprecated)</span>
                          <h4 className="value mt-2">
                            {atomAPR}% {t("APY")}
                          </h4>
                        </div>
                      </div>
                      <a
                        href={CHAIN[env].atomURL}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <h5>Withdraw Assets</h5>
                      </a>
                      <a
                        href={CHAIN[env].atomURL}
                        rel="noopener noreferrer"
                        className="pointer-events-none"
                        target="_blank"
                      >
                        <h5>Migrate to Persistence (coming soon)</h5>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default HomepageContainer;
