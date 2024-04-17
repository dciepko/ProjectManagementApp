import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import classes from "./TaskModal.module.css";
import { createPortal } from "react-dom";

const TaskModal = forwardRef(function TaskModal({ task, checklist }, ref) {
  const dialog = useRef();

  console.log(checklist);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  function handleCloseButton() {
    dialog.current.close();
  }

  return createPortal(
    <dialog ref={dialog} className={classes.addingModal}>
      <div className={classes.modalContainer}>
        <h2 className={classes.h2}>{task.title}</h2>
        <div>...</div>
        <div>
          {checklist &&
            checklist.map((element) => {
              return (
                <div key={element.id}>
                  <input type="checkbox" id={element.name} name="subtasks" />
                  <label htmlFor={element.name}>{element.name}</label>
                </div>
              );
            })}
        </div>
        <button onClick={handleCloseButton}>Zamknij</button>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
});

export default TaskModal;
