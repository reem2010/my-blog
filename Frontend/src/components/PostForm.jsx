import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import ImageIcon from "@mui/icons-material/Image";
import axios from "axios";
import api from "../api/axiosConfig";
import { IoCloseSharp } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router";
import Button from "./Button";
import { postContext } from "../contexts/PostContext";
import { useContext } from "react";

export default function PostForm({
  post,
  handleClose,
  method,
  handleUser,
  createPost,
}) {
  const { updatePost } = useContext(postContext);

  const navigate = useNavigate();
  const imgbbKey = import.meta.env.VITE_IMG_KEY;
  const [loading, setLoading] = React.useState(false);

  // schema validation of the post
  const postSchema = Joi.object({
    title: Joi.string().max(100).required().messages({
      "string.empty": "Title cannot be empty",
      "string.max": "Title cannot exceed 100 characters",
    }),
    content: Joi.string().required().messages({
      "string.empty": "Body cannot be empty",
    }),
    image: Joi.optional(),
  });

  // form hook
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
    setValue,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      image: post?.image || "",
    },
    mode: "onChange",
    resolver: joiResolver(postSchema),
  });

  // watcher for the imahe
  const watchImage = watch("image");

  // Submit handler
  const submitHandler = async (input) => {
    setLoading(true);
    try {
      if (input.image instanceof FileList && input.image[0]) {
        let body = new FormData();
        body.set("key", imgbbKey);
        body.append("image", input.image[0]);
        const {
          data: {
            data: { display_url },
          },
        } = await axios.post("https://api.imgbb.com/1/upload", body);
        input.image = display_url;
      } else if (input.image instanceof FileList) {
        input.image = "";
      }
      await api[method](`/posts/${post?.id ?? ""}`, input);
      method == "put" ? updatePost(post.id, input) : createPost();
      handleClose();
    } catch (e) {
      if (e.response?.["status"] == 400) {
        const serverErrors = e.response.data.errors;
        for (const key in serverErrors) {
          setError(key, { type: "manual", message: serverErrors[key] });
        }
      } else if (e.response?.["status"] == 401) {
        handleUser(null);
        navigate("/auth");
      } else {
        setError("server", {
          type: "manual",
          message: "An error occured please try again later",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      action=""
      className="flex flex-col gap-5 flex-grow"
      onSubmit={handleSubmit(submitHandler)}
    >
      <input
        type="text"
        name="title"
        className="w-full outline-none h-[50px]"
        placeholder="Title"
        {...register("title")}
      />
      {errors.title && (
        <p className="text-xs  text-red-700">{errors.title.message}</p>
      )}
      <textarea
        className="w-full resize-none outline-none flex-grow min-h-34"
        name="content"
        placeholder="What do you want to talk about?"
        {...register("content")}
      ></textarea>
      {errors.content && (
        <p className="text-sm  text-red-700">{errors.content.message}</p>
      )}

      {/* Image input */}
      {typeof watchImage == "string" && watchImage.length != 0 && (
        <div>
          <div className="flex gap-3 justify-end mb-1">
            <label
              htmlFor="image"
              className="cursor-pointer flex items-center gap-1.5"
            >
              <MdModeEdit className="text-[#666666] size-[19px]" />
            </label>

            <IoCloseSharp
              className="text-[#666666] size-[21px] cursor-pointer"
              onClick={() => {
                setValue("image", "");
              }}
            />
          </div>
          <img src={post?.image} alt="post image" className="m-auto" />
        </div>
      )}
      {(typeof watchImage != "string" || !watchImage.length) && (
        <div className="flex items-center gap-1.5">
          <label
            htmlFor="image"
            className="cursor-pointer flex items-center gap-1.5"
          >
            <ImageIcon
              className="text-[#666666] cursor-pointer"
              color="#e8e8e8"
            />
            <p className="text-[#8e8e90]">
              {watchImage?.[0] ? watchImage[0].name : "No file selected"}
            </p>
          </label>
          {watchImage?.[0] && (
            <IoCloseSharp
              className="text-[#666666] cursor-pointer"
              onClick={() => setValue("image", "")}
            />
          )}
        </div>
      )}
      <input
        id="image"
        type="file"
        name="image"
        accept="image/*"
        className="hidden"
        placeholder="Image"
        {...register("image")}
      />
      {/* ---------------------------------------------------------- */}
      {errors.image && (
        <p className="text-sm  text-red-700">{errors.image.message}</p>
      )}
      {errors.server && (
        <p className="text-sm text-center  text-red-700">
          {errors.server.message}
        </p>
      )}
      <hr className="mb-[10px] text-[#e8e8e8]" />
      <div className="self-end mr-3 ">
        {" "}
        <Button loading={loading} customStyle={"py-1"}>
          {post ? "Edit" : "Post"}
        </Button>
      </div>
    </form>
  );
}
