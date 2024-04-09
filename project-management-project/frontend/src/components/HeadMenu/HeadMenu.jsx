import classes from "./HeadMenu.module.css";

export default function HeadMenu() {
  return (
    <header className={classes.header}>
      <h1 className={classes.h1}>Katapulta</h1>
      <menu className={classes.menu}>
        <ul className={classes.ul}>
          <li>
            <button className={classes.button}>Twoja praca</button>
          </li>
          <li>
            <button className={classes.button}>Projekty</button>
          </li>
          <li>
            <button className={classes.button}>Zespoły</button>
          </li>
          <li>
            <button className={classes.button}>Szybkie utworzenie</button>
          </li>
        </ul>
      </menu>
      <span className={classes.toTheRight}>
        <div className={classes.avatarImage}>A</div>
        <input
          className={classes.searchBar}
          type="text"
          placeholder="Wyszukaj"
        />
      </span>
    </header>
  );
}
