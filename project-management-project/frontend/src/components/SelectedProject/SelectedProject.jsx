import TimeTable from "../TimeTable/TimeTable";
import classes from "./SelectedProject.module.css";

export default function SelectedProject({ currentProject }) {
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h1 className={classes.h1}>{currentProject.title}</h1>
      </header>
      <div className={classes.tableContainer}>
        <TimeTable title={"Do zrobienia"} tasks={currentProject.tasks} />
        <TimeTable title={"W trakcie"} tasks={[]} />
        <TimeTable title={"Zrobione"} tasks={[]} />
      </div>
    </div>
  );
}
