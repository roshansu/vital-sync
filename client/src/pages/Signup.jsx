import { useState } from "react";
import { userAuth } from "../api/api";
import { Link } from "react-router-dom";
import { setUserData, getUserData } from "../lib/setLocalData";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  if (localStorage.getItem("userData")) {
    window.location.href = "/home";
  }
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    const data = await userAuth('user/register', form)
    console.log("data", data)
    if(data.success){
      setUserData(data.userData)
      window.location.href = '/home'
    }
    alert(data.message)
    console.log("Form submitted:", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8">

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Create Account
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Join our hospital management platform
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* First + Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              onChange={handleChange}
              className="px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              onChange={handleChange}
              className="px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Email */}
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Password */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 cursor-pointer text-sm text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-3 cursor-pointer text-sm text-gray-500"
            >
              {showConfirm ? "Hide" : "Show"}
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
         <Link to={'/'}> 
         <span className="text-blue-600 font-medium cursor-pointer">
            Login
          </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;