import classes from "./HeadMenu.module.css";
import logo from "../../assets/logo.png";
import user from "../../assets/user-placeholder.png";
import bell from "../../assets/bell-icon.png";
import {
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { getTokenDuration } from "../../util/auth";
import { useEffect } from "react";

export default function HeadMenu() {
  const navigate = useNavigate();

  const token = useLoaderData();
  const submit = useSubmit();
  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    navigate("/");
  }

  return (
    <>
      <header className={classes.header}>
        <div className={classes.logoContainer}>
          <Link to="/home">
            <img src={logo} alt="logo" className={classes.logoImg} />
          </Link>
        </div>
        <menu className={classes.menu}>
          <ul className={classes.ul}>
            <li className={classes.li}>
              <Link href="#" className={classes.button}>
                Twoja praca
              </Link>
            </li>
            <li className={classes.li}>
              <Link to="/call" className={classes.button}>
                Meeting
              </Link>
            </li>
            <li className={classes.li}>
              <Link to="#" className={classes.button}>
                Utwórz
              </Link>
            </li>
          </ul>
        </menu>
        <span className={classes.toTheRight}>
          <button onClick={handleLogout}>Wyloguj</button>
          <button className={classes.avatarImage}>
            <img src={user} alt="user-avatar" />
          </button>
          <button className={classes.notificationImage}>
            <img src={bell} alt="notifications icon" />
          </button>
          {/* <input
            className={classes.searchBar}
            type="search"
            placeholder="Wyszukaj"
          /> */}
        </span>
      </header>
      <Outlet />
    </>
  );
}
