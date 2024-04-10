import Input from "../Input/Input";

import classes from "./Signup.module.css";

export default function Signup() {
  return (
    <form className={classes.formContainer}>
      <h2 className={classes.h2}>Zarejestruj się</h2>
      <div className={classes.inputsContainer}>
        <Input label="Imię" id="firstName" type="text" name="firstName" />
        <Input label="Nazwisko" id="lastName" type="text" name="lastName" />
        <Input label="Email" id="email" type="email" name="email" />
        <Input label="Nazwa użytkownika" id="nick" type="text" name="nick" />
        <Input label="Hasło" id="password" type="password" name="password" />
        <Input
          label="Powtórz hasło"
          id="passwordRepeat"
          type="password"
          name="passwordRepeat"
        />
        <div>
          <button className={classes.formButton}>Reset</button>
          <button className={classes.formButton}>Utwórz konto</button>
        </div>
      </div>
    </form>
  );
}
