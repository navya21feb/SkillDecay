import React, { useState, useEffect } from 'react';
import { Brain, Calendar, TrendingUp, BookOpen, Settings, Bell, Search, User, Clock, Target, Zap, BarChart3, Map, Play, Sun, Moon, Edit, Mail, Phone, MapPin, Award, Camera, Plus, Filter, ChevronRight, Upload, Database, Code, Download, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

// Mock data for demonstration
const mockData = {
  user: {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Full-stack developer passionate about learning and knowledge retention. Always exploring new technologies and methodologies.",
    avatar: "/api/placeholder/100/100",
    knowledgeHealth: 78,
    streak: 15,
    joinDate: "January 2024",
    totalReviews: 342,
    completedCourses: 18,
    badges: ["Quick Learner", "Consistent Reviewer", "Tech Explorer"]
  },
  dailyReviews: [
    { id: 1, title: "React Hooks", category: "Programming", dueIn: "5 min", difficulty: "medium", timeEstimate: "2 min" },
    { id: 2, title: "Python Data Structures", category: "Programming", dueIn: "15 min", difficulty: "easy", timeEstimate: "1 min" },
    { id: 3, title: "Machine Learning Basics", category: "AI/ML", dueIn: "1 hour", difficulty: "hard", timeEstimate: "3 min" }
  ],
  weeklyProgress: [
    { day: 'Mon', hours: 2.5, reviews: 8 },
    { day: 'Tue', hours: 1.8, reviews: 6 },
    { day: 'Wed', hours: 3.2, reviews: 12 },
    { day: 'Thu', hours: 2.1, reviews: 7 },
    { day: 'Fri', hours: 1.5, reviews: 5 },
    { day: 'Sat', hours: 2.8, reviews: 9 },
    { day: 'Sun', hours: 2.0, reviews: 6 }
  ],
  knowledgeMap: [
    { id: 1, title: "React", connections: 3, strength: 85 },
    { id: 2, title: "JavaScript", connections: 5, strength: 92 },
    { id: 3, title: "Python", connections: 4, strength: 78 },
    { id: 4, title: "Machine Learning", connections: 2, strength: 65 }
  ],
  upcomingReviews: [
    { time: "10:00", title: "CSS Flexbox", subject: "Web Development" },
    { time: "14:30", title: "SQL Joins", subject: "Database" },
    { time: "16:15", title: "Git Commands", subject: "Version Control" }
  ]
};

// Utility Components
const Card = ({ children, className = "", darkMode }) => (
  <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-sm border ${className}`}>
    {children}
  </div>
);

const Button = ({ children, variant = "primary", size = "md", onClick, className = "", darkMode }) => {
  const baseClasses = "font-medium rounded-lg transition-colors duration-200 flex items-center gap-2";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700",
    success: "bg-green-600 hover:bg-green-700 text-white",
    warning: "bg-orange-500 hover:bg-orange-600 text-white"
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Header Component
const Header = ({ user, onSearch, darkMode, toggleDarkMode }) => (
  <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4 fixed top-0 left-0 right-0 z-50`}>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>SkillDecay</h1>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>AI Knowledge Retention</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search knowledge..."
            className={`pl-10 pr-4 py-2 w-64 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
            }`}
            onChange={onSearch}
          />
        </div>
        
        <button 
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg transition-colors ${
            darkMode 
              ? 'text-yellow-400 hover:bg-gray-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        <button className={`relative p-2 rounded-lg transition-colors ${
          darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
        }`}>
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 cursor-pointer">
          <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
          <div className="text-right">
            <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  </header>
);

// Sidebar Component
const Sidebar = ({ activeTab, onTabChange, darkMode }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'learning', label: 'Learning', icon: BookOpen },
    { id: 'review', label: 'Review', icon: Target },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'integration', label: 'Integration', icon: Map },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className={`w-64 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r fixed top-20 bottom-0`}>
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id 
                      ? darkMode 
                        ? 'bg-gray-700 text-white' 
                        : 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : darkMode 
                        ? 'text-gray-300 hover:bg-gray-700' 
                        : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

// Profile Page Component
const ProfilePage = ({ user, darkMode }) => (
  <div className="space-y-6">
    <Card className="p-6" darkMode={darkMode}>
      <div className="flex items-start gap-6">
        <div className="relative">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-24 h-24 rounded-full object-cover"
          />
          <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Member since {user.joinDate}</p>
            </div>
            <Button variant="secondary" darkMode={darkMode}>
              <Edit className="w-4 h-4" />
              Edit Profile
            </Button>
          </div>
          
          <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{user.bio}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Mail className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{user.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{user.location}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6 text-center" darkMode={darkMode}>
        <div className="text-3xl font-bold text-blue-600 mb-2">{user.totalReviews}</div>
        <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Reviews</div>
      </Card>
      <Card className="p-6 text-center" darkMode={darkMode}>
        <div className="text-3xl font-bold text-green-600 mb-2">{user.completedCourses}</div>
        <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed Courses</div>
      </Card>
      <Card className="p-6 text-center" darkMode={darkMode}>
        <div className="text-3xl font-bold text-purple-600 mb-2">{user.streak}</div>
        <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Day Streak</div>
      </Card>
    </div>

    <Card className="p-6" darkMode={darkMode}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Achievements</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {user.badges.map((badge, index) => (
          <div key={index} className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} text-center`}>
            <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{badge}</h4>
          </div>
        ))}
      </div>
    </Card>

    <Card className="p-6" darkMode={darkMode}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Learning Preferences</h3>
      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Preferred Learning Time
          </label>
          <select className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-200 text-gray-900'
          }`}>
            <option>Morning (6AM - 12PM)</option>
            <option>Afternoon (12PM - 6PM)</option>
            <option>Evening (6PM - 12AM)</option>
          </select>
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Daily Review Goal
          </label>
          <input
            type="number"
            defaultValue="10"
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-200 text-gray-900'
            }`}
          />
        </div>
      </div>
      
      <div className="mt-6">
        <Button variant="primary">Save Changes</Button>
      </div>
    </Card>
  </div>
);

