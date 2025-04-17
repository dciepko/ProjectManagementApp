import classes from "./ProjectHeader.module.css";

import filters from "../../../assets/filters-icon.png";
import group from "../../../assets/group-icon.png";
import plus from "../../../assets/plus-icon.png";
import wrap from "../../../assets/wrap-down-button.png";
import wrapUp from "../../../assets/wrap-up-button.png";
import bin from "../../../assets/trash.png";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../../store/projects-slice";

export default function ProjectHeader({
  currentProject,
  selectedOption,
  onSelectChange,
}) {
  const [viewType, setViewType] = useState("wrapped");
  const dispatch = useDispatch();

  function handleWrapButton() {
    {
      viewType === "wrapped"
        ? setViewType("unwrapped")
        : setViewType("wrapped");
    }
  }

  function handleDeleteButton() {
    const result = confirm("Czy na pewno chcesz usunąć ten projekt?");
    if (result) {
      dispatch(deleteProject(currentProject.projectID));
    }
  }

  return (
    <header
      className={
        viewType === "wrapped" ? classes.header : classes.headerUnwrapped
      }
    >
      <h1 className={classes.h1}>{currentProject.projectName}</h1>
      <button className={classes.unwrapButton} onClick={handleWrapButton}>
        {viewType === "wrapped" ? (
          <img src={wrap} alt="unwrap header" />
        ) : (
          <img src={wrapUp} alt="wrap header" />
        )}
      </button>
      {viewType === "unwrapped" && (
        <button className={classes.deleteButton} onClick={handleDeleteButton}>
          <img src={bin} alt="binIcon" />
        </button>
      )}
      {viewType === "unwrapped" && (
        <section>
          <div className={classes.descriptionField}>
            {currentProject.projectDescription}
          </div>
          <div className={classes.dateField}>
            Data rozpoczęcia: {currentProject.startDate}
          </div>
          <div className={classes.dateField}>
            Planowana data zakończenia: {currentProject.endDate}
          </div>
        </section>
      )}
      <section className={classes.optionButtonsContainer}>
        <select
          value={selectedOption}
          onChange={onSelectChange}
          className={classes.selectButton}
        >
          <option value="table">Tablica</option>
          <option value="long">Podłużny</option>
          <option value="group">Grupowanie</option>
        </select>
        <button className={classes.optionButton}>
          <img src={filters} alt="filter button" />
        </button>
        <button className={classes.optionButton}>
          <img src={group} alt="group button" />
        </button>
        <button className={classes.optionButton}>
          <img src={plus} alt="add button" />
        </button>
      </section>
    </header>
  );
}
