import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import { fetchLiveDataSaga } from "../../store/reducers/liveData";
import { SHORT_INTERVAL } from "../../../AppConstants";
import { useWallet } from "../../context/WalletConnect/WalletConnect";

const MaintenanceContainer = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cosmosChainStatus, persistenceChainStatus } = useSelector(
    (state: RootState) => state.liveData
  );

  const { cosmosChainData, persistenceChainData } = useWallet();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(
        fetchLiveDataSaga({
          persistenceChainInfo: persistenceChainData!,
          cosmosChainInfo: cosmosChainData!
        })
      );
    }, SHORT_INTERVAL);
    return () => clearInterval(interval);
  }, [dispatch, persistenceChainData, cosmosChainData]);

  useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_MAINTENANCE === "false" &&
      router.pathname === "/maintenance" &&
      !cosmosChainStatus &&
      !persistenceChainStatus
    ) {
      router.push("/");
    }
  }, [router, cosmosChainStatus, persistenceChainStatus]);

  return (
    <div className="bg-background flex gap-3 justify-center items-center h-screen px-4">
      <div className={"text-center max-w-[616px]"}>
        <img
          src={"/images/caution.svg"}
          alt={"caution"}
          className="m-auto w-[86px]"
        />
        <h6 className="text-light-high text-3xl font-normal md:text-lg md:text-lg py-8">
          {"We'll be back soon"}
        </h6>
        <p className="font-normal text-sm leading-7 text-light-emphasis mb-4">
          Sorry for the inconvenience. We’re performing some maintenance at the
          moment. If you need to you can always follow us on{" "}
          <a
            href={
              "https://twitter.com/pstake_cosmos?s=11&t=E_q2T3rK9Bwiywy_YCvo5A"
            }
            className="text-[#0d6efd] font-semibold"
          >
            Twitter
          </a>{" "}
          for updates, otherwise we’ll be back up shortly!
        </p>
        <p className="text-light-emphasis text-base font-semibold leading-normal mb-4">
          — The pSTAKE Team
        </p>
      </div>
    </div>
  );
};

export default MaintenanceContainer;
