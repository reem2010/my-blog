import React from "react";
import { createContext } from "react";
import { useState } from "react";
import api from "../api/axiosConfig";
import toast from "react-hot-toast";

export const postContext = createContext();

export default function PostContext({ children }) {
  const [posts, setPosts] = useState({ data: [], length: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function getData(reset = false) {
    try {
      reset && setLoading(true);
      const after = !reset
        ? posts.data?.[posts.data.length - 1].createdAt
        : null;
      const { data } = await api.get("/posts", {
        params: {
          limit: 6,
          after,
        },
      });
      if (reset) {
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
      reset && setError(true);
      console.error(error.message);
    }
  }
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

  return (
    <postContext.Provider
      value={{ getData, posts, deletePost, updatePost, loading, error }}
    >
      {children}
    </postContext.Provider>
  );
}
