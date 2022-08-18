import React from 'react';
import { useTranslation } from 'react-i18next';
import asset1 from '../../assets/atom.svg';
import asset2 from '../../assets/stkETH.svg';
import asset3 from '../../assets/xprt.svg';
import asset4 from '../../assets/bnb.svg';
import migrate1 from '../../assets/migrate_logo_1.svg';
import migrate2 from '../../assets/migrate_logo_2.svg';
import right_arrow from '../../assets/right_arrow.svg';
import learn_more_arrow from '../../assets/learn_more_arrow.svg';
import '../SectionTwo/index.css';
import { CHAIN } from '../../constants/config';
import { useEffect, useState } from 'react';
import { getContractInstance } from '../../actions/utils';
import BigNumber from 'bignumber.js';

const SectionTwo = () => {
  const { t } = useTranslation();

  const [ethAPR, setEthAPR] = useState('0.00');
  const [bnbAPR, setBNBAPR] = useState('0.00');
  const [atomAPR, setAtomAPR] = useState('0.00');
  const [xprtAPR, setXprtAPR] = useState('0.00');

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
    setBNBAPR(CHAIN[process.env.REACT_APP_ENV].bnbAPR);
  };

  const handleAtomAPR = async () => {
    let stkATOM_SC = CHAIN[process.env.REACT_APP_ENV].SmartContracts.STokens;
    let instance = await getContractInstance(stkATOM_SC);
    if (instance) {
      const props = await instance.methods.getRewardRate().call();
      console.log('atom props: ', props);
      if (props) {
        const len = props['rewardRate'].length;
        const rewardRate = new BigNumber(props['rewardRate'][len - 1]);
        const valueDivisor = new BigNumber(props['valueDivisor']);
        const mulData = (
          3600 *
          24 *
          CHAIN[process.env.REACT_APP_ENV].inflationPeriod
        ).toString();
        const mulData1 = new BigNumber(mulData);

        let rewards = rewardRate.multipliedBy(mulData1).dividedBy(valueDivisor);
        console.log('atom rewards: ', rewards.toString());
        setAtomAPR(rewards.toFixed(2));
        // setLoading(false);
      }
    }
  };

  const handleXprtAPR = async () => {
    let stkXprt_SC =
      CHAIN[process.env.REACT_APP_ENV].SmartContracts.STokensXPRT;
    let instance = await getContractInstance(stkXprt_SC);
    if (instance) {
      const props = await instance.methods.getRewardRate().call();
      console.log('xprt props: ', props);
      if (props) {
        const len = props['rewardRate'].length;
        const rewardRate = new BigNumber(props['rewardRate'][len - 1]);
        const valueDivisor = new BigNumber(props['valueDivisor']);
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
  };

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
            <div className="heading">
              <h4>Supported Networks</h4>
              <h6>
                Stake your PoS assets while earning DeFi yields. Select a
                network below to get started
              </h6>
            </div>
            <div className="col-lg-12">
              <div className={'network-section cosmos-sub-section'}>
                <div className="networklist-tiles">
                  <h5 className={'text-center cosmos-title'}>
                    Cosmos Based Assets
                  </h5>
                  <div className={'combine-section'}>
                    <div className={'cosmos-section'}>
                      <div className={'icon-section'}>
                        <img src={asset1} alt={'Cosmos'} />
                      </div>
                      <div className={'sub-section'}>
                        <h5>
                          {t('COSMOS')}
                          <span>&nbsp;{t('ATOM')}</span>
                        </h5>
                        <h4>{atomAPR}%</h4>
                      </div>
                    </div>
                    <div className={'cosmos-section'}>
                      <div className={'icon-section'}>
                        <img src={asset3} alt={'ETH'} />
                      </div>
                      <div className={'sub-section'}>
                        <h5>
                          {t('Persistence')}
                          <span>&nbsp;{t('XPRT')}</span>
                        </h5>
                        <h4>{xprtAPR}%</h4>
                      </div>
                    </div>
                  </div>
                  <div className={'cosmos-button'}>
                    <a
                      href={CHAIN[process.env.REACT_APP_ENV].atomURL}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <h5>{t('START_STAKING')}</h5>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className={'network-section'}>
                <div className="networklist-tiles">
                  <div className={'combine-section'}>
                    <div className={'cosmos-section'}>
                      <div className={'icon-section'}>
                        <img src={asset2} alt={'ETH'} />
                      </div>
                      <div className={'sub-section'}>
                        <h5>
                          {t('Ethereum')}
                          <span>&nbsp;{t('ETH')}</span>
                        </h5>
                        <h4>{ethAPR}%</h4>
                      </div>
                    </div>
                  </div>

                  <a
                    href={CHAIN[process.env.REACT_APP_ENV].ethURL}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <h5>{t('START_STAKING')}</h5>
                  </a>
                </div>

                <div className="networklist-tiles">
                  <div className="combine-section">
                    <div className={'cosmos-section'}>
                      <div className={'icon-section'}>
                        <img src={asset4} alt={'Binance'} />
                      </div>
                      <div className={'sub-section'}>
                        <h5>
                          {t('Binance')}
                          <span>&nbsp;{t('BNB')}</span>
                        </h5>
                        <h4>{bnbAPR}%</h4>
                      </div>
                    </div>
                  </div>

                  {/*<h5 className={"coming-soon"}>{t("Coming Soon")}</h5>*/}
                  <a
                    href={CHAIN[process.env.REACT_APP_ENV].bnbURL}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <h5>{t('START_STAKING')}</h5>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className={'network-section'}>
                <div className="networklist-tiles-mod">
                  <div className={'combine-section'}>
                    <div className={'cosmos-section'}>
                      <div className="col-lg-3 d-flex justify-content-between align-items-center">
                        <img
                          // className="pr-2"
                          src={migrate1}
                          width={40}
                          height={40}
                          alt={'Migrate-1'}
                        />
                        <img src={right_arrow} alt={'Right Arrow'} />
                        <img
                          src={migrate2}
                          // className="pb-2"
                          // width={46}
                          // height={46}
                          alt={'Migrate-2'}
                        />
                      </div>
                      <div className="col-lg-6 migrate-box">
                        <p className="migrate-text">
                          Migrate your ERC20 stkATOM to Persistence stkATOM.
                        </p>
                        <div className="d-flex">
                          <p className="migrate-text-2">Learn More</p>
                          <img
                            src={learn_more_arrow}
                            width={23}
                            className="mb-3"
                            alt={'Right Arrow'}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 pb-3">
                        <a
                          href={CHAIN[process.env.REACT_APP_ENV].migrateURL}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <h5 className="px-5">{'Migrate'}</h5>
                        </a>
                      </div>
                    </div>
                  </div>
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
