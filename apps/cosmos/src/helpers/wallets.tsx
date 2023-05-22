import { ChainInfo } from "@keplr-wallet/types";
import { OfflineSigner } from "@cosmjs/launchpad";
import { OfflineDirectSigner } from "@cosmjs/proto-signing";
import { walletType } from "../context/WalletConnect/types";

declare global {
  interface Window {
    cosmostation?: any;
    leap: any;
  }
}

export const WalletHandler = async (
  chain: ChainInfo,
  wallet: walletType
): Promise<OfflineSigner | OfflineDirectSigner> => {
  let extension: any = undefined;
  if (wallet === "cosmosStation") {
    extension = window.cosmostation!.providers.keplr;
  } else if (wallet === "leap") {
    extension = window.leap;
  } else {
    extension = window.keplr;
  }
  if (!extension) {
    throw new Error(`install ${wallet} extension`);
  } else {
    if (extension.experimentalSuggestChain) {
      try {
        await extension.experimentalSuggestChain({
          chainId: chain.chainId,
          chainName: chain.chainName,
          rpc: chain.rpc,
          rest: chain.rest,
          stakeCurrency: chain.stakeCurrency,
          walletUrlForStaking: `https://wallet.persistence.one/`,
          bip44: {
            coinType: chain.bip44.coinType
          },
          bech32Config: chain.bech32Config,
          currencies: chain.currencies,
          feeCurrencies: chain.feeCurrencies,
          coinType: chain.bip44.coinType,
          gasPriceStep: chain.gasPriceStep,
          features: ["ibc-transfer", "ibc-go"]
        });
      } catch {
        throw new Error("Failed to suggest the chain");
      }
    } else {
      throw new Error("Please use the recent version of extension");
    }
  }

  const chainId = chain.chainId;
  if (wallet === "leap") {
    let trys = 3;
    while (trys > 0)
      try {
        await extension.enable(chainId);
        break;
      } catch (err) {
        console.log(err);
        trys--;
      }
  } else {
    await extension.enable(chainId);
  }

  const offlineSigner = await extension.getOfflineSignerAuto!(chainId);
  const accounts = await offlineSigner.getAccounts();
  return offlineSigner;
};

export default WalletHandler;
