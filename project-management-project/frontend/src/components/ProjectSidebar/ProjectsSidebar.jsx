import classes from "./ProjectsSidebar.module.css";

import wrapButton from "../../assets/wrap-right-button.png";
import AddingProject from "../Modals/AddingProject/AddingProject";
import { useRef } from "react";

export default function ProjectsSidebar({
  projectList,
  handleClick,
  onReload,
}) {
  const modal = useRef();

  function handleOpenModal() {
    modal.current.open();
  }

  return (
    <>
      <AddingProject ref={modal} onReload={onReload} />
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
              <li key={project.projectID}>
                <button
                  className={classes.button}
                  onClick={() => {
                    handleClick(project.projectID);
                  }}
                >
                  {project.projectName}
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
