import React, { useState, useEffect } from "react";
import { getPastContests } from "../services/api";
import PastContestCard from "../components/PastContestCard";
import { Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom'

const PastContests = () => {
  const [pastContests, setPastContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchPastContests = async () => {
      setLoading(true);
      try {
        const response = await getPastContests();
        setPastContests(response.data);
      } catch (error) {
        console.error("Error fetching past contests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPastContests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-200"
        >
          ← Back
        </button>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
        Watched Contests (Past Contests)
      </h1>
      {loading ? (
        <div className="flex justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        </div>
      ) : pastContests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastContests.map((contest) => (
            <PastContestCard key={contest._id} contest={contest} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
          No past contests available.
        </div>
      )}
    </div>
  );
};

export default PastContests;
