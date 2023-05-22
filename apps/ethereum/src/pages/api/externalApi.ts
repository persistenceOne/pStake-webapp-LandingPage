import Axios from "axios";

export const coingeckoTokenApi =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum";

export const fetchTokensInfo = async (): Promise<number> => {
  try {
    const res = await Axios.get(coingeckoTokenApi);
    if (res && res.data) {
      return Number(res.data[0].current_price);
    }
    return 0;
  } catch (e) {
    console.log(e, "error in fetch tokens");
    return 0;
  }
};
