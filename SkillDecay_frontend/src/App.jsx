import React, { useState, useEffect } from 'react';
import { Brain, Calendar, TrendingUp, BookOpen, Settings, Bell, Search, User, Clock, Target, Zap, BarChart3, Map, Play } from 'lucide-react';

// Mock data for demonstration
const mockData = {
  user: {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    avatar: "/api/placeholder/40/40",
    knowledgeHealth: 78,
    streak: 15
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
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, variant = "primary", size = "md", onClick, className = "" }) => {
  const baseClasses = "font-medium rounded-lg transition-colors duration-200 flex items-center gap-2";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
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
const Header = ({ user, onSearch }) => (
  <header className="bg-white border-b border-gray-200 px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">SkillDecay</h1>
            <p className="text-sm text-gray-500">AI Knowledge Retention</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search knowledge..."
            className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={onSearch}
          />
        </div>
        
        <button className="relative p-2 text-gray-400 hover:text-gray-600">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 cursor-pointer">
          <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  </header>
);

// Sidebar Component
const Sidebar = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'learning', label: 'Learning', icon: BookOpen },
    { id: 'review', label: 'Review', icon: Target },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'integration', label: 'Integration', icon: Map },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full">
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
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
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

// Knowledge Health Meter Component
const KnowledgeHealthMeter = ({ score, streak }) => (
  <Card className="p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">Knowledge Health</h3>
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
          stroke="#e5e7eb"
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
          <div className="text-2xl font-bold text-gray-900">{score}%</div>
          <div className="text-xs text-gray-500">Health Score</div>
        </div>
      </div>
    </div>
    
    <div className="text-center">
      <p className="text-sm text-gray-600">
        {score >= 80 ? "Excellent retention!" : score >= 60 ? "Good progress" : "Needs attention"}
      </p>
    </div>
  </Card>
);

