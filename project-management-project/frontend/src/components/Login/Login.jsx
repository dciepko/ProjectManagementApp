import classes from "./Login.module.css";

import Input from "../Input/Input";

export default function Login() {
  return (
    <form className={classes.formContainer}>
      <h2 className={classes.h2}>Zaloguj się</h2>
      <div className={classes.inputsContainer}>
        <Input label="Email" id="email" type="email" name="email" />
        <Input label="Password" id="password" type="password" name="password" />
        <div>
          <button className={classes.formButton}>Reset</button>
          <button className={classes.formButton}>Zaloguj</button>
        </div>
      </div>
    </form>
  );
}
