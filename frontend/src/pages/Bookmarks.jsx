import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getBookmarks } from "../services/api";
import ContestCard from "../components/ContestCard";
import { Loader2, BookmarkX } from "lucide-react";
import { Link,useNavigate } from "react-router-dom";

const Bookmarks = () => {
  const { user } = useContext(AuthContext);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchBookmarks = async () => {
        setLoading(true);
        try {
          const response = await getBookmarks();
          setBookmarks(response.data);
        } catch (error) {
          console.error("Error fetching bookmarks:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBookmarks();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-100 dark:bg-gray-900 p-6">
        <p className="text-xl text-red-500 font-semibold mb-4">Please login to view your bookmarks</p>
        <Link
          to="/login"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Login Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
      <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-200"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Bookmarked Contests</h2>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          </div>
        ) : bookmarks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((contest) => (
              <ContestCard key={contest._id} contest={contest} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center text-gray-500 dark:text-gray-400 mt-10">
            <BookmarkX className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-500" />
            <p className="text-lg">No bookmarks found</p>
            <Link
              to="/"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
            >
              Browse Contests
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
