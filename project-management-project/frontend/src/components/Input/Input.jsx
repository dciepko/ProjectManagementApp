import classes from "./Input.module.css";

export default function Login({ label, id, ...props }) {
  return (
    <div className={classes.inputSection}>
      <label htmlFor={id}>{label}</label>
      <input className={classes.inputField} id={id} {...props} />
    </div>
  );
}
