import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { DefiInfo, EthereumData, ethereumData, optimismData } from "./defiData";
import { useAppStore } from "../../../store/store";
import CardList from "./cardList";
import Filters from "./filter";
import { Networks } from "../../../helpers/config";

export type SortOptions = "all" | "dexes" | "lending";

const arraySortDestruct = (defiList: any) => {
  let arrayKeys = Object.keys(defiList);
  let sortedTotalData: any[] = [];
  let sortedDefiList: EthereumData = defiList;
  arrayKeys.map((arrayIndex: string) => {
    const filterd = defiList[arrayIndex as keyof typeof defiList].sort(
      (a: any, b: any) => a.id - b.id
    );
    sortedTotalData.push(...filterd);
    sortedDefiList[arrayIndex as keyof typeof defiList] = filterd;
  });
  return [sortedTotalData, sortedDefiList];
};

const arrayFilterDestruct = (defiList: any, searchTerm: string) => {
  let arrayKeys = Object.keys(defiList);
  let sortedTotalData: any[] = [];
  let sortedDefiList: EthereumData = defiList;
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
    lending: false,
  });

  const [sortByNetwork, setSortByNetwork] = useState<{
    [key in Networks]: boolean;
  }>({
    ethereum: true,
    optimism: false,
  });

  const [networkDefiList, setNetworkDefiList] = useState<EthereumData | null>();
  const [allDefiList, setAllDefiList] = useState<any>([]);

  const defiListData = useAppStore((state) => state.defiList);

  useEffect(() => {
    let allNetworkDefiList: any = [];
    let defiList: EthereumData = {
      dexList: [],
      blList: [],
    };
    for (const key in sortByNetwork) {
      if (key === "ethereum" && sortByNetwork[key]) {
        const ethDefiList = ethereumData(
          defiListData.uniSwap,
          defiListData.uniSwap
        );
        const filteredArray: any[] = arraySortDestruct(ethDefiList);
        defiList.dexList.push(...filteredArray[1].dexList);
        defiList.blList.push(...filteredArray[1].blList);
        allNetworkDefiList.push(...filteredArray[0]);
      } else if (key === "optimism" && sortByNetwork[key]) {
        const optDefiList = optimismData(
          defiListData.uniSwap,
          defiListData.uniSwap
        );
        const filteredArray: any[] = arraySortDestruct(optDefiList);
        defiList.dexList.push(...filteredArray[1].dexList);
        defiList.blList.push(...filteredArray[1].blList);
        allNetworkDefiList.push(...filteredArray[0]);
      }
    }
    setNetworkDefiList(defiList);
    setAllDefiList(allNetworkDefiList);
  }, [defiListData, sortByNetwork]);

  const searchHandler = (evt: any) => {
    const searchTerm = evt.target.value;
    let allNetworkDefiList: any = [];
    let defiList: EthereumData = {
      dexList: [],
      blList: [],
    };
    for (const key in sortByNetwork) {
      if (key === "ethereum" && sortByNetwork[key]) {
        const ethDefiList = ethereumData(
          defiListData.uniSwap,
          defiListData.uniSwap
        );
        const filteredArray: any[] = arrayFilterDestruct(
          ethDefiList,
          searchTerm
        );
        defiList.dexList.push(...filteredArray[1].dexList);
        defiList.blList.push(...filteredArray[1].blList);
        allNetworkDefiList.push(...filteredArray[0]);
      } else if (key === "optimism" && sortByNetwork[key]) {
        const optDefiList = optimismData(
          defiListData.uniSwap,
          defiListData.uniSwap
        );
        const filteredArray: any[] = arrayFilterDestruct(
          optDefiList,
          searchTerm
        );
        defiList.dexList.push(...filteredArray[1].dexList);
        defiList.blList.push(...filteredArray[1].blList);
        allNetworkDefiList.push(...filteredArray[0]);
      }
    }
    setNetworkDefiList(defiList);
    setAllDefiList(allNetworkDefiList);
  };

  return (
    <div className={`${styles.defiContainer} px-2 pb-10 m-auto md:px-3`}>
      <div className="mb-8">
        <h1 className="text-4xl font-semibold leading-normal text-light-high text-center md:text-lg">
          DeFi
        </h1>
      </div>
      <Filters
        setSortByNetwork={setSortByNetwork}
        setSortActive={setSortActive}
        sortActive={sortActive}
        sortByNetwork={sortByNetwork}
        searchHandler={searchHandler}
      />
      <CardList
        sortActive={sortActive}
        allDefiList={allDefiList}
        defiData={networkDefiList!}
      />
    </div>
  );
};

export default DefiList;
