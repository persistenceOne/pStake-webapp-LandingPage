import { IBCChainInfo } from "../context/WalletConnect/types";
import { ChainInfo } from "@keplr-wallet/types";

const env: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

interface ExternalChainData {
  [index: string]: ChainInfo[];
}

export type IBCChainData = {
  [index: string]: IBCChainInfo[];
};

export const GasInfo = {
  gas: 250000,
  minGas: 80000,
  maxGas: 2000000
};

export const FeeInfo = {
  lowFee: 0,
  averageFee: 0.025,
  highFee: 0.04,
  defaultFee: "5000",
  vestingAccountFee: "0"
};

export const IBCConfiguration = {
  timeoutTimestamp: 1000,
  ibcRevisionHeightIncrement: 1000,
  ibcRemoteHeightIncrement: 150,
  ibcDefaultPort: "transfer"
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

export const IBCChainInfos: IBCChainData = {
  Devnet: [
    {
      counterpartyChainId: "gaiad-1",
      chainName: "Cosmos Testnet",
      sourceChannelId: "channel-0",
      destinationChannelId: "channel-0",
      portID: "transfer",
      coinDenom:
        "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2",
      prefix: "cosmos"
    }
  ],
  Testnet: [
    {
      counterpartyChainId: "theta-testnet-001",
      chainName: "pStake Cosmos Testnet",
      sourceChannelId: "channel-667",
      destinationChannelId: "channel-105",
      portID: "transfer",
      coinDenom:
        "ibc/4A17832B26BF318D052563EFFE677C1DE11DF8CE104F00204860F3E3439818B2",
      prefix: "cosmos"
    }
  ],
  Mainnet: [
    {
      counterpartyChainId: "cosmoshub-4",
      chainName: "Cosmos Hub",
      sourceChannelId: "channel-190",
      destinationChannelId: "channel-24",
      portID: "transfer",
      coinDenom:
        "ibc/C8A74ABBE2AF892E15680D916A7C22130585CE5704F9B17A10F184A90D53BECA",
      prefix: "cosmos"
    }
  ]
};

export const ExternalChains: ExternalChainData = {
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
        },
        {
          coinDenom: "PSTAKE",
          coinMinimalDenom: "PSTAKE",
          coinDecimals: 18,
          coinGeckoId: "pstake"
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
      rpc: "https://rpc.cosmos.audit.one/",
      rest: "https://rest.cosmos.audit.one/",
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

export const PollingConfig = {
  initialTxHashQueryDelay: 5000,
  scheduledTxHashQueryDelay: 5000,
  numberOfRetries: 60
};
