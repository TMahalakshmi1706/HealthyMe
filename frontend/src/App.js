import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import Medications from './pages/Medications';    
import RemindersPage from './pages/RemindersPage'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/medicines" element={<Medications />} />
          <Route path="/reminders" element={<RemindersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
