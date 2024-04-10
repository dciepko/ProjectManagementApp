import classes from "./Login.module.css";

import Input from "../Input/Input";
import { useInput } from "../../hooks/useInput";

export default function Login() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
  } = useInput("");

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
  } = useInput("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(emailValue, passwordValue);
  }

  return (
    <form onSubmit={handleSubmit} className={classes.formContainer}>
      <h2 className={classes.h2}>Zaloguj się</h2>
      <div className={classes.inputsContainer}>
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          value={emailValue}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          value={passwordValue}
        />
        <div>
          <button className={classes.formButton}>Reset</button>
          <button className={classes.formButton}>Zaloguj</button>
        </div>
      </div>
    </form>
  );
}
