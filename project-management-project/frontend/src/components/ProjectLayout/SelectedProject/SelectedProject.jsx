import ProjectBoardTable from "../ProjectBoards/ProjectBoardTable/ProjectBoardTable";
import ProjectHeader from "../ProjectHeader/ProjectHeader";
import StatusTable from "../StatusTable/StatusTable";
import classes from "./SelectedProject.module.css";

import { useState } from "react";

export default function SelectedProject({ currentProject }) {
  const [activities, setActivities] = useState(currentProject.tasks);

  function activitiesListChange(activities) {
    setActivities(activities);
  }

  return (
    <div className={classes.container}>
      <ProjectHeader currentProject={currentProject} />
      <ProjectBoardTable
        activities={activities}
        activitiesListChange={activitiesListChange}
      />
    </div>
  );
}

//obrzydliwy jest ten reload ale zmienie go jak dodam reduxa
