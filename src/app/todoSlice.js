import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodo',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        'https://test-http-77e4b-default-rtdb.europe-west1.firebasedatabase.app/todos.json'
      );
      if (!response.ok) {
        throw new Error('Server error');
      }
      const data = await response.json();
      if (data == null) {
        throw new Error('Ви не маєте ще заданнь');
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTodo = createAsyncThunk(
  'todo/addTodo',
  async function (todo, { rejectWithValue, dispatch }) {
    try {
      const id = nanoid();
      const response = await fetch(
        `https://test-http-77e4b-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`,
        {
          method: 'POST',
          body: JSON.stringify(todo),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Post error');
      }
      todo.id = id;
      dispatch(addTodoState(todo));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    statud: null,
    error: null,
  },
  reducers: {
    addTodoState: (state, action) => {
      state.todos.push(action.payload);
    },
  },
  extraReducers: {
    //? middleware for middleware
    [fetchTodos.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'resolved';

      let ids = Object.keys(action.payload);
      let firstNode = Object.values(action.payload);
      let todosStateVersion = firstNode.map((item, i) => {
        let secondNode = Object.values(item);
        return { id: ids[i], ...secondNode[0] };
      });
      state.todos = todosStateVersion;
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
  },
});
export const { addTodoState } = todoSlice.actions; //!

export const todoReducer = todoSlice.reducer;
