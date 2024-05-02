import { createSlice } from "@reduxjs/toolkit";
import { fetchProjects } from "../util/http";

const projectsSlice = createSlice({
  name: "projects",
  initialState: { projects: [] },
  reducers: {
    getProjects(state, action) {
      state.projects = action.payload;
    },
  },
});

export const fetchProjectsAction = () => async (dispatch) => {
  const fetchedProjects = await fetchProjects();

  dispatch(getProjects(fetchedProjects));
};

export const { getProjects } = projectsSlice.actions;

export default projectsSlice;
