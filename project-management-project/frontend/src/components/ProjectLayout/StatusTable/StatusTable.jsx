import { useEffect, useRef, useState } from "react";
import AddingTask from "../../Modals/AddingTask/AddingTask.jsx";
import ColorModal from "../../Modals/ColorModal/ColorModal.jsx";
import classes from "./StatusTable.module.css";
import Activity from "../Activty/Activity.jsx";

export default function TimeTable({ title, id, tasks, onReload, color }) {
  const [isActive, setIsActive] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(title);

  const modal = useRef();
  const colorModal = useRef();

  const filteredActivities = tasks.filter((task) => {
    return task.tableID === id;
  });

  function handleNewActivity() {
    onReload();
  }

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

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

  function handleSelectChange(event) {
    if (event.target.value === "delete") {
      console.log("Usuwanie");
    }
    if (event.target.value === "color") {
      console.log("zmieniamy kolor");
      colorModal.current.open();
    }
  }

  return (
    <>
      <AddingTask ref={modal} tableID={id} handleAdd={handleNewActivity} />
      <ColorModal ref={colorModal} />
      <section
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={!isActive ? classes.section : classes.sectionActive}
        style={{ backgroundColor: color }}
      >
        <div className={classes.nonListPart}>
          {!isEditing ? (
            <h3 className={classes.h3} onDoubleClick={handleDoubleClick}>
              {text}
            </h3>
          ) : (
            <input
              className={classes.nameChangeInput}
              style={{ backgroundColor: color }}
              type="text"
              value={text}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          )}
          <select
            value="..."
            className={classes.sideButton}
            onChange={handleSelectChange}
          >
            <option value="...">...</option>
            <option value="delete">Usuń</option>
            <option value="color">Zmień kolor</option>
          </select>
        </div>

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
