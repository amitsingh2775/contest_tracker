import React from 'react';

const FilterComponent = ({ filters, setFilters }) => {
  const platforms = ['Codeforces', 'CodeChef', 'LeetCode'];

  const handlePlatformChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      platform: prev.platform.includes(value)
        ? prev.platform.filter((p) => p !== value)
        : [...prev.platform, value],
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg sticky top-4 mx-4">
      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Filter Contests</h4>
      
      {/* Platform Selection */}
      <div className="mb-4">
        <h5 className="text-gray-700 dark:text-gray-300 font-medium mb-2">Platform</h5>
        <div className="flex flex-wrap gap-3">
          {platforms.map((platform) => (
            <label key={platform} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                value={platform}
                checked={filters.platform.includes(platform)}
                onChange={handlePlatformChange}
                className="h-4 w-4 text-blue-500 focus:ring-blue-400 rounded border-gray-300"
              />
              <span className="text-gray-800 dark:text-gray-200">{platform}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Status Selection */}
      <div>
        <h5 className="text-gray-700 dark:text-gray-300 font-medium mb-2">Contest Status</h5>
        <select
          value={filters.status}
          onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
          className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
      </div>
    </div>
  );
};

export default FilterComponent;
