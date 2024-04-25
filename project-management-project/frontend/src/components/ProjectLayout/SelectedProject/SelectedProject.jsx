import ProjectBoardTable from "../ProjectBoards/ProjectBoardTable/ProjectBoardTable";
import ProjectBoardLong from "../ProjectBoards/ProjectBoardLong/ProjectBoardLong";
import ProjectBoardGroup from "../ProjectBoards/ProjectBoardGroup/ProjectBoardGroup";
import ProjectHeader from "../ProjectHeader/ProjectHeader";
import classes from "./SelectedProject.module.css";

import { useState } from "react";

export default function SelectedProject({ currentProject }) {
  const [activities, setActivities] = useState(currentProject.tasks);
  const [selectedLayout, setSelectedLayout] = useState("table");

  function activitiesListChange(activities) {
    setActivities(activities);
  }

  function handleSelectChange(event) {
    setSelectedLayout(event.target.value);
  }

  return (
    <div className={classes.container}>
      <ProjectHeader
        currentProject={currentProject}
        selectedOption={selectedLayout}
        onSelectChange={handleSelectChange}
      />
      {selectedLayout === "table" && (
        <ProjectBoardTable
          activities={activities}
          activitiesListChange={activitiesListChange}
        />
      )}
      {selectedLayout === "long" && (
        <ProjectBoardLong
          activities={activities}
          activitiesListChange={activitiesListChange}
        />
      )}
      {selectedLayout === "group" && (
        <ProjectBoardGroup
          activities={activities}
          activitiesListChange={activitiesListChange}
        />
      )}
    </div>
  );
}

//obrzydliwy jest ten reload ale zmienie go jak dodam reduxa
