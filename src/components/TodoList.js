import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import axios from 'axios';

function TodoList() {
  const [search, setSearch] = useState('');
  const [todos, setTodos] = useState([]);
  const [type, setType] = useState("All");
  const [toBeFetched, setToBeFetched] = useState(true);
  var tags = todos === [] ? [] : Array.from(new Set(todos.map((a) => a.tag)));
  tags.push("All");
  var text = todos === [] ? [] : todos.map((a) => a.text);
  
  useEffect(() => {
    axios.get('http://localhost:3004/items').then((res) => {
      setTodos(
        res.data.map((item) => {
          return {
            ...item,
          };
        })
      );
    });
  }, [toBeFetched]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    axios
      .post('http://localhost:3004/items', todo)
      .then(() => setToBeFetched(!toBeFetched));
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    axios
      .put(`http://localhost:3004/items/${todoId}`, newValue)
      .then(() => setToBeFetched(!toBeFetched));
  };

  const removeTodo = (id) => {
    axios
      .delete(`http://localhost:3004/items/${id}`)
      .then(() => setToBeFetched(!toBeFetched));
  };

  const completeTodo = (id) => {
    todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
        updateTodo(id, todo);
      }
      return todo;
    });
  };

  const moveToDodown = (id) => {
    let data = [...todos];
    let index = data.findIndex((item) => item.id === id);
    if (index === data.length - 1) {
      return;
    }

    updateTodo(data[index + 1].id, data[index]);
    updateTodo(data[index].id, data[index + 1]);
  };

  const moveToDoup = (id) => {
    let data = [...todos];
    let index = data.findIndex((item) => item.id === id);
    if (index === 0) {
      return;
    }

    updateTodo(data[index - 1].id, data[index]);
    updateTodo(data[index].id, data[index - 1]);
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
