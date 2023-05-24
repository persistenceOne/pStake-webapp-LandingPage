import { displayToast } from "ui";
import {
  ETH,
  ETH_REQUEST_ACCOUNTS,
  ETH_TOKEN_DECIMALS,
  META_MASK,
  METAMASK_ERROR,
  WALLET_ERROR,
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
import { ToastType } from "ui/components/molecules/toast/types";

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

// this function helps to switch connected network to supported network,
// if network not present in metamask, it will add network to metamask.
export const addNetwork = async (provider: any, chain: ChainInfo) => {
  console.log(provider, chain, "addNetwork");
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
    const response = await provider.request({
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
    if (response) {
      console.log("Thanks for your interest!");
    } else {
      console.log("Your loss!");
    }
    console.log(response, "response");
  } catch (error) {
    console.log(error, "registerToken");
  }
};

export const handleMetamask = async () => {
  if (!window.ethereum || !window.ethereum) {
    displayToast(
      {
        heading: METAMASK_ERROR,
        message: "Please install metamask",
      },
      ToastType.ERROR
    );
    return;
  }
  const connectWallet = useAppStore.getState().connectWallet;
  const provider = window.ethereum!;

  const chainsData: any = chains[env];
  let networkCheck = false;
  let network: any;
  //checking connected network in supported network list or not.
  for (const item in chainsData) {
    const chainInfo: ChainInfo = chainsData[item];
    if (provider.chainId === chainInfo.networkIdHex) {
      network = item;
      networkCheck = true;
      break;
    } else {
      networkCheck = false;
    }
  }
  if (!networkCheck) {
    const chain = chains[env].ethereum;
    network = "ethereum";
    const response = await addNetwork(provider, chain);
    if (!response) {
      displayToast(
        {
          heading: WALLET_ERROR,
          message: "Error while Switching network",
        },
        ToastType.ERROR
      );
      return;
    }
  }
  await connectWallet(provider, META_MASK, network);
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
      await useAppStore.getState().handleWalletNetwork(network);
      await useAppStore.getState().handleWalletSigner(signer);
      await useAppStore.getState().fetchInstances(signer);
      return {
        account: account,
        walletConnection: true,
        walletName: wallet,
      };
    } else {
      throw new Error("No authorized account found");
    }
  } catch (e: any) {
    displayToast(
      {
        heading: WALLET_ERROR,
        message: e.message!,
      },
      ToastType.ERROR
    );
    console.error(e);
    return {
      account: "",
      walletConnection: false,
      walletName: null,
    };
  }
};
