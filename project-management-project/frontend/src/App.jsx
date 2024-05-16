import Login from "./pages/Logins/Login/Login.jsx";
import Signup from "./pages/Logins/Signup/Signup.jsx";
import HeadMenu from "./components/HeadMenu/HeadMenu.jsx";
import Starter from "./pages/Starter/Starter.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import WorkspacePage from "./pages/Workspace/WorkspacePage.jsx";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

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
