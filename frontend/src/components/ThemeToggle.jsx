import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 
                text-gray-900 dark:text-white px-4 py-2 rounded-full shadow-lg 
                hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5 text-gray-900 dark:text-gray-300" />
      ) : (
        <SunIcon className="h-5 w-5 text-yellow-500" />
      )}
      <span className="font-medium">{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
    </button>
  );
};

export default ThemeToggle;
