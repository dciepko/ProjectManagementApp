import ProjectsSidebar from "../../components/ProjectSidebar/ProjectsSidebar.jsx";
import SelectedProject from "../../components/ProjectLayout/SelectedProject/SelectedProject";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import {
  chooseCurrentProject,
  fetchProjectsAction,
} from "../../store/projects-slice";

export default function WorkspacePage() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);

  const [currentProjects, setCurrentProjects] = useState(projects);
  const [selectedProject, setSelectedProject] = useState();

  useEffect(() => {
    dispatch(fetchProjectsAction());
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
