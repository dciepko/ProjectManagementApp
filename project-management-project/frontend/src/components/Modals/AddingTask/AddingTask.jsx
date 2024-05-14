import classes from "./AddingTask.module.css";

import { useRef, forwardRef, useState } from "react";
import { useImperativeHandle } from "react";

import AddingInput from "../AddingInput/AddingInput";
import { useSelector } from "react-redux";

const AddingTask = forwardRef(function AddingTask({}, ref) {
  const currentProject = useSelector((state) => state.projects.currentProject);
  const dialog = useRef();
  const formRef = useRef();
  const [newActivity, setNewActivity] = useState({
    activityType: 1,
    tableID: 1,
    labelID: 1,
    projectIds: [currentProject.projectID],
    statusId: 1,
    userIds: [1],
    attachementIds: [1],
    commentIds: [1],
  });

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNewActivity({ ...newActivity, [name]: value });
  }

  function handleCloseButton() {
    dialog.current.close();
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(addNewActivity(newActivity));

    dialog.current.close();
  }

  return (
    <dialog ref={dialog} className={classes.addingModal}>
      <div className={classes.modalContainer}>
        <h2 className={classes.h2}>Dodaj aktywność</h2>
        <form
          className={classes.inputContainer}
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <div className={classes.radioContainer}>
            <div>
              {" "}
              <input type="radio" id="task" name="activity" value="task" />
              <label className={classes.radioLabel} htmlFor="task">
                Task
              </label>
            </div>
            <div>
              {" "}
              <input
                type="radio"
                id="meeting"
                name="activity"
                value="meeting"
              />
              <label className={classes.radioLabel} htmlFor="meeting">
                Meeting
              </label>
            </div>
          </div>
          <div>
            <AddingInput
              type="text"
              identifier="name"
              name="activityName"
              onChange={handleChange}
              value={newActivity.activityName}
            >
              Nazwa
            </AddingInput>
            <AddingInput
              type="textarea"
              identifier="description"
              name="activityDescription"
              onChange={handleChange}
              value={newActivity.activityDescription}
            >
              Opis
            </AddingInput>
            <AddingInput
              type="date"
              identifier="dueDate"
              name="dueDate"
              onChange={handleChange}
              value={newActivity.dueDate}
            >
              Data
            </AddingInput>
            <AddingInput type="number" identifier="priority">
              Priorytet
            </AddingInput>
            <AddingInput type="text" identifier="users">
              Dodaj uczestników
            </AddingInput>
          </div>
          <div className={classes.buttonContainer}>
            <button
              className={classes.cancelButton}
              onClick={handleCloseButton}
            >
              Anuluj
            </button>
            <button className={classes.createButton} type="submit">
              Utwórz
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
});

export default AddingTask;
