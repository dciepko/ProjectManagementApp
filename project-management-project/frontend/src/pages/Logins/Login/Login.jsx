import Input from "../Input/Input";

import {
  hasMinLength,
  isEmail,
  isNotEmpty,
} from "../../../util/validationFunctions.js";

import { useInput } from "../../../hooks/useInput.js";

import classes from "./Login.module.css";
import { Link } from "react-router-dom";

export default function Login() {
  const {
    value: nicknameValue,
    handleInputChange: handleNickChange,
    handleInputBlur: handleNickBlur,
    hasError: nickHasError,
  } = useInput("", (value) => isNotEmpty(value));

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
    <div className={classes.container}>
      <div className={classes.imgContainer}></div>
      <div className={classes.formContainer}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <h2 className={classes.h2}>Zaloguj się</h2>
          <div className={classes.inputsContainer}>
            <Input
              label="Nick"
              id="nickname"
              type="text"
              name="nickname"
              onBlur={handleNickBlur}
              onChange={handleNickChange}
              value={nicknameValue}
              error={nickHasError && "Wprowadź poprawny nick"}
              placeholder="Wprowadź swój nick"
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
              <Link to="/register" className={classes.registerButton}>
                Zarejestruj się!
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
