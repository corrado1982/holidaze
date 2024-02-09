import React from "react";
import { Link } from "react-router-dom";

function UserNav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Holidaze</Link>
        </li>
        <li>
          <Link to="/login">Log in</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
}

export default UserNav;
