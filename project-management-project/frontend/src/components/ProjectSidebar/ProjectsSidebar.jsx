import classes from "./ProjectsSidebar.module.css";

import wrapButton from "../../assets/wrap-right-button.png";
import AddingProject from "../Modals/AddingProject/AddingProject";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

export default function ProjectsSidebar({ projectList, handleClick }) {
  const modal = useRef();
  const isMobileScreen = useMediaQuery({ query: "(max-width:320px)" });

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
            {!isMobileScreen && <img src={wrapButton} alt="Wrap button" />}
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
