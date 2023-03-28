import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../app/todoSlice';
import style from './Input.module.css';

function Input() {
  const inputText = useRef();
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    let text = inputText.current.value;
    if (text.length > 0) {
      dispatch(
        addTodo({
          text: text,
          date: new Date().toISOString(),
        })
      );
      inputText.current.value = '';
    }
  };

  return (
    <form
      onSubmit={(e) => {
        addTodoHandler(e);
      }}
      className={style.input_wrapper}
    >
      <input ref={inputText} type="text" />
      <button>Додати задачу</button>
    </form>
  );
}

export default Input;
