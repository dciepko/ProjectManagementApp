import Input from "../Input/Input";

import { hasMinLength, isNotEmpty } from "../../../util/validationFunctions.js";

import { useInput } from "../../../hooks/useInput.js";

import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

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

  async function handleSubmit(event) {
    event.preventDefault();

    if (nickHasError || passwordHasError || !nicknameValue || !passwordValue) {
      alert("Proszę wypełnić wszystkie pola poprawnie.");
      return;
    }

    const authData = {
      userNickname: nicknameValue,
      userPassword: passwordValue,
    };

    const response = await fetch("http://localhost:8080/login", {
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
      localStorage.setItem("token", token);
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 24);
      localStorage.setItem("expiration", expiration.toISOString());

      navigate("/home");
    }
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
