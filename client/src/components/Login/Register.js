import React from "react";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      userEmail: "",
      userPassword: "",
      gender: "",
      address: "",
      role: "",
      isAssigned: false,
      applications: [],
    },
  });

  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (redirect) {
      setTimeout(() => {
        window.location.href = "/login";
      }, 4000);
    }
  }, [redirect]);

  const onSubmit = (data) => {
    console.log(data);
    // send data to backend API
    fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toast.success("Sign up successful");
        setRedirect(true);
      })
      .catch((err) => {
        toast.error("Unable to signup");
        console.log(err);
      });
  };

  return (
    <div className="bg-[#e7e7e7] dark:bg-gray-900 w-[60vw] ml-[13.5vw] rounded-lg shadow-[rgba(0,0,0,0.25)_0px_14px_28px,rgba(0,0,0,0.22)_0px_10px_10px] ">
      <img
        src="/tree-1.png"
        alt="Left Tree"
        className="absolute bottom-[-2rem] left-20 w-60 md:w-84 lg:w-80 "
      />
      <img
        src="/tree-2.png"
        alt="Right Tree"
        className="absolute bottom-[-2rem] right-20 w-48 md:w-64 lg:w-70"
      />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  md:h-screen lg:py-0">
        {/* FORM */}
        <form
          className="w-2/5 space-y-4 md:space-y-6 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col lg:flex-row  gap-8">
            {/* JOB POSTING DETAILS */}
            <div className="w-full ">
              {/* <div>
                <h1
                  className="text-[2.125rem] leading-[1.235] mb-2 font-bold text-center text-[rgb(44,51,69)]"
                  style={{
                    fontFamily: "Inter, Roboto, Helvetica, Arial, sans-serif",
                  }}
                >
                  Register
                </h1>
              </div> */}
              <div>
                <label className="block mb-2 mt-1 text-sm font-medium text-gray-900 dark:text-white ">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  {...register("userName")}
                  placeholder="Ex: John doe"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                ></input>
              </div>
              <div>
                <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  required
                  {...register("userEmail")}
                  placeholder="Ex: johndoe@gmail.com"
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

              <div>
                <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  Gender
                </label>
                <div className=" flex items-center border border-gray-300 rounded-lg bg-white focus-within:ring-primary-600 focus-within:border-primary-600 dark:bg-gray-700 dark:border-gray-600 p-2">
                  <div className="bg-white flex items-center mr-4">
                    <input
                      {...register("gender", { required: true })}
                      type="radio"
                      id="male"
                      value="Male"
                      className="w-4 h-4 text-primary-600 bg-white border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:border-gray-600"
                    />
                    <label
                      htmlFor="male"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Male
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      {...register("gender", { required: true })}
                      type="radio"
                      id="female"
                      value="Female"
                      className="w-4 h-4 text-primary-600 bg-white border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:border-gray-600"
                    />
                    <label
                      htmlFor="female"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Female
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  Address
                </label>
                <input
                  type="text"
                  required
                  {...register("address")}
                  placeholder="Ex: A70, Down-Town Street, Mumbai"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div>
              <div>
                <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  User Type
                </label>
                <select
                  {...register("role", { required: true })}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a user type
                  </option>
                  <option value="candidate">Candidate</option>
                  <option value="recruiter">Recruiter</option>
                  <option value="coordinator">Coordinator</option>
                  <option value="employer">Employer</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-center my-8">
            <button className="block bg-secondary text-white text-md py-3 px-16 rounded-md mt-1">
              Register
            </button>
          </div>
          <div className="text-center">
            <Link to="/login">
              <p className="hover:underline mt-10">
                Already registered? Login here!
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
