import React from "react";
import Counter from "../componenets/Counter";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { decrease, increase, setDiff } from "../modules/counter";

/* store.getState() => useSelector의 state
	{
		counter: {number: 0, diff: 1},
		todos: []
	}
*/
export default function CounterContainer() {
  //useSelector 상태를 조회하는 훅_ 현재 계속 새로운 객체를 생성하여 불러오는 형태(매번 렌더링이 발생함)
  const { number, diff } = useSelector(
    (state) => ({
      number: state.counter.number,
      diff: state.counter.diff,
    }),
    shallowEqual //equalityFn (prev, next비교) 최적화-1
  ); //useSelector를 여러개 분리하여 선언 최적화-2

  //action을 생성하고__increase(), action을 발생__dispatch!
  const dispatch = useDispatch();
  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = (diff) => dispatch(setDiff(diff));
  return <Counter {...{ number, diff, onIncrease, onDecrease, onSetDiff }} />;
}
