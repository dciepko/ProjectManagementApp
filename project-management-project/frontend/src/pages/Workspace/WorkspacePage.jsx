import ProjectsSidebar from "../../components/ProjectSidebar/ProjectsSidebar.jsx";
import SelectedProject from "../../components/ProjectLayout/SelectedProject/SelectedProject";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import {
  chooseCurrentProject,
  fetchProjectsAction,
  fetchProjectsByIDAction,
} from "../../store/projects-slice";
import { useParams } from "react-router-dom";

export default function WorkspacePage() {
  const { workspaceID } = useParams();
  console.log(workspaceID);

  const dispatch = useDispatch();
  const projects = useSelector(
    (state) => state.projects.currentWorkspaceProject
  );

  const [currentProjects, setCurrentProjects] = useState(projects);
  const [selectedProject, setSelectedProject] = useState();

  useEffect(() => {
    dispatch(fetchProjectsByIDAction(workspaceID));
  }, [dispatch]);

  useEffect(() => {
    if (projects.length > 0) {
      setCurrentProjects(projects);
      setSelectedProject(projects[0]);
      dispatch(chooseCurrentProject(projects[0]));
    }
  }, [projects]);

  function handleProjectChoose(projectId) {
    const chosenProject = projects.find(
      (project) => project.projectID === projectId
    );
    dispatch(chooseCurrentProject(chosenProject));
    if (chosenProject) {
      setSelectedProject(chosenProject);
    }
  }

  return (
    <section id="workspace">
      <ProjectsSidebar
        projectList={currentProjects}
        handleClick={handleProjectChoose}
      />
      {selectedProject && <SelectedProject currentProject={selectedProject} />}
    </section>
  );
}
