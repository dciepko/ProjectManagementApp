import StatusTable from "../StatusTable/StatusTable";
import classes from "./SelectedProject.module.css";

export default function SelectedProject({ currentProject }) {
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h1 className={classes.h1}>{currentProject.title}</h1>
        <button className={classes.unwrapButton}>V</button>
        <section className={classes.optionButtonsContainer}>
          <button className={classes.optionButton}>Zmiana widoku</button>
          <button className={classes.optionButton}>Filtry</button>
          <button className={classes.optionButton}>Uczestnicy</button>
          <button className={classes.optionButton}>Dodaj</button>
        </section>
      </header>
      <div className={classes.tableContainer}>
        <StatusTable title={"Do zrobienia"} tasks={currentProject.tasks} />
        <StatusTable title={"W trakcie"} tasks={[]} />
        <StatusTable title={"Zrobione"} tasks={[]} />
        <button className={classes.addTableButton}>+</button>
      </div>
    </div>
  );
}
