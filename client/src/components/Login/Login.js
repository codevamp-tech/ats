import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { LoginContext } from "../ContextProvider/Context";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Login = () => {
  const { loginData, setLoginData } = useContext(LoginContext);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    // send data to backend API
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.success) {
          localStorage.setItem("usertoken", result.token);
          localStorage.setItem("user", JSON.stringify(result.user));

          setLoginData(result.token);
          toast.success("Login successful");
          navigate("/");
          setTimeout(() => {
            window.location.reload();
          }, 200);
        } else toast.error(result.error);
      })
      .catch((err) => {
        toast.error("An error occured");
        console.log(err);
      });
  };

  return (
    <div className="bg-[#e7e7e7] dark:bg-gray-900 w-[60vw] ml-[13.5vw] h-[80vh] rounded-lg shadow-[rgba(0,0,0,0.25)_0px_14px_28px,rgba(0,0,0,0.22)_0px_10px_10px] ">
      <img
        src="/tree-1.png"
        alt="Left Tree"
        className="absolute bottom-[-2rem] left-20 w-60 md:w-84 lg:w-80 "
      />
      <img
        src="/tree-2.png"
        alt="Right Tree"
        className="absolute bottom-[-2rem] right-20 w-48 md:w-64 lg:w-70 "
      />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {/* FORM */}
        <form
          className="w-2/5 space-y-4 md:space-y-6 mb-40"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* JOB POSTING DETAILS */}
            <div className="w-full">
              {/* <div>
                <h1 className="text-xl my-1 font-bold text-center">Login</h1>
              </div> */}

              <div>
                <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  required
                  {...register("userEmail")}
                  placeholder="Ex: john @gmail.com"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div>
              {/* Password */}
              <div>
                <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    {...register("userPassword")}
                    placeholder="Create strong password"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-300"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="w-5 h-5" />
                    ) : (
                      <FaEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-center my-6">
            <button className="block bg-secondary text-white text-md py-3 px-16 rounded-md">
              Login
            </button>
          </div>
          <div className="text-center">
            <Link to="/signup">
              <p className="hover:underline">New user? Register here!</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
