import { displayToast } from "ui";
import { ToastType } from "ui/components/molecules/toast/types";
import {
  ETH,
  ETH_REQUEST_ACCOUNTS,
  ETH_TOKEN_DECIMALS,
  META_MASK,
} from "../../appConstants";
import { chains, ChainInfo, Networks } from "./config";
import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { ethers, utils } from "ethers";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
} from "@ethersproject/providers/src.ts/web3-provider";
import { useAppStore } from "../store/store";
import { WalletInfo, WalletNames } from "../store/slices/walletSlice";
import { getWalletProvider } from "./utils";

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

// this function helps to switch connected network to supported network,
// if network not present in metamask, it will add network to metamask.
export const addNetwork = async (provider: any, chain: ChainInfo) => {
  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chain.networkIdHex }], // Hexadecimal version of 80001, prefixed with 0x
    });
    return true;
  } catch (error: any) {
    // Sentry.captureException(error?.message);
    if (error.code === 4902) {
      try {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: chain.networkIdHex, // Hexadecimal version of 80001, prefixed with 0x
              chainName: chain.networkName,
              nativeCurrency: {
                name: ETH,
                symbol: ETH,
                decimals: ETH_TOKEN_DECIMALS,
              },
              rpcUrls: [chain.rpcUrl],
              blockExplorerUrls: [chain.explorerUrl],
              iconUrls: [""],
            },
          ],
        });
        return true;
      } catch (addError) {
        console.log(addError, "addError");
        // Sentry.captureException("Could not add the bsc network");
        return false;
      }
    }
    return false;
  }
};

export const registerToken = async (
  walletInfo: WalletInfo,
  tokenContractAddress: string
) => {
  const provider = getWalletProvider(walletInfo.walletName!);
  try {
    await provider.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: tokenContractAddress,
          symbol: "stkETH",
          decimals: 18,
          image: window.location.origin + "/images/logos/stkEth.svg",
        },
      },
    });
  } catch (error) {
    console.log(error, "registerToken");
  }
};

export const handleMetamask = async () => {
  if (!window.ethereum || !window.ethereum) {
    displayToast(
      {
        message: "please install metamask",
      },
      ToastType.ERROR
    );
    return;
  }
  const connectWallet = useAppStore.getState().connectWallet;
  const chain = chains[env]["ethereum"];
  const provider = window.ethereum!;
  if (provider.chainId !== chain.networkIdHex) {
    const response = await addNetwork(provider, chain);
    if (!response) {
      displayToast(
        {
          message: "Error while Switching network",
        },
        ToastType.ERROR
      );
      return;
    }
  }
  await connectWallet(provider, META_MASK, "ethereum");
};

export const handleWalletConnection = async (
  contract: ExternalProvider | JsonRpcFetchFunc | any,
  wallet: WalletNames,
  network: Networks
): Promise<WalletInfo> => {
  try {
    let accounts;
    accounts = await contract.request({ method: ETH_REQUEST_ACCOUNTS });
    if (accounts && accounts.length !== 0) {
      const account = accounts[0];
      const provider: JsonRpcProvider = new ethers.providers.Web3Provider(
        contract
      );
      const signer: JsonRpcSigner = await provider.getSigner();
      const balance = await signer.getBalance();
      console.log(balance, "balance", utils.formatEther(balance));
      await useAppStore.getState().fetchInstances(signer);
      return {
        account: account,
        walletConnection: true,
        walletName: wallet,
        network: network,
        signer,
      };
    } else {
      throw new Error("No authorized account found");
    }
  } catch (e: any) {
    displayToast(
      {
        message: e.message!,
      },
      ToastType.ERROR
    );
    console.error(e);
    return {
      account: "",
      walletConnection: false,
      network: null,
      walletName: null,
      signer: null,
    };
  }
};
