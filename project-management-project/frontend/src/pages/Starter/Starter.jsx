import classes from "./Starter.module.css";

import logo from "../../assets/logo.png";
import stain1 from "../../assets/stain1.png";
import stain2 from "../../assets/stain2.png";
import stain3 from "../../assets/stain3.png";
import stain4 from "../../assets/stain4.png";
import { Link } from "react-router-dom";

export default function Starter() {
  return (
    <main className={classes.main}>
      <span className={classes.stain1}>
        <img src={stain1} alt="Stain shape" />
      </span>
      <span className={classes.stain2}>
        <img src={stain2} alt="Stain shape" />
      </span>
      <span className={classes.stain3}>
        <img src={stain3} alt="Stain shape" />
      </span>
      <span className={classes.stain4}>
        <img src={stain4} alt="Stain shape" />
      </span>
      <div className={classes.middleElement}>
        <h1 className={classes.h1}>Projekty w twoich rękach!</h1>
        <h3 className={classes.h3}>Twoje cele, nasza pasja.</h3>
        <h3 className={classes.h3}>Wspólnie tworzymy przyszłość!</h3>
        <Link to="/login" className={classes.joinButton}>
          Dołącz do nas!
        </Link>
      </div>
      <div className={classes.videoContainer}>
        <video className={classes.video} controls>
          <source src="nazwa_pliku.mp4" type="video/mp4" />
          Twoja przeglądarka nie obsługuje tagu video.
        </video>
      </div>
    </main>
  );
}
