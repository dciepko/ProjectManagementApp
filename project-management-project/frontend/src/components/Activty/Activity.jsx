import classes from "./Activity.module.css";

import lupa from "../../assets/find-icon.svg";
import wrap from "../../assets/wrap-down-button.png";

import DropIndicator from "../DropIndicator/DropIndicator";
import { useState } from "react";

export default function Activity({ id, task, handleDragStart }) {
  const [viewType, setViewType] = useState("wrapped");
  console.log(task.type);

  return (
    <>
      {/* <DropIndicator table={id} beforeId={task.id} /> */}
      {/* {viewType === "wrapped" && (
        <div
          draggable
          className={classes.activityContainer}
          onDragStart={(event) => handleDragStart(event, task)}
        >
          <div>
            <p>{task.title}</p>
            {task.type == "task" && <progress max={100} value={70} />}
          </div>
          <div className={classes.buttonContainer}>
            <button className={classes.button}>O</button>
            <button className={classes.button}>
              <img src={wrap} alt="wrap button" />
            </button>
          </div>
        </div>
      )} */}

      <div
        draggable
        className={classes.activityContainer}
        onDragStart={(event) => handleDragStart(event, task)}
      >
        <div>
          <p>{task.title}</p>
          {task.type == "task" && <progress max={100} value={70} />}
          {task.type == "task" && <div>{task.checklist}</div>}
        </div>
        <div className={classes.buttonContainer}>
          <button className={classes.button}>O</button>
          <button className={classes.button}>
            <img src={wrap} alt="wrap button" />
          </button>
        </div>
      </div>
    </>
  );
}
