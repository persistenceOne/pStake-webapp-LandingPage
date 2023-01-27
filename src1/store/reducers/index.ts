import { combineReducers } from "redux";
import balances from "./balances";
import stake from "./transactions/stake";
import initialData from "./initialData";
import liveData from "./liveData";
import transaction from "./transaction";
import unStake from "./transactions/unstake";
import deposit from "./transactions/deposit";
import claim from "./transactions/claim";
import mobileSidebar from "./sidebar";
import claimQueries from "./claim";
import withdraw from "./transactions/withdraw";

const reducers = combineReducers({
  balances,
  stake,
  initialData,
  transaction,
  unStake,
  deposit,
  mobileSidebar,
  claimQueries,
  claim,
  withdraw,
  liveData
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
