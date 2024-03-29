import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { isManager } from "../../isItLogged";
import * as storage from "../../../storage/index";
import logout from "../../../auth/logout";
import holidazeLogo from "../../../../public/holidaze-logo.png";
import menuIcon from "../../../../public/hb-menu-icon.png";

const userName = storage.load("username");

function LoggedNav() {
  const [showMenu, setShowMenu] = useState(false);

  function openModal() {
    if (showMenu === false) {
      setShowMenu(true);
    }
    if (showMenu === true) {
      setShowMenu(false);
    }
  }

  function handleClickOut() {
    if (showMenu === true) {
      setShowMenu(false);
    }
  }

  console.log(showMenu);
  return (
    <div className="fixed top-0 left-0 right-0">
      <nav className="flex">
        <ul className="relative ml-3 flex justify-between p-2 w-11/12 items-center">
          <li>
            <NavLink onClick={handleClickOut} to="/">
              <img src={holidazeLogo} alt="logo" className=" w-28" />
            </NavLink>
          </li>
        </ul>
        <div className="flex items-center w-60 justify-evenly">
          <div>
            <button onClick={openModal} className="flex items-center">
              <p className=" text-xl">{userName}</p>{" "}
              <img className=" ml-1 w-8" src={menuIcon}></img>
            </button>
          </div>
        </div>
      </nav>
      {showMenu ? (
        <ul className=" absolute right-0 max-w-48  bg-sky-200">
          <li className="flex">
            {/* AVATAR */}
            <NavLink
              onClick={handleClickOut}
              to="/avatar"
              className="block px-4 py-2 "
              role="menuitem"
              tabIndex="-1"
              id="user-menu-item-0"
            >
              Avatar
            </NavLink>
          </li>

          {/* MY BOOKINGS */}
          <li>
            <NavLink
              onClick={handleClickOut}
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
                onClick={handleClickOut}
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
          <li className=" px-4">
            <Link onClick={logout}>Log out</Link>
          </li>
        </ul>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default LoggedNav;
