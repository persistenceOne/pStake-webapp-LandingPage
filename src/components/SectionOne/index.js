import React from "react";
import { useTranslation } from "react-i18next";
import "../SectionOne/index.css";
import { useEffect, useState } from "react";
import { CHAIN } from "../../constants/config";
import axios from "axios";
import { decimalize, getContractInstanceFrom } from "../../actions/utils";

const SectionOne = () => {
  const { t } = useTranslation();
  const [tvl, setTVL] = useState("0.00");
  const [count, setCount] = useState("0");

  const handleUserCount = async () => {

    let ethURL = CHAIN[process.env.REACT_APP_ENV].holderCountAPI.eth
    let atomURL = CHAIN[process.env.REACT_APP_ENV].holderCountAPI.atom
    let xprtURL = CHAIN[process.env.REACT_APP_ENV].holderCountAPI.xprt

    console.log("ethURL: ", ethURL);
    console.log("atomURL: ", atomURL);
    console.log("xprtURL: ", xprtURL);

    const getEthUser = await axios.get(ethURL);
    const getAtomUser = await axios.get(atomURL);
    const getXprtUser = await axios.get(xprtURL);

    console.log("getEthUser: ", getEthUser);
    console.log("getAtomUser: ", getAtomUser);
    console.log("getXprtUser: ", getXprtUser);

    if(getEthUser && getAtomUser && getXprtUser){
      let userCount = getEthUser.data.holdersCount +  getAtomUser.data.holdersCount + getXprtUser.data.holdersCount;
      setCount(userCount)
    }
  }

  const handleTVL = async () => {
    let api = CHAIN[process.env.REACT_APP_ENV].DEFILAMA_API;
    let stkETH_SC = CHAIN[process.env.REACT_APP_ENV].SmartContracts.StkETH;
    let stkETH_SC_Address = CHAIN[process.env.REACT_APP_ENV].CONTRACT_ADDRESSES.StkEth;

    let instance = await getContractInstanceFrom(stkETH_SC, stkETH_SC_Address);
    let data = await axios.get(api);
    console.log("data: ", data)

    if(data && instance){
      let tvl = data.data.currentChainTvls.Ethereum + data.data.currentChainTvls.pool2
      let decimalisedValue = Number(tvl).toFixed(2);

      const stkETHBalanceKeyLocal = await instance.methods.totalSupply().call();

      let decimalisedValueETH = decimalize(stkETHBalanceKeyLocal, 18, 2);

      const getExchangeRate = await instance.methods.pricePerShare().call();

      let exchangeRate = decimalize(getExchangeRate, 18)

      const getEthPrice = await axios.get(CHAIN[process.env.REACT_APP_ENV].getETHPrice);
      let ethPrice = getEthPrice.data.USD

      let _tvl = parseFloat(decimalisedValueETH) * parseFloat(exchangeRate) * parseFloat(ethPrice)

      let rewards = _tvl - (parseFloat(decimalisedValueETH) * parseFloat(ethPrice));

      let _rewards = rewards.toFixed(2);

      let _val = parseFloat(_rewards) + parseFloat(decimalisedValue)

      let str = _val.toString().split(".");
      str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      let value = str[0] + "." + str[1];
      setTVL(value);
    }
  }

  useEffect(() => {
    handleUserCount();
    handleTVL();
  }, []);

  return (
    <React.Fragment>
      <section className="section-2 bg-product product-padding" id="sectiontwo">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 stats">
              {/*<div className="stats-section">
                <h2>$28.12M+</h2>
                <h6>{t("LIQUIDITYSTKASSETS")}</h6>
                <span className="vline"></span>
              </div>*/}
              <div className="stats-section">
                <h2>5019</h2>
                <h6>{t("NUMBEROFSTAKERS")}</h6>
                <span className="vline"></span>
              </div>
              <div className="stats-section">
                <h2>${tvl}</h2>
                <h6>{t("VALUEOFSTKASSETS")}</h6>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default SectionOne;
