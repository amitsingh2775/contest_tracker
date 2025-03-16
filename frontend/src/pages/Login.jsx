import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login } from "../services/api";
import { Loader2, LogIn } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login: loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login({ username, password });
      if (response.data.token) {
        loginUser(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="flex justify-center mb-6">
          <LogIn size={40} className="text-blue-500 dark:text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          Welcome Back
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
          Log in to continue
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
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 font-medium hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
