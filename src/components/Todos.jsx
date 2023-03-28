import React from 'react';
import { useSelector } from 'react-redux';
import Todo from './Todo';
import style from './Todos.module.css';

function Todos() {
  const { todos, error, status } = useSelector((state) => state.todosReducer);
  return (
    <div className={style.todos_list}>
      {status == 'loading' ? <p>{status}</p> : null}
      {error == null ? null : <p>{error}</p>}
      {todos.map((item) => {
        return (
          <Todo
            key={Math.random(1 - 100)}
            date={item.date}
            text={item.text}
            id={item.id}
          />
        );
      })}
    </div>
  );
}

export default Todos;
