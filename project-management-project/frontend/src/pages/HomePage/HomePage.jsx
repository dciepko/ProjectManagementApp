import classes from "./HomePage.module.css";

import ActivityHomeElement from "../../components/ActivityHomeElement/ActivityHomeElement";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <main className={classes.main}>
        <nav className={classes.nav}>
          <div className={classes.navUp}>
            <Link to="/workspace" className={classes.navUpButton}>
              Projekty
            </Link>
            <a href="#" className={classes.navUpButton}>
              Strona główna
            </a>
          </div>
          <div className={classes.navDown}>
            <a href="#" className={classes.navDownButton}>
              Twój profil
            </a>
            <a href="#" className={classes.navDownButton}>
              Twoje zespoły
            </a>
            <a href="#" className={classes.navDownButton}>
              Ustawienia
            </a>
          </div>
        </nav>
        <section className={classes.mainSection}>
          <div className={classes.centralPart}>
            <h1 className={classes.h1}>Twoje najnowsze powiadomienia:</h1>
            <div>
              <ActivityHomeElement />
              <ActivityHomeElement />
              <ActivityHomeElement />
            </div>
          </div>
          <aside className={classes.aside}>
            <a href="#" className={classes.asideButton}>
              Powiadomienia
            </a>
            <a href="#" className={classes.asideButton}>
              Ten tydzień
            </a>
            <a href="#" className={classes.asideButton}>
              W trakcie
            </a>
            <a href="#" className={classes.asideButton}>
              Meetingi
            </a>
          </aside>
        </section>
      </main>
    </>
  );
}
