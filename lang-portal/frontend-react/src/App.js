import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Words from './pages/Words';
import Groups from './pages/Groups';
import StudySessions from './pages/StudySessions';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} /> {/* Redirect root to /dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/words" element={<Words />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/study_sessions" element={<StudySessions />} />
    </Routes>
  </Router>
);

export default App;
