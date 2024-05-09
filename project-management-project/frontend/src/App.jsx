import Login from "./components/Logins/Login/Login";
import Signup from "./components/Logins/Signup/Signup.jsx";
import HeadMenu from "./components/HeadMenu/HeadMenu.jsx";
import Starter from "./components/Starter/Starter.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import WorkspacePage from "./components/Workspace/WorkspacePage.jsx";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Starter /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Signup /> },
    {
      path: "/",
      element: <HeadMenu />,
      children: [
        { path: "/home", element: <HomePage /> },
        { path: "/workspace", element: <WorkspacePage /> },
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
