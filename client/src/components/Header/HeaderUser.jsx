import React from "react";

const HeaderUser = ({ user }) => {
  return (
    <div className="header-user">
      <a href="#" className="user-img">
        <img src={user.photoURL} />
      </a>
    </div>
  );
};

export default HeaderUser;
