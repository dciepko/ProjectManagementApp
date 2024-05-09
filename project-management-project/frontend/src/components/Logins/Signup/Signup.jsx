import {
  hasMinLength,
  isNotEmpty,
  isEmail,
} from "../../../util/validationFunctions.js";
import Input from "../Input/Input";

import { useInput } from "../../../hooks/useInput.js";
import classes from "./Signup.module.css";
import { Link } from "react-router-dom";

export default function Signup() {
  const {
    value: firstNameValue,
    handleInputChange: handleFirstNameChange,
    handleInputBlur: handleFirstNameBlur,
    hasError: firstNameHasError,
  } = useInput("", (value) => isNotEmpty(value));
  const {
    value: lastNameValue,
    handleInputChange: handleLastNameChange,
    handleInputBlur: handleLastNameBlur,
    hasError: lastNameHasError,
  } = useInput("", (value) => isNotEmpty(value));
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));
  const {
    value: nickValue,
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
  const {
    value: passwordRepeatValue,
    handleInputChange: handlePasswordRepeatChange,
    handleInputBlur: handlePasswordRepeatBlur,
    hasError: passwordRepeatHasError,
  } = useInput("", (value) => isNotEmpty(value) && hasMinLength(value, 6));

  function handleSubmit(event) {
    event.preventDefault();
    console.log(
      firstNameValue,
      lastNameValue,
      emailValue,
      nickValue,
      passwordValue,
      passwordRepeatValue
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.imgContainer}></div>
      <div className={classes.formContainer}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <h2 className={classes.h2}>Zarejestruj się</h2>
          <div className={classes.inputsContainer}>
            <Input
              label="Imię"
              id="firstName"
              type="text"
              name="firstName"
              onBlur={handleFirstNameBlur}
              onChange={handleFirstNameChange}
              value={firstNameValue}
              error={firstNameHasError && "Wprowadź porawne imię"}
              placeholder="Wprowadź swoje imię"
            />
            <Input
              label="Nazwisko"
              id="lastName"
              type="text"
              name="lastName"
              onBlur={handleLastNameBlur}
              onChange={handleLastNameChange}
              value={lastNameValue}
              error={lastNameHasError && "Wprowadź porawne nazwisko"}
              placeholder="Wprowadź swoje nazwisko"
            />
            <Input
              label="Email"
              id="email"
              type="email"
              name="email"
              onBlur={handleEmailBlur}
              onChange={handleEmailChange}
              value={emailValue}
              error={emailHasError && "Wprowadź porawny adres email"}
              placeholder="Wprowadź swój adres email"
            />
            <Input
              label="Nazwa użytkownika"
              id="nick"
              type="text"
              name="nick"
              onBlur={handleNickBlur}
              onChange={handleNickChange}
              value={nickValue}
              error={nickHasError && "Wprowadź porawny nick"}
              placeholder="Wprowadź swoją nazwę użytkownika"
            />
            <Input
              label="Hasło"
              id="password"
              type="password"
              name="password"
              onBlur={handlePasswordBlur}
              onChange={handlePasswordChange}
              value={passwordValue}
              error={passwordHasError && "Wprowadź porawne hasło"}
              placeholder="Wprowadź swoje hasło"
            />
            <Input
              label="Powtórz hasło"
              id="passwordRepeat"
              type="password"
              name="passwordRepeat"
              onBlur={handlePasswordRepeatBlur}
              onChange={handlePasswordRepeatChange}
              value={passwordRepeatValue}
              error={passwordRepeatHasError && "Wprowadź porawne hasło"}
              placeholder="Powtórz swoje hasło"
            />
            <div className={classes.buttonsContainer}>
              <button className={classes.registerButton}>
                Zarejestruj się
              </button>
              <Link to="/login" className={classes.cancelButton}>
                Anuluj
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
