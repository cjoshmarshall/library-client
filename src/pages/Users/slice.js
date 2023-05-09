import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    SET_USERS: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { SET_USERS } = usersSlice.reducer;

export default usersSlice.reducer;
