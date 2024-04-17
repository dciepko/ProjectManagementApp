import classes from "./Activity.module.css";

import lupa from "../../assets/find-icon.svg";
import wrap from "../../assets/wrap-down-button.png";

import DropIndicator from "../DropIndicator/DropIndicator";
import { useState } from "react";

export default function Activity({ id, task, handleDragStart }) {
  const [viewType, setViewType] = useState("wrapped");
  const [progress, setProgress] = useState(0);

  function updateProgress() {
    let checked = 0;
  }

  function handleWrapButton() {
    {
      viewType === "wrapped"
        ? setViewType("unwrapped")
        : setViewType("wrapped");
    }
  }

  return (
    <>
      {/* <DropIndicator table={id} beforeId={task.id} /> */}
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
            <button className={classes.button}>O</button>
            {task.type === "task" && (
              <button className={classes.button} onClick={handleWrapButton}>
                <img src={wrap} alt="wrap button" />
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
                    <div key={element.id}>
                      {" "}
                      <input
                        type="checkbox"
                        id={element.name}
                        name="scales"
                        onClick={() => handleCheckboxClick(element.id)}
                      />
                      <label htmlFor={element.name}>{element.name}</label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className={classes.buttonContainer}>
            <button className={classes.button}>O</button>
            <button className={classes.button} onClick={handleWrapButton}>
              <img src={wrap} alt="wrap button" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
