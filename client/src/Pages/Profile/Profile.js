import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("user");
        const userData = JSON.parse(token);
        setUser({
          name: userData.name,
          email: userData.email,
          role: userData.role,
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    try {
      await axios.put("http://localhost:8080/user/update-profile", user);
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Error updating profile");
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gradient-to-b from-gray-900 to-black ">
      <div className="w-full max-w-xl bg-black/40  backdrop-blur-lg rounded-xl shadow-xl overflow-hidden border-2 border-white/20">
        <div className="p-8">
          <h2 className="text-center text-white text-2xl md:text-3xl font-bold text-primary mb-8">
            Edit Profile
          </h2>
          {message && (
            <p
              className={`text-center text-lg font-semibold ${message.includes("Error") ? "text-red-500" : "text-green-600"
                } mb-6 animate-fade-in`}
            >
              {message}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder:text-gray-500"
                />

              </div>
            </div>

            {/* Email Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  disabled
                  className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder:text-gray-500"
                />

              </div>
            </div>

            {/* Role Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Role
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="role"
                  value={user.role}
                  disabled
                  className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder:text-gray-500"
                />

              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-200 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder:text-gray-500"
                />

              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder:text-gray-500"
                />

              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-40 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                <span className="mr-2">Update Profile</span>
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;





