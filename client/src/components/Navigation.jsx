import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faHome,
  faLightbulb,
  faNewspaper,
  faPlusCircle,
  faSignInAlt,
  faSignOutAlt,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Navigation = ({ user, logout }) => {
  const history = useHistory();

  return (
    <div className="navigation">
      {user && (
        <div className="nav-item" onClick={() => history.push("/blog/new")}>
          <FontAwesomeIcon icon={faPlusCircle} />
          <label>New Blog</label>
        </div>
      )}
      <Link to="/">
        <div className="nav-item">
          <FontAwesomeIcon icon={faHome} />
          <label>Home</label>
        </div>
      </Link>
      <div className="nav-item">
        <FontAwesomeIcon icon={faNewspaper} />
        <label>News</label>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon icon={faTag} />
        <label>Tags</label>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon icon={faLightbulb} />
        <label>FAQ</label>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon icon={faBullhorn} />
        <label>Contact us</label>
      </div>
      <div
        className="nav-item bottom"
        onClick={() => {
          user ? logout() : history.push("/login");
        }}
      >
        <FontAwesomeIcon icon={user ? faSignOutAlt : faSignInAlt} />
        <label>{user ? "log out" : "Log in"}</label>
      </div>
    </div>
  );
};

export default Navigation;
