import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { EthereumData, ethereumData, optimismData } from "./defiData";
import { useAppStore } from "../../../store/store";
import CardList from "./cardList";
import Filters from "./filter";
import { Networks } from "../../../helpers/config";

export type SortOptions = "all" | "dexes" | "lending";

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
    let sortByNetworkKeys = Object.keys(sortByNetwork);
    const activeNetwork = sortByNetworkKeys.find(
      (key) => sortByNetwork[key as keyof typeof sortByNetwork]
    );
    let defiList: EthereumData = {
      dexList: [],
      blList: [],
    };
    if (activeNetwork === "ethereum") {
      defiList = ethereumData(defiListData.uniSwap, defiListData.uniSwap);
    } else if (activeNetwork === "optimism") {
      defiList = optimismData(defiListData.uniSwap, defiListData.uniSwap);
    }
    setNetworkDefiList(defiList);
    let arrayKeys = Object.keys(defiList);
    let sortedDefiList: EthereumData = defiList;
    let sortedTotalData: any[] = [];
    arrayKeys.map((arrayIndex: string) => {
      const restdd = defiList[arrayIndex as keyof typeof defiList].sort(
        (a: any, b: any) => a.id - b.id
      );
      sortedTotalData.push(...restdd);
      sortedDefiList[arrayIndex as keyof typeof defiList] = restdd;
    });
    setAllDefiList(sortedTotalData);
  }, [defiListData, sortByNetwork]);

  const searchHandler = (evt: any) => {
    const searchTerm = evt.target.value;
    let defiList: EthereumData = {
      dexList: [],
      blList: [],
    };
    let sortByNetworkKeys = Object.keys(sortByNetwork);
    const activeNetwork = sortByNetworkKeys.find(
      (key) => sortByNetwork[key as keyof typeof sortByNetwork]
    );
    if (activeNetwork === "ethereum") {
      defiList = ethereumData(defiListData.uniSwap, defiListData.uniSwap);
    } else if (activeNetwork === "optimism") {
      defiList = optimismData(defiListData.uniSwap, defiListData.uniSwap);
    }
    setNetworkDefiList(defiList);
    let arrayKeys = Object.keys(defiList);
    let sortedDefiList: EthereumData = defiList;
    let sortedTotalData: any[] = [];
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
    setAllDefiList(sortedTotalData);
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
