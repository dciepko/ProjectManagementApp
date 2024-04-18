import classes from "./Activity.module.css";

import info from "../../assets/info-circle-icon.png";
import wrapDown from "../../assets/wrap-down-button.png";
import wrapUp from "../../assets/wrap-up-button.png";

import DropIndicator from "../DropIndicator/DropIndicator";
import { useRef, useState } from "react";
import TaskModal from "../TaskModal/TaskModal";

export default function Activity({ id, task, handleDragStart }) {
  const [viewType, setViewType] = useState("wrapped");
  const [progress, setProgress] = useState(0);

  const modal = useRef();

  function handleOpenModal() {
    modal.current.open();
  }

  function handleWrapButton() {
    {
      viewType === "wrapped"
        ? setViewType("unwrapped")
        : setViewType("wrapped");
    }
  }

  function handleCheckboxChange() {
    const checkedCount = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    ).length;
    setProgress(checkedCount);
  }

  return (
    <>
      {/* <DropIndicator table={id} beforeId={task.id} /> */}
      <TaskModal ref={modal} task={task} checklist={task.checklist} />
      {viewType === "wrapped" && (
        <div
          draggable
          className={classes.activityContainer}
          onDragStart={(event) => handleDragStart(event, task)}
        >
          <div>
            <p>{task.title}</p>
            {task.type == "task" && (
              <progress max={task.checklist.length} value={progress} />
            )}
          </div>
          <div className={classes.buttonContainer}>
            <button className={classes.button} onClick={handleOpenModal}>
              <img src={info} alt="" />
            </button>
            {task.type === "task" && (
              <button className={classes.button} onClick={handleWrapButton}>
                <img src={wrapDown} alt="wrap button" />
              </button>
            )}
          </div>
        </div>
      )}

      {viewType === "unwrapped" && (
        <div
          draggable
          className={classes.activityContainer}
          onDragStart={(event) => handleDragStart(event, task)}
        >
          <div>
            <p>{task.title}</p>
            {task.type == "task" && (
              <progress max={task.checklist.length} value={progress} />
            )}
            {task.type == "task" && (
              <div>
                {task.checklist.map((element) => {
                  return (
                    <div
                      className={classes.singleInputContainer}
                      key={element.id}
                    >
                      {" "}
                      <input
                        className={classes.checkbox}
                        type="checkbox"
                        id={element.id}
                        name="subtasks"
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor={element.id}>{element.name}</label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className={classes.buttonContainer}>
            <button className={classes.button} onClick={handleOpenModal}>
              <img src={info} alt="" />
            </button>
            <button className={classes.button} onClick={handleWrapButton}>
              <img src={wrapUp} alt="wrap button" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

//chyba najlepiej bedzie zrobic z elementu osobny komponent i zarzadzac jego stanem status
