import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <div className="max-w-screen-lg mx-6 lg:mx-auto">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default App;
