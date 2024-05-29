import classes from "./StatusList.module.css";
import arrow from "../../../assets/arrow-down-icon.png";
import info from "../../../assets/info-icon.png";
import change from "../../../assets/switch-icon.png";
import wrap from "../../../assets/wrap-down2.png";
import user1 from "../../../assets/user-placeholder.png";
import user2 from "../../../assets/user-placeholder2.png";

export default function StatusList({
  activities,
  activitiesListChange,
  title,
  id,
}) {
  const filteredActivities = activities.filter((activity) => {
    return activity.tableID === id;
  });
  return (
    <section>
      <div className={classes.statusLine}>
        <div>{title}</div>
        <div>
          <button className={classes.wrapButton}>
            <img src={wrap} alt="wrap button" />
          </button>
        </div>
        <div>Priorytet</div>
        <div>Uczestnicy</div>
        <div>Data</div>
      </div>

      {filteredActivities.map((activity) => {
        return (
          <div className={classes.activityLine}>
            <div>{activity.activityName}</div>
            <div>
              <button className={classes.optionButton}>
                <img src={info} alt="info button" />
              </button>
              <button className={classes.optionButton}>
                <img src={arrow} alt="arrow button" />
              </button>
              <button className={classes.optionButton}>
                <img src={change} alt="switch button" />
              </button>
            </div>
            <div>{activity.activityPriority}</div>
            <div>
              <button className={classes.avatarImage}>
                <img src={user1} alt="user-avatar" />
              </button>
            </div>
            <div>{activity.dueDate}</div>
          </div>
        );
      })}
    </section>
  );
}
