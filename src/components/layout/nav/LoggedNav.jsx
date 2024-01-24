import React from "react";
import { Link } from "react-router-dom";
import { isManager } from "../../isItLogged";

// console.log(isManager);

function LoggedNav() {
  return (
    <nav>
      {isManager() ? (
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
            <Link to="/myvenue">My venue</Link>
          </li>
          <li>
            <Link to="/">Log out</Link>
          </li>
        </ul>
      ) : (
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
      )}
    </nav>
  );
}

export default LoggedNav;
