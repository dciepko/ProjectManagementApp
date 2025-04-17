import classes from "./HeadMenu.module.css";
import logo from "../../assets/logo.png";
import user from "../../assets/user-placeholder.png";
import bell from "../../assets/bell-icon.png";
import menu from "../../assets/menu-icon.png";

import {
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { getTokenDuration } from "../../util/auth";
import { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";

import AddingTask from "../Modals/AddingTask/AddingTask";
import AddingProject from "../Modals/AddingProject/AddingProject";
import AddingWorkspace from "../Modals/AddingWorkspace/AddingWorkspace";

export default function HeadMenu() {
  const isMobileScreen = useMediaQuery({ query: "(max-width: 320px)" });
  const navigate = useNavigate();
  const token = useLoaderData();
  const submit = useSubmit();

  const taskRef = useRef();
  const projectRef = useRef();
  const workspaceRef = useRef();

  const currentUser = localStorage.getItem("currentUserID");

  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
  });
  const buttonRef = useRef(null);
  const createButtonRef = useRef(null);

  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);

  const toggleCreateMenu = () => {
    setIsCreateMenuOpen(!isCreateMenuOpen);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // const handleClickOutside = (event) => {
  //   if (buttonRef.current && !buttonRef.current.contains(event.target)) {
  //     setIsOpen(false);
  //   }

  //   if (
  //     createButtonRef.current &&
  //     !createButtonRef.current.contains(event.target)
  //   ) {
  //     setIsCreateMenuOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom,
        left: rect.left,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isCreateMenuOpen && createButtonRef.current) {
      const rect = createButtonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom,
        left: rect.left,
      });
    }
  }, [isCreateMenuOpen]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    navigate("/");
  }

  function handleOpenProject() {
    console.log("handle open project");
    projectRef.current.open();
  }

  function handleOpenTask() {
    taskRef.current.open();
  }

  function handleOpenWorkspace() {
    workspaceRef.current.open();
  }

  return (
    <>
      <AddingProject ref={projectRef} />
      <AddingTask ref={taskRef} />
      <AddingWorkspace ref={workspaceRef} />
      <header className={classes.header}>
        <div className={classes.logoContainer}>
          <Link to={`/${currentUser}/home`}>
            <img src={logo} alt="logo" className={classes.logoImg} />
          </Link>
        </div>
        <menu className={classes.menu}>
          <ul className={classes.ul}>
            <li className={classes.li}>
              <Link to={`/`} className={classes.button}>
                Twoja praca
              </Link>
            </li>
            <li className={classes.li}>
              <Link to={`/${currentUser}/call`} className={classes.button}>
                Meeting
              </Link>
            </li>
            <li className={classes.li}>
              <button
                ref={createButtonRef}
                onClick={toggleCreateMenu}
                className={classes.button}
              >
                Utwórz
              </button>
              {isCreateMenuOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: `${menuPosition.top}px`,
                    left: `${menuPosition.left}px`,
                    backgroundColor: "white",
                    boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
                    zIndex: 1,
                    borderRadius: "1rem",
                    border: "none",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <button
                    onClick={handleOpenWorkspace}
                    className={classes.createOptionButton}
                  >
                    Workspace
                  </button>
                  <button
                    onClick={handleOpenProject}
                    className={classes.createOptionButton}
                  >
                    Project
                  </button>
                  <button
                    onClick={() => handleOpenTask}
                    className={classes.createOptionButton}
                  >
                    Activity
                  </button>
                </div>
              )}
            </li>
          </ul>
        </menu>
        <span className={classes.toTheRight}>
          <span className={classes.avatarImageWrapper}>
            <button
              ref={buttonRef}
              className={classes.avatarImage}
              onClick={toggleMenu}
            >
              {!isMobileScreen && <img src={user} alt="user-avatar" />}
            </button>

            {isMobileScreen && <img src={menu} alt="menu-icon" />}

            {isOpen && (
              <div
                style={{
                  position: "absolute",
                  top: `${menuPosition.top}px`,
                  left: `${menuPosition.left}px`,
                  backgroundColor: "white",
                  boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
                  zIndex: 1,
                  float: "right",
                  borderRadius: "1rem",
                  border: "none",
                }}
              >
                <button
                  onClick={handleLogout}
                  className={classes.logoutButton}
                  style={{
                    fontSize: "2rem",
                    padding: "1rem",
                    borderRadius: "1rem",
                    border: "none",
                  }}
                >
                  Wyloguj
                </button>
              </div>
            )}
          </span>
          <button className={classes.notificationImage}>
            {!isMobileScreen && <img src={bell} alt="notifications icon" />}
          </button>
        </span>
      </header>
      <Outlet />
    </>
  );
}
