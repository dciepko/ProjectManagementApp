import classes from "./Login.module.css";

export default function Login() {
  return (
    <form className={classes.loginContainer}>
      <h2 className={classes.h2}>Zaloguj się</h2>
      <div className={classes.inputsContainer}>
        <div className={classes.inputSection}>
          <label htmlFor="email">Email</label>
          <input
            className={classes.inputField}
            id="email"
            type="email"
            name="email"
          />
        </div>
        <div className={classes.inputSection}>
          <label htmlFor="password">Password</label>
          <input
            className={classes.inputField}
            id="password"
            type="password"
            name="password"
          />
        </div>
        <div>
          <button className={classes.formButton}>Reset</button>
          <button className={classes.formButton}>Login</button>
        </div>
      </div>
    </form>
  );
}
