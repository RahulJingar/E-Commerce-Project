// src/pages/Login.jsx
import React, { useState } from "react";          // React component & local state ke liye
import axios from "axios";                        // Backend API pe request bhejne ke liye
import { Link, useNavigate } from "react-router-dom"; // Routing & links ke liye

const Login = () => {
  // Login form ke liye state: email + password store karega
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Successful login ke baad dashboard pe navigate karne ke liye
  const navigate = useNavigate();

  // Har input change ke liye single handler (name se field identify)
  const formHandler = (e) => {
    setFormData({
      ...formData,                 // baaki fields same rahenge
      [e.target.name]: e.target.value, // jis input ka name hoga, uski value update hogi
    });
  };

  // Form submit hone par complete login flow handle karega
  const formDataHandler = async (e) => {
    e.preventDefault(); // page reload hone se rokne ke liye

    // Basic validation: dono fields filled hai ya nahi
    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      // Backend login API call (server side verification)
      const res = await axios.post(
        "http://localhost:3636/user/login",
        formData
      );
      console.log(">>>>>>>>login res>>>>>>", res.data);

      // LocalStorage se users array nikalna (signup ke time store kiya tha)
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // users me aisa user dhundhna jiska email + password match kare
      const matchedUser = users.find(
        (u) =>
          u.email === formData.email && u.password === formData.password
      );

      // Agar user nahi mila to invalid credentials
      if (!matchedUser) {
        alert("Invalid email or password");
        return;
      }

      // Logged in user ko alag se store karna (current session user)
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(matchedUser)
      );

      // Success message + dashboard pe redirect
      alert("Login successfully");
      navigate("/dashboard");
    } catch (error) {
      // Agar API call fail ho jaaye to error log + user ko message
      console.log(error);
      alert(
        error?.response?.data?.message ||
          "Login failed, please try again"
      );
    }
  };

  // UI: Flipkart inspired login card, modern Tailwind styling ke saath
  return (
    // Full page container + gradient background
    <div className="min-h-screen bg-gradient-to-br from-[#e3f2fd] via-[#f1f3f6] to-[#e3f2fd] flex items-center justify-center px-4">
      {/* Main login card */}
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-lg overflow-hidden flex border border-gray-100">
        {/* Left blue info panel: branding + info text */}
        <div className="hidden md:flex flex-col justify-between bg-[#2874f0] text-white p-10 w-2/5">
          <div>
            <h2 className="text-3xl font-semibold mb-3">Welcome Back</h2>
            <p className="text-sm text-blue-100 leading-relaxed">
              Sign in to access your Orders, Wishlist and personalized
              recommendations.
            </p>
          </div>
          <div>
            <p className="text-xs text-blue-100 mb-2">
              Secure login with encrypted credentials.
            </p>
            <p className="text-xs text-blue-100">
              Need help? Use Forgot or Reset password options.
            </p>
          </div>
        </div>

        {/* Right side: actual login form */}
        <div className="w-full md:w-3/5 p-8 md:p-10">
          {/* Form heading */}
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">
            User Login
          </h1>

          {/* Form tag: submit pe formDataHandler chalega */}
          <form onSubmit={formDataHandler} className="space-y-5">
            {/* Email input */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">
                Email Address
              </label>
              <input
                type="email"                         // browser level email validation
                placeholder="Enter Email"
                onChange={formHandler}               // state update handler
                value={formData.email}               // controlled component value
                name="email"
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] transition bg-gray-50"
              />
            </div>

            {/* Password input */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"                      // hidden characters for security
                placeholder="Enter Password"
                onChange={formHandler}
                value={formData.password}
                name="password"
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] transition bg-gray-50"
              />
            </div>

            {/* Info text: terms & policy */}
            <p className="text-xs text-gray-500">
              By continuing, you agree to our Terms of Use and Privacy Policy.
            </p>

            {/* Login button (primary action) */}
            <button className="w-full bg-[#fb641b] hover:bg-[#e65a17] text-white py-2.5 text-sm font-medium rounded-md shadow-sm transition">
              Login
            </button>

            {/* Signup + Forget/Reset links */}
            <div className="flex flex-col gap-2 mt-2">
              {/* Signup link: naya user account banane ke liye */}
              <Link
                to="/signup"
                className="w-full text-center border border-gray-200 hover:bg-gray-50 text-[#2874f0] py-2 text-sm font-medium rounded-md transition"
              >
                New to site? Create an account
              </Link>

              {/* Forget & Reset password links */}
              <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                <Link to="/forget" className="hover:text-[#2874f0]">
                  Forgot password?
                </Link>
                <Link to="/reset" className="hover:text-[#2874f0]">
                  Reset password
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
