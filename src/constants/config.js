export const PSTAKE_TWITTER_URL = "https://twitter.com/pStakeFinance";
export const PSTAKE_TELEGRAM_URL = "https://t.me/pstakefinance";
export const PSTAKE_YOUTUBE_URL =
  "https://www.youtube.com/channel/UC5wqI1ZRdkCjWWVOCQdhxLQ/featured";
export const PSTAKE_REDDIT_URL = "https://www.reddit.com/r/PersistenceOne/";
export const PSTAKE_DISCORD_URL = "https://discord.gg/vyvp3scWnH";
export const PSTAKE_GITHUB_URL = "";

export const CHAIN = {
  Testnet: {
    networkID: 3,
    inflationPeriod: 21,
    stkETHDeployTxHash:
      "0xa532ae226472c1d38bc643046c5e6816e04c5b50e4785ad1ddf8db9efcd421be",
    ethURL: "https://testnet.eth.pstake.finance/",
    atomURL: "https://testnet.app.pstake.finance/atom/",
    xprtURL: "https://testnet.app.pstake.finance/xprt/",
    SmartContracts: {
      StkETH: "StkEth",
      STokens: "STokensV2",
      STokensXPRT: "STokensXPRT",
    },
    CONTRACT_ADDRESSES: {
      StkEth: "0x20cD69d52164e2707A90C1C5fA7f95e8943ae72F",
    },
  },
  Staging: {
    networkID: 1,
    inflationPeriod: 365,
    stkETHDeployTxHash:
      "0x5cfe093883b26ca810ab4a2cf074244c2493a14371c0a24a068efe864ef97c67",
    ethURL: "https://staging.eth.pstake.finance/",
    atomURL: "https://staging.app.pstake.finance/atom/",
    xprtURL: "https://staging.app.pstake.finance/xprt/",
    SmartContracts: {
      StkETH: "StkEth",
      STokens: "STokensV2",
      STokensXPRT: "STokensXPRTV2",
    },
    CONTRACT_ADDRESSES: {
      StkEth: "0x2C5Bcad9Ade17428874855913Def0A02D8bE2324",
    },
  },
  Mainnet: {
    networkID: 1,
    inflationPeriod: 365,
    stkETHDeployTxHash:
      "0x5cfe093883b26ca810ab4a2cf074244c2493a14371c0a24a068efe864ef97c67",
    ethURL: "https://eth.pstake.finance/",
    atomURL: "https://app.pstake.finance/atom/",
    xprtURL: "https://app.pstake.finance/xprt/",
    SmartContracts: {
      StkETH: "StkEth",
      STokens: "STokensV2",
      STokensXPRT: "STokensXPRTV2",
    },
    CONTRACT_ADDRESSES: {
      StkEth: "0x2C5Bcad9Ade17428874855913Def0A02D8bE2324",
    },
  },
};
