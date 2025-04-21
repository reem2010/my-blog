import React from "react";
import { NavLink } from "react-router";
import api from "../api/axiosConfig";

export default function NavBar({ user, handleUser }) {
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      handleUser(null);
    } catch (error) {
      console.error(error.message);
    }
  };
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
                <div className="avatar avatar-placeholder">
                  <div className="bg-blue-950 text-white w-9 rounded-full">
                    <span className="text-s">
                      {user.username[0].toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a onClick={logout}>Logout</a>
                </li>
              </ul>
            </div>
          )}
          {!user && (
            <NavLink className=" text-xl cursor-pointer" to="/auth">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
