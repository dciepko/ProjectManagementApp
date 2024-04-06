import classes from "./TimeTable.module.css";

export default function TimeTable({ title, tasks }) {
  return (
    <section className={classes.section}>
      <h3>{title}</h3>
      <ul>
        {tasks.map((task) => {
          return <p className={classes.pTask}>{task}</p>;
        })}
      </ul>
    </section>
  );
}
