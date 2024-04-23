import classes from "./ProjectBoardGroup.module.css";

export default function ProjectBoardGroup() {
  return (
    <div className={classes.gruopContainer}>
      <button
        className={classes.groupButton}
        style={{ backgroundColor: "red" }}
      >
        Wysoki Priorytet
      </button>
      <button
        className={classes.groupButton}
        style={{ backgroundColor: "#44BA26" }}
      >
        Na ten tydzień
      </button>
      <button
        className={classes.groupButton}
        style={{ backgroundColor: "#D4AF51" }}
      >
        W trakcie
      </button>
      <button
        className={classes.groupButton}
        style={{ backgroundColor: "orange" }}
      >
        Twoje zadania
      </button>
      <button
        className={classes.groupButton}
        style={{ backgroundColor: "purple" }}
      >
        Meetingi
      </button>
      <button
        className={classes.groupButton}
        style={{ backgroundColor: "gray" }}
      >
        +
      </button>
    </div>
  );
}
