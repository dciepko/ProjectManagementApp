import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "workspace",
  initialState: { notifications: [] },
  reducers: {
    getWorkspaces(state, action) {
      state.workspaces = action.payload;
    },
    changeCurrentWorkspace(state, action) {
      state.currentWorkspace = action.payload;
    },
  },
});

export const fetchWorkspacesAction = (userID) => async (dispatch) => {
  const fetchedWorkspaces = await fetchWorkspaces(userID);
  dispatch(getWorkspaces(fetchedWorkspaces));
};

export const addNewWorkspace = (newWorkspace, userID) => async (dispatch) => {
  addWorkspace(newWorkspace);
  fetchWorkspacesAction(userID);
};

export const { getWorkspaces, changeCurrentWorkspace } = workspaceSlice.actions;

export default notificationSlice;
