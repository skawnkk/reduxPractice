//*액션타입정의
const SET_DIFF = 'counter/SET_DIFF'; //다른 모듈과의 네이밍 중복을 피하기 위해 COUNTER접두사를 붙였음 (덕스패턴)
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

//*액션생성함수
export const setDiff = (diff) => ({ type: SET_DIFF, diff });
export const increase = (diff) => ({ type: INCREASE });
export const decrease = (diff) => ({ type: DECREASE });

//*모듈초기상태
const initialState = { number: 0, diff: 1 };

//* 리듀서
export default function counter(state = initialState, action) {
  switch (action.type) {
    case SET_DIFF:
      return { ...state, diff: action.diff };
    case INCREASE:
      return { ...state, number: state.number + state.diff };
    case DECREASE:
      return { ...state, number: state.number - state.diff };
    default:
      return state;
  }
}
