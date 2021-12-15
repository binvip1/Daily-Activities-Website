import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

function TodoList() {
  const [search, setSearch] = useState('');
  const [todos, setTodos] = useState([]);
  const [type, setType] = useState("All");
  var tags = todos === [] ? [] : Array.from(new Set(todos.map((a) => a.tag)));
  tags.push("All");
  var text = todos === [] ? [] : todos.map((a) => a.text);
  

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const moveToDodown = (id) => {
    let arr = [...todos];
    let index = arr.findIndex((item) => item.id === id);
    if (index === arr.length - 1) {
      return;
    }
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    setTodos(arr);
  };

  const moveToDoup = (id) => {
    let arr = [...todos];
    let index = arr.findIndex((item) => item.id === id);
    if (index === 0) {
      return;
    }

    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    setTodos(arr);
  };

  const filteredData = React.useMemo(() => {
    if (type === "All") return todos;
    return todos.filter((item) => item.tag === type);
  });

  const filteredSearch = React.useMemo(() => {
    if (search === '') return todos;
    return todos.filter((item) => item.text === search)
  })

  return (
    <>
      <h1>To Do List</h1>
      <TodoForm onSubmit={addTodo} />
      <div style={{ float: "left" }}>
        {tags.map((tag, index) => (
          <button
            className="tag-button"
            value={tag}
            onClick={(e) => setType(e.target.value)}
          >
            {tag}
          </button>
        ))}
      </div>
      <input className="searchBar"
        placeholder="Search"
        value={search}
        onChange={(event) => 
          setSearch(event.target.value)
        }
      />
      <Todo
        todos={filteredData.filter(value => filteredSearch.includes(value))}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        moveToDodown={moveToDodown}
        moveToDoup={moveToDoup}
      />
    </>
  );
}

export default TodoList;
