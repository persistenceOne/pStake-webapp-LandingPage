import React, { useEffect, useState } from "react";
import { CHAIN } from "../../helpers/config";
import useTranslation from "next-translate/useTranslation";
import ButtonLink from "../atoms/buttonLink";
import Button from "../atoms/button";
import { getCosmosApy, getBNBApy } from "../../pages/api/onChain";
import { APR_DEFAULT } from "../../../AppConstants";

const env: string = process.env.NEXT_PUBLIC_ENV!;

const HomepageContainer = () => {
  const [ethAPR, setEthAPR] = useState(CHAIN[env].ethAPR);
  const [bnbAPy, setBnbAPy] = useState(CHAIN[env].bnbAPR);
  const [cosmosApy, setCosmosApy] = useState(APR_DEFAULT);

  useEffect(() => {
    const fetchValues = async () => {
      setCosmosApy(await getCosmosApy());
      setBnbAPy(await getBNBApy());
    };
    fetchValues();
  }, []);

  const { t } = useTranslation("common");

  const networkList = [
    {
      asset: "Cosmos",
      network: "cosmos",
      imageUrl: "/images/atom.svg",
      apy: cosmosApy.toFixed(2),
      buttonText: "Start Staking",
      buttonUrl: CHAIN[env].atomCosmosURL
    },
    {
      asset: "BNB",
      network: "binance",
      imageUrl: "/images/bnb.svg",
      apy: bnbAPy,
      buttonText: "Start Staking",
      buttonUrl: CHAIN[env].bnbURL
    },
    {
      asset: "Ethereum",
      network: "ethereum",
      imageUrl: "/images/stkETH.svg",
      apy: ethAPR,
      buttonText: "Start Staking",
      buttonUrl: CHAIN[env].ethURL
    },
    {
      asset: "Persistence",
      network: "ethereum",
      imageUrl: "/images/xprt.svg",
      apy: "0",
      buttonText: "Withdraw Assets",
      buttonUrl: CHAIN[env].atomURL
    },
    {
      asset: "Cosmos",
      network: "ethereum",
      imageUrl: "/images/atom.svg",
      apy: "0",
      buttonText: "Withdraw Assets",
      buttonUrl: CHAIN[env].atomURL
    }
  ];

  return (
    <>
      <div className="px-0 pt-6 pb-12">
        <img
          src={"/images/pstakelogo.svg"}
          alt="logo"
          className="m-auto pb-4"
        />
        <div className="max-w-[800px] m-auto">
          <p className="text-light-emphasis text-center text-lg leading-normal font-medium">
            Earn staking rewards on your Assets for securing PoS networks and
            participate in DeFi with stkAssets for additional yields. Select a
            network below to get started now.
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <div>
          <div className="flex flex-wrap items-center justify-center">
            {networkList.slice(0, 2).map((item, index) => (
              <div
                className="p-8 bg-black-800 m-2 min-w-[300px] max-w-[500px] rounded-md hover:bg-opacity-90"
                key={index}
              >
                <div className="mb-2">
                  <div className={"text-center mb-2"}>
                    <img
                      src={item.imageUrl}
                      alt={item.asset}
                      className="w-[40px] h-[40px] m-auto"
                    />
                  </div>
                  <div>
                    <h5 className="text-light-high text-lg font-semibold leading-normal text-center">
                      {item.asset}
                    </h5>
                    <h4 className="text-green text-lg font-semibold leading-normal text-center">
                      {item.apy}% APY
                    </h4>
                  </div>
                </div>
                <ButtonLink
                  className="button w-full md:py-2 md:text-sm block"
                  type="primary"
                  size="large"
                  disabled={false}
                  link={item.buttonUrl}
                  content={item.buttonText}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center">
            {networkList.slice(2, networkList.length + 1).map((item, index) => (
              <div
                className="p-8 bg-black-800 m-2 min-w-[300px] max-w-[500px] rounded-md hover:bg-opacity-90"
                key={index}
              >
                <div className="mb-2">
                  <div className={"text-center mb-2"}>
                    <img
                      src={item.imageUrl}
                      alt={item.asset}
                      className="w-[40px] h-[40px] m-auto"
                    />
                  </div>
                  <div>
                    <h5 className="text-light-high text-lg font-semibold leading-normal text-center">
                      {item.asset}
                      <span className="text-light-emphasis text-xsm">
                        (ERC20)
                      </span>
                    </h5>
                    {item.network === "ethereum" &&
                    (item.asset === "Persistence" ||
                      item.asset === "Cosmos") ? (
                      <h4 className="text-light-mid text-xsm font-medium leading-normal text-center">
                        (Deprecated)
                      </h4>
                    ) : (
                      <h4 className="text-green text-lg font-semibold leading-normal text-center">
                        {item.apy}% APY
                      </h4>
                    )}
                  </div>
                </div>
                <div className="">
                  {item.network === "ethereum" &&
                  (item.asset === "Persistence" || item.asset === "Cosmos") ? (
                    <>
                      <div className={"text-center"}>
                        <a
                          className="inline-block text-light-high text-center text-xsm font-medium
                        leading-normal hover:underline hover:cursor-pointer mb-3"
                          href={item.buttonUrl}
                          target={"_blank"}
                        >
                          {item.buttonText}
                        </a>
                      </div>
                      <Button
                        className="button w-full md:py-2 md:text-sm after:content-['Migrate_to_Persistence']
                      hover:after:content-['Coming_soon']"
                        type="primary"
                        size="large"
                        disabled={false}
                        content=""
                      />
                    </>
                  ) : (
                    <ButtonLink
                      className="button w-full md:py-2 md:text-sm block mt-8"
                      type="primary"
                      size="large"
                      disabled={false}
                      link={item.buttonUrl}
                      content={item.buttonText}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomepageContainer;
