import React from "react";
import { Link } from "react-router-dom";

function LoggedNav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/avatar">Avatar</Link>
        </li>
        <li>
          <Link to="/mybookings">My Bookings</Link>
        </li>
        <li>
          <Link to="/">Log out</Link>
        </li>
      </ul>
    </nav>
  );
}

export default LoggedNav;
