import classes from "./AddingTask.module.css";

import { useRef, forwardRef } from "react";
import { useImperativeHandle } from "react";

import AddingInput from "../AddingInput/AddingInput";

const AddingTask = forwardRef(function AddingTask({}, ref) {
  const dialog = useRef();

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

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Utworzono aktywność");
  }

  return (
    <dialog ref={dialog} className={classes.addingModal}>
      <div className={classes.modalContainer}>
        <h2 className={classes.h2}>Dodaj aktywność</h2>
        <form className={classes.inputContainer} onSubmit={handleSubmit}>
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
            <div>
              {" "}
              <input
                type="radio"
                id="milestone"
                name="activity"
                value="milestone"
              />
              <label className={classes.radioLabel} htmlFor="milestone">
                Milestone
              </label>
            </div>
          </div>
          <div>
            <AddingInput type="text" identifier="name">
              Nazwa
            </AddingInput>
            <AddingInput type="textarea" identifier="description">
              Opis
            </AddingInput>
            <AddingInput type="date" identifier="dueDate">
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
