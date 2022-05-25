import React from "react";
import { useTranslation } from "react-i18next";
import asset1 from "../../assets/atom.svg";
import asset2 from "../../assets/stkETH.svg";
import asset3 from "../../assets/xprt.svg";
import asset4 from "../../assets/sol.svg";
import "../SectionTwo/index.css";
import {CHAIN} from "../../constants/config";
import {useEffect, useState} from "react";
import {getWeb3} from "../../actions/utils";

const SectionTwo = () => {
  const { t } = useTranslation();

  const [ethAPR, setEthAPR] = useState("0.00");
  const [atomAPR, setAtomAPR] = useState("0.00");
  const [xprtAPR, setXprtAPR] = useState("0.00");

  const handleEthAPR = async () => {
    let web3Local = await getWeb3();
    console.log("web3: ", web3Local)
  };

  useEffect(() => {
    handleEthAPR();
  }, []);

  return (
    <React.Fragment>
      <section className="section-2 stake-section" id="sectiontwo">
        <div className="container">
          <div className="row">
            <div className="heading">
              <h4>Supported Networks</h4>
              <h6>
                Stake your PoS assets while earning DeFi yields. Select a
                network below to get started
              </h6>
            </div>
            <div className="col-lg-12">
              <div className={"network-section"}>
                <div className="networklist-tiles">
                  <img src={asset2} alt={"ETH"} />
                  <h5>{t("Ethereum")}</h5>
                  <h6>{t("ETH")}</h6>
                  <h4>{t("ETH_APR")}</h4>
                  <a
                    href={CHAIN[process.env.REACT_APP_ENV].ethURL}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <h5>{t("START_STAKING")}</h5>
                  </a>
                </div>

                <div className="networklist-tiles">
                  <img src={asset1} alt={"cosmos"} />
                  <h5>{t("COSMOS")}</h5>
                  <h6>{t("ATOM")}</h6>
                  <h4>{t("ATOM_APR")}</h4>
                  <a
                    href={CHAIN[process.env.REACT_APP_ENV].atomURL}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <h5>{t("START_STAKING")}</h5>
                  </a>
                </div>
                <div className="networklist-tiles">
                  <img src={asset3} alt={"persistence"} />
                  <h5>{t("Persistence")}</h5>
                  <h6>{t("XPRT")}</h6>
                  <h4>{t("XPRT_APR")}</h4>
                  <a
                    href={CHAIN[process.env.REACT_APP_ENV].xprtURL}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <h5>{t("START_STAKING")}</h5>
                  </a>
                </div>
                <div className="networklist-tiles">
                  <img src={asset4} alt={"solana"} />
                  <h5>{t("Solana")}</h5>
                  <h6>{t("SOL")}</h6>
                  <h4>&nbsp;</h4>

                  <h5 className={"coming-soon"}>{t("Coming Soon")}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default SectionTwo;
