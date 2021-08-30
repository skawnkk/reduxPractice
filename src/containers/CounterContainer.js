import React from "react";
import Counter from "../componenets/Counter";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { decreaseAsync, increaseAsync } from "../modules/counter";

export default function CounterContainer() {
  const number = useSelector((state) => state.counter);

  const dispatch = useDispatch();
  const onIncrease = () => dispatch(increaseAsync());
  const onDecrease = () => dispatch(decreaseAsync());
  return <Counter {...{ number, onIncrease, onDecrease }} />;
}
