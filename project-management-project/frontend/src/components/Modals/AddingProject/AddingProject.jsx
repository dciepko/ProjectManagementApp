import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import classes from "./AddingProject.module.css";
import { createPortal } from "react-dom";
import AddingInput from "../AddingInput/AddingInput";
import { useDispatch } from "react-redux";
import { addNewProject } from "../../../store/projects-slice";
import { useParams } from "react-router-dom";
import UserSelect from "../UserSelect/UserSelect";

const AddingProject = forwardRef(function Modal({ onReload }, ref) {
  const { workspaceID } = useParams();
  const dispatch = useDispatch();
  const dialog = useRef();
  const formRef = useRef();
  const currentUserID = localStorage.getItem("currentUserID");
  const [newProject, setNewProject] = useState({
    projectName: "",
    projectDescription: "",
    startDate: "",
    endDate: "",
    ownerID: currentUserID,
    userIds: [1],
    activityIds: [],
    teamIds: [1],
    statusId: 1,
    workspaceID: workspaceID,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNewProject({ ...newProject, [name]: value });
  }

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  function handleCloseButton() {
    formRef.current.reset();
    dialog.current.close();
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(addNewProject(newProject, workspaceID));
    onReload();
    dialog.current.close();
  }

  return createPortal(
    <dialog ref={dialog} className={classes.addingModal}>
      <div className={classes.modalContainer}>
        <h2 className={classes.h2}>Nowy projekt</h2>
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className={classes.inputContainer}>
            <AddingInput
              type="text"
              identifier="name"
              name="projectName"
              onChange={handleChange}
              value={newProject.projectName}
            >
              Nazwa projektu
            </AddingInput>
            <AddingInput
              type="textarea"
              identifier="description"
              name="projectDescription"
              onChange={handleChange}
              value={newProject.projectDescription}
            >
              Opis projektu
            </AddingInput>
            <AddingInput
              type="date"
              identifier="startDate"
              name="startDate"
              onChange={handleChange}
              value={newProject.startDate}
            >
              Planowana data rozpoczęcia
            </AddingInput>
            <AddingInput
              type="date"
              identifier="endDate"
              name="endDate"
              onChange={handleChange}
              value={newProject.endDate}
            >
              Planowana data zakończenia
            </AddingInput>
            <AddingInput
              type="text"
              identifier="team"
              name="teamId"
              onChange={handleChange}
              value={newProject.userIds}
            >
              Wybierz zespół
            </AddingInput>
            {/* <AddingInput
              type="text"
              identifier="team"
              name="userIds"
              onChange={handleChange}
              value={newProject.teamId}
            >
              Dodaj uczestników
            </AddingInput> */}
            <UserSelect />
          </div>
          <div className={classes.buttonContainer}>
            <button
              className={classes.cancelButton}
              type="reset"
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
    </dialog>,
    document.getElementById("modal")
  );
});

export default AddingProject;
