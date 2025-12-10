import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const formHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formDataHandler = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3636/user/signup",
        formData
      );
      console.log(">>>>>>>>signup res>>>>>>", res.data);

      // yaha localStorage me user list save karenge
      // purane users nikalo
      const existingUsers =
        JSON.parse(localStorage.getItem("users")) || [];

      // naya user push karo
      existingUsers.push(formData);

      // wapas save karo
      localStorage.setItem("users", JSON.stringify(existingUsers));

      alert("Signup successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(
        error?.response?.data?.message ||
          "Signup failed, please try again"
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <form
        onSubmit={formDataHandler}
        className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-[90%] max-w-md space-y-6 border border-white"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 tracking-wide">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          onChange={formHandler}
          value={formData.name}
          name="name"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none 
          focus:ring-2 focus:ring-purple-500 transition shadow-sm"
        />

        <input
          type="email"
          placeholder="Email Address"
          onChange={formHandler}
          value={formData.email}
          name="email"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none 
          focus:ring-2 focus:ring-purple-500 transition shadow-sm"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={formHandler}
          value={formData.password}
          name="password"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none 
          focus:ring-2 focus:ring-purple-500 transition shadow-sm"
        />

        <button
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl 
          text-lg font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all"
        >
          Signup
        </button>

        <Link
          to="/"
          className="w-full block text-center bg-gray-800 text-white py-3 rounded-xl 
          hover:bg-gray-900 transition-all shadow"
        >
          Login
        </Link>
      </form>
    </div>
  );
};

export default Signup;
