import classes from "./AddingInput.module.css";

export default function AddingInput({
  type,
  identifier,
  children,
  name,
  onChange,
}) {
  return (
    <div className={classes.inputContainer}>
      <label htmlFor={identifier} className={classes.label}>
        {children}
      </label>
      {type !== "textarea" ? (
        <input
          className={classes.input}
          type={type}
          id={identifier}
          name={name}
          onChange={onChange}
        />
      ) : (
        <textarea
          className={classes.input}
          id={identifier}
          name={name}
          onChange={onChange}
        />
      )}
    </div>
  );
}
