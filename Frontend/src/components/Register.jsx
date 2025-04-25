import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router";
import Button from "./Button";

export default function Register({ handleUser }) {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const registerSchema = Joi.object({
    username: Joi.string().trim().min(3).required().messages({
      "string.empty": "Username is missing",
      "string.min": "Username must be at least 3 characters",
    }),
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
    resolver: joiResolver(registerSchema),
  });

  const submitHandler = async (formData) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", formData);
      handleUser(data.user);
      navigate("/");
    } catch (e) {
      if (e.response?.["status"] == 400) {
        const serverErrorrs = e.response.data.errors;
        for (const key in serverErrorrs) {
          setError(key, { type: "manual", message: serverErrorrs[key] });
        }
      } else if (e.response?.["status"] == 409) {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      action=""
      className="flex flex-col justify-between gap-[10px] flex-grow"
      onSubmit={handleSubmit(submitHandler)}
    >
      <h1 className="text-2xl font-bold text-center text-gray-700">
        Let&apos;s register!
      </h1>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          className="w-full outline-none px-2 py-2 border-1 border-blue-800 rounded"
          placeholder="Entre your username"
          {...register("username")}
        />
        {errors.username && (
          <span className="text-xs text-red-800">
            {errors.username.message}
          </span>
        )}
      </div>
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
      <Button className="w-full" loading={loading}>
        Sign up
      </Button>
      {/* <input
        className="w-full text-white bg-blue-950 p-3 rounded cursor-pointer"
        type="submit"
        value="Sign up"
      /> */}
    </form>
  );
}
