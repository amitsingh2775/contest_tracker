import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getContests, addSolution } from "../services/api";
import { Loader2, ShieldAlert, CheckCircle } from "lucide-react";
import {useNavigate} from 'react-router-dom'
const AddSolution = () => {
  const { profile } = useContext(AuthContext);
  const [contests, setContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate=useNavigate()

  useEffect(() => {
    if (profile && profile.role === "admin") {
      const fetchPastContests = async () => {
        try {
          const response = await getContests({ status: "past" });
          setContests(response.data);
        } catch (err) {
          console.error("Error fetching contests:", err);
          setError("Failed to fetch past contests.");
        }
      };
      fetchPastContests();
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedContest || !youtubeUrl) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      await addSolution({ contestId: selectedContest, youtubeUrl });
      setSuccess(true);
      setYoutubeUrl("");
      setSelectedContest("");
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error adding solution:", err);
      setError("Failed to add solution. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!profile || profile.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-100 dark:bg-gray-900 p-6">
              <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-200"
        >
          ← Back
        </button>
        <ShieldAlert className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-xl text-red-500 font-semibold">Access Denied</p>
        <p className="text-gray-600 dark:text-gray-400 mt-2">You must be an admin to add solutions.</p>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 p-6">
       
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Add YouTube Solution</h2>
        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-200"
        >
          ← Back
        </button>
       

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {success && (
          <div className="flex items-center text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-800 p-3 rounded-md mb-3">
            <CheckCircle className="w-5 h-5 mr-2" />
            <p>Solution added successfully!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={selectedContest}
            onChange={(e) => setSelectedContest(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Contest</option>
            {contests.map((contest) => (
              <option key={contest._id} value={contest._id}>
                {contest.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="YouTube URL"
            className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition-colors duration-200 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "Add Solution"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSolution;
