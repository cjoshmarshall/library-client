import { combineReducers, configureStore } from "@reduxjs/toolkit";
import booksReducer from "../pages/Books/slice.js";
import usersReducer from "../pages/Users/slice.js";

const rootReducer = combineReducers({
  books: booksReducer,
  users: usersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
