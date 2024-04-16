import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import classes from "./AddingProject.module.css";
import { createPortal } from "react-dom";
import AddingInput from "../AddingInput/AddingInput";

const AddingProject = forwardRef(function Modal({}, ref) {
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
    console.log("Dodano nowy projekt!");
  }

  return createPortal(
    <dialog ref={dialog} className={classes.addingModal}>
      <div className={classes.modalContainer}>
        <h2 className={classes.h2}>Nowy projekt</h2>
        <form onSubmit={handleSubmit}>
          <div className={classes.inputContainer}>
            <AddingInput type="text" identifier="name">
              Nazwa projektu
            </AddingInput>
            <AddingInput type="textarea" identifier="description">
              Opis projektu
            </AddingInput>
            <AddingInput type="date" identifier="startDate">
              Planowana data rozpoczęcia
            </AddingInput>
            <AddingInput type="text" identifier="team">
              Wybierz zespół
            </AddingInput>
          </div>
          <div className={classes.buttonContainer}>
            <button
              onClick={handleCloseButton}
              className={classes.cancelButton}
            >
              Anuluj
            </button>
            <button className={classes.createButton} type="submit">
              Utwórz
            </button>
          </div>
        </form>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
});

export default AddingProject;
