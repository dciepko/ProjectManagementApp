import { createSlice } from "@reduxjs/toolkit";
import {
  addProject,
  fetchProjects,
  deleteProjectById,
  addBoard,
  updateBoard,
} from "../util/http";
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
  // dispatch(changeCurrentProject(fetchProjects[0]));
};

export const addNewProject = (newProject) => async (dispatch) => {
  addProject(newProject);
  fetchProjectsAction();
};

export const deleteProject = (projectId) => async (dispatch) => {
  deleteProjectById(projectId);
  fetchProjectsAction();
};

export const chooseCurrentProject = (project) => async (dispatch) => {
  dispatch(changeCurrentProject(project));
};

export const addNewTable = (projectID, newTable) => async (dispatch) => {
  addBoard(projectID, newTable);
  fetchProjectsAction();
};

export const editingTables = (updatedTable) => async (dispatch) => {
  try {
    await updateBoard(updatedTable);
    dispatch(fetchProjectsAction());
  } catch (error) {
    console.error("Error adding table:", error);
  }
};

export const { getProjects, changeCurrentProject } = projectsSlice.actions;

export default projectsSlice;
