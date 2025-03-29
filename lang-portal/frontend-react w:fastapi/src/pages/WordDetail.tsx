import { useParams, Link } from 'react-router-dom';
import { useWordDetail } from '../api/words';

export default function WordDetail() {
  const { id } = useParams();
  const { data: word, isLoading } = useWordDetail(id!);

  if (isLoading) return <p className="p-6">Loading word details...</p>;
  if (!word) return <p className="p-6">Word not found.</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">{word.japanese}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">{word.romaji} — {word.english}</p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-white dark:bg-zinc-900 rounded shadow">
          <p><strong>Correct Answers:</strong> {word.correct_count}</p>
          <p><strong>Wrong Answers:</strong> {word.wrong_count}</p>
        </div>
      </div>

      {/* Word Groups */}
      {word.groups?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Groups</h2>
          <div className="flex flex-wrap gap-2">
            {word.groups.map((group: any) => (
              <Link
                key={group.id}
                to={`/groups/${group.id}`}
                className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 text-sm"
              >
                {group.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
