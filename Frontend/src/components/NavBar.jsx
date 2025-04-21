import React from "react";
import { NavLink } from "react-router";

export default function NavBar({ user }) {
  return (
    <header className="shadow-sm">
      <div className="navbar bg-base-100 container m-auto">
        <div className="flex-1">
          <NavLink to="/" className=" text-xl cursor-pointer">
            daisyUI
          </NavLink>
        </div>
        <div className="flex-none">
          {user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          )}
          {user || (
            <NavLink className=" text-xl cursor-pointer" to="/auth">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
