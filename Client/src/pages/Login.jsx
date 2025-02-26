import React from "react";
import { useForm } from "react-hook-form";
import signImg from "../assets/signIn.jpg";
import googleImg from "../assets/google.png";
import { NavLink, useNavigate } from "react-router-dom";
import { login as loginApi } from "../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    const { success, message, data } = await loginApi(formData);
    if (success == true) navigate("/dashboard");
    else alert(message);
  };

  return (
    <div className="flex justify-between h-screen w-screen">
      <div className="flex flex-col justify-center items-center border w-1/2">
        <img src={signImg} className="w-28 rounded-full" />
        <h1 className="text-3xl font-bold m-8">Sign in to your Account</h1>

        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="border rounded-xl p-2 m-2 w-[23rem]"
            type="email"
            placeholder="Email"
            {...register("Email", { required: true })}
          />
          {errors.Name && (
            <span className="px-3 text-sm text-red-600">Email is required</span>
          )}

          <input
            className="border rounded-xl p-2 m-2 w-[23rem]"
            type="password"
            placeholder="Password"
            {...register("Password", { max: 10, min: 3 })}
          />
          {errors.Name && (
            <span className="px-3 text-sm text-red-600">
              Password is required
            </span>
          )}

          <input
            className="border rounded-xl p-1 m-2 bg-blue-900 cursor-pointer"
            type="submit"
          />
        </form>
        <p className="text-center text-sm">
          Forgot Password?{" "}
          <NavLink to="/forgot-password" className="text-blue-400">
            Click Here
          </NavLink>
        </p>

        <div className="flex flex-col justify-center items-center mt-4">
          <p className="text-center text">Or sign in with</p>
          <img src={googleImg} className="w-10 m-4 cursor-pointer" />
        </div>

        <p className="text-center text-sm">
          Don't Have an Account?{" "}
          <NavLink to="/register" className="text-blue-400">
            Sign Up
          </NavLink>
        </p>
      </div>

      <img src={signImg} className="w-1/2" />
    </div>
  );
};

export default Login;
