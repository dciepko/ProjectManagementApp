import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import classes from "./AddingProject.module.css";
import { createPortal } from "react-dom";
import AddingInput from "../AddingInput/AddingInput";
import { useDispatch } from "react-redux";
import { addNewProject } from "../../../store/projects-slice";

const AddingProject = forwardRef(function Modal({}, ref) {
  const dispatch = useDispatch();
  const dialog = useRef();
  const [newProject, setNewProject] = useState({
    ownerID: 1,
    userIds: [1],
    activityIds: [],
    teamId: 1,
    statusId: 1,
    tableId: 1,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNewProject({ ...newProject, [name]: value });
    console.log(newProject);
  }

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
    dispatch(addNewProject(newProject));
  }

  return createPortal(
    <dialog ref={dialog} className={classes.addingModal}>
      <div className={classes.modalContainer}>
        <h2 className={classes.h2}>Nowy projekt</h2>
        <form onSubmit={handleSubmit}>
          <div className={classes.inputContainer}>
            <AddingInput
              type="text"
              identifier="name"
              name="projectName"
              onChange={handleChange}
            >
              Nazwa projektu
            </AddingInput>
            <AddingInput
              type="textarea"
              identifier="description"
              name="projectDescription"
              onChange={handleChange}
            >
              Opis projektu
            </AddingInput>
            <AddingInput
              type="date"
              identifier="startDate"
              name="startDate"
              onChange={handleChange}
            >
              Planowana data rozpoczęcia
            </AddingInput>
            <AddingInput
              type="date"
              identifier="endDate"
              name="endDate"
              onChange={handleChange}
            >
              Planowana data zakończenia
            </AddingInput>
            <AddingInput
              type="text"
              identifier="team"
              name="teamId"
              onChange={handleChange}
            >
              Wybierz zespół
            </AddingInput>
            <AddingInput
              type="text"
              identifier="team"
              name="userIds"
              onChange={handleChange}
            >
              Dodaj uczestników
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
