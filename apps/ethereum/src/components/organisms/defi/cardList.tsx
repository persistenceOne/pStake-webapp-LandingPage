/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Icon } from "../../atoms/icon";
import { ButtonLink } from "ui";
import Tooltip from "rc-tooltip";
import { useWindowSize } from "hooks";
import { DefiInfo, EthereumData } from "./defiData";

const listData = (label: any, value: any) => (
  <div className="pr-5 flex-1 lg:py-2">
    <p
      className="font-normal text-base
         leading-normal mb-2 text-light-mid lg:whitespace-nowrap md:mb-1"
    >
      {label}
    </p>
    <h3 className="font-medium text-lg leading-normal text-light-emphasis whitespace-nowrap flex items-center">
      {value}
    </h3>
  </div>
);

const listShow = (item: DefiInfo, index: number, isMobile = false) => (
  <div className="card-container mb-8" key={index}>
    <div className="card card-primary bg-[#28282880] p-8 rounded-md lg:block flex flex-wrap md:p-5">
      <div className="content flex-1 md:flex-auto">
        <div className="heading-section flex mb-8 md:mb-2 justify-between items-center">
          <div className="heading-section flex">
            <div className="icons relative flex items-center mr-8">
              <span className="z-10 absolute flex">
                <img
                  src={item.token0_logo}
                  width={32}
                  height={32}
                  alt={"inputToken_logo"}
                />
              </span>
              <span className="relative left-5 flex">
                <img
                  src={item.token1_logo}
                  width={32}
                  alt={"inputToken_logo"}
                />
              </span>
            </div>
            <h3 className="text-3xl font-semibold leading-normal text-light-high md:text-lg">
              {item.token0}/{item.token1}
            </h3>
          </div>
          <Tooltip placement="top" overlay={<span>{item.platform}</span>}>
            <span className="flex hidden md:block">
              <img src={item.platform_logo} width={28} alt={"logo"} />
            </span>
          </Tooltip>
        </div>
        <div className="flex flex-wrap md:mb-2">
          <div className="md:hidden pr-4 md:pr-0 flex-1">
            {listData(
              "Platform",
              <>
                <span className="mr-2 flex">
                  <img src={item.platform_logo} width={28} alt={"logo"} />
                </span>
                {item.platform}
              </>
            )}
          </div>
          {listData("APR", `${item.apy}%`)}
          {listData("TVL", `${item.tvl}%`)}
        </div>
      </div>
      <div className="w-[11.875rem] flex flex-col justify-center lg:w-auto lg:mt-3">
        {item.launched ? (
          <div className="flex flex-col justify-center mx-2.5 lg:flex-row lg:mx-0">
            <ButtonLink
              link={item.button_one_url!}
              target={"_blank"}
              type={"primary"}
              className="button button-primary mb-3 lg:py-2 lg:px-4 lg:text-xsm lg:flex-1 lg:mb-0 lg:mr-2"
              content={
                <div className="flex justify-center items-center">
                  {item.button_one_text}
                  <Icon
                    iconName="arrow-redirect-white"
                    viewClass="redirect stroke-[#fcfcfc] !w-[10px] !h-[10px] ml-1"
                  />
                </div>
              }
            />
            <ButtonLink
              link={item.button_two_url!}
              target={"_blank"}
              type="secondary"
              className="button button-primary px-4 lg:py-2 lg:px-4 lg:text-xsm lg:flex-1"
              content={
                <div className="flex justify-center items-center">
                  {item.button_two_text}
                  <Icon
                    iconName="arrow-redirect-white"
                    viewClass="redirect stroke-[#fcfcfc] !w-[10px] !h-[10px] ml-1"
                  />
                </div>
              }
            />
          </div>
        ) : (
          <div className="flex flex-col justify-center lg:mx-0 lg:mt-4 mx-2.5">
            <ButtonLink
              link={item.button_one_url!}
              target={"_blank"}
              className="button button-primary pointer-events-none opacity-50 lg:py-2 lg:px-4 lg:text-xsm"
              content="Coming Soon"
            />
          </div>
        )}
      </div>
    </div>
  </div>
);

interface Props {
  sortActive: any;
  allDefiList: DefiInfo[];
  defiData: EthereumData;
}

const CardList: React.FC<Props> = ({ sortActive, allDefiList, defiData }) => {
  const { isMobile } = useWindowSize();
  console.log(defiData, "defiData");
  return (
    <div>
      {sortActive["all"] && allDefiList.length ? (
        allDefiList.length ? (
          allDefiList.map((item: DefiInfo, index: number) =>
            listShow(item, index, isMobile)
          )
        ) : (
          <p className="empty-list">Data not found</p>
        )
      ) : (
        ""
      )}
      {defiData?.dexList && sortActive["dexes"] ? (
        defiData?.dexList.length ? (
          defiData!.dexList.map((item: any, index: number) =>
            listShow(item, index, isMobile)
          )
        ) : (
          <p className="empty-list">Data not found</p>
        )
      ) : (
        ""
      )}
      {defiData?.blList && sortActive["lending"] ? (
        defiData?.blList.length ? (
          defiData!.blList.map((item: any, index: number) =>
            listShow(item, index, isMobile)
          )
        ) : (
          <p className="empty-list">Data not found</p>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default CardList;
