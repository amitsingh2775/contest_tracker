import React, { useContext } from "react";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";
import { addBookmark } from "../services/api";
import { Bookmark, Play } from "lucide-react";

const ContestCard = ({ contest }) => {
  const { user } = useContext(AuthContext);
  const now = new Date();
  const startTime = new Date(contest.startTime);
  const endTime = new Date(contest.endTime);
  let timeStatus = "";

  if (now < startTime) {
    timeStatus = `Starts ${moment(startTime).fromNow()}`;
  } else if (now <= endTime) {
    timeStatus = `Ends ${moment(endTime).fromNow()}`;
  } else {
    timeStatus = `Ended ${moment(endTime).fromNow()}`;
  }

  const handleBookmark = async () => {
    if (!user) {
      alert("Please login to bookmark");
      return;
    }
    await addBookmark(contest._id, "add");
    alert("Contest bookmarked");
  };

  const handleParticipate = () => {
    if (contest.url) {
      window.open(contest.url, "_blank");
    } else {
      alert("Contest URL not available");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-5 m-4 max-w-md w-full transition-all duration-300 hover:shadow-2xl hover:scale-105">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white truncate">
        {contest.name}
      </h3>
      <p className="text-gray-500 dark:text-gray-300 mt-1">
        Platform:{" "}
        <span className="font-medium text-gray-800 dark:text-gray-100">
          {contest.platform}
        </span>
      </p>
      <div className="mt-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
        <p className="text-gray-600 dark:text-gray-300">
          <strong>Start:</strong> {moment(startTime).format("LLL")}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <strong>End:</strong> {moment(endTime).format("LLL")}
        </p>
        <p
  className={`text-sm italic mt-1 ${
    now > endTime ? "text-red-500" : "text-green-500"
  }`}
>
  {timeStatus}
</p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        {user && (
          <button
            onClick={handleBookmark}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-md "
          >
            <Bookmark size={18} className="mr-2" />
            Bookmark
          </button>
        )}

        <button
          onClick={handleParticipate}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-200 shadow-md"
        >
          <Play size={18} className="mr-2" />
          Participate
        </button>
      </div>
    </div>
  );
};

export default ContestCard;
