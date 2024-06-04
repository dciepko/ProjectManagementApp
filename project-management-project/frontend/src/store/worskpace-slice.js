import { createSlice } from "@reduxjs/toolkit";

import { fetchWorkspaces } from "../util/http";

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

export const fetchWorkspacesAction = () => async (dispatch) => {
  const fetchedWorkspaces = await fetchWorkspaces();
  dispatch(getWorkspaces(fetchedWorkspaces));
};

export const { getWorkspaces, changeCurrentWorkspace } = workspaceSlice.actions;

export default workspaceSlice;
