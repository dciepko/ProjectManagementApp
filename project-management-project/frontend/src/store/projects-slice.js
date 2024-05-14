import { createSlice } from "@reduxjs/toolkit";
import { addProject, fetchProjects, deleteProjectById } from "../util/http";
import { useSelector } from "react-redux";

const projectsSlice = createSlice({
  name: "projects",
  initialState: { projects: [], currentProject: {} },
  reducers: {
    getProjects(state, action) {
      state.projects = action.payload;
    },
    changeCurrentProject(state, action) {
      state.currentProject = action.payload;
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

export const chooseCurrentProject = (project) => async (dispatch) => {
  changeCurrentProject(project);
};

export const { getProjects, changeCurrentProject } = projectsSlice.actions;

export default projectsSlice;
