import Login from "./components/Logins/Login/Login";
import Signup from "./components/Logins/Signup/Signup.jsx";

import { useEffect, useState } from "react";
import HeadMenu from "./components/HeadMenu/HeadMenu.jsx";
import ProjectsSidebar from "./components/ProjectSidebar/ProjectsSidebar.jsx";
import { PROJECTS } from "./projects.js";
import SelectedProject from "./components/ProjectLayout/SelectedProject/SelectedProject.jsx";
import { fetchUsers } from "./util/http.js";
import { useFetch } from "./hooks/useFetch.js";

function App() {
  const [currentProjects, setCurrentProjects] = useState(PROJECTS);
  const [selectedProject, setSelectedProject] = useState(PROJECTS[0]);

  const {
    isFetching,
    error,
    fetchedData: fetchedUsers,
    setFetchedData: setFetchedUsers,
  } = useFetch(fetchUsers, []);

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
        {fetchedUsers.map((user) => {
          return <h1>{user.userName}</h1>;
        })}
      </section>
    </div>
  );
}

export default App;
