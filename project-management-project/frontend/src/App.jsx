import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

import { useEffect, useState } from "react";
import HeadMenu from "./components/HeadMenu/HeadMenu.jsx";
import ProjectsSidebar from "./components/ProjectSidebar/ProjectsSidebar.jsx";
import { PROJECTS } from "./projects.js";
import SelectedProject from "./components/ProjectLayout/SelectedProject/SelectedProject.jsx";
import { getUsers } from "./util/http.js";

function App() {
  const [currentProjects, setCurrentProjects] = useState(PROJECTS);
  const [selectedProject, setSelectedProject] = useState(PROJECTS[0]);

  const [isFetching, setIsFetching] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchUsers() {
      setIsFetching(true);

      try {
        const users = await getUsers();

        setUsers(users);
        setIsFetching(false);
      } catch (error) {
        setError({
          message: error.message || "Nie udało się pobrać użytkowników",
        });
      }
    }
  });

  function handleProjectChoose(projectId) {
    setSelectedProject(currentProjects[projectId]);
  }

  return (
    <div id="app">
      <HeadMenu />
      <section id="workspace">
        <ProjectsSidebar
          projectList={currentProjects}
          handleClick={handleProjectChoose}
        />
        {/* <SelectedProject currentProject={selectedProject} /> */}
      </section>
    </div>
  );
}

export default App;
