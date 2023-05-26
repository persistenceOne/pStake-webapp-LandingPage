import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { WalletProviderProps, WalletState, walletType } from "./types";
import { ChainInfo, Window as KeplrWindow } from "@keplr-wallet/types";
import { AccountData } from "@cosmjs/launchpad/build/signer";
import { OfflineSigner } from "@cosmjs/launchpad";
import WalletHandler from "../../helpers/wallets";
import { fetchBalanceSaga } from "../../store/reducers/balances";
import { useDispatch } from "react-redux";
import { fetchInitSaga, setAPY } from "../../store/reducers/initialData";
import { fetchPendingClaimsSaga } from "../../store/reducers/claim";
import { useLocalStorage } from "hooks";
import { OfflineDirectSigner } from "@cosmjs/proto-signing";
import { displayToast } from "ui";
import {
  fetchLiveDataSaga,
  setPersistenceChainStatus,
} from "../../store/reducers/liveData";
import { getChainStatus } from "../../pages/api/onChain";
import { getStkAtomAPY } from "../../pages/api/externalAPIs";
import { ToastType } from "ui/components/molecules/toast/types";

declare global {
  interface Window extends KeplrWindow {}
}

const WalletContext = createContext<WalletState>({
  cosmosAccountData: null,
  persistenceAccountData: null,
  cosmosChainData: null,
  persistenceChainData: null,
  persistenceSigner: null,
  cosmosSigner: null,
  connect(): Promise<boolean> {
    return Promise.resolve(false);
  },
  isWalletConnected: false,
  walletType: "keplr",
});

export const useWallet = (): WalletState => {
  return useContext(WalletContext);
};

export const WalletProvider: FC<WalletProviderProps> = ({
  children,
  cosmosChainInfo,
  persistenceChainInfo,
}) => {
  const [cosmosChainData, setCosmosChainData] = useState<ChainInfo | null>(
    null
  );
  const [persistenceChainData, setPersistenceChainData] =
    useState<ChainInfo | null>(null);
  const [cosmosSigner, setCosmosSigner] = useState<
    OfflineSigner | OfflineDirectSigner | null
  >(null);
  const [persistenceSigner, setPersistenceSigner] = useState<
    OfflineSigner | OfflineDirectSigner | null
  >(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletType, setWalletType] = useState<walletType>("keplr");
  const [persistenceAccountData, setPersistenceAccountData] =
    useState<AccountData | null>(null);
  const [cosmosAccountData, setCosmosAccountData] =
    useState<AccountData | null>(null);
  const [walletConnected, setWalletConnected] = useLocalStorage("wallet", "");
  const [walletName, setWalletName] = useLocalStorage("walletName", "");

  const dispatch = useDispatch();

  // re-login on every reload or refresh
  useEffect(() => {
    if (walletConnected) {
      if (walletName === "keplr") {
        connect("keplr");
      } else if (walletName === "leap") {
        connect("leap");
      } else {
        connect("cosmosStation");
      }
    }
  }, [walletConnected, walletName]);

  // fetch calls on initial render
  useEffect(() => {
    dispatch(
      fetchInitSaga({
        persistenceChainInfo: persistenceChainInfo!,
        cosmosChainInfo: cosmosChainInfo!,
      })
    );
    dispatch(
      fetchLiveDataSaga({
        persistenceChainInfo: persistenceChainInfo!,
        cosmosChainInfo: cosmosChainInfo!,
      })
    );
  }, [persistenceChainInfo, dispatch, cosmosChainInfo]);

  // fetch calls only on initial render
  useEffect(() => {
    const fetchApy = async () => {
      const [persistenceChainStatus] = await Promise.all([
        getChainStatus(persistenceChainInfo.rpc),
      ]);
      const apy = await getStkAtomAPY();
      dispatch(setAPY(apy));
      dispatch(setPersistenceChainStatus(persistenceChainStatus));
    };
    fetchApy();
  }, []);

  useEffect(() => {
    setCosmosChainData(cosmosChainInfo);
    setPersistenceChainData(persistenceChainInfo);
  }, [cosmosChainInfo, persistenceChainInfo]);

  const connect = async (walletType: walletType): Promise<boolean> => {
    try {
      let persistenceSignerData: any = await WalletHandler(
        persistenceChainInfo,
        walletType
      );

      let cosmosSignerData: any = await WalletHandler(
        cosmosChainInfo,
        walletType
      );

      let persistenceAddressData: any =
        await persistenceSignerData!.getAccounts();
      let cosmosAddressData: any = await cosmosSignerData!.getAccounts();

      setCosmosAccountData(cosmosAddressData[0]);
      setCosmosSigner(cosmosSignerData);
      setPersistenceAccountData(persistenceAddressData[0]);
      setPersistenceSigner(persistenceSignerData);

      dispatch(
        fetchBalanceSaga({
          persistenceAddress: persistenceAddressData[0]!.address,
          cosmosAddress: cosmosAddressData[0]!.address,
          persistenceChainInfo: persistenceChainInfo!,
          cosmosChainInfo: cosmosChainInfo!,
        })
      );
      dispatch(
        fetchPendingClaimsSaga({
          address: persistenceAddressData[0]!.address,
          persistenceChainInfo: persistenceChainInfo!,
        })
      );
      setWalletName(walletType);
      setWalletConnected("connected");
      setWalletType(walletType);
    } catch (e: any) {
      displayToast(
        {
          message: e.message!,
        },
        ToastType.ERROR
      );
      if (
        e.message === "Please install cosmostation extension" ||
        e.message === "install keplr extension"
      ) {
        localStorage.removeItem("wallet");
        localStorage.removeItem("walletName");
      }
      return false;
    }
    setIsWalletConnected(true);
    return true;
  };

  const walletState: WalletState = {
    cosmosAccountData,
    cosmosSigner,
    cosmosChainData,
    persistenceAccountData,
    persistenceSigner,
    persistenceChainData,
    connect,
    isWalletConnected,
    walletType,
  };

  return (
    <WalletContext.Provider value={walletState}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
