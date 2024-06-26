import classes from "./ActivityHomeElement.module.css";

import check from "../../assets/check.png";

export default function ActivityHomeElement({ activityText }) {
  return (
    // <div className={classes.container}>
    //   <div className={classes.mainPart}>
    //     <div className={classes.namePart}>Task1</div>
    //     <div className={classes.mainP}>Projekt 1: Do Zrobienia</div>
    //   </div>
    //   <div className={classes.descriptionPart}>
    //     <p>Dodano Cię do aktywności!</p>
    //   </div>
    // </div>
    <div className={classes.container}>
      <div className={classes.mainPart}>
        <div className={classes.namePart}>{activityText}</div>
      </div>
      <div className={classes.descriptionPart}>
        <button className={classes.okButton}>
          <img src={check} alt="checkMark" />
        </button>
      </div>
    </div>
  );
}
