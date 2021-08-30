import { combineReducers } from "redux";
import counter, { counterSaga } from "./counter";
import { all } from "redux-saga/effects";
import todos from "./todos";
import modal from "./modal";
import posts from "./posts";
import sample, { sampleSaga } from "./sample";
import loading from "./loading";
const rootReducer = combineReducers({
  counter,
  todos,
  modal,
  posts,
  sample,
  loading,
});
export function* rootSaga() {
  yield all([counterSaga(), sampleSaga()]); //saga를 배열안에 추가
}
export default rootReducer;
