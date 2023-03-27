import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../app/todoSlice';
import style from './Input.module.css';

function Input() {
  const inputText = useRef();
  const dispatch = useDispatch();

  const addTodoHandler = async (e) => {
    e.preventDefault();

    let todo = {
      date: new Date(),
      text: inputText.current.value,
    };

    const response = await fetch(
      'https://test-http-77e4b-default-rtdb.europe-west1.firebasedatabase.app/todo.json',
      { method: 'POST', body: JSON.stringify(todo) }
    );
    console.log(response);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(
          addTodo({
            text: inputText.current.value,
            date: new Date().toISOString(),
          })
        );
      }}
      className={style.input_wrapper}
    >
      <input ref={inputText} type="text" />
      <button>Додати задачу</button>
    </form>
  );
}

export default Input;
