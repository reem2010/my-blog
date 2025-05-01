import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import api from "./api/axiosConfig";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Login from "./components/Login";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
import PostContext from "./contexts/PostContext.jsx";

export default function App() {
  const [user, setUser] = useState(null);
  const handleUser = (user) => {
    setUser(user);
  };

  useEffect(() => {
    async function authenticate() {
      try {
        const { data } = await api.get("/auth");
        setUser(data.user);
      } catch (error) {
        console.error(error.message);
      }
    }
    authenticate();
  }, []);

  return (
    <div className="flex flex-col min-h-svh">
      <NavBar user={user} handleUser={handleUser} />
      <Routes>
        <Route
          path="/"
          element={
            <PostContext>
              <Home user={user} />
            </PostContext>
          }
        />

        <Route path="/auth" element={<Auth user={user} />}>
          <Route index element={<Login handleUser={handleUser} />} />
          <Route path="new" element={<Register handleUser={handleUser} />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}
