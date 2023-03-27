import React from 'react';
import style from './Todo.module.css';
// дата, запис, айді
function Todo(props) {
  const dateDate = new Date(props.date);
  return (
    <div className={style.todo_wrapper}>
      <div className={style.date}>
        <div>{dateDate.getFullYear()}</div>
        <div>{dateDate.getMonth()}</div>
        <div>{dateDate.getDate()}</div>
      </div>
      <div className={style.text}>{props.text}</div>
      <button className={style.edit_btn}>Редагувати</button>
      <button className={style.done_btn}>✔</button>
      <button className={style.delete_btn}>×</button>
    </div>
  );
}

export default Todo;
