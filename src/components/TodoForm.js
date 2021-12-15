import React, { useState } from 'react';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const [tag, setTag] = useState(props.edit ?  props.edit.tag : '');


  const handleTag = e => {
    setTag(e.target.value);
  }


  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      tag: tag === '' ? 'None' : tag
    });
    setInput('');
    setTag('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input edit'
          />
          <input
            placeholder='Update your tag'
            value={tag}
            onChange={handleTag}
            name='text'
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='What do you need to do?'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
          />
          <input
            placeholder='add tag?'
            value={tag}
            onChange={handleTag}
            name='text'
            className='todo-input'
          />
          <br/>
          <button onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;