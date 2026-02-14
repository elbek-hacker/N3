import React, { useContext } from "react";
import TodoItem from "../components/TodoItem";
import { Context } from "../context/Context";

const TodoList = () => {
  const { todos, setTodos } = useContext(Context);
  return (
    <ul className="space-y-3">
      {todos.map((item, index) => (
        <TodoItem key={index} item={item} index={index} />
      ))}
    </ul>
  );
};

export default TodoList;
