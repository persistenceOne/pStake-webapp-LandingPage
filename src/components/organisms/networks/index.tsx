import React from "react";
import NetworkCards from "./cards";
import styles from "./styles.module.css";

const NetworkSection = () => {
  return (
    <div>
      <div className="pt-[90px] mb-[40px]">
        <p
          className={
            "text-light-high text-[36px] text-center font-bold leading-normal mb-6 md:text-[20px]"
          }
        >
          Stake and earn with your<br/> favorite Blockchains
        </p>
        <div className="flex items-center justify-center mb-6">
          <div className={"flex items-center"}>
            <div
              className={
                "bg-black-700 w-[32px] h-[32px] flex justify-center items-center rounded-full text-light-emphasis mr-4"
              }
            >
              1
            </div>
            <div>
              <p className="text-light-high font-medium">Stake</p>
              <p className="text-light-emphasis text-sm">
                Liquid Stake to earn <br /> rewards real time
              </p>
            </div>
          </div>
          <div className={`${styles.gradientBg} mx-4 md:mx-2`} />
          <div className={"flex items-center"}>
            <div
              className={
                "bg-black-700 w-[32px] h-[32px] flex justify-center items-center rounded-full text-light-emphasis mr-4"
              }
            >
              2
            </div>
            <div>
              <p className="text-light-high font-medium">Defi</p>
              <p className="text-light-emphasis text-sm">
                Use stkASSETS in DeFi <br/>protocols for rewards
              </p>
            </div>
          </div>
          <div className={`${styles.gradientBg} mx-4  md:mx-2`} />
          <div className={"flex items-center"}>
            <div
              className={
                "bg-black-700 w-[32px] h-[32px] flex justify-center items-center rounded-full text-light-emphasis mr-4"
              }
            >
              3
            </div>
            <div>
              <p className="text-light-high font-medium">Earn</p>
              <p className="text-light-emphasis text-sm">
                Yield Farm to leverage<br/> stkASSETS
              </p>
            </div>
          </div>
        </div>
      </div>
      <NetworkCards />
    </div>
  );
};

export default NetworkSection;
