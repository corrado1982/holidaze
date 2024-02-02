import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isManager } from "../../isItLogged";
// import { logout } from "../../../auth/logout";
import * as storage from "../../../storage/index";
import logout from "../../../auth/logout";
// import logout from "../../../auth/logout";

const userName = storage.load("username");
const avatarPicture = storage.load("avatar");

function LoggedNav() {
  const [showMenu, setShowMenu] = useState(false);

  if (showMenu === true) {
    document.addEventListener("click", handleClickOut, true);
  }

  function handleShowMenu() {
    if (showMenu === false) {
      setShowMenu(true);
    }
    if (showMenu === true) {
      setShowMenu(false);
    }
  }

  function handleClickOut() {
    setShowMenu(false);
  }
  return (
    <nav className="flex">
      <div className="relative ml-3 flex justify-between p-2 w-11/12 items-center">
        <div>
          <Link to="/">Holidaze</Link>
        </div>
        <div className="flex items-center">
          <p>{userName}</p>
          <div>
            <button
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
            </button>
          </div>
          {/* MENU */}
          {showMenu ? (
            <div
              className="absolute right-0 z-10 mt-44 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabIndex="-1"
            >
              {/* AVATAR */}
              <div>
                <Link
                  to="/avatar"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-0"
                >
                  Avatar
                </Link>
              </div>

              {/* MY BOOKINGS */}
              <div>
                <Link
                  to="/mybookings"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-1"
                >
                  My Bookings
                </Link>
              </div>

              {/* MY VENUE */}
              {isManager() && (
                <div>
                  <Link
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-2"
                    to="/myvenue"
                  >
                    My venue
                  </Link>
                </div>
              )}

              {/* LOG OUT */}
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex items-center">
        <Link
          // className="block px-4 py-2 text-sm text-gray-700"
          // role="menuitem"
          // tabIndex="-1"
          // id="user-menu-item-3"
          onClick={logout}
        >
          Log out
        </Link>
      </div>
    </nav>
  );
}

export default LoggedNav;
