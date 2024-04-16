import classes from "./AddingInput.module.css";

export default function AddingInput({ type, identifier, children }) {
  return (
    <div className={classes.inputContainer}>
      <label htmlFor={identifier}>{children}</label>
      {type !== "textarea" ? (
        <input type={type} id={identifier} />
      ) : (
        <textarea id={identifier}></textarea>
      )}
    </div>
  );
}
