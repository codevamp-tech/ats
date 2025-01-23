import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Particles from "../Login/Particles";

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
    <div className="relative h-[87vh] w-screen">
      {/* Add ParticlesComponent as the background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Particles />
      </div>
      <div className="max-w-scren-2xl w-full md:w-4/6 lg:w-1/2 container mt-2 mx-auto md:h-[60vh] xl:px-24 px-4 ">
        <div className=" bg-deepBlack mx-auto py-6 px-6 md:px-16 rounded-lg h-[86vh]">
          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* JOB POSTING DETAILS */}
              <div className="w-full">
                {/* <div>
                  <h1 className="text-[2rem] font-bold text-center text-vividOrange">
                    Register
                  </h1>
                </div> */}
                <div>
                  <label className="block mt-1 m-1 text-clearWhite ">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    {...register("userName")}
                    placeholder="Ex: Abhishek Sharma"
                    className="create-job-input placeholder:text-xs md:placeholder:text-sm rounded-lg"
                  ></input>
                </div>
                <div>
                  <label className="block mt-2 m-1 text-clearWhite">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    {...register("email")}
                    placeholder="Ex: abhisheksharma@gmail.com"
                    className="create-job-input placeholder:text-xs md:placeholder:text-sm rounded-lg"
                  ></input>
                </div>
                <div>
                  <label className="block mt-2 m-1 text-clearWhite">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      {...register("password")}
                      placeholder="Enter your password"
                      className="create-job-input placeholder:text-xs md:placeholder:text-sm pr-10 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center px-3"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-gray-500" />
                      ) : (
                        <FaEye className="text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block mt-2 m-1 text-clearWhite">
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    {...register("address")}
                    placeholder="Ex: A70, Down-Town Street, Mumbai"
                    className="create-job-input placeholder:text-xs md:placeholder:text-sm rounded-lg"
                  ></input>
                </div>
                <div className="mb-2">
                  <label
                    className="block mt-2 m-1 text-clearWhite"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <select
                    {...register("gender", { required: true })}
                    id="gender"
                    className="create-job-input placeholder:text-xs md:placeholder:text-sm h-10 p-1 rounded-lg"
                  >
                    <option value="" disabled selected>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block mt-2 m-1 text-clearWhite">
                    User Type
                  </label>
                  <select
                    {...register("role", { required: true })}
                    className="create-job-input h-10 p-1 rounded-lg"
                  >
                    <option value="candidate">Candidate</option>
                    <option value="recruiter">Recruiter</option>
                    <option value="coordinator">Coordinator</option>
                    <option value="employer">Employer</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="flex justify-center my-3">
              <button className="block bg-mediumGray text-clearWhite text-md py-2 px-16 rounded-md hover:border-2 hover:border-clearWhite transition-all duration-100">
                Register
              </button>
            </div>
            <div className="text-center">
              <Link to="/login">
                <p className="hover:underline text-clearWhite">
                  Already registered? Login here!
                </p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
