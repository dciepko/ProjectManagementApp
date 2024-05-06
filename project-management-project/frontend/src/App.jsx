import Login from "./components/Logins/Login/Login";
import Signup from "./components/Logins/Signup/Signup.jsx";

import { useEffect, useState } from "react";
import HeadMenu from "./components/HeadMenu/HeadMenu.jsx";
import ProjectsSidebar from "./components/ProjectSidebar/ProjectsSidebar.jsx";
import { PROJECTS } from "./projects.js";
import SelectedProject from "./components/ProjectLayout/SelectedProject/SelectedProject.jsx";
import { fetchProjects, fetchUsers } from "./util/http.js";
import { useFetch } from "./hooks/useFetch.js";
import { useDispatch, useSelector } from "react-redux";

import { fetchOneUser } from "./store/user-slice.js";
import { fetchProjectsAction } from "./store/projects-slice.js";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const projects = useSelector((state) => state.projects.projects);

  const [currentProjects, setCurrentProjects] = useState(PROJECTS);
  const [selectedProject, setSelectedProject] = useState(PROJECTS[0]);

  // useEffect(() => {
  //   dispatch(fetchOneUser());
  // }, []);

  useEffect(() => {
    dispatch(fetchProjectsAction());
  }, [dispatch]);

  useEffect(() => {
    if (projects.length > 0) {
      setCurrentProjects(projects);
      setSelectedProject(projects[0]);
    }
  }, [projects]);

  function handleProjectChoose(projectId) {
    console.log(projectId);
    const selectedProject = currentProjects.find(
      (project) => project.projectID === projectId
    );
    if (selectedProject) {
      setSelectedProject(selectedProject);
    }
  }

  return (
    <div id="app">
      <HeadMenu />
      <section id="workspace">
        <ProjectsSidebar
          projectList={currentProjects}
          handleClick={handleProjectChoose}
        />
        <SelectedProject currentProject={selectedProject} />
        {/* {user.name} */}
      </section>
    </div>
  );
}

export default App;
