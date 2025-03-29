import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import StudyActivities from './pages/StudyActivities';
import StudyActivityDetail from './pages/StudyActivityDetail';
import StudyActivityLaunch from './pages/StudyActivityLaunch';
import Words from './pages/Words';
import WordDetail from './pages/WordDetail';
import Groups from './pages/Groups';
import GroupDetail from './pages/GroupDetail';
import StudySessions from './pages/StudySessions';
import StudySessionDetail from './pages/StudySessionDetail';
import Settings from './pages/Settings';
import Layout from './layout/Layout';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/study_activities" element={<StudyActivities />} />
        <Route path="/study_activities/:id" element={<StudyActivityDetail />} />
        <Route path="/study_activities/:id/launch" element={<StudyActivityLaunch />} />
        <Route path="/words" element={<Words />} />
        <Route path="/words/:id" element={<WordDetail />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/groups/:id" element={<GroupDetail />} />
        <Route path="/study_sessions" element={<StudySessions />} />
        <Route path="/study_sessions/:id" element={<StudySessionDetail />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<div className="p-6">Page not found.</div>} />
      </Routes>
    </Layout>
  );
}
