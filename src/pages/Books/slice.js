import { createSlice } from "@reduxjs/toolkit";

const initialState = { books: [] };

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    SET_BOOKS: (state, action) => {
      state.books = action.payload;
    },
  },
});

export const { SET_BOOKS } = booksSlice.actions;

export default booksSlice.reducer;
