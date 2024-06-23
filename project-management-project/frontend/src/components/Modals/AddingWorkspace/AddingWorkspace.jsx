import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import classes from "./AddingWorkspace.module.css";
import { createPortal } from "react-dom";
import AddingInput from "../AddingInput/AddingInput";
import { useDispatch } from "react-redux";
import { addNewWorkspace } from "../../../store/worskpace-slice";
import UserSelect from "../UserSelect/UserSelect";

const AddingWorkspace = forwardRef(function Modal({ onReload }, ref) {
  const dispatch = useDispatch();
  const dialog = useRef();
  const formRef = useRef();
  const currentUser = localStorage.getItem("currentUserID");
  const [newWorkspace, setNewWorkspace] = useState({
    ownerID: currentUser,
    workspaceName: "",
    wsDescription: "",
    logo: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNewWorkspace({ ...newWorkspace, [name]: value });
  }

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  function handleUserChoose(usersList) {
    const idsList = usersList.map((user) => user.userID);
    setNewWorkspace({ ...newWorkspace, userIds: idsList });
  }

  function handleCloseButton() {
    formRef.current.reset();
    dialog.current.close();
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(addNewWorkspace(newWorkspace, currentUser));
    onReload();
    dialog.current.close();
  }

  return createPortal(
    <dialog ref={dialog} className={classes.addingModal}>
      <div className={classes.modalContainer}>
        <h2 className={classes.h2}>Nowy workspace</h2>
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className={classes.inputContainer}>
            <AddingInput
              type="text"
              identifier="name"
              name="workspaceName"
              onChange={handleChange}
              value={newWorkspace.workspaceName}
            >
              Nazwa workspace'a
            </AddingInput>
            <AddingInput
              type="textarea"
              identifier="description"
              name="wsDescription"
              onChange={handleChange}
              value={newWorkspace.wsDescription}
            >
              Opis workspace'a
            </AddingInput>
            <UserSelect onUsersChoose={handleUserChoose} />
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

export default AddingWorkspace;
