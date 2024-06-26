import classes from "./AddingTask.module.css";

import { useRef, forwardRef, useState, useEffect } from "react";
import { useImperativeHandle } from "react";

import AddingInput from "../AddingInput/AddingInput";
import { useDispatch, useSelector } from "react-redux";
import { addNewActivity } from "../../../store/activity-slice";
import UserSelect from "../UserSelect/UserSelect";

const AddingTask = forwardRef(function AddingTask({ tableID, handleAdd }, ref) {
  const dispatch = useDispatch();
  const currentProject = useSelector((state) => state.projects.currentProject);
  const dialog = useRef();
  const formRef = useRef();
  const [newActivity, setNewActivity] = useState({
    activityPriority: 1,
    activityName: "",
    activityDescription: "",
    dueDate: "",
    activityType: 1,
    tableID: 1,
    labelID: 1,
    projectIDs: [],
    statusID: 1,
    userIDs: [1],
    attachementIDs: [],
    commentIDs: [],
  });

  useEffect(() => {
    setNewActivity((newActivity) => ({
      ...newActivity,
      projectID: currentProject.projectID,
      tableID: tableID,
    }));
  }, [currentProject]);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  function handleUserChoose(usersList) {
    const idsList = usersList.map((user) => user.userID);
    console.log(idsList);
    setNewActivity({ ...newActivity, userIDs: idsList });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewActivity({ ...newActivity, [name]: value });
  }

  function handleCloseButton() {
    dialog.current.close();
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log(newActivity);

    dispatch(addNewActivity(newActivity, currentProject.projectID));
    handleAdd();
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
            <AddingInput
              type="number"
              identifier="priority"
              name="activityPriority"
              onChange={handleChange}
              value={newActivity.activityPriority}
            >
              Priorytet
            </AddingInput>
            <UserSelect onUsersChoose={handleUserChoose} />
          </div>
          <div className={classes.buttonContainer}>
            <button
              className={classes.cancelButton}
              onClick={handleCloseButton}
              type="reset"
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
