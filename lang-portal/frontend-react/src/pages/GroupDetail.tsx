import { useParams, Link } from 'react-router-dom';
import { useGroupDetail, useGroupWords, useGroupSessions } from '../api/groups';

export default function GroupDetail() {
  const { id } = useParams();
  const { data: group } = useGroupDetail(id!);
  const { data: words } = useGroupWords(id!);
  const { data: sessions } = useGroupSessions(id!);

  if (!group) return <p className="p-6">Loading group...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{group.name}</h1>
      <p className="text-gray-600 dark:text-gray-300">
        Total Words: {group.word_count}
      </p>

      {/* Words in Group */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Words in Group</h2>
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

      {/* Study Sessions */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Study Sessions</h2>
        <div className="space-y-3">
          {sessions?.map((session: any) => (
            <div key={session.id} className="p-4 border rounded dark:border-zinc-700">
              <p><strong>Activity:</strong> {session.activity_name}</p>
              <p><strong>Start:</strong> {new Date(session.start_time).toLocaleString()}</p>
              <p><strong>End:</strong> {new Date(session.end_time).toLocaleString()}</p>
              <p><strong>Review Items:</strong> {session.review_count}</p>
              <Link to={`/study_sessions/${session.id}`} className="text-blue-600 underline">
                View Session
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
