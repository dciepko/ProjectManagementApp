import { createSlice } from "@reduxjs/toolkit";
import { addProject, fetchProjects, deleteProjectById } from "../util/http";

const projectsSlice = createSlice({
  name: "projects",
  initialState: { projects: [], currentProject: {} },
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

export const addNewProject = (newProject) => async (dispatch) => {
  addProject(newProject);
  fetchProjectsAction();
};

export const deleteProject = (projectId) => async (dispatch) => {
  console.log(projectId);
  deleteProjectById(projectId);
  fetchProjectsAction();
};

export const { getProjects } = projectsSlice.actions;

export default projectsSlice;
