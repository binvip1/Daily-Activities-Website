import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { AiOutlineEdit } from "react-icons/ai";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownSquareFill,
} from "react-icons/bs";
import {MdOutlineDeleteForever} from"react-icons/md"
const Todo = ({
  todos,
  completeTodo,
  removeTodo,
  updateTodo,
  moveToDoup,
  moveToDodown,
}) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
    tag: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
      tag: "",
    });
  };
  

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        <div>Task: {todo.text}</div>
        <div>Tag: {todo.tag}</div>
      </div>
      <div className="icons">
        <BsFillArrowUpCircleFill
          onClick={() => moveToDoup(todo.id)}
          className="delete-icon"
        />
        <BsFillArrowDownSquareFill
          onClick={() => moveToDodown(todo.id)}
          className="delete-icon"
        />
        <MdOutlineDeleteForever
          onClick={() => removeTodo(todo.id)}
          className="delete-icon"
        />
        <AiOutlineEdit
          onClick={() =>
            setEdit({ id: todo.id, value: todo.text, tag: todo.tag })
          }
          className="edit-icon"
        />
      </div>
    </div>
  ));
};

export default Todo;
