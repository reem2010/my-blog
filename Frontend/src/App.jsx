import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import api from "./api/axiosConfig";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function authenticate() {
      try {
        const response = await api.get("/auth");
        console.log(response);
      } catch (error) {
        console.error(error.message);
      }
    }
    authenticate();
  }, []);

  return (
    <div className="flex flex-col gap-[50px]">
      <NavBar user={user} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}