// Daily Review Queue Component
const DailyReviewQueue = ({ reviews, onStartReview }) => (
  <Card className="p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">Today's Reviews</h3>
      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
        {reviews.length} pending
      </span>
    </div>
    
    <div className="space-y-3">
      {reviews.map(review => (
        <div key={review.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{review.title}</h4>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-sm text-gray-500">{review.category}</span>
              <span className="text-sm text-gray-500">• {review.timeEstimate}</span>
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
            <span className="text-sm text-gray-500">Due in {review.dueIn}</span>
            <Button size="sm" onClick={() => onStartReview(review.id)}>
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
const WeeklyProgressChart = ({ data }) => {
  const maxHours = Math.max(...data.map(d => d.hours));
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Progress</h3>
      <div className="flex items-end justify-between h-32 gap-2">
        {data.map((day, index) => (
          <div key={day.day} className="flex-1 flex flex-col items-center">
            <div className="w-full bg-gray-200 rounded-t-lg relative overflow-hidden">
              <div 
                className="bg-blue-600 rounded-t-lg transition-all duration-500"
                style={{ height: `${(day.hours / maxHours) * 100}px` }}
              />
            </div>
            <div className="mt-2 text-center">
              <div className="text-xs font-medium text-gray-900">{day.day}</div>
              <div className="text-xs text-gray-500">{day.hours}h</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Total: {data.reduce((sum, day) => sum + day.hours, 0).toFixed(1)} hours this week
        </p>
      </div>
    </Card>
  );
};

// Knowledge Map Component
const KnowledgeMap = ({ knowledge }) => (
  <Card className="p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">Knowledge Map</h3>
      <Button variant="secondary" size="sm">View Full Map</Button>
    </div>
    
    <div className="grid grid-cols-2 gap-3">
      {knowledge.map(item => (
        <div key={item.id} className="p-3 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
            <span className="text-xs text-gray-500">{item.connections} links</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${item.strength}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">{item.strength}% strength</div>
        </div>
      ))}
    </div>
  </Card>
);

// Upcoming Reviews Timeline Component
const UpcomingTimeline = ({ reviews }) => (
  <Card className="p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
      <Calendar className="w-5 h-5 text-gray-400" />
    </div>
    
    <div className="space-y-3">
      {reviews.map((review, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="flex-shrink-0 w-12 text-sm font-medium text-gray-600">
            {review.time}
          </div>
          <div className="flex-1 p-2 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <div className="font-medium text-gray-900 text-sm">{review.title}</div>
            <div className="text-xs text-gray-500">{review.subject}</div>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

// Micro Refresher Component
const MicroRefresher = ({ question, onAnswer, onSkip }) => (
  <Card className="p-6 border-l-4 border-blue-500">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">Quick Review</h3>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Clock className="w-4 h-4" />
        30 seconds
      </div>
    </div>
    
    <div className="mb-6">
      <p className="text-gray-700 mb-4">{question.text}</p>
      <div className="space-y-2">
        {question.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
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
      <Button variant="secondary" onClick={onSkip}>
        Skip for Now
      </Button>
    </div>
  </Card>
);

// Main Dashboard Component
const Dashboard = ({ data }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <KnowledgeHealthMeter score={data.user.knowledgeHealth} streak={data.user.streak} />
      <div className="lg:col-span-2">
        <WeeklyProgressChart data={data.weeklyProgress} />
      </div>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DailyReviewQueue 
        reviews={data.dailyReviews} 
        onStartReview={(id) => console.log('Starting review:', id)}
      />
      <div className="space-y-6">
        <KnowledgeMap knowledge={data.knowledgeMap} />
        <UpcomingTimeline reviews={data.upcomingReviews} />
      </div>
    </div>
  </div>
);

// Learning Page Component
const LearningPage = () => (
  <div className="space-y-6">
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Learning Sources</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Coursera', 'YouTube', 'Medium', 'GitHub', 'Documentation'].map(source => (
          <div key={source} className="p-4 border border-gray-200 rounded-lg text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900">{source}</h3>
            <Button size="sm" className="mt-2">Connect</Button>
          </div>
        ))}
      </div>
    </Card>
    
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Manual Learning Entry</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="What did you learn?"
          className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Select Category</option>
          <option>Programming</option>
          <option>Design</option>
          <option>Business</option>
          <option>Science</option>
        </select>
      </div>
      <Button className="mt-4">Add Learning Entry</Button>
    </Card>
  </div>
);

// Review Page Component
const ReviewPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState({
    text: "What is the difference between useState and useEffect in React?",
    options: [
      "useState manages state, useEffect handles side effects",
      "They are the same thing",
      "useEffect manages state, useState handles side effects",
      "Both handle component lifecycle"
    ]
  });

  return (
    <div className="space-y-6">
      <MicroRefresher 
        question={currentQuestion}
        onAnswer={(answer) => console.log('Answer:', answer)}
        onSkip={() => console.log('Skipped')}
      />
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Review History</h3>
        <div className="space-y-2">
          {['React Hooks', 'Python Lists', 'SQL Joins', 'Git Branching'].map((topic, index) => (
            <div key={topic} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-900">{topic}</span>
              <span className="text-sm text-green-600">✓ Completed</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// Analytics Page Component
const AnalyticsPage = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6 text-center">
        <div className="text-3xl font-bold text-blue-600 mb-2">342</div>
        <div className="text-gray-600">Total Reviews</div>
      </Card>
      <Card className="p-6 text-center">
        <div className="text-3xl font-bold text-green-600 mb-2">87%</div>
        <div className="text-gray-600">Success Rate</div>
      </Card>
      <Card className="p-6 text-center">
        <div className="text-3xl font-bold text-purple-600 mb-2">24</div>
        <div className="text-gray-600">Knowledge Areas</div>
      </Card>
    </div>
    
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Forgetting Curve Analysis</h3>
      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Forgetting curve visualization would go here</p>
      </div>
    </Card>
  </div>
);

// Settings Page Component
const SettingsPage = () => (
  <div className="space-y-6">
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Settings</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Daily Review Target
          </label>
          <input
            type="number"
            defaultValue="10"
            className="border border-gray-200 rounded-lg px-3 py-2 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-500 ml-2">reviews per day</span>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notification Preferences
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2" />
              <span className="text-sm text-gray-700">Email notifications</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2" />
              <span className="text-sm text-gray-700">Push notifications</span>
            </label>
          </div>
        </div>
      </div>
    </Card>
    
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Data & Privacy</h3>
      <div className="space-y-2">
        <Button variant="secondary">Export My Data</Button>
        <Button variant="secondary">Privacy Settings</Button>
        <Button variant="warning">Delete Account</Button>
      </div>
    </Card>
  </div>
);

// Main App Component
const SkillDecayApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data] = useState(mockData);

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard data={data} />;
      case 'learning': return <LearningPage />;
      case 'review': return <ReviewPage />;
      case 'analytics': return <AnalyticsPage />;
      case 'settings': return <SettingsPage />;
      default: return <Dashboard data={data} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={data.user} 
        onSearch={(e) => console.log('Search:', e.target.value)}
      />
      
      <div className="flex h-screen pt-16">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 capitalize">
                {activeTab === 'dashboard' ? `Welcome back, ${data.user.name.split(' ')[0]}!` : activeTab}
              </h1>
              <p className="text-gray-600">
                {activeTab === 'dashboard' 
                  ? "Here's your learning progress today" 
                  : `Manage your ${activeTab} settings and data`
                }
              </p>
            </div>
            
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SkillDecayApp;