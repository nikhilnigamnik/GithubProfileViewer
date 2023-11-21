import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Main from "./screens/Home.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Repo from "./screens/Repo.jsx";
import RepoContent from "./screens/RepoContent.jsx";
import Commit from "./screens/Commit.jsx";
import RepoContentData from "./screens/RepoContentData.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/users/:id/repos",
        element: <Repo />,
      },
      {
        path: "/repos/:id/:repoName",
        element: <RepoContent />,
        children: [
          {
            path: "contents/:path",
            element: <RepoContentData />,
          },
        ],
      },
      {
        path: "/repos/:id/:repoName/commits",
        element: <Commit />,
      },
      // {
      //   path: "/repos/:id/:repoName/contents/:path",
      //   element: <RepoContentData />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
