import { combineReducers } from "redux";
import counter, { counterSaga } from "./counter";
import { all } from "redux-saga/effects";
import todos from "./todos";
import modal from "./modal";

const rootReducer = combineReducers({ counter, todos, modal });
export function* rootSaga() {
  yield all([counterSaga()]); //saga를 배열안에 추가
}
export default rootReducer;
