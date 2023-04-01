import React from 'react';
import { useSelector } from 'react-redux';
import Todo from './Todo';
import style from './Todos.module.css';

function Todos() {
  const { todos, error, status } = useSelector((state) => state.todosReducer);
  const todosArr = Object.entries(todos);
  return (
    <div className={style.todos_list}>
      {status == 'loading' ? <p>{status}</p> : null}
      {error == null ? null : <p>{error}</p>}
      {todosArr.map((item) => {
        return (
          <Todo
            key={Math.random(1 - 100)}
            date={item[1].date}
            text={item[1].text}
            completed={item[1].completed}
            id={item[0]}
          />
        );
      })}
    </div>
  );
}

export default Todos;
