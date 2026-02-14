import React, { useContext } from "react";
import { Context } from "../context/Context";

function TodoItem({ item, index }) {
  const { todos, setTodos } = useContext(Context);

  function handleEdit(ind) {
    const newValue = prompt(
      `You are editing: "${todos[ind].content}". Enter new text:`
    );
    todos[ind].content = newValue;
    setTodos((last) => [...last]);
  }

  function handleStatusChange(evt, ind) {
    todos[ind].isComplated = evt.target.checked;
    setTodos((last) => [...last]);
  }

  function handleDelete(ind) {
    const confirmDel = confirm("Are you sure you want to delete this one❓❓❓");
    if (confirmDel) {
      todos.splice(ind, 1);
      setTodos((last) => [...last]);
    }
  }

  return (
    <li className="flex items-center justify-between bg-[#fff8e8] border border-[#d6b98c] p-3 rounded-md shadow-inner hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <input
          onChange={(evt) => handleStatusChange(evt, index)}
          checked={item.isComplated}
          type="checkbox"
          className="w-5 h-5 accent-[#7f5539]"
        />
        <span className="font-serif tracking-wide text-[#4a2c2a]">
          {item.content}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(index)}
          className="bg-[#c08962] text-white px-3 py-1 rounded-md hover:bg-[#a47148] hover:scale-105 transition text-sm font-serif shadow"
        >
          EDIT
        </button>
        <button
          onClick={() => handleDelete(index)}
          className="bg-[#9d3c3c] text-white px-3 py-1 rounded-md hover:bg-[#7f1d1d] hover:scale-105 transition text-sm font-serif shadow"
        >
          DELETE
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
