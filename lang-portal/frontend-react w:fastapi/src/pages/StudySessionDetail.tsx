import { useParams, Link } from 'react-router-dom';
import { useStudySessionDetail, useSessionWords } from '../api/studySessions';

export default function StudySessionDetail() {
  const { id } = useParams();
  const { data: session } = useStudySessionDetail(id!);
  const { data: words } = useSessionWords(id!);

  if (!session) return <p className="p-6">Loading session...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Session #{session.id}</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white dark:bg-zinc-900 rounded shadow">
          <p><strong>Activity:</strong> {session.activity_name}</p>
          <p><strong>Group:</strong> {session.group_name}</p>
          <p><strong>Start Time:</strong> {new Date(session.start_time).toLocaleString()}</p>
          <p><strong>End Time:</strong> {new Date(session.end_time).toLocaleString()}</p>
          <p><strong>Review Items:</strong> {session.review_count}</p>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-2">Reviewed Words</h2>
        <div className="overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-zinc-800">
                <th className="p-2 text-left">Japanese</th>
                <th className="p-2 text-left">Romaji</th>
                <th className="p-2 text-left">English</th>
              </tr>
            </thead>
            <tbody>
              {words?.map((word: any) => (
                <tr key={word.id} className="border-t dark:border-zinc-700">
                  <td className="p-2">
                    <Link to={`/words/${word.id}`} className="text-blue-600 underline">
                      {word.japanese}
                    </Link>
                  </td>
                  <td className="p-2">{word.romaji}</td>
                  <td className="p-2">{word.english}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
