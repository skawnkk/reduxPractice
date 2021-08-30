import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { startLoading, finishLoading } from "./loading";
import * as api from "../lib/api";

export const GET_POST = "sample/GET_POST";
export const GET_POST_ASYNC = "sample/GET_POST_ASYNC";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

export const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "sample/GET_USERS_FAILURE";
// export const getPost = createAction(GET_POST, (id) => id);
export const getPostAsync = createAction(GET_POST_ASYNC, (id) => id);
export const getUsers = createAction(GET_USERS);

export const getPost = (id) => async (dispatch) => {
  console.log("?", id);
  dispatch({ type: GET_POST });
  try {
    const response = await api.getPostById(id);
    dispatch({ type: GET_POST_SUCCESS, payload: response.data });
  } catch (e) {
    dispatch({ type: GET_POST_FAILURE, payload: e, error: true });
    throw e;
  }
};
function* getPostSaga(action) {
  console.log("getPostSaga");
  // yield put(startLoading(GET_POST));
  yield put({ type: GET_POST });
  try {
    const post = yield call(api.getPostById, action.payload);
    yield put({ type: GET_POST_SUCCESS, payload: post.data });
  } catch (e) {
    yield put({ type: GET_POST_FAILURE, payload: e.message, error: true });
  }

  // yield put(finishLoading(GET_POST));
}

function* getUsersSaga() {
  console.log("user");
  // yield put(startLoading(GET_USERS));
  yield put({ type: GET_USERS });
  try {
    const users = yield call(api.getUsers);
    yield put({ type: GET_USERS_SUCCESS, payload: users.data });
  } catch (e) {
    yield put({ type: GET_USERS_FAILURE, payload: e.message, error: true });
  }
}

export function* sampleSaga() {
  console.log("sampleSaga");
  yield takeLatest(GET_POST_ASYNC, getPostSaga);
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}

const initialState = {
  loading: { GET_POST: false, GET_USERS: false },
  post: null,
  users: null,
};

const sample = handleActions(
  {
    [GET_POST]: (state) => ({
      ...state,
      loading: { ...state.loading, GET_POST: true },
    }),
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: { ...state.loading, GET_POST: false },
      post: action.payload,
    }),
    [GET_POST_FAILURE]: (state) => ({
      ...state,
      loading: { ...state.loading, GET_POST: false },
    }),
    [GET_USERS]: (state) => ({
      ...state,
      loading: { ...state.loading, GET_USERS: true },
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      loading: { ...state.loading, GET_USERS: false },
      users: action.payload,
    }),
    [GET_USERS_FAILURE]: (state) => ({
      ...state,
      loading: { ...state.loading, GET_USERS: false },
    }),
  },
  initialState
);
export default sample;
