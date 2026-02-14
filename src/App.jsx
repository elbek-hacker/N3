import { useState } from "react";
import { TodoForm, TodoList } from "./modules";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#2b1b1b] via-[#3b2f2f] to-[#1a1111] p-6">
      <div className="w-full max-w-md bg-[#f8e7c9] text-[#3b2f2f] rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.7)] p-6 border border-[#e0c9a6]">
        <h1 className="text-3xl text-center mb-6 font-serif tracking-wide text-[#5a2d2d]">
          🕰️ Daily Notes
        </h1>
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
