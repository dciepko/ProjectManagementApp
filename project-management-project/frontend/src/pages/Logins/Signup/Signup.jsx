import {
  hasMinLength,
  isNotEmpty,
  isEmail,
} from "../../../util/validationFunctions.js";
import Input from "../Input/Input.jsx";

import { useInput } from "../../../hooks/useInput.js";
import classes from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export default function Signup() {
  const isMobileScreen = useMediaQuery({ query: "(max-width:320px)" });
  const navigate = useNavigate();

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

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      firstNameHasError ||
      lastNameHasError ||
      emailHasError ||
      nickHasError ||
      passwordHasError ||
      passwordRepeatHasError ||
      !firstNameValue ||
      !lastNameValue ||
      !emailValue ||
      !nickValue ||
      !passwordValue ||
      !passwordRepeatValue ||
      passwordValue !== passwordRepeatValue
    ) {
      alert("Proszę wypełnić wszystkie pola poprawnie.");
      return;
    }

    const authData = {
      userFirstName: firstNameValue,
      userSurename: lastNameValue,
      userEmail: emailValue,
      userNickname: nickValue,
      userPassword: passwordValue,
    };

    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });

    if (response.status === 422 || response.status === 401) {
      return response;
    }

    if (!response.ok) {
      throw new Error("Could not authenticate user.");
    }
    if (response.ok) {
      const resData = await response.json();
      const token = resData.token;
      const loggedUserId = resData.userID;
      localStorage.setItem("token", token);
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 24);
      localStorage.setItem("expiration", expiration.toISOString());

      localStorage.setItem("currentUserID", loggedUserId);

      navigate(`/${loggedUserId}/home`);
    }
  }

  return (
    <div className={classes.container}>
      {!isMobileScreen && <div className={classes.imgContainer}></div>}
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
