import classes from "./HomePage.module.css";

import ActivityHomeElement from "../ActivityHomeElement/ActivityHomeElement";
import HeadMenu from "../HeadMenu/HeadMenu";

export default function HomePage() {
  return (
    <>
      <HeadMenu />
      <main className={classes.main}>
        <nav>
          <div>
            <a href="#">Projekty</a>
            <a href="#">Strona główna</a>
          </div>
          <div>
            <a href="#">Twój profil</a>
            <a href="#">Twoje zespoły</a>
            <a href="#">Ustawienia</a>
          </div>
        </nav>
        <div>
          <div>
            <h1>Twoje najnowsze powiadomienia:</h1>
            <div>
              <ActivityHomeElement />
            </div>
          </div>
          <aside>
            <a href="#">Powiadomienia</a>
            <a href="#">Ten tydzień</a>
            <a href="#">W trakcie</a>
            <a href="#">Meetingi</a>
          </aside>
        </div>
      </main>
    </>
  );
}
