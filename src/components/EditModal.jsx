import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { switchModal } from '../app/modalSlice';
import style from './EditModal.module.css';
import { changeTextTodo } from '../app/todoSlice';

function EditModal(props) {
  const changeTextInp = useRef();
  const dispatch = useDispatch();
  const modalCloseHandler = () => {
    dispatch(switchModal(null));
  };

  const changeTextHandler = () => {
    let newText = changeTextInp.current.value;
    if (newText.length > 0) {
      dispatch(changeTextTodo({ id: props.id, text: newText }));
      modalCloseHandler();
    }
  };
  return (
    <div
      onClick={(e) => {
        if (e.target.className == style.modal_background) {
          modalCloseHandler();
        }
      }}
      className={style.modal_background}
    >
      <div className={style.content_wrapper}>
        <button
          onClick={(e) => {
            if (e.target.className == style.close_btn) {
              modalCloseHandler();
            }
          }}
          className={style.close_btn}
        >
          ×
        </button>
        <div className={style.old_text}>{props.text}</div>
        <input
          ref={changeTextInp}
          className={style.new_text_inp}
          type="text"
          name=""
          id=""
        />
        <button className={style.change_btn} onClick={changeTextHandler}>
          Замінити
        </button>
      </div>
    </div>
  );
}

export default EditModal;
