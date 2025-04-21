import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useNavigate } from "react-router";
import api from "../api/axiosConfig";

export default function Login({ handleUser }) {
  const navigate = useNavigate();
  const submitHandler = async (formData) => {
    try {
      const { data } = await api.post("/auth/login", formData);
      handleUser(data.user);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  const loginSchema = Joi.object({
    email: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).+$/),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: joiResolver(loginSchema),
  });

  return (
    <form
      action=""
      className="flex flex-col gap-5 flex-grow"
      onSubmit={handleSubmit(submitHandler)}
    >
      <h1 className="text-2xl font-bold text-center text-gray-700">
        Welcome back!
      </h1>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          name="email"
          className="w-full outline-none px-2 py-2 border-1 border-blue-800 rounded"
          placeholder="Entre your email"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-xs text-red-800">Invalid email address</span>
        )}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          className="w-full outline-none px-2 py-2 border-1 border-blue-800 rounded "
          placeholder="Entre your password"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-xs text-red-800">
            8+ chars, mix of A-Z, a-z, 0-9 & symbol
          </span>
        )}
      </div>
      <input
        className="w-full text-white bg-blue-950 p-3 rounded cursor-pointer"
        type="submit"
        value="Login"
      />
    </form>
  );
}
