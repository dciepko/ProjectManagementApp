import { createSlice } from "@reduxjs/toolkit";

import { fetchUsers } from "../util/http";

const userSlice = createSlice({
  name: "user",
  initialState: { name: "", email: "" },
  reducers: {
    getUsers(state, action) {
      state.name = action.payload.userName;
      state.email = action.payload.userEmail;
    },
  },
});

export const fetchOneUser = () => async (dispatch) => {
  const users = await fetchUsers();
  const user = users[0];
  dispatch(getUsers(user));
};

export const { getUsers } = userSlice.actions;

export default userSlice;
