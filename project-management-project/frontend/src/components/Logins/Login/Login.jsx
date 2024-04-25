import {
  hasMinLength,
  isEmail,
  isNotEmpty,
} from "../../../util/validationFunctions.js";

import Input from "../Input/Input";

import { useInput } from "../../../hooks/useInput.js";

import classes from "./Login.module.css";

export default function Login() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => isNotEmpty(value) && hasMinLength(value, 6));

  function handleSubmit(event) {
    event.preventDefault();
    console.log(emailValue, passwordValue);
  }

  return (
    <>
      <div className={classes.imgContainer}></div>
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
            error={emailHasError && "Wprowadź poprawny adres email"}
            placeholder="Wprowadź swój adres email"
          />
          <Input
            label="Hasło"
            id="password"
            type="password"
            name="password"
            onBlur={handlePasswordBlur}
            onChange={handlePasswordChange}
            value={passwordValue}
            error={passwordHasError && "Wprowadź poprawne hasło"}
            placeholder="Wprowadź swoje hasło"
          />

          <div className={classes.buttonsContainer}>
            <button className={classes.loginButton}>Zaloguj się</button>
          </div>
          <div className={classes.buttonWithText}>
            <span className={classes.textBesideButton}>Nie masz konta?</span>
            <button className={classes.registerButton}>Zarejestruj się!</button>
          </div>
        </div>
      </form>
    </>
  );
}
