import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Filters from "./filter";
import CardList from "./cardList";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { DefiDataList, defiDataList } from "./defiData";

export type SortOptions = "all" | "dexes" | "lending";

const arraySortDestruct = (defiList: DefiDataList) => {
  let arrayKeys = Object.keys(defiList);
  let sortedTotalData: any[] = [];
  let sortedDefiList: DefiDataList = defiList;
  arrayKeys.map((arrayIndex: string) => {
    const filterd = defiList[arrayIndex as keyof typeof defiList].sort(
      (a: any, b: any) => a.id - b.id
    );
    sortedTotalData.push(...filterd);
    sortedDefiList[arrayIndex as keyof typeof defiList] = filterd;
  });
  return [sortedTotalData, sortedDefiList];
};

const arrayFilterDestruct = (defiList: DefiDataList, searchTerm: string) => {
  let arrayKeys = Object.keys(defiList);
  let sortedTotalData: any[] = [];
  let sortedDefiList: DefiDataList = defiList;
  arrayKeys.map((arrayIndex: string) => {
    const filterd = defiList[arrayIndex as keyof typeof defiList].filter(
      (val) => {
        return (
          val.token0.toLowerCase().includes(searchTerm.toLowerCase()) ||
          val.platform.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    );
    sortedTotalData.push(...filterd);
    sortedDefiList[arrayIndex as keyof typeof defiList] = filterd;
  });
  return [sortedTotalData, sortedDefiList];
};

const DefiList = () => {
  const [sortActive, setSortActive] = useState<{
    [key in SortOptions]: boolean;
  }>({
    all: true,
    dexes: false,
    lending: false
  });

  const [defiData, setDefiData] = useState<any>([]);
  const [allData, setAllData] = useState<any>([]);

  const initData = useSelector((state: RootState) => state.initialData);

  useEffect(() => {
    let allNetworkDefiList: any = [];
    let defiListCopy: DefiDataList = {
      dexList: [],
      blList: []
    };
    const defiList = defiDataList(
      initData.osmosisInfo,
      initData.crescentInfo,
      initData.dexterInfo,
      initData.umeeInfo
    );
    const sortedDefiData: any[] = arraySortDestruct(defiList);
    defiListCopy.dexList.push(...sortedDefiData[1].dexList);
    defiListCopy.blList.push(...sortedDefiData[1].blList);
    allNetworkDefiList.push(...sortedDefiData[0]);
    setDefiData(defiListCopy);
    setAllData(allNetworkDefiList);
  }, [
    initData.osmosisInfo,
    initData.crescentInfo,
    initData.dexterInfo,
    initData.umeeInfo
  ]);

  const searchHandler = (evt: any) => {
    const searchTerm = evt.target.value;
    let allNetworkDefiList: any = [];
    let defiListCopy: DefiDataList = {
      dexList: [],
      blList: []
    };
    const defiList = defiDataList(
      initData.osmosisInfo,
      initData.crescentInfo,
      initData.dexterInfo,
      initData.umeeInfo
    );
    const filteredArray: any[] = arrayFilterDestruct(defiList, searchTerm);
    defiListCopy.dexList.push(...filteredArray[1].dexList);
    defiListCopy.blList.push(...filteredArray[1].blList);
    allNetworkDefiList.push(...filteredArray[0]);
    setDefiData(defiListCopy);
    setAllData(allNetworkDefiList);
  };
  return (
    <div className={`${styles.defiContainer} px-2 pb-10 m-auto md:px-3`}>
      <div className="mb-8">
        <h1 className="text-4xl font-semibold leading-normal text-light-high text-center md:text-lg">
          DeFi
        </h1>
        <h6 className="text-base text-light-high text-center leading-normal md:text-sm">
          Put your stkATOM to work in the Cosmos DeFi Ecosystem with additional
          <br />
          yield while still earning ATOM staking rewards
        </h6>
      </div>
      <Filters
        setSortActive={setSortActive}
        sortActive={sortActive}
        searchHandler={searchHandler}
      />
      <CardList sortActive={sortActive} allData={allData} defiData={defiData} />
    </div>
  );
};

export default DefiList;
