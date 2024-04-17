import StatusTable from "../StatusTable/StatusTable";
import classes from "./SelectedProject.module.css";

import filters from "../../assets/filters-icon.png";
import group from "../../assets/group-icon.png";
import plus from "../../assets/plus-icon.png";
import wrap from "../../assets/wrap-down-button.png";
import { useState } from "react";

export default function SelectedProject({ currentProject }) {
  const [activities, setActivities] = useState(currentProject.tasks);

  function activitiesListChange(activities) {
    setActivities(activities);
    console.log("Reexecute");
  }

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h1 className={classes.h1}>{currentProject.title}</h1>
        <button className={classes.unwrapButton}>
          <img src={wrap} alt="wrap header" />
        </button>
        <section className={classes.optionButtonsContainer}>
          <select className={classes.selectButton}>
            <option value="classic">Tablica</option>
            <option value="wide">Podłużny</option>
            <option value="table">Tabela</option>
          </select>
          <button className={classes.optionButton}>
            <img src={filters} alt="filter button" />
          </button>
          <button className={classes.optionButton}>
            <img src={group} alt="group button" />
          </button>
          <button className={classes.optionButton}>
            <img src={plus} alt="add button" />
          </button>
        </section>
      </header>

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
    </div>
  );
}

//obrzydliwy jest ten reload ale zmienie go jak dodam reduxa
