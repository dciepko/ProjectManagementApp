import ProjectBoardTable from "../ProjectBoards/ProjectBoardTable/ProjectBoardTable";
import ProjectBoardLong from "../ProjectBoards/ProjectBoardLong/ProjectBoardLong";
import ProjectBoardGroup from "../ProjectBoards/ProjectBoardGroup/ProjectBoardGroup";
import ProjectHeader from "../ProjectHeader/ProjectHeader";
import classes from "./SelectedProject.module.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentProjectTasks } from "../../../store/activity-slice";

export default function SelectedProject({ currentProject }) {
  const dispatch = useDispatch();
  const currentProjectActivities = useSelector(
    (state) => state.activities.activities
  );

  const [activities, setActivities] = useState(currentProjectActivities);
  const [selectedLayout, setSelectedLayout] = useState("table");

  useEffect(() => {
    dispatch(fetchCurrentProjectTasks(currentProject.projectID));
  }, [dispatch, currentProject]);

  useEffect(() => {
    if (currentProjectActivities.length > 0) {
      setActivities(currentProjectActivities);
    } else {
      setActivities([]);
    }
  }, [currentProjectActivities]);

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
