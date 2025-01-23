import React, { useState, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { LoginContext } from "../ContextProvider/Context";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Particles from "../Login/Particles";
import { Link } from "react-router-dom";

export const Login = () => {
  const { setLoginData } = useContext(LoginContext);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    // Send data to backend API
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
        toast.error("An error occurred");
        console.log(err);
      });
  };

  return (
    <div className="relative h-auto w-screen flex items-center justify-center">
      {/* Add ParticlesComponent as the background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Particles />
      </div>

      <div className="max-w-screen-2xl w-full md:w-4/6 lg:w-1/2 container mt-28 mx-auto md:h-[66vh] xl:px-24 px-4">
        <img
          src="/tree-1.png"
          alt="Left Tree"
          className="absolute bottom-[-8vh] left-20 w-60 md:w-84 lg:w-80"
        />
        <img
          src="/tree-2.png"
          alt="Right Tree"
          className="absolute bottom-[-8vh] right-20 w-48 md:w-64 lg:w-70"
        />
        <div className="bg-[#e7e7e7] mx-auto py-6 px-6 md:px-16 rounded-lg hover:border-2 hover:border-vividOrange transition-all duration-100">
          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* JOB POSTING DETAILS */}
              <div className="w-full">
                <div>
                  <h1 className="text-[2rem] my-1 font-bold text-center text-vividOrange">
                    Login
                  </h1>
                </div>

                <div>
                  <label className="block mt-2 m-1 text-vividOrange">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    {...register("email")}
                    placeholder="Ex: abhisheksharma@gmail.com"
                    className="create-job-input placeholder:text-xs md:placeholder:text-sm"
                  />
                </div>
                <div>
                  <label className="block mt-2 m-1 text-vividOrange">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      {...register("password")}
                      placeholder="Enter your password"
                      className="create-job-input placeholder:text-xs md:placeholder:text-sm pr-10"
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
              </div>
            </div>

            {/* Submit button */}
            <div className="flex justify-center my-6">
              <button className="block bg-vividOrange text-clearWhite text-md py-2 px-16 rounded-md">
                Login
              </button>
            </div>
          </form>
          <div className="text-center">
            <Link to="/signup">
              <p className="hover:underline text-vividOrange">
                New user? Register here!
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
