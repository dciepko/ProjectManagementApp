import classes from "./HomePage.module.css";

import ActivityHomeElement from "../../components/ActivityHomeElement/ActivityHomeElement";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchWorkspacesAction } from "../../store/worskpace-slice";

export default function HomePage() {
  const dispatch = useDispatch();
  const workspaces = useSelector((state) => state.workspaces.workspaces);

  const [currentWorkspaces, setCurrentWorkspaces] = useState([]);

  useEffect(() => {
    dispatch(fetchWorkspacesAction());
  }, [dispatch]);

  useEffect(() => {
    if (workspaces.length > 0) {
      setCurrentWorkspaces(workspaces);
    }
  }, [workspaces]);

  return (
    <>
      <main className={classes.main}>
        <nav className={classes.nav}>
          <div className={classes.navUp}>
            {currentWorkspaces.map((workspace) => {
              return (
                <Link
                  to={`/workspace/${workspace.workspaceID}`}
                  className={classes.navUpButton}
                  key={workspace.workspaceID}
                >
                  {workspace.workspaceName}
                </Link>
              );
            })}
            <a href="#" className={classes.navUpButton}>
              Nowy Workspace
            </a>
          </div>
          <div className={classes.navDown}>
            <a href="#" className={classes.navDownButton}>
              Twój profil
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
