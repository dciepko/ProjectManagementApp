import React, { useState, useRef } from "react";
import classes from "./StatusList.module.css";
import arrow from "../../../assets/arrow-down-icon.png";
import info from "../../../assets/info-icon.png";
import change from "../../../assets/switch-icon.png";
import wrap from "../../../assets/wrap-down2.png";
import user1 from "../../../assets/user-placeholder.png";
import user2 from "../../../assets/user-placeholder2.png";
import TaskModal from "../../Modals/TaskModal/TaskModal";

export default function StatusList({
  activities,
  activitiesListChange,
  title,
  id,
  color,
}) {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const modal = useRef();

  const filteredActivities = activities.filter((activity) => {
    return activity.tableID === id;
  });

  const handleOpenModal = (activity) => {
    setSelectedActivity(activity);
    modal.current.open();
  };

  return (
    <section>
      <div className={classes.statusLine} style={{ backgroundColor: color }}>
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
          <div className={classes.activityLine} key={activity.activityID}>
            <div>{activity.activityName}</div>
            <div>
              <button
                className={classes.optionButton}
                onClick={() => handleOpenModal(activity)}
              >
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

      {selectedActivity && (
        <TaskModal
          ref={modal}
          task={selectedActivity}
          checklist={selectedActivity.checklist}
        />
      )}
    </section>
  );
}
