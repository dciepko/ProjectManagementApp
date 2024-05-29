import classes from "./ProjectBoardTable.module.css";

import StatusTable from "../../StatusTable/StatusTable.jsx";

export default function ProjectBoardTable({
  activities,
  activitiesListChange,
  tablesList,
}) {
  return (
    <div className={classes.tableContainer}>
      {tablesList.map((table) => {
        return (
          <StatusTable
            key={table.tableID}
            title={table.tableName}
            id={table.tableID}
            tasks={activities}
            onReload={activitiesListChange}
          />
        );
      })}
      <button className={classes.addTableButton}>+</button>
    </div>
  );
}
