import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodo', // назва slice + назва методу
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        'https://test-http-77e4b-default-rtdb.europe-west1.firebasedatabase.app/todos.json'
      );
      if (!response.ok) {
        throw new Error('Server error');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: 'todos', // назва slice
  initialState: {
    todos: [],
    statud: null,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.todos = [action.payload];
      // console.log(state.todos);
      // delete state.todos.NRXTDOBMoiBDIIu85rg.text;
      // console.log(state.todos);
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const { addTodo } = todoSlice.actions;

export const todoReducer = todoSlice.reducer;
