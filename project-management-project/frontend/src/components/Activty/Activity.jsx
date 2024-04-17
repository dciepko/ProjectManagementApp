import classes from "./Activity.module.css";

import DropIndicator from "../DropIndicator/DropIndicator";

export default function Activity({ id, task, handleDragStart }) {
  return (
    <>
      <DropIndicator table={id} beforeId={task.id} />
      <div
        draggable
        className={classes.activityContainer}
        onDragStart={(event) => handleDragStart(event)}
      >
        {task.title}
      </div>
    </>
  );
}
