import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo } from "../modules/todos";
import Todos from "../componenets/Todos";

function TodosContainer() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const onCreate = useCallback((text) => dispatch(addTodo(text)), [dispatch]);
  const onToggle = useCallback((id) => dispatch(toggleTodo(id)), [dispatch]);
  return (
    <div>
      <Todos todos={todos} onCreate={onCreate} onToggle={onToggle} />
    </div>
  );
}

export default TodosContainer;