// Knowledge Health Meter Component
const KnowledgeHealthMeter = ({ score, streak, darkMode }) => (
  <Card className="p-6" darkMode={darkMode}>
    <div className="flex items-center justify-between mb-4">
      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Knowledge Health</h3>
      <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
        <Zap className="w-4 h-4" />
        {streak} day streak
      </div>
    </div>
    
    <div className="relative w-32 h-32 mx-auto mb-4">
      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke={darkMode ? "#374151" : "#e5e7eb"}
          strokeWidth="8"
        />
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="#10b981"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${score * 3.14} 314`}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{score}%</div>
          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Health Score</div>
        </div>
      </div>
    </div>
    
    <div className="text-center">
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {score >= 80 ? "Excellent retention!" : score >= 60 ? "Good progress" : "Needs attention"}
      </p>
    </div>
  </Card>
);

// Daily Review Queue Component
const DailyReviewQueue = ({ reviews, onStartReview, darkMode }) => (
  <Card className="p-6" darkMode={darkMode}>
    <div className="flex items-center justify-between mb-4">
      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Today's Reviews</h3>
      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
        {reviews.length} pending
      </span>
    </div>
    
    <div className="space-y-3">
      {reviews.map(review => (
        <div key={review.id} className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className="flex-1">
            <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{review.title}</h4>
            <div className="flex items-center gap-4 mt-1">
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{review.category}</span>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>• {review.timeEstimate}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                review.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                review.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {review.difficulty}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Due in {review.dueIn}</span>
            <Button size="sm" onClick={() => onStartReview(review.id)} darkMode={darkMode}>
              <Play className="w-4 h-4" />
              Start
            </Button>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

// Weekly Progress Chart Component
const WeeklyProgressChart = ({ data, darkMode }) => {
  const maxHours = Math.max(...data.map(d => d.hours));
  
  return (
    <Card className="p-6" darkMode={darkMode}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Weekly Progress</h3>
      <div className="flex items-end justify-between h-32 gap-2">
        {data.map((day, index) => (
          <div key={day.day} className="flex-1 flex flex-col items-center">
            <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-t-lg relative overflow-hidden`}>
              <div 
                className="bg-blue-600 rounded-t-lg transition-all duration-500"
                style={{ height: `${(day.hours / maxHours) * 100}px` }}
              />
            </div>
            <div className="mt-2 text-center">
              <div className={`text-xs font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{day.day}</div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{day.hours}h</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Total: {data.reduce((sum, day) => sum + day.hours, 0).toFixed(1)} hours this week
        </p>
      </div>
    </Card>
  );
};

// Knowledge Map Component
const KnowledgeMap = ({ knowledge, darkMode }) => (
  <Card className="p-6" darkMode={darkMode}>
    <div className="flex items-center justify-between mb-4">
      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Knowledge Map</h3>
      <Button variant="secondary" size="sm" darkMode={darkMode}>View Full Map</Button>
    </div>
    
    <div className="grid grid-cols-2 gap-3">
      {knowledge.map(item => (
        <div key={item.id} className={`p-3 border rounded-lg ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <h4 className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h4>
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.connections} links</span>
          </div>
          <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${item.strength}%` }}
            />
          </div>
          <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.strength}% strength</div>
        </div>
      ))}
    </div>
  </Card>
);

// Upcoming Reviews Timeline Component
const UpcomingTimeline = ({ reviews, darkMode }) => (
  <Card className="p-6" darkMode={darkMode}>
    <div className="flex items-center justify-between mb-4">
      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Today's Schedule</h3>
      <Calendar className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
    </div>
    
    <div className="space-y-3">
      {reviews.map((review, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className={`flex-shrink-0 w-12 text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {review.time}
          </div>
          <div className={`flex-1 p-2 rounded-lg border-l-4 border-blue-400 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
            <div className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{review.title}</div>
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{review.subject}</div>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

// Micro Refresher Component
const MicroRefresher = ({ question, onAnswer, onSkip, darkMode }) => (
  <Card className="p-6 border-l-4 border-blue-500" darkMode={darkMode}>
    <div className="flex items-center justify-between mb-4">
      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Quick Review</h3>
      <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <Clock className="w-4 h-4" />
        30 seconds
      </div>
    </div>
    
    <div className="mb-6">
      <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{question.text}</p>
      <div className="space-y-2">
        {question.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className={`w-full text-left p-3 border rounded-lg transition-colors ${
              darkMode 
                ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 text-white' 
                : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-900'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
    
    <div className="flex gap-2">
      <Button variant="success" onClick={() => onAnswer("correct")}>
        I Know This
      </Button>
      <Button variant="secondary" onClick={onSkip} darkMode={darkMode}>
        Skip for Now
      </Button>
    </div>
  </Card>
);

// Main Dashboard Component
const Dashboard = ({ data, darkMode }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <KnowledgeHealthMeter score={data.user.knowledgeHealth} streak={data.user.streak} darkMode={darkMode} />
      <div className="lg:col-span-2">
        <WeeklyProgressChart data={data.weeklyProgress} darkMode={darkMode} />
      </div>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DailyReviewQueue 
        reviews={data.dailyReviews} 
        onStartReview={(id) => console.log('Starting review:', id)}
        darkMode={darkMode}
      />
      <div className="space-y-6">
        <KnowledgeMap knowledge={data.knowledgeMap} darkMode={darkMode} />
        <UpcomingTimeline reviews={data.upcomingReviews} darkMode={darkMode} />
      </div>
    </div>
  </div>
);

// Learning Page Component
const LearningPage = ({ darkMode }) => (
  <div className="space-y-6">
    <Card className="p-6" darkMode={darkMode}>
      <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Learning Sources</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Coursera', 'YouTube', 'Medium', 'GitHub', 'Documentation'].map(source => (
          <div key={source} className={`p-4 border rounded-lg text-center ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
            <div className={`w-12 h-12 rounded-lg mx-auto mb-2 flex items-center justify-center ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{source}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Connect to import content</p>
            <Button className="mt-2" size="sm" darkMode={darkMode}>
              <Plus className="w-4 h-4" />
              Connect
            </Button>
          </div>
        ))}
      </div>
    </Card>

    <Card className="p-6" darkMode={darkMode}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Learning</h3>
        <Button variant="secondary" size="sm" darkMode={darkMode}>
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>
      
      <div className="space-y-4">
        {[
          { title: "Advanced React Patterns", source: "YouTube", date: "2 hours ago", progress: 75 },
          { title: "Machine Learning Fundamentals", source: "Coursera", date: "1 day ago", progress: 45 },
          { title: "Python Best Practices", source: "Medium", date: "2 days ago", progress: 100 }
        ].map((item, index) => (
          <div key={index} className={`flex items-center justify-between p-4 border rounded-lg ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
            <div className="flex-1">
              <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h4>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.source} • {item.date}</p>
              <div className={`mt-2 w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
            <Button variant="secondary" size="sm" darkMode={darkMode}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>

    <Card className="p-6" darkMode={darkMode}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Upload Learning Materials</h3>
      <div className={`border-2 border-dashed rounded-lg p-8 text-center ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
        <Upload className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
        <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Drag and drop your files here, or click to browse
        </p>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Supports PDF, DOCX, TXT, and more
        </p>
        <Button className="mt-4">
          <Upload className="w-4 h-4" />
          Choose Files
        </Button>
      </div>
    </Card>
  </div>
);

// Review Page Component
const ReviewPage = ({ data, darkMode }) => {
  const [currentReview, setCurrentReview] = useState(null);
  const [reviewMode, setReviewMode] = useState('queue'); // 'queue' or 'active'

  const startReview = (reviewId) => {
    const review = data.dailyReviews.find(r => r.id === reviewId);
    setCurrentReview(review);
    setReviewMode('active');
  };

  const finishReview = () => {
    setCurrentReview(null);
    setReviewMode('queue');
  };

  if (reviewMode === 'active' && currentReview) {
    return (
      <div className="space-y-6">
        <Card className="p-6" darkMode={darkMode}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {currentReview.title}
              </h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {currentReview.category} • {currentReview.timeEstimate}
              </p>
            </div>
            <Button variant="secondary" onClick={finishReview} darkMode={darkMode}>
              Exit Review
            </Button>
          </div>

          <div className="space-y-6">
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                What is the main purpose of React Hooks?
              </h3>
              <div className="space-y-3">
                {[
                  "To replace class components with functional components",
                  "To manage state and side effects in functional components",
                  "To improve performance of React applications",
                  "To handle routing in React applications"
                ].map((option, index) => (
                  <button
                    key={index}
                    className={`w-full text-left p-4 border rounded-lg transition-colors ${
                      darkMode 
                        ? 'border-gray-600 bg-gray-600 hover:bg-gray-500 text-white' 
                        : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-900'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="success" onClick={finishReview}>
                <CheckCircle className="w-4 h-4" />
                I Know This
              </Button>
              <Button variant="warning" onClick={finishReview}>
                <AlertCircle className="w-4 h-4" />
                Partially Know
              </Button>
              <Button variant="secondary" onClick={finishReview} darkMode={darkMode}>
                <XCircle className="w-4 h-4" />
                Don't Know
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center" darkMode={darkMode}>
          <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
          <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Due Today</div>
        </Card>
        <Card className="p-6 text-center" darkMode={darkMode}>
          <div className="text-3xl font-bold text-green-600 mb-2">8</div>
          <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed</div>
        </Card>
        <Card className="p-6 text-center" darkMode={darkMode}>
          <div className="text-3xl font-bold text-orange-600 mb-2">3</div>
          <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Overdue</div>
        </Card>
      </div>

      <DailyReviewQueue 
        reviews={data.dailyReviews} 
        onStartReview={startReview}
        darkMode={darkMode}
      />

      <Card className="p-6" darkMode={darkMode}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Review History</h3>
        <div className="space-y-3">
          {[
            { title: "JavaScript Closures", date: "2 hours ago", result: "correct", difficulty: "medium" },
            { title: "CSS Grid Layout", date: "1 day ago", result: "partial", difficulty: "easy" },
            { title: "Node.js Streams", date: "2 days ago", result: "incorrect", difficulty: "hard" }
          ].map((review, index) => (
            <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex-1">
                <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{review.title}</h4>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{review.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  review.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  review.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {review.difficulty}
                </span>
                <span className={`w-3 h-3 rounded-full ${
                  review.result === 'correct' ? 'bg-green-500' :
                  review.result === 'partial' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}></span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// Analytics Page Component
const AnalyticsPage = ({ data, darkMode }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="p-6 text-center" darkMode={darkMode}>
        <div className="text-3xl font-bold text-blue-600 mb-2">87%</div>
        <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Retention Rate</div>
      </Card>
      <Card className="p-6 text-center" darkMode={darkMode}>
        <div className="text-3xl font-bold text-green-600 mb-2">24</div>
        <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Topics Mastered</div>
      </Card>
      <Card className="p-6 text-center" darkMode={darkMode}>
        <div className="text-3xl font-bold text-purple-600 mb-2">156</div>
        <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Hours Studied</div>
      </Card>
      <Card className="p-6 text-center" darkMode={darkMode}>
        <div className="text-3xl font-bold text-orange-600 mb-2">45</div>
        <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Day Streak</div>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <WeeklyProgressChart data={data.weeklyProgress} darkMode={darkMode} />
      <KnowledgeMap knowledge={data.knowledgeMap} darkMode={darkMode} />
    </div>

    <Card className="p-6" darkMode={darkMode}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Learning Patterns</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Best Performance Times</h4>
          <div className="space-y-2">
            {[
              { time: "9:00 AM - 11:00 AM", score: "92%" },
              { time: "2:00 PM - 4:00 PM", score: "87%" },
              { time: "7:00 PM - 9:00 PM", score: "79%" }
            ].map((slot, index) => (
              <div key={index} className={`flex justify-between p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{slot.time}</span>
                <span className="text-green-600 font-medium">{slot.score}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Subject Strengths</h4>
          <div className="space-y-2">
            {[
              { subject: "JavaScript", strength: 95 },
              { subject: "React", strength: 88 },
              { subject: "Python", strength: 72 },
              { subject: "Machine Learning", strength: 61 }
            ].map((subject, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{subject.subject}</span>
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{subject.strength}%</span>
                </div>
                <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${subject.strength}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  </div>
);

// Integration Page Component
const IntegrationPage = ({ darkMode }) => (
  <div className="space-y-6">
    <Card className="p-6" darkMode={darkMode}>
      <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Connected Integrations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: "Notion", icon: Database, status: "connected", description: "Sync your notes and documents" },
          { name: "GitHub", icon: Code, status: "connected", description: "Track your coding projects" },
          { name: "Obsidian", icon: Brain, status: "disconnected", description: "Import your knowledge graph" },
          { name: "Anki", icon: Target, status: "disconnected", description: "Sync flashcards and reviews" }
        ].map((integration, index) => (
          <div key={index} className={`p-4 border rounded-lg ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <integration.icon className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <div>
                  <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{integration.name}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{integration.description}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                integration.status === 'connected' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {integration.status}
              </span>
            </div>
            <Button 
              variant={integration.status === 'connected' ? 'secondary' : 'primary'} 
              size="sm"
              darkMode={darkMode}
            >
              {integration.status === 'connected' ? 'Configure' : 'Connect'}
            </Button>
          </div>
        ))}
      </div>
    </Card>

    <Card className="p-6" darkMode={darkMode}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>API Access</h3>
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>API Key</h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Use this key to access the SkillDecay API</p>
          </div>
          <Button variant="secondary" size="sm" darkMode={darkMode}>
            <Download className="w-4 h-4" />
            Generate
          </Button>
        </div>
        <div className={`p-3 rounded border font-mono text-sm ${darkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
          sk-1234567890abcdef...
        </div>
      </div>
    </Card>

    <Card className="p-6" darkMode={darkMode}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Export Data</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Learning Data</h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Export all your learning progress and reviews</p>
          </div>
          <Button variant="secondary" size="sm" darkMode={darkMode}>
            <Download className="w-4 h-4" />
            Export JSON
          </Button>
        </div>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Knowledge Graph</h4>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Export your knowledge connections and strengths</p>
          </div>
          <Button variant="secondary" size="sm" darkMode={darkMode}>
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>
    </Card>
  </div>
);

// Settings Page Component
const SettingsPage = ({ darkMode, toggleDarkMode }) => (
  <div className="space-y-6">
    <Card className="p-6" darkMode={darkMode}>
      <h2 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Preferences</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Appearance</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dark Mode</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Toggle between light and dark themes</p>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div>
          <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
          <div className="space-y-4">
            {[
              { label: "Review Reminders", description: "Get notified when reviews are due" },
              { label: "Daily Summary", description: "Receive daily progress summaries" },
              { label: "Achievement Alerts", description: "Celebrate your learning milestones" }
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{setting.label}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{setting.description}</p>
                </div>
                <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  darkMode ? 'bg-blue-600' : 'bg-gray-200'
                }`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Learning</h3>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Daily Review Goal
              </label>
              <input
                type="number"
                defaultValue="10"
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-200 text-gray-900'
                }`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Review Difficulty
              </label>
              <select className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-200 text-gray-900'
              }`}>
                <option>Adaptive (Recommended)</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t">
        <Button variant="primary">Save Settings</Button>
      </div>
    </Card>

    <Card className="p-6" darkMode={darkMode}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Account</h3>
      <div className="space-y-4">
        <Button variant="secondary" darkMode={darkMode}>
          Change Password
        </Button>
        <Button variant="secondary" darkMode={darkMode}>
          Download My Data
        </Button>
        <Button variant="secondary" className="text-red-600 hover:text-red-700">
          Delete Account
        </Button>
      </div>
    </Card>
  </div>
);

// Main App Component
const SkillDecayApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Add dark mode class to body for global styling
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard data={mockData} darkMode={darkMode} />;
      case 'learning':
        return <LearningPage darkMode={darkMode} />;
      case 'review':
        return <ReviewPage data={mockData} darkMode={darkMode} />;
      case 'analytics':
        return <AnalyticsPage data={mockData} darkMode={darkMode} />;
      case 'profile':
        return <ProfilePage user={mockData.user} darkMode={darkMode} />;
      case 'integration':
        return <IntegrationPage darkMode={darkMode} />;
      case 'settings':
        return <SettingsPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
      default:
        return <Dashboard data={mockData} darkMode={darkMode} />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header 
        user={mockData.user} 
        onSearch={handleSearch} 
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <div className="flex pt-20">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          darkMode={darkMode}
        />
        
        <main className="flex-1 p-6 ml-64">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SkillDecayApp;