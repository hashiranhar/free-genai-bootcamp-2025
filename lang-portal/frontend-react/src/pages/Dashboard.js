import React, { useEffect, useState } from 'react';
import { getDashboardData } from '../services/api';
import Card from '../components/Card';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const dashboardData = await getDashboardData();
      setData(dashboardData);
    };
    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <Card title="Last Study Session">
        <p>Group: {data.lastStudySession.group_name}</p>
        <p>Created At: {data.lastStudySession.created_at}</p>
      </Card>
      <Card title="Study Progress">
        <p>Total Words Studied: {data.studyProgress.total_words_studied}</p>
        <p>Total Available Words: {data.studyProgress.total_available_words}</p>
      </Card>
      <Card title="Quick Stats">
        <p>Success Rate: {data.quickStats.success_rate}%</p>
        <p>Total Study Sessions: {data.quickStats.total_study_sessions}</p>
        <p>Total Active Groups: {data.quickStats.total_active_groups}</p>
        <p>Study Streak: {data.quickStats.study_streak_days} days</p>
      </Card>
    </div>
  );
};

export default Dashboard;
