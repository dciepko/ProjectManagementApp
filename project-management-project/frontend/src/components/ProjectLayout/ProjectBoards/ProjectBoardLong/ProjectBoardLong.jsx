import StatusList from "../../StatusList/StatusList";
import classes from "./ProjectBoardLong.module.css";

export default function ProjectBoardLong({
  activities,
  activitiesListChange,
  tablesList,
}) {
  return (
    <>
      {tablesList.map((table) => {
        return (
          <StatusList
            activities={activities}
            activitiesListChange={activitiesListChange}
            title={table.tableName}
            id={table.tableID}
            key={table.tableID}
            color={table.tableColor}
          />
        );
      })}
    </>
  );
}
