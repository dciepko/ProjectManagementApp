import Login from "./components/Logins/Login/Login";
import Signup from "./components/Logins/Signup/Signup.jsx";

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
        console.log("pobiera");
        console.log(users);

        setUsers(users);
        setIsFetching(false);
      } catch (error) {
        setError({
          message: error.message || "Nie udało się pobrać użytkowników",
        });
        setIsFetching(false);
        console.log("nie udalo sie");
      }
    }
    fetchUsers();
  }, []);

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
        {users.map((user) => {
          return <h1>{user.userName}</h1>;
        })}
      </section>
    </div>
  );
}

export default App;
