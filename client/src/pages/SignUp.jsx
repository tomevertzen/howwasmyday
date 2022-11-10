import React from "react";

const SignUp = () => {
  return (
    <div className="w-full h-screen bg-white flex items-center justify-center">
      <div className="w-2/5  rounded-xl overflow-hidden border shadow-2xl">
        <div className="p-10">
          <h1 className="my-2">Howwasmyday.</h1>
          <p>Please fill in your email and password to login.</p>
        </div>
        <div className="p-10 bg-hworange">
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email" className="text-white">
              Email
            </label>
            <input
              className="p-2 my-2 rounded"
              {...register("email", { required: true })}
            />
            <label htmlFor="email" className="text-white">
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

export default SignUp;
