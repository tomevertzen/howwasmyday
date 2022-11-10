import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const SignIn = () => {
  const { register, control, handleSubmit, errors } = useForm();

  const onSubmit = async (formValues) => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/users/hello");

      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-white flex items-center justify-center ">
      <div className="w-full h-screen  lg:h-fit lg:w-[600px]  lg:rounded-xl lg:overflow-hidden  lg:shadow-2xl  lg:border">
        <div className="p-10  px-10 md:px-16">
          <h1 className="my-2">Howwasmyday.</h1>
          <p>Please fill in your email and password to login.</p>
        </div>
        <div className="p-10  md:px-16 lg:py-16 h-full bg-hworange ">
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email" className="text-white font-medium">
              Email
            </label>
            <input
              className="p-2 my-2 rounded"
              {...register("email", { required: true })}
            />
            <label htmlFor="email" className="text-white font-medium">
              Password
            </label>
            <input
              className="p-2 my-2 rounded"
              type="password"
              {...register("password", { required: true, maxLength: 20 })}
            />
            {!register.password && "Password is required"}
            <button
              className=" w-full bg-white p-2 mt-3 rounded shadow-md hover:shadow-lg transition-all duration-100"
              type="submit"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
