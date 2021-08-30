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
export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  const thunkCreator = (param) => async (dispatch) => {
    dispatch({ type });
    try {
      const payload = await promiseCreator(param);
      dispatch({ type: SUCCESS, payload });
    } catch (e) {
      dispatch({ type: ERROR, payload: e, error: true });
    }
  };
  return thunkCreator;
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
