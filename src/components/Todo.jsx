import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchModal } from '../app/modalSlice';
import { completeTodo, deleteTodo } from '../app/todoSlice';
import EditModal from './EditModal';
import style from './Todo.module.css';

function Todo(props) {
  const modalTarget = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();
  const dateDate = new Date(props.date);
  let color = 'green',
    text = 'none';
  if (props.completed == true) {
    color = 'gray';
    text = 'line-through';
  }

  const zeroAdd = (number) => {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  };

  return (
    <div className={style.todo_wrapper}>
      <div className={style.date}>
        <div>{zeroAdd(dateDate.getDate())}</div>
        <div>{zeroAdd(dateDate.getMonth())}</div>
        <div>{dateDate.getFullYear()}</div>
        {modalTarget == props.id ? (
          <EditModal id={props.id} text={props.text} />
        ) : null}
      </div>
      <div style={{ textDecoration: text }} className={style.text}>
        {props.text}
      </div>
      <button
        onClick={() => {
          dispatch(switchModal(props.id));
        }}
        className={style.edit_btn}
      >
        Редагувати
      </button>
      <button
        style={{ backgroundColor: color }}
        onClick={() => {
          dispatch(completeTodo(props.id));
        }}
        className={style.done_btn}
      >
        ✔
      </button>
      <button
        onClick={() => {
          dispatch(deleteTodo(props.id));
        }}
        className={style.delete_btn}
      >
        ×
      </button>
    </div>
  );
}

export default Todo;
