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
  [index: string | "Testnet" | "Mainnet" | "Devnet"]: {
    [key in Networks]: ChainInfo;
  };
};

export const chains: ChainList = {
  Devnet: {
    ethereum: {
      networkID: 900,
      networkIdHex: "0x384",
      networkName: "Goerli Devnet",
      network: "goerli",
      rpcUrl: "https://geth.devnet.eth.pstake.finance",
      explorerUrl: "https://goerli.etherscan.io",
    },
    optimism: {
      networkID: 901,
      network: "optimism-goerli",
      networkIdHex: "0x385",
      networkName: "Optimism Goerli (devnet)",
      rpcUrl: "https://op.geth.devnet.eth.pstake.finance",
      explorerUrl: "https://goerli-explorer.optimism.io",
    },
  },
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
      rpcUrl:
        "https://opt-goerli.g.alchemy.com/v2/ngcfNAzcmrlqiAvFcJz0R281DxhU_pTi",
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
export type ContractName = "l1staking" | "stkETH" | "l2stkETH" | "l2staking";

export type ContractList = {
  [index: string | "Testnet" | "Mainnet" | "Devnet"]: {
    [key in ContractName]: string;
  };
};

export const messengerId: any = {
  Devnet: 0,
  Testnet: 0,
  Mainnet: 0,
};

export const contracts: ContractList = {
  Devnet: {
    stkETH: "0x820a26038bfb3a18afac718c56abc3b6b33d23ea",
    l1staking: "0x5b95ccceba7eca7487c4a1dad9a37a6e728fa0c4",
    l2stkETH: "0xd643c4d93d6fad5f2ec0c52e8306db3581449b5c",
    l2staking: "0xb7a66507d10618630b7c88ed82c04127bf576fea",
  },
  Testnet: {
    stkETH: "0xdbdDAA0BE8760b4FbcFE97031c87AdE61B5E99be",
    l1staking: "0x710fC467fD6E63baDc1D4c71852fDfBca02c7814",
    l2stkETH: "0x46c86Ff2930c97ca872aAe4fE96694fdF15ACC4a",
    l2staking: "0x8Eb01B888fA411E1C05a52e197fAC47B9B4B0E61",
  },
  Mainnet: {
    stkETH: "0x20cD69d52164e2707A90C1C5fA7f95e8943ae72F",
    l1staking: "0x50aDA8a83ec64936e2445F3B38Bb3B7068987216",
    l2stkETH: "0x1162B7aE45C019CC730f8760Fd651332DE418046",
    l2staking: "0x116addNetwork2B7aE45C019CC730f8760Fd651332DE418046",
  },
};
