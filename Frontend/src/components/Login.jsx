import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import api from "../api/axiosConfig";
import Button from "./Button";

export default function Login({ handleUser }) {
  const [loading, setLoading] = React.useState(false);

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
      setLoading(true);
      const { data } = await api.post("/auth/login", formData);
      handleUser(data.user);
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
      <h1 className="text-2xl text-blue-950 font-semibold text-center ">
        Welcome back!
      </h1>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          className="w-full px-4 py-3 rounded-xl border border-base-300 outline-none focus:border-blue-800 transition-all duration-200"
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
          className="w-full px-4 py-3 rounded-xl border border-base-300 outline-none focus:border-blue-800 transition-all duration-200"
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
      <Button className="w-full" loading={loading} customStyle={"py-3"}>
        Log In
      </Button>
    </form>
  );
}
