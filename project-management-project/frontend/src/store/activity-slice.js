import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTasks,
  addActivity,
  deleteActivityById,
  updateActivity,
} from "../util/http";

const activitySlice = createSlice({
  name: "activities",
  initialState: { activities: [], currentObjectActivities: [] },
  reducers: {
    getActivities(state, action) {
      state.activities = action.payload;
    },
    editActivity(state, action) {
      const { activityID, ...updatedActivity } = action.payload;
      const index = state.activities.findIndex(
        (activity) => activity.activityID === activityID
      );
      if (index !== -1) {
        state.activities[index] = updatedActivity;
      }
    },
  },
});

export const fetchCurrentProjectTasks = (projectId) => async (dispatch) => {
  try {
    const fetchedTasks = await fetchTasks(projectId);
    dispatch(getActivities(fetchedTasks));
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export const addNewActivity = (newActivity, projectId) => async (dispatch) => {
  try {
    await addActivity(newActivity);
    dispatch(fetchCurrentProjectTasks(projectId));
  } catch (error) {
    console.error("Error adding activity:", error);
  }
};

export const deleteActivity = (actID, projectId) => async (dispatch) => {
  try {
    await deleteActivityById(actID);
    dispatch(fetchCurrentProjectTasks(projectId));
  } catch (error) {
    console.error("Error deleting activity:", error);
  }
};

export const editingActivity = (updatedActivity) => async (dispatch) => {
  try {
    await updateActivity(updatedActivity);
    dispatch(fetchCurrentProjectTasks(updatedActivity.projectID));
  } catch (error) {
    console.error("Error adding activity:", error);
  }
};

export const { getActivities, editActivity } = activitySlice.actions;

export default activitySlice.reducer;
