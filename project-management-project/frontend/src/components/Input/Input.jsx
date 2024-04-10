import classes from "./Input.module.css";

export default function Login({ label, id, error, ...props }) {
  return (
    <div className={classes.inputSection}>
      <label htmlFor={id}>{label}</label>
      <input className={classes.inputField} id={id} {...props} />
      <div className={classes.errorContainer}>{error && <p>{error}</p>}</div>
    </div>
  );
}
