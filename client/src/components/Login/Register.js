import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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
      email: "",
      password: "",
      gender: "",
      address: "",
      role: "candidate", // Default role
      head: false, // Default value for head
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
    // Send data to backend API
    fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        if (res.status === 409) {
          // HTTP 409 Conflict for duplicate email
          throw new Error("User already exists");
        }
        throw new Error("Failed to register");
      })
      .then((result) => {
        console.log(result);
        toast.success("Sign up successful");
        setRedirect(true);
      })
      .catch((err) => {
        if (err.message === "User already exists") {
          toast.error(
            "Email already registered. Please use a different email."
          );
        } else {
          toast.error("Unable to signup. Please try again.");
        }
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
      {/* <div className="bg-[#e7e7e7] mx-auto py-6 px-6 md:px-16 rounded-lg"> */}
      <div className="flex flex-col items-center justify-center mx-auto px-6 py-6">
        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            {/* REGISTRATION DETAILS */}
            <div className="w-full">
              {/* <div>
                <h1 className="text-xl my-1 font-bold text-center">Register</h1>
              </div> */}
              <div>
                <label className="block mt-1 m-1 text-sm">Full Name</label>
                <input
                  type="text"
                  required
                  {...register("userName")}
                  placeholder="Ex: Abhishek Sharma"
                  className="w-96 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div>
                <label className="block mt-2 m-1 text-sm">Email</label>
                <input
                  type="email"
                  required
                  {...register("email")}
                  placeholder="Ex: abhisheksharma@gmail.com"
                  className="w-96 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div>
                <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    {...register("password")}
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
                <label className="block mt-2 m-1 text-sm">Address</label>
                <input
                  type="text"
                  required
                  {...register("address")}
                  placeholder="Ex: A70, Down-Town Street, Mumbai"
                  className="w-96 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div className="mb-4">
                <label className="block mt-2 m-1 text-sm" htmlFor="gender">
                  Gender
                </label>
                <select
                  {...register("gender", { required: true })}
                  id="gender"
                  className="w-96 px-4 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option value="" disabled selected>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              {/* <div>
                                <label className="block mt-2 m-1 text-sm">User Type</label>
                                <select
                                    {...register("role", { required: true })}
                                    className="create-job-input"
                                >
                                    <option value="candidate">Candidate</option>
                                    <option value="recruiter_manager">Recruiter Manager</option>
                                    <option value="hiring_manager">Hiring Manager</option>
                                    <option value="interviewer">Interviewer</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div> */}
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-center my-8">
            <button className="block bg-secondary text-white text-md py-3 px-16 rounded-md">
              Register
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link to="/login">
            <p className="hover:underline">Already registered? Login here!</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
