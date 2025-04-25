import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useNavigate } from "react-router";
import api from "../api/axiosConfig";

export default function Login({ handleUser }) {
  const navigate = useNavigate();

  const loginSchema = Joi.object({
    email: Joi.string()
      .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      .required()
      .messages({
        "string.empty": "Email is missing",
        "string.pattern.base": "Invalid email",
      }),
    password: Joi.string()
      .pattern(/^(?=.{8,}$)(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).+$/)
      .required()
      .messages({
        "string.empty": "Password is missing",
        "string.pattern.base": "8+ chars, mix of A-Z, a-z, 0-9 & symbol",
      }),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    mode: "onChange",
    resolver: joiResolver(loginSchema),
  });

  const submitHandler = async (formData) => {
    try {
      const { data } = await api.post("/auth/login", formData);
      handleUser(data.user);
      navigate("/");
    } catch (e) {
      if (e.response?.["status"] == 400) {
        const serverErrorrs = e.response.data.errors;
        for (const key in serverErrorrs) {
          setError(key, { type: "manual", message: serverErrorrs[key] });
        }
      } else if (e.response?.["status"] == 401) {
        setError("server", {
          type: "manual",
          message: e.response.data.error,
        });
      } else {
        console.log(e.message);
        setError("server", {
          type: "manual",
          message: "An error occured please try again later",
        });
      }
    }
  };

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
          type="email"
          name="email"
          className="w-full outline-none px-2 py-2 border-1 border-blue-800 rounded"
          placeholder="Entre your email"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-xs text-red-800">{errors.email.message}</span>
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
            {errors.password.message}
          </span>
        )}
      </div>
      {errors.server && (
        <p className="text-sm text-center  text-red-700">
          {errors.server.message}
        </p>
      )}
      <input
        className="w-full text-white bg-blue-950 p-3 rounded cursor-pointer"
        type="submit"
        value="Login"
      />
    </form>
  );
}
