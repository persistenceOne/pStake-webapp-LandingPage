export const ETH = "ETH";
export const STK_ETH = "stkETH";
export const ETHEREUM = "Ethereum";
export const OPTIMISM = "Optimism";
export const ETH_TOKEN_DECIMALS = 18;
export const TOKEN_BALANCE = "tokenBalance";
export const META_MASK = "Metamask";
export const DEVELOPMENT = "development";
export const TVL = "tvl";
export const TOTAL_APY = "total_apy";
export const LATEST = "latest";
export const ETH_REQUEST_ACCOUNTS = "eth_requestAccounts";
export const GA_TRACKING_ID = "G-53Y9MZ1BYN";
export const GAS_LIMIT = 12000000;
// TODO(fixme): This should always be fetch from contract. Shouldn't be a constant here.
export const COOLDOWN_PERIOD = 15;

export const SECONDS_IN_A_DAY = 86400;

/**
 * Currently blocks being confirmed in a day is close to 40K
 * So for 15 days we have 15 * 40K close to 600000 blocks
 * So block range > 600000 * 3 should be large enough to accommodate the last 2 rewards event
 * **/
export const BLOCKS_TO_QUERY_FOR_APY_CALCULATION = 2000000;

export const SHORT_INTERVAL = 10000;

export const MID_INTERVAL = 60000;

export const LONG_INTERVAL = 3600000;

export const ANALYTICS_MEASURE_ID = "G-53Y9MZ1BYN";

export const SET_TRANSACTION_IN_PROGRESS = "SET_TRANSACTION_IN_PROGRESS";
export const CLAIM = "claim";
export const STAKE = "stake";
export const UNSTAKE = "unstake";
export const START_CLAIM = "START_CLAIM";
export const START_UNSTAKE = "START_UNSTAKE";
export const START_STAKE = "START_STAKE";
export const FATAL = "fatal";

// Error Constants
export const WALLET_ERROR = "Connection failed";
export const METAMASK_ERROR = "Metamask error";
export const UNSUPPORTED_NETWORK = "Unsupported network";
