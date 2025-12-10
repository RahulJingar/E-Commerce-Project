// src/pages/Reset.jsx
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const Reset = () => {
  // ✔ Single state object: email, oldPassword, newPassword
  const [resetData, setResetData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const navigate = useNavigate();

  // ✔ Generic change handler, har input ke name se value set karega
  const resetHandle = (e) => {
    const { name, value } = e.target;
    setResetData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetHandler = async (e) => {
    e.preventDefault();

    const { email, oldPassword, newPassword } = resetData;

    // ✔ Simple validation: empty field nahi hona chahiye
    if (!email || !oldPassword || !newPassword) {
      alert("Please fill all input fields");
      return;
    }

    try {
      // ✔ Axios request: sirf required body bhej rahe
      const res = await axios.patch("http://127.0.0.1:3636/user/reset", {
        email,
        oldPassword,
        newPassword,
      });
      console.log(">>reset res>>", res.data);

      // ========= LocalStorage handling (Forget jaisa) =========

      // ✔ users array nikal lo, agar null ho to empty array
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // ✔ check karo user exist + oldPassword sahi
      const userExists = users.some(
        (u) => u.email === email && u.password === oldPassword
      );

      if (!userExists) {
        alert("Invalid email or old password");
        return;
      }

      // ✔ jis user ka email + oldPassword match kare uska password change
      const updatedUsers = users.map((u) =>
        u.email === email && u.password === oldPassword
          ? { ...u, password: newPassword }
          : u
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // ✔ loggedInUser bhi update karo agar wohi banda ho
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

      if (
        loggedInUser &&
        loggedInUser.email === email &&
        loggedInUser.password === oldPassword
      ) {
        const updatedLoggedInUser = {
          ...loggedInUser,
          password: newPassword,
        };
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(updatedLoggedInUser)
        );
      }

      alert("Password reset successfully, please login again");
      navigate("/"); // ✔ login page pe redirect
    } catch (error) {
      // ✔ Error logs debug ke liye, user ke liye generic message
      console.log("AXIOS ERROR ====>", error);
      console.log("RESPONSE DATA ====>", error.response?.data);
      console.log("STATUS ====>", error.response?.status);
      alert(error.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    // UI: Flipkart style container – isko as it is rakha
    <div className="min-h-screen flex items-center justify-center bg-[#f1f3f6] px-4">
      <form
        onSubmit={resetHandler}
        className="bg-white w-full max-w-xl rounded-sm shadow-md flex"
      >
        {/* Left info panel */}
        <div className="hidden md:flex flex-col justify-between bg-[#2874f0] text-white p-8 w-2/5">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Change Password</h2>
            <p className="text-sm text-blue-100">
              Use your registered email and current password to set a new one.
            </p>
          </div>
          <p className="text-xs text-blue-100 mt-6">
            Choose a strong password and never share it with anyone.
          </p>
        </div>

        {/* Right form side */}
        <div className="w-full md:w-3/5 p-8 flex flex-col gap-4">
          <h2 className="text-xl font-medium text-gray-800">
            Reset Your Password
          </h2>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={resetData.email}
            onChange={resetHandle}
            className="border-b border-gray-300 py-2 text-sm w-full outline-none focus:border-[#2874f0] transition"
          />

          {/* Old Password */}
          <input
            type="password"
            name="oldPassword"
            placeholder="Enter Old Password"
            value={resetData.oldPassword}
            onChange={resetHandle}
            className="border-b border-gray-300 py-2 text-sm w-full outline-none focus:border-[#2874f0] transition"
          />

          {/* New Password */}
          <input
            type="password"
            name="newPassword"
            placeholder="Enter New Password"
            value={resetData.newPassword}
            onChange={resetHandle}
            className="border-b border-gray-300 py-2 text-sm w-full outline-none focus:border-[#2874f0] transition"
          />

          <p className="text-xs text-gray-500 pt-2">
            Make sure your new password is strong and different from the old one.
          </p>

          <button className="w-full bg-[#fb641b] hover:bg-[#e65a17] text-white font-medium py-2 text-sm rounded-sm mt-2">
            Reset Password
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full border border-gray-300 hover:bg-gray-100 text-gray-800 font-medium py-2 text-sm rounded-sm mt-2"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reset;
