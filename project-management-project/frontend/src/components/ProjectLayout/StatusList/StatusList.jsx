import classes from "./StatusList.module.css";

export default function StatusList({
  activities,
  activitiesListChange,
  title,
  id,
}) {
  const filteredActivities = activities.filter((activity) => {
    return activity.table === id;
  });
  return (
    <section>
      <div className={classes.statusLine}>
        <div>{title}</div>
        <div>Przycisk</div>
        <div>Priorytet</div>
        <div>Uczestnicy</div>
        <div>Data</div>
      </div>

      {filteredActivities.map((activity) => {
        return (
          <div className={classes.activityLine}>
            <div>{activity.title}</div>
            <div>przyciski</div>
            <div>Priorytet</div>
            <div>Uczestnicy</div>
            <div>Data</div>
          </div>
        );
      })}
    </section>
  );
}
