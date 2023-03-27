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
        let temp = Object.values(item);
        let temp1 = Object.keys(item);
        let newItem = { id: temp1[0], ...temp[0] }; // id: id + ...{text: '', date: ''}
        return (
          <Todo
            key={Math.random(1 - 100)}
            date={newItem.date}
            text={newItem.text}
            id={newItem.id}
          />
        );
      })}
    </div>
  );
}

export default Todos;
