import { ChainInfo } from "@keplr-wallet/types";

export const PSTAKE_TWITTER_URL = "https://twitter.com/pStakeFinance";
export const PSTAKE_TELEGRAM_URL = "https://t.me/pstakefinance";
export const PSTAKE_YOUTUBE_URL =
  "https://www.youtube.com/channel/UC5wqI1ZRdkCjWWVOCQdhxLQ/featured";
export const PSTAKE_REDDIT_URL = "https://www.reddit.com/r/PersistenceOne/";
export const PSTAKE_DISCORD_URL = "https://discord.com/invite/2ek5rUyT8x";
export const PSTAKE_GITHUB_URL = "https://github.com/persistenceOne";
export const ANALYTICS_MEASURE_ID = "G-MC3HWEVV3H";
export const ATOM_WEB_URL = "https://pstake.finance/atom";

interface ChainTypes {
  [index: string]: any;
}

export const CHAIN: ChainTypes = {
  Testnet: {
    networkID: 3,
    inflationPeriod: 365,
    stkETHDeployTxHash:
      "0xa532ae226472c1d38bc643046c5e6816e04c5b50e4785ad1ddf8db9efcd421be",
    ethAPR: "~4.05",
    bnbAPR: "~4.00",
    solURL: "https://stksol-ui.auditdev.workers.dev/",
    avaxURL: "https://stk-avax-ui.auditdev.workers.dev/",
    ethURL: "https://testnet.eth.pstake.finance/",
    bnbURL: "https://testnet.bnb.pstake.finance/",
    atomCosmosURL: "https://testnet.cosmos.pstake.finance/",
    atomURL: "https://v1testnet.cosmos.pstake.finance/",
    xprtURL: "https://v1testnet.cosmos.pstake.finance/",
    DEFILAMA_API: "https://api.llama.fi/protocol/pstake",
    getETHPrice:
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD",
    ethplorerAPI: "https://api.ethplorer.io/getTokenInfo/",
    SmartContracts: {
      StkETH: "StkEth",
      STokens: "STokensV2",
      STokensXPRT: "STokensXPRT"
    },
    CONTRACT_ADDRESSES: {
      StkEth: "0x20cD69d52164e2707A90C1C5fA7f95e8943ae72F",
      StkATOM: "0xA0e5c263cDC9EE2BFd06910D436dB5B51831135E",
      StkXPRT: "0x048546d9Df54b5cD1d7631484453b0ce8D13f17B"
    },
    holderCountAPI: {
      eth: "https://api.persistence.one/ethplorer/getTokenInfo/eth",
      atom: "https://api.persistence.one/ethplorer/getTokenInfo/atom",
      xprt: "https://api.persistence.one/ethplorer/getTokenInfo/xprt"
    }
  },
  Staging: {
    networkID: 1,
    inflationPeriod: 365,
    stkETHDeployTxHash:
      "0x5cfe093883b26ca810ab4a2cf074244c2493a14371c0a24a068efe864ef97c67",
    ethAPR: "~4.05",
    bnbAPR: "~4.00",
    ethURL: "https://staging.eth.pstake.finance/",
    atomURL: "https://v1staging.cosmos.pstake.finance/",
    atomCosmosURL: "https://staging.cosmos.pstake.finance/",
    xprtURL: "https://v1staging.cosmos.pstake.finance/",
    bnbURL: "https://staging.bnb.pstake.finance/",
    DEFILAMA_API: "https://api.llama.fi/protocol/pstake",
    ethplorerAPI: "https://api.ethplorer.io/getTokenInfo/",
    getETHPrice:
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD",
    SmartContracts: {
      StkETH: "StkEth",
      STokens: "STokensV2",
      STokensXPRT: "STokensXPRTV2"
    },
    CONTRACT_ADDRESSES: {
      StkEth: "0x2C5Bcad9Ade17428874855913Def0A02D8bE2324",
      StkATOM: "0x44017598f2AF1bD733F9D87b5017b4E7c1B28DDE",
      StkXPRT: "0x45e007750Cc74B1D2b4DD7072230278d9602C499"
    },
    holderCountAPI: {
      eth: "https://api.persistence.one/ethplorer/getTokenInfo/eth",
      atom: "https://api.persistence.one/ethplorer/getTokenInfo/atom",
      xprt: "https://api.persistence.one/ethplorer/getTokenInfo/xprt"
    }
  },
  Mainnet: {
    networkID: 1,
    inflationPeriod: 365,
    stkETHDeployTxHash:
      "0x5cfe093883b26ca810ab4a2cf074244c2493a14371c0a24a068efe864ef97c67",
    ethAPR: "~4.05",
    bnbAPR: "~4.00",
    ethURL: "https://eth.pstake.finance/",
    atomURL: "https://v1cosmos.pstake.finance/",
    atomCosmosURL: "https://cosmos.pstake.finance/",
    xprtURL: "https://v1cosmos.pstake.finance/",
    bnbURL: "https://bnb.pstake.finance/",
    DEFILAMA_API: "https://api.llama.fi/protocol/pstake",
    ethplorerAPI: "https://api.ethplorer.io/getTokenInfo/",
    getETHPrice:
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD",
    SmartContracts: {
      StkETH: "StkEth",
      STokens: "STokensV2",
      STokensXPRT: "STokensXPRTV2"
    },
    CONTRACT_ADDRESSES: {
      StkEth: "0x2C5Bcad9Ade17428874855913Def0A02D8bE2324",
      StkATOM: "0x44017598f2AF1bD733F9D87b5017b4E7c1B28DDE",
      StkXPRT: "0x45e007750Cc74B1D2b4DD7072230278d9602C499"
    },
    holderCountAPI: {
      eth: "https://api.persistence.one/ethplorer/getTokenInfo/eth",
      atom: "https://api.persistence.one/ethplorer/getTokenInfo/atom",
      xprt: "https://api.persistence.one/ethplorer/getTokenInfo/xprt"
    }
  }
};

