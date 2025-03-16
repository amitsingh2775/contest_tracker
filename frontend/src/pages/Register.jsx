import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";
import { Loader2, UserPlus } from "lucide-react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is 'user'
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ username, password, role });
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="flex justify-center mb-6">
          <UserPlus size={40} className="text-green-500 dark:text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          Create an Account
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
          Join us and start your journey!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Select Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-all duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-green-500 font-medium hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
