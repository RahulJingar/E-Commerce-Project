import axios from "axios"; // Backend API pe request bhejne ke liye axios use kiya
import React, { useState } from "react"; // React component aur local state handle karne ke liye
import { useNavigate } from "react-router"; // Password update ke baad navigate karne ke liye

const Forget = () => {
  // Email input ke liye local state banayi
  const [email, setEmail] = useState("");
  // New password input ke liye local state banayi
  const [newPassword, setNewPassword] = useState("");
  // Routing ke liye hook use kiya (back ya login page pe bhejne ke liye)
  const navigate = useNavigate();

  // Form submit hone par forget password ka poora flow handle karega
  const forgetHandle = async (e) => {
    e.preventDefault(); // Default form submit (page reload) ko rokne ke liye

    // Basic validation: dono fields filled hain ya nahi
    if (!(email && newPassword)) {
      alert("please fill all input field");
      return;
    }

    try {
      // Backend pe password update request bhejna (PATCH request)
      const forgetData = await axios.patch(
        "http://127.0.0.1:3636/user/forget", // Backend forget password endpoint
        { email, newPassword } // Body me email aur naya password bhejna
      );
      console.log(">>>>>forget>>>>>", forgetData.data); // Response ko debug ke liye console me print karna

      // LocalStorage se users ka array nikalna (jo signup ke time store kiya gaya)
      const users = JSON.parse(localStorage.getItem("users"));

      // Check karna ki diya gaya email kisi user ke paas hai ya nahi
      const userExists = users.some((u) => u.email === email);
      if (!userExists) {
        alert("User not found with this email");
        return;
      }

      // Jis user ka email match kare uska password naya password se replace karna
      const updatedUsers = users.map((u) => {
        if (u.email === email) {
          return { ...u, password: newPassword }; // Sirf password field update kiya
        }
        return u; // Baaki users ko same hi return kar diya
      });

      // Updated users list ko dubara localStorage me save kar diya
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Abhi jo loggedInUser hai usko bhi check karna (agar same email hai to uska password bhi update karna)
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

      if (loggedInUser && loggedInUser.email === email) {
        const updatedLoggedInUser = {
          ...loggedInUser,
          password: newPassword,
        };
        // loggedInUser ko bhi naya password ke sath store kar diya
        localStorage.setItem("loggedInUser", JSON.stringify(updatedLoggedInUser));
      }

      // User ko success message dikhana aur login page pe bhejna
      alert("password updated successfully, please login again");
      navigate("/"); 
    } catch (err) {
      // Agar backend call me error aaye to console me print karna debugging ke liye
      console.log(err);
    }
  };

  return (
    // Flipkart jaisa: light grey background, center me white card
    <div className="min-h-screen flex items-center justify-center bg-[#f1f3f6] px-4">
      {/* Card: white background, halka shadow, clean border */}
      <form
        onSubmit={forgetHandle} // Form submit hone par forgetHandle chalega
        className="bg-white w-full max-w-xl rounded-sm shadow-md flex"
      >
        {/* Left blue panel: info / heading ke liye */}
        <div className="hidden md:flex flex-col justify-between bg-[#2874f0] text-white p-8 w-2/5">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Forgot Password?</h2>
            <p className="text-sm text-blue-100">
              Reset your password using your registered email.
            </p>
          </div>
          <p className="text-xs text-blue-100 mt-6">
            You will be able to login again with your new password.
          </p>
        </div>

        {/* Right side: actual forget password form */}
        <div className="w-full md:w-3/5 p-8 flex flex-col gap-4">
          {/* Heading section */}
          <h2 className="text-xl font-medium text-gray-800">
            Reset Password
          </h2>

          {/* Email input field - controlled component */}
          <input
            type="email" // Email format ke liye browser level validation
            placeholder="Enter Email"
            value={email} // State se bind ki gayi value
            className="border-b border-gray-300 py-2 text-sm w-full outline-none focus:border-[#2874f0] transition" // Underline style input (Flipkart feel)
            onChange={(e) => setEmail(e.target.value)} // Har change pe email state update
          />

          {/* New password input field - controlled component */}
          <input
            type="password" // Password ko hidden rakhne ke liye
            placeholder="Enter New Password"
            value={newPassword} // State se bind ki gayi value
            className="border-b border-gray-300 py-2 text-sm w-full outline-none focus:border-[#2874f0] transition"
            onChange={(e) => setNewPassword(e.target.value)} // New password ko update karna
          />

          {/* Info text terms / security ke liye */}
          <p className="text-xs text-gray-500 pt-2">
            Make sure your new password is strong and not shared with anyone.
          </p>

          {/* Submit button - primary action: password change */}
          <button className="w-full bg-[#fb641b] hover:bg-[#e65a17] text-white font-medium py-2 text-sm rounded-sm mt-2">
            Forget Password
          </button>

          {/* Back button - previous page pe le jane ke liye */}
          <button
            type="button" // Is button se form submit na ho iss liye type="button"
            onClick={() => navigate(-1)} // Browser history me ek step piche le jane ke liye
            className="w-full border border-gray-300 hover:bg-gray-100 text-gray-800 font-medium py-2 text-sm rounded-sm mt-2"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default Forget; // Forget component ko export kiya taaki routing me use kar sako
