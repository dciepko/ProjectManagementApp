import { useRef, useState } from "react";
import AddingTask from "../../Modals/AddingTask/AddingTask.jsx";
import classes from "./StatusTable.module.css";
import Activity from "../Activty/Activity.jsx";

export default function TimeTable({ title, id, tasks, onReload }) {
  const [isActive, setIsActive] = useState(false);

  const modal = useRef();

  const filteredActivities = tasks.filter((task) => {
    return task.table === id;
  });

  //setActivities(filteredActivities);

  function handleDragStart(event, activity) {
    event.dataTransfer.setData("actId", activity.id);
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
    console.log(activityId);

    let copy = [...tasks];
    console.log(copy);

    let activityToTransfer = copy.find((act) => {
      return act.id == activityId;
    });
    console.log(activityToTransfer);
    if (!activityId) return;

    activityToTransfer = { ...activityToTransfer, table: id };
    console.log(activityToTransfer);

    console.log(copy);

    copy = copy.filter((act) => {
      return act.id != activityId;
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
