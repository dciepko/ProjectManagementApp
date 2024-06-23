import { createSlice } from "@reduxjs/toolkit";

import { fetchUsers } from "../util/http";

const userSlice = createSlice({
  name: "user",
  initialState: { name: "", email: "", allUsers: [] },
  reducers: {
    getUser(state, action) {
      state.name = action.payload.userName;
      state.email = action.payload.userEmail;
    },
    getUsers(state, action) {
      state.allUsers = action.payload;
    },
  },
});

export const fetchOneUser = () => async (dispatch) => {
  const users = await fetchUsers();
  const user = users[0];
  dispatch(getUser(user));
};

export const fetchUsersAction = () => async (dispatch) => {
  const users = await fetchUsers();

  dispatch(getUsers(users));
};

export const { getUser, getUsers } = userSlice.actions;

export default userSlice;
