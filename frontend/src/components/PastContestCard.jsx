import React from "react";
import moment from "moment";
import { Play } from "lucide-react";

const PastContestCard = ({ contest }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-5 m-4 max-w-md w-full transition-all duration-300 hover:shadow-2xl hover:scale-105">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white truncate">
        {contest.name}
      </h3>
      <p className="text-gray-500 dark:text-gray-300 mt-1">
        Platform: <span className="font-medium text-gray-800 dark:text-gray-100">{contest.platform}</span>
      </p>
      <div className="mt-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
        <p className="text-gray-600 dark:text-gray-300">
          <strong>Start:</strong> {moment(contest.startTime).format("LLL")}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <strong>End:</strong> {moment(contest.endTime).format("LLL")}
        </p>
        <p className="text-red-500 text-sm italic mt-1">Ended {moment(contest.endTime).fromNow()}</p>
      </div>
      {contest.youtubeUrl && (
        <div className="mt-4 flex justify-center">
          <a
            href={contest.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md"
          >
            <Play size={18} className="mr-2" /> Watch Solution
          </a>
        </div>
      )}
    </div>
  );
};

export default PastContestCard;