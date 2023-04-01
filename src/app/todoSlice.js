import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
const API =
  'https://test-http-77e4b-default-rtdb.europe-west1.firebasedatabase.app';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodo',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(`${API}/todos.json`);
      if (!response.ok) {
        throw new Error('Server error');
      }
      const data = await response.json();
      if (data == null) {
        throw new Error('Завданнь немає');
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async function (text, { rejectWithValue, dispatch }) {
    try {
      const id = nanoid();
      const temp = {};
      temp[id] = {
        text: text,
        date: new Date().toISOString(),
        completed: false,
      };

      const response = await fetch(`${API}/todos/${id}.json`, {
        method: 'PUT', // POST create extra key in realtime db
        body: JSON.stringify(temp[id]),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Post error');
      }
      dispatch(addTodoState({ id: id, obj: temp[id] }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`${API}/todos/${id}.json`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Delete error');
      }
      dispatch(deleteTodoState(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const completeTodo = createAsyncThunk(
  'todos/completeTodo',
  async (id, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    let completedTodo = {
      ...state.todosReducer.todos[id],
      completed: !state.todosReducer.todos[id].completed,
    };
    try {
      const response = await fetch(`${API}/todos/${id}.json`, {
        method: 'PUT',
        body: JSON.stringify(completedTodo),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Put error');
      }
      dispatch(completeTodoState(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changeTextTodo = createAsyncThunk(
  'todos/changeTextTodo',
  async ({ id, text }, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${API}/todos/${id}/text.json`, {
        method: 'PUT',
        body: JSON.stringify(text),
      });
      if (!response.ok) {
        throw new Error('Change error');
      }
      dispatch(changeTodoState({ id: id, text: text }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: {},
    statud: null,
    error: null,
  },
  reducers: {
    addTodoState: (state, action) => {
      state.todos = {
        [action.payload.id]: action.payload.obj,
        ...state.todos,
      };
    },
    deleteTodoState: (state, action) => {
      let temp = { ...state.todos };
      delete temp[action.payload];
      state.todos = { ...temp };
    },
    completeTodoState: (state, action) => {
      state.todos[action.payload] = {
        ...state.todos[action.payload],
        completed: !state.todos[action.payload].completed,
      };
    },
    changeTodoState: (state, action) => {
      const { id, text } = action.payload;
      state.todos[id] = { ...state.todos[id], text: text };
    },
  },
  extraReducers: {
    //? middleware for middleware
    [fetchTodos.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.todos = action.payload;
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    [addTodo.fulfilled]: (state) => {
      state.status = 'resolved';
      state.error = null;
    },
    [addTodo.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    [deleteTodo.fulfilled]: (state) => {
      state.status = 'resolved';
      state.error = null;
    },
    [deleteTodo.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    [completeTodo.fulfilled]: (state) => {
      state.status = 'resolved';
      state.error = null;
    },
    [completeTodo.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    [changeTextTodo.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [changeTextTodo.fulfilled]: (state) => {
      state.status = 'resolved';
      state.error = null;
    },
  },
});
const { addTodoState, deleteTodoState, completeTodoState, changeTodoState } =
  todoSlice.actions; //!

export const todoReducer = todoSlice.reducer;
