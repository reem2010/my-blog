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
    <header className=" shadow-md sticky top-0 w-full z-50 bg-base-100">
      <div className="container m-auto pr-5 py-3 flex items-center justify-between h-[75px]">
        <NavLink to="/" className="text-2xl font-bold  transition">
          <img src="/logo3.svg" alt="logo" className="size-[150px]" />
        </NavLink>

        <div className="flex items-center space-x-4">
          {user ? (
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
                className="menu menu-sm dropdown-content bg-white text-gray-800 rounded-lg shadow-lg mt-3 w-48 p-2 z-50"
              >
                <li>
                  <a
                    onClick={logout}
                    className="hover:bg-gray-100 rounded px-2 py-1"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink
              className=" text-2xl cursor-pointer text-blue-950 font-medium"
              to="/auth"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
