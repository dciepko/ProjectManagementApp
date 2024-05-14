import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks } from "../util/http";

const activitySlice = createSlice({
  name: "activities",
  initialState: { activities: [], currentObjectActivities: [] },
  reducers: {
    getActivities(state, action) {
      state.activities = action.payload;
    },
  },
});

export const fetchCurrentProjectTasks = (projectId) => async (dispatch) => {
  const fetchedTasks = await fetchTasks(projectId);

  dispatch(getActivities(fetchedTasks));
};

export const addNewActivity = (newActivity) => async (dispatch) => {
  addActivity(newActivity);
  fetchCurrentProjectTasks();
};

export const { getActivities } = activitySlice.actions;

export default activitySlice;
