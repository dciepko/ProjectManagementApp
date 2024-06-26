import classes from "./ActivityHomeElement.module.css";

import check from "../../assets/check.png";

export default function ActivityHomeElement({ activityText, onClick, notId }) {
  return (
    <div className={classes.container}>
      <div className={classes.mainPart}>
        <div className={classes.namePart}>{activityText}</div>
      </div>
      <div className={classes.descriptionPart}>
        <button
          className={classes.okButton}
          onClick={() => {
            onClick(notId);
          }}
        >
          <img src={check} alt="checkMark" />
        </button>
      </div>
    </div>
  );
}
