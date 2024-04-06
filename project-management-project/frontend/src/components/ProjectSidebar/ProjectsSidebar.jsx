import classes from "./ProjectSidebar.module.css";

export default function ProjectsSidebar({ projectList, handleClick }) {
  return (
    <aside className={classes.aside}>
      <h2 className={classes.h2}>Twoje Projekty</h2>
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
        <button className={classes.button}>Dodaj nowy projekt</button>
      </ul>
    </aside>
  );
}
