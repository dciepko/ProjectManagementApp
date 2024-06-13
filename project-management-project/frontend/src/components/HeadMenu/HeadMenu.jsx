// import classes from "./HeadMenu.module.css";
// import logo from "../../assets/logo.png";
// import user from "../../assets/user-placeholder.png";
// import bell from "../../assets/bell-icon.png";
// import {
//   Link,
//   Outlet,
//   useLoaderData,
//   useNavigate,
//   useSubmit,
// } from "react-router-dom";
// import { getTokenDuration } from "../../util/auth";
// import { useEffect, useState } from "react";

// export default function HeadMenu() {
//   const navigate = useNavigate();

//   const token = useLoaderData();
//   const submit = useSubmit();

//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     if (!token) {
//       return;
//     }
//     if (token === "EXPIRED") {
//       submit(null, { action: "/logout", method: "post" });
//       return;
//     }

//     const tokenDuration = getTokenDuration();

//     setTimeout(() => {
//       submit(null, { action: "/logout", method: "post" });
//     }, tokenDuration);
//   }, [token, submit]);

//   function handleLogout() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("expiration");
//     navigate("/");
//   }

//   return (
//     <>
//       <header className={classes.header}>
//         <div className={classes.logoContainer}>
//           <Link to="/home">
//             <img src={logo} alt="logo" className={classes.logoImg} />
//           </Link>
//         </div>
//         <menu className={classes.menu}>
//           <ul className={classes.ul}>
//             <li className={classes.li}>
//               <Link href="#" className={classes.button}>
//                 Twoja praca
//               </Link>
//             </li>
//             <li className={classes.li}>
//               <Link to="/call" className={classes.button}>
//                 Meeting
//               </Link>
//             </li>
//             <li className={classes.li}>
//               <Link to="#" className={classes.button}>
//                 Utwórz
//               </Link>
//             </li>
//           </ul>
//         </menu>
//         <span className={classes.toTheRight}>
//           <button onClick={handleLogout}>Wyloguj</button>
//           <span
//             style={{ position: "relative", display: "inline-block" }}
//             className={classes.avatarImage}
//           >
//             <button className={classes.avatarImage} onClick={toggleMenu}>
//               <img src={user} alt="user-avatar" />
//             </button>
//             {isOpen && (
//               <div
//                 style={{
//                   position: "relative",
//                   bottom: "2rem",
//                   backgroundColor: "white",
//                   zIndex: 1,
//                 }}
//               >
//                 <a href="#link1" style={{ display: "block", padding: "8px" }}>
//                   Link 1
//                 </a>
//               </div>
//             )}
//           </span>
//           <button className={classes.notificationImage}>
//             <img src={bell} alt="notifications icon" />
//           </button>
//         </span>
//       </header>
//       <Outlet />
//     </>
//   );
// }

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
import { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";

export default function HeadMenu() {
  const isMobileScreen = useMediaQuery({ query: "(max-width:320px)" });
  const navigate = useNavigate();
  const token = useLoaderData();
  const submit = useSubmit();

  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
  });
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
              <Link to="#" className={classes.button}>
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
          <span className={classes.avatarImageWrapper}>
            <button
              ref={buttonRef}
              className={classes.avatarImage}
              onClick={toggleMenu}
            >
              {!isMobileScreen && <img src={user} alt="user-avatar" />}
            </button>
            {isOpen && (
              <div
                style={{
                  position: "absolute",
                  top: `${menuPosition.top}px`,
                  left: `${menuPosition.left}px`,
                  backgroundColor: "white",
                  boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
                  zIndex: 1,
                }}
              >
                <button onClick={handleLogout}>Wyloguj</button>
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
