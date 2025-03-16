import React, { useState, useEffect, useContext } from "react";
import { getContests } from "../services/api";
import ContestCard from "../components/ContestCard";
import FilterComponent from "../components/FilterComponent";
import { Loader2, Bookmark, UserCircle, Clock  } from "lucide-react"; // Added Clock icon
import { Link } from "react-router-dom"; // For navigation
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { profile, logout } = useContext(AuthContext);
  const [contests, setContests] = useState([]);
  const [pastContests, setPastContests] = useState([]); // State for past contests
  const [filters, setFilters] = useState({ platform: [], status: "all" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContests = async () => {
      setLoading(true);
      try {
        const params = {};
        if (filters.platform.length > 0) params.platform = filters.platform.join(",");
        if (filters.status !== "all") params.status = filters.status;
        const response = await getContests(params);
        setContests(response.data);
      } catch (error) {
        console.error("Error fetching contests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContests();
  }, [filters]);

  useEffect(() => {
    const fetchPastContests = async () => {
      try {
        const response = await getContests({ status: "past" }); // Fetch past contests
        setPastContests(response.data);
      } catch (error) {
        console.error("Error fetching past contests:", error);
      }
    };
    fetchPastContests();
  }, []);

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    navigate("/"); // Redirect to home
  };
  const addVideo=()=>{
     navigate("/add-solution")
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Top Navigation Bar */}
      <nav className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Contest Tracker</h1>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-700 dark:text-white hover:text-blue-500">Home</Link>
          <Link to="/bookmarks" className="flex items-center space-x-2 text-gray-700 dark:text-white hover:text-blue-500">
            <Bookmark className="w-5 h-5" />
            <span>Bookmarks</span>
          </Link>
          <Link to="/past-contests" className="flex items-center space-x-2 text-gray-700 dark:text-white hover:text-blue-500">
            <Clock className="w-5 h-5" />
            <span>Past Contests</span>
          </Link>
          <UserCircle className="w-8 h-8 text-gray-700 dark:text-white cursor-pointer" />
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar Profile Section */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg p-6">
          <div className="flex flex-col items-center text-center">
            <UserCircle className="w-16 h-16 text-gray-500 dark:text-gray-300" />
            <h2 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">{profile?.username}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400"></p>
          </div>
          <hr className="my-4 border-gray-300 dark:border-gray-600" />
          <ul className="space-y-3">
            <li className="text-gray-700 dark:text-white hover:text-blue-500 cursor-pointer">My Profile</li>
            {profile && profile.role === "admin" && (
              <li onClick={addVideo} className="text-gray-700 dark:text-white hover:text-blue-500 cursor-pointer">
                Add Video
              </li>
            )}

            <li onClick={logout} className="text-red-500 hover:text-red-700 cursor-pointer">Logout</li>
          </ul>
        </aside>

        {/* Main Content Section */}
        <div className="flex-1 p-6">
          {/* Filter Section */}
          <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Filter Contests</h2>
            <FilterComponent filters={filters} setFilters={setFilters} />
          </div>

          {/* Contest List with Scrollable Feature */}
          <div className="mt-6 bg-white dark:bg-gray-800 shadow-lg p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Available Contests</h2>
            <div className="max-h-[500px] overflow-y-auto">
              {loading ? (
                <div className="flex justify-center">
                  <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                </div>
              ) : contests.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contests.map((contest) => (
                    <ContestCard key={contest._id} contest={contest} />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                  No contests available for the selected filters.
                </div>
              )}
            </div>
          </div>

          {/* Past Contests Section */}
          <div className="mt-6 bg-white dark:bg-gray-800 shadow-lg p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Past Contests</h2>
            <div className="max-h-[500px] overflow-y-auto">
              {pastContests.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastContests.map((contest) => (
                    <ContestCard key={contest._id} contest={contest} />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                  No past contests available.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
