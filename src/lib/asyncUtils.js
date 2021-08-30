import { call, put } from "redux-saga/effects";

export const reducerUtils = {
  initial: (data = null) => ({
    data,
    loading: false,
    error: null,
  }),
  loading: (prevState = null) => ({
    data: prevState,
    loading: true,
    error: null,
  }),
  success: (data) => ({
    data,
    loading: false,
    error: null,
  }),
  error: (error) => ({
    data: null,
    loading: false,
    error,
  }),
};

const { loading, success, error } = reducerUtils;
export const handleAsyncActions = (type, key, keepData) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  const reducer = (state, action) => {
    switch (action.type) {
      case type:
        return { ...state, [key]: loading(keepData ? state[key].data : null) };
      case SUCCESS:
        return { ...state, [key]: success(action.payload) };
      case ERROR:
        return { ...state, [key]: error(action.error) };
      default:
        return state;
    }
  };
  return reducer;
};
export const handleAsyncActionsById = (type, key, keepData) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  const reducer = (state, action) => {
    const id = action.meta;
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: loading(keepData ? state[key][id]?.data : null),
          },
        };
      case SUCCESS:
        return {
          ...state,
          [key]: { ...state[key], [id]: success(action.payload) },
        };
      case ERROR:
        return {
          ...state,
          [key]: { ...state[key], [id]: error(action.error) },
        };
      default:
        return state;
    }
  };
  return reducer;
};

export const createPromiseSaga = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action) {
    try {
      const result = yield call(promiseCreator, action.payload);
      yield put({ type: SUCCESS, payload: result });
    } catch (e) {
      yield put({ type: ERROR, payload: e, error: true });
    }
  };
};
export const createPromiseSagaById = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action) {
    const id = action.meta;
    try {
      const result = yield call(promiseCreator, action.payload);
      yield put({ type: SUCCESS, payload: result, meta: id });
    } catch (e) {
      yield put({ type: ERROR, payload: e, meta: id, error: true });
    }
  };
};
export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (param) => async (dispatch) => {
    dispatch({ type });
    try {
      const payload = await promiseCreator(param);
      dispatch({ type: SUCCESS, payload });
    } catch (e) {
      dispatch({ type: ERROR, payload: e, error: true });
    }
  };
};

const defaultIdSelector = (param) => param;
export const createPromiseThunkById = (
  type,
  promiseCreator,
  idSelector = defaultIdSelector
) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  const thunkCreator = (param) => async (dispatch) => {
    const id = idSelector(param);
    dispatch({ type, meta: id });
    try {
      const payload = await promiseCreator(param);
      dispatch({ type: SUCCESS, payload, meta: id });
    } catch (e) {
      dispatch({ type: ERROR, payload: e, error: true, meta: id });
    }
  };
  return thunkCreator;
};
