import { useState } from 'react';
import { useStudySessions } from '../api/studySessions';
import { Link } from 'react-router-dom';

export default function StudySessions() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useStudySessions(page);

  if (isLoading) return <p className="p-6">Loading study sessions...</p>;
  if (!data || !Array.isArray(data.sessions)) return <p className="p-6">No study sessions available.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Study Sessions</h1>
      <div className="overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-zinc-800">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Activity</th>
              <th className="p-2 text-left">Group</th>
              <th className="p-2 text-left">Start</th>
              <th className="p-2 text-left">End</th>
              <th className="p-2 text-left">Reviews</th>
            </tr>
          </thead>
          <tbody>
            {data.sessions.map((session: any) => (
              <tr key={session.id} className="border-t dark:border-zinc-700">
                <td className="p-2">
                  <Link to={`/study_sessions/${session.id}`} className="text-blue-600 underline">
                    {session.id}
                  </Link>
                </td>
                <td className="p-2">{session.activity_name}</td>
                <td className="p-2">{session.group_name}</td>
                <td className="p-2">{new Date(session.start_time).toLocaleString()}</td>
                <td className="p-2">{new Date(session.end_time).toLocaleString()}</td>
                <td className="p-2">{session.review_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          disabled={!data.hasMore}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
