import React from "react";
import { Outlet, useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/login")}>Login</button>
      <Outlet />
    </div>
  );
};

export default Home;
