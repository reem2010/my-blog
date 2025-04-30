import React, { useEffect } from "react";
import BlogCard from "../components/BlogCard";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import api from "../api/axiosConfig";
import { IoCloseSharp } from "react-icons/io5";
import PostForm from "../components/PostForm";
import { useNavigate } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import toast from "react-hot-toast";

export default function Home({ user }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState({ data: [], length: 0 });
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ post: null, method: "post" });
  const [added, setAded] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const triggerAdded = () => {
    setAded(!added);
    window.scrollTo(0, 0);
  };
  async function getData(newData = 0) {
    try {
      newData && setLoading(true);
      const { data } = await api.get(
        `/posts?limit=6${
          posts.data[0] && !newData
            ? "&after=" + posts.data[posts.data.length - 1].createdAt
            : ""
        }`
      );
      if (newData) {
        setPosts({
          length: data.length,
          data: data.posts,
        });
        setLoading(false);
      } else {
        setPosts((old) => ({
          length: data.length,
          data: [...old.data, ...data.posts],
        }));
      }
    } catch (error) {
      newData && setError(true);
      console.error(error.message);
    }
  }
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

  const deletePost = (id) => {
    let newPosts = posts.data.filter((post) => post.id != id);
    setPosts({ length: posts.length, data: newPosts });
  };

  const updatePost = (id, data) => {
    let newPosts = posts.data.map((post) =>
      post.id == id ? { ...post, ...data } : post
    );
    setPosts({ length: posts.length, data: newPosts });
    toast.success("Post updated successfully");
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
          endMessage={<p>No more data to load.</p>}
        >
          <div className="max-w-3xl m-auto w-full flex flex-col gap-8 mt-[50px] px-3">
            {posts.data.map((post) => (
              <BlogCard
                post={{ ...post }}
                key={post.id}
                handleUpdate={handleUpdate}
                user={user}
                deletePost={deletePost}
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
          className={`fixed w-[600px] h-[90svh] bg-white z-20 rounded-xl shadow-lg top-1/2 left-1/2 transform -translate-1/2 p-[20px] flex flex-col gap-[20px] overflow-y-auto`}
        >
          <div className="flex justify-between">
            <p className="font-bold">Reem Tarek</p>
            <button className="cursor-pointer" onClick={handleClose}>
              <IoCloseSharp className="size-6" />
            </button>
          </div>
          <PostForm
            {...form}
            handleClose={handleClose}
            updatePost={updatePost}
            createPost={triggerAdded}
          />
        </div>
      )}
    </>
  );
}
