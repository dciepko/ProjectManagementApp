import { createSlice } from "@reduxjs/toolkit";
import {
  addProject,
  fetchProjects,
  deleteProjectById,
  addBoard,
  updateBoard,
  fetchProjectsByID,
} from "../util/http";

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    currentWorkspaceProject: [],
    currentProject: {},
  },
  reducers: {
    getProjects(state, action) {
      state.projects = action.payload;
    },
    getCurrentWorkspaceProject(state, action) {
      state.currentWorkspaceProject = action.payload;
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

export const fetchProjectsByIDAction = (workspaceID) => async (dispatch) => {
  const fetchedProjects = await fetchProjectsByID(workspaceID);
  dispatch(getCurrentWorkspaceProject(fetchedProjects));
};

export const addNewProject = (newProject, workspaceID) => async (dispatch) => {
  try {
    await addProject(newProject);
    dispatch(fetchProjectsByIDAction(workspaceID));
  } catch (error) {
    console.error("Error adding project:", error);
  }
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

export const { getProjects, getCurrentWorkspaceProject, changeCurrentProject } =
  projectsSlice.actions;

export default projectsSlice;
