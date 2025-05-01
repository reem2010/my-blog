import React, { useContext, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import PostForm from "../components/PostForm";
import { useNavigate } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import { postContext } from "../contexts/PostContext";

export default function Home({ user }) {
  const navigate = useNavigate();
  const { loading, error, getData, posts } = useContext(postContext);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ post: null, method: "post" });
  const [added, setAded] = useState(true);
  const triggerAdded = () => {
    setAded(!added);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getData(1);
  }, [added]);

  const handleAdd = () => {
    if (user) {
      setForm({ method: "post", post: null });
      setOpen(true);
    } else {
      navigate("/auth");
    }
  };

  const handleUpdate = (post) => {
    setForm({ method: "put", post });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (error)
    return (
      <div className="flex-grow p-1 flex items-center justify-center">
        <p>An error occured please try again later</p>
      </div>
    );
  return (
    <>
      {posts.data.length > 0 && (
        <InfiniteScroll
          dataLength={posts.data.length}
          next={getData}
          hasMore={posts.length > posts.data.length}
          loader={<p>Loading...</p>}
        >
          <div className="max-w-3xl m-auto w-full flex flex-col gap-8 mt-[50px] px-3">
            {posts.data.map((post) => (
              <BlogCard
                post={{ ...post }}
                key={post.id}
                handleUpdate={handleUpdate}
                user={user}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
      {loading && !posts.data.length && (
        <div className="flex-grow p-1 flex items-center justify-center">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      )}
      <button
        onClick={handleAdd}
        className="rounded-full bg-blue-950 text-amber-50 fixed bottom-5 right-5 w-[50px] h-[50px] cursor-pointer shadow-lg hover:shadow-xl hover:bg-blue-800 transition-all duration-300"
      >
        <AddIcon />
      </button>
      <div
        className={`fixed w-screen h-screen bg-black opacity-20 z-10 ${
          open ? "" : "hidden"
        }`}
      ></div>
      {open && (
        <div
          className={`fixed w-[95%] sm:w-[600px] h-[90svh] bg-white z-20 rounded-xl shadow-lg top-1/2 left-1/2 transform -translate-1/2 p-[20px] flex flex-col gap-[20px] overflow-y-auto`}
        >
          <div className="flex justify-between">
            <p className="font-bold">{user.username}</p>
            <button className="cursor-pointer" onClick={handleClose}>
              <IoCloseSharp className="size-6" />
            </button>
          </div>
          <PostForm
            {...form}
            handleClose={handleClose}
            createPost={triggerAdded}
          />
        </div>
      )}
    </>
  );
}
