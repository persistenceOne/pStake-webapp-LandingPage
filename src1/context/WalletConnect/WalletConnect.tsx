import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState
} from "react";
import { WalletProviderProps, WalletState } from "./types";
import { ChainInfo, Window as KeplrWindow } from "@keplr-wallet/types";
import { AccountData } from "@cosmjs/launchpad/build/signer";
import { OfflineSigner } from "@cosmjs/launchpad";
import KeplrWallet from "../../helpers/keplr";
import { fetchBalanceSaga } from "../../store/reducers/balances";
import { useDispatch } from "react-redux";
import { fetchInitSaga, setAPY } from "../../store/reducers/initialData";
import { printConsole } from "../../helpers/utils";
import { fetchPendingClaimsSaga } from "../../store/reducers/claim";
import useLocalStorage from "../../customHooks/useLocalStorage";
import { OfflineDirectSigner } from "@cosmjs/proto-signing";
import { displayToast } from "../../components/molecules/toast";
import { ToastType } from "../../components/molecules/toast/types";
import { fetchLiveDataSaga } from "../../store/reducers/liveData";
import { getAPY } from "../../pages/api/onChain";

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
  isWalletConnected: false
});

export const useWallet = (): WalletState => {
  return useContext(WalletContext);
};

export const WalletProvider: FC<WalletProviderProps> = ({
  children,
  cosmosChainInfo,
  persistenceChainInfo
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
  const [persistenceAccountData, setPersistenceAccountData] =
    useState<AccountData | null>(null);
  const [cosmosAccountData, setCosmosAccountData] =
    useState<AccountData | null>(null);
  const [walletConnected, setWalletConnected] = useLocalStorage("wallet", "");

  const dispatch = useDispatch();

  useEffect(() => {
    if (walletConnected) {
      connect();
    }
  }, [walletConnected]);

  useEffect(() => {
    dispatch(
      fetchInitSaga({
        persistenceChainInfo: persistenceChainInfo!,
        cosmosChainInfo: cosmosChainInfo!
      })
    );
    dispatch(
      fetchLiveDataSaga({
        persistenceChainInfo: persistenceChainInfo!,
        cosmosChainInfo: cosmosChainInfo!
      })
    );
  }, [persistenceChainInfo, dispatch, cosmosChainInfo]);

  useEffect(() => {
    const fetchApy = async () => {
      const apy: any = await getAPY();
      dispatch(setAPY(apy));
    };
    fetchApy();
  }, []);

  useEffect(() => {
    setCosmosChainData(cosmosChainInfo);
    setPersistenceChainData(persistenceChainInfo);
  }, [cosmosChainInfo, persistenceChainInfo]);

  const connect = async (): Promise<boolean> => {
    try {
      const persistenceSigner = await KeplrWallet(persistenceChainInfo);
      const cosmosSigner = await KeplrWallet(cosmosChainInfo);
      const cosmosAccounts = await cosmosSigner!.getAccounts();
      setCosmosAccountData(cosmosAccounts[0]);
      setCosmosSigner(cosmosSigner);
      const persistenceAccounts = await persistenceSigner!.getAccounts();
      setPersistenceAccountData(persistenceAccounts[0]);
      setPersistenceSigner(persistenceSigner);
      dispatch(
        fetchBalanceSaga({
          persistenceAddress: persistenceAccounts[0]!.address,
          cosmosAddress: cosmosAccounts[0]!.address,
          persistenceChainInfo: persistenceChainInfo!,
          cosmosChainInfo: cosmosChainInfo!
        })
      );
      dispatch(
        fetchPendingClaimsSaga({
          address: persistenceAccounts[0]!.address,
          persistenceChainInfo: persistenceChainInfo!
        })
      );
      setWalletConnected("connected");
    } catch (e: any) {
      printConsole(e);
      displayToast(
        {
          message: e.message!
        },
        ToastType.ERROR
      );
      console.error(e);
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
    isWalletConnected
  };

  return (
    <WalletContext.Provider value={walletState}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
