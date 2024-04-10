import classes from "./StatusTable.module.css";

export default function TimeTable({ title, tasks }) {
  return (
    <section className={classes.section}>
      <h3>{title}</h3>
      <ul>
        {tasks.map((task) => {
          return <button className={classes.pTask}>{task}</button>;
        })}
        <button className={classes.addTaskButton}>+</button>
      </ul>
    </section>
  );
}
