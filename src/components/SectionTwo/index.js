import React from "react";
import { useTranslation } from "react-i18next";
import asset1 from "../../assets/atom.svg";
import asset2 from "../../assets/stkETH.svg";
import asset3 from "../../assets/xprt.svg";
import asset4 from "../../assets/bnb.svg";
import avax from "../../assets/avax.svg";
import sol from "../../assets/sol.svg";
import "../SectionTwo/index.css";
import {ATOM_WEB_URL, CHAIN} from "../../constants/config";
import {useEffect, useState} from "react";
import { decimalize, getContractInstance, getContractInstanceFrom, getWeb3 } from "../../actions/utils";
import Web3 from "web3";
import BigNumber from "bignumber.js";

const SectionTwo = () => {
  const { t } = useTranslation();

  const [ethAPR, setEthAPR] = useState("0.00");
  const [bnbAPR, setBNBAPR] = useState("0.00");
  const [atomAPR, setAtomAPR] = useState("0.00");
  const [xprtAPR, setXprtAPR] = useState("0.00");

  const handleEthAPR = async () => {

    /*let web3Local;

    if(process.env.REACT_APP_ENV === "Testnet"){
      web3Local = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/c1a795f858814218840034fe273cb040"));
    }else if(process.env.REACT_APP_ENV === "Staging" || process.env.REACT_APP_ENV === "Mainnet"){
      web3Local = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA));
    }
    console.log("web3: ", web3Local);

    let stkETH_SC = CHAIN[process.env.REACT_APP_ENV].SmartContracts.StkETH;
    let stkETH_SC_Address = CHAIN[process.env.REACT_APP_ENV].CONTRACT_ADDRESSES.StkEth;

    let instance = await getContractInstanceFrom(stkETH_SC, stkETH_SC_Address);
    let txHash = CHAIN[process.env.REACT_APP_ENV].stkETHDeployTxHash;

    let getBlockNumber = await web3Local.eth.getTransactionReceipt(txHash);
    console.log("getBlockNumber: ", getBlockNumber)

    let getTimestamp = await web3Local.eth.getBlock(getBlockNumber.blockNumber);
    console.log("getTimestamp: ", getTimestamp.timestamp)

    let getCurrentTs = Date.now() / 1000 | 0
    console.log("getCurrentTs: ", getCurrentTs)

    let getTsDiff = getCurrentTs - getTimestamp.timestamp
    console.log("getTsDiff: ", getTsDiff)

    let days = getTsDiff / (60*60*24)
    let daysDiff = days.toFixed(2)

    let time = daysDiff/365;

    const getExchangeRate = await instance.methods.pricePerShare().call();
    let exchangeRate = decimalize(getExchangeRate, 18)

    let apr = ((exchangeRate-1)/time) *100;

    console.log("apr: ", apr.toFixed(2));*/
    //setEthAPR(apr.toFixed(2));
    setEthAPR(CHAIN[process.env.REACT_APP_ENV].ethAPR);
    setBNBAPR(CHAIN[process.env.REACT_APP_ENV].bnbAPR)
  };

  const handleAtomAPR = async () => {
    let stkATOM_SC = CHAIN[process.env.REACT_APP_ENV].SmartContracts.STokens;
    let instance = await getContractInstance(stkATOM_SC);
    if (instance) {
      const props = await instance.methods.getRewardRate().call();
      console.log("atom props: ", props)
      if (props) {
        const len = props["rewardRate"].length;
        const rewardRate = new BigNumber(props["rewardRate"][len - 1]);
        const valueDivisor = new BigNumber(props["valueDivisor"]);
        const mulData = (
          3600 *
          24 *
          CHAIN[process.env.REACT_APP_ENV].inflationPeriod
        ).toString();
        const mulData1 = new BigNumber(mulData);

        let rewards = rewardRate.multipliedBy(mulData1).dividedBy(valueDivisor);
        console.log("atom rewards: ", rewards.toString())
        setAtomAPR(rewards.toFixed(2));
        // setLoading(false);
      }
    }
  }

  const handleXprtAPR = async () => {
    let stkXprt_SC = CHAIN[process.env.REACT_APP_ENV].SmartContracts.STokensXPRT;
    let instance = await getContractInstance(stkXprt_SC);
    if (instance) {
      const props = await instance.methods.getRewardRate().call();
      console.log("xprt props: ", props)
      if (props) {
        const len = props["rewardRate"].length;
        const rewardRate = new BigNumber(props["rewardRate"][len - 1]);
        const valueDivisor = new BigNumber(props["valueDivisor"]);
        const mulData = (
          3600 *
          24 *
          CHAIN[process.env.REACT_APP_ENV].inflationPeriod
        ).toString();
        const mulData1 = new BigNumber(mulData);

        let rewards = rewardRate.multipliedBy(mulData1).dividedBy(valueDivisor);
        setXprtAPR(rewards.toFixed(2));
        // setLoading(false);
      }
    }
  }

  useEffect(() => {
    handleEthAPR();
    handleAtomAPR();
    handleXprtAPR();
  }, []);

  return (
    <React.Fragment>
      <section className="section-2 stake-section" id="sectiontwo">
        <div className="container">
          <div className="row">
            <div className="heading mt-4 mb-4">
              <h4>Supported Networks</h4>
              <h6>
                Earn staking rewards on your Assets for securing PoS networks and participate in DeFi with stkAssets for additional yields. <br/> Select a network below to get started now.
              </h6>
            </div>
            <div className="row">
              <div className="network-list">
                <div className='network-section'>
                  <div className="network-body">
                    <div className={"icon-section"}>
                      <img src={asset1} alt={"Cosmos"} />
                    </div>
                    <div className={'sub-section'}>
                      <h5>{t("COSMOS")} </h5>
                      <h4 className="value">~{17.82}% {t("APY")}</h4>
                    </div>
                  </div>
                  <a
                      href={CHAIN[process.env.REACT_APP_ENV].atomCosmosURL}
                      rel="noopener noreferrer"
                      target="_blank"
                  >
                    <h5>{t("START_STAKING")}</h5>
                  </a>
                </div>
                <div className='network-section'>
                  <div className="network-body">
                    <div className="icon-section">
                      <img src={asset4} alt={"Binance"} />
                    </div>
                    <div className={'sub-section'}>
                      <h5>{t("BNB")}</h5>
                      <h4 className="value">{bnbAPR}% {t("APY")}</h4>
                    </div>
                  </div>
                  <a href={CHAIN[process.env.REACT_APP_ENV].bnbURL}
                      rel="noopener noreferrer"
                      target="_blank">
                    <h5>{t("START_STAKING")}</h5>
                  </a>
                  {/*<h5 className={"coming-soon"}>{t("Coming Soon")}</h5>*/}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="network-list">
                <div className='network-section'>
                  <div className="network-body">
                    <div className={"icon-section"}>
                      <img src={asset2} alt={"ETH"} />
                    </div>
                    <div className={'sub-section'}>
                      <h5>{t("Ethereum")}<span> (ERC20)</span></h5>
                      <h4 className="value">{ethAPR}% {t("APY")}</h4>
                    </div>
                  </div>
                  <a
                      href={CHAIN[process.env.REACT_APP_ENV].ethURL}
                      rel="noopener noreferrer"
                      target="_blank"
                  >
                    <h5>{t("START_STAKING")}</h5>
                  </a>
                </div>
                <div className='network-section'>
                  <div className="network-body">
                    <div className={"icon-section"}>
                      <img src={asset3} alt={"ETH"} />
                    </div>
                    <div className={'sub-section'}>
                      <h5 className="mb-0">{t("Persistence")} <span>(ERC20)</span></h5>
                      <span>(Deprecated)</span>
                      <h4 className="value mt-2">{xprtAPR}% {t("APY")}</h4>
                    </div>
                  </div>
                  <a
                      href={CHAIN[process.env.REACT_APP_ENV].atomURL}
                      rel="noopener noreferrer"
                      target="_blank"
                  >
                    <h5>Withdraw Assets</h5>
                  </a>
                  <a
                      href={CHAIN[process.env.REACT_APP_ENV].atomURL}
                      rel="noopener noreferrer"
                      className="pointer-events-none"
                      target="_blank"
                  >
                    <h5>Migrate to Persistence (coming soon)</h5>
                  </a>
                </div>
                <div className='network-section'>
                  <div className="network-body">
                    <div className={"icon-section"}>
                      <img src={asset1} alt={"Cosmos"} />
                    </div>
                    <div className={'sub-section'}>
                      <h5 className="mb-0">{t("COSMOS")} <span>(ERC20)</span></h5>
                      <span>(Deprecated)</span>
                      <h4  className="value mt-2">{atomAPR}% {t("APY")}</h4>
                    </div>
                  </div>
                  <a
                      href={CHAIN[process.env.REACT_APP_ENV].atomURL}
                      rel="noopener noreferrer"
                      target="_blank"
                  >
                    <h5>Withdraw Assets</h5>
                  </a>
                  <a
                      href={CHAIN[process.env.REACT_APP_ENV].atomURL}
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
    </React.Fragment>
  );
};
export default SectionTwo;
