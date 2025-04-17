import { createSlice } from "@reduxjs/toolkit";
import { fetchNotifications } from "../util/http";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: { notifications: [] },
  reducers: {
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
  },
});

export const { setNotifications } = notificationSlice.actions;

export const fetchNotificationsAction = (userID) => async (dispatch) => {
  const fetchedNotifications = await fetchNotifications(userID);
  dispatch(setNotifications(fetchedNotifications));
};

export default notificationSlice.reducer;
