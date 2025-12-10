import React, { useState } from "react"; // React aur useState import kiye - form state manage karne ke liye
import axios from "axios"; // Backend API call ke liye axios import kiya
import { Link, useNavigate } from "react-router-dom"; // Navigation ke liye Link aur useNavigate import kiye


const Signup = () => {
  // Form data ko manage karne ke liye initial empty state banaya
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Page navigation ke liye useNavigate hook use kiya
  const navigate = useNavigate();

  // Har input field ke change ko handle karne ke liye single handler banaya
  // Ye efficient hai multiple onChange se better, dynamic name use karke
  const formHandler = (e) => {
    setFormData({
      ...formData, // Previous data ko preserve karne ke liye spread operator
      [e.target.name]: e.target.value, // Dynamic field name se value update
    });
  };

  // Main form submit handler - async banaya API call ke liye
  const formDataHandler = async (e) => {
    e.preventDefault(); // Page reload prevent karne ke liye

    // Simple validation - sab fields filled hain ya nahi check kiya
    if (!(formData.name && formData.email && formData.password)) {
      alert("Please fill all fields"); // User ko alert dikhaya missing fields ke liye
      return; // Early return agar validation fail ho
    }

    try {
      // Backend pe POST request bheja signup data ke sath
      const res = await axios.post(
        "http://localhost:3636/user/signup", // Backend signup endpoint
        formData // Form data as request body
      );
      console.log(">>>>>>>>signup res>>>>>>", res.data); // Response debug karne ke liye console.log

      // LocalStorage me users array store karne ke liye (backup/offline use)
      const existingUsers = JSON.parse(localStorage.getItem("users")); // Existing users fetch kiye
      existingUsers.push(formData); // New user ko array me add kiya
      localStorage.setItem("users", JSON.stringify(existingUsers)); // Updated array save kiya

      alert("Signup successfully"); // Success message dikhaya
      navigate("/"); // Signup success pe home/login page pe redirect
    } catch (error) {
      console.log(error); // Error ko console me log kiya debugging ke liye
    }
  };

  return (
    // Flipkart jaisa: light grey background + center me white card
    <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white shadow-md rounded-sm flex">
        {/* Left blue panel jaisa info section */}
        <div className="hidden md:flex flex-col justify-between bg-[#2874f0] text-white p-8 w-2/5">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Looks like you're new here!</h2>
            <p className="text-sm text-blue-100">
              Sign up with your email to get started.
            </p>
          </div>
          <p className="text-xs text-blue-100 mt-6">
            Get access to your Orders, Wishlist and Recommendations.
          </p>
        </div>

        {/* Right side actual form */}
        <div className="w-full md:w-3/5 p-8">
          <h1 className="text-xl font-medium mb-6 text-gray-800">
            Sign up
          </h1>

          <form onSubmit={formDataHandler} className="space-y-4">
            {/* Name input field - controlled component banaya state se connected */}
            <div>
              <input
                type="text"
                placeholder="Enter Name" // User ko hint dene ke liye
                onChange={formHandler} // Change event pe handler call
                value={formData.name} // State se value bind kiya (controlled input)
                name="name" // formHandler me identify karne ke liye
                className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-[#2874f0]" // Simple underline style input
              />
            </div>

            {/* Email input - email type validation ke liye browser built-in */}
            <div>
              <input
                type="email" // Browser automatic email validation karega
                placeholder="Enter Email"
                onChange={formHandler}
                value={formData.email}
                name="email"
                className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-[#2874f0]"
              />
            </div>

            {/* Password input - secure type password */}
            <div>
              <input
                type="password" // Input hide rahega asterisks me
                placeholder="Enter Password"
                onChange={formHandler}
                value={formData.password}
                name="password"
                className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-[#2874f0]"
              />
            </div>

            <p className="text-xs text-gray-500 pt-2">
              By continuing, you agree to our Terms of Use and Privacy Policy.
            </p>

            {/* Submit button - Flipkart blue button */}
            <button
              className="w-full bg-[#fb641b] hover:bg-[#e65a17] text-white py-2 text-sm font-medium rounded-sm mt-2"
            >
              Signup
            </button>

            {/* Login link - already account hai to login page jane ke liye */}
            <Link
              to="/" // Home/login page pe navigate
              className="w-full block text-center border border-gray-300 text-[#2874f0] py-2 text-sm font-medium rounded-sm mt-2"
            >
              Existing User? Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Signup; // Component export kiya use karne ke liye
