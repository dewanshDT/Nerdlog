import React from "react";
import Navigation from "../Navigation";
import Blogs from "./Blogs";
import Sidebar from "./Sidebar";

function Home({ user, logout, url }) {
  return (
    <>
      <Navigation logout={logout} user={user} />
      <div className="subcontainer">
      <Blogs url={url} />
      <Sidebar user={user} />
      </div>
    </>
  );
}

export default Home;
