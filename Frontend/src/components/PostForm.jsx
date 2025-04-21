import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

export default function PostForm({ post, submitHandler }) {
  const postSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    image: Joi.string().required(),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      image: post?.image || "",
    },
    mode: "onChange",
    resolver: joiResolver(postSchema),
  });
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
      <textarea
        className="w-full resize-none outline-none flex-grow"
        name="message"
        placeholder="What do you want to talk about?"
        {...register("content")}
      ></textarea>
      <input
        type="text"
        name="title"
        className="w-full outline-none h-[50px]"
        placeholder="Image"
        {...register("image")}
      />
    </form>
  );
}
