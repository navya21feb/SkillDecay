import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6">
      <h1 className="text-5xl font-extrabold text-blue-400 drop-shadow-lg mb-4 tracking-tight">
        Skill Decay
      </h1>

      <p className="text-gray-300 max-w-xl text-center text-lg leading-relaxed mb-8">
        Never forget what you learn. <br />
        Retain your skills and track your growth—one step at a time.
      </p>

      <div className="flex gap-6">
        <Link
          to="/login"
          className="px-7 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-blue-500/50 transition-all duration-300"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-7 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold shadow-md hover:shadow-gray-500/40 transition-all duration-300"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
