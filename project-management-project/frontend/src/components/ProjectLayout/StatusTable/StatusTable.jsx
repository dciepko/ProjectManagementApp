import { useEffect, useRef, useState } from "react";
import AddingTask from "../../Modals/AddingTask/AddingTask.jsx";
import classes from "./StatusTable.module.css";
import Activity from "../Activty/Activity.jsx";

export default function TimeTable({ title, id, tasks, onReload }) {
  const [isActive, setIsActive] = useState(false);

  const modal = useRef();

  const filteredActivities = tasks.filter((task) => {
    return task.tableID === id;
  });

  function handleDragStart(event, activity) {
    event.dataTransfer.setData("actId", activity.activityID);
  }

  function handleDragOver(event) {
    event.preventDefault();
    setIsActive(true);
  }

  function handleDragLeave(event) {
    setIsActive(false);
  }

  function handleDragEnd(event) {
    const activityId = event.dataTransfer.getData("actId");

    let copy = [...tasks];

    let activityToTransfer = copy.find((act) => {
      return act.activityID == activityId;
    });

    if (!activityId) return;

    activityToTransfer = {
      ...activityToTransfer,
      tableID: id,
    };

    copy = copy.filter((act) => {
      return act.activityID != activityId;
    });

    copy.push(activityToTransfer);

    onReload(copy);

    setIsActive(false);
  }

  function handleOpenModal() {
    modal.current.open();
  }

  return (
    <>
      <AddingTask ref={modal} />
      <section
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={!isActive ? classes.section : classes.sectionActive}
      >
        <h3 className={classes.h3}>{title}</h3>
        <ul>
          {filteredActivities.map((task) => {
            return (
              <Activity
                key={task.activityID}
                id={task.activityID}
                task={task}
                handleDragStart={handleDragStart}
              />
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
