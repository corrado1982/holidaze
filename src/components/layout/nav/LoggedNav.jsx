import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { isManager } from "../../isItLogged";
// import { logout } from "../../../auth/logout";
import * as storage from "../../../storage/index";
import logout from "../../../auth/logout";
import holidazeLogo from "../../../../public/holidaze-logo.png";
// import logout from "../../../auth/logout";

const userName = storage.load("username");
const avatarPicture = storage.load("avatar");

function LoggedNav() {
  // const [showMenu, setShowMenu] = useState(false);

  // if (showMenu === true) {
  //   document.addEventListener("click", handleClickOut, true);
  // }

  // function handleShowMenu() {
  //   if (showMenu === false) {
  //     setShowMenu(true);
  //   }
  //   if (showMenu === true) {
  //     setShowMenu(false);
  //   }
  // }

  // function handleClickOut() {
  //   setShowMenu(false);
  // }
  return (
    <nav className="flex">
      <ul className="relative ml-3 flex justify-between p-2 w-11/12 items-center">
        <li>
          <NavLink to="/">
            <img src={holidazeLogo} alt="logo" className=" w-28" />
          </NavLink>
        </li>
        {/* <div className="flex items-center"> */}
        {/* <p> */}
        {/* <img
            className="h-8 w-8 rounded-full"
            src={avatarPicture}
            alt="my avatar"
          ></img> */}
        {/* {userName} */}
        {/* </p> */}
        {/* <div> */}
        {/* <button
              onClick={handleShowMenu}
              type="button"
              className="relative flex rounded-full"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src={avatarPicture}
                alt=""
              ></img>
            </button> */}
        {/* </div> */}
        {/* MENU */}
        {/* {showMenu ? ( */}
        {/* <div
              className="absolute right-0 z-10 mt-44 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabIndex="-1"
            > */}
        {/* AVATAR */}
        <div>
          <li className="flex">
            <p>{userName}</p>
            <NavLink
              to="/avatar"
              className="block px-4 py-2 "
              role="menuitem"
              tabIndex="-1"
              id="user-menu-item-0"
            >
              <img
                className="h-8 w-8 rounded-full"
                src={avatarPicture}
                alt="my avatar"
              ></img>
            </NavLink>
          </li>
        </div>

        {/* MY BOOKINGS */}
        <li>
          <NavLink
            to="/mybookings"
            className="block px-4 py-2 "
            role="menuitem"
            tabIndex="-1"
            id="user-menu-item-1"
          >
            My Bookings
          </NavLink>
        </li>

        {/* MY VENUE */}
        {isManager() && (
          <li>
            <NavLink
              className="block px-4 py-2 "
              role="menuitem"
              tabIndex="-1"
              id="user-menu-item-2"
              to="/myvenue"
            >
              My venue
            </NavLink>
          </li>
        )}

        {/* LOG OUT */}
        {/* </div> */}
        {/* ) : null} */}
        {/* </div> */}
      </ul>
      <div className="flex items-center">
        <Link onClick={logout}>Log out</Link>
      </div>
    </nav>
  );
}

export default LoggedNav;
