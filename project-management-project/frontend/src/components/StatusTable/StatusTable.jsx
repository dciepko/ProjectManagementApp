import { useRef } from "react";
import AddingTask from "../AddingTask/AddingTask";
import classes from "./StatusTable.module.css";
import Activity from "../Activty/Activity";

export default function TimeTable({ title, id, tasks }) {
  const modal = useRef();

  const filteredActivities = tasks.filter((task) => {
    return task.table === id;
  });

  function handleDragStart(event, activity) {
    event.dataTransfer.setData("actId", activity.id);
  }

  function handleOpenModal() {
    modal.current.open();
  }

  return (
    <>
      <AddingTask ref={modal} />
      <section className={classes.section}>
        <h3 className={classes.h3}>{title}</h3>
        <ul>
          {filteredActivities.map((task) => {
            return (
              <Activity id={id} task={task} handleDragStart={handleDragStart} />
            );
          })}
          <button onClick={handleOpenModal} className={classes.addTaskButton}>
            +
          </button>
        </ul>
      </section>
    </>
  );
}
