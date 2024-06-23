import classes from "./ProjectBoardTable.module.css";

import StatusTable from "../../StatusTable/StatusTable.jsx";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTable } from "../../../../store/projects-slice.js";

export default function ProjectBoardTable({
  activities,
  activitiesListChange,
  tablesList,
  currentProjectID,
  onReload,
}) {
  const [currentBoards, setCurrentBoards] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentBoards(tablesList);
  }, [tablesList]);

  function handleNewBoard() {
    const newBoard = {
      tableName: "Nowa Tablica",
      tableColor: "blue",
      projectID: currentProjectID,
    };
    setCurrentBoards((boards) => {
      return [...boards, newBoard];
    });

    dispatch(addNewTable(currentProjectID, newBoard));
    onReload();
  }

  return (
    <div className={classes.tableContainer}>
      {currentBoards.map((table) => {
        return (
          <StatusTable
            key={table.tableID ? table.tableID : 100}
            title={table.tableName}
            id={table.tableID ? table.tableID : 100}
            tasks={activities}
            onReload={activitiesListChange}
            color={table.tableColor}
            onRefresh={onReload}
          />
        );
      })}
      <button className={classes.addTableButton} onClick={handleNewBoard}>
        +
      </button>
    </div>
  );
}
