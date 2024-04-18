import login_reducer from "./login_reducers";
import orders_reducers from "./orders_reducers";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  login_reducer,
  orders_reducers,
});

export default rootReducer;
