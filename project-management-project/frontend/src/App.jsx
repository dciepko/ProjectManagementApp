import { useState } from "react";
import HeadMenu from "./components/HeadMenu/HeadMenu.jsx";
import ProjectsSidebar from "./components/ProjectSidebar/ProjectsSidebar.jsx";
import { PROJECTS } from "./projects.js";
import SelectedProject from "./components/SelectedProject/SelectedProject.jsx";
import AddingProject from "./components/AddingProject/AddingProject.jsx";

function App() {
  const [currentProjects, setCurrentProjects] = useState(PROJECTS);
  const [selectedProject, setSelectedProject] = useState(PROJECTS[0]);

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
        <SelectedProject currentProject={selectedProject} />
      </section>
    </div>
  );
}

export default App;
