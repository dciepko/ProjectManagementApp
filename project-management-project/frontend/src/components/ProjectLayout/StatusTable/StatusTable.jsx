import { useRef, useState } from "react";
import AddingTask from "../../Modals/AddingTask/AddingTask.jsx";
import ColorModal from "../../Modals/ColorModal/ColorModal.jsx";
import classes from "./StatusTable.module.css";
import Activity from "../Activty/Activity.jsx";
import { editingActivity } from "../../../store/activity-slice.js";
import { useDispatch } from "react-redux";
import { editingTables } from "../../../store/projects-slice.js";

export default function TimeTable({
  title,
  id,
  tasks,
  onReload,
  color,
  onRefresh,
}) {
  const [isActive, setIsActive] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(title);

  const modal = useRef();
  const colorModal = useRef();

  const dispatch = useDispatch();

  if (!tasks || !Array.isArray(tasks)) {
    return <div>Loading...</div>;
  }

  const filteredActivities = tasks.filter((task) => {
    return task.tableID === id;
  });

  function handleNewActivity() {
    onReload([]);
  }

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    dispatch(
      editingTables({
        tableID: id,
        tableName: text,
        tableColor: color,
      })
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      dispatch(
        editingTables({
          tableID: id,
          tableName: text,
          tableColor: color,
        })
      );
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
    let activityToTransfer = tasks.find((act) => act.activityID == activityId);

    if (!activityToTransfer) return;

    activityToTransfer = {
      ...activityToTransfer,
      tableID: id,
    };

    dispatch(editingActivity(activityToTransfer));
    setIsActive(false);
  }

  function handleOpenModal() {
    modal.current.open();
  }

  function handleSelectChange(event) {
    if (event.target.value === "delete") {
    }
    if (event.target.value === "color") {
      colorModal.current.open();
    }
  }

  function handleSaveBoardColorChanges(newColor) {
    dispatch(
      editingTables({
        tableID: id,
        tableName: text,
        tableColor: newColor,
      })
    );
    onRefresh();
  }

  return (
    <>
      <AddingTask ref={modal} tableID={id} handleAdd={handleNewActivity} />
      <ColorModal
        ref={colorModal}
        onColorSubmit={handleSaveBoardColorChanges}
      />
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
