import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../App';

const LandingPage = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? 'bg-gradient-to-br from-black via-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-100 via-gray-50 to-white'} text-${darkMode ? 'white' : 'gray-900'} px-6 relative`}>
      {/* Theme Toggle Button */}
      <button 
        onClick={toggleDarkMode}
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-gray-600" />
        )}
      </button>

      <h1 className={`text-5xl font-extrabold ${darkMode ? 'text-blue-400' : 'text-blue-600'} drop-shadow-lg mb-4 tracking-tight`}>
        Skill Decay
      </h1>

      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-xl text-center text-lg leading-relaxed mb-8`}>
        Never forget what you learn. <br />
        Retain your skills and track your growth—one step at a time.
      </p>

      <div className="flex gap-6">
        <Link
          to="/login"
          className={`px-7 py-3 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold shadow-md hover:shadow-blue-500/50 transition-all duration-300`}
        >
          Login
        </Link>

        <Link
          to="/register"
          className={`px-7 py-3 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${darkMode ? 'text-white' : 'text-gray-800'} font-semibold shadow-md hover:shadow-gray-500/40 transition-all duration-300`}
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;