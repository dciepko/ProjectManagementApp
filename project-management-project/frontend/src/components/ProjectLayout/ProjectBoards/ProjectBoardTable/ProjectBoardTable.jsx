import classes from "./ProjectBoardTable.module.css";

import StatusTable from "../../StatusTable/StatusTable.jsx";

export default function ProjectBoardTable({
  activities,
  activitiesListChange,
}) {
  return (
    <div className={classes.tableContainer}>
      <StatusTable
        key={"todo"}
        title={"Do zrobienia"}
        id={"todo"}
        tasks={activities}
        onReload={activitiesListChange}
      />
      <StatusTable
        key={"doing"}
        title={"W trakcie"}
        id={"doing"}
        tasks={activities}
        onReload={activitiesListChange}
      />
      <StatusTable
        key={"done"}
        title={"Zrobione"}
        id={"done"}
        tasks={activities}
        onReload={activitiesListChange}
      />
      <button className={classes.addTableButton}>+</button>
    </div>
  );
}
