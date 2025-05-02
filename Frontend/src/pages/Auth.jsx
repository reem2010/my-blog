import React from "react";
import {
  Outlet,
  NavLink,
  matchPath,
  useLocation,
  useNavigate,
} from "react-router";
import { useEffect } from "react";

export default function Auth({ user }) {
  const location = useLocation();
  const match = matchPath("/auth/new", location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="p-9 rounded-3xl shadow-md w-[400px] bg-base-100 m-1.5 ">
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
