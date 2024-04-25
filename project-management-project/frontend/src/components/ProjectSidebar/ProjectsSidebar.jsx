import classes from "./ProjectSidebar.module.css";

import wrapButton from "../../assets/wrap-right-button.png";
import AddingProject from "../Modals/AddingProject/AddingProject";
import { useRef, useState } from "react";

export default function ProjectsSidebar({ projectList, handleClick }) {
  const modal = useRef();

  function handleOpenModal() {
    modal.current.open();
  }

  return (
    <>
      <AddingProject ref={modal} />
      <aside className={classes.aside}>
        <header className={classes.asideHeader}>
          <h2 className={classes.h2}>Twoje Projekty</h2>
          <button className={classes.wrapButton}>
            <img src={wrapButton} alt="Wrap button" />
          </button>
        </header>

        <ul className={classes.ul}>
          {projectList.map((project) => {
            return (
              <li key={project.id}>
                <button
                  className={classes.button}
                  onClick={() => {
                    handleClick(project.id);
                  }}
                >
                  {project.title}
                </button>
              </li>
            );
          })}
          <button className={classes.button} onClick={handleOpenModal}>
            Dodaj nowy projekt
          </button>
        </ul>
      </aside>
    </>
  );
}
