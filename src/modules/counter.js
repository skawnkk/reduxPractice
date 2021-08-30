import { createAction, handleAction } from "redux-actions";
import {
  delay,
  put,
  takeEvery,
  takeLatest,
  takeLeading,
} from "redux-saga/effects";

//*액션타입정의
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const INCREASE_ASYNC = "counter/INCREASE_ASYNC";
const DECREASE_ASYNC = "counter/DECREASE_ASYNC";
//*액션생성함수
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

function* increaseSaga() {
  console.log("saga");
  yield delay(1000);
  yield put(increase()); //put == dispatch
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

export function* counterSaga() {
  yield takeLeading(INCREASE_ASYNC, increaseSaga); //모든요청마다 반응
  yield takeLatest(DECREASE_ASYNC, decreaseSaga); //가장 마지막 요청에 대해 반응
}
//*모듈초기상태
const initialState = 0;

//* 리듀서
export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
}

// export default const counter = handleAction(
//   { [INCREASE]: (state) => state + 1,
//     [DECREASE]: (state) => state - 1 },
//   initialState
// );
