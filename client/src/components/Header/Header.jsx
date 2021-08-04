import React from "react";
import { Link } from "react-router-dom";
import HeaderUser from "./HeaderUser";

const Header = ({ user }) => {
  return (
    <header className="main-header">
      <div>
        <a href="/">
          <h1 className="logo">NERDLOG</h1>
        </a>
        {user ? (
          <HeaderUser user={user} />
        ) : (
          <div>
            <Link to="/login">
              <button className="btn btn-transparent">Log in</button>
            </Link>
            <Link to="/login">
              <button className="btn">Join</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
