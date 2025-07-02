import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    course: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    console.log('Registered:', form);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4 py-6">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Create Your Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Nidhi Chauhan"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm mb-1">Who Are You?</label>
            <select
              name="role"
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="">Select your role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="professional">Professional</option>
            </select>
          </div>

          {/* Course / Subject */}
          <div>
            <label className="block text-sm mb-1">Course / Subject / Field</label>
            <input
              type="text"
              name="course"
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Computer Science / UPSC / Psychology"
              value={form.course}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
