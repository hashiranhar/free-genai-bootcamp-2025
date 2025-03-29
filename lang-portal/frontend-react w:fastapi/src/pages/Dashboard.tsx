import React from 'react';
import {
  useLastStudySession,
  useQuickStats,
  useStudyProgress
} from '../api/dashboard';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { data: lastSession } = useLastStudySession();
  const { data: stats } = useQuickStats();
  const { data: progress } = useStudyProgress();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Last Study Session */}
      <section className="bg-white dark:bg-zinc-900 shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-2">Last Study Session</h2>
        {lastSession ? (
          <div>
            <p><strong>Activity:</strong> {lastSession.activity_name}</p>
            <p><strong>Last Used:</strong> {new Date(lastSession.timestamp).toLocaleString()}</p>
            <p><strong>Correct:</strong> {lastSession.correct_count}</p>
            <p><strong>Wrong:</strong> {lastSession.wrong_count}</p>
            <p>
              <Link to={`/groups/${lastSession.group_id}`} className="text-blue-600 underline">
                View Group
              </Link>
            </p>
          </div>
        ) : (
          <p>No study sessions yet.</p>
        )}
      </section>

      {/* Study Progress */}
      <section className="bg-white dark:bg-zinc-900 shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-2">Study Progress</h2>
        {progress ? (
          <p>
            {progress.words_studied} / {progress.total_words} words studied (
            {progress.mastery_percentage}% mastered)
          </p>
        ) : (
          <p>Loading progress...</p>
        )}
      </section>

      {/* Quick Stats */}
      <section className="bg-white dark:bg-zinc-900 shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-2">Quick Stats</h2>
        <ul className="grid grid-cols-2 gap-4">
          <li><strong>Success Rate:</strong> {stats?.success_rate}%</li>
          <li><strong>Total Sessions:</strong> {stats?.total_sessions}</li>
          <li><strong>Active Groups:</strong> {stats?.total_groups}</li>
          <li><strong>Study Streak:</strong> {stats?.streak_days} days</li>
        </ul>
      </section>

      {/* Start Studying */}
      <div>
        <Link
          to="/study_activities"
          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Start Studying
        </Link>
      </div>
    </div>
  );
}
