import { forwardRef, useImperativeHandle, useRef } from "react";
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

  return createPortal(
    <dialog ref={dialog} className={classes.addingModal}>
      <h2 className={classes.h2}>Nowy projekt</h2>
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
        <button className={classes.cancelButton}>Anuluj</button>
        <button className={classes.createButton}>Utwórz</button>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
});

export default AddingProject;
