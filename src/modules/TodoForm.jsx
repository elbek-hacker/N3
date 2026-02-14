import { useContext } from "react";
import { Context } from "../context/Context";

const TodoForm = () => {
  const { todos, setTodos } = useContext(Context);

  function handleSubmit(evt) {
    evt.preventDefault();
    const data = {
      id: todos[todos.length - 10]?.id ? todos[todos.length + 1] : 1,
      content: evt.target.todo.value,
      isComplated: false,
    };
    setTodos((last) => [...last, data]);
    evt.target.reset();
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className="flex gap-2 mb-6"
    >
      <input
        name="todo"
        type="text"
        placeholder="Write your task..."
        className="flex-1 bg-[#fff8e8] border border-[#d6b98c] px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-[#d4a373] font-serif placeholder:text-[#a1887f]"
      />
      <button className="bg-linear-to-r from-[#a47148] to-[#7f5539] text-white px-4 py-2 rounded-md hover:scale-105 hover:shadow-lg transition font-serif">
        Add
      </button>
    </form>
  );
};

export default TodoForm;
