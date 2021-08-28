import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";
import modal from "./modal";

const rootReducer = combineReducers({ counter, todos, modal });
export default rootReducer;
