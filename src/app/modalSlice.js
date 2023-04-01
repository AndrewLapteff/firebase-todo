import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: false,
  reducers: {
    switchModal: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { switchModal } = modalSlice.actions; //! { }
export const modalReducer = modalSlice.reducer;
