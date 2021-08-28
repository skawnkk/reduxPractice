import React from "react";
import Counter from "../componenets/Counter";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { decrease, increase, setDiff } from "../modules/counter";

/* store.getState() => useSelector의 state
	{
		counter: {number: 0, diff: 1},
		/todos: []
	}
*/
export default function CounterContainer() {
  const { number, diff } = useSelector(
    (state) => ({
      number: state.counter.number,
      diff: state.counter.diff,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();
  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = (diff) => dispatch(setDiff(diff));
  return <Counter {...{ number, diff, onIncrease, onDecrease, onSetDiff }} />;
}
