import Login from "./components/Logins/Login/Login";
import Signup from "./components/Logins/Signup/Signup.jsx";

import { useEffect, useState } from "react";
import HeadMenu from "./components/HeadMenu/HeadMenu.jsx";
import ProjectsSidebar from "./components/ProjectSidebar/ProjectsSidebar.jsx";
import { PROJECTS } from "./projects.js";
import SelectedProject from "./components/ProjectLayout/SelectedProject/SelectedProject.jsx";
import Starter from "./components/Starter/Starter.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import { fetchProjects, fetchUsers } from "./util/http.js";
import { useDispatch, useSelector } from "react-redux";

import { fetchProjectsAction } from "./store/projects-slice.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);

  const [currentProjects, setCurrentProjects] = useState(projects);
  const [selectedProject, setSelectedProject] = useState();

  const router = createBrowserRouter([
    { path: "/", element: <Starter /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Signup /> },
    { path: "/home", element: <HomePage /> },
    { path: "/projects" },
  ]);

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
    const selectedProject = currentProjects.find(
      (project) => project.projectID === projectId
    );
    if (selectedProject) {
      setSelectedProject(selectedProject);
    }
  }

  return (
    <div id="app">
      {/* <HeadMenu />
      <section id="workspace">
        <ProjectsSidebar
          projectList={currentProjects}
          handleClick={handleProjectChoose}
        />
        {selectedProject && (
          <SelectedProject currentProject={selectedProject} />
        )}
      </section> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
