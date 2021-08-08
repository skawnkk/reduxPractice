import React from 'react';
import Counter from '../componenets/Counter';
import { useSelector, useDispatch } from 'react-redux';
import { decrease, increase, setDiff } from '../modules/counter';

/* store.getState() => useSelector의 state
	{
		counter: {number: 0, diff: 1},
		todos: []
	}
*/
export default function CounterContainer() {
  //useSelector 상태를 조회하는 훅
  const { number, diff } = useSelector((state) => ({
    number: state.counter.number,
    diff: state.counter.diff,
  }));

  //action을 생성하고__increase(), action을 발생__dispatch!
  const dispatch = useDispatch();
  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = (diff) => dispatch(setDiff(diff));
  return <Counter {...{ number, diff, onIncrease, onDecrease, onSetDiff }} />;
}
