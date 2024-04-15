import classes from "./HeadMenu.module.css";
import logo from "../../assets/logo.png";
import user from "../../assets/user-placeholder.png";
import bell from "../../assets/bell-icon.png";

export default function HeadMenu() {
  return (
    <header className={classes.header}>
      <div className={classes.logoContainer}>
        <img src={logo} alt="logo" className={classes.logoImg} />
      </div>
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
            <button className={classes.button}>Utwórz</button>
          </li>
        </ul>
      </menu>
      <span className={classes.toTheRight}>
        <button className={classes.avatarImage}>
          <img src={user} alt="user-avatar" />
        </button>
        <button className={classes.notificationImage}>
          <img src={bell} alt="notifications icon" />
        </button>
        <input
          className={classes.searchBar}
          type="search"
          placeholder="Wyszukaj"
        />
      </span>
    </header>
  );
}
