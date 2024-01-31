import React from "react";
import { Link } from "react-router-dom";
import { isManager } from "../../isItLogged";
import { logout } from "../../../auth/logout";
import * as storage from "../../../storage/index";
// console.log(isManager);

const userName = storage.load("username");
const avatarPicture = storage.load("avatar");

function LoggedNav() {
  return (
    <nav>
      {/* {isManager() ? ( */}
      <ul className="flex justify-between p-2">
        <li>
          <Link to="/">Home</Link>
        </li>
        <p>{userName}</p>
        <img src={avatarPicture} className="w-10 rounded-full my-auto" alt="" />
        <li>
          <Link to="/avatar">Avatar</Link>
        </li>
        <li>
          <Link to="/mybookings">My Bookings</Link>
        </li>
        {isManager() && (
          <li>
            <Link to="/myvenue">My venue</Link>
          </li>
        )}
        <li>
          <Link onClick={logout}>Log out</Link>
        </li>
      </ul>
    </nav>
  );
}

export default LoggedNav;
