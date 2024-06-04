import { createSlice } from "@reduxjs/toolkit";

import { fetchUsers, fetchWorkspaces } from "../util/http";

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

//akcje
export const fetchWorkspacesAction = () => async (dispatch) => {
  const fetchedWorkspaces = await fetchWorkspaces();
  console.log("weszlo");
  dispatch(getWorkspaces(fetchedWorkspaces));
  // dispatch(changeCurrentProject(fetchProjects[0]));
};

export const { getWorkspaces, changeCurrentWorkspace } = workspaceSlice.actions;

export default workspaceSlice;
