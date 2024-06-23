import ProjectsSidebar from "../../components/ProjectSidebar/ProjectsSidebar.jsx";
import SelectedProject from "../../components/ProjectLayout/SelectedProject/SelectedProject";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  chooseCurrentProject,
  fetchProjectsByIDAction,
  addNewProject,
} from "../../store/projects-slice";
import { fetchUsersAction } from "../../store/user-slice.js";

export default function WorkspacePage() {
  const { workspaceID } = useParams();
  const dispatch = useDispatch();

  const [selectedProject, setSelectedProject] = useState(null);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProjectsByIDAction(workspaceID));
  }, [dispatch, workspaceID, reload]);

  const projects = useSelector(
    (state) => state.projects.currentWorkspaceProject
  );
  console.log(projects);

  useEffect(() => {
    if (projects.length > 0) {
      setSelectedProject(projects[0]);
      dispatch(chooseCurrentProject(projects[0]));
    }
  }, [projects, dispatch]);

  function handleProjectChoose(projectId) {
    const chosenProject = projects.find(
      (project) => project.projectID === projectId
    );
    if (chosenProject) {
      dispatch(chooseCurrentProject(chosenProject));
      setSelectedProject(chosenProject);
    }
  }

  function handleReload() {
    setReload((prevReload) => !prevReload);
    console.log("reload");
  }

  function handleAddNewProject(newProject) {
    dispatch(addNewProject(newProject, workspaceID));
  }

  return (
    <section id="workspace">
      <ProjectsSidebar
        projectList={projects}
        handleClick={handleProjectChoose}
        onReload={handleReload}
        onAddNewProject={handleAddNewProject}
      />
      {selectedProject && (
        <SelectedProject
          currentProject={selectedProject}
          onReload={handleReload}
        />
      )}
    </section>
  );
}