export const CHAIN_ID: any = {
  Devnet: {
    cosmosChainID: "gaiad-1",
    persistenceChainID: "pstaked-1"
  },
  Testnet: {
    cosmosChainID: "theta-testnet-001",
    persistenceChainID: "test-core-1"
  },
  Mainnet: {
    cosmosChainID: "cosmoshub-4",
    persistenceChainID: "core-1"
  }
};

interface CosmosChainData {
  [index: string]: ChainInfo[];
}

export const CosmosChains: CosmosChainData = {
  Devnet: [
    {
      rpc: "https://rpc.devnet.persistence.pstake.finance",
      rest: "https://rest.devnet.persistence.pstake.finance",
      chainId: "pstaked-1",
      chainName: "pStake Persistence Devnet",
      stakeCurrency: {
        coinDenom: "XPRT",
        coinMinimalDenom: "uxprt",
        coinDecimals: 6,
        coinGeckoId: "persistence"
      },
      bip44: {
        coinType: 118
      },
      currencies: [
        {
          coinDenom: "XPRT",
          coinMinimalDenom: "uxprt",
          coinDecimals: 6,
          coinGeckoId: "persistence"
        },
        {
          coinDenom: "STKATOM",
          coinMinimalDenom: "stk/uatom",
          coinDecimals: 6,
          coinGeckoId: "persistence"
        }
      ],
      feeCurrencies: [
        {
          coinDenom: "XPRT",
          coinMinimalDenom: "uxprt",
          coinDecimals: 6,
          coinGeckoId: "persistence"
        }
      ],
      bech32Config: {
        bech32PrefixAccAddr: "persistence",
        bech32PrefixAccPub: "persistencepub",
        bech32PrefixValAddr: "persistencevaloper",
        bech32PrefixValPub: "persistencevaloperpub",
        bech32PrefixConsAddr: "persistencevalcons",
        bech32PrefixConsPub: "persistencevalconspub"
      }
    },
    {
      rpc: "https://rpc.devnet.cosmos.pstake.finance",
      rest: "https://rest.devnet.cosmos.pstake.finance",
      chainId: "gaiad-1",
      chainName: "pStake Cosmos Devnet",
      stakeCurrency: {
        coinDenom: "ATOM",
        coinMinimalDenom: "uatom",
        coinDecimals: 6,
        coinGeckoId: "cosmos"
      },
      bip44: {
        coinType: 118
      },
      currencies: [
        {
          coinDenom: "ATOM",
          coinMinimalDenom: "uatom",
          coinDecimals: 6,
          coinGeckoId: "cosmos"
        }
      ],
      feeCurrencies: [
        {
          coinDenom: "ATOM",
          coinMinimalDenom: "uatom",
          coinDecimals: 6,
          coinGeckoId: "cosmos"
        }
      ],
      bech32Config: {
        bech32PrefixAccAddr: "cosmos",
        bech32PrefixAccPub: "cosmospub",
        bech32PrefixValAddr: "cosmosvaloper",
        bech32PrefixValPub: "cosmosvaloperpub",
        bech32PrefixConsAddr: "cosmosvalcons",
        bech32PrefixConsPub: "persistencevalconspub"
      },
      gasPriceStep: {
        low: 0.0,
        average: 0.0,
        high: 0.0
      }
    }
  ],
  Testnet: [
    {
      rpc: "https://rpc.testnet.persistence.one",
      rest: "https://rest.testnet.persistence.one/",
      chainId: "test-core-1",
      chainName: "Persistence test-net",
      stakeCurrency: {
        coinDenom: "XPRT",
        coinMinimalDenom: "uxprt",
        coinDecimals: 6,
        coinGeckoId: "persistence"
      },
      bip44: {
        coinType: 118
      },
      currencies: [
        {
          coinDenom: "XPRT",
          coinMinimalDenom: "uxprt",
          coinDecimals: 6,
          coinGeckoId: "persistence"
        },
        {
          coinDenom: "STKATOM",
          coinMinimalDenom: "stk/uatom",
          coinDecimals: 6,
          coinGeckoId: "persistence"
        }
      ],
      feeCurrencies: [
        {
          coinDenom: "XPRT",
          coinMinimalDenom: "uxprt",
          coinDecimals: 6,
          coinGeckoId: "persistence"
        }
      ],
      bech32Config: {
        bech32PrefixAccAddr: "persistence",
        bech32PrefixAccPub: "persistencepub",
        bech32PrefixValAddr: "persistencevaloper",
        bech32PrefixValPub: "persistencevaloperpub",
        bech32PrefixConsAddr: "persistencevalcons",
        bech32PrefixConsPub: "persistencevalconspub"
      },
      gasPriceStep: {
        low: 0.0,
        average: 0.01,
        high: 0.025
      }
    },
    {
      rpc: "https://rpc.testnet-cosmos.audit.one",
      rest: "https://rest.testnet-cosmos.audit.one",
      chainId: "theta-testnet-001",
      chainName: "pStake Cosmos Testnet",
      stakeCurrency: {
        coinDenom: "ATOM",
        coinMinimalDenom: "uatom",
        coinDecimals: 6,
        coinGeckoId: "cosmos"
      },
      bip44: {
        coinType: 118
      },
      currencies: [
        {
          coinDenom: "ATOM",
          coinMinimalDenom: "uatom",
          coinDecimals: 6,
          coinGeckoId: "cosmos"
        }
      ],
      feeCurrencies: [
        {
          coinDenom: "ATOM",
          coinMinimalDenom: "uatom",
          coinDecimals: 6,
          coinGeckoId: "cosmos"
        }
      ],
      bech32Config: {
        bech32PrefixAccAddr: "cosmos",
        bech32PrefixAccPub: "cosmospub",
        bech32PrefixValAddr: "cosmosvaloper",
        bech32PrefixValPub: "cosmosvaloperpub",
        bech32PrefixConsAddr: "cosmosvalcons",
        bech32PrefixConsPub: "persistencevalconspub"
      }
    }
  ],
  Mainnet: [
    {
      rpc: "https://rpc.cosmoshub-4.audit.one/",
      rest: "https://rest.cosmoshub-4.audit.one/",
      chainId: "cosmoshub-4",
      chainName: "Cosmos Hub",
      stakeCurrency: {
        coinDenom: "ATOM",
        coinMinimalDenom: "uatom",
        coinDecimals: 6,
        coinGeckoId: "cosmos"
      },
      bip44: {
        coinType: 118
      },
      currencies: [
        {
          coinDenom: "ATOM",
          coinMinimalDenom: "uatom",
          coinDecimals: 6,
          coinGeckoId: "cosmos"
        }
      ],
      feeCurrencies: [
        {
          coinDenom: "ATOM",
          coinMinimalDenom: "uatom",
          coinDecimals: 6,
          coinGeckoId: "cosmos"
        }
      ],
      bech32Config: {
        bech32PrefixAccAddr: "cosmos",
        bech32PrefixAccPub: "cosmospub",
        bech32PrefixValAddr: "cosmosvaloper",
        bech32PrefixValPub: "cosmosvaloperpub",
        bech32PrefixConsAddr: "cosmosvalcons",
        bech32PrefixConsPub: "persistencevalconspub"
      }
    },
    {
      rpc: "https://rpc.core.persistence.one/",
      rest: "https://rest.core.persistence.one/",
      chainId: "core-1",
      chainName: "Persistence",
      stakeCurrency: {
        coinDenom: "XPRT",
        coinMinimalDenom: "uxprt",
        coinDecimals: 6,
        coinGeckoId: "persistence"
      },
      bip44: {
        coinType: 750
      },
      currencies: [
        {
          coinDenom: "XPRT",
          coinMinimalDenom: "uxprt",
          coinDecimals: 6,
          coinGeckoId: "persistence"
        },
        {
          coinDenom: "STKATOM",
          coinMinimalDenom: "stk/uatom",
          coinDecimals: 6,
          coinGeckoId: "persistence"
        }
      ],
      feeCurrencies: [
        {
          coinDenom: "XPRT",
          coinMinimalDenom: "uxprt",
          coinDecimals: 6,
          coinGeckoId: "persistence"
        }
      ],
      bech32Config: {
        bech32PrefixAccAddr: "persistence",
        bech32PrefixAccPub: "persistencepub",
        bech32PrefixValAddr: "persistencevaloper",
        bech32PrefixValPub: "persistencevaloperpub",
        bech32PrefixConsAddr: "persistencevalcons",
        bech32PrefixConsPub: "persistencevalconspub"
      },
      gasPriceStep: {
        low: 0.0,
        average: 0.0,
        high: 0.0
      }
    }
  ]
};
