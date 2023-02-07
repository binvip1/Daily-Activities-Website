import React from "react";
import "./App.css";
import TodoList from "./components/TodoList";

export default function TodoApp() {
  return (
    <div>
      <h1>Todo App</h1>
      <div className="todo-app">
        <TodoList />
      </div>
    </div>
  );
}
