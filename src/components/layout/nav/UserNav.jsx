import React from "react";
import { Link } from "react-router-dom";
import holidazeLogo from "../../../../public/holidaze-logo.png";

function UserNav() {
  return (
    <nav className="fixed top-0 left-0 right-0">
      <ul className="relative ml-3 flex justify-between p-2 w-11/12 items-center">
        <li>
          <Link to="/">
            <img src={holidazeLogo} alt="logo" className=" w-28" />
          </Link>
        </li>
        <div className="flex ">
          <li className=" mx-4">
            <Link to="/login">Log in</Link>
          </li>
          <li className=" mx-4">
            <Link to="/register">Register</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default UserNav;
