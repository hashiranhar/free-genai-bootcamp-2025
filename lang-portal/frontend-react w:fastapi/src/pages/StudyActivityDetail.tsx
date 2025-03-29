import { useParams, Link } from 'react-router-dom';
import { useStudyActivity, useActivitySessions } from '../api/studyActivities';

export default function StudyActivityDetail() {
  const { id } = useParams();
  const { data: activity } = useStudyActivity(id!);
  const { data: sessions } = useActivitySessions(id!);

  if (!activity) return <p className="p-6">Loading activity details...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{activity.name}</h1>

      {activity.thumbnail_url && (
        <img src={activity.thumbnail_url} alt={activity.name} className="w-full max-w-md rounded shadow" />
      )}

      {activity.description && (
        <p className="text-gray-700 dark:text-gray-300">{activity.description}</p>
      )}

      <Link
        to={`/study_activities/${activity.id}/launch`}
        className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Launch Activity
      </Link>

      <section>
        <h2 className="text-xl font-semibold mb-2">Study Sessions</h2>
        {sessions?.length ? (
          <div className="space-y-3">
            {sessions.map((session: any) => (
              <div key={session.id} className="p-4 border rounded dark:border-zinc-700">
                <p><strong>Activity:</strong> {session.activity_name}</p>
                <p><strong>Group:</strong> {session.group_name}</p>
                <p><strong>Start:</strong> {new Date(session.start_time).toLocaleString()}</p>
                <p><strong>End:</strong> {new Date(session.end_time).toLocaleString()}</p>
                <p><strong>Review Items:</strong> {session.review_count}</p>
                <Link
                  to={`/study_sessions/${session.id}`}
                  className="text-blue-600 underline"
                >
                  View Session
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No study sessions yet for this activity.</p>
        )}
      </section>
    </div>
  );
}
