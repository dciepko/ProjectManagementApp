import classes from "./HomePage.module.css";

import ActivityHomeElement from "../../components/ActivityHomeElement/ActivityHomeElement";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { fetchWorkspacesAction } from "../../store/worskpace-slice";
import AddingWorkspace from "../../components/Modals/AddingWorkspace/AddingWorkspace";
import { fetchUsersAction } from "../../store/user-slice";

export default function HomePage() {
  const dispatch = useDispatch();
  const workspaces = useSelector((state) => state.workspaces.workspaces);

  const currentUser = localStorage.getItem("currentUserID");

  const [currentWorkspaces, setCurrentWorkspaces] = useState([]);
  const [reload, setReload] = useState(false);

  const modal = useRef();

  function handleOpenModal() {
    modal.current.open();
  }

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchWorkspacesAction(currentUser));
  }, [dispatch, reload]);

  useEffect(() => {
    if (workspaces.length > 0) {
      setCurrentWorkspaces(workspaces);
    }
  }, [workspaces]);

  function reloadPage() {
    setReload((reload) => !reload);
  }

  return (
    <>
      <AddingWorkspace ref={modal} onReload={reloadPage} />
      <main className={classes.main}>
        <nav className={classes.nav}>
          <div className={classes.navUp}>
            {currentWorkspaces.map((workspace) => {
              return (
                <Link
                  to={`/${currentUser}/workspace/${workspace.workspaceID}`}
                  className={classes.navUpButton}
                  key={workspace.workspaceID}
                >
                  {workspace.workspaceName}
                </Link>
              );
            })}
            <button onClick={handleOpenModal} className={classes.navUpButton}>
              Nowy Workspace
            </button>
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
