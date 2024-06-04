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

  const [selectedLayout, setSelectedLayout] = useState("table");

  useEffect(() => {
    if (currentProject?.projectID) {
      dispatch(fetchCurrentProjectTasks(currentProject.projectID));
    }
  }, [dispatch, currentProject]);

  function activitiesListChange() {
    if (currentProject?.projectID) {
      dispatch(fetchCurrentProjectTasks(currentProject.projectID));
    }
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
          activities={currentProjectActivities}
          activitiesListChange={activitiesListChange}
          tablesList={currentProject.tables}
          currentProjectID={currentProject.projectID}
        />
      )}
      {selectedLayout === "long" && (
        <ProjectBoardLong
          activities={currentProjectActivities}
          activitiesListChange={activitiesListChange}
          tablesList={currentProject.tables}
        />
      )}
      {selectedLayout === "group" && (
        <ProjectBoardGroup
          activities={currentProjectActivities}
          activitiesListChange={activitiesListChange}
        />
      )}
    </div>
  );
}
