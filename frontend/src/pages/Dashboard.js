import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ActiveMedicines from '../pages/ActiveMedicines';
import { FaPlus, FaUserCircle, FaClock, FaExclamationTriangle, FaCog, FaSignOutAlt, FaUserShield, FaChartLine, FaBell, FaCalendarCheck, FaUpload, FaRobot } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import {
  Home,
  BarChart3,
  Pill,
  Clock,
  AlertTriangle,
  TrendingUp,
  Cpu
} from 'lucide-react';
import 'react-circular-progressbar/dist/styles.css';
import './Dashboard.css';

// Vertical Navigation Component
const VerticalNav = ({ currentPath }) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(2);
  
  const navItems = [
    { icon: <Home size={24} />, name: "Home", path: "/", desc: "Go to homepage" },
    { icon: <BarChart3 size={24} />, name: "Dashboard", path: "/dashboard", desc: "View your health dashboard" },
    { icon: <Pill size={24} />, name: "Medicines", path: "/medicines", desc: "Manage medications" },
    { icon: <Clock size={24} />, name: "Reminders", path: "/reminders", desc: "Set medication reminders" },
    { icon: <AlertTriangle size={24} />, name: "Interactions", path: "/interactions", desc: "Check drug interactions" },
    { icon: <TrendingUp size={24} />, name: "Analytics", path: "/analytics", desc: "Health analytics" },
    { icon: <Cpu size={24} />, name: "AI Insights", path: "/ai-insights", desc: "AI health recommendations" }
  ];

  const handleNavClick = (path, index) => {
    setActiveIndex(index);
    navigate(path); 
  };

  return (
    <div className="vertical-nav-tab">
      <div className="vertical-nav-items">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`vertical-nav-item ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleNavClick(item.path, index)}
            title={item.desc}
          >
            <div className="vertical-nav-icon">{item.icon}</div>
            <span className="vertical-nav-label">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Header Component
const Header = ({ userName, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate=useNavigate();
  return (
    <header className="nav-header">
      <div className="nav-logo">
         <img src="/logo.png" alt="HealthCare+ Logo" className="logo-img" />
      </div>
      <nav className="nav-links">
        <a href="/dashboard" className="nav-link">Dashboard</a>
        <a href="/medicines" className="nav-link">Medications</a>
        <a href="/reports" className="nav-link">Reports</a>
      </nav>
      
      <div 
        className="user-profile" 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="user-name">{userName}</span>
        <FaUserCircle className="user-icon" />
        {isDropdownOpen && (
          <ul className="dropdown-menu">
            <li className="dropdown-item">
              <FaUserShield className="dropdown-icon" />
              My Account
            </li>
            <li className="dropdown-item">
              <FaCog className="dropdown-icon" />
              Settings
            </li>
            <div className="dropdown-separator" />
           <li
        className="dropdown-item"
        onClick={() => navigate('/login')} // <-- wrap in a function
      >
        <FaSignOutAlt className="dropdown-icon" />
        Logout
      </li>
          </ul>
        )}
      </div>
    </header>
  );
};

// Adherence Card
const AdherenceCard = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setTimeout(() => setPercentage(85), 300);
  }, []);

  return (
    <div className="adherence-grid">
      <div className="about-card adherence-card">
        <h3 className="about-card-title">
          <FaChartLine className="title-icon" />
          Medication Adherence
        </h3>
        <div className="progress-container">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              textColor: '#064E3B',
              pathColor: '#10B981',
              trailColor: 'rgba(16,185,129,0.1)',
              textSize: '20px',
              pathTransitionDuration: 1.5,
            })}
          />
        </div>
        <p className="adherence-subtext">Weekly Average</p>
        <div className="adherence-stats">
          <div className="adherence-stat-item">
            <span className="adherence-stat-label">Taken</span>
            <span className="adherence-stat-value">28</span>
          </div>
          <div className="adherence-stat-item">
            <span className="adherence-stat-label">Missed</span>
            <span className="adherence-stat-value">5</span>
          </div>
        </div>
      </div>
      <ActiveMedicines />
    </div>
  );
};

// Today's Schedule Card
const TodayScheduleCard = () => {
  const medicines = [
    { time: '8:00 AM', name: 'Paracetamol', dose: '500mg', status: 'taken' },
    { time: '12:00 PM', name: 'Metformin', dose: '250mg', status: 'taken' },
    { time: '6:00 PM', name: 'Atorvastatin', dose: '10mg', status: 'pending' },
    { time: '9:00 PM', name: 'Vitamin D', dose: '1000IU', status: 'upcoming' },
  ];

  return (
    <div className="about-card schedule-card">
      <h3 className="about-card-title">
        <FaCalendarCheck className="title-icon" />
        Today's Schedule
      </h3>
      <div className="schedule-list">
        {medicines.map((med, index) => (
          <div 
            key={index} 
            className="schedule-item"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="schedule-time">
              <FaClock className="clock-icon" />
              {med.time}
            </div>
            <div className="schedule-medicine">
              <h4 className="medicine-name">{med.name}</h4>
              <span className="medicine-dose">{med.dose}</span>
            </div>
            <span className={`status-badge ${med.status}`}>
              {med.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Interaction Warnings Card
const InteractionWarningsCard = () => (
  <div className="about-card warning-card">
    <h3 className="about-card-title">
      <FaExclamationTriangle className="title-icon warning-icon" />
      Drug Interactions
    </h3>
    <div className="warning-content">
      <div className="warning-icon">
        <FaExclamationTriangle />
      </div>
      <p className="warning-text">No interactions detected</p>
    </div>
    <p className="warning-subtext">All your medications are safe to take together</p>
  </div>
);

// Quick Actions Card
// Quick Actions Card
const QuickActionsCard = () => {
  const navigate = useNavigate(); // ✅ must be inside the function component

  return (
    <div className="about-card">
      <h3 className="about-card-title">Quick Actions</h3>
      <div className="action-grid">
        <button className="action-button">
          <FaUpload className="action-icon" />
          Upload Prescription
        </button>

        <button
          className="action-button"
          onClick={() => navigate('/reminders')} // ✅ navigate to RemindersPage
        >
          <FaBell className="action-icon" />
          Set Reminder
        </button>

        <button className="action-button">
          <FaChartLine className="action-icon" />
          View Reports
        </button>

        <button className="action-button">
          <FaRobot className="action-icon" />
          AI Consultation
        </button>
      </div>
    </div>
  );
};


// Main Dashboard Component
function Dashboard() {
  const [userName] = useState('');

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <div className="homepage-container">
      <VerticalNav currentPath="/dashboard" />
      <div className="main-content">
        <Header userName={userName} onLogout={handleLogout} />
        <main className="section-container">
          <div className="about-grid dashboard-grid">
            <AdherenceCard />
            <TodayScheduleCard />
            <InteractionWarningsCard />
            <QuickActionsCard />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
