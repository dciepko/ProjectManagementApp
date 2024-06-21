import Login from "./pages/Logins/Login/Login.jsx";
import Signup from "./pages/Logins/Signup/Signup.jsx";
import HeadMenu from "./components/HeadMenu/HeadMenu.jsx";
import Starter from "./pages/Starter/Starter.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import WorkspacePage from "./pages/Workspace/WorkspacePage.jsx";
import { checkAuthLoader, tokenLoader } from "./util/auth.js";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CallPage from "./pages/CallPage/CallPage.jsx";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Starter /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Signup /> },
    {
      path: "/",
      element: <HeadMenu />,
      loader: tokenLoader,
      id: "root",
      children: [
        {
          path: "/:loggedUserID/home",
          element: <HomePage />,
          loader: checkAuthLoader,
        },
        {
          path: "/:loggedUserID/workspace/:workspaceID",
          element: <WorkspacePage />,
          loader: checkAuthLoader,
        },
        {
          path: "/:loggedUserID/call",
          element: <CallPage />,
          loader: checkAuthLoader,
        },
      ],
    },
  ]);

  return (
    <div id="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
