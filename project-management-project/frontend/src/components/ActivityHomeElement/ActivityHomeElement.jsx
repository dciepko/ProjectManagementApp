import classes from "./ActivityHomeElement.module.css";

export default function ActivityHomeElement() {
  return (
    <div className={classes.container}>
      <div className={classes.mainPart}>
        <div className={classes.namePart}>Task1</div>
        <div className={classes.mainP}>Projekt 1: Do Zrobienia</div>
      </div>
      <div className={classes.descriptionPart}>
        <p>Dodano Cię do aktywności!</p>
      </div>
    </div>
  );
}
