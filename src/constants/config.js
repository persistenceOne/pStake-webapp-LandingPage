export const PSTAKE_TWITTER_URL = "https://twitter.com/pStakeFinance";
export const PSTAKE_TELEGRAM_URL = "https://t.me/pstakefinance";
export const PSTAKE_YOUTUBE_URL =
  "https://www.youtube.com/channel/UC5wqI1ZRdkCjWWVOCQdhxLQ/featured";
export const PSTAKE_REDDIT_URL = "https://www.reddit.com/r/PersistenceOne/";
export const PSTAKE_DISCORD_URL = "https://discord.gg/vyvp3scWnH";
export const PSTAKE_GITHUB_URL = "https://github.com/persistenceOne";

export const CHAIN = {
  Testnet: {
    networkID: 3,
    inflationPeriod: 365,
    stkETHDeployTxHash: "0xa532ae226472c1d38bc643046c5e6816e04c5b50e4785ad1ddf8db9efcd421be",
    ethAPR: "~4.05",
    bnbAPR: "~5.2",
    solURL:"https://stksol-ui.auditdev.workers.dev/",
    avaxURL:"https://stk-avax-ui.auditdev.workers.dev/",
    ethURL: "https://testnet.eth.pstake.finance/",
    bnbURL: "https://testnet.bnb.pstake.finance/",
    atomURL: "https://testnet.cosmos.pstake.finance/",
    xprtURL: "https://testnet.cosmos.pstake.finance/",
    DEFILAMA_API: "https://api.llama.fi/protocol/pstake",
    getETHPrice: "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD",
    ethplorerAPI: "https://api.ethplorer.io/getTokenInfo/",
    SmartContracts: {
      StkETH: "StkEth",
      STokens: "STokensV2",
      STokensXPRT: "STokensXPRT",
    },
    CONTRACT_ADDRESSES: {
      StkEth: "0x20cD69d52164e2707A90C1C5fA7f95e8943ae72F",
      StkATOM: "0xA0e5c263cDC9EE2BFd06910D436dB5B51831135E",
      StkXPRT: "0x048546d9Df54b5cD1d7631484453b0ce8D13f17B",
    },
    holderCountAPI:{
      eth: "https://api.persistence.one/ethplorer/getTokenInfo/eth",
      atom: "https://api.persistence.one/ethplorer/getTokenInfo/atom",
      xprt: "https://api.persistence.one/ethplorer/getTokenInfo/xprt",
    }
  },
  Staging: {
    networkID: 1,
    inflationPeriod: 365,
    stkETHDeployTxHash: "0x5cfe093883b26ca810ab4a2cf074244c2493a14371c0a24a068efe864ef97c67",
    ethAPR: "~4.05",
    bnbAPR: "~5.2",
    ethURL: "https://staging.eth.pstake.finance/",
    atomURL: "https://staging.cosmos.pstake.finance/",
    xprtURL: "https://staging.cosmos.pstake.finance/",
    bnbURL: "https://staging.bnb.pstake.finance/",
    DEFILAMA_API: "https://api.llama.fi/protocol/pstake",
    ethplorerAPI: "https://api.ethplorer.io/getTokenInfo/",
    getETHPrice:
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD",
    SmartContracts: {
      StkETH: "StkEth",
      STokens: "STokensV2",
      STokensXPRT: "STokensXPRTV2",
    },
    CONTRACT_ADDRESSES: {
      StkEth: "0x2C5Bcad9Ade17428874855913Def0A02D8bE2324",
      StkATOM: "0x44017598f2AF1bD733F9D87b5017b4E7c1B28DDE",
      StkXPRT: "0x45e007750Cc74B1D2b4DD7072230278d9602C499",
    },
    holderCountAPI:{
      eth: "https://api.persistence.one/ethplorer/getTokenInfo/eth",
      atom: "https://api.persistence.one/ethplorer/getTokenInfo/atom",
      xprt: "https://api.persistence.one/ethplorer/getTokenInfo/xprt",
    }
  },
  Mainnet: {
    networkID: 1,
    inflationPeriod: 365,
    stkETHDeployTxHash: "0x5cfe093883b26ca810ab4a2cf074244c2493a14371c0a24a068efe864ef97c67",
    ethAPR: "~4.05",
    bnbAPR: "~5.2",
    ethURL: "https://eth.pstake.finance/",
    atomURL: "https://cosmos.pstake.finance/",
    xprtURL: "https://cosmos.pstake.finance/",
    bnbURL: "https://bnb.pstake.finance/",
    DEFILAMA_API: "https://api.llama.fi/protocol/pstake",
    ethplorerAPI: "https://api.ethplorer.io/getTokenInfo/",
    getETHPrice:
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD",
    SmartContracts: {
      StkETH: "StkEth",
      STokens: "STokensV2",
      STokensXPRT: "STokensXPRTV2",
    },
    CONTRACT_ADDRESSES: {
      StkEth: "0x2C5Bcad9Ade17428874855913Def0A02D8bE2324",
      StkATOM: "0x44017598f2AF1bD733F9D87b5017b4E7c1B28DDE",
      StkXPRT: "0x45e007750Cc74B1D2b4DD7072230278d9602C499",
    },
    holderCountAPI:{
      eth: "https://api.persistence.one/ethplorer/getTokenInfo/eth",
      atom: "https://api.persistence.one/ethplorer/getTokenInfo/atom",
      xprt: "https://api.persistence.one/ethplorer/getTokenInfo/xprt",
    }
  },
};
