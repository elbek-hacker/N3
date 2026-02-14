import { createContext, useState } from "react";

const Context = createContext();

const TodoContext = ({ children }) => {
  const [todos, setTodos] = useState([]);
  return (
    <Context.Provider value={{ todos, setTodos }}>{children}</Context.Provider>
  );
};
export { Context, TodoContext };
