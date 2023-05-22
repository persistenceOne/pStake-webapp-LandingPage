export type Networks = "ethereum" | "optimism";

export interface ChainInfo {
  networkID: number;
  networkIdHex: string;
  network: string;
  networkName: string;
  rpcUrl: string;
  explorerUrl: string;
}

export type ChainList = {
  [index: string | "Testnet" | "Mainnet"]: { [key in Networks]: ChainInfo };
};

export const chains: ChainList = {
  Testnet: {
    ethereum: {
      networkID: 5,
      networkIdHex: "0x5",
      networkName: "Goerli Testnet",
      network: "goerli",
      rpcUrl:
        "https://eth-goerli.g.alchemy.com/v2/xxBSEQUWrcgWH9Uqqy-0SModdapVP7Ef",
      explorerUrl: "https://goerli.etherscan.io",
    },
    optimism: {
      networkID: 420,
      network: "optimism-goerli",
      networkIdHex: "0x1a4",
      networkName: "Optimism Goerli (testnet)",
      rpcUrl: "https://goerli.optimism.io",
      explorerUrl: "https://goerli-explorer.optimism.io",
    },
  },
  Mainnet: {
    ethereum: {
      networkID: 1,
      networkIdHex: "0x1",
      network: "mainnet",
      networkName: "Ethereum",
      rpcUrl:
        "https://eth-mainnet.g.alchemy.com/v2/M-n1pPlyw7XQTqSyYe83UiEUJHM5uaM8",
      explorerUrl: "https://etherscan.io",
    },
    optimism: {
      networkID: 10,
      network: "optimism",
      networkIdHex: "0xA",
      networkName: "Optimism",
      rpcUrl: "https://mainnet.optimism.io",
      explorerUrl: "https://optimistic.etherscan.io",
    },
  },
};

// provide exact name of all the contract json files. ex:ethContract.json
export type ContractName = "staking" | "stkETH" | "l2stkETH";

export type ContractList = {
  [index: string | "Testnet" | "Mainnet"]: { [key in ContractName]: string };
};

export const contracts: ContractList = {
  Testnet: {
    staking: "0x50aDA8a83ec64936e2445F3B38Bb3B7068987216",
    stkETH: "0x220eb9AcDef3187Bc9a9C85C2AbEc46F20533b3C",
    l2stkETH: "0x183FEe62aF14c923CdAE746cE183070aD433EB29",
  },
  Mainnet: {
    staking: "0x50aDA8a83ec64936e2445F3B38Bb3B7068987216",
    stkETH: "0x220eb9AcDef3187Bc9a9C85C2AbEc46F20533b3C",
    l2stkETH: "0x183FEe62aF14c923CdAE746cE183070aD433EB29",
  },
};
