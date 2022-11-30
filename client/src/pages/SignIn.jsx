import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInSchema } from "../validations/UserSchema";
import Spinner from "../components/Spinner";
import useAuthStore from "../app/authStore";
import refresh from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const { token, setToken } = useAuthStore();

  //Create form with react-hook-form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  //Handle login functionality
  const onSubmit = async (formValues) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/signin",

        {
          ...formValues,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (data) {
        localStorage.setItem("token", data.accessToken);
        setToken(data.accessToken);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getRefreshToken = async () => {
    const token = await refresh();
    console.log(token);
    setToken(token);
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col sm:items-center md:justify-center text-primary">
      <div className="w-full flex flex-col sm:w-[400px]   md:h-fit  md:w-[600px]  md:rounded-xl  md:shadow-2xl  md:border text-sm md:text-md">
        <div className="p-5  pt-10 pb-0 md:pb-10 md:px-16">
          <h1 className="my-2">
            Howwasmyday<span className="text-hworange">.</span>
          </h1>
          <p>Please fill in your email and password to login.</p>
        </div>
        <div className="p-5   md:px-16 md:py-14  md:bg-hworange md:rounded-b-xl">
          <form
            className="flex flex-col  font-bold"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="email" className="">
              Email
            </label>
            <input
              className="px-2 py-3 mt-2 mb-0.5 rounded font-medium  border border-gray-400 md:border-none"
              {...register("email", { required: true })}
              placeholder="john@doe.com"
            />
            <span className="text-sm font-medium">{errors.email?.message}</span>
            <div className="flex justify-between mt-6">
              <label htmlFor="email" className="">
                Password
              </label>
              <Link
                to="/forgetpassword"
                className="underline text-sm hover:text-white"
              >
                Forgot password?
              </Link>
            </div>
            <input
              className="p-2 py-3 my-2 rounded font-medium  mb-0.5  border border-gray-400 md:border-none"
              placeholder="•••••••••••••"
              type="password"
              {...register("password", { required: true, maxLength: 20 })}
            />
            <span className="text-sm font-medium">
              {errors.password?.message}
            </span>
            <button
              className=" w-full bg-white p-2 py-3 mt-10 rounded shadow-md transition-all duration-100 hover:shadow-lg hover:bg-slate-300 bg-hworange md:bg-white flex items-center justify-center"
              type="submit"
            >
              {loading ? <Spinner /> : "Sign in"}
            </button>
          </form>
        </div>
      </div>

      <button
        className="border border-black p-2 bg-red-200"
        onClick={getRefreshToken}
      >
        Refresh
      </button>
      <div className="flex justify-center  mt-2 md:mt-10 text-sm md:text-base">
        <p className="inline-block mb-10">Don't have an account yet? </p>
        <Link
          to="/signup"
          className="font-bold ml-2 underline hover:text-hworange"
        >
          Sign up.
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
