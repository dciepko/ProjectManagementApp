import { createSlice } from "@reduxjs/toolkit";

import { addWorkspace, fetchWorkspaces } from "../util/http";

const workspaceSlice = createSlice({
  name: "workspace",
  initialState: { workspaces: [], currentWorkspace: {} },
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

export const addNewWorkspace = (newWorkspace) => async (dispatch) => {
  addWorkspace(newWorkspace);
  fetchWorkspacesAction();
};

export const { getWorkspaces, changeCurrentWorkspace } = workspaceSlice.actions;

export default workspaceSlice;
