import { forwardRef, useImperativeHandle, useRef } from "react";
import classes from "./TaskModal.module.css";
import { createPortal } from "react-dom";
import { deleteActivity } from "../../../store/activity-slice";
import { useDispatch } from "react-redux";

const TaskModal = forwardRef(function TaskModal({ task, checklist }, ref) {
  const dialog = useRef();

  const dispatch = useDispatch();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  function handleDeleteButton() {
    const result = confirm("Czy na pewno chcesz usunąć tę aktywność?");
    if (result) {
      dispatch(deleteActivity(task.activityID));
    }
  }

  function handleCloseButton() {
    dialog.current.close();
  }

  return createPortal(
    <dialog ref={dialog} className={classes.addingModal}>
      <div className={classes.modalContainer}>
        <h2 className={classes.h2}>{task.activityName}</h2>

        <div className={classes.informationContainer}>
          {" "}
          <div>{task.dueDate}</div>
          <div>{task.activityDescription}</div>
        </div>
        <div>
          {checklist &&
            checklist.map((element) => {
              return (
                <div key={element.id} className={classes.singleInputContainer}>
                  <input
                    className={classes.checkbox}
                    type="checkbox"
                    id={element.id}
                    name="subtasks"
                  />
                  <label htmlFor={element.id}>{element.name}</label>
                </div>
              );
            })}
        </div>
        <div className={classes.buttonContainer}>
          <button className={classes.closeButton} onClick={handleCloseButton}>
            Zamknij
          </button>
          <button onClick={handleDeleteButton}>kosz</button>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
});

export default TaskModal;
