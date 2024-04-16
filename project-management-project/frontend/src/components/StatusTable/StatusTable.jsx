import { useRef } from "react";
import AddingTask from "../AddingTask/AddingTask";
import classes from "./StatusTable.module.css";

export default function TimeTable({ title, tasks }) {
  const modal = useRef();

  function handleOpenModal() {
    modal.current.open();
  }

  return (
    <>
      <AddingTask ref={modal} />
      <section className={classes.section}>
        <h3 className={classes.h3}>{title}</h3>
        <ul>
          {tasks.map((task) => {
            return <button className={classes.pTask}>{task}</button>;
          })}
          <button onClick={handleOpenModal} className={classes.addTaskButton}>
            +
          </button>
        </ul>
      </section>
    </>
  );
}
