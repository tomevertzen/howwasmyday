import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpSchema } from "../validations/UserSchema";
import axios from "axios";

const SignUp = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = async (formValues) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/signup",
        {
          ...formValues,
        }
      );

      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col lg:items-center lg:justify-center text-primary">
      <div className="w-full flex flex-col   lg:h-fit lg:w-[600px]  lg:rounded-xl  lg:shadow-2xl  lg:border text-sm md:text-md">
        <div className="pt-10 pb-0 lg:pb-10  px-10 md:px-16">
          <h1 className="my-2">
            Howwasmyday<span className="text-hworange">.</span>
          </h1>
          <p>Please fill in your email and password to login.</p>
        </div>
        <div className="p-10  md:px-16 lg:py-14   lg:bg-hworange lg:rounded-b-xl">
          <form
            className="flex flex-col  font-bold"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* FIRSTNAME INPUT HERE */}

            <label htmlFor="firstName" className="">
              First name
            </label>
            <input
              className="px-2 py-3 mt-2 mb-0.5 rounded font-medium border border-gray-400 lg:border-none"
              placeholder="John"
              {...register("firstName", { required: true })}
            />
            <span className="text-xs">{errors.firstName?.message}</span>

            {/* LASTNAME INPUT HERE */}

            <label htmlFor="lastName" className="mt-6">
              Last name
            </label>
            <input
              className="px-2 py-3 mt-2 mb-0.5 rounded font-medium border border-gray-400 lg:border-none"
              placeholder="Doe"
              {...register("lastName", { required: true })}
            />
            <span className="text-xs">{errors.email?.message}</span>

            {/* EMAIL INPUT HERE */}

            <label htmlFor="email" className="mt-6">
              Email
            </label>
            <input
              className="px-2 py-3 mt-2 mb-0.5 rounded font-medium border border-gray-400 lg:border-none"
              placeholder="john@doe.com"
              {...register("email", { required: true })}
            />
            <span className="text-xs">{errors.email?.message}</span>

            {/* PASSWORD INPUT HERE */}

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
              className="p-2 py-3 my-2 rounded font-medium  mb-0.5 border border-gray-400 lg:border-none"
              placeholder="•••••••••••••"
              type="password"
              {...register("password", { required: true, maxLength: 20 })}
            />
            <span className="text-xs">{errors.password?.message}</span>
            <button
              className=" w-full bg-white p-2 py-3 mt-10 rounded shadow-md transition-all duration-100 hover:shadow-lg hover:bg-slate-300 bg-hworange lg:bg-white"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>

      <div className="flex justify-center mt-2 lg:mt-10 ">
        <p className="inline-block mb-10">Already have an account? </p>
        <Link
          to="/signin"
          className="font-bold ml-2 underline hover:text-hworange       "
        >
          Sign in.
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
