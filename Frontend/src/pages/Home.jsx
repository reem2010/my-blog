import React, { useEffect } from "react";
import BlogCard from "../components/BlogCard";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import api from "../api/axiosConfig";
import { IoCloseSharp } from "react-icons/io5";
import PostForm from "../components/PostForm";
import { useNavigate } from "react-router";

export default function Home({ user }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [popUp, setPopup] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await api.get("/posts");
        setPosts(data);
      } catch (error) {
        console.error(error.message);
      }
    }
    getData();
  }, []);

  const createPost = async (data) => {
    try {
      const { data } = await api.post("/posts", data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleAdd = async () => {
    if (user) {
      setPopup(true);
    } else {
      navigate("/auth");
    }
  };
  return (
    <>
      <div className="max-w-3xl m-auto w-full flex flex-col gap-8">
        {posts.map((post) => (
          <BlogCard post={post} key={post.id} />
        ))}
      </div>
      <button
        onClick={handleAdd}
        className="rounded-full bg-blue-950 text-amber-50 fixed bottom-5 right-5 w-[50px] h-[50px] cursor-pointer shadow-lg hover:shadow-xl hover:bg-blue-800 transition-all duration-300"
      >
        <AddIcon />
      </button>
      <div
        className={`fixed w-screen h-screen bg-black opacity-20 z-10 ${
          popUp ? "" : "hidden"
        }`}
      ></div>
      <div
        className={`fixed w-[600px] h-[90svh] bg-white z-20 rounded-xl shadow-lg top-1/2 left-1/2 transform -translate-1/2 p-[20px] flex flex-col gap-[20px] overflow-y-auto ${
          popUp ? "" : "hidden"
        }`}
      >
        <div className="flex justify-between">
          <p className="font-bold">Reem Tarek</p>
          <button className="cursor-pointer" onClick={() => setPopup(false)}>
            <IoCloseSharp className="size-6" />
          </button>
        </div>
        <PostForm />
      </div>
    </>
  );
}
