import React from "react";
import Image from "next/image";
import Link from "next/link";

const NetworkCards = () => {
  const networkList = [
    {
      asset: "Cosmos",
      network: "cosmos",
      imageUrl: "/images/logos/atom.svg",
      cardText:
        "Liquid Stake Cosmos assets on the underlying network to get the best of both worlds — Staking & DeFi and watch your stkASSETs value grow.",
      apy: 1,
      supportedNetworks: ["/images/logos/stk_atom.svg"],
      buttonText: "Stake",
      launched: true,
      buttonUrl: "https://cosmos.pstake.finance/"
    },
    {
      asset: "BNB",
      network: "binance",
      imageUrl: "/images/logos/bnb.svg",
      cardText:
        "Liquid Stake BNB to get the best of both worlds — Staking & DeFi.",
      apy: 4,
      supportedNetworks: ["/images/logos/stk_bnb.svg"],
      buttonText: "Stake",
      launched: true,
      buttonUrl: "https://bnb.pstake.finance/"
    },
    {
      asset: "Ethereum",
      network: "ethereum",
      imageUrl: "/images/logos/eth.svg",
      cardText:
        "Natively liquid stake ETH on Ethereum and supported L2s  — Arbitrum & Optimism.",
      apy: 12,
      supportedNetworks: ["/images/logos/stk_eth.svg"],
      buttonText: "Coming soon",
      launched: false,
      buttonUrl: "https://eth.pstake.finance/"
    }
  ];
  return (
    <div className="flex flex-wrap max-w-[910px] mx-auto justify-center">
      {networkList.map((item, index) => (
        <div
          className="-lg:basis-[33.3%] -lg:max-w-[33.3%] px-2 mb-4"
          key={index}
        >
          <div className="bg-black-700 p-6 h-full flex justify-between flex-col rounded-md">
            <div className="mb-4">
              <div className={"text-center mb-4"}>
                <Image
                  src={item.imageUrl}
                  alt={item.asset}
                  width={40}
                  height={40}
                  className="mx-auto mb-2"
                />
                <h5 className="text-light-high text-lg font-semibold leading-normal text-center">
                  {item.asset}
                </h5>
              </div>
              <p className="text-light-emphasis text-center text-sm">
                {item.cardText}
              </p>
            </div>
            <div>
              <div className={"flex items-center justify-center mb-4"}>
                {item.supportedNetworks.map((network, index) =>
                  network !== null ? (
                    <Image
                      key={index}
                      src={network}
                      alt={network}
                      width={32}
                      height={32}
                      className="mx-1"
                    />
                  ) : (
                    ""
                  )
                )}
              </div>
              <Link
                href={item.buttonUrl}
                target={"_blank"}
                passHref
                className={`text-center text-light-emphasis rounded-md bg-[#c73238]
                 py-[0.5rem] px-4 w-full block hover:bg-[#cb575bfa] ${
                   !item.launched ? "pointer-events-none opacity-50" : ""
                 }`}
              >
                {item.buttonText}
              </Link>
              {/*<ButtonLink*/}
              {/*  className="button w-full py-1 text-sm block"*/}
              {/*  type="primary"*/}
              {/*  size="medium"*/}
              {/*  disabled={false}*/}
              {/*  link={item.buttonUrl}*/}
              {/*  content={item.buttonText}*/}
              {/*/>*/}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NetworkCards;
