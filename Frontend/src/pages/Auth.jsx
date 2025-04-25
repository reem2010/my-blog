import React from "react";
import { Outlet, NavLink, matchPath, useLocation } from "react-router";

export default function Auth() {
  const location = useLocation();
  const match = matchPath("/auth/new", location.pathname);

  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="p-9 rounded-lg shadow-md w-[400px]">
        <Outlet />
        <div className="flex w-full gap-2.5 justify-between mt-[25px]">
          <NavLink
            className={
              match
                ? "text-blue-950 underline underline-offset-6 decoration-2 decoration-blue-950"
                : ""
            }
            to="/auth/new"
          >
            Create an account
          </NavLink>
          <NavLink
            className={
              !match
                ? "text-blue-950 underline underline-offset-6 decoration-2 decoration-blue-950"
                : ""
            }
            to="/auth"
          >
            Already have one!
          </NavLink>
        </div>
      </div>
    </div>
  );
}
