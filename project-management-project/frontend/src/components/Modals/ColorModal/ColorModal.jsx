import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import classes from "./ColorModal.module.css";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";

const ColorModal = forwardRef(function ColorModal({}, ref) {
  const dialog = useRef();

  const dispatch = useDispatch();

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
  }

  return createPortal(
    <dialog ref={dialog} className={classes.addingModal}>
      <form className={classes.formContainer} onSubmit={handleSubmit}>
        <div className={classes.inputContainer}>
          <input className={classes.colorInput} type="color" />
        </div>
        <div className={classes.buttonContainer}>
          <button
            className={classes.cancelButton}
            onClick={handleCloseButton}
            type="reset"
          >
            Anuluj
          </button>
          <button className={classes.saveButton} type="submit">
            Zapisz
          </button>
        </div>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ColorModal;
